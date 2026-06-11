# Multilingual Production Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a secure, production-quality English/French/Turkish resume at `resume.ouedyan.dev`, with locale-specific PDFs generated from the localized Next.js pages.

**Architecture:** Statically generate `/en`, `/fr`, and `/tr` from independently authored typed content, with a locale root layout that owns the correct document language and metadata. Generate PDFs in a constrained Vercel Node.js route using serverless Chromium, and expose SEO/identity surfaces through Next.js metadata file conventions.

**Tech Stack:** Next.js 16 App Router, React 19.2, TypeScript, Tailwind CSS, `next/font`, `puppeteer-core`, `@sparticuz/chromium`, Node.js test runner, pnpm, GitHub Actions, Vercel.

---

### Task 1: Preserve The Current Resume Baseline

**Files:**
- Modify: `.gitignore`
- Delete: `public/file.svg`
- Delete: `public/globe.svg`
- Delete: `public/next.svg`
- Delete: `public/vercel.svg`
- Delete: `public/window.svg`
- Delete: `postcss.config.mjs`
- Commit existing intended resume files without local screenshots, generated PDFs, IDE files, or scratch exports.

- [ ] **Step 1: Extend repository ignores**

Add explicit ignores for `.idea/`, generated root PDFs, `*-CleanShot.png`,
`project_structure.txt`, and `standard-resume-pro-ui.html`.

- [ ] **Step 2: Remove obsolete scaffold assets**

Delete unused Create Next App SVGs and the duplicate PostCSS config.

- [ ] **Step 3: Verify the intended baseline**

Run:

```bash
pnpm test:resume
pnpm lint
pnpm exec tsc --noEmit
pnpm build
git diff --check
```

Expected: all commands pass and local-only artifacts are ignored.

- [ ] **Step 4: Commit**

```bash
git add .gitignore app eslint.config.mjs package.json pnpm-lock.yaml \
  postcss.config.js tailwind.config.js scripts public
git commit -m "feat: refresh resume content and PDF layout"
```

### Task 2: Upgrade And Secure The Runtime

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `next.config.ts`
- Modify: `eslint.config.mjs`

- [ ] **Step 1: Record the failing security gate**

Run:

```bash
pnpm audit --prod --audit-level high
```

Expected before upgrade: non-zero exit caused by vulnerable Next.js 15.2.1 and
Puppeteer transitive dependencies.

- [ ] **Step 2: Upgrade production dependencies**

Set Next.js and `eslint-config-next` to the latest patched 16.2 release, React
and React DOM to the matching 19.2 release, replace `puppeteer` with current
compatible `puppeteer-core` and `@sparticuz/chromium`, and remove the unused
`@react-pdf/renderer`.

Pin the package manager and require Node.js 22:

```json
{
  "packageManager": "pnpm@10.13.1",
  "engines": {
    "node": "22.x",
    "pnpm": "10.x"
  }
}
```

- [ ] **Step 3: Configure production headers**

Add headers for all routes:

```ts
{
  key: "X-Content-Type-Options",
  value: "nosniff",
}
{
  key: "Referrer-Policy",
  value: "strict-origin-when-cross-origin",
}
{
  key: "Permissions-Policy",
  value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
}
{
  key: "X-Frame-Options",
  value: "DENY",
}
```

Add HSTS in production and a CSP that permits only same-origin resources,
inline styles required by Next.js/font rendering, data/blob images, and the
known external links opened by navigation rather than embedded resources.

- [ ] **Step 4: Install and verify**

Run:

```bash
pnpm install
pnpm audit --prod --audit-level high
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Expected: no high or critical production advisories and a clean Next.js 16
production build.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml next.config.ts eslint.config.mjs
git commit -m "chore: upgrade and harden the resume runtime"
```

### Task 3: Introduce Typed Locale Content

**Files:**
- Create: `lib/i18n/config.ts`
- Create: `content/resume/types.ts`
- Create: `content/resume/en.ts`
- Create: `content/resume/fr.ts`
- Create: `content/resume/tr.ts`
- Create: `content/resume/index.ts`
- Create: `tests/resume-content.test.ts`
- Delete: `app/resume-data.json`
- Modify: `package.json`

