require('dotenv').config({ path: __dirname + '/../.env' }); // load env from root

console.log("MONGO URI:", process.env.MONGODB_URI); // debug check
require('dotenv').config();
console.log("MONGO URI:", process.env.MONGODB_URI); // debug
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const setupSwagger = require("./config/swagger");

// Import routes
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const skillsGapRoutes = require("./routes/skillsGapRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

// =====================
// Middleware
// =====================
app.use(cors({ origin: "*" })); // 🔒 Later restrict origins if frontend URL is fixed
app.use(express.json());
app.use(morgan("dev")); // ✅ Logs requests in console

// =====================
// Swagger Docs
// =====================
setupSwagger(app); // Visit http://localhost:5000/api/docs

// =====================
// Health check endpoint
// =====================
app.get("/api/health", (req, res) => {
  res.json({ ok: true, msg: "Backend working 🚀" });
});

// =====================
// API Routes
// =====================
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/skills-gap", skillsGapRoutes);
app.use("/api/recommendations", recommendationRoutes);

// =====================
// Error Handling Middleware
// =====================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// =====================
// Start server
// =====================
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  }
})();
