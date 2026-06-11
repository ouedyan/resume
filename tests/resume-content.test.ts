import assert from "node:assert/strict";
import test from "node:test";

import { getResume } from "../content/resume";
import {
  defaultLocale,
  isLocale,
  locales,
} from "../lib/i18n/config";

test("exposes the complete supported locale set", () => {
  assert.deepEqual(locales, ["en", "fr", "tr"]);
  assert.equal(defaultLocale, "en");
  assert.equal(isLocale("tr"), true);
  assert.equal(isLocale("de"), false);
});

test("uses independently authored professional headlines", () => {
  assert.equal(
    getResume("en").profile.headline,
    "Senior Full-Stack & Platform Engineer",
  );
  assert.equal(
    getResume("fr").profile.headline,
    "Ingénieur logiciel senior full-stack et plateforme",
  );
  assert.equal(
    getResume("tr").profile.headline,
    "Kıdemli Full-Stack ve Platform Mühendisi",
  );
});

test("keeps verified employment facts aligned across locales", () => {
  const reference = getResume("en");

  for (const locale of locales) {
    const resume = getResume(locale);

    assert.equal(resume.profile.email, reference.profile.email);
    assert.equal(resume.profile.phone, reference.profile.phone);
    assert.deepEqual(resume.profile.linkedin, reference.profile.linkedin);
    assert.deepEqual(resume.profile.github, reference.profile.github);
    assert.deepEqual(
      resume.profile.currentOrganization,
      reference.profile.currentOrganization,
    );

    assert.deepEqual(
      resume.experience.map(
        ({ id, company, website, startDate, endDate }) => ({
          id,
          company,
          website,
          startDate,
          endDate,
        }),
      ),
      reference.experience.map(
        ({ id, company, website, startDate, endDate }) => ({
          id,
          company,
          website,
          startDate,
          endDate,
        }),
      ),
    );

    assert.deepEqual(
      resume.projects.map(({ id, website, startYear, endYear }) => ({
        id,
        website,
        startYear,
        endYear,
      })),
      reference.projects.map(({ id, website, startYear, endYear }) => ({
        id,
        website,
        startYear,
        endYear,
      })),
    );
  }
});

test("preserves the verified Simulon contract dates", () => {
  for (const locale of locales) {
    const simulon = getResume(locale).experience.find(
      ({ id }) => id === "simulon",
    );

    assert.ok(simulon);
    assert.equal(simulon.startDate, "2025-08");
    assert.equal(simulon.endDate, "2026-01");
  }
});

test("localizes prose instead of copying English sentences", () => {
  const english = getResume("en");

  for (const locale of ["fr", "tr"] as const) {
    const localized = getResume(locale);

    assert.notEqual(localized.profile.summary, english.profile.summary);
    assert.notEqual(localized.seo.description, english.seo.description);

    localized.experience.forEach((experience, index) => {
      assert.notEqual(experience.role, english.experience[index].role);
      assert.notEqual(experience.summary, english.experience[index].summary);

      const localizedCopy = [
        ...(experience.bullets ?? []),
        ...(experience.projects?.flatMap(({ bullets }) => bullets) ?? []),
      ].join(" ");
      const englishCopy = [
        ...(english.experience[index].bullets ?? []),
        ...(english.experience[index].projects?.flatMap(
          ({ bullets }) => bullets,
        ) ?? []),
      ].join(" ");

      assert.notEqual(localizedCopy, englishCopy);
    });
  }
});

test("provides every rendered section and accessibility label", () => {
  for (const locale of locales) {
    const resume = getResume(locale);

    assert.ok(resume.sections.workExperience);
    assert.ok(resume.sections.openSource);
    assert.ok(resume.sections.technicalSkills);
    assert.ok(resume.sections.languages);
    assert.ok(resume.actions.downloadPdf);
    assert.ok(resume.actions.switchLanguage);
    assert.ok(resume.labels.present);
    assert.equal(resume.experience.length, 3);
    assert.equal(resume.projects.length, 2);
    assert.equal(resume.skillGroups.length, 4);
    assert.deepEqual(
      resume.languages.map(({ id }) => id),
      ["fr", "en", "tr"],
    );
  }
});

test("does not restore stale resume entries", () => {
  for (const locale of locales) {
    const resume = getResume(locale);
    const searchable = JSON.stringify(resume);

    assert.doesNotMatch(searchable, /Freelancer/i);
    assert.doesNotMatch(searchable, /Go Mod Helper/i);
  }
});
