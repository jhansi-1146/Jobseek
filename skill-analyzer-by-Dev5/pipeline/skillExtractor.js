// pipeline/skillExtractor.js
// Enhanced skill extraction pipeline (Day 4 - Dev5)

import { loadSkillTaxonomy } from "../skillsService.js";

// Utility to escape regex special characters in skills like C++, .NET
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const extractSkills = (text) => {
  // Step 1: Load taxonomy
  const taxonomy = loadSkillTaxonomy();

  // Step 2: Normalize text (lowercase + remove special chars)
  const normalized = text.toLowerCase().replace(/[^a-z0-9+\.# ]/g, " ");

  // Step 3: Regex-based extraction with escaping
  let extracted = [];
  Object.values(taxonomy).flat().forEach(skill => {
    const safeSkill = escapeRegex(skill.toLowerCase());
    const regex = new RegExp(`\\b${safeSkill}\\b`, "i");
    if (regex.test(normalized)) {
      extracted.push(skill);
    }
  });

  // Step 4: Return unique extracted skills
  return [...new Set(extracted)];
};
