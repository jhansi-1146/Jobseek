import express from "express";
import { getResumeSkills } from "../services/skillsService.js";

const router = express.Router();

router.get("/", (req, res) => {
  const skills = getResumeSkills();
  res.json(skills);
});

export default router;
