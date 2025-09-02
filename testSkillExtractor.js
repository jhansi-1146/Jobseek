// testSkillExtractor.js
// Quick demo script for Day 3 - Dev5

import { extractSkills } from "./pipeline/skillExtractor.js";
import { loadSkillTaxonomy } from "./skillsService.js";

// Load taxonomy (so pipeline uses the same source as Day 2)
const taxonomy = loadSkillTaxonomy();

const sampleResume = `
  I am a software engineer with experience in Python, React, and AWS cloud deployment.
  I have also worked with Docker and SQL databases.
`;

const extracted = extractSkills(sampleResume);
console.log("Extracted Skills:", extracted);
