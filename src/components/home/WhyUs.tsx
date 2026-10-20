import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeIndianRupee, Camera, Home, ShieldCheck } from "lucide-react";
import { getMedia } from "@/data/media";
import { business } from "@/data/business";
import { localePath, type Locale } from "@/i18n";

const photos = [getMedia("bride-golden-circle-light-portrait"), getMedia("couple-outdoor-pre-wedding-trees"), getMedia("mehendi-bride-sunglasses-candid")];

const copy = {
    en: {
        eyebrow: "Why families choose us",
        title: "The Sindhu",
        titleEm: "difference",
        cta: "Compare packages",
        points: [
            { icon: BadgeIndianRupee, title: "Every price, upfront", body: "Six packages compared line by line, add-ons priced to the rupee, and a quote you can build yourself. No 'call for price'." },
            { icon: Camera, title: "One team for everything", body: "Traditional, candid, cinematic, drone, LED screens and live streaming, planned together so nothing falls through the gaps." },
            { icon: Home, title: `In Rohtak since ${business.foundingYear}`, body: "Visit our studio on Delhi Road, hold real albums in your hands and meet the people who'll be at your wedding." },
            { icon: ShieldCheck, title: "Your photos stay yours", body: "We never post your photos without permission, and children's photos never without a parent's written consent." },
        ],
    },
    hi: {
        eyebrow: "परिवार हमें क्यों चुनते हैं",
        title: "Sindhu Studio",
        titleEm: "का फ़र्क",
        cta: "पैकेज की तुलना करें",
        points: [
            { icon: BadgeIndianRupee, title: "हर दाम पहले से साफ़", body: "छह पैकेज की लाइन-दर-लाइन तुलना, हर ऐड-ऑन का सही दाम, और कोटेशन जो आप खुद बना सकते हैं। 'दाम के लिए कॉल करें' नहीं।" },
            { icon: Camera, title: "हर काम एक ही टीम से", body: "पारंपरिक, कैंडिड, सिनेमैटिक, ड्रोन, LED स्क्रीन और लाइव स्ट्रीमिंग, सब एक साथ प्लान, ताकि कुछ छूटे नहीं।" },
            { icon: Home, title: `${business.foundingYear} से रोहतक में`, body: "दिल्ली रोड पर हमारे स्टूडियो आएं, असली एल्बम हाथ में लेकर देखें और उन लोगों से मिलें जो आपकी शादी में होंगे।" },
            { icon: ShieldCheck, title: "आपकी फोटो, आपकी", body: "आपकी अनुमति के बिना हम आपकी फोटो कभी पोस्ट नहीं करते, और बच्चों की फोटो माता-पिता की लिखित सहमति के बिना कभी नहीं।" },
        ],
    },
};

export function WhyUs({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    return (
        <section className="section-padding overflow-x-clip" aria-labelledby="why-title">
            <div className="container-custom grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                {/* Layered photo collage */}
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
                    <div className="absolute left-0 top-0 h-[78%] w-[68%] overflow-hidden rounded-3xl shadow-2xl">
                        <Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 1024px) 70vw, 35vw" placeholder="blur" blurDataURL={photos[0].blurDataURL} className="object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 h-[58%] w-[54%] overflow-hidden rounded-3xl border-4 border-background shadow-2xl">
                        <Image src={photos[1].src} alt={photos[1].alt} fill sizes="(max-width: 1024px) 55vw, 28vw" placeholder="blur" blurDataURL={photos[1].blurDataURL} className="object-cover" />
                    </div>
                    <div className="absolute bottom-[8%] left-[6%] h-[26%] w-[30%] rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-background shadow-xl">
                        <Image src={photos[2].src} alt={photos[2].alt} fill sizes="20vw" placeholder="blur" blurDataURL={photos[2].blurDataURL} className="object-cover" />
                    </div>
                    <span aria-hidden className="absolute -right-3 top-[10%] rounded-full bg-[#B3192E] px-4 py-2 font-display text-lg text-white shadow-lg">
                        {business.foundingYear}
                    </span>
                </div>

                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                    <h2 id="why-title" className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
                        {c.title} <span className="italic text-accent">{c.titleEm}</span>
                    </h2>
                    <ul className="mt-10 space-y-7">
                        {c.points.map((p) => (
                            <li key={p.title} className="flex gap-5">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
                                    <p.icon className="h-5 w-5" aria-hidden />
                                </span>
                                <div>
                                    <h3 className="font-display text-xl md:text-2xl">{p.title}</h3>
                                    <p className="mt-1 leading-relaxed text-foreground-muted">{p.body}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Link href={localePath(locale, "/packages")} className="btn btn-primary mt-10">
                        {c.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            </div>
        </section>
    );
}
