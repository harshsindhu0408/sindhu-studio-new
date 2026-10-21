import Link from "next/link";
import Image from "next/image";
import { getJournalPosts } from "@/lib/content";
import { business } from "@/data/business";
import { localePath, type Locale } from "@/i18n";

export const journalCopy = {
    en: {
        eyebrow: "Journal",
        title: "Plan smarter, with straight answers",
        description: `Honest guides from ${business.name}, ${business.address.locality}: wedding photography costs, muhurat dates, pre-wedding locations, what to ask your photographer, and more.`,
        empty: "New articles are on the way.",
        back: "Journal",
        ctaTitle: "See your exact price in a minute",
        cta: "Build my quote",
        dateLocale: "en-IN",
        englishOnly: "",
    },
    hi: {
        eyebrow: "जर्नल",
        title: "सीधे जवाबों के साथ, समझदारी से प्लान करें",
        description: `${business.name}, रोहतक की ईमानदार गाइड: शादी फोटोग्राफी का खर्च, मुहूर्त की तारीखें, प्री-वेडिंग लोकेशन, फोटोग्राफर से क्या पूछें, और बहुत कुछ।`,
        empty: "नए लेख जल्द आ रहे हैं।",
        back: "जर्नल",
        ctaTitle: "एक मिनट में अपनी सही रकम देखें",
        cta: "अपना कोटेशन बनाएं",
        dateLocale: "hi-IN",
        englishOnly: "यह लेख अभी सिर्फ़ अंग्रेज़ी में उपलब्ध है।",
    },
};

export async function JournalIndex({ locale = "en" }: { locale?: Locale }) {
    const c = journalCopy[locale];
    const posts = await getJournalPosts(locale);
    return (
        <div className="pb-24 pt-28 md:pt-36">
            <header className="container-custom max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">{c.title}</h1>
                <p className="mt-4 text-lg text-foreground-muted">{c.description}</p>
            </header>
            {posts.length === 0 ? (
                <p className="container-custom mt-12 text-foreground-muted">{c.empty}</p>
            ) : (
                <ul className="container-custom mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((p) => (
                        <li key={p.slug}>
                            <Link href={localePath(locale, `/journal/${p.slug}`)} className="group block h-full overflow-hidden rounded-3xl border border-border bg-card">
                                {p.cover && (
                                    <div className="relative aspect-[16/10]">
                                        <Image src={p.cover} alt={p.coverAlt || p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <p className="text-xs uppercase tracking-wider text-foreground-muted">
                                        {p.date && new Date(p.date).toLocaleDateString(c.dateLocale, { day: "numeric", month: "long", year: "numeric" })}
                                    </p>
                                    <h2 className="mt-2 font-display text-2xl group-hover:text-accent">{p.title}</h2>
                                    {p.excerpt && <p className="mt-2 text-sm text-foreground-muted">{p.excerpt}</p>}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
