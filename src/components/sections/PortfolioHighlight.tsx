import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getMedia, mediaCategories } from "@/data/media";
import type { Locale } from "@/i18n";

const phCopy = {
    en: { eyebrow: "Our work", title: "Real weddings,", titleEm: "real families", intro: "Every photo on this site is ours. No stock images.", all: "View all work" },
    hi: { eyebrow: "हमारा काम", title: "असली शादियां,", titleEm: "असली परिवार", intro: "इस साइट की हर फोटो हमारी खींची हुई है। कोई स्टॉक फोटो नहीं।", all: "सारा काम देखें" },
};
const catHi: Record<string, string> = { bridal: "दुल्हन", couples: "कपल", ceremonies: "रस्में", "haldi-mehendi": "हल्दी और मेहंदी", portraits: "पोर्ट्रेट" };

// Hand-picked for variety: a ceremony, bridal portraits, couples and a mehendi moment
const picks = [
    "bride-peeking-red-dupatta-closeup",
    "sindoor-daan-ceremony-moment",
    "couple-varmala-garlands-chandelier",
    "mehendi-bride-hindi-sign",
    "bride-window-light-studio-portrait",
    "couple-twirl-outdoor-pre-wedding",
].map(getMedia);

const label = (id: string) => mediaCategories.find((c) => c.id === id)?.label ?? "";

export function PortfolioHighlight({ locale = "en" }: { locale?: Locale }) {
    const pc = phCopy[locale];
    return (
        <section className="section-padding">
            <div className="container-custom">
                <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">{pc.eyebrow}</p>
                        <h2 className="font-display text-4xl font-medium md:text-5xl">
                            {pc.title} <span className="italic text-accent">{pc.titleEm}</span>
                        </h2>
                        <p className="mt-3 max-w-xl text-foreground-muted">{pc.intro}</p>
                    </div>
                    <Link href="/portfolio" className="group flex min-h-11 items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent">
                        {pc.all}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                </div>

                <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
                    {picks.map((m) => (
                        <li key={m.id}>
                            <Link href={`/portfolio/${m.category}`} className="group relative block h-full overflow-hidden rounded-xl bg-background-secondary">
                                <div className="relative aspect-[4/5] w-full">
                                    <Image
                                        src={m.src}
                                        alt={m.alt}
                                        fill
                                        sizes="(max-width: 1024px) 50vw, 33vw"
                                        placeholder="blur"
                                        blurDataURL={m.blurDataURL}
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-white">{locale === "hi" ? catHi[m.category] : label(m.category)}</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
