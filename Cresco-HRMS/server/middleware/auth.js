const jwt = require('jsonwebtoken');
const pool = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'Authentication required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.role, u.status, e.department, e.position AS title
       FROM users u
       LEFT JOIN employees e ON e.user_id = u.id
       WHERE u.id = ?`,
      [payload.id]
    );

    if (!rows.length) {
      return res.status(401).json({ status: 'error', message: 'User not found.' });
    }

    const user = rows[0];
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department || null,
      title: user.title || (user.role === 'admin' ? 'Administrator' : 'Employee')
    };
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Invalid or expired token.' });
  }
}

function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'Authentication required.' });
    }
    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ status: 'error', message: 'Forbidden: insufficient permissions.' });
    }
    next();
  };
}

module.exports = {
  authenticate,
  authorize
};
