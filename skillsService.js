// skillsService.js
// Utility to load skill taxonomy JSON (Day 2 - Dev5)

import fs from "fs";
import path from "path";

export const loadSkillTaxonomy = () => {

const filePath = path.resolve("./skill-analyzer/skill_taxonomy.json");
    const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};
