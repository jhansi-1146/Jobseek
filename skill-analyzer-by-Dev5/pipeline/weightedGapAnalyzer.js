// pipeline/weightedGapAnalyzer.js
import fs from "fs";
import { analyzeSkillGap } from "./gapAnalyzer.js";

const loadWeights = () => {
  const data = fs.readFileSync("./data/skill_weights.json", "utf-8");
  return JSON.parse(data);
};

export const analyzeWeightedGap = (resumeSkills, jobSkills) => {
  const weights = loadWeights();
  const { matched, missing, extra } = analyzeSkillGap(resumeSkills, jobSkills);

  const weighted = {
    matched: matched.map(skill => ({ skill, weight: weights[skill] || 1 })),
    missing: missing
      .map(skill => ({ skill, weight: weights[skill] || 1 }))
      .sort((a, b) => b.weight - a.weight),
    extra: extra.map(skill => ({ skill, weight: weights[skill] || 1 }))
  };

  return weighted;
};
