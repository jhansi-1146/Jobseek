// testWeightedAnalyzer.js
import fs from "fs";
import { analyzeWeightedGap } from "./pipeline/weightedGapAnalyzer.js";

// Load Dev4’s resume JSON (corrected path)
const resume = JSON.parse(fs.readFileSync("./resumes/response_1756032796684.json", "utf-8"));
const resumeSkills = resume.skills;

// Load sample job JSON
const job = JSON.parse(fs.readFileSync("./jobs/sampleJob.json", "utf-8"));
const jobSkills = job.skills;

const result = analyzeWeightedGap(resumeSkills, jobSkills);

console.log("Weighted Skill Gap Report:");
console.log("Matched:", result.matched);
console.log("Missing (ranked):", result.missing);
console.log("Extra:", result.extra);
