// testMatcher.js
// Day 5 demo script for skill matching

import fs from "fs";
import { extractSkills } from "./pipeline/skillExtractor.js";
import { matchSkills } from "./pipeline/matcher.js";

// Load Dev4 resume JSON
const resumeData = JSON.parse(
  fs.readFileSync("./resumes/response_1756032796684.json", "utf-8")
);

// Extract resume skills using Dev5 extractor
const extractedResumeSkills = extractSkills((resumeData.skills || []).join(" "));

// Load job JSON
const jobData = JSON.parse(fs.readFileSync("./jobs/sampleJob.json", "utf-8"));
const jobSkills = jobData.skills;

// Run matching algorithm
const results = matchSkills(extractedResumeSkills, jobSkills);

console.log("Candidate Name:", resumeData.name);
console.log("Job Title:", jobData.title);
console.log("Matched Skills:", results.matched);
console.log("Missing Skills:", results.missing);
console.log("Extra Skills:", results.extra);
