import fs from "fs";

export function getResumeSkills() {
  const data = JSON.parse(fs.readFileSync("./resume_parsed.json", "utf-8"));
  return data.skills || [];
}
