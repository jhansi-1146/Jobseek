import { loadSkillTaxonomy } from "./skillsService.js";

const taxonomy = loadSkillTaxonomy();
console.log("Skill Categories Available:");
for (const category in taxonomy) {
  console.log(`- ${category}: ${taxonomy[category].join(", ")}`);
}
