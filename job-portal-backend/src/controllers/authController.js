// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendEmail, otpEmailTemplate } = require("../utils/sendEmail");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function signToken(user) {
  return jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper to hash OTP before saving (optional)
function hashValue(v) {
  return crypto.createHash("sha256").update(String(v)).digest("hex");
}

// POST /api/users/signup/start
async function signupStart(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    // create a temporary user object in memory by returning tempToken to frontend
    // generate OTP and email
    const otp = generateOTP();
    const otpHash = hashValue(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP temporarily in DB using an uncreated user record approach:
    // We'll create a minimal record with passwordHash but isEmailVerified=false
    // OR you can keep it ephemeral on front-end in tempToken — here we create a DB record to simplify
    const user = await User.create({
      fullName,
      email,
      passwordHash,
      isEmailVerified: false,
      otp: otpHash,
      otpExpiry
    });

    // send otp email
    await sendEmail({
      to: email,
      subject: "Verify your Career Companion account",
      html: otpEmailTemplate(otp, "Verify your Career Companion account"),
    });

    return res.status(200).json({ message: "Verification code sent to email" });
  } catch (err) {
    console.error("signupStart:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// POST /api/users/signup/verify
async function signupVerify(req, res) {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: "Missing email or code" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No signup in progress for this email" });

    if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    const hashed = hashValue(code);
    if (hashed !== user.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = signToken(user);
    return res.status(201).json({ user: user.toJSON(), token });
  } catch (err) {
    console.error("signupVerify:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// POST /api/users/login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing email or password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    const token = signToken(user);
    return res.json({ user: user.toJSON(), token });
  } catch (err) {
    console.error("login:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// POST /api/users/forgot  -> send reset code
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Missing email" });

    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: "If that email exists, a code has been sent" });

    const otp = generateOTP();
    const otpHash = hashValue(otp);
    user.otp = otpHash;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: email,
      subject: "Reset your Career Companion password",
      html: otpEmailTemplate(otp, "Reset your Career Companion password"),
    });

    return res.status(200).json({ message: "If that email exists, a code has been sent" });
  } catch (err) {
    console.error("forgotPassword:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// POST /api/users/reset -> verify code & set new password
async function resetPassword(req, res) {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid request" });

    if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    const hashed = hashValue(code);
    if (hashed !== user.otp) return res.status(400).json({ message: "Invalid OTP" });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("resetPassword:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  signupStart,
  signupVerify,
  login,
  forgotPassword,
  resetPassword
};
