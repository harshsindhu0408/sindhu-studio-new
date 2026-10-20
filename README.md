# Sindhu Studio website

Next.js 16 (App Router) + Tailwind v4. Plans: [`docs/MASTER_PLAN.md`](docs/MASTER_PLAN.md) (strategy) and [`docs/EXPERIENCE_SPEC.md`](docs/EXPERIENCE_SPEC.md) (build spec).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production, http://localhost:3001
```

## Where things live

| What | File |
|---|---|
| Business facts: name, phones, address, hours, socials, payment & cancellation terms | `src/data/business.ts` |
| Packages + the comparison feature matrix | `src/data/packages.ts` |
| Add-ons, prices, real dated offers | `src/data/addons.ts` |
| FAQs (homepage + packages) | `src/data/faqs.ts` |
| Photo categories and descriptions | `src/data/media.ts` + `scripts/media-manifest.json` |

**Change a fact or a price in `src/data/` only.** Every page, the JSON-LD schema, `llms.txt`, the WhatsApp quote, the share card and the legal pages read from there, so they can't contradict each other. Items marked `VERIFY` still need confirming by the owner.

### Offers
Prices show plain by default. To run a real offer, add `offer: { price, endsOn: "2027-01-31", reason: "Wedding season 2026–27" }` to an add-on. The old price is shown struck through with the end date, and the offer disappears by itself once `endsOn` passes.

## Photos

Camera originals go in `/originals` (git-ignored, never served). To add or update photos:

1. Put the JPGs in `originals/`.
2. Describe each one in `scripts/media-manifest.json` (`slug`, `category`, `alt`, optional `featured`).
3. Run `npm run images`. This writes resized WebP files (max 2400px, EXIF stripped, copyright tag added) to `public/images/work/` and regenerates `src/data/media.generated.ts` with blur placeholders.

Videos in `public/films/` were re-encoded from `originals/teaser-original.mp4` (56 MB → 13 MB at 720p, 7 MB at 540p).

## Leads

Both the quote builder and the contact form `POST /api/lead` before opening WhatsApp, so a lead isn't lost if WhatsApp doesn't open. Set `LEAD_WEBHOOK_URL` to receive them, for example a Google Apps Script web app that appends rows to a Sheet, or a Zapier/Make webhook. Without it, leads only appear in the server log.

## SEO & GEO
- `/sitemap.xml` and `/robots.txt` are generated (AI search crawlers are allowed).
- `/llms.txt` and `/llms-full.txt` give AI assistants accurate prices and policies.
- JSON-LD on every page: `LocalBusiness` with an `OfferCatalog` of real prices, `BreadcrumbList`, `FAQPage`, `ImageGallery` with licence info, `VideoObject`, `Person`.
- OG images: `src/app/opengraph-image.tsx` (default), `src/app/packages/opengraph-image.tsx`, and the family share card at `/build/card?p=gold&a=drone`.

## Analytics
GA4 is loaded directly **and** through GTM (`src/app/layout.tsx`). If the GTM container also fires a GA4 tag, page views are counted twice: keep only one. Consent Mode v2 defaults to "denied" until the visitor clicks Accept.
