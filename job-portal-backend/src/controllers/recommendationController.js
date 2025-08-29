const Job = require("../models/Job"); // Assuming you already have Job schema

// Utility: simple skill match scoring
const calculateMatchScore = (userSkills, jobSkills) => {
  const lowerUser = userSkills.map(s => s.toLowerCase());
  const lowerJob = jobSkills.map(s => s.toLowerCase());

  let matched = lowerJob.filter(skill => lowerUser.includes(skill));
  let score = (matched.length / jobSkills.length) * 100;

  return { score, matched };
};

// Controller: Job Recommendation
const getRecommendedJobs = async (req, res) => {
  try {
    const { userSkills } = req.body;

    if (!userSkills || userSkills.length === 0) {
      return res.status(400).json({ message: "userSkills are required" });
    }

    // Fetch jobs from DB
    const jobs = await Job.find();

    // Calculate match score for each job
    const recommendations = jobs.map(job => {
      const jobSkills = job.skillsRequired || [];
      const { score, matched } = calculateMatchScore(userSkills, jobSkills);

      return {
        jobId: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        skillsRequired: jobSkills,
        matchedSkills: matched,
        matchScore: Math.round(score),
      };
    });

    // Sort by best match first
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    return res.status(200).json({
      message: "Job recommendations generated successfully",
      recommendations,
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRecommendedJobs };
