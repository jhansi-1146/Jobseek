// gapAnalyzer.js
import { matchSkills } from "./matcher.js";

export async function analyzeGap(resumeSkills, jobId) {
  const result = await matchSkills(resumeSkills, jobId);
  return {
    candidate: "From Resume",
    jobId,
    report: result,
  };
}