- [ ] **Step 1: Write failing locale tests**

Test exact locale coverage and factual parity:

```ts
assert.deepEqual(locales, ["en", "fr", "tr"]);
assert.equal(getResume("en").profile.headline, "Senior Full-Stack & Platform Engineer");
assert.equal(getResume("fr").profile.headline, "Ingénieur logiciel senior full-stack & plateforme");
assert.equal(getResume("tr").profile.headline, "Kıdemli Full-Stack ve Platform Mühendisi");

for (const locale of locales) {
  const simulon = getResume(locale).experience.find(({ id }) => id === "simulon");
  assert.equal(simulon?.startDate, "2025-08");
  assert.equal(simulon?.endDate, "2026-01");
}
```

Also assert that locale summaries and bullets are not identical to the English
copy while stable IDs, dates, URLs, email, phone, and technology tokens match.

- [ ] **Step 2: Run the tests and observe failure**

Run:

```bash
pnpm test
```

Expected: module-not-found failures for the new content layer.

- [ ] **Step 3: Add locale primitives and content types**

Implement:

```ts
export const locales = ["en", "fr", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
```

Model stable IDs and ISO dates separately from localized display labels so
tests can compare facts without constraining natural language.

- [ ] **Step 4: Author the three locale documents**

Write English, French, and Turkish content independently. Preserve the verified
employment facts while adapting sentence structure, section names, role
descriptions, achievements, and proficiency labels to each professional
language context.

- [ ] **Step 5: Add content lookup and pass tests**

Implement an exhaustive locale map:

```ts
const resumes: Record<Locale, ResumeContent> = { en, fr, tr };

export function getResume(locale: Locale): ResumeContent {
  return resumes[locale];
}
```

Run:

```bash
pnpm test
```

Expected: all locale and factual parity tests pass.

- [ ] **Step 6: Commit**

```bash
git add content lib tests package.json pnpm-lock.yaml app/resume-data.json
git commit -m "feat: add authored English French and Turkish resume content"
```

### Task 4: Build Locale-Aware Routes And Presentation

**Files:**
- Create: `components/resume/external-link.tsx`
- Create: `components/resume/language-switcher.tsx`
- Create: `components/resume/resume-page.tsx`
- Create: `app/[locale]/layout.tsx`
- Create: `app/[locale]/page.tsx`
- Delete: `app/layout.tsx`
- Delete: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `next.config.ts`
- Create: `tests/i18n-routing.test.ts`

- [ ] **Step 1: Write failing URL helper tests**

Cover locale path generation, PDF paths, alternate URLs, and invalid locales:

```ts
assert.equal(localePath("tr"), "/tr");
assert.equal(pdfPath("fr"), "/api/pdf/fr");
assert.equal(localeUrl("en"), "https://resume.ouedyan.dev/en");
assert.equal(isLocale("de"), false);
```

- [ ] **Step 2: Add the permanent root redirect**

Configure:

```ts
async redirects() {
  return [
    {
      source: "/",
      destination: "/en",
      permanent: true,
    },
  ];
}
```

- [ ] **Step 3: Extract presentation components**

Make the page renderer accept only `ResumeContent` and `Locale`. The language
switcher renders three visible links, marks the current locale with
`aria-current="page"`, and uses localized accessible labels.

- [ ] **Step 4: Build static locale routes**

`generateStaticParams()` returns all three locales. Invalid values call
`notFound()`. The locale root layout renders `<html lang={locale}>`, imports the
self-hosted font through `next/font`, and keeps print zoom behavior.

- [ ] **Step 5: Verify routing**

Run:

```bash
pnpm test
pnpm build
```

Expected: `/en`, `/fr`, and `/tr` are statically generated; `/` is a permanent
redirect.

- [ ] **Step 6: Commit**

```bash
git add app components lib tests next.config.ts
git commit -m "feat: add locale-aware resume routes"
```

### Task 5: Add Localized Metadata And Structured Data

**Files:**
- Create: `lib/seo.ts`
- Create: `components/resume/structured-data.tsx`
- Modify: `app/[locale]/layout.tsx`
- Modify: `app/[locale]/page.tsx`
- Create: `tests/seo.test.ts`

