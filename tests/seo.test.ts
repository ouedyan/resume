import assert from "node:assert/strict";
import test from "node:test";

import { getResume } from "../content/resume";
import { locales } from "../lib/i18n/config";
import {
  buildMetadata,
  buildProfilePageJsonLd,
  serializeJsonLd,
} from "../lib/seo";

test("builds self-canonical localized metadata with reciprocal alternatives", () => {
  const metadata = buildMetadata("fr", getResume("fr"));

  assert.equal(metadata.alternates?.canonical, "/fr");
  assert.deepEqual(metadata.alternates?.languages, {
    en: "/en",
    fr: "/fr",
    tr: "/tr",
    "x-default": "/en",
  });
  assert.equal(metadata.openGraph?.locale, "fr_FR");
  assert.equal(metadata.openGraph?.url, "/fr");
  assert.deepEqual(metadata.openGraph?.alternateLocale, ["en_US", "tr_TR"]);
  assert.ok(metadata.twitter && "card" in metadata.twitter);
  assert.equal(metadata.twitter.card, "summary_large_image");
  assert.deepEqual(metadata.robots, {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  });
});

test("uses localized page titles and descriptions", () => {
  for (const locale of locales) {
    const resume = getResume(locale);
    const metadata = buildMetadata(locale, resume);

    assert.equal(
      metadata.title,
      `${resume.profile.name} | ${resume.profile.headline}`,
    );
    assert.equal(metadata.description, resume.seo.description);
    assert.deepEqual(metadata.openGraph?.images, [
      {
        alt: `${resume.profile.name} — ${resume.profile.headline}`,
        height: 630,
        url: `/${locale}/opengraph-image`,
        width: 1200,
      },
    ]);
  }
});

test("builds locale-consistent ProfilePage and Person structured data", () => {
  for (const locale of locales) {
    const resume = getResume(locale);
    const jsonLd = buildProfilePageJsonLd(locale, resume);
    const [profilePage, person] = jsonLd["@graph"];

    assert.equal(profilePage["@type"], "ProfilePage");
    assert.equal(profilePage.url, `https://resume.ouedyan.dev/${locale}`);
    assert.equal(profilePage.inLanguage, locale);
    assert.deepEqual(profilePage.mainEntity, {
      "@id": "https://resume.ouedyan.dev/#person",
    });

    assert.equal(person["@type"], "Person");
    assert.equal(person["@id"], "https://resume.ouedyan.dev/#person");
    assert.equal(person.name, resume.profile.name);
    assert.equal(person.jobTitle, resume.profile.currentRole);
    assert.deepEqual(
      person.knowsLanguage.map(
        ({ alternateName }: { alternateName: string }) => alternateName,
      ),
      ["fr", "en", "tr"],
    );
    assert.ok(person.knowsAbout.includes("Next.js"));
    assert.doesNotThrow(() => JSON.stringify(jsonLd));
  }
});

test("escapes JSON-LD characters that could terminate the script element", () => {
  const serialized = serializeJsonLd({
    text: "</script><script>alert('x')</script>&\u2028\u2029",
  });

  assert.doesNotMatch(serialized, /<\/script>/i);
  assert.match(serialized, /\\u003c/);
  assert.match(serialized, /\\u003e/);
  assert.match(serialized, /\\u0026/);
  assert.match(serialized, /\\u2028/);
  assert.match(serialized, /\\u2029/);
});
