import express from "express";

const router = express.Router();

// Static data for now
router.get("/", (req, res) => {
  res.json([
    { name: "React", demand: "High", note: "Most in-demand frontend framework" },
    { name: "Node.js", demand: "High", note: "Backend JS" },
    { name: "Python", demand: "Medium", note: "Data/AI" }
  ]);
});

export default router;
