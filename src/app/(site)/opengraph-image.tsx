import { ImageResponse } from "next/og";
import { business } from "@/data/business";
import { lowestPrice } from "@/data/packages";
import { ogFonts, photoDataUri, toJpegResponse } from "@/lib/og";

export const alt = `${business.name}: wedding photography in ${business.address.locality}, Haryana`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

/** Default link preview for WhatsApp, Instagram and Facebook shares. */
export default async function Image() {
    const tagline = "Wedding photography & films";
    const sub = `${business.address.locality}, Haryana · since ${business.foundingYear} · packages from ₹${lowestPrice.toLocaleString("en-IN")}`;
    const [{ fonts }, photo] = await Promise.all([ogFonts(`Sindhu Studio${tagline}${sub}`), photoDataUri("varmala-stage-sparklers-fog", 1200, 630)]);

    return toJpegResponse(new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Inter" }}>
                <img src={photo} width={1200} height={630} alt="" style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", background: "linear-gradient(0deg, rgba(20,17,15,0.96) 0%, rgba(20,17,15,0.75) 35%, rgba(20,17,15,0.15) 70%, rgba(20,17,15,0) 100%)" }} />
                <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 64, color: "#F5EFE6" }}>
                    <div style={{ display: "flex", fontFamily: "Playfair", fontSize: 84 }}>
                        Sindhu <span style={{ color: "#D9AE5F", marginLeft: 18 }}>Studio</span>
                    </div>
                    <div style={{ fontSize: 40, marginTop: 8 }}>{tagline}</div>
                    <div style={{ fontSize: 26, marginTop: 18, color: "#D8CFC2" }}>{sub}</div>
                </div>
            </div>
        ),
        { ...size, fonts: fonts.length ? fonts : undefined }
    ));
}
