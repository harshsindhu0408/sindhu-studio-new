import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { localizeService } from "@/data/services.hi";
import { getMedia } from "@/data/media";
import { localePath, type Locale } from "@/i18n";

const copy = {
    en: { eyebrow: "Services", title: "Everything your wedding needs, from one team", intro: "Photography, films, drone, LED screens and live streaming, with every price shown upfront." },
    hi: { eyebrow: "सेवाएं", title: "आपकी शादी की हर ज़रूरत, एक ही टीम से", intro: "फोटोग्राफी, फ़िल्म, ड्रोन, LED स्क्रीन और लाइव स्ट्रीमिंग, हर दाम पहले से साफ़।" },
};

export function ServicesIndex({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    const hi = locale === "hi";
    return (
        <div className="pb-24 pt-28 md:pt-36">
            <header className="container-custom max-w-3xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">{c.title}</h1>
                <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground-muted">{c.intro}</p>
            </header>
            <ul className="container-custom mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((base) => {
                    const s = localizeService(base, locale);
                    const m = s.image.media ? getMedia(s.image.media) : null;
                    return (
                        <li key={s.slug}>
                            <Link href={localePath(locale, `/services/${s.slug}`)} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-background-secondary">
                                <Image src={m?.src ?? s.image.src!} alt={s.image.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                    {!hi && (
                                        <p lang="hi" className="font-hindi text-sm text-[#F2A93B]">
                                            {s.nameHi}
                                        </p>
                                    )}
                                    <h2 className="mt-1 font-display text-2xl">{s.name}</h2>
                                    <p className="mt-1 text-sm text-white/80">{s.tagline}</p>
                                    <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
