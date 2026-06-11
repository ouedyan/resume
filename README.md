# Yan OUEDRAOGO Resume

The production source for [resume.ouedyan.dev](https://resume.ouedyan.dev).
The same Next.js application renders the English, French, and Turkish web
resumes and generates their downloadable PDFs.

## Routes

| Route | Purpose |
| --- | --- |
| `/en` | English resume |
| `/fr` | French resume |
| `/tr` | Turkish resume |
| `/api/pdf/en` | English PDF |
| `/api/pdf/fr` | French PDF |
| `/api/pdf/tr` | Turkish PDF |

`/` permanently redirects to `/en`.

## Stack

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS
- Self-hosted Inter variable fonts
- Puppeteer Core and serverless Chromium for PDF generation
- Node.js built-in test runner
- pnpm, GitHub Actions, Dependabot, and Vercel

## Local Development

Use Node.js 24 and pnpm 10:

```bash
nvm use
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

The PDF endpoint uses an installed Chrome browser locally. It checks standard
installation paths first. Set `CHROME_EXECUTABLE_PATH` if Chrome is installed
elsewhere:

```bash
cp .env.example .env.local
```

`RESUME_BASE_URL` is optional for local development. Without an explicit
override, production uses the canonical `https://resume.ouedyan.dev` origin.

## Editing Resume Content

Each language is independently authored:

- `content/resume/en.ts`
- `content/resume/fr.ts`
- `content/resume/tr.ts`

Shared types live in `content/resume/types.ts`. Keep stable facts such as IDs,
dates, links, email, and telephone aligned across all three locale files. The
test suite enforces the critical employment and localization invariants,
including the Simulon contract dates of August 2025 through January 2026.

The application is the single source of truth. Do not maintain separate PDF
content; each PDF is printed from its matching locale page.

## Quality Gate

Run the complete local and CI gate:

```bash
pnpm check
```

It runs content and SEO tests, ESLint, TypeScript, a production build, and a
production dependency audit. For visual PDF QA, start the production server,
download each `/api/pdf/{locale}` route, and inspect the rendered A4 pages.

## Production

Vercel deploys the Next.js application with the Node.js PDF function. The
function uses `@sparticuz/chromium` automatically in serverless environments;
no production Chrome path is required.

The public site includes localized canonical and `hreflang` metadata,
ProfilePage and Person JSON-LD, `robots.txt`, a localized sitemap, a web app
manifest, personal-brand icons, social sharing images, and restrictive
security headers.
