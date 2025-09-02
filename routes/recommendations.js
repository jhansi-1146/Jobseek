import express from "express";
import { getRecommendations } from "../services/recommendationsService.js";

const router = express.Router();

router.get("/", (req, res) => {
  const data = getRecommendations();
  res.json(data);
});

export default router;
