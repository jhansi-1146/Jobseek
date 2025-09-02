import express from "express";
import { analyzeGap } from "../services/matcherService.js";

const router = express.Router();

router.get("/", (req, res) => {
  const result = analyzeGap();
  res.json(result);
});

export default router;
