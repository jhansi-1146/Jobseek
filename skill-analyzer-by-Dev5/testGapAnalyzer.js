// testGapAnalyzer.js
import fs from "fs";
import { analyzeSkillGap } from "./pipeline/gapAnalyzer.js";

// Load Dev4 resume JSON
const resume = JSON.parse(fs.readFileSync("./resumes/response_1756032796684.json", "utf-8"));
const resumeSkills = resume.skills;

// Mock Job JSON
const job = {
  title: "Full Stack Developer",
  skills: ["Python", "React", "SQL", "Docker", "AWS"]
};
const jobSkills = job.skills;

// Run analyzer
const result = analyzeSkillGap(resumeSkills, jobSkills);

console.log("Resume Skills:", resumeSkills);
console.log("Job Skills:", jobSkills);
console.log("Skill Gap Report:", result);
