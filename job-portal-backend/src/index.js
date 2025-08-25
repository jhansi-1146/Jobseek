require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// Health check endpoint
// =====================
app.get("/api/health", (req, res) => {
  res.json({ ok: true, msg: "Backend working 🚀" });
});

// =====================
// API Routes
// =====================
app.use("/api/jobs", jobRoutes);   // Jobs (DB + Scraper + Apply/Save)
app.use("/api/users", userRoutes); // Users

// =====================
// Start server
// =====================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`✅ Server running at http://localhost:${PORT}`)
  );
}).catch((err) => {
  console.error("❌ Failed to connect to MongoDB", err);
});
