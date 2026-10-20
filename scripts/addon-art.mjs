/**
 * Builds the add-on card images in public/images/addons/.
 *
 * - LED wall, extra screens, live stream: composed from real frames of the studio's
 *   own teaser (originals/frames/*.jpg).
 * - Kuan Poojan, baby shoot, birthday: gold line-art illustrations, until real photos
 *   from these events are added. To use photos instead, put them in originals/ and
 *   point the add-on's `media` at them in src/data/addons.ts.
 *
 * Usage: node scripts/addon-art.mjs
 */
import path from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const FRAMES = path.join(ROOT, "originals/frames");
const OUT = path.join(ROOT, "public/images/addons");
const W = 1200;
const H = 900;
const GOLD = "#D9AE5F";
const GOLD_SOFT = "#E8C785";
const SINDOOR = "#E04A4A";
const MARIGOLD = "#F2A93B";

await mkdir(OUT, { recursive: true });

const save = (img, name) => img.webp({ quality: 80 }).toFile(path.join(OUT, `${name}.webp`)).then(() => console.log(`✓ ${name}.webp`));

/* ---------- Shared backdrop for illustrations ---------- */
const backdrop = (inner) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stop-color="#3a2a1a"/>
      <stop offset="55%" stop-color="#1f1813"/>
      <stop offset="100%" stop-color="#120f0d"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="600" cy="420" r="360" fill="url(#halo)"/>
  <!-- faint mandala rings -->
  <g fill="none" stroke="${GOLD}" stroke-opacity="0.07" stroke-width="1.5">
    <circle cx="600" cy="420" r="300"/><circle cx="600" cy="420" r="380"/><circle cx="600" cy="420" r="460"/>
    ${Array.from({ length: 24 }, (_, i) => {
        const a = (i * Math.PI * 2) / 24;
        const x1 = 600 + Math.cos(a) * 300, y1 = 420 + Math.sin(a) * 300;
        const x2 = 600 + Math.cos(a) * 380, y2 = 420 + Math.sin(a) * 380;
        return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} Q${(600 + Math.cos(a + 0.13) * 340).toFixed(1)},${(420 + Math.sin(a + 0.13) * 340).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}"/>`;
    }).join("")}
  </g>
  ${inner}
</svg>`;

const diya = (x, y, s = 1) => `
  <g transform="translate(${x},${y}) scale(${s})">
    <path d="M-34,0 Q0,30 34,0 Q20,-6 0,-6 Q-20,-6 -34,0 Z" fill="${GOLD}" fill-opacity="0.25" stroke="${GOLD}" stroke-width="3"/>
    <path d="M0,-8 C-9,-22 -4,-36 0,-46 C4,-36 9,-22 0,-8 Z" fill="${MARIGOLD}"/>
    <path d="M0,-12 C-4,-20 -2,-28 0,-34 C2,-28 4,-20 0,-12 Z" fill="#FFE6A8"/>
  </g>`;

/* ---------- Kuan Poojan: kalash on a well, marigold garland, diyas ---------- */
const kuan = backdrop(`
  <g fill="none" stroke="${GOLD}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <!-- well -->
    <path d="M420,560 L420,740 Q600,800 780,740 L780,560" fill="#2a2018" fill-opacity="0.85"/>
    <ellipse cx="600" cy="560" rx="180" ry="44" fill="#1a1410"/>
    <ellipse cx="600" cy="560" rx="150" ry="32" stroke-opacity="0.5"/>
    ${[600, 640, 680, 720].map((y, i) => `<path d="M420,${y} Q600,${y + 52} 780,${y}" stroke-opacity="0.35" stroke-width="2"/>${Array.from({ length: 6 }, (_, j) => `<path d="M${450 + j * 60 + (i % 2) * 30},${y + 8 + Math.sin(j) * 4} l0,32" stroke-opacity="0.25" stroke-width="2"/>`).join("")}`).join("")}
    <!-- marigold garland on the rim -->
  </g>
  <g>
    ${Array.from({ length: 15 }, (_, i) => {
        const t = i / 14;
        const x = 430 + t * 340;
        const y = 600 + Math.sin(t * Math.PI) * 46;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="${i % 2 ? MARIGOLD : SINDOOR}" fill-opacity="0.95"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#FFE6A8" fill-opacity="0.8"/>`;
    }).join("")}
  </g>
  <!-- kalash -->
  <g stroke="${GOLD}" stroke-width="4" stroke-linejoin="round">
    <path d="M540,520 C500,470 505,400 560,380 L640,380 C695,400 700,470 660,520 Z" fill="${GOLD}" fill-opacity="0.22"/>
    <path d="M555,380 L565,350 L635,350 L645,380" fill="${GOLD}" fill-opacity="0.35"/>
    <path d="M520,450 Q600,480 680,450" fill="none" stroke="${SINDOOR}" stroke-width="5"/>
    <circle cx="600" cy="452" r="9" fill="${SINDOOR}" stroke="none"/>
    <!-- mango leaves + coconut -->
    ${[-60, -30, 0, 30, 60].map((a) => `<path transform="rotate(${a} 600 350)" d="M600,350 C585,320 588,290 600,270 C612,290 615,320 600,350 Z" fill="#4f7a3a" fill-opacity="0.85" stroke="${GOLD}" stroke-width="2"/>`).join("")}
    <ellipse cx="600" cy="300" rx="34" ry="40" fill="#6b4a2b" stroke="${GOLD}" stroke-width="3"/>
    <path d="M600,262 l0,-14" stroke="${GOLD}" stroke-width="3"/>
  </g>
  ${diya(330, 720, 1.1)}${diya(870, 720, 1.1)}
