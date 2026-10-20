import "server-only";
import path from "node:path";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { getMedia } from "@/data/media";

/** Fetch a Google Font subset containing only `text`, as TTF for Satori. Returns null if offline. */
export async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
    try {
        const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`;
        // An old user agent makes Google return TTF instead of WOFF2, which Satori can't read
        const css = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30" }, cache: "force-cache" }).then((r) => r.text());
        const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
        if (!src) return null;
        return await fetch(src, { cache: "force-cache" }).then((r) => r.arrayBuffer());
    } catch {
        return null;
    }
}

/** One of the studio's photos, resized and converted to JPEG (Satori can't decode WebP). */
export async function photoDataUri(mediaId: string, width: number, height: number, position: string = "centre") {
    const m = getMedia(mediaId);
    const file = await readFile(path.join(process.cwd(), "public", m.src));
    const jpg = await sharp(file).resize(width, height, { fit: "cover", position }).jpeg({ quality: 80 }).toBuffer();
    return `data:image/jpeg;base64,${jpg.toString("base64")}`;
}

/** Photo-heavy cards are huge as PNG; WhatsApp drops previews over ~300 KB, so serve JPEG. */
export async function toJpegResponse(image: Response, cacheControl = "public, max-age=86400") {
    const png = Buffer.from(await image.arrayBuffer());
    const jpg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    return new Response(new Uint8Array(jpg), { headers: { "Content-Type": "image/jpeg", "Cache-Control": cacheControl } });
}

export async function ogFonts(text: string) {
    const [display, sans, sansBold] = await Promise.all([
        loadGoogleFont("Playfair Display", 500, text),
        loadGoogleFont("Inter", 400, text),
        loadGoogleFont("Inter", 600, text),
    ]);
    const fonts: { name: string; data: ArrayBuffer; weight: 400 | 500 | 600; style: "normal" }[] = [];
    if (display) fonts.push({ name: "Playfair", data: display, weight: 500, style: "normal" });
    if (sans) fonts.push({ name: "Inter", data: sans, weight: 400, style: "normal" });
    if (sansBold) fonts.push({ name: "Inter", data: sansBold, weight: 600, style: "normal" });
    // Without a font that has the ₹ glyph, fall back to "Rs."
    const rupee = sans ? "₹" : "Rs. ";
    return { fonts, rupee };
}
