import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const resume = JSON.parse(
  readFileSync(new URL("../app/resume-data.json", import.meta.url), "utf8"),
);

assert.equal(
  resume.profile.headline,
  "Senior Full-Stack & Platform Engineer",
);
assert.equal(
  resume.profile.currentRole,
  "Founder & Principal Software Engineer",
);

const simulon = resume.experience.find(
  (experience) => experience.company === "Simulon",
);
assert.ok(simulon, "Simulon experience must be present");
assert.equal(simulon.role, "Contract Software Engineer");
assert.equal(simulon.startDate, "Aug 2025");
assert.equal(simulon.endDate, "Jan 2026");
assert.equal(simulon.bullets.length, 3);

const zalisoftEntries = resume.experience.filter(
  (experience) => experience.company === "Zalisoft",
);
assert.equal(zalisoftEntries.length, 1, "Zalisoft must be consolidated");

assert.ok(
  !resume.experience.some((experience) => experience.company === "Freelancer"),
  "The empty freelancer entry must be removed",
);
assert.ok(
  !resume.projects.some((project) => project.name === "Go Mod Helper"),
  "The stale Go Mod Helper project must be removed",
);

const skillGroupNames = resume.skillGroups.map((group) => group.name);
assert.deepEqual(skillGroupNames, [
  "Frontend & Mobile",
  "Backend & Security",
  "Cloud & Platform",
  "Quality & Operations",
]);

console.log("Resume content validation passed.");
