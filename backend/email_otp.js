// server.js (or index.js)
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const otpStore = new Map(); // Store OTPs temporarily

// Email sending setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-email-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Generated OTP for ${email}: ${otp}`);

  otpStore.set(email, otp); // ✅ inside the handler!

  try {
    await transporter.sendMail({
      from: `"Aniyor" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Aniyor OTP Verification',
      html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`
    });

    res.json({ message: 'OTP sent to email.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP', details: err.message });
  }
});

app.post('/verify-email-otp', (req, res) => {
  const { email, otp } = req.body;
  const validOtp = otpStore.get(email);

  if (otp === validOtp) {
    otpStore.delete(email);
    return res.status(200).json({ verified: true });
  } else {
    return res.status(400).json({ verified: false, message: 'Invalid OTP' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
