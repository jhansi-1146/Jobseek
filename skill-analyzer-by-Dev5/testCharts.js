import { generateBarChart } from "./visuals/generateCharts.js";

(async () => {
  await generateBarChart(
    "./output/skill_gap_report.json",
    "./visuals/skill_gap_chart.png"
  );
  console.log("Chart saved to ./visuals/skill_gap_chart.png");
})();
