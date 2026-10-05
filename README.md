# Nile Software Solutions — Website

Production website for Nile Software Solutions, built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion, React Three Fiber / Three.js and Lucide icons.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://nilesoftware.com`) for correct canonical URLs, sitemap and Open Graph links.

## Where to edit content

| What | File |
| --- | --- |
| Company name, contact details, nav, social links, statistics | `data/site.ts` |
| Projects (case studies, tags, technologies, screens) | `data/projects.ts` |
| Services | `data/services.ts` |
| Industries | `data/industries.ts` |
| Process steps + technology list | `data/process.ts` |
| Contact form options (project types, budgets) | `lib/inquiry/schema.ts` |

### Adding a project
Append an object to `projects` in `data/projects.ts`. Its page is generated at `/work/<slug>` automatically and it appears in the showcase, filters, footer and sitemap.

Screens: each screen has a `mockup` id (coded interface in `components/projects/mockups`). When you have real screenshots, put them in `public/images/projects/<slug>/` and set `image: "/images/projects/<slug>/dashboard.webp"` on the screen — it will render with `next/image` instead of the mockup.

### Placeholders to confirm before launch
Search the codebase for `PLACEHOLDER`:
- `data/site.ts` — domain, email, phone, social URLs
- `data/site.ts` — company statistics (`confirmed: false` shows a visible "placeholder" note; set to `true` once figures are verified)
- `data/projects.ts` — each project's `technologies`, optional `meta` (client, year, role)
- `lib/inquiry/schema.ts` — budget ranges

All data shown inside product mockups is fictional demo data and is labelled as such.

## Contact form
`components/contact/ContactForm.tsx` validates on the client, posts to `app/api/inquiry/route.ts`, which re-validates and hands the inquiry to a provider from `lib/inquiry/provider.ts`. The default provider only logs. To send email, implement `InquiryProvider` (a Resend example is in the file) and return it from `getInquiryProvider()`.

## Performance notes
- The Three.js hero is code-split (`next/dynamic`, `ssr: false`) and only loaded after the page is idle, on desktop-class devices with WebGL, a fine pointer, ≥4 CPU cores and no Save-Data. Everyone else sees a lightweight animated SVG (`components/three/NileFlow.tsx`).
- The render loop pauses when the hero is off-screen; `prefers-reduced-motion` disables the 3D scene and all non-essential motion.
- Hero and page headers animate with CSS so the LCP text paints without waiting for hydration.
- Product mockups are server-rendered HTML/SVG (no image downloads) and scaled to fit; on narrow screens they zoom and crop so interface text stays legible.

## Structure
```
app/            routes, metadata, sitemap, robots, OG image, API route
components/     layout, navigation, hero, three, projects (+ mockups), case-study,
                services, industries, process, tech, about, cta, contact, footer, ui
data/           structured content
lib/            utilities and inquiry handling
```
