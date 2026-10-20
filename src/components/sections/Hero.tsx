"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { getImageProps } from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getMedia } from "@/data/media";
import { business } from "@/data/business";
import { lowestPrice } from "@/data/packages";
import { localePath, type Locale } from "@/i18n";

const heroCopy = {
    en: {
        eyebrow: (city: string, year: number) => `Wedding photography · ${city} · since ${year}`,
        h1a: "Photos your family will keep for",
        h1em: "generations",
        sub: (price: string) => `Candid photography, cinematic films, drone and LED walls for Haryana weddings. Packages from ₹${price}, with every price shown upfront.`,
        cta: "Build my quote",
        work: "See our work",
        trust: (years: number) => [`${years}+ years in Rohtak`, "6 packages, compared side by side", "Quote on WhatsApp in a minute"],
        scroll: "Scroll",
        scrollLabel: "Scroll to explore",
    },
    hi: {
        eyebrow: (_city: string, year: number) => `शादी फोटोग्राफी · रोहतक · ${year} से`,
        h1a: "ऐसी तस्वीरें, जिन्हें आपकी",
        h1em: "पीढ़ियां संभालेंगी",
        sub: (price: string) => `हरियाणा की शादियों के लिए कैंडिड फोटोग्राफी, सिनेमैटिक फ़िल्म, ड्रोन और LED वॉल। ₹${price} से शुरू पैकेज, हर दाम पहले से साफ़।`,
        cta: "अपना कोटेशन बनाएं",
        work: "हमारा काम देखें",
        trust: (years: number) => [`रोहतक में ${years}+ साल`, "6 पैकेज, आमने-सामने तुलना", "एक मिनट में WhatsApp पर कोटेशन"],
        scroll: "नीचे देखें",
        scrollLabel: "नीचे स्क्रॉल करें",
    },
};

const desktop = getMedia("varmala-stage-sparklers-fog");
const mobile = getMedia("bride-entry-sparklers-red-lehenga");

/** Art-directed hero: landscape photo on desktop, portrait on phones. Only one is downloaded. */
function HeroPicture() {
    const common = { alt: desktop.alt, priority: true, quality: 72, sizes: "100vw" } as const;
    const {
        props: { srcSet: desktopSet },
    } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height });
    const {
        props: { srcSet: mobileSet, ...rest },
    } = getImageProps({ ...common, alt: mobile.alt, src: mobile.src, width: mobile.width, height: mobile.height });

    return (
        <picture>
            <source media="(min-width: 768px)" srcSet={desktopSet} />
            <source media="(max-width: 767px)" srcSet={mobileSet} />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- art-directed <picture>; alt comes from getImageProps */}
            <img {...rest} className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
        </picture>
    );
}

export function Hero({ locale = "en" }: { locale?: Locale }) {
    const hc = heroCopy[locale];
    const containerRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);


    return (
        <section ref={containerRef} className="relative flex min-h-[100svh] items-end overflow-hidden pb-28 md:items-center md:pb-0">
            <motion.div className="absolute inset-0 z-0" style={{ y }}>
                <HeroPicture />
                {/* Legibility scrims */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/55 to-[#14110F]/20 md:bg-gradient-to-r md:from-[#14110F]/90 md:via-[#14110F]/45 md:to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
            </motion.div>

            {/* Always light text: it sits on a photo in both themes */}
            <motion.div className="container-custom relative z-10 text-[#F5EFE6]" style={{ opacity }}>
                <div className="max-w-2xl">
                    <p className="hero-in flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8C785]" style={{ animationDelay: "0.1s" }}>
                        <span lang="hi" className="font-hindi text-base normal-case tracking-normal text-[#F2A93B]">
                            शुभ विवाह
                        </span>
                        <span aria-hidden className="h-px w-8 bg-[#E8C785]/60" />
                        {hc.eyebrow(business.address.locality, business.foundingYear)}
                    </p>

                    <h1 className="hero-rise mt-6 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]" style={{ animationDelay: "0.25s" }}>
                        {hc.h1a} <span className="italic text-[#E8C785]">{hc.h1em}</span>
                    </h1>

                    <p className="hero-in mt-6 max-w-xl text-base leading-relaxed text-[#F5EFE6]/85 md:text-lg" style={{ animationDelay: "0.45s" }}>
                        {hc.sub(lowestPrice.toLocaleString("en-IN"))}
                    </p>

                    <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.6s" }}>
                        <Link href={localePath(locale, "/build")} className="btn btn-primary">
                            {hc.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <Link href="/portfolio" className="btn border border-[#F5EFE6]/40 text-[#F5EFE6] hover:border-[#E8C785] hover:text-[#E8C785]">
                            {hc.work}
                        </Link>
                    </div>

                    <ul className="hero-in mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#F5EFE6]/75" style={{ animationDelay: "0.75s" }}>
                        {hc.trust(new Date().getFullYear() - business.foundingYear).map((x) => (
                            <li key={x}>{x}</li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            <a
                href="#after-hero"
                className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#F5EFE6]/70 transition-colors hover:text-[#E8C785] md:flex"
                aria-label={hc.scrollLabel}
            >
                <span className="text-xs uppercase tracking-widest">{hc.scroll}</span>
                <ChevronDown className="h-5 w-5 motion-safe:animate-bounce" aria-hidden />
            </a>
        </section>
    );
}
