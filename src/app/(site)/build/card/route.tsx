import { ImageResponse } from "next/og";
import { business, paymentTerms, SITE_URL } from "@/data/business";
import { parseQuote, quoteRef, summarizeQuote } from "@/lib/quote";
import { ogFonts, photoDataUri, toJpegResponse } from "@/lib/og";

export const runtime = "nodejs";

/** Family Share Card: 1080×1350, sized for WhatsApp and Instagram. */
export async function GET(req: Request) {
    const sp = new URL(req.url).searchParams;
    const quote = parseQuote({ p: sp.get("p"), a: sp.get("a") });
    const s = summarizeQuote(quote);
    const date = sp.get("d") && /^\d{4}-\d{2}-\d{2}$/.test(sp.get("d")!) ? new Date(sp.get("d")!) : null;

    const lines = [
        ...(s.pkg ? [{ label: `${s.pkg.name} package`, value: s.pkg.price }] : []),
        ...s.lines.map((l) => ({ label: `${l.addOn.name}${l.label ? ` × ${l.label}` : ""}`, value: l.price })),
    ];
    const dateText = date ? date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";
    const allText = `${business.name}Our wedding photography quote${lines.map((l) => l.label).join("")}Total${dateText}₹0123456789,·+×RefBook your date withsindhustudio.com/build${quoteRef(quote)}% valid days`;

    const [{ fonts, rupee }, photo] = await Promise.all([ogFonts(allText), photoDataUri("varmala-couple-night-venue", 1080, 640)]);
    const inr = (n: number) => `${rupee}${n.toLocaleString("en-IN")}`;

    return toJpegResponse(new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#14110F", color: "#F5EFE6", fontFamily: "Inter" }}>
                <div style={{ position: "relative", display: "flex", height: 640 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo} width={1080} height={640} alt="" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 640, display: "flex", background: "linear-gradient(180deg, rgba(20,17,15,0.7) 0%, rgba(20,17,15,0) 22%, rgba(20,17,15,0) 60%, #14110F 100%)" }} />
                    <div style={{ position: "absolute", left: 64, top: 52, display: "flex", fontFamily: "Playfair", fontSize: 40, color: "#F5EFE6" }}>
                        Sindhu <span style={{ color: "#D9AE5F", marginLeft: 10 }}>Studio</span>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "8px 64px 56px", flex: 1 }}>
                    <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#D9AE5F" }}>Our wedding photography quote</div>
                    {dateText && <div style={{ fontFamily: "Playfair", fontSize: 44, marginTop: 10 }}>{dateText}</div>}

                    <div style={{ display: "flex", flexDirection: "column", marginTop: 28, gap: 14 }}>
                        {lines.slice(0, 7).map((l) => (
                            <div key={l.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#D8CFC2" }}>
                                <span>{l.label}</span>
                                <span>{inr(l.value)}</span>
                            </div>
                        ))}
                        {lines.length > 7 && <div style={{ fontSize: 26, color: "#B5A999" }}>{`+ ${lines.length - 7} more`}</div>}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "auto", paddingTop: 28, borderTop: "2px solid #3A322B" }}>
                        <span style={{ fontSize: 34 }}>Total</span>
                        <span style={{ fontSize: 76, fontWeight: 600, color: "#F5EFE6" }}>{inr(s.total)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 24, color: "#B5A999" }}>
                        <span>{`Book your date with ${inr(s.bookingAmount)} (${paymentTerms.bookingPercent}%)`}</span>
                        <span>{`Ref ${quoteRef(quote)} · valid ${paymentTerms.quoteValidityDays} days`}</span>
                    </div>
                    <div style={{ marginTop: 18, fontSize: 26, color: "#D9AE5F" }}>{`${SITE_URL.replace("https://", "")}/build`}</div>
                </div>
            </div>
        ),
        { width: 1080, height: 1350, fonts: fonts.length ? fonts : undefined }
    ));
}