- [ ] **Step 1: Write failing SEO tests**

Assert:

```ts
const metadata = buildMetadata("fr", getResume("fr"));
assert.equal(metadata.alternates?.canonical, "/fr");
assert.deepEqual(metadata.alternates?.languages, {
  en: "/en",
  fr: "/fr",
  tr: "/tr",
  "x-default": "/en",
});
assert.equal(metadata.openGraph?.locale, "fr_FR");
```

Validate that each locale's JSON-LD is serializable, uses the locale canonical
URL, identifies a `ProfilePage`, and links its `mainEntity` `Person`.

- [ ] **Step 2: Implement metadata builders**

Generate localized titles/descriptions, canonical and language alternates,
Open Graph profile metadata, Twitter metadata, authorship, creator, category,
icons, manifest, and index/follow directives.

- [ ] **Step 3: Implement safe JSON-LD serialization**

Replace `<`, `>`, `&`, U+2028, and U+2029 in serialized JSON before embedding it
in a script element. Build `ProfilePage`, `Person`, `Organization`, and
`EmployeeRole` data only from static trusted resume content.

- [ ] **Step 4: Verify**

Run:

```bash
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

- [ ] **Step 5: Commit**

```bash
git add app components lib tests
git commit -m "feat: add localized metadata and structured data"
```

### Task 6: Add Metadata Files And Identity Assets

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/manifest.ts`
- Create: `app/opengraph-image.tsx`
- Create: `app/twitter-image.tsx`
- Create: `app/icon.svg`
- Copy: `public/favicons/*`
- Create: `tests/metadata-files.test.ts`

- [ ] **Step 1: Write failing metadata file tests**

Assert robots allows crawling and names the sitemap, sitemap contains all three
locale URLs with reciprocal alternates, and the manifest starts at `/en` with
scope `/`.

- [ ] **Step 2: Reuse personal identity assets**

Copy the established favicon family from
`/Users/ouedyan/WebstormProjects/ouedyan.dev/public/favicons` and update the
manifest identity to "Yan OUEDRAOGO Resume".

- [ ] **Step 3: Implement metadata files**

Use Next.js typed metadata routes. The sitemap must produce three entries and
language alternates for every entry. The Open Graph image uses the resume accent
color, name, headline, and domain at 1200x630.

- [ ] **Step 4: Verify**

Run:

```bash
pnpm test
pnpm build
```

Expected: `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`,
`/opengraph-image`, and favicon routes are emitted.

- [ ] **Step 5: Commit**

```bash
git add app public/favicons tests
git commit -m "feat: add resume identity and SEO metadata files"
```

### Task 7: Implement Localized Vercel-Compatible PDFs

**Files:**
- Create: `lib/pdf.ts`
- Create: `app/api/pdf/[locale]/route.ts`
- Delete: `app/api/pdf/route.ts`
- Modify: `components/resume/resume-page.tsx`
- Create: `tests/pdf.test.ts`

- [ ] **Step 1: Write failing PDF contract tests**

Assert known locale validation, trusted URL construction, locale filenames,
cache policy, and rejection of unsupported locales.

- [ ] **Step 2: Add serverless Chromium launcher**

Use `@sparticuz/chromium` in Vercel and a configured local Chrome executable in
development. Launch with Chromium's recommended args and always close in
`finally`.

- [ ] **Step 3: Generate localized output**

Navigate only to `${trustedBaseUrl}/${locale}`, wait for `document.fonts.ready`,
emulate print media, and render A4 with backgrounds and preferred CSS page
size. Return:

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="Yan_OUEDRAOGO_Resume_en.pdf"
Cache-Control: public, max-age=0, s-maxage=86400, stale-while-revalidate=604800
```

- [ ] **Step 4: Verify locally**

For each locale:

```bash
curl --fail http://localhost:3000/api/pdf/en -o /tmp/resume-en.pdf
pdfinfo /tmp/resume-en.pdf
pdftotext /tmp/resume-en.pdf -
```

Expected: A4 output, localized text, and no clipping in rendered page images.

- [ ] **Step 5: Commit**

```bash
git add app components lib tests package.json pnpm-lock.yaml
git commit -m "feat: generate localized PDFs on Vercel"
```

### Task 8: Add CI, Dependency Automation, And Documentation

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/dependabot.yml`
- Create: `.nvmrc`
- Rewrite: `README.md`
- Modify: `.gitignore`
- Modify: `package.json`

