import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Gallery } from "./Gallery";
import { media, mediaCategories, type MediaCategory, type MediaItem } from "@/data/media";
import { localePath, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

const copy = {
    en: {
        eyebrow: "Portfolio",
        all: "All",
        nav: "Portfolio categories",
        photos: "photos",
        ctaTitle: "Want your wedding to look like this?",
        ctaBody: "See exactly what each package includes and build your quote in a minute.",
        build: "Build my quote",
        compare: "Compare packages",
    },
    hi: {
        eyebrow: "पोर्टफोलियो",
        all: "सभी",
        nav: "पोर्टफोलियो की श्रेणियां",
        photos: "फोटो",
        ctaTitle: "क्या आप भी अपनी शादी ऐसी चाहते हैं?",
        ctaBody: "देखें हर पैकेज में क्या-क्या है और एक मिनट में अपना कोटेशन बनाएं।",
        build: "अपना कोटेशन बनाएं",
        compare: "पैकेज की तुलना करें",
    },
};

export function PortfolioView({ active, items, title, intro, locale = "en" }: { active: MediaCategory | null; items: MediaItem[]; title: string; intro: string; locale?: Locale }) {
    const c = copy[locale];
    const L = (p: string) => localePath(locale, p);
    return (
        <div className="min-h-screen pb-20 pt-28 md:pt-36">
            <header className="container-custom mb-10 text-center">
                <div className="mx-auto max-w-2xl">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                    <h1 className="font-display text-4xl font-medium tracking-tight md:text-6xl">{title}</h1>
                    <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{intro}</p>
                </div>
            </header>

            <nav aria-label={c.nav} className="container-custom mb-10">
                <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:flex-wrap md:justify-center md:px-0">
                    <li>
                        <Link
                            href={L("/portfolio")}
                            aria-current={active === null ? "page" : undefined}
                            className={cn(
                                "inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-5 text-sm transition-colors",
                                active === null ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"
                            )}
                        >
                            {c.all} <span className="tabular ml-1.5">{media.length}</span>
                        </Link>
                    </li>
                    {mediaCategories.map((cat) => {
                        const count = media.filter((m) => m.category === cat.id).length;
                        return (
                            <li key={cat.id}>
                                <Link
                                    href={L(`/portfolio/${cat.id}`)}
                                    aria-current={active === cat.id ? "page" : undefined}
                                    className={cn(
                                        "inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-5 text-sm transition-colors",
                                        active === cat.id ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"
                                    )}
                                >
                                    {locale === "hi" ? cat.labelHi : cat.label} <span className="tabular ml-1.5">{count}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <section className="container-custom" aria-label={`${title}: ${c.photos}`}>
                <Gallery items={items} locale={locale} />
            </section>

            <section className="mt-24 border-t border-border/40 py-20 text-center">
                <div className="container-custom">
                    <h2 className="mb-4 font-display text-4xl md:text-5xl">{c.ctaTitle}</h2>
                    <p className="mx-auto mb-8 max-w-xl text-foreground-muted">{c.ctaBody}</p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href={L("/build")} className="btn btn-primary">
                            {c.build} <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <Link href={L("/packages")} className="btn btn-outline">
                            {c.compare}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
