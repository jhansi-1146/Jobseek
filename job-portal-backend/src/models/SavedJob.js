// models/SavedJob.js
const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // assuming you’ll have a User model later
      required: true,
      ref: "User",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job",
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedJob", savedJobSchema);
