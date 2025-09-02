// testResumeJson.js
// Day 4 - Dev5 demo using Dev4's parsed resume JSON

import fs from "fs";
import { extractSkills } from "./pipeline/skillExtractor.js";

const resumeData = JSON.parse(
  fs.readFileSync("./resumes/response_1756032796684.json", "utf-8")
);

// Use Dev4's parsed skills field
const parsedSkills = resumeData.skills || [];

// Pass the resume text skills into your extractor for normalization
const extracted = extractSkills(parsedSkills.join(" "));

console.log("Candidate Name:", resumeData.name);
console.log("Email:", resumeData.email);
console.log("Extracted Skills:", extracted);
