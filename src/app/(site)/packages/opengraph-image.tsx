import { ImageResponse } from "next/og";
import { business } from "@/data/business";
import { packages } from "@/data/packages";
import { ogFonts } from "@/lib/og";

export const alt = `${business.name} wedding packages and prices`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** WhatsApp preview for /packages: the prices themselves are the hook. */
export default async function Image() {
    const rows = packages.map((p) => ({ name: p.name, price: `₹${p.price.toLocaleString("en-IN")}`, popular: p.popular }));
    const text = `Wedding packagesCompare all 6 side by sideSindhu Studio${business.address.locality}${rows.map((r) => r.name + r.price).join("")}Most chosen`;
    const { fonts } = await ogFonts(text);

    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", background: "#14110F", color: "#F5EFE6", padding: 64, fontFamily: "Inter" }}>
                <div style={{ display: "flex", flexDirection: "column", width: 470, justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#D9AE5F" }}>
                            {`${business.name} · ${business.address.locality}`}
                        </div>
                        <div style={{ fontFamily: "Playfair", fontSize: 76, lineHeight: 1.05, marginTop: 24 }}>Wedding packages</div>
                    </div>
                    <div style={{ fontSize: 30, color: "#D8CFC2" }}>Compare all 6 side by side</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 14, justifyContent: "center" }}>
                    {rows.map((r) => (
                        <div
                            key={r.name}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "14px 24px",
                                borderRadius: 16,
                                border: r.popular ? "2px solid #D9AE5F" : "2px solid #3A322B",
                                background: r.popular ? "rgba(217,174,95,0.12)" : "transparent",
                                fontSize: 32,
                            }}
                        >
                            <span style={{ fontFamily: "Playfair" }}>{r.name}</span>
                            <span style={{ fontWeight: 600 }}>{r.price}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size, fonts: fonts.length ? fonts : undefined }
    );
}
