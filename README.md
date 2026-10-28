# Mai Manzil - On-Demand Manpower Supply

A static website built with Next.js App Router, React and Tailwind CSS.

## Setup

Use Node.js 24 (see `.nvmrc`). Next.js requires Node.js 20.9.0 or later.

```powershell
npm ci
```

## Development

```powershell
npm run dev
```

## Production export

```powershell
npm run build
```

Deploy the generated `out/` directory to a static host. `out/` and `.next/` are generated build artifacts and are excluded from version control.

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
