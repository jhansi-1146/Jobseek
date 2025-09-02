// pipeline/reportGenerator.js
// Day 7 - Dev5

import fs from "fs";

export const saveReport = (data, filename = "./output/skill_gap_report.json") => {
  if (!fs.existsSync("./output")) {
    fs.mkdirSync("./output");
  }
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Report saved to ${filename}`);
};
