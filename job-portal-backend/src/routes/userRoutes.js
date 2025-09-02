// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/signup/start", auth.signupStart);      // sends OTP & creates unverified user
router.post("/signup/verify", auth.signupVerify);    // verify OTP -> finalize signup & return JWT
router.post("/login", auth.login);                   // login and return JWT
router.post("/forgot", auth.forgotPassword);         // send reset OTP
router.post("/reset", auth.resetPassword);           // verify OTP and set new password

module.exports = router;
