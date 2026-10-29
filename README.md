# Mai Manzil - On-Demand Manpower Supply

A website built with Next.js App Router, React and Tailwind CSS, with a server-side contact email endpoint.

## Setup

Use Node.js 24 (see `.nvmrc`). Next.js requires Node.js 20.9.0 or later.

```powershell
npm ci
```

## Development

```powershell
npm run dev
```

## Production

```powershell
npm run build
npm start
```

Deploy to a Next.js-compatible server host (for example Vercel), or run `npm start` behind your reverse proxy. A static `out/` deployment cannot run the contact API. Old `out/` files are no longer updated by the build.

## Contact email setup

Enquiries default to `info@maimanzil.com` even if `CONTACT_TO_EMAIL` is not set.

1. Create a Resend account and verify your sending domain using the DNS records provided by Resend.
2. Copy `.env.example` to `.env.local`. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` to an address on your verified domain, and `CONTACT_TO_EMAIL` to the inbox that should receive enquiries (normally `info@maimanzil.com`). Keep the key server-side; do not commit `.env.local`.
3. Restart `npm run dev`. On your production host, set the same variables and redeploy.
4. Submit a real enquiry, check Resend's delivery logs and the destination inbox, then verify that Reply addresses the visitor. No live email is sent by the automated tests.

The form posts to `/api/contact/`. The server validates and limits inputs, keeps the recipient fixed by configuration, and sets the visitor as `reply_to`. It displays success only after Resend accepts the message; provider acceptance does not guarantee inbox delivery. Missing configuration or provider failures return an error while preserving form entries. Retry requests reuse an idempotency key until the form changes, reducing duplicate emails after a lost connection.

Honeypot and same-origin checks provide basic abuse protection. The endpoint also limits each email address to five valid attempts per 15 minutes per server instance. This memory limit resets on restart and is not shared between instances; configure rate limits/bot protection at your hosting firewall before a public launch.

Provider reference: [Resend send email API](https://resend.com/docs/api-reference/emails/send-email).

Run contact validation and API tests with `npm test`.

Stop the development server before removing `.next/` or changing installed dependencies. If its cache is cleared, restart `npm run dev` to regenerate it.

Use npm and the committed `package-lock.json` for dependency installation.

## Content and assets

- `src/content/site.js`: company details, services, staffing capacity and contact information.
- `src/content/seo.js`: page metadata and business structured data.
- `components/site/`: active site components and the scrolling service stack stylesheet.
- `app/globals.css`: shared styles and gallery animations.
- `public/`: referenced site images, icons, `robots.txt` and `sitemap.xml`.
- `public/mai-manzil-logo.svg`: scalable website logo.
- `public/mai-manzil-logo.png`: transparent 1200px logo export for reuse.

The service cards link to the contact form with the chosen role selected. Short viewports and reduced-motion preferences use a regular service list.

## Routes

- `/`: Home
- `/portfolio/`: Staffing capacity
- `/about/`: Company information
- `/contact/`: Staffing enquiries
