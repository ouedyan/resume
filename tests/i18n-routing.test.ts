import assert from "node:assert/strict";
import test from "node:test";

import {
  alternateLanguagePaths,
  formatDateRange,
  localeConfig,
  localePath,
  localeUrl,
  pdfPath,
} from "../lib/i18n/config";

test("builds stable locale and PDF paths", () => {
  assert.equal(localePath("en"), "/en");
  assert.equal(localePath("tr"), "/tr");
  assert.equal(pdfPath("fr"), "/api/pdf/fr");
  assert.equal(localeUrl("en"), "https://resume.ouedyan.dev/en");
});

test("publishes reciprocal language alternatives", () => {
  assert.deepEqual(alternateLanguagePaths, {
    en: "/en",
    fr: "/fr",
    tr: "/tr",
    "x-default": "/en",
  });
});

test("defines language and sharing metadata for every locale", () => {
  assert.deepEqual(localeConfig.en, {
    htmlLang: "en",
    intlLocale: "en-US",
    label: "English",
    openGraphLocale: "en_US",
  });
  assert.deepEqual(localeConfig.fr, {
    htmlLang: "fr",
    intlLocale: "fr-FR",
    label: "Français",
    openGraphLocale: "fr_FR",
  });
  assert.deepEqual(localeConfig.tr, {
    htmlLang: "tr",
    intlLocale: "tr-TR",
    label: "Türkçe",
    openGraphLocale: "tr_TR",
  });
});

test("formats resume dates using each language convention", () => {
  assert.equal(formatDateRange("en", "2024-09", null, "Present"), "Sep 2024 – Present");
  assert.equal(
    formatDateRange("fr", "2024-09", null, "Aujourd’hui"),
    "sept. 2024 – Aujourd’hui",
  );
  assert.equal(
    formatDateRange("tr", "2024-09", "2026-01", "Halen"),
    "Eyl 2024 – Oca 2026",
  );
});
