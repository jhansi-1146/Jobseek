// src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },

  // OTP fields for verification / reset (kept simple)
  otp: { type: String },            // store hashed OTP or plain for quick prototyping
  otpExpiry: { type: Date },

}, { timestamps: true });

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.otp;
  delete obj.otpExpiry;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
