/**
 * Builds the LED wall and live stream images in public/images/addons/ from the
 * studio's own wedding photos (public/images/work/*.webp).
 *
 * - led-wall-scene.webp: a night venue with an 8×12 ft LED wall showing the varmala,
 *   guests watching in the foreground.
 * - live-stream.webp: the same wedding playing as a live stream on a laptop-sized
 *   player and a phone, with messages from family abroad.
 *
 * Usage: node scripts/venue-tech-art.mjs
 */
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const WORK = path.join(ROOT, "public/images/work");
const OUT = path.join(ROOT, "public/images/addons");
const W = 1600;
const H = 1000;
const GOLD = "#D9AE5F";
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

const photo = (name) => path.join(WORK, `${name}.webp`);
const save = (img, name) => img.webp({ quality: 82 }).toFile(path.join(OUT, `${name}.webp`)).then(() => console.log(`✓ ${name}.webp`));
const svg = (inner, w = W, h = H) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${inner}</svg>`);

/* ---------- LED wall ---------- */
{
    const SW = 960, SH = 640, SX = (W - SW) / 2, SY = 96;
    const bg = await sharp(photo("varmala-couple-night-venue")).resize(W, H, { fit: "cover" }).blur(30).modulate({ brightness: 0.32, saturation: 0.9 }).toBuffer();
    const content = await sharp(photo("varmala-stage-sparklers-fog")).resize(SW, SH, { fit: "cover", position: "centre" }).modulate({ brightness: 1.06, saturation: 1.12 }).toBuffer();

    // Light spilling from the wall onto the venue
    const PAD = 320;
    const halo = await sharp(content)
        .modulate({ brightness: 0.6 })
        .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .blur(110)
        .png()
        .toBuffer();
    // sharp extracts before other operations, so crop to the canvas in a second pass
    const glow = await sharp(halo).extract({ left: PAD - SX, top: PAD - SY, width: W, height: H }).png().toBuffer();

    // LED texture: fine pixel grid + cabinet seams (6 × 4 cabinets of 160 px)
    const pixels = svg(
        `<defs><pattern id="p" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#000" fill-opacity="0.16"/><rect width="3" height="3" fill="#fff" fill-opacity="0.04"/></pattern></defs>
         <rect width="${SW}" height="${SH}" fill="url(#p)"/>
         ${Array.from({ length: 5 }, (_, i) => `<rect x="${(i + 1) * 160 - 1}" y="0" width="2" height="${SH}" fill="#000" fill-opacity="0.28"/>`).join("")}
         ${Array.from({ length: 3 }, (_, i) => `<rect x="0" y="${(i + 1) * 160 - 1}" width="${SW}" height="2" fill="#000" fill-opacity="0.28"/>`).join("")}
         <rect x="28" y="26" width="104" height="40" rx="8" fill="#E5162D"/><circle cx="50" cy="46" r="7" fill="#fff"/>
         <text x="66" y="55" font-family="${FONT}" font-size="24" font-weight="700" fill="#fff">LIVE</text>`,
        SW,
        SH
    );
    const screen = await sharp(content).composite([{ input: pixels }]).toBuffer();

    // Truss frame around the wall, legs to the floor
    const truss = (x, y, w, h) => {
        const n = Math.round(w / 40);
        const zig = Array.from({ length: n }, (_, i) => `M${x + i * (w / n)},${y + h} L${x + (i + 0.5) * (w / n)},${y} L${x + (i + 1) * (w / n)},${y + h}`).join(" ");
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#2a2522" stroke-width="5"/><path d="${zig}" fill="none" stroke="#2a2522" stroke-width="3"/>`;
    };
    const vtruss = (x, y, w, h) => {
        const n = Math.round(h / 40);
        const zig = Array.from({ length: n }, (_, i) => `M${x},${y + i * (h / n)} L${x + w},${y + (i + 0.5) * (h / n)} L${x},${y + (i + 1) * (h / n)}`).join(" ");
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#2a2522" stroke-width="5"/><path d="${zig}" fill="none" stroke="#2a2522" stroke-width="3"/>`;
    };
    const frame = svg(`
        ${truss(SX - 70, SY - 50, SW + 140, 34)}
        ${vtruss(SX - 70, SY - 16, 34, H - SY)}
        ${vtruss(SX + SW + 36, SY - 16, 34, H - SY)}
        <rect x="${SX - 8}" y="${SY - 8}" width="${SW + 16}" height="${SH + 16}" rx="4" fill="none" stroke="#0b0908" stroke-width="12"/>
        <rect x="${SX - 14}" y="${SY - 14}" width="${SW + 28}" height="${SH + 28}" rx="6" fill="none" stroke="${GOLD}" stroke-opacity="0.18" stroke-width="2"/>
        ${Array.from({ length: 7 }, (_, i) => `<circle cx="${SX - 30 + i * ((SW + 60) / 6)}" cy="${SY - 70}" r="7" fill="#FFE2A8" fill-opacity="0.9"/><circle cx="${SX - 30 + i * ((SW + 60) / 6)}" cy="${SY - 70}" r="22" fill="#FFE2A8" fill-opacity="0.12"/>`).join("")}
    `);

    // Guests in the foreground, rim-lit by the wall; a few phones raised to record
    let seed = 7;
    const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const person = (cx, base, s, phone) => {
        const head = 34 * s, sh = 92 * s;
        const top = base - sh - head * 1.6;
        const body = `M${cx - sh},${base + 40} C${cx - sh},${base - sh * 0.55} ${cx - sh * 0.55},${base - sh * 0.95} ${cx},${base - sh * 0.95} C${cx + sh * 0.55},${base - sh * 0.95} ${cx + sh},${base - sh * 0.55} ${cx + sh},${base + 40} Z`;
        const ph = phone
            ? `<rect x="${cx + sh * 0.35}" y="${top - 40 * s}" width="${30 * s}" height="${52 * s}" rx="${5 * s}" fill="#0b0908" stroke="#3b332d" stroke-width="2"/>
               <rect x="${cx + sh * 0.35 + 3 * s}" y="${top - 37 * s}" width="${24 * s}" height="${46 * s}" rx="${3 * s}" fill="#F6B9C8" fill-opacity="0.85"/>
               <path d="M${cx + sh * 0.5},${base - sh * 0.8} L${cx + sh * 0.48},${top + 12 * s}" stroke="#0b0908" stroke-width="${16 * s}" stroke-linecap="round"/>`
            : "";
        return `<g><path d="${body}" fill="#0b0908"/><ellipse cx="${cx}" cy="${top + head}" rx="${head * 0.92}" ry="${head * 1.08}" fill="#0b0908"/>
${ph}</g>`;
    };
    const rows = [
        { base: 905, s: 0.82, n: 11 },
        { base: 1010, s: 1.12, n: 7 },
    ];
    const crowd = svg(
        `<defs><linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.7"/></linearGradient></defs>
         <rect y="${H - 300}" width="${W}" height="300" fill="url(#v)"/>` +
            rows
                .map(({ base, s, n }, r) =>
                    Array.from({ length: n }, (_, i) => {
                        const cx = (i + 0.5) * (W / n) + (rand() - 0.5) * 70 + (r ? 60 : 0);
                        return person(cx, base + (rand() - 0.5) * 20, s * (0.9 + rand() * 0.2), (r === 0 && i % 4 === 1) || (r === 1 && i === 4));
                    }).join("")
                )
                .join("")
    );

    const crowdSoft = await sharp(crowd).blur(5).png().toBuffer();

    await save(
        sharp(bg).composite([
            { input: glow, blend: "screen" },
            { input: screen, left: SX, top: SY },
            { input: frame },
            { input: crowdSoft },
        ]),
        "led-wall-scene"
    );
}

