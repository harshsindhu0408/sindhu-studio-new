# Sindhu Studio: Experience Spec
### The build-ready companion to `MASTER_PLAN.md`

> Written 20 Oct 2026. `MASTER_PLAN.md` says **what** to build and **why**. This file says **exactly how**: the real package data, the screens, the tokens, the copy patterns, and the tickets.
> Everything here was checked against the current code. Numbers come from `src/app/pricing/page.tsx` and `src/lib/addons.ts`, not from guesses.

---

## 1. Corrections to `MASTER_PLAN.md` (found on re-audit)

| # | What the master plan says | What the code actually shows | Fix |
|---|---|---|---|
| 1 | Gold → Platinum upgrade "worth ₹42,000 as add-ons" | Drone ₹7,999 + LED 8×12 ₹9,999 + Cinematic ₹12,499 = **₹30,497** (at today's add-on prices) | Use the computed table in §3. Never hard-code nudge numbers; compute them from `packages.ts`. |
| 2 | — (not mentioned) | **Gold says "Candid Photography"** (no limit), but **Platinum says "Candid Photography (Marriage Only)"**. As written, Platinum gives *less* candid coverage than the cheaper Gold. | Owner to confirm (Q1 in §12). The comparison table will make this obvious to customers, so it has to be fixed first. |
| 3 | — | Only Silver and Exclusive say how many days are covered (2 and 3). Gold, Platinum, Diamond and Prime don't say. | Owner to confirm (Q2). Coverage days is the #1 thing Indian families compare. |
| 4 | — | Add-ons page icon map uses key `"2 LED Screens (43 inches)"`, but the add-on is named `"LED Screen (43 inches)"`, so it falls back to the generic icon. | Goes away when add-ons get stable `id`s (§2.3). |
| 5 | — | Spelling: "Kua Poojan" (add-ons) vs "Kuan Poojan" (plan). | Pick one for the UI (Q3) and put the other in the page's keywords and alt text, since people search both. |

The rest of the master plan's audit was re-checked and holds: 507 MB `public/`, 56 MB `teaser.mp4`, Unsplash poster, the phone number mismatch on `contact/page.tsx:416` (`200913` vs `300913`), the placeholder Maps ID `0x1234567890abcdef` on `pricing/page.tsx:323`, the two `<h1>`s in `Hero.tsx:64,74`, `?category=` sitemap URLs, the 25% vs 30% deposit, and the generic Instagram link in the footer.

---

## 2. Package data: the feature matrix

This is the single most important artifact in the whole project. The comparison table, builder, planner, schema, `llms.txt`, OG images and the WhatsApp quote all read from it.

### 2.1 Normalised matrix (from today's free-text lists)

`?` = not stated in the code; the owner needs to answer (§12).

| Feature | Silver ₹49,999 | Gold ₹69,999 ★ | Platinum ₹99,999 | Diamond ₹1,24,999 | Prime ₹1,49,999 | Exclusive ₹1,99,999 |
|---|---|---|---|---|---|---|
| **Coverage** ||||||
| Days of coverage | 2 | ? | ? | ? | ? | 3 |
| Extra cameramen | — | — | — | Yes (how many?) | +2 | +2 |
| Ring ceremony | Add-on | Add-on | Add-on | ✓ | ✓ + candid | ✓ |
| Pre-wedding shoot | Add-on | Add-on | Add-on | Add-on | Add-on | ✓ |
| **Photography** ||||||
| Full HD photos ("RAW data") | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Candid photography | Add-on | ✓ (scope?) | Main event only | Main event only | Main event only | All functions |
| **Video** ||||||
| Full HD video (master + edited) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Highlights | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Teaser | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cinematic film | Add-on | Add-on | Main event only | Main event only | Main event only | All functions |
| Drone | Add-on | Add-on | ✓ | ✓ | ✓ | ✓ |
| **Album & prints** ||||||
| 14×40 album sheets | 50 | 60 | 80 | 2 × 50 | 2 × 50 | 130 |
| Paper | Standard | Standard | Standard | Standard | Extra HQ | Extra HQ |
| Custom album design | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| Wedding frame | 1 × 16×20 | 1 × 16×24 | 1 × 20×30 | 20×30 + 16×20 | 2 × 20×30 | 2 × 20×30 acrylic |
| **At the venue** ||||||
| 43" LED screens | 2 | 2 | 2 | 2 | 2 | 2 |
| 8×12 LED wall | Add-on | Add-on | 1 | 1 | 1 | 2 |
| **Delivery** ||||||
| 64 GB pendrive | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Backup kept 6 months | ? | ? | ? | ✓ | ✓ | ✓ |

**Comparison UX rule:** rows where every package has the same value (pendrive, 43" screens, HD photos/video, highlights) go into a single **"Every package includes"** strip above the table. That removes 6 rows of noise and gives a strong message: *"Even Silver gets you 2 LED screens and full HD video."*

### 2.2 Type definitions (`src/data/packages.ts`)

```ts
export type Scope = "none" | "main-event" | "all-functions";

export type FeatureValue =
  | boolean
  | number                                      // e.g. album sheets, days
  | { scope: Scope }                            // candid, cinematic
  | { text: string; note?: string }             // e.g. "2 × 50", frames
  | { addOn: AddOnId };                         // "available as add-on" → links to builder

export interface Feature {
  id: FeatureId;
  label: string;          // "Candid photography"
  labelHi: string;        // "कैंडिड फोटोग्राफी"
  group: "coverage" | "photo" | "video" | "album" | "venue" | "delivery";
  explain: string;        // tooltip, one sentence, plain words
  media?: string;         // 3s clip or photo shown in the tooltip
}

export interface Package {
  id: "silver" | "gold" | "platinum" | "diamond" | "prime" | "exclusive";
  name: string;
  price: number;          // INR, GST-inclusive or not (Q4)
  bestFor: string;        // "2-function weddings, up to 300 guests"
  popular?: boolean;
  values: Record<FeatureId, FeatureValue>;
}
```

### 2.3 Add-on model (`src/data/addons.ts`)

```ts
export interface AddOn {
  id: AddOnId;            // "drone" | "led-8x12" | "ring-ceremony" | "candid" | "cinematic" | ...
  name: string; nameHi: string;
  price: number;
  unit: "flat" | "per-day" | "per-screen";
  maxQty?: number;
  category: "coverage" | "film" | "venue-tech" | "functions" | "other-shoots";
  includedIn: (pkg: Package) => boolean;   // derived from the matrix, never hand-written
  media: { poster: string; clip?: string };// a REAL photo or clip from your own work
  pitch: string;          // one line: "Your venue from 120 ft: the shot every relative reshares"
  offer?: { price: number; endsOn: string; reason: string }; // only real, dated offers (see §6.4)
}
```

---

## 3. Upgrade math (the honest nudge)

Computed from current add-on prices. These lines appear **between columns** in the comparison table and in the builder when someone picks a package.

| Upgrade | You pay extra | What you get (priced as add-ons today) | Plus (no add-on price) |
|---|---|---|---|
| Silver → Gold | ₹20,000 | Candid ₹11,999 | Teaser, custom album design, +10 sheets, bigger frame |
| Gold → Platinum | ₹30,000 | Drone ₹7,999 + 8×12 LED ₹9,999 + Cinematic ₹12,499 = **₹30,497** | +20 sheets, 20×30 frame |
| Platinum → Diamond | ₹25,000 | Ring ceremony ₹11,999 | Second album (100 sheets total), extra cameramen, 6-month backup, extra frame |
| Diamond → Prime | ₹25,000 | Candid at ring ceremony | Extra HQ paper, +2 cameramen, 2 × 20×30 frames |
| Prime → Exclusive | ₹50,000 | Pre-wedding ₹24,999 + 2nd 8×12 LED ₹9,999 = **₹34,998** | Candid & cinematic for all functions, 3-day coverage, 130-sheet single album, acrylic frames |

**Copy pattern:** *"Gold → Platinum: + Drone, + Cinematic film, + 8×12 LED wall. ₹30,000 more. Booked separately: ₹30,497."*
That's true, it's checkable, and it still sells. Note that Gold → Platinum only saves ₹497 at today's add-on prices, so the real selling point is the bigger album and frame. If the add-on prices change, the nudge updates itself because it's computed.

**Builder rule:** if a customer's add-ons on package X cost as much as or more than the jump to package X+1, show it. Real example: Gold + Drone + 8×12 LED + Cinematic = *"Your add-ons total ₹30,497. Platinum includes all three for ₹30,000 more, plus 20 extra album sheets and a 20×30 frame. Switch?"* This is the single most persuasive moment on the site, and it's 100% honest.

---

## 4. Design system: "Modern Indian Editorial"

Checked with the `ui-ux-pro-max` skill. The skill confirmed **Playfair Display + Inter** for "elegant, luxury, editorial", so we keep both (no font migration). Its default black-and-white palette was **rejected** as too generic for an Indian wedding brand. The palette below is our own, and every text pairing was contrast-tested (WCAG 2.2 AA needs ≥ 4.5:1).

### 4.1 Colour tokens (replace the `:root` / `.dark` blocks in `globals.css`)

| Token | Dark (default) | Light | Use | Contrast (text on bg) |
|---|---|---|---|---|
| `--background` | `#14110F` warm kajal black | `#FBF7F0` ivory | page | — |
| `--surface` | `#1E1A17` | `#F3ECE1` | sections | — |
| `--card` | `#241F1B` | `#FFFFFF` | cards, table | — |
| `--foreground` | `#F5EFE6` | `#1C1714` | body text | 16.5 / 16.6 ✅ |
| `--muted` | `#B5A999` | `#6B6158` | secondary text | 8.2 / 5.7 ✅ |
| `--gold` | `#D9AE5F` | `#8A6420` | brand accent, links, focus ring | 9.1 / 5.0 ✅ |
| `--sindoor` | `#E04A4A` | `#B3192E` | "Popular" ribbons, Hindi accent words, live badges | 4.7 / 6.4 ✅ |
| `--marigold` | `#F2A93B` | `#B86E00`* | highlights, "New", savings | 9.4 / — |
| `--border` | `#3A322B` | `#E6DCCD` | hairlines | — |
| `--success` | `#5BBF85` | `#1F7A4A` | "Included ✓" | — |

\* Test light-mode marigold before using it for text; use it only for fills in light mode.
Buttons: primary = gold fill + `--background` text (9.1:1). Light mode primary = `#8A6420` fill + white text (5.4:1).

**Rule:** colour never carries meaning alone. "Included" = ✓ icon + the word "Included". "Not included" = a dash + "Add for ₹X", never just a red ✗. (Today's red ✗ list reads as a list of things you're *missing*, which feels negative to a buyer.)

### 4.2 Type

| Role | Font | Size (mobile → desktop) |
|---|---|---|
| Display | Playfair Display 500 | 40 → 88 px, `clamp()`, tracking −0.02em |
| H2 | Playfair Display 500 | 30 → 48 px |
| H3 | Playfair Display 500 | 22 → 28 px |
| Body | Inter 400 | 16 → 17 px, line-height 1.6 |
| Price | Inter 600, `tabular-nums` | 28 → 40 px |
| Label / eyebrow | Inter 600, uppercase, 0.18em tracking | 12 px (minimum; never smaller) |
| Hindi accent | **Tiro Devanagari Hindi** 400 | used for 1–3 word accents: शुभ विवाह, आपकी यादें |
| Hindi body (`/hi`) | **Noto Sans Devanagari** 400 | 17 px, line-height 1.75 (Devanagari needs more room) |

Load Devanagari fonts **only** on pages that use them (`next/font` with `subsets: ["devanagari"]`, in the `/hi` layout), so English pages don't pay for them.

### 4.3 Indian number and price formatting
- Always `toLocaleString("en-IN")`: **₹1,24,999**, never ₹124,999.
- Write lakhs in headings and prose: "Wedding packages from ₹50,000 to ₹2 lakh". Show exact prices in tables and cards.
- Say whether GST is included next to every price. Indian buyers ask about it straight away.
- Booking amount shown as a rupee figure, not a %: "Lock your date with ₹15,000".

### 4.4 Motion
- Easing `cubic-bezier(0.16, 1, 0.3, 1)` (already `--ease-out-expo`). Enter 400–600 ms, exit 200–250 ms.
- **No `back.out` overshoot on pricing and tables** (skill guidance: it "reads as sloppy on informational UI"). Overshoot is fine on the portfolio grid only.
- `prefers-reduced-motion`: render every section in its final state, no parallax, no autoplay video.
- **Lite mode (India-specific):** if `navigator.connection.saveData` is on or `effectiveType` is `2g`/`3g`, replace hero video with a still, turn off Lenis, and lazy-load below-the-fold images more aggressively. Show a tiny "Lite mode on · Load video" chip. Lots of Indian visitors browse on capped mobile data, and this treats them well.

### 4.5 Components to build (in `src/components/ui/`)
`Button` · `Price` (formats, GST note, strike-through only when an `offer` exists) · `Chip` · `Stepper` (qty, 44px targets) · `Sheet` (mobile bottom sheet) · `Tooltip/Popover` (tap to open on mobile, not hover) · `StickyBar` · `Accordion` · `Tabs` · `Lightbox` · `Toast` · `SectionHeading` (eyebrow + H2 + optional Hindi accent).

---

## 5. Package comparison: screen spec (`/packages`)

### 5.1 Page order
1. **Answer block** (40–60 words, for GEO; see `MASTER_PLAN.md` §6.1) + H1 "Wedding Photography Packages in Rohtak".
2. **"Find my package" quiz**: 3 tap questions in a bottom sheet → highlights one card with a reason.
3. **Package cards** (6).
4. **"Every package includes"** strip.
5. **Comparison table**.
6. **Add-ons teaser** → `/build`.
7. Package FAQ (payment, GST, travel, RAW data, delivery time).
8. CTA: "Build my quote" + WhatsApp.

### 5.2 Desktop comparison (≥1024px)

```
                       ┌─────────┬─────────┬──────────┬─────────┬─────────┬───────────┐
 [ ] Show only         │ SILVER  │ GOLD ★  │ PLATINUM │ DIAMOND │ PRIME   │ EXCLUSIVE │ ← sticky on scroll
     differences       │ ₹49,999 │ ₹69,999 │ ₹99,999  │₹1,24,999│₹1,49,999│ ₹1,99,999 │
                       │ [Select]│ [Select]│ [Select] │ [Select]│ [Select]│ [Select]  │
 ──────────────────────┼─────────┼─────────┼──────────┼─────────┼─────────┼───────────┤
 COVERAGE ▾            │         │         │          │         │         │           │
  Days                 │    2    │    ?    │    ?     │    ?    │    ?    │     3     │
  Ring ceremony  ⓘ     │ +₹11,999│ +₹11,999│ +₹11,999 │    ✓    │ ✓+candid│     ✓     │
 ──────────────────────┼─────────┴────┬────┴──────────┼─────────┼─────────┼───────────┤
                       │  ↑ Gold → Platinum: + Drone, + Cinematic, + 8×12 LED          │
                       │    ₹30,000 more · ₹30,497 if booked separately  [See Platinum]│
 ──────────────────────┼──────────────┴───────────────┼─────────┼─────────┼───────────┤
 PHOTOGRAPHY ▾  ...
```
- The highlighted (Gold) column has a soft gold tint on every row, not just the header.
- Hovering a row highlights it. `ⓘ` opens a popover with a one-line explanation **and a 3-second clip** (what a drone shot actually looks like). Nobody else does this, and it answers "what even is cinematic?"
- "Not included" cells show the add-on price as a link ("+₹7,999"), never a red ✗. Clicking it opens the builder with that package and add-on pre-selected.
- Groups collapse; "Show only differences" hides rows where all values match.
- Built as a real `<table>` with `<th scope="col">` / `<th scope="row">`, `<caption>`, and `<colgroup>`. Arrow keys move between cells.

### 5.3 Mobile comparison (<768px), the version most people will see

```
┌──────────────────────────────┐
│ Compare                      │
│ ┌────────────┐ ┌────────────┐│  ← two pickers; swipe either column
│ │ GOLD ★   ▾ │ │ PLATINUM ▾ ││     to cycle packages
│ │ ₹69,999    │ │ ₹99,999    ││
│ └────────────┘ └────────────┘│
│ [✓] Only differences          │
├──────────────────────────────┤
│ Drone                        │  ← feature label on its own row,
│  +₹7,999        ✓ Included   │     values underneath, full width.
├──────────────────────────────┤     No sideways table scrolling.
│ Cinematic film               │
│  +₹12,499       Main event   │
├──────────────────────────────┤
│ Album                        │
│  60 sheets      80 sheets    │
├──────────────────────────────┤
│ … 8 more differences         │
└──────────────────────────────┘
┌──────────────────────────────┐
│ Platinum · ₹99,999 [Build ▸] │  ← sticky bottom bar
└──────────────────────────────┘
```
- Default pair: the quiz result + one tier above it (this nudges up honestly).
- Picker state goes in the URL: `/packages?compare=gold,platinum`, so it can be shared on WhatsApp. Add `rel=canonical` to `/packages` so Google doesn't index each pair.

### 5.4 Cards → compare drawer
Each card has a "Compare" checkbox (44px target). Ticking 2–3 slides up a bar: `[Gold] [Platinum] [+]  Compare (2) ▸`. On desktop it scrolls to the table with those columns pinned; on mobile it opens the two-column view.

### 5.5 Analytics events
`compare_open` (source: card/drawer/link) · `compare_diff_toggle` · `compare_pair` (a,b) · `feature_info_open` (feature) · `upgrade_nudge_click` (from,to) · `package_select` (id).

---

## 6. Add-ons, rebuilt as the Quote Builder (`/build`)

### 6.1 Mobile flow

```
Step 1/3 · Base                  Step 2/3 · Add-ons                Step 3/3 · Your quote
┌────────────────────────┐       ┌────────────────────────┐        ┌────────────────────────┐
│ Start with a package   │       │ Filters: All · Film ·  │        │ Gold            69,999 │
│ ○ Silver   ₹49,999     │       │ Venue tech · Functions │        │ Drone            7,999 │
│ ● Gold ★   ₹69,999     │       │ ┌────────────────────┐ │        │ Candid × 1 day  11,999 │
│ ○ Platinum ₹99,999     │       │ │ [ 3s drone clip  ] │ │        │ ────────────────────── │
│ ...                    │       │ │ Drone Shoot        │ │        │ Total  ₹89,997         │
│ ○ Just add-ons         │       │ │ "Your venue from   │ │        │ GST    (Q4)            │
│                        │       │ │  120 ft"   ₹7,999  │ │        │ Lock your date ₹XX,XXX │
│ Not sure? [Take quiz]  │       │ │           [ Add + ]│ │        │                        │
└────────────────────────┘       │ └────────────────────┘ │        │ [Send to studio  (WA)] │
                                 │ ┌────────────────────┐ │        │ [Share with family  ↗] │
                                 │ │ Candid  ₹11,999/day│ │        │ [Download PDF]         │
                                 │ │      [ − 1 + ] days│ │        │ Quote valid 7 days     │
                                 │ └────────────────────┘ │        └────────────────────────┘
                                 │ LED 8×12  ✓ Included   │
                                 │ in Platinum (greyed)   │
                                 └────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ Gold + 2 add-ons · ₹89,997            [ Continue ▸ ]   │  ← always visible; the total animates
└────────────────────────────────────────────────────────┘     with tabular numbers, no layout shift
```

### 6.2 Rules
- Add-ons already in the base package show **"✓ Included in Gold"**, greyed out with no button. (Today a Platinum customer can "book" a drone they already have.)
- Per-day add-ons get a stepper with a maximum = the package's coverage days.
- **Smart switch** (§3): when add-ons push the total past the next tier's price, a card appears above the total: *"Platinum includes Drone + Cinematic + LED for ₹30,000 more. Switch?"* [Switch] [Keep mine].
- State lives in the URL (`/build?p=gold&a=drone,candid:2`). A shared link opens the exact quote, and a relative can change it.
- If the visitor leaves with an unfinished quote, a small "Your quote is saved" chip on the next visit (`localStorage`, wrapped in try/catch).

### 6.3 Outputs
1. **Send to studio**: `POST /api/lead` first (so the lead is saved even if WhatsApp doesn't open), then open `wa.me` with a structured message:
   ```
   🙏 Namaste Sindhu Studio
   Quote #SS-2610-0427
   Package: Gold (₹69,999)
   + Drone (₹7,999)
   + Candid × 1 day (₹11,999)
   Total: ₹89,997
   Functions/dates: 12 Dec (Haldi), 14 Dec (Shaadi)
   Link: sindhustudio.com/q/SS-2610-0427
   ```
2. **Share with family**: a 1080×1350 card made with `next/og` (works well on WhatsApp and Instagram): your photo at the top, the package, add-ons, total, dates, QR code, logo. Uses the Web Share API with a fallback to download.
3. **PDF**: same content, A4, with the terms summary and GST note.

### 6.4 Honest pricing (replaces the permanent "50% OFF")
- Default: **plain price**. No strike-through.
- A strike-through appears **only** when `offer` is set with a real `endsOn` date and a reason ("Wedding season 2026 · until 31 Dec"). The UI shows the end date. When the date passes, the offer disappears by itself.
- Benefit: no regulatory risk under the CCPA dark-patterns guidelines, and real offers actually work because people believe them.

---

## 7. Legal pages: UX and structure

Content outline is in `MASTER_PLAN.md` §4 (DPDP Act 2023 + Rules, terms, refund, cookies). This section is how the pages **look and work**, because nobody reads a wall of legal text, and a readable policy is itself a trust signal.

### 7.1 Pages
`/privacy` · `/terms` · `/refund-policy` · `/cancellation-policy` · `/delivery-policy` · `/cookie-policy` · `/hi/privacy` · `/hi/terms`.
(Payment gateways such as Razorpay ask for refund, cancellation, delivery and contact pages before activation.)

### 7.2 Layout

```
Desktop                                         Mobile
┌──────────┬──────────────────────────────┐     ┌──────────────────────────┐
│ On this  │ Privacy Policy               │     │ Privacy Policy           │
│ page     │ Last updated 20 Oct 2026 ·   │     │ Updated 20 Oct 2026      │
│ ───────  │ What changed ▸   EN | हिं  ⎙  │     │ [On this page ▾] EN|हिं  │
│ ● Summary│ ┌──────────────────────────┐ │     │ ┌──────────────────────┐ │
│ ○ Data we│ │ In short                 │ │     │ │ In short             │ │
│   collect│ │ • We collect only what we│ │     │ │ • ...                │ │
│ ○ Why    │ │   need to plan your shoot│ │     │ └──────────────────────┘ │
│ ○ Photos │ │ • We never sell your data│ │     │ ▸ 1. Data we collect     │
│   of you │ │ • Ask us to delete it    │ │     │ ▸ 2. Why we use it       │
│ ○ Your   │ │   any time: WhatsApp ... │ │     │ ▸ 3. Photos of you and   │
│   rights │ └──────────────────────────┘ │     │      your guests         │
│ ○ Contact│ 1. Data we collect           │     │ ...                      │
│  (sticky)│    Plain summary in a box,   │     │ (accordions, all open    │
│          │    then the full legal text  │     │  when printing)          │
└──────────┴──────────────────────────────┘     └──────────────────────────┘
```

- Every section: a **plain-words summary box** (2–3 bullets), then the full text. The legal text is what counts; the summary helps people read it.
- **Tables** for data/purpose/retention and for cancellation tiers. Tables are easier to read, and LLMs and Google parse them better.
- Deep links on every heading (`#cancellation`), so you can WhatsApp a client the exact clause.
- "What changed" opens a dated change log.
- Print stylesheet: hide nav, expand accordions, show URLs.
- **Privacy self-service card** at the bottom: "Remove my photos from your portfolio" / "Delete my enquiry data" → a prefilled WhatsApp or email message. This is the DPDP data-principal right made usable, and almost nobody does it.
- **Cancellation calculator** on `/cancellation-policy`: enter your event date and today's date → see which tier applies and what refund you'd get. This turns a scary page into a reassuring one.

### 7.3 Consent banner
Bottom sheet on mobile, small card on desktop. Three buttons of equal visual weight: **Accept all · Reject all · Choose**. (A hidden or small "Reject" is a dark pattern.) Wired to Google Consent Mode v2 *before* GTM loads. Remove the duplicate direct `gtag` in `layout.tsx` so GA4 only loads through GTM.

---

## 8. Homepage: mobile wireframe

```
┌──────────────────────────────┐
│ ☰  SINDHU STUDIO     हिं  📞 │  nav: logo, language, call
├──────────────────────────────┤
│ [ full-bleed muted loop,     │  H1 (one only): "Wedding photography
│   real moments, ~3 MB;       │  that your family will keep for generations"
│   still in Lite mode ]       │  Hindi accent line: शुभ विवाह · since 2000
│                              │  [Plan my wedding]  [See real weddings]
│ ★ 4.x on Google · N reviews  │  ← only real, live numbers
├──────────────────────────────┤
│ Is your date free?           │  date picker → "Free · 2 teams left" /
│ [ 14 Dec 2026 ▾ ] [Check]    │  "Booked: join waitlist" → WhatsApp
├──────────────────────────────┤
│ Real Weddings  ← swipe →     │  story cards: couple, city, venue
├──────────────────────────────┤
│ Packages from ₹49,999        │  3 cards (Silver, Gold★, Platinum)
│ [Compare all 6]              │  + "Every package includes" strip
├──────────────────────────────┤
│ Hold your album              │  flipbook of a real 14×40 album
├──────────────────────────────┤
│ Films (YouTube facade)       │
├──────────────────────────────┤
│ What families say            │  real Google reviews, with permission
├──────────────────────────────┤
│ Meet the team · our kit      │
├──────────────────────────────┤
│ For families abroad (NRI)    │  see §9.1
├──────────────────────────────┤
│ FAQ                          │
└──────────────────────────────┘
┌──────────────────────────────┐
│  WhatsApp  │  Call  │ Quote  │  sticky bottom bar (44px+ targets,
└──────────────────────────────┘  respects the iOS safe area)
```
Down from 12 sections to 10, each with one job. Remove the `SectionSkeleton` fallback for server-rendered sections; it only causes layout shift.

---

## 9. "Wow" additions not in the master plan

### 9.1 NRI family mode
Haryana has a large diaspora in Canada, Australia, the UK and the US, and those relatives often pay for or help choose the wedding photographer.
- `/nri-weddings` page: approximate prices in CAD/AUD/GBP/USD next to INR (rate updated daily, clearly labelled "approx."), video-call studio walkthrough booking with time-zone-aware slots, the live-stream add-on featured front and centre, international payment options.
- Live stream add-on pitch: "Nani in Brampton watches the pheras live."
- Targets searches like "wedding photographer Haryana from Canada" that local competitors don't compete for at all.

### 9.2 "Ask Sindhu Studio": an answer assistant
A small chat button that answers questions in **English, Hindi or Hinglish** ("Gold mein drone hai kya?"), using **only** `packages.ts`, `addons.ts`, `business.ts` and the policies, with links to the exact table row or clause. It never invents prices, and it hands off to WhatsApp with the conversation attached.
- Build on the Claude API with the data passed as context; refuse anything outside the studio's data.
- Phase 6 or later, after the data layer is solid. Running cost is small at a studio's traffic, but set a spend cap.

### 9.3 Seasonal skin
Small, tasteful changes on dates in `business.ts`: diyas in the footer around Diwali, a Karwa Chauth couple-shoot banner, a "Wedding season 2026–27: X dates left" counter from Oct to Feb. It shows the site is alive and run by real people.

### 9.4 Hinglish microcopy
Buttons and helper text sound like you talk to clients: "Date pakki karein" (alt for "Lock your date"), "Family ke saath share karein". Keep it to microcopy in the English UI. The `/hi` pages use proper Hindi.

### 9.5 Video-call walkthrough
"See our albums on video call: 15 minutes, free" booking (Cal.com, or a Google Calendar booking page). It converts families who can't visit the Rohtak studio.

---

## 10. SEO and GEO additions

### 10.1 Page → keyword map (first wave)
Search volumes aren't included because we have no data source in this repo. Check them in Google Search Console after launch, or in Keyword Planner, before writing.

| URL | Primary query (EN) | Hindi/Hinglish variant | Intent |
|---|---|---|---|
| `/` | photo studio Rohtak | रोहतक फोटो स्टूडियो | navigational/local |
| `/packages` | wedding photography packages Rohtak | शादी फोटोग्राफी पैकेज | commercial |
| `/packages/gold` | wedding photography package under 70000 | — | commercial |
| `/build` | wedding photography cost calculator | shaadi photography kitna kharcha | commercial |
| `/services/wedding-photography` | wedding photographer Rohtak | रोहतक में शादी फोटोग्राफर | local |
| `/services/pre-wedding-shoot` | pre wedding shoot Rohtak | pre wedding shoot kaha karaye | local |
| `/add-ons/drone-shoot` | drone shoot for wedding price | शादी में ड्रोन शूट | commercial |
| `/add-ons/led-screen-rental` | LED screen for wedding Rohtak | शादी के लिए LED स्क्रीन | commercial |
| `/add-ons/kuan-poojan` | kuan pujan photography | कुआं पूजन | niche, very low competition |
| `/muhurat-2027` | shaadi muhurat 2027 | विवाह मुहूर्त 2027 | informational, big seasonal traffic |
| `/nri-weddings` | wedding photographer in Haryana for NRI | — | commercial |

### 10.2 Schema per page type
| Page | JSON-LD |
|---|---|
| All | `WebSite`, `Organization`/`LocalBusiness` (`@id` reused, never duplicated), `BreadcrumbList` |
| `/packages` | `OfferCatalog` → `Offer` with `price`, `priceCurrency: "INR"`, `itemOffered: Service` |
| `/packages/[id]` | `Service` + `Offer` |
| `/add-ons/[id]` | `Service` + `Offer` |
| `/weddings/[slug]` | `Article` + `ImageObject` (creator, copyrightNotice, license) + `Place` (venue) |
| `/films/[slug]` | `VideoObject` (thumbnail, duration, uploadDate, embedUrl) |
| `/about` | `Person` (Krishan Sindhu: jobTitle, worksFor, sameAs) |
| FAQs | `FAQPage` |

### 10.3 GEO test prompts (run monthly in ChatGPT, Gemini, Perplexity, Google AI Mode, Copilot)
Track in a sheet: mentioned? (Y/N) · position · price shown correctly? · link cited?
1. best wedding photographer in Rohtak
2. wedding photography packages Rohtak price
3. photographer for Haryanvi wedding with drone and LED screen
4. pre wedding shoot cost in Haryana
5. Rohtak mein sabse accha wedding photographer kaun hai
6. candid wedding photographer near Jhajjar
7. wedding photographer in Haryana for NRI family
8. how much does a wedding photographer cost in Haryana 2026
9. kuan pujan photographer Rohtak
10. wedding LED screen rental Rohtak price

---

## 11. Build backlog (ticket level)

Sizes: S ≤ ½ day · M ≈ 1 day · L 2–3 days. Owner answers in §12 unblock the ⚑ tickets.

### Sprint 1: Foundations
| # | Ticket | Files | Size |
|---|---|---|---|
| 1 | Image pipeline: `scripts/optimize-images.mjs` (sharp → AVIF/WebP, blur placeholders, EXIF strip + copyright), move originals out of `public/` | `scripts/`, `src/data/media.ts`, `.gitignore` | L |
| 2 | Re-encode teaser (H.265/H.264, 720p + 1080p), local poster, play in view only | `public/films/`, `FeaturedFilms.tsx` | S |
| 3 | ⚑ `src/data/business.ts`: single source of truth; fix phone link, hours, socials, map | `business.ts`, `contact/page.tsx`, `Footer.tsx`, `schema.tsx`, `pricing/page.tsx` | M |
| 4 | ⚑ `src/data/packages.ts` + `addons.ts` with the matrix in §2 | `src/data/` | M |
| 5 | Design tokens §4.1 + type scale + Tiro/Noto Devanagari in `/hi` layout only | `globals.css`, `layout.tsx` | M |
| 6 | Hero: one `<h1>`, real photo/loop, drop the third-party noise texture | `Hero.tsx` | M |
| 7 | Brand assets: favicon set, apple-touch-icon, maskable icons, default OG image | `public/`, `manifest.json` | S |
| 8 | GA4 through GTM only + consent banner + Consent Mode v2 | `layout.tsx`, `components/ui/Consent.tsx` | M |

### Sprint 2: Packages and builder
| # | Ticket | Size |
|---|---|---|
| 9 | `/packages` server page; 301 `/pricing` → `/packages` and `/addons` → `/build` (in `next.config.js`) | M |
| 10 | Package cards + compare drawer | M |
| 11 | Comparison table: desktop (sticky header, groups, differences toggle, nudges) | L |
| 12 | Comparison: mobile two-column view + URL state | M |
| 13 | Feature tooltips with clips | S |
| 14 | Find-my-package quiz | M |
| 15 | `/build` stepper, add-on cards, included-state logic, smart switch | L |
| 16 | `/api/lead` (Sheet/Supabase + notification) → WhatsApp handoff | M |
| 17 | Share card (`next/og`) + `/q/[id]` (noindex) + PDF | L |
| 18 | `/packages/[id]` pages with OG images | M |

### Sprint 3: Legal, SEO, GEO
| # | Ticket | Size |
|---|---|---|
| 19 | Legal page template (TOC, summaries, change log, print, deep links) | M |
| 20 | ⚑ Draft Privacy (DPDP), Terms, Refund, Cancellation (+ calculator), Delivery, Cookies → **lawyer review** | L |
| 21 | Metadata + canonical + hreflang on every route; data-driven sitemap with real `lastModified` | M |
| 22 | Schema overhaul per §10.2, generated from data | M |
| 23 | `robots.ts` AI crawler rules + `/llms.txt` + `/llms-full.txt` routes generated from data | S |
| 24 | Real portfolio categories as path segments + descriptive alt text + lightbox | L |
| 25 | Service pages (first 4) + add-on pages (first 4) | L |

### Sprint 4+: Wow layer
Homepage rebuild (§8) · availability + Muhurat calendar · Shaadi Planner · album flipbook · Hindi `/hi` · NRI page · Real Wedding stories · review engine · then Guest Photo Finder, client portal, CMS, Ask Sindhu Studio.

### Definition of done (every ticket)
- Lighthouse mobile ≥ 95 on the touched page, CLS < 0.05
- Keyboard-usable, visible focus, 44px targets, works at 360px width
- Works in light, dark and reduced motion
- No hard-coded business facts or prices outside `src/data/`
- Schema validates in the Rich Results Test

---

## 12. Owner questions (additions to `MASTER_PLAN.md` §11)

1. **Candid in Gold vs Platinum:** Gold says "Candid Photography" and Platinum says "Marriage only". Which is right?
2. **Coverage days** for Gold, Platinum, Diamond and Prime?
3. **"Kua Poojan" or "Kuan Poojan"** for the UI?
4. **Are prices GST-inclusive?** What's the booking amount in rupees per package?
5. How many **extra cameramen** in Diamond? How many cameramen does the base team have?
6. Is the **6-month backup** included in Silver, Gold and Platinum, or only Diamond and up?
7. Do you want the **NRI page** and **video-call walkthroughs**? Who takes those calls?
8. Any **real offer** for wedding season 2026–27 (with an end date)? Otherwise all prices show plain.
