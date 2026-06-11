import assert from "node:assert/strict";
import test from "node:test";

import manifest from "../app/manifest";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

test("allows resume crawling while excluding generated API routes", () => {
  assert.deepEqual(robots(), {
    host: "https://resume.ouedyan.dev",
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://resume.ouedyan.dev/sitemap.xml",
  });
});

test("publishes all locale URLs with reciprocal absolute alternates", () => {
  const entries = sitemap();
  const languages = {
    en: "https://resume.ouedyan.dev/en",
    fr: "https://resume.ouedyan.dev/fr",
    tr: "https://resume.ouedyan.dev/tr",
    "x-default": "https://resume.ouedyan.dev/en",
  };

  assert.deepEqual(
    entries.map(({ url }) => url),
    [
      "https://resume.ouedyan.dev/en",
      "https://resume.ouedyan.dev/fr",
      "https://resume.ouedyan.dev/tr",
    ],
  );

  for (const entry of entries) {
    assert.deepEqual(entry.alternates?.languages, languages);
    assert.equal(entry.changeFrequency, "monthly");
  }
});

test("describes the installable resume application and icon set", () => {
  const value = manifest();

  assert.equal(value.name, "Yan OUEDRAOGO — Resume");
  assert.equal(value.short_name, "Yan Resume");
  assert.equal(value.start_url, "/en");
  assert.equal(value.scope, "/");
  assert.equal(value.display, "standalone");
  assert.equal(value.theme_color, "#323336");
  assert.equal(value.background_color, "#e4ebf1");
  assert.deepEqual(value.icons, [
    {
      src: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ]);
});
