const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadResume } = require("../controllers/resumeController");

const router = express.Router();

// Setup storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// File filter (only PDF/DOCX allowed)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF/DOCX allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// POST /api/resume/upload
router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;
