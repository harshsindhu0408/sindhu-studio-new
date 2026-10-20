# Sindhu Studio: Master Plan
### Goal: the best photography studio website in India, the one people screenshot and send to their family WhatsApp group

> Written 20 Oct 2026 after a full audit of this repo.
> **Build-ready details** (package feature matrix, compare/builder/legal screen specs, design tokens, ticket backlog) are in [`EXPERIENCE_SPEC.md`](./EXPERIENCE_SPEC.md).
> Order matters: **Phase 0 comes first.** Fancy features on a 507 MB site with conflicting facts won't rank, won't convert, and AI engines won't trust it.

---

## 0. The big idea (what makes people say "a studio does *this*?")

Most Indian studio websites, including the big Delhi and Chandigarh names, are a portfolio grid, a "Contact us for pricing" page and a WhatsApp button. Indian families don't decide that way. **The whole family decides, function by function, on WhatsApp.**

So the site is built around one idea:

> **"Plan your wedding by functions, not packages, then share the quote with your family in one tap."**

Three signature experiences carry that idea:

| # | Signature experience | Why it gets a "wow" | Why it wins business |
|---|---|---|---|
| 1 | **Shaadi Planner**: add your functions (Roka, Haldi, Mehendi, Sangeet, Shaadi, Kuan Poojan, Reception) with dates and guest counts. It recommends a package and add-ons and builds a live quote. | No studio in Haryana does this. It feels like a product, not a brochure. | Turns "just browsing" into a ready quote with dates, which is the warmest lead you can get. |
| 2 | **Family Share Card**: one tap makes a branded quote image (package, add-ons, total, dates) plus a link, ready for the family WhatsApp group. | It looks premium in a WhatsApp chat, where competitors send a plain PDF or a voice note. | Every share puts your brand in front of 10–40 relatives, which is free distribution. |
| 3 | **Guest Photo Finder** (Phase 6): guests scan a QR code on *your* LED screen at the venue, take a selfie, and get their own photos. | Guests talk about it at the wedding. | Every wedding becomes 300–1,000 new visitors to your site. Your LED-screen add-on becomes a marketing channel. |

Supporting "wow" pieces:
- **Album flipbook**: show real 14×40 album spreads with a page-turn effect. People are paying for that physical album, and almost no studio shows it.
- **Shubh Muhurat calendar 2026–27** with live date availability ("Is my date free?"). This page also brings in lots of search traffic, because muhurat dates are searched heavily by exactly your customers.
- **Real Wedding Stories**: each wedding told as a scroll story, Haldi → Mehendi → Pheras → Vidaai, with the venue and city named.
- **Hindi + English**. Hardly any local competitor has a proper Hindi site, and a lot of Haryana searches in Hindi or Hinglish.

---

## 1. Audit: what's broken today (from the code)

### 🔴 Critical: hurting speed, SEO and trust right now
| Issue | Where | Impact |
|---|---|---|
| `public/` is **507 MB**: 45 JPGs straight off the camera (up to **15 MB** each, 6048×4024) | `public/*.JPG` | Slow image optimisation on Vercel, slow first loads, and anyone can download your full-resolution originals. |
| **56 MB `teaser.mp4`** on the homepage | `FeaturedFilms.tsx:88` | On Jio/Airtel 4G this alone can use a visitor's daily data. It hurts LCP and bounce rate. |
| Video poster image is an **Unsplash stock photo** | `FeaturedFilms.tsx:89` | Stock photos on a photography studio's site look bad, and your own photos rank better. |
| Hero has **no photo at all**, only a gradient and text | `Hero.tsx` | It's a photography studio. The first screen should show your best work. |
| Missing files that SEO depends on: `/og-image.jpg`, `/logo.png`, `/apple-touch-icon.png`, `/images/*.jpg` | `layout.tsx`, `schema.tsx`, page layouts | **WhatsApp and Instagram link previews are blank.** In India that's the main way links get shared. |
| Hero texture loads from `grainy-gradients.vercel.app` | `Hero.tsx:41` | A third-party request on the critical path; if that site goes down, so does the effect. |
| Two `<h1>`s in the hero | `Hero.tsx` | Minor SEO issue. |

