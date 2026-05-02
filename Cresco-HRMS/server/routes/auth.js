const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

router.post('/signup', async (req, res) => {
  const { name, email, password, role, department, title } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields.' });
  }

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existing.length) {
      return res.status(409).json({ status: 'error', message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [name, email.toLowerCase(), hashedPassword, role, 'active']
    );

    const userId = result.insertId;
    if (role === 'employee') {
      const empId = `CRES-${1000 + userId}`;
      await pool.query(
        'INSERT INTO employees (user_id, emp_id, department, position, salary, joining_date, manager_id, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, empId, department || 'General', title || 'Employee', 0, new Date(), null, '', '']
      );
    }

    const token = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '7d' });
    const user = {
      id: userId,
      name,
      email: email.toLowerCase(),
      role,
      department: department || null,
      title: title || (role === 'admin' ? 'Administrator' : 'Employee')
    };

    res.json({ status: 'success', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Unable to register user.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.password, u.role, u.status, e.department, e.position AS title
       FROM users u
       LEFT JOIN employees e ON e.user_id = u.id
       WHERE u.email = ?`,
      [email.toLowerCase()]
    );

    if (!rows.length) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const profile = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department || null,
      title: user.title || (user.role === 'admin' ? 'Administrator' : 'Employee')
    };

    res.json({ status: 'success', token, user: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Unable to authenticate user.' });
  }
});

router.get('/me', authenticate, (req, res) => {
  res.json({ status: 'success', user: req.user });
});

module.exports = router;
