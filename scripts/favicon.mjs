/**
 * Builds the favicon set from the brand monogram: a gold italic Playfair "S" inside a
 * lens ring on kajal black.
 *
 * Outputs:
 * - src/app/favicon.ico        16, 32, 48 px (simplified: no ring, so the S stays legible)
 * - src/app/icon.png           512 px, rounded, for browsers and Google results
 * - src/app/apple-icon.png     180 px, square (iOS rounds it)
 * - public/icon-192.png, public/icon-512.png, public/icon-maskable-512.png  for the web app manifest
 *
 * Usage: node scripts/favicon.mjs   (needs internet once, to fetch the font)
 */
import path from "node:path";
import { writeFile } from "node:fs/promises";
import sharp from "sharp";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const INK = "#14110F";
const GOLD = "#D9AE5F";
const GOLD_LIGHT = "#F0D196";
const GOLD_DEEP = "#A97A2C";

// Playfair Display Italic 600, subset to "S", as TTF (Satori can't read WOFF2)
const css = await fetch("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&text=S", {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30" },
}).then((r) => r.text());
const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
if (!fontUrl) throw new Error("Couldn't load Playfair Display from Google Fonts");
const font = await fetch(fontUrl).then((r) => r.arrayBuffer());

const h = (type, style, children) => ({ type, props: { style, children } });

/**
 * @param size   output px
 * @param radius corner radius as a fraction of size (0 = square)
 * @param ring   draw the lens ring
 * @param scale  glyph size as a fraction of size
 * @param safe   shrink the artwork into a safe zone (maskable icons)
 */
async function mark(size, { radius = 0.22, ring = true, scale = 0.62, safe = 1 } = {}) {
    const s = size;
    const c = s / 2;
    const r = (s / 2) * 0.8 * safe;
    const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">
      <defs>
        <radialGradient id="bg" cx="35%" cy="25%" r="85%"><stop offset="0" stop-color="#2A221B"/><stop offset="1" stop-color="${INK}"/></radialGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${GOLD_LIGHT}"/><stop offset="1" stop-color="${GOLD_DEEP}"/></linearGradient>
      </defs>
      <rect width="${s}" height="${s}" rx="${s * radius}" fill="url(#bg)"/>
      ${
          ring
              ? `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="url(#ring)" stroke-width="${s * 0.022}"/>
                 <circle cx="${c}" cy="${c}" r="${r - s * 0.045}" fill="none" stroke="${GOLD}" stroke-opacity="0.35" stroke-width="${s * 0.008}"/>
                 <circle cx="${c + r * Math.cos(-Math.PI / 4)}" cy="${c + r * Math.sin(-Math.PI / 4)}" r="${s * 0.035}" fill="${GOLD_LIGHT}"/>`
              : ""
      }
    </svg>`;
    const fontSize = s * scale * safe * 1.25;
    const res = new ImageResponse(
        h(
            "div",
            { width: s, height: s, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" },
            [
                { type: "img", props: { src: `data:image/svg+xml;base64,${Buffer.from(bg).toString("base64")}`, width: s, height: s, style: { position: "absolute", left: 0, top: 0 } } },
                h(
                    "div",
                    {
                        display: "flex",
                        fontFamily: "Playfair",
                        fontStyle: "italic",
                        fontSize,
                        lineHeight: 1,
                        marginTop: -fontSize * 0.12,
                        marginLeft: -fontSize * 0.04,
                        backgroundImage: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD} 55%, ${GOLD_DEEP})`,
                        backgroundClip: "text",
                        color: "transparent",
                    },
                    "S"
                ),
            ]
        ),
        { width: s, height: s, fonts: [{ name: "Playfair", data: font, weight: 600, style: "italic" }] }
    );
    return Buffer.from(await res.arrayBuffer());
}

const out = (p) => path.join(ROOT, p);

await sharp(await mark(512)).toFile(out("src/app/icon.png"));
await sharp(await mark(180, { radius: 0 })).toFile(out("src/app/apple-icon.png"));
await sharp(await mark(192)).toFile(out("public/icon-192.png"));
await sharp(await mark(512)).toFile(out("public/icon-512.png"));
// Maskable: full-bleed background, artwork inside the 80% safe zone
await sharp(await mark(512, { radius: 0, safe: 0.8 })).toFile(out("public/icon-maskable-512.png"));

// favicon.ico: PNG-compressed entries (supported by every current browser)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((n) => mark(n, { radius: 0.2, ring: n >= 48, scale: n >= 48 ? 0.62 : 0.85 })));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((n, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(n, e);
    header.writeUInt8(n, e + 1);
    header.writeUInt8(0, e + 2);
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(pngs[i].length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += pngs[i].length;
});
await writeFile(out("src/app/favicon.ico"), Buffer.concat([header, ...pngs]));

console.log("✓ favicon.ico, icon.png, apple-icon.png, icon-192/512, icon-maskable-512");
