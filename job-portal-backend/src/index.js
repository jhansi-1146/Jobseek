require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const setupSwagger = require("./config/swagger"); // ✅ Day 9 Dev1 (Swagger Docs)

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
app.use(cors());
app.use(express.json());

// =====================
// Swagger Docs
// =====================
setupSwagger(app); // ✅ Visit http://localhost:5000/api/docs

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
// Start server
// =====================
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