- [ ] **Step 1: Add the complete local check command**

Define:

```json
{
  "scripts": {
    "test": "node --import tsx --test tests/**/*.test.ts",
    "typecheck": "tsc --noEmit",
    "check": "pnpm test && pnpm lint && pnpm typecheck && pnpm build && pnpm audit --prod --audit-level high"
  }
}
```

- [ ] **Step 2: Add CI**

Use Node 22 and pnpm with a frozen lockfile. Run `pnpm check` on pushes and pull
requests. Grant only `contents: read`.

- [ ] **Step 3: Add Dependabot**

Schedule weekly pnpm and GitHub Actions checks with a conservative open-PR
limit.

- [ ] **Step 4: Rewrite documentation**

Document architecture, locale content editing, environment variables, local
Chrome setup, commands, SEO surfaces, PDF generation, and Vercel deployment.

- [ ] **Step 5: Verify and commit**

Run:

```bash
pnpm check
git diff --check
```

Then:

```bash
git add .github .nvmrc .gitignore README.md package.json pnpm-lock.yaml
git commit -m "ci: add production quality gates"
```

### Task 9: Perform Rendered Quality Assurance

**Files:**
- Modify only files proven defective by the checks.

- [ ] **Step 1: Run the production server**

```bash
pnpm build
pnpm start
```

- [ ] **Step 2: Inspect all locale pages**

Use the in-app browser at desktop and mobile sizes. Verify headings, language
switcher, external links, download links, keyboard focus, responsive layout,
and correct `<html lang>`.

- [ ] **Step 3: Inspect SEO surfaces**

Fetch and inspect HTML head tags, JSON-LD, robots, sitemap, manifest, icons, and
Open Graph images.

- [ ] **Step 4: Inspect all PDFs**

Generate, extract, render, and visually inspect every PDF page for all three
locales. Adjust print-only typography or editorial density until every output
has clean page boundaries and no clipping.

- [ ] **Step 5: Run final local gates**

```bash
pnpm check
git diff --check
git status --short
```

Commit any QA fixes with a focused message.

### Task 10: Publish GitHub And Vercel Production

**Files:**
- No planned source changes; operational fixes are committed if deployment
  proves them necessary.

- [ ] **Step 1: Create and push GitHub repository**

```bash
gh repo create ouedyan/resume --public --source=. --remote=origin
git push -u origin main
```

Verify the repository URL, default branch, commit history, and GitHub Actions
status.

- [ ] **Step 2: Authenticate and connect Vercel**

Complete Vercel device authentication, link/create the `resume` project, and
connect the GitHub repository. Confirm Node.js 22 and pnpm are detected.

- [ ] **Step 3: Deploy preview and inspect**

Deploy a preview, inspect build output, deployment status, function logs,
headers, routes, social images, and all three PDFs. Fix and push any discovered
issue before production.

- [ ] **Step 4: Deploy production**

Create a production deployment and attach `resume.ouedyan.dev`.

- [ ] **Step 5: Configure and verify DNS/TLS**

Inspect the domain in Vercel, apply the required CNAME/DNS record through
available account tooling, and wait for verified ownership and an active TLS
certificate.

- [ ] **Step 6: Audit the public site**

From `https://resume.ouedyan.dev`, prove:

- `/` permanently redirects to `/en`.
- `/en`, `/fr`, and `/tr` return 200 with correct language content.
- Canonical and reciprocal `hreflang` tags are present.
- JSON-LD parses in every locale.
- Robots, sitemap, manifest, icons, and social images return correct content.
- Security headers are present.
- All three PDFs return valid A4 localized documents.
- No critical Vercel build/runtime warning or dependency advisory remains.

- [ ] **Step 7: Record release state**

Capture the production deployment URL, domain status, GitHub Actions result,
commit SHA, and final verification results in the completion report.
