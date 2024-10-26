const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');
const { sendOtp } = require('../services/emailService');
require('dotenv').config();

async function login(req, res) {
  const { email } = req.body;
  let user = await authModel.getUserByEmail(email);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  if (!user) {
    user = await authModel.createUser(email, otp);
  } else {
    await authModel.updateUserOtp(email, otp);
  }

  await sendOtp(email, otp);
  console.log("Done")
  res.json({ message: 'OTP sent to your email' });
}

async function verifyOtp(req, res) {
  const { email, otp } = req.body;
  const user = await authModel.getUserByEmail(email);

  if (!user || user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}

module.exports = { login, verifyOtp };
