// Mock function: In real system, skills will come from DB (user resume + job data)
const generateSkillsGap = (resumeSkills, jobSkills) => {
  const lowerResume = resumeSkills.map(s => s.toLowerCase());
  const lowerJob = jobSkills.map(s => s.toLowerCase());

  const matchedSkills = lowerResume.filter(skill => lowerJob.includes(skill));
  const missingSkills = lowerJob.filter(skill => !lowerResume.includes(skill));

  return {
    matchedSkills,
    missingSkills,
    gapCount: missingSkills.length,
  };
};

// Controller function
const getSkillsGapReport = (req, res) => {
  try {
    const { resumeSkills, jobSkills } = req.body;

    if (!resumeSkills || !jobSkills) {
      return res.status(400).json({ message: "resumeSkills and jobSkills are required" });
    }

    const gapReport = generateSkillsGap(resumeSkills, jobSkills);

    return res.status(200).json({
      message: "Skills gap report generated successfully",
      report: gapReport,
    });
  } catch (error) {
    console.error("Error generating skills gap report:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSkillsGapReport };
