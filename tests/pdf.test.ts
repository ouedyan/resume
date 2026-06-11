import assert from "node:assert/strict";
import test from "node:test";

import {
  buildResumePageUrl,
  pdfCacheControl,
  pdfFilename,
  resolveResumeBaseUrl,
} from "../lib/pdf";

test("builds locale-specific PDF filenames and cache policy", () => {
  assert.equal(pdfFilename("en"), "Yan_OUEDRAOGO_Resume_en.pdf");
  assert.equal(pdfFilename("fr"), "Yan_OUEDRAOGO_Resume_fr.pdf");
  assert.equal(pdfFilename("tr"), "Yan_OUEDRAOGO_Resume_tr.pdf");
  assert.equal(
    pdfCacheControl,
    "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
  );
});

test("builds a resume page URL from a trusted base URL", () => {
  assert.equal(
    buildResumePageUrl("tr", "https://resume.ouedyan.dev"),
    "https://resume.ouedyan.dev/tr",
  );
});

test("uses the canonical origin in production", () => {
  assert.equal(
    resolveResumeBaseUrl({
      environment: "production",
      requestOrigin: "https://attacker.example",
    }),
    "https://resume.ouedyan.dev",
  );
});

test("accepts loopback origins during local development", () => {
  assert.equal(
    resolveResumeBaseUrl({
      environment: "development",
      requestOrigin: "http://127.0.0.1:3100",
    }),
    "http://127.0.0.1:3100",
  );
  assert.equal(
    resolveResumeBaseUrl({
      environment: "development",
      requestOrigin: "http://localhost:3000",
    }),
    "http://localhost:3000",
  );
});

test("ignores untrusted request origins outside local development", () => {
  assert.equal(
    resolveResumeBaseUrl({
      environment: "development",
      requestOrigin: "https://attacker.example",
    }),
    "https://resume.ouedyan.dev",
  );
});

test("validates an explicitly configured base URL", () => {
  assert.equal(
    resolveResumeBaseUrl({
      configuredBaseUrl: "https://preview.example/resume/",
      environment: "development",
      requestOrigin: "http://localhost:3000",
    }),
    "https://preview.example",
  );

  assert.throws(
    () =>
      resolveResumeBaseUrl({
        configuredBaseUrl: "file:///tmp/resume.html",
        environment: "development",
      }),
    /http or https/i,
  );
});
