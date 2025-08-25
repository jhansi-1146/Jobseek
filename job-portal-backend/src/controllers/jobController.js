const Job = require("../models/Job");
const AppliedJob = require("../models/AppliedJob");
const SavedJob = require("../models/SavedJob");
const scraper = require("../services/scraper");

// ==============================
// Get all jobs from DB
// ==============================
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==============================
// Get job by ID
// ==============================
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==============================
// Scrape jobs (from external API/service)
// ==============================
exports.getScrapedJobs = async (req, res) => {
  try {
    const scrapedJobs = await scraper.fetchJobs();
    res.json(scrapedJobs);
  } catch (err) {
    res.status(500).json({ message: "Error scraping jobs", error: err.message });
  }
};

// ==============================
// Get jobs with pagination
// Example: /jobs/paginated?page=1&limit=10
// ==============================
exports.getPaginatedJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const jobs = await Job.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Job.countDocuments();

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==============================
// Apply Job (Day 5 - Dev1)
// Saves "applied" record and returns redirect URL
// ==============================
exports.applyJob = async (req, res) => {
  try {
    const { userId } = req.body; // frontend sends userId
    const { id } = req.params;   // jobId from URL

    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const applied = new AppliedJob({ userId, jobId: id });
    await applied.save();

    res.json({ redirectUrl: job.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==============================
// Save Job (Day 5 - Optional)
// Saves a job to user's saved list
// ==============================
exports.saveJob = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const saved = new SavedJob({ userId, jobId: id });
    await saved.save();

    res.json({ message: "Job saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
