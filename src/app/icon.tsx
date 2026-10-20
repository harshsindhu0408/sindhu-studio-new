import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Monogram used for the favicon, PWA icon and schema logo. Replace with the real logo when available. */
export default async function Icon() {
    const font = await loadGoogleFont("Playfair Display", 500, "S");
    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#14110F", borderRadius: 96 }}>
                <div style={{ display: "flex", fontFamily: font ? "Playfair" : undefined, fontSize: 380, color: "#D9AE5F", marginTop: -30, fontStyle: "italic" }}>S</div>
            </div>
        ),
        { ...size, fonts: font ? [{ name: "Playfair", data: font, weight: 500, style: "normal" }] : undefined }
    );
}
