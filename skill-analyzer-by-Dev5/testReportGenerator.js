// testReportGenerator.js
// Day 7 - Dev5

import fs from "fs";
import { analyzeSkillGap } from "./pipeline/gapAnalyzer.js";
import { saveReport } from "./pipeline/reportGenerator.js";

// Load Dev4 resume JSON
const resume = JSON.parse(fs.readFileSync("./resumes/response_1756032796684.json", "utf-8"));
const resumeSkills = resume.skills;

// Load sample job JSON
const job = JSON.parse(fs.readFileSync("./jobs/sampleJob.json", "utf-8"));
const jobSkills = job.skills;

// Run gap analysis
const result = analyzeSkillGap(resumeSkills, jobSkills);

// Save report
saveReport({
  candidate: resume.name,
  jobTitle: job.title,
  report: result
});