### 🟠 Facts that contradict each other (bad for AI trust, Google trust and customers)
| Fact | Says A | Says B |
|---|---|---|
| Opening hours | Mon–Sat 10:00–19:00 (`schema.tsx`) | Mon–Sun 9am–9pm (`contact/page.tsx`) |
| Phone number | 89503 **00913** (displayed) | `tel:+918950`**`200913`** (`contact/page.tsx:416`): **the link calls the wrong number** |
| Booking deposit | 25% (`terms`) | 30% (`FAQ.tsx`) |
| Balance due | 50% on event day, 25% before delivery (`terms`) | Full balance one week before the event (`FAQ.tsx`) |
| Package names | Silver/Gold/Platinum/Diamond/Prime/Exclusive | "Intimate, Classic, and Premium tiers" (`FAQ.tsx`) |
| RAW data | Every package includes "Full HD Photos (RAW Data)" | Terms: "Raw footage/data is generally not provided" |
| Experience | "25 Years" (Stats) | "over 30 years" (About bio) · "Founded 2000" means 26 years |
| YouTube | `/sindhustudio` | `/@sindhustudiorohtak` (both in `schema.tsx`) |
| Footer socials | `https://instagram.com` (generic, not your profile) | — |
| Map | Embed uses a **made-up place ID** (`0x1234567890abcdef`) | `pricing/page.tsx:323` |

