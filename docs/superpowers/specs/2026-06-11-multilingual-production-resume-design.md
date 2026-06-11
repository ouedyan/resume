# Multilingual Production Resume Design

## Objective

Ship `resume.ouedyan.dev` as a production-quality, multilingual resume in
English, French, and Turkish. The Next.js application remains the single source
of truth for both the website and locale-specific PDF downloads.

## Public URL Model

- `/en` is the default English resume.
- `/fr` is the French resume.
- `/tr` is the Turkish resume.
- `/` permanently redirects to `/en`.
- Unknown locale segments return a real 404.
- PDF downloads use `/api/pdf/en`, `/api/pdf/fr`, and `/api/pdf/tr`.

Every locale URL is independently crawlable and self-canonical. Each locale
page declares reciprocal `hreflang` alternatives for `en`, `fr`, `tr`, and
`x-default`. The sitemap repeats the same language relationships.

The site does not change indexed page content from cookies, IP address, or the
`Accept-Language` header. A visible language switcher preserves explicit user
control and avoids locale-adaptive crawling ambiguity.

## Content Architecture

The content layer has three independently authored resume documents:

- English uses concise international engineering terminology.
- French uses natural professional French rather than translated English
  sentence structure.
- Turkish uses idiomatic Turkish resume language and terminology familiar to
  Turkish engineering teams.

Each document contains localized headings, summaries, role descriptions,
project descriptions, language names, proficiency descriptions, accessibility
labels, and metadata.

Stable facts such as company identity, dates, external URLs, email, telephone,
technology names, and project URLs remain aligned across locales. A validation
script checks locale coverage and factual parity so editorial changes cannot
silently introduce contradictory employment dates or links.

## Application Architecture

The App Router uses `app/[locale]` for localized pages. The locale layout is the
root document layout for those pages so the rendered `<html lang>` value is
correct for every response.

Responsibilities are separated as follows:

- `lib/i18n/config.ts`: supported locales, labels, URL helpers, and validation.
- `content/resume/types.ts`: resume content contract.
- `content/resume/{en,fr,tr}.ts`: independently authored locale content.
- `content/resume/index.ts`: locale content lookup.
- `components/resume/*`: presentation-only resume components.
- `app/[locale]/layout.tsx`: locale document shell and shared metadata.
- `app/[locale]/page.tsx`: static locale page and localized structured data.
- `app/api/pdf/[locale]/route.ts`: validated, cached localized PDF generation.

All three locale pages are statically generated.

## PDF Generation

The PDF endpoint launches Chromium through `puppeteer-core` and
`@sparticuz/chromium`, which is compatible with Vercel's Node.js function
environment. Local development may use an installed Chrome executable.

The renderer visits the matching locale page with a fixed trusted base URL,
waits for fonts, enables print media, and produces an A4 document. It never
accepts an arbitrary target URL or trusts a request `Host` header as a browsing
destination.

Responses use locale-specific filenames and public CDN cache headers because
resume content changes only on deployment. Invalid locales return 404. Browser
instances always close in `finally`.

## Search And Sharing

Each locale page supplies:

- Localized title and description.
- Self-referencing canonical URL.
- Reciprocal language alternatives.
- Locale-aware Open Graph fields.
- Twitter summary-large-image metadata.
- Localized dynamic Open Graph image.
- Index/follow robot directives.

Structured data uses a `ProfilePage` with a `Person` as `mainEntity`. It includes
the canonical profile URL, job title, employer, location, email, telephone,
GitHub and LinkedIn identities, skills, languages, and employment history where
the data maps cleanly to Schema.org. Structured data text and page language
match the locale.

The metadata file conventions provide:

- `robots.txt`
- `sitemap.xml` with localized alternates
- `manifest.webmanifest`
- favicon and Apple touch assets
- Open Graph and Twitter images

No analytics or tracking is added because the resume does not need it for the
launch objective.

## Identity And Assets

The existing `ouedyan.dev` favicon family is reused to maintain personal-brand
continuity. The manifest is updated for the resume product name, colors, start
URL, scope, and standalone display behavior.

Fonts are self-hosted with `next/font` rather than loaded from Standard Resume
or Adobe Typekit. This removes third-party render dependencies, improves
privacy, and makes PDF output deterministic.

## Security And Operations

Before deployment:

- Upgrade Next.js and React to currently patched compatible releases.
- Upgrade the PDF browser dependencies.
- Remove unused runtime dependencies.
- Require a clean production dependency audit.
- Add restrictive response headers suitable for a static personal site:
  content type protection, referrer policy, permissions policy, frame
  protection, HSTS in production, and a compatible content security policy.
- Pin the Node.js and package-manager expectations.
- Add CI for install, content validation, lint, type checking, build, and
  production audit.
- Add Dependabot configuration for npm and GitHub Actions.

The PDF route is the only compute-heavy public surface. It is constrained to
known locales, trusted destinations, GET requests, fixed output, and CDN
caching.

## Repository And Deployment

The repository will be cleaned of local IDE files, temporary screenshots,
generated PDFs, and obsolete scaffold assets. Documentation will describe local
development, locale editing, PDF behavior, quality checks, and deployment.

Delivery sequence:

1. Create the `ouedyan/resume` GitHub repository and push `main`.
2. Connect or create the Vercel project using the GitHub repository.
3. Deploy and inspect a preview.
4. Resolve build, runtime, dependency, or platform warnings.
5. Deploy production.
6. Attach `resume.ouedyan.dev`.
7. Inspect required DNS records and configure them where account access permits.
8. Verify DNS resolution, TLS, redirects, headers, locale HTML, alternate links,
   metadata files, social images, and all localized PDFs from the public domain.

Production is not considered complete from a successful CLI exit alone. The
public hostname and every user-facing/SEO surface must be checked directly.

## Verification

Automated checks cover:

- Locale set and content completeness.
- Shared factual invariants across all locale documents.
- Route generation and invalid locale handling.
- Canonical and alternate URL construction.
- Sitemap, robots, and manifest output.
- JSON-LD validity and locale consistency.
- PDF route input validation and response headers.
- Linting, TypeScript, production build, and dependency audit.

Rendered checks cover:

- Desktop and mobile locale pages.
- Keyboard access and language-switcher labeling.
- Two-page A4 PDFs in all three languages with no clipped or orphaned content.
- Open Graph image readability.

Production checks cover:

- GitHub Actions status.
- Vercel deployment logs and function logs.
- DNS and certificate status.
- HTTP status, redirects, headers, canonical/hreflang, structured data, sitemap,
  robots, manifest, icons, and PDF downloads on `resume.ouedyan.dev`.
