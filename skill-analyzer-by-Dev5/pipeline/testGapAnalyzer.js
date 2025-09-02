// testGapAnalyzer.js
import { analyzeGap } from "./gapAnalyzer.js";

const resumeSkills = ["python", "sql", "docker"]; // From Dev4 resume parser
const jobId = "someJobIdHere"; // Use real job _id from DB

analyzeGap(resumeSkills, jobId)
  .then(res => {
    console.log("Skill Gap Report:", JSON.stringify(res, null, 2));
  })
  .catch(err => console.error(err));
