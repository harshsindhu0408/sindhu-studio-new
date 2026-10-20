import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
    const font = await loadGoogleFont("Playfair Display", 500, "S");
    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#14110F" }}>
                <div style={{ display: "flex", fontFamily: font ? "Playfair" : undefined, fontSize: 130, color: "#D9AE5F", marginTop: -10, fontStyle: "italic" }}>S</div>
            </div>
        ),
        { ...size, fonts: font ? [{ name: "Playfair", data: font, weight: 500, style: "normal" }] : undefined }
    );
}
