import fs from "fs";
import { generateBarChart } from "../visuals/generateCharts.js";

export async function analyzeGap() {
  const reportPath = "./output/skill_gap_report.json";
  const chartPath = await generateBarChart(reportPath);

  const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  return {
    candidate: report.candidate || "Candidate",
    matched: report.matched || [],
    missing: report.missing || [],
    extra: report.extra || [],
    chartPath // e.g., "./visuals/skill_gap_chart.png"
  };
}
