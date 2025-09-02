// pipeline/matcher.js
// Day 5 - Dev5
// Matching algorithm between resume skills and job requirements

// matcher.js
import { connectDB } from "./utils/db.js";

export async function matchSkills(resumeSkills, jobId) {
  const db = await connectDB();
  const job = await db.collection("jobs").findOne({ _id: jobId });

  if (!job) throw new Error("Job not found");

  const jobSkills = job.requiredSkills || [];
  const matched = resumeSkills.filter(s => jobSkills.includes(s));
  const missing = jobSkills.filter(s => !resumeSkills.includes(s));
  const extra   = resumeSkills.filter(s => !jobSkills.includes(s));

  return { matched, missing, extra };
}
