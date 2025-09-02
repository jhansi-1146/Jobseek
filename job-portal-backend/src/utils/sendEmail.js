// src/utils/sendEmail.js
const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS, EMAIL_FROM } = process.env;

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });
  }
  return transporter;
}

async function sendEmail({ to, subject, html, text }) {
  const t = getTransporter();
  const info = await t.sendMail({
    from: EMAIL_FROM || EMAIL_USER,
    to,
    subject,
    text,
    html
  });
  if (process.env.NODE_ENV !== "production") {
    console.log("Email sent:", info.messageId);
  }
  return info;
}

function otpEmailTemplate(otp, title = "Your verification code") {
  return `
    <div style="font-family:system-ui,Segoe UI,Roboto;max-width:600px;padding:16px;">
      <h3 style="margin:0 0 8px 0;">${title}</h3>
      <p>Use this 6-digit code to proceed. It will expire in 10 minutes.</p>
      <div style="font-size:28px;letter-spacing:6px;padding:12px;border:1px dashed #ccc;width:fit-content;">${otp}</div>
      <p style="color:#6b7280">If you did not request this, please ignore.</p>
    </div>
  `;
}

module.exports = { sendEmail, otpEmailTemplate };
