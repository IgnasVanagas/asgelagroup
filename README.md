# Asgela Group

A Lithuanian portfolio and enquiry website for Asgela Group, built with Next.js, React and TypeScript. Architectural photography, locally hosted Manrope typography, responsive layouts, individual project pages and a server-backed enquiry form.

## Pages and enquiry paths

| Route                        | Purpose                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `/`                          | Company introduction, selected work, services, qualifications and an enquiry form |
| `/projektai`                 | Photography-led portfolio linking to individual projects                          |
| `/projektai/[slug]`          | Project context, location, related services, enquiry and next project             |
| `/paslaugos`                 | Four service descriptions, scope, preparation, process and common questions       |
| `/apie-mus`                  | Experience, working approach and heritage qualifications                          |
| `/kontaktai`                 | Direct phone/email contacts, enquiry form and next steps                          |
| `/privatumas`, `/nuotraukos` | Privacy information and photography credits                                       |

Service and project enquiry links carry recognised context to the contact page. The visitor can change the selected service or remove the project reference. The resulting email includes the service, referenced project and referring page; this uses form fields, not tracking cookies or analytics. The mobile call/enquiry bar appears while browsing and hides when the homepage form enters view or on the contact page. The form requires a name, email, short description and contact consent; phone and service are optional.

Each main page has its own title, description, canonical URL and social metadata. Navigation uses ordinary crawlable links. Organization and breadcrumb structured data are included, and the sitemap lists the main pages and projects. All public pages are prerendered; the contact form uses a Vercel function.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm run start
npm run typecheck
npm test
npm run test:production
```

Playwright tests cover mobile navigation and focus, responsive overflow, gallery and portfolio navigation, service/qualification/project enquiry paths, editable context, mobile contact actions, FAQs, contact validation/retry/success UI, API validation, metadata, missing routes and automated accessibility on desktop and mobile. The successful email response is mocked; tests do not send email. If Chromium is missing, run `npx playwright install chromium`.

## Email delivery

Copy `.env.example` to `.env.local` and provide `RESEND_API_KEY`, a verified `CONTACT_FROM` sender and `CONTACT_TO`. Restart the server after changing these values. Production hosting needs the same environment variables. Never commit credentials.

`POST /api/contact` validates inputs and consent, limits body size, rejects cross-origin requests and honeypot submissions, and applies a basic in-memory rate limit. Deploy behind a trusted proxy that overwrites forwarded IP headers, and enable shared edge rate limiting when running multiple instances. Success is shown only after the mail provider confirms acceptance. Until configured, the form honestly reports that the message was not sent and offers the existing phone/email contacts.

## Content and assets

- Company phone, email, services and the existing 20+ years statement were taken from https://asgelagroup.lt/.
- Trakai Castle, the National Museum and heritage qualifications were supplied in the project brief. Exact work packages, project dates, certificate identifiers and issuing bodies were not supplied, so the website does not invent them. Confirm these details before publishing; add authentic certificate PDFs when provided.
- Both landmark photos are by Augustas Didžgalvis (BigHead), licensed CC BY-SA 4.0. Sources and adaptation notices are published at `/nuotraukos` and on project pages. They are illustrative photos of the locations, not documentation of the company's completed work. Crops and saturation changes retain the same image license.
- Fonts are hosted locally. No analytics, trackers or external font requests are installed.

Edit company, service, FAQ and project information in `src/lib/content.ts`, page copy in the corresponding `src/app/` route, and the design in `src/app/globals.css` and `src/app/pages.css`. Enquiry URL handling is centralised in `src/lib/inquiry.ts`.

## Deploy to Vercel

The project is ready for a native Next.js deployment. `vercel.json` selects Next.js, installs the committed lockfile with `npm ci`, builds with `npm run build`, and places the contact function in Frankfurt (`fra1`). Node.js 22 is set in `package.json`. Keep the Output Directory setting at its Next.js default; do not use static export because the contact endpoint needs a function.

### Deploy directly from this folder

No Git repository is required for the CLI route:

```sh
npx vercel@latest login
npx vercel@latest
```

Select your Vercel account/team, create or select the project, and use `.` as the project directory. The second command creates a preview deployment. `.vercelignore` excludes local credentials, dependencies, test output and screenshots from CLI uploads.

Alternatively, push the source and `package-lock.json` to your Git provider, then import the repository through Vercel **Add New → Project**. Use the repository root and the **Next.js** framework preset. The Git remote and Vercel project have not been created by this preparation.

### Environment variables

Add these under **Vercel → Project → Settings → Environment Variables**, then redeploy:

| Variable               | Value                                                                   | Environment                                    |
| ---------------------- | ----------------------------------------------------------------------- | ---------------------------------------------- |
| `RESEND_API_KEY`       | Your Resend API key                                                     | Production; optional in Preview                |
| `CONTACT_FROM`         | `Asgela Group <svetaine@asgelagroup.lt>` using a verified Resend sender | Production; Preview only when testing delivery |
| `CONTACT_TO`           | `andrejzimnickij@gmail.com`                                             | Production; use a test inbox in Preview        |
| `NEXT_PUBLIC_SITE_URL` | Optional full public origin, e.g. `https://asgelagroup.lt`              | Production                                     |

Enter `CONTACT_FROM` without enclosing quotation marks in the Vercel dashboard. The quotes in `.env.example` are for dotenv syntax. Email variables are server-only. Builds succeed without them; the form reports unavailable delivery instead of a false success.

Leave `NEXT_PUBLIC_SITE_URL` unset until the intended domain is attached. Vercel's project/deployment domain is used automatically. Preview builds use their own deployment URL and emit `noindex, nofollow` plus a disallow-all `robots.txt`. Keep Vercel's system environment variables exposed; do not manually define `VERCEL_*` values.

When ready to publish:

```sh
npx vercel@latest --prod
```

Add `asgelagroup.lt` under **Settings → Domains**, follow the exact DNS records Vercel shows, and set the production site URL to the chosen domain. Preserve the existing email MX/TXT records and Resend verification records. Redeploy after changing the URL so generated metadata and sitemap use it.

The contact function's in-memory limiter is only a per-instance fallback. For a shared production limit, configure a Vercel Firewall rate limit for `POST /api/contact`; the current intent is five requests per client IP per ten minutes. No external store or paid service has been provisioned by this preparation.

### Verification

`npm run test:production` builds the app and runs the browser suite against `next start` on port 3100 with outgoing email disabled. It covers metadata URLs, preview/production domain handling, API origin checks and the existing UI tests. Actual email delivery still needs one manual check after credentials are configured.

Configuration references: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables), and [vercel.json](https://vercel.com/docs/project-configuration/vercel-json).

## Launch handoff

The Vercel configuration is prepared locally; no deployment or DNS change has been made. Configure and test email delivery, confirm the project/qualification copy, and complete the privacy text with the company's exact legal entity, retention policy and applicable processing details before public launch.
