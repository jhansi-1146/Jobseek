// visuals/generateCharts.js
import fs from "fs";
import path from "path";
import { Canvas } from "skia-canvas";
import Chart from "chart.js/auto/auto.js";

const chartsDir = path.resolve("./visuals"); // not public/

export async function generateBarChart(reportPath) {
  const data = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  const report = data.report || data;

  const matched = report.matched || [];
  const missing = report.missing || [];
  const extra = report.extra || [];

  const labels = ["Matched", "Missing", "Extra"];
  const counts = [matched.length, missing.length, extra.length];

  const canvas = new Canvas(800, 600);
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Skill Counts",
          data: counts,
          backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: `Skill Gap Analysis for ${data.candidate || "Candidate"}`,
        },
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
      },
    },
  });

  const outputPath = path.join(chartsDir, "skill_gap_chart.png");
  await fs.promises.writeFile(outputPath, await canvas.png);
  return outputPath; // local PNG path
}
