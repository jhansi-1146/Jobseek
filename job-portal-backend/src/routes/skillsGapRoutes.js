const express = require("express");
const { getSkillsGapReport } = require("../controllers/skillsGapController");

const router = express.Router();

// POST /api/skills-gap/report
router.post("/report", getSkillsGapReport);

module.exports = router;
