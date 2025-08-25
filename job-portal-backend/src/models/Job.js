const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String },
    location: { type: String },
    salary: { type: String },
    jobType: { type: String },  // e.g., Full-time, Part-time
    skills: [String],
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
