import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMedia } from "@/data/media";
import { paymentTerms } from "@/data/business";
import { localePath, type Locale } from "@/i18n";

type Step = { when: string; title: string; body: string; image: { media?: string; src?: string; alt: string } };

const copy: Record<Locale, { eyebrow: string; title: string; titleEm: string; intro: string; cta: string; steps: Step[] }> = {
    en: {
        eyebrow: "From booking to delivery",
        title: "Your wedding,",
        titleEm: "step by step",
        intro: "No surprises: here's exactly what happens after you say yes, and when you receive each part.",
        cta: "Start with the planner",
        steps: [
            { when: "Today", title: "Plan & quote", body: "Add your functions in the planner, or build your quote. See the exact price before you talk to anyone.", image: { media: "couple-hands-bangles-detail", alt: "" } },
            { when: "When you're ready", title: "Lock your date", body: `Pay ${paymentTerms.bookingPercent}% of the total and your date is yours. We go through your functions, timings and family list together.`, image: { media: "bride-mirror-reflection-black-and-white", alt: "" } },
            { when: "Your wedding days", title: "We cover every ritual", body: "The traditional team covers every ritual and relative, while candid, cinematic and drone teams (as booked) work around them.", image: { media: "sindoor-daan-ceremony-moment", alt: "" } },
            { when: "1–6 weeks", title: "Teaser, then your gallery", body: "Teaser and highlights in 1–2 weeks, ready for WhatsApp. Your full gallery in 4–6 weeks, to pick photos for your album.", image: { src: "/films/teaser-poster.webp", alt: "" } },
            { when: "8–12 weeks after selection", title: "Album & film in your hands", body: "Your printed album, frames and cinematic film, delivered with everything on a 64 GB pendrive.", image: { media: "bride-seated-blue-sofa-portrait", alt: "" } },
        ],
    },
    hi: {
        eyebrow: "बुकिंग से डिलीवरी तक",
        title: "आपकी शादी,",
        titleEm: "कदम दर कदम",
        intro: "कोई सरप्राइज़ नहीं: 'हां' कहने के बाद क्या-क्या होता है और हर चीज़ कब मिलती है, सब साफ़-साफ़।",
        cta: "प्लानर से शुरू करें",
        steps: [
            { when: "आज", title: "योजना और कोटेशन", body: "प्लानर में अपने कार्यक्रम जोड़ें या कोटेशन बनाएं। किसी से बात करने से पहले ही सही दाम देखें।", image: { media: "couple-hands-bangles-detail", alt: "" } },
            { when: "जब आप तैयार हों", title: "तारीख पक्की करें", body: `कुल राशि का ${paymentTerms.bookingPercent}% दें और तारीख आपकी। फिर हम साथ बैठकर कार्यक्रम, समय और परिवार की लिस्ट तय करते हैं।`, image: { media: "bride-mirror-reflection-black-and-white", alt: "" } },
            { when: "शादी के दिन", title: "हर रस्म कवर", body: "पारंपरिक टीम हर रस्म और हर रिश्तेदार कवर करती है, और कैंडिड, सिनेमैटिक और ड्रोन टीम (बुकिंग के हिसाब से) साथ काम करती है।", image: { media: "sindoor-daan-ceremony-moment", alt: "" } },
            { when: "1–6 हफ़्ते", title: "पहले टीज़र, फिर गैलरी", body: "1–2 हफ़्ते में टीज़र और हाइलाइट्स, WhatsApp के लिए तैयार। 4–6 हफ़्ते में पूरी गैलरी, एल्बम की फोटो चुनने के लिए।", image: { src: "/films/teaser-poster.webp", alt: "" } },
            { when: "फोटो चुनने के 8–12 हफ़्ते बाद", title: "एल्बम और फ़िल्म आपके हाथ में", body: "प्रिंटेड एल्बम, फ्रेम और सिनेमैटिक फ़िल्म, साथ में सब कुछ 64 GB पेनड्राइव में।", image: { media: "bride-seated-blue-sofa-portrait", alt: "" } },
        ],
    },
};

export function Journey({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    return (
        <section className="section-padding overflow-x-clip bg-background-secondary" aria-labelledby="journey-title">
            <div className="container-custom">
                <div className="max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                    <h2 id="journey-title" className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">
                        {c.title} <span className="italic text-accent">{c.titleEm}</span>
                    </h2>
                    <p className="mt-4 text-foreground-muted">{c.intro}</p>
                </div>

                <ol className="relative mt-14 grid gap-10 md:grid-cols-5 md:gap-5">
                    {/* the gold thread connecting the steps */}
                    <span aria-hidden className="absolute left-[27px] top-0 h-full w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-0 md:top-[27px] md:h-px md:w-full md:bg-gradient-to-r" />
                    {c.steps.map((s, i) => {
                        const m = s.image.media ? getMedia(s.image.media) : null;
                        return (
                            <li key={s.title} className="relative grid grid-cols-[56px_1fr] gap-5 md:block">
                                <span className="tabular relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-background font-display text-xl text-accent">
                                    {i + 1}
                                </span>
                                <div className="md:mt-6">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-background">
                                        <Image src={m?.src ?? s.image.src!} alt={s.image.alt} fill sizes="(max-width: 768px) 80vw, 20vw" placeholder={m ? "blur" : "empty"} blurDataURL={m?.blurDataURL} className="object-cover" />
                                    </div>
                                    <p className="mt-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-foreground">{s.when}</p>
                                    <h3 className="mt-2 font-display text-xl">{s.title}</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{s.body}</p>
                                </div>
                            </li>
                        );
                    })}
                </ol>

                <Link href={localePath(locale, "/plan")} className="btn btn-primary mt-12">
                    {c.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
            </div>
        </section>
    );
}