`);

/* ---------- Baby shoot: footprints, crescent moon, stars ---------- */
const foot = (x, y, rot, s = 1) => `
  <g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
    <path d="M0,70 C-30,70 -38,25 -34,-8 C-30,-48 -12,-74 8,-74 C30,-74 37,-42 33,-8 C30,22 26,70 0,70 Z" fill="${GOLD}" fill-opacity="0.18" stroke="${GOLD}" stroke-width="4"/>
    ${[
        [-26, -94, 11],
        [-6, -104, 10],
        [13, -103, 9],
        [29, -95, 8],
        [40, -82, 7],
    ]
        .map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GOLD}" fill-opacity="0.18" stroke="${GOLD}" stroke-width="3.5"/>`)
        .join("")}
  </g>`;
const star = (x, y, r) => `<path transform="translate(${x},${y})" d="M0,${-r} L${r * 0.28},${-r * 0.28} L${r},0 L${r * 0.28},${r * 0.28} L0,${r} L${-r * 0.28},${r * 0.28} L${-r},0 L${-r * 0.28},${-r * 0.28} Z" fill="${GOLD_SOFT}"/>`;
const baby = backdrop(`
  <!-- moon -->
  <path d="M760,170 A110,110 0 1 0 860,330 A86,86 0 1 1 760,170 Z" fill="${GOLD}" fill-opacity="0.85"/>
  ${star(420, 190, 16)}${star(520, 120, 10)}${star(330, 300, 9)}${star(900, 450, 12)}${star(640, 220, 7)}${star(980, 240, 8)}
  <!-- blanket -->
  <path d="M0,790 C220,720 420,760 600,722 C780,686 980,724 1200,790 L1200,900 L0,900 Z" fill="${SINDOOR}" fill-opacity="0.16"/>
  <path d="M0,790 C220,720 420,760 600,722 C780,686 980,724 1200,790" fill="none" stroke="${GOLD}" stroke-width="3" stroke-opacity="0.6"/>
  <path d="M40,830 C260,766 440,800 620,768 C800,738 990,770 1160,826" fill="none" stroke="${GOLD}" stroke-width="2" stroke-dasharray="6 10" stroke-opacity="0.45"/>
  ${foot(520, 560, -12, 1.25)}${foot(690, 520, 14, 1.25)}
`);

/* ---------- Birthday: cake, candles, bunting, confetti ---------- */
const bunting = Array.from({ length: 11 }, (_, i) => {
    const x = 150 + i * 90;
    const y = 120 + Math.sin((i / 10) * Math.PI) * 60;
    return `<path d="M${x},${y} l45,0 l-22,52 Z" fill="${[SINDOOR, MARIGOLD, GOLD][i % 3]}" fill-opacity="0.9"/>`;
}).join("");
const confetti = Array.from({ length: 40 }, (_, i) => {
    const x = (i * 263) % W;
    const y = 230 + ((i * 137) % 560);
    return `<rect x="${x}" y="${y}" width="10" height="4" rx="2" transform="rotate(${(i * 47) % 180} ${x} ${y})" fill="${[SINDOOR, MARIGOLD, GOLD_SOFT][i % 3]}" fill-opacity="0.55"/>`;
}).join("");
const candle = (x) => `
  <rect x="${x - 7}" y="330" width="14" height="70" rx="3" fill="${GOLD_SOFT}" fill-opacity="0.9"/>
  <path d="M${x - 7},350 l14,-8 M${x - 7},370 l14,-8 M${x - 7},390 l14,-8" stroke="${SINDOOR}" stroke-width="3"/>
  <path d="M${x},325 C${x - 10},308 ${x - 4},292 ${x},280 C${x + 4},292 ${x + 10},308 ${x},325 Z" fill="${MARIGOLD}"/>
  <path d="M${x},320 C${x - 4},310 ${x - 2},300 ${x},294 C${x + 2},300 ${x + 4},310 ${x},320 Z" fill="#FFE6A8"/>`;
const birthday = backdrop(`
  <path d="M150,120 Q600,240 1140,120" fill="none" stroke="${GOLD}" stroke-width="2" stroke-opacity="0.6"/>
  ${bunting}${confetti}
  <g stroke="${GOLD}" stroke-width="4" stroke-linejoin="round">
    <ellipse cx="600" cy="760" rx="300" ry="34" fill="#1a1410"/>
    <path d="M360,580 L360,740 Q600,790 840,740 L840,580" fill="${GOLD}" fill-opacity="0.16"/>
    <ellipse cx="600" cy="580" rx="240" ry="40" fill="#2a2018"/>
    <path d="M360,600 Q400,650 440,605 Q480,655 520,608 Q560,658 600,610 Q640,658 680,608 Q720,655 760,605 Q800,650 840,600" fill="none" stroke="${SINDOOR}" stroke-width="6"/>
    <path d="M450,410 L450,560 Q600,600 750,560 L750,410" fill="${GOLD}" fill-opacity="0.22"/>
    <ellipse cx="600" cy="410" rx="150" ry="28" fill="#2a2018"/>
    <path d="M450,428 Q480,462 510,430 Q540,466 570,432 Q600,468 630,432 Q660,466 690,430 Q720,462 750,428" fill="none" stroke="${GOLD_SOFT}" stroke-width="5"/>
  </g>
  ${candle(540)}${candle(600)}${candle(660)}
