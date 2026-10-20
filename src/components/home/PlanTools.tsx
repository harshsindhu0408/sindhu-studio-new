import Link from "next/link";
import { ArrowRight, CalendarHeart, ListChecks } from "lucide-react";
import { allMuhuratDates, monthNamesEn, monthNamesHi, weekdaysEn, weekdaysHi } from "@/data/muhurat";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

const copy = {
    en: {
        eyebrow: "Plan it like a pro",
        title: "Two tools no other studio gives you",
        planTitle: "Shaadi Planner",
        planBody: "Add roka, haldi, mehendi, sangeet and shaadi with dates and guests. We check our bookings and suggest the package that covers it all for the lowest total.",
        planCta: "Plan my wedding",
        muhuratTitle: "Muhurat calendar 2026–27",
        muhuratBody: "Every shubh vivah date, month by month, with our availability on each one.",
        muhuratCta: "See all dates",
        next: "Next muhurat month",
    },
    hi: {
        eyebrow: "स्मार्ट तरीके से प्लान करें",
        title: "दो टूल, जो कोई और स्टूडियो नहीं देता",
        planTitle: "शादी प्लानर",
        planBody: "रोका, हल्दी, मेहंदी, संगीत और शादी, तारीख और मेहमानों के साथ जोड़ें। हम अपनी बुकिंग चेक करके वो पैकेज बताते हैं जो सबसे कम कुल खर्च में सब कवर करे।",
        planCta: "मेरी शादी प्लान करें",
        muhuratTitle: "मुहूर्त कैलेंडर 2026–27",
        muhuratBody: "हर शुभ विवाह तिथि, महीने के हिसाब से, और हर तारीख पर हमारी उपलब्धता।",
        muhuratCta: "सभी तिथियां देखें",
        next: "अगला मुहूर्त वाला महीना",
    },
};

function MiniMonth({ locale }: { locale: Locale }) {
    const today = new Date().toISOString().slice(0, 10);
    const nextDate = allMuhuratDates.find((d) => d.iso >= today) ?? allMuhuratDates[0];
    const [y, m] = nextDate.iso.split("-").map(Number);
    const key = `${y}-${String(m).padStart(2, "0")}`;
    const dates = new Set(allMuhuratDates.filter((d) => d.iso.startsWith(key)).map((d) => Number(d.iso.slice(8))));
    const first = new Date(y, m - 1, 1).getDay();
    const days = new Date(y, m, 0).getDate();
    const weekdays = locale === "hi" ? weekdaysHi : weekdaysEn;
    return (
        <div className="max-w-sm rounded-2xl border border-border bg-background p-4">
            <p className="text-xs uppercase tracking-wider text-foreground-muted">{copy[locale].next}</p>
            <p className="font-display text-xl">
                {(locale === "hi" ? monthNamesHi : monthNamesEn)[m - 1]} {y}
            </p>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px]" aria-hidden>
                {weekdays.map((w) => (
                    <span key={w} className="text-foreground-muted">
                        {w.slice(0, 2)}
                    </span>
                ))}
                {Array.from({ length: first }).map((_, i) => (
                    <span key={`b${i}`} />
                ))}
                {Array.from({ length: days }).map((_, i) => (
                    <span key={i} className={cn("tabular flex aspect-square items-center justify-center rounded-md", dates.has(i + 1) ? "bg-accent font-semibold text-accent-foreground" : "text-foreground-muted")}>
                        {i + 1}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function PlanTools({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    const fns = getDictionary(locale).planner.functions;
    const L = (p: string) => localePath(locale, p);
    return (
        <section className="section-padding" aria-labelledby="tools-title">
            <div className="container-custom">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                <h2 id="tools-title" className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight md:text-5xl">
                    {c.title}
                </h2>
                <div className="mt-12 grid gap-5 lg:grid-cols-2">
                    <Link href={L("/plan")} className="group flex flex-col rounded-3xl border border-border bg-card p-6 transition-colors hover:border-accent md:p-8">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                            <ListChecks className="h-6 w-6" aria-hidden />
                        </span>
                        <h3 className="mt-5 font-display text-3xl">{c.planTitle}</h3>
                        <p className="mt-2 text-foreground-muted">{c.planBody}</p>
                        <div aria-hidden className="mt-6 flex flex-wrap gap-2">
                            {(["roka", "haldi", "mehendi", "sangeet", "shaadi", "reception"] as const).map((k, i) => (
                                <span key={k} className={cn("rounded-full border px-3 py-1.5 text-sm", i === 4 ? "border-accent bg-accent text-accent-foreground" : "border-border")}>
                                    {fns[k]}
                                </span>
                            ))}
                        </div>
                        <span className="mt-auto inline-flex items-center gap-2 pt-8 font-medium text-accent">
                            {c.planCta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                        </span>
                    </Link>
                    <Link href={L("/vivah-muhurat-2027")} className="group flex flex-col rounded-3xl border border-border bg-card p-6 transition-colors hover:border-accent md:p-8">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sindoor/10 text-sindoor">
                            <CalendarHeart className="h-6 w-6" aria-hidden />
                        </span>
                        <h3 className="mt-5 font-display text-3xl">{c.muhuratTitle}</h3>
                        <p className="mt-2 text-foreground-muted">{c.muhuratBody}</p>
                        <div className="mt-6">
                            <MiniMonth locale={locale} />
                        </div>
                        <span className="mt-auto inline-flex items-center gap-2 pt-8 font-medium text-accent">
                            {c.muhuratCta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
