import fs from "fs";

export function getRecommendations() {
  return JSON.parse(fs.readFileSync("./data/recommendations.json", "utf-8"));
}