`);

for (const [name, svg] of [
    ["kuan-poojan", kuan],
    ["baby-shoot", baby],
    ["birthday", birthday],
]) {
    await save(sharp(Buffer.from(svg)), name);
}

/* ---------- From real teaser frames ---------- */
const venue = path.join(FRAMES, "venue-led-screen.jpg");
const stage = path.join(FRAMES, "stage-couple.jpg");

// LED wall: the venue shot with the LED screen beside the stage
await save(sharp(venue).extract({ left: 0, top: 60, width: 1060, height: 660 }).resize(W, H, { fit: "cover", position: "left" }).modulate({ brightness: 1.08, saturation: 1.05 }), "led-wall");

// Shared blurred background from the venue frame
const bg = await sharp(venue).resize(W, H, { fit: "cover" }).blur(18).modulate({ brightness: 0.55 }).toBuffer();

// Live stream: the stage feed inside a phone, with a LIVE badge
const PW = 400, PH = 760, PX = (W - PW) / 2, PY = (H - PH) / 2;
const screen = await sharp(stage).resize(PW - 28, PH - 28, { fit: "cover", position: "centre" }).toBuffer();
const phoneSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="46" fill="none" stroke="#0d0b0a" stroke-width="16"/>
  <rect x="${PX - 2}" y="${PY - 2}" width="${PW + 4}" height="${PH + 4}" rx="48" fill="none" stroke="${GOLD}" stroke-opacity="0.45" stroke-width="2"/>
  <rect x="${PX + PW / 2 - 55}" y="${PY + 20}" width="110" height="26" rx="13" fill="#0d0b0a"/>
  <rect x="${PX + 30}" y="${PY + 70}" width="96" height="36" rx="8" fill="#E5162D"/>
  <circle cx="${PX + 50}" cy="${PY + 88}" r="6" fill="#fff"/>
  <text x="${PX + 64}" y="${PY + 96}" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#fff">LIVE</text>
  <rect x="${PX + 14}" y="${PY + PH - 150}" width="${PW - 28}" height="136" fill="url(#fade)"/>
  <defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.75"/></linearGradient></defs>
  <rect x="${PX + 36}" y="${PY + PH - 70}" width="${PW - 72}" height="6" rx="3" fill="#ffffff" fill-opacity="0.3"/>
  <rect x="${PX + 36}" y="${PY + PH - 70}" width="${(PW - 72) * 0.72}" height="6" rx="3" fill="#E5162D"/>
</svg>`;
await save(
    sharp(bg).composite([
        { input: screen, left: PX + 14, top: PY + 14 },
        { input: Buffer.from(phoneSvg), left: 0, top: 0 },
    ]),
    "live-stream"
);

// Extra 43" screens: the same live feed on two screens on stands, over the venue
const SW = 470, SH = Math.round((SW * 9) / 16);
const feed = await sharp(stage).resize(SW - 20, SH - 20, { fit: "cover" }).toBuffer();
const screensSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${[110, 620]
      .map(
          (x) => `
  <rect x="${x}" y="230" width="${SW}" height="${SH}" rx="10" fill="none" stroke="#0d0b0a" stroke-width="14"/>
  <rect x="${x - 1}" y="229" width="${SW + 2}" height="${SH + 2}" rx="11" fill="none" stroke="${GOLD}" stroke-opacity="0.5" stroke-width="2"/>
  <rect x="${x + SW / 2 - 8}" y="${230 + SH + 6}" width="16" height="250" fill="#0d0b0a" stroke="${GOLD}" stroke-opacity="0.35"/>
  <path d="M${x + SW / 2 - 90},${230 + SH + 260} l180,0" stroke="#0d0b0a" stroke-width="16" stroke-linecap="round"/>
  <rect x="${x + 22}" y="252" width="70" height="26" rx="6" fill="#E5162D"/>
  <text x="${x + 34}" y="271" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="#fff">LIVE</text>`
      )
      .join("")}
</svg>`;
await save(
    sharp(bg).composite([
        { input: feed, left: 120, top: 240 },
        { input: feed, left: 630, top: 240 },
        { input: Buffer.from(screensSvg), left: 0, top: 0 },
    ]),
    "led-screens"
);
