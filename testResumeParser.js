// testResumeParser.js
// Demo script for Day 4 - Dev5

import { parseResumeFile } from "./pipeline/resumeParser.js";

const extracted = parseResumeFile("./sample/resume.txt");
console.log("Extracted Skills from Resume:", extracted);
