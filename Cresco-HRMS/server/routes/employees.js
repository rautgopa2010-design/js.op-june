const express = require('express');
const pool = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ status: 'error', message: 'Only employees can access this resource.' });
    }

    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.role, e.emp_id, e.department, e.position AS title, e.salary, e.joining_date, e.phone, e.address
       FROM users u
       LEFT JOIN employees e ON e.user_id = u.id
       WHERE u.id = ?`,
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ status: 'error', message: 'Employee record not found.' });
    }

    res.json({ status: 'success', employee: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Unable to fetch employee profile.' });
  }
});

router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.role, u.status, e.emp_id, e.department, e.position AS title, e.salary
       FROM users u
       LEFT JOIN employees e ON e.user_id = u.id
       ORDER BY u.id DESC`
    );

    res.json({ status: 'success', employees: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Unable to fetch employees.' });
  }
});

module.exports = router;
