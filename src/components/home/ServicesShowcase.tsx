import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { getService } from "@/data/services";
import { getMedia } from "@/data/media";
import { getAddOn, addOnFromPrice } from "@/data/addons";
import { lowestPrice } from "@/data/packages";
import { formatINR } from "@/lib/quote";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

const copy = {
    en: {
        eyebrow: "Our services",
        title: "Everything your wedding needs,",
        titleEm: "from one team",
        intro: "Photography, films, drone, LED screens and live streaming, planned together, so nothing falls between two vendors.",
        all: "All services",
        from: "from",
        included: "in every package",
    },
    hi: {
        eyebrow: "हमारी सेवाएं",
        title: "शादी की हर ज़रूरत,",
        titleEm: "एक ही टीम से",
        intro: "फोटोग्राफी, फ़िल्म, ड्रोन, LED स्क्रीन और लाइव स्ट्रीमिंग, सब एक साथ प्लान, ताकि दो वेंडरों के बीच कुछ छूटे नहीं।",
        all: "सभी सेवाएं",
        from: "से शुरू",
        included: "हर पैकेज में",
    },
};

type Tile = { slug: string; className: string; price?: number; video?: boolean };

const tiles: Tile[] = [
    { slug: "wedding-photography", className: "md:col-span-2 md:row-span-2", price: lowestPrice },
    { slug: "pre-wedding-shoot", className: "", price: addOnFromPrice(getAddOn("pre-wedding")) },
    { slug: "haldi-mehendi-photography", className: "" },
    { slug: "cinematic-wedding-films", className: "", price: addOnFromPrice(getAddOn("cinematic")), video: true },
    { slug: "drone-wedding-photography", className: "", price: addOnFromPrice(getAddOn("drone")) },
    { slug: "led-screen-wall-rental", className: "md:col-span-2", price: addOnFromPrice(getAddOn("led-43")) },
    { slug: "wedding-live-streaming", className: "md:col-span-2", price: addOnFromPrice(getAddOn("live-stream")) },
];

export function ServicesShowcase({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    const hi = locale === "hi";

    return (
        <section className="section-padding" aria-labelledby="services-title">
            <div className="container-custom">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                        <h2 id="services-title" className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">
                            {c.title} <span className="italic text-accent">{c.titleEm}</span>
                        </h2>
                        <p className="mt-4 text-foreground-muted">{c.intro}</p>
                    </div>
                    <Link href="/services" className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-accent">
                        {c.all} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                </div>

                <ul className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4">
                    {tiles.map((tile, i) => {
                        const s = getService(tile.slug)!;
                        const m = s.image.media ? getMedia(s.image.media) : null;
                        return (
                            <li key={s.slug} className={cn("col-span-2 md:col-span-1", i === 0 && "row-span-2", tile.className)}>
                                <Link href={`/services/${s.slug}`} className="group relative block h-full overflow-hidden rounded-3xl bg-background-secondary">
                                    <Image
                                        src={m?.src ?? s.image.src!}
                                        alt={s.image.alt}
                                        fill
                                        sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                                        placeholder={m ? "blur" : "empty"}
                                        blurDataURL={m?.blurDataURL}
                                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/0" />
                                    {tile.video && (
                                        <span aria-hidden className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                                            <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                                        </span>
                                    )}
                                    <ArrowUpRight
                                        aria-hidden
                                        className="absolute right-5 top-5 h-5 w-5 text-white/70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                                        {!hi && (
                                            <p lang="hi" className="font-hindi text-sm text-[#F2A93B]">
                                                {s.nameHi}
                                            </p>
                                        )}
                                        <h3 className={cn("font-display leading-tight text-white", i === 0 ? "text-3xl md:text-5xl" : "text-2xl")}>{hi ? s.nameHi : s.name}</h3>
                                        {i === 0 && <p className="mt-2 max-w-md text-sm text-white/80 md:text-base">{s.tagline}</p>}
                                        <p className="mt-3 inline-flex rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs backdrop-blur-sm">
                                            {tile.price ? (
                                                <>
                                                    <span className="tabular">{formatINR(tile.price)}</span>&nbsp;{c.from}
                                                </>
                                            ) : (
                                                c.included
                                            )}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
