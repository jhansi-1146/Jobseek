// pipeline/resumeParser.js
// Resume parser stub for Day 4 - Dev5
// Later Dev4 will replace this with PDF/DOC parsing

import fs from "fs";
import { extractSkills } from "./skillExtractor.js";

export const parseResumeFile = (filePath) => {
  const text = fs.readFileSync(filePath, "utf-8"); // read .txt resume
  return extractSkills(text); // pass text into extractor
};
