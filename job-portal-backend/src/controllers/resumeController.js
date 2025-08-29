const path = require("path");
const fs = require("fs");

// Resume upload handler
const uploadResume = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // File path where resume is stored
    const filePath = path.join(__dirname, "../../uploads", req.file.filename);

    return res.status(200).json({
      message: "Resume uploaded successfully",
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        path: filePath,
      },
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadResume };
