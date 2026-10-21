"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getMedia } from "@/data/media";
import { localeFromPath, localePath } from "@/i18n";

const photo = getMedia("bride-peeking-red-dupatta-closeup");

const copy = {
    en: {
        label: "Error 404",
        title: "This page didn't make it into the album.",
        body: "It may have moved, or the link has a typo. These are worth a look instead:",
        links: [
            { href: "/portfolio", label: "Portfolio", note: "Brides, couples, rituals" },
            { href: "/weddings", label: "Wedding stories", note: "Full weddings, start to finish" },
            { href: "/packages", label: "Packages & prices", note: "Everything written down" },
            { href: "/contact", label: "Contact", note: "Check if your date is free" },
        ],
        home: "Back to the home page",
        caption: "Still looking…",
    },
    hi: {
        label: "त्रुटि 404",
        title: "यह पेज एल्बम में नहीं आ पाया।",
        body: "शायद यह कहीं और चला गया है, या लिंक में कोई गलती है। इसके बजाय ये देखिए:",
        links: [
            { href: "/portfolio", label: "पोर्टफोलियो", note: "दुल्हन, जोड़े, रस्में" },
            { href: "/weddings", label: "शादी की कहानियां", note: "पूरी शादी, शुरू से आखिर तक" },
            { href: "/packages", label: "पैकेज और कीमतें", note: "सब कुछ लिखा हुआ" },
            { href: "/contact", label: "संपर्क", note: "देखें आपकी तारीख खाली है या नहीं" },
        ],
        home: "होम पेज पर वापस जाएं",
        caption: "अभी भी ढूंढ रहे हैं…",
    },
};

const noSubscribe = () => () => {};

export function NotFoundView() {
    // The global 404 is prerendered without a real path, so hydrate with the server's
    // locale and then switch to the one in the address bar (e.g. a broken /hi/ link).
    const serverLocale = localeFromPath(usePathname());
    const locale = useSyncExternalStore(noSubscribe, () => localeFromPath(window.location.pathname), () => serverLocale);
    const c = copy[locale];

    return (
        <div className="pb-20 pt-28 md:pb-28 md:pt-36">
            <div className="container-custom grid items-center gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
                <div className="order-2 lg:order-1">
                    <p className="tabular text-sm text-foreground-muted">{c.label}</p>
                    <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.08] md:text-6xl">{c.title}</h1>
                    <p className="mt-6 max-w-md text-lg text-foreground-muted">{c.body}</p>

                    <ul className="mt-10 max-w-lg border-t border-border">
                        {c.links.map((l) => (
                            <li key={l.href} className="border-b border-border">
                                <Link href={localePath(locale, l.href)} className="group flex min-h-16 items-center justify-between gap-4 py-4">
                                    <span>
                                        <span className="block font-display text-xl transition-colors group-hover:text-accent md:text-2xl">{l.label}</span>
                                        <span className="block text-sm text-foreground-muted">{l.note}</span>
                                    </span>
                                    <ArrowRight className="h-5 w-5 shrink-0 text-foreground-muted transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link href={localePath(locale, "/")} className="mt-8 inline-flex min-h-10 items-center text-sm text-accent underline underline-offset-4">
                        {c.home}
                    </Link>
                </div>

                {/* A print, slightly askew, with the big 404 sitting behind it */}
                <div className="relative order-1 mx-auto w-full max-w-[18rem] sm:max-w-xs lg:order-2 lg:max-w-sm">
                    <span aria-hidden className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-display text-[9rem] leading-none text-accent/15 md:-top-16 md:text-[12rem]">
                        404
                    </span>
                    <figure className="relative rotate-[-3deg] bg-card p-3 pb-12 shadow-[0_30px_60px_-30px_rgb(var(--shadow-color)/0.55)] transition-transform duration-500 hover:rotate-0">
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 1024px) 70vw, 24rem" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" />
                        </div>
                        <figcaption className="absolute inset-x-0 bottom-3 text-center font-display text-lg italic text-foreground-muted">{c.caption}</figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
}
