const express = require("express");
const { getRecommendedJobs } = require("../controllers/recommendationController");

const router = express.Router();

// POST /api/recommendations
router.post("/", getRecommendedJobs);

module.exports = router;
