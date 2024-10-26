const pool = require('../config/db');

async function getUserByEmail(email) {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
}

async function createUser(email, otp) {
  const res = await pool.query('INSERT INTO users (email, otp) VALUES ($1, $2) RETURNING *', [email, otp]);
  return res.rows[0];
}

async function updateUserOtp(email, otp) {
  await pool.query('UPDATE users SET otp = $1 WHERE email = $2', [otp, email]);
}

module.exports = { getUserByEmail, createUser, updateUserOtp };