### 🟡 Legal and compliance risks
- **Testimonials look like placeholders** ("Priya & Rahul Sharma", "The Kapoor Family"). Publishing invented reviews is a consumer-protection risk in India and against Google's policies. They need to be replaced with real reviews (Google reviews, with permission).
- **Permanent "was ₹19,999, now ₹9,999 – 50% OFF"** on every add-on. If nothing was ever sold at the crossed-out price, that's a *false reference price*. The CCPA's Dark Patterns Guidelines (2023) target false urgency and misleading pricing. Use real, time-limited offers or show plain prices.
- "Named among India's Top 10 Photography Studios": keep it only if you can cite the source.
- The privacy policy doesn't cover the **DPDP Act 2023 / DPDP Rules 2025** (consent notice, grievance officer, retention, processors, children's data, which matters because you do baby shoots).
- No cookie consent, yet GA4 **and** GTM are loaded (check you're not double-counting page views).

### 🟡 SEO structure problems
- The sitemap lists `?category=wedding` URLs. Query-string URLs get grouped together as one page, so those 5 entries do almost nothing. `/addons` is missing, and `lastModified: new Date()` changes on every build, which teaches Google to ignore it.
- Portfolio categories are **fake** (`categories[i % 5]`), the footer category links don't filter anything, and every alt text is "Sindhu Studio Photography 1…45". All of that image SEO is wasted.
- `Product` schema has `Offer`s **with no price**, which is invalid structured data.
- No canonical URLs, no per-page OG images, no breadcrumbs, no service pages, no location pages, no blog. The whole site targets one city with about 7 URLs.
- `<html lang="en">` only, no Hindi.
- The footer newsletter form does nothing.
- The contact form only opens WhatsApp. If the popup is blocked or the person is on desktop without WhatsApp, **the lead is lost and you never know it existed.**
- The Exclusive package has `excluded: [""]`, which renders an empty "Not included" row.

---

## 2. Phase 0: Foundations (Week 1). Do this first.

**0.1 Image pipeline**
- Add `scripts/optimize-images.mjs` (using `sharp`): originals go to `/originals` (git-ignored, never served). Output 2560px-wide AVIF and WebP at about 300–600 KB each, strip GPS/EXIF but write a copyright tag, and generate `blurDataURL` placeholders and a typed `src/data/media.ts` manifest.
- For the long term, host images on **Cloudinary, ImageKit or Cloudflare R2 + Images** (all have India edge locations) so the owner can upload without touching git.
- Target: `public/` under 30 MB.

**0.2 Video**
- Re-encode the teaser: 1080p H.265 + H.264 fallback, about 6–8 MB, plus a 720p mobile version of about 3 MB. Add a local poster frame and `preload="none"`, and start it only when it scrolls into view.
- Better: host full films on YouTube (which also helps SEO and GEO via `VideoObject`) and keep a muted 10-second loop on site.

**0.3 One source of truth for business facts**: `src/data/business.ts`
```ts
export const business = {
  name: "Sindhu Studio", legalName: "Sindhu Digital Studio",
  founded: 2000, founder: "Krishan Sindhu",
  phones: [...], whatsapp: "919416370132", email: "...",
  address: {...}, geo: { lat, lng }, hours: [...],
  socials: { instagram, facebook, youtube }, gstin?: "...",
  googleBusinessUrl: "...", mapsPlaceId: "...",
};
```
Every component, the schema, the footer, the legal pages and `llms.txt` read from this file, so the contradictions above can't come back.

**0.4 One source of truth for packages and add-ons**: `src/data/packages.ts`
Replace the free-text `included`/`excluded` strings with a **typed feature matrix**. This is what makes comparison, the planner, schema and the contact form possible:
```ts
type FeatureValue = boolean | number | string | { value: string; note?: string };
features: { id: "candid", label: "Candid photography", group: "Photography", tooltip: "...", addOnId: "candid" }
packages: { id: "gold", name: "Gold", price: 69999, popular: true,
  bestFor: "Mid-size weddings, 2 functions",
  values: { candid: true, drone: false, albumSheets: 60, coverageDays: 2, cameramen: 2, ... } }
```

**0.5 Fix every row in the contradiction table** (I need answers from you; see §11).

**0.6 Brand assets**: logo SVG, favicon set, `apple-touch-icon`, maskable PWA icons, and a default OG image made from your best photo.

**0.7 Performance budget** (test on a mid-range Android over 4G, the real Indian user):
LCP < 2.0 s · INP < 200 ms · CLS < 0.05 · JS < 170 KB gzipped on the homepage · Lighthouse mobile ≥ 95.
Run `framer-motion` through `LazyMotion` + `m`, turn off Lenis on touch devices, and respect `prefers-reduced-motion`.

---

## 3. Phase 1: Packages, comparison and add-ons (Weeks 2–3)

### 3.1 New `/packages` page (redirect `/pricing` → `/packages` with a 301)
1. **"Find my package" quiz** (3 questions: number of functions, guest count, must-haves). It highlights the best fit and explains why in one line.
2. **Package cards**: horizontal snap-scroll on mobile, grid on desktop. Each card shows a price, a "Best for…" line, the top 5 inclusions and a **"Compare"** checkbox.
3. **Comparison table**:
   - Sticky package header row, features grouped (Photography · Video · Album & Prints · On-site Tech · Functions · Delivery)
   - **"Show only differences"** toggle
   - Quantity values instead of just ticks ("60 sheets" vs "80 sheets")
   - **Upgrade nudges between columns**: "Gold → Platinum: +Drone, +Cinematic film, +8×12 LED wall for ₹30,000 more (₹30,497 if booked separately)". The number is computed from your own add-on prices, so it's persuasive without being a dark pattern. Full upgrade table in `EXPERIENCE_SPEC.md` §3.
   - Mobile: pick any 2 packages to compare side by side, swipe to switch
   - A real `<table>` in the HTML (good for accessibility, Google and LLMs)
4. **Compare drawer**: tick 2–3 cards and a bottom bar slides up with "Compare (2)".
5. **Each package has its own URL**: `/packages/gold`, with its own OG image showing the price, so it can be shared on WhatsApp.

### 3.2 Add-ons, rebuilt as a **Package Builder** (`/build`)
- Step 1: pick a base package (or "Just add-ons").
- Step 2: add-ons as **visual cards with a real photo or a 3-second clip** (drone shot, LED wall at a venue, live-stream screen).
  - Add-ons already in the chosen package show **"Included ✓"** and are disabled. Today a Platinum customer can "book" a Drone they already have.
  - Per-day add-ons (Candid, Cinematic) get a **quantity stepper** ("× 2 days").
  - Tags: "Popular with Gold", "New".
- **Sticky total bar**: base + add-ons, GST line, booking amount ("Lock your date with ₹X"), and an EMI hint if a payment gateway supports it.
- Outputs:
  - **"Send quote on WhatsApp"**: a structured message to the studio.
  - **"Share with family"**: the Family Share Card image + a link to `/q/<encoded-config>` that reopens the same quote.
  - **"Download quote PDF"**, branded, valid for 7 days.
- The quote is saved in the URL, so a relative can open the link and tweak it.

### 3.3 Shaadi Planner (`/plan`), the signature feature
- Add functions from chips (Roka/Sagai, Haldi, Mehendi, Sangeet, Shaadi, Kuan Poojan, Reception, Pre-wedding) with a date, venue city and guest count for each.
- Shows a timeline view of the wedding week.
- It works out coverage days, recommends a package, and adds missing functions as add-ons (for example, Ring Ceremony isn't in Gold, so it's added as an add-on), then hands off to the Builder.
- It checks dates against the **availability calendar**: free, few slots left, or booked.

### 3.4 Availability and Muhurat calendar (`/muhurat-2027`, `/availability`)
- The owner marks booked dates (in a Google Sheet or the CMS, no code needed).
- The page shows Shubh Vivah Muhurat dates for 2026–27 (dates must be **checked against a reputable panchang** before publishing) with the studio's availability on each one.
- SEO page targeting "shaadi muhurat 2027", "vivah muhurat 2027 Haryana", in Hindi and English.

---

## 4. Phase 2: Legal pages done properly (Week 3)

> I'll draft these from your real business practices. **Have a lawyer review them before you publish.** This is especially important for DPDP compliance.

**4.1 Privacy Policy (DPDP Act 2023 + DPDP Rules 2025)**
- Who you are (Data Fiduciary), a contact person / **grievance officer** with name, email and response time
- What data you collect, *per purpose*: enquiry (name, phone, date), booking (address, ID if needed, payment), event media (photos and videos of the client **and guests**), website analytics
- Legal basis and consent, how to withdraw consent, and what happens when someone does
- **Children's data**: baby, birthday and child shoots need verifiable parental consent, and there's no portfolio use without explicit consent
- **Retention table**: enquiries 12 months, RAW files X months, final deliverables backup "6 months" (matches your packages), invoices 8 years (tax)
- Processors list: Google (Analytics/Drive), Meta (WhatsApp), hosting, payment gateway, cloud storage, album printer
- Data principal rights: access, correction, erasure, nomination, grievance redressal, escalation to the Data Protection Board
- Portfolio and social media usage, with a **clear opt-out** process
- Cookies section linked to the consent banner
- Breach notification commitment

**4.2 Terms of Service** (fixing the contradictions)
Booking and date lock · payment schedule (one version) · GST · accepted methods · **cancellation and refund tiers** (e.g. >90 days / 30–90 / <30) · reschedule rules · force majeure · travel, stay and food for outstation events · deliverable timelines · **client selection deadline** (otherwise albums stall) · what "RAW data" exactly means · backup retention · copyright & personal licence · portfolio usage · **drone use subject to venue and DGCA permissions** · equipment failure and liability cap · guest conduct · jurisdiction: Rohtak courts · grievance contact.

**4.3 New pages** (needed for Razorpay/Cashfree online payments anyway)
- `/refund-policy` and `/cancellation-policy`
- `/delivery-policy` (digital delivery and album shipping)
- `/cookie-policy` + a **cookie consent banner** wired to **Google Consent Mode v2**

**4.4 Legal page UX**: sticky table of contents, a "Summary in plain words" box at the top of each section, "Last updated" with a change log, a Hindi version, and print/PDF.

---

## 5. Phase 3: SEO (Weeks 3–8, then ongoing)

### 5.1 New URL structure
```
/                                   home
/packages  /packages/[id]           packages + comparison
/build  /plan  /q/[config]          builder, planner, shared quote (q = noindex)
/add-ons  /add-ons/[id]             e.g. /add-ons/drone-shoot, /add-ons/led-screen-rental
/services/[service]                 wedding-photography, pre-wedding-shoot, maternity-photoshoot,
                                    baby-photoshoot, candid-photography, cinematic-wedding-film,
                                    matrimonial-portraits, birthday-photography, kuan-poojan
/[service]-in-[city]                ONLY where you have real work there, e.g.
                                    wedding-photographer-in-rohtak, -jhajjar, -sonipat, -bhiwani,
                                    -hisar, -jind, -panipat, -bahadurgarh, -delhi, -gurugram
/weddings  /weddings/[slug]         Real Wedding Stories
/portfolio/[category]               real path segments (not ?category=)
/films  /films/[slug]               VideoObject pages
/venues  /venues/[slug]             "Wedding venues in Rohtak", with your own photos of each venue
/pre-wedding-locations              map of locations near Rohtak/Delhi NCR with sample shots
/journal/[slug]                     guides and blog
/muhurat-2027  /availability
/reviews                            real reviews hub
/hi/...                             Hindi version of the key pages
```
> City pages need **unique content** (weddings you've actually shot there, venues, travel charges). Copy-paste city pages are "doorway pages" and Google penalises them.

### 5.2 Content plan (first 20 pieces, chosen for search demand and how close they are to a booking)
1. Wedding photography cost in Haryana 2027: a real price breakdown (links to the builder)
2. Shaadi Muhurat 2027 (Hindi + English)
3. 15 best pre-wedding shoot locations near Rohtak and Delhi
4. Best wedding venues in Rohtak (with your photos)
5. Candid vs traditional photography: what's the difference and do you need both?
6. Cinematic film vs highlights vs teaser, explained with samples
7. Haryanvi wedding rituals: a function-by-function photography guide
8. What to wear for a pre-wedding shoot (colour guide)
9. Maternity shoot: best week and what to bring
10. Newborn and baby shoot safety, home vs studio
11. How to choose a wedding photographer: 12 questions to ask (your edge: you answer them all)
12. Drone at weddings: rules, cost and best shots
13. LED screen and live streaming at a wedding: cost and setup
14. Album guide: sheets, paper types, 14×40 explained
15. Wedding photography checklist (printable PDF, a lead magnet)
16–20. One "Real Wedding" story per month

### 5.3 Technical SEO checklist
- `generateMetadata` on every route, with `alternates.canonical` and `hreflang` (en-IN / hi-IN / x-default)
- **Dynamic OG images** via `next/og` for every page, package, quote, wedding and article
- Structured data, generated from `business.ts` / `packages.ts`:
  - `["LocalBusiness","ProfessionalService"]` with `areaServed` (list of cities), `hasOfferCatalog`, `geo`, `openingHoursSpecification`, `sameAs`, `founder`, `foundingDate`
  - `Service` + `Offer` **with `price` and `priceCurrency: "INR"`** per package and add-on
  - `BreadcrumbList` everywhere
  - `VideoObject` on films
  - `ImageObject` with `creator`, `copyrightNotice`, `license` and `acquireLicensePage`, which earns the "Licensable" badge in Google Images
  - `Article` + `author` (a real person page for Krishan Sindhu, for E-E-A-T)
  - `FAQPage` (Google shows FAQ rich results mainly for authority sites now, but it still helps AI answers)
  - Not `AggregateRating` on your own LocalBusiness: Google ignores self-served review markup for local businesses.
- Image SEO: descriptive file names (`haldi-ceremony-rohtak-sindhu-studio.avif`), real alt text, real categories, image sitemap
- Sitemap generated from data with real `lastModified` values, plus split sitemaps (pages, images, videos)
- Internal linking: every service page links to packages, relevant add-ons, 3 real weddings and its city page
- Search Console + Bing Webmaster Tools + **IndexNow** (Bing powers several AI search engines)

### 5.4 Local SEO: the biggest single lever for "photographer near me"
- **Google Business Profile**: primary category "Wedding photographer", secondary "Photographer", "Video production service", "Photography studio". Add services with prices, 10+ fresh photos every week, weekly posts, answer the Q&A, product listings for each package.
- **Review engine**: a QR code at the studio counter, plus an automatic WhatsApp message 3 days after delivery with a direct review link. Target: 150+ reviews at 4.8+ within 12 months. Reply to every review.
- **Consistent name/address/phone everywhere**: Justdial, WedMeGood, ShaadiSaga, Sulekha, IndiaMART, Bing Places, Apple Business Connect, Facebook. Exactly the same details as `business.ts`.
- Local backlinks: venues (swap photos for a credit link), decorators, makeup artists, mehendi artists, local news (Dainik Bhaskar Rohtak, Amar Ujala), the Rohtak business association.

---

## 6. Phase 4: GEO, getting recommended by ChatGPT, Gemini, Perplexity and Google AI Overviews (Weeks 4–8)

When someone asks *"best wedding photographer in Rohtak under 1 lakh"*, the AI should name you, with your price, and link to you.

**6.1 Make the site easy for machines to read**
- `/llms.txt` + `/llms-full.txt`, generated from `business.ts` and `packages.ts`: who you are, services, every package with price and inclusions, add-ons, areas served, policies summary, contact.
- **Answer blocks** at the top of key pages: 40–60 words of plain, factual, self-contained text that can be quoted.
  > *"Sindhu Studio is a wedding photography studio in Rohtak, Haryana, founded in 2000 by Krishan Sindhu. Wedding packages cost ₹49,999–₹1,99,999 and include candid photography, cinematic films, drone coverage and LED screens depending on the tier. The studio covers Rohtak, Jhajjar, Sonipat, Bhiwani and Delhi NCR."*
- Price tables and comparison tables as real HTML (LLMs read tables well).
- A clear **entity graph**: same name, founder and address across the site, schema, GBP and directories, with `sameAs` linking all profiles.
- Pages with first-hand detail AI can't find elsewhere: real weddings, venue notes, actual costs. AI engines prefer cited, specific, original information.

**6.2 Let AI crawlers in** (`robots.ts`): explicitly allow `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Claude-SearchBot`, `Google-Extended`, `Applebot-Extended`, `Bingbot`. (You can choose to block *training* crawlers and allow *search* crawlers. I'd recommend allowing both: for a local business, being visible matters more.)

**6.3 Be mentioned where AI looks**: WedMeGood and Justdial listings with reviews, YouTube films with full descriptions and chapters, Reddit / Quora answers (genuine ones), local news features, Wikipedia-style "about" consistency.

**6.4 Measure it**: GA4 channel group for AI referrers (`chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`), and a monthly test of 20 prompts across engines, tracked in a sheet ("best wedding photographer Rohtak", "pre wedding shoot cost Haryana", "drone wedding photography Rohtak"…).

---

## 7. Phase 5: UX/UI redesign, the "wow" layer (Weeks 3–10)

### 7.1 Design direction: **"Modern Indian Editorial"**
- **Your photographs are the design.** Full-bleed imagery and big type, with the interface staying out of the way.
- Palette: keep the warm dark base and add **sindoor red** and **marigold** as accents, alongside the existing gold. It reads Indian without looking like a wedding card.
- Type: keep Playfair for English display, and pair it with a **Devanagari display face** (e.g. *Tiro Devanagari Hindi* / *Rozha One*) for Hindi accent words like "शुभ विवाह". That makes the site look bilingual by design.
- Motifs: a very subtle line-art toran / mandana pattern used as section dividers, nothing kitschy.
- Motion: slow, cinematic reveals like a film title sequence. No bouncy effects. Everything respects reduced motion.

### 7.2 Homepage, rebuilt in this order
1. **Hero**: a full-screen muted loop of real moments (about 3 MB), the headline, and two CTAs: "Plan my wedding" and "See real weddings". Your Google rating + "26 years · 500+ weddings" (if verified) as a trust line.
2. **"Is your date free?"**: date picker → instant availability → WhatsApp.
3. **Real Wedding Stories** carousel.
4. **Packages teaser** with "from ₹49,999" and a link to compare.
5. **Album flipbook** ("Hold your memories").
6. **Films** (YouTube facade: a thumbnail until clicked, so it costs zero KB upfront).
7. **Real reviews** (from GBP, with permission), including video testimonials.
8. **Behind the scenes / team**: faces build trust, and Indians do ask "which camera?", so show the Nikon Z6II kit.
9. **FAQ** (fixed, consistent).
10. **Instagram reel strip**.

### 7.3 Mobile-first details (most of your traffic will be on phones)
- **Sticky bottom bar**: WhatsApp · Call · Get Quote
- Thumb-reachable actions, 48px tap targets, no hover-only information (today the portfolio titles only appear on hover)
- Portfolio: **lightbox** with swipe, pinch-zoom, "Share this photo" and "Book this style"
- Real category filters with URL paths, plus "Story mode" (full-screen vertical swipe like Instagram stories)
- Before/after editing slider
- Hindi/English toggle in the navbar
- An installable PWA, so clients can keep the studio on their home screen

### 7.4 Contact and lead capture that never loses a lead
- Form → `POST /api/lead` → saved (Google Sheet / Supabase) **and** you get a notification (email + WhatsApp Cloud API), **and then** WhatsApp opens for the client. Nothing gets lost.
- A multi-step form: event type → dates → budget → contact. That converts better than one long form.
- Honeypot + rate limiting, no CAPTCHA friction.
- GA4 events: `generate_lead`, `quote_built`, `quote_shared`, `whatsapp_click`, `call_click`, `compare_used`.
- Optional: **"Lock your date" online token payment** via Razorpay (UPI first). Booking happens immediately and you get cash in hand.

### 7.5 Accessibility
WCAG 2.2 AA: contrast, focus states, keyboard support for the comparison table and builder, captions on films, `lang` attributes on Hindi segments.

---

## 8. Phase 6: The growth engine (Months 3–6)

1. **Guest Photo Finder**: at each wedding a QR code shows on your LED screen; guests take a selfie and get their photos (face matching). Start by integrating an existing Indian service (Kwikpic / Samaro style); build your own later. *Biometric data is sensitive under DPDP, so it needs explicit consent and auto-deletion after N days.*
2. **Client portal** (`/my`): gallery delivery, album photo selection (fixes the "client selection deadline" problem), payment status, download links, and the review request.
3. **Referral programme**: "Refer a couple → ₹5,000 off your album upgrade". Tracked links.
4. **CMS** (Sanity or Payload) so you can update prices, booked dates, weddings and blog posts from your phone.
5. **Seasonal campaigns**: wedding season (Oct–Feb), Karwa Chauth couple shoots, baby shoot months, Diwali family portraits. Each one gets a landing page and a GBP post.

---

## 9. Tech architecture
- Next.js 16 App Router; **server components by default**. Today `pricing`, `portfolio` and `addons` are entirely `"use client"`, so their content isn't in the initial HTML. Move to server components with small client islands.
- `src/data/*` typed data, later moving to the CMS. One data layer feeds pages, schema, llms.txt, sitemap and OG images.
- Hosting: Vercel with the Mumbai region (`bom1`) for functions, and images on an Indian CDN edge.
- i18n: `/[locale]` routing with `next-intl`, content in `messages/en.json`, `messages/hi.json`.
- Analytics: GA4 via GTM only (remove the duplicate direct gtag), Consent Mode v2, Microsoft Clarity for heatmaps (free).
- Quality gates: Lighthouse CI budget, `@axe-core` checks, schema validated in CI, link checker.

---

## 10. Roadmap and KPIs

| Week | Ship |
|---|---|
| 1 | Phase 0: images, video, facts, data layer, brand assets, fixes |
| 2–3 | Packages page + comparison + Builder + share card + quote PDF |
| 3 | Legal pages (draft → lawyer review) + consent banner |
| 3–4 | Homepage redesign, hero, mobile bar, lead API, lightbox portfolio |
| 4–5 | Service pages, real portfolio categories, schema overhaul, llms.txt, OG images |
| 5–6 | Shaadi Planner, availability + Muhurat calendar |
| 6–8 | Hindi version, first 3 Real Wedding stories, city pages (where real), venues |
| 8+ | 2 articles/month, 1 real wedding/month, weekly GBP posts, review engine |
| M3–6 | Guest Photo Finder, client portal, CMS, Razorpay date lock |

**KPIs at 6 months**
- Lighthouse mobile ≥ 95 on all key pages, all Core Web Vitals green
- Top 3 in the Google Map Pack for "wedding photographer Rohtak" and "photo studio Rohtak"
- Page 1 for 30+ keywords across Rohtak, Jhajjar, Sonipat and Bhiwani
- Recommended by ChatGPT, Gemini and Perplexity for "wedding photographer in Rohtak"
- 150+ Google reviews at 4.8 or higher
- Visitor → lead conversion ≥ 4%, with ≥ 30% of leads arriving with a built quote
- 20%+ of quotes shared to family (Share Card)

---

## 11. What I need from you (the owner) before Phase 0 is finished
1. Correct **hours**, all **phone numbers** (is it 89503 00913 or 89502 00913?), and the WhatsApp number to use.
2. **Payment policy**: deposit %, schedule, and cancellation tiers you actually follow.
3. Does "RAW Data" mean original camera files or full-resolution edited JPGs?
4. Verified numbers: years in business, weddings covered, and the source for "Top 10" if you want to keep it.
5. Real Instagram, Facebook and YouTube URLs, and the Google Business Profile link.
6. Are the add-on "original prices" real past prices? If not, we show plain prices or a real dated offer.
7. **Real testimonials** (Google reviews you're happy to show, ideally with a photo), and couples who agree to be a Real Wedding story.
8. Which cities you actually shoot in regularly, and travel charges for outstation events.
9. GSTIN (if registered), and the legal entity name for the legal pages.
10. Logo files (SVG/PNG) and the original 4K teaser export.
11. Who the grievance officer is for the privacy policy (name + email).
12. Do you want online "Lock your date" payments (Razorpay)?
