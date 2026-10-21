import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getWeddings } from "@/lib/content";
import { business } from "@/data/business";
import { localePath, type Locale } from "@/i18n";

export const weddingsCopy = {
    en: {
        eyebrow: "Real weddings",
        title: "Stories from real families",
        description: `Real weddings photographed by ${business.name}: the functions, the venue and the moments, shared with the couples' permission.`,
        emptyTitle: "The first stories are being written.",
        emptyBody: "Meanwhile, see our portfolio from real Haryana weddings.",
        emptyCta: "See the portfolio",
        back: "Real weddings",
        chose: (couple: string, pkg: string) => `${couple} chose the ${pkg} package.`,
        compare: "Compare packages",
        storyNote: "",
        functions: {} as Record<string, string>,
    },
    hi: {
        eyebrow: "असली शादियां",
        title: "असली परिवारों की कहानियां",
        description: `${business.name} द्वारा खींची गई असली शादियां: फंक्शन, वेन्यू और पल, कपल की अनुमति से शेयर किए गए।`,
        emptyTitle: "पहली कहानियां लिखी जा रही हैं।",
        emptyBody: "तब तक हरियाणा की असली शादियों से हमारा पोर्टफोलियो देखें।",
        emptyCta: "पोर्टफोलियो देखें",
        back: "असली शादियां",
        chose: (couple: string, pkg: string) => `${couple} ने ${pkg} पैकेज चुना।`,
        compare: "पैकेज की तुलना करें",
        storyNote: "कहानी अंग्रेज़ी में है।",
        functions: {
            Roka: "रोका",
            "Ring ceremony": "रिंग सेरेमनी",
            Haldi: "हल्दी",
            Mehendi: "मेहंदी",
            Sangeet: "संगीत",
            Shaadi: "शादी",
            Reception: "रिसेप्शन",
            "Kuan Poojan": "कुआं पूजन",
            "Pre-wedding": "प्री-वेडिंग",
        } as Record<string, string>,
    },
};

export async function WeddingsIndex({ locale = "en" }: { locale?: Locale }) {
    const c = weddingsCopy[locale];
    const L = (p: string) => localePath(locale, p);
    const weddings = await getWeddings();
    return (
        <div className="pb-24 pt-28 md:pt-36">
            <header className="container-custom max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">{c.title}</h1>
                <p className="mt-4 text-lg text-foreground-muted">{c.description}</p>
            </header>
            {weddings.length === 0 ? (
                <div className="container-custom mt-12 max-w-3xl rounded-3xl border border-border bg-card p-8">
                    <p className="font-display text-2xl">{c.emptyTitle}</p>
                    <p className="mt-2 text-foreground-muted">{c.emptyBody}</p>
                    <Link href={L("/portfolio")} className="btn btn-primary mt-6">
                        {c.emptyCta} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            ) : (
                <ul className="container-custom mt-12 grid gap-6 md:grid-cols-2">
                    {weddings.map((w) => (
                        <li key={w.slug}>
                            <Link href={L(`/weddings/${w.slug}`)} className="group block overflow-hidden rounded-3xl bg-background-secondary">
                                <div className="relative aspect-[4/3]">
                                    <Image src={w.cover} alt={w.coverAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                        <p className="text-xs uppercase tracking-wider text-white/75">
                                            {w.city}
                                            {w.venue ? ` · ${w.venue}` : ""}
                                        </p>
                                        <h2 className="mt-1 font-display text-3xl">{w.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
