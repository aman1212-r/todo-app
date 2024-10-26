const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'chaim74@ethereal.email',
        pass: 'HDrXxKXv9D5vevTypv'
    }
});


async function sendOtp(email, otp) {
    console.log(otp)
    console.log(email)
  await transporter.sendMail({
    from: `"Todo App" <chaim74@ethereal.email>`,
    to: email,
    subject: 'Your OTP for Todo App Login',
    text: `Your OTP is ${otp}`,
  });
}
module.exports = { sendOtp };
