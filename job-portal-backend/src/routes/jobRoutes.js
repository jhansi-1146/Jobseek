const express = require("express");
const {
  getJobs,
  getJobById,
  getScrapedJobs,
  getPaginatedJobs,
  applyJob,
  saveJob
} = require("../controllers/jobController");

const router = express.Router();

// Scraped jobs
router.get("/scrape/jobs", getScrapedJobs);

// Paginated jobs
router.get("/paginated", getPaginatedJobs);

// DB jobs
router.get("/", getJobs);
router.get("/:id", getJobById);

// Day 5: Apply & Save
router.post("/:id/apply", applyJob);
router.post("/:id/save", saveJob);

module.exports = router;