/* ---------- Live stream ---------- */
{
    const bg = await sharp(photo("bride-night-venue-fairy-lights")).resize(W, H, { fit: "cover" }).blur(26).modulate({ brightness: 0.3 }).toBuffer();

    // Main player
    const PX = 110, PY = 120, PW = 1060, PH = 600, R = 22;
    const feed = await sharp(photo("varmala-couple-night-venue"))
        .resize(PW, PH, { fit: "cover", position: "centre" })
        .modulate({ brightness: 1.04, saturation: 1.08 })
        .composite([{ input: svg(`<rect width="${PW}" height="${PH}" rx="${R}" fill="#fff"/>`, PW, PH), blend: "dest-in" }])
        .png()
        .toBuffer();
    const playerChrome = svg(`
        <defs>
          <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.8"/></linearGradient>
          <linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0.55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
        </defs>
        <rect x="${PX}" y="${PY}" width="${PW}" height="110" rx="${R}" fill="url(#t)"/>
        <rect x="${PX}" y="${PY + PH - 150}" width="${PW}" height="150" rx="${R}" fill="url(#b)"/>
        <rect x="${PX + 28}" y="${PY + 26}" width="98" height="38" rx="8" fill="#E5162D"/><circle cx="${PX + 49}" cy="${PY + 45}" r="7" fill="#fff"/>
        <text x="${PX + 64}" y="${PY + 54}" font-family="${FONT}" font-size="22" font-weight="700" fill="#fff">LIVE</text>
        <text x="${PX + 144}" y="${PY + 53}" font-family="${FONT}" font-size="22" font-weight="500" fill="#fff" fill-opacity="0.92">Varmala · Rohtak, Haryana</text>
        <rect x="${PX + 30}" y="${PY + PH - 62}" width="${PW - 60}" height="6" rx="3" fill="#fff" fill-opacity="0.3"/>
        <rect x="${PX + 30}" y="${PY + PH - 62}" width="${PW - 60}" height="6" rx="3" fill="#E5162D"/>
        <circle cx="${PX + PW - 30}" cy="${PY + PH - 59}" r="9" fill="#E5162D"/>
        <path d="M${PX + 34},${PY + PH - 40} l0,26 l20,-13 z" fill="#fff"/>
        <path d="M${PX + 82},${PY + PH - 33} l8,0 l10,-8 l0,24 l-10,-8 l-8,0 z" fill="#fff"/>
        <path d="M${PX + 108},${PY + PH - 34} q8,7 0,14 M${PX + 114},${PY + PH - 39} q14,12 0,24" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
        <text x="${PX + 140}" y="${PY + PH - 19}" font-family="${FONT}" font-size="18" font-weight="600" fill="#fff">● LIVE</text>
        <rect x="${PX - 1}" y="${PY - 1}" width="${PW + 2}" height="${PH + 2}" rx="${R + 1}" fill="none" stroke="${GOLD}" stroke-opacity="0.35" stroke-width="2"/>
    `);
    const shadow = await sharp(svg(`<rect x="${PX + 10}" y="${PY + 40}" width="${PW - 20}" height="${PH}" rx="${R}" fill="#000" fill-opacity="0.7"/>`)).blur(40).png().toBuffer();

    // Phone, overlapping the player, playing the same stream in portrait
    const FX = 1120, FY = 330, FW = 330, FH = 640, FR = 46;
    const phoneFeed = await sharp(photo("varmala-couple-night-venue"))
        .extract({ left: 640, top: 0, width: 820, height: 1597 })
        .resize(FW - 24, FH - 24, { fit: "cover", position: "top" })
        .composite([{ input: svg(`<rect width="${FW - 24}" height="${FH - 24}" rx="${FR - 10}" fill="#fff"/>`, FW - 24, FH - 24), blend: "dest-in" }])
        .png()
        .toBuffer();
    const phoneShadow = await sharp(svg(`<rect x="${FX + 10}" y="${FY + 30}" width="${FW}" height="${FH}" rx="${FR}" fill="#000" fill-opacity="0.75"/>`)).blur(36).png().toBuffer();
    const phoneChrome = svg(`
        <defs><linearGradient id="pb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.85"/></linearGradient></defs>
        <rect x="${FX + 6}" y="${FY + 6}" width="${FW - 12}" height="${FH - 12}" rx="${FR - 4}" fill="none" stroke="#0b0908" stroke-width="14"/>
        <rect x="${FX}" y="${FY}" width="${FW}" height="${FH}" rx="${FR}" fill="none" stroke="#3a322c" stroke-width="3"/>
        <rect x="${FX + FW / 2 - 52}" y="${FY + 22}" width="104" height="28" rx="14" fill="#0b0908"/>
        <rect x="${FX + 30}" y="${FY + 70}" width="78" height="30" rx="7" fill="#E5162D"/><circle cx="${FX + 46}" cy="${FY + 85}" r="5.5" fill="#fff"/>
        <text x="${FX + 57}" y="${FY + 92}" font-family="${FONT}" font-size="17" font-weight="700" fill="#fff">LIVE</text>
        <rect x="${FX + 12}" y="${FY + FH - 230}" width="${FW - 24}" height="218" rx="${FR - 10}" fill="url(#pb)"/>
        ${[
            ["Nani ji · Toronto", "Bahut sundar lag rahe ho!"],
            ["Rohit · London", "Congratulations!"],
            ["Priya · Melbourne", "Watching from here, so happy"],
        ]
            .map(
                ([who, msg], i) =>
                    `<text x="${FX + 32}" y="${FY + FH - 172 + i * 50}" font-family="${FONT}" font-size="15" font-weight="700" fill="${GOLD}">${who}</text>
                     <text x="${FX + 32}" y="${FY + FH - 152 + i * 50}" font-family="${FONT}" font-size="16" fill="#fff" fill-opacity="0.92">${msg}</text>`
            )
            .join("")}
    `);

    await save(
        sharp(bg).composite([
            { input: shadow },
            { input: feed, left: PX, top: PY },
            { input: playerChrome },
            { input: phoneShadow },
            { input: phoneFeed, left: FX + 12, top: FY + 12 },
            { input: phoneChrome },
        ]),
        "live-stream"
    );
}
