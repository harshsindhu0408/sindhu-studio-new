import Link from "next/link";
import { ArrowRight, CalendarHeart, ListChecks, Sparkles, Users } from "lucide-react";
import { allMuhuratDates, monthNamesEn, monthNamesHi, weekdaysEn, weekdaysHi } from "@/data/muhurat";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

const copy = {
    en: {
        eyebrow: "Free planning tools",
        titleA: "Plan your shaadi",
        titleEm: "before",
        titleB: "you even call us",
        intro: "Two simple tools to sort out dates, functions and budget at home with your family. No sign-up, no sales call.",
        planTitle: "Shaadi Planner",
        planBody: "Add each function with its date and guest count. We check our bookings and suggest the package that covers everything for the lowest total.",
        planCta: "Plan my wedding",
        example: "Example plan",
        guests: "guests",
        suggestion: "Package suggested from your plan",
        muhuratTitle: "Muhurat Calendar 2026–27",
        muhuratBody: "Every shubh vivah date, month by month, with our availability on each one.",
        muhuratCta: "See all dates",
        next: "Next muhurat month",
        upcoming: "Coming up",
        datesLeft: "shubh dates ahead",
        legend: "Shubh vivah date",
    },
    hi: {
        eyebrow: "मुफ़्त प्लानिंग टूल",
        titleA: "हमें कॉल करने से",
        titleEm: "पहले",
        titleB: "ही अपनी शादी प्लान करें",
        intro: "घर बैठे परिवार के साथ तारीख, फंक्शन और बजट तय करने के लिए दो आसान टूल। न साइन-अप, न सेल्स कॉल।",
        planTitle: "शादी प्लानर",
        planBody: "हर फंक्शन उसकी तारीख और मेहमानों के साथ जोड़ें। हम अपनी बुकिंग चेक करके वो पैकेज बताते हैं जो सबसे कम कुल खर्च में सब कवर करे।",
        planCta: "मेरी शादी प्लान करें",
        example: "उदाहरण प्लान",
        guests: "मेहमान",
        suggestion: "आपके प्लान से पैकेज का सुझाव",
        muhuratTitle: "मुहूर्त कैलेंडर 2026–27",
        muhuratBody: "हर शुभ विवाह तिथि, महीने के हिसाब से, और हर तारीख पर हमारी उपलब्धता।",
        muhuratCta: "सभी तिथियां देखें",
        next: "अगला मुहूर्त वाला महीना",
        upcoming: "आने वाली तिथियां",
        datesLeft: "शुभ तिथियां बाकी",
        legend: "शुभ विवाह तिथि",
    },
};

/** Sample itinerary, placed around the next muhurat date so the preview always looks current. */
const sample = [
    { key: "haldi", offset: -2, guests: 80 },
    { key: "mehendi", offset: -1, guests: 150 },
    { key: "sangeet", offset: -1, guests: 250 },
    { key: "shaadi", offset: 0, guests: 400 },
    { key: "reception", offset: 1, guests: 300 },
] as const;

function nextMuhurat() {
    const today = new Date().toISOString().slice(0, 10);
    return allMuhuratDates.find((d) => d.iso >= today) ?? allMuhuratDates[0];
}

function PlannerPreview({ locale }: { locale: Locale }) {
    const c = copy[locale];
    const fns = getDictionary(locale).planner.functions;
    const [y, m, d] = nextMuhurat().iso.split("-").map(Number);
    const months = locale === "hi" ? monthNamesHi : monthNamesEn;
    const fmt = (offset: number) => {
        const date = new Date(y, m - 1, d + offset);
        return { day: date.getDate(), month: locale === "hi" ? months[date.getMonth()] : months[date.getMonth()].slice(0, 3) };
    };
    return (
        <div aria-hidden className="rounded-2xl border border-border bg-background p-4 md:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">{c.example}</p>
            <ol className="relative mt-4 space-y-2.5 before:absolute before:bottom-3 before:left-[1.4rem] before:top-3 before:w-px before:bg-border">
                {sample.map((s) => {
                    const { day, month } = fmt(s.offset);
                    const main = s.key === "shaadi";
                    return (
                        <li key={s.key} className="relative flex items-center gap-3">
                            <span
                                className={cn(
                                    "tabular relative z-10 flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border leading-none",
                                    main ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card"
                                )}
                            >
                                <span className="text-sm font-semibold">{day}</span>
                                <span className={cn("mt-0.5 text-[9px] uppercase", main ? "opacity-80" : "text-foreground-muted")}>{month}</span>
                            </span>
                            <span className={cn("flex-1 truncate text-sm", main && "font-semibold")}>{fns[s.key]}</span>
                            <span className="tabular inline-flex items-center gap-1 text-xs text-foreground-muted">
                                <Users className="h-3.5 w-3.5" /> {s.guests} <span className="hidden sm:inline">{c.guests}</span>
                            </span>
                        </li>
                    );
                })}
            </ol>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-accent/10 px-3 py-2.5 text-xs font-medium text-accent">
                <Sparkles className="h-4 w-4 shrink-0" /> {c.suggestion}
            </div>
        </div>
    );
}

function MuhuratPreview({ locale }: { locale: Locale }) {
    const c = copy[locale];
    const next = nextMuhurat();
    const [y, m] = next.iso.split("-").map(Number);
    const key = `${y}-${String(m).padStart(2, "0")}`;
    const dates = new Set(allMuhuratDates.filter((d) => d.iso.startsWith(key)).map((d) => Number(d.iso.slice(8))));
    const first = new Date(y, m - 1, 1).getDay();
    const days = new Date(y, m, 0).getDate();
    const weekdays = locale === "hi" ? weekdaysHi : weekdaysEn;
    const months = locale === "hi" ? monthNamesHi : monthNamesEn;
    const ahead = allMuhuratDates.filter((d) => d.iso >= next.iso);
    return (
        <div className="grid h-full gap-4 sm:grid-cols-[1.35fr_1fr]">
            <div className="rounded-2xl border border-border bg-background p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">{c.next}</p>
                <p className="mt-1 font-display text-xl">
                    {months[m - 1]} {y}
                </p>
                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px]" aria-hidden>
                    {weekdays.map((w) => (
                        <span key={w} className="pb-1 text-foreground-muted">
                            {locale === "hi" ? w : w.slice(0, 2)}
                        </span>
                    ))}
                    {Array.from({ length: first }).map((_, i) => (
                        <span key={`b${i}`} />
                    ))}
                    {Array.from({ length: days }).map((_, i) => (
                        <span
                            key={i}
                            className={cn(
                                "tabular flex h-7 items-center justify-center rounded-md",
                                dates.has(i + 1) ? "bg-accent font-semibold text-accent-foreground" : "text-foreground-muted"
                            )}
                        >
                            {i + 1}
                        </span>
                    ))}
                </div>
                <p className="mt-3 flex items-center gap-2 text-[11px] text-foreground-muted">
                    <span className="h-2.5 w-2.5 rounded-sm bg-accent" /> {c.legend}
                </p>
            </div>
            <div className="flex flex-col rounded-2xl border border-border bg-background p-4">
                <p className="font-display text-4xl leading-none text-accent">{ahead.length}</p>
                <p className="mt-1 text-xs text-foreground-muted">{c.datesLeft}</p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">{c.upcoming}</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                    {ahead.slice(0, 6).map((d) => {
                        const date = new Date(`${d.iso}T00:00:00`);
                        return (
                            <li key={d.iso} className="tabular flex [&:nth-child(n+5)]:max-sm:hidden items-center justify-between gap-2 border-b border-border/60 pb-1.5 last:border-0">
                                <span>
                                    {date.getDate()} {locale === "hi" ? months[date.getMonth()] : months[date.getMonth()].slice(0, 3)}
                                </span>
                                <span className="text-xs text-foreground-muted">{weekdays[date.getDay()]}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export function PlanTools({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    const L = (p: string) => localePath(locale, p);
    return (
        <section className="section-padding" aria-labelledby="tools-title">
            <div className="container-custom">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                        <h2 id="tools-title" className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">
                            {c.titleA} <span className="italic text-accent">{c.titleEm}</span> {c.titleB}
                        </h2>
                    </div>
                    <p className="max-w-md text-foreground-muted lg:justify-self-end">{c.intro}</p>
                </div>
                <div className="mt-12 grid gap-5 lg:grid-cols-2">
                    {[
                        { href: L("/plan"), icon: ListChecks, title: c.planTitle, body: c.planBody, cta: c.planCta, preview: <PlannerPreview locale={locale} /> },
                        { href: L("/vivah-muhurat-2027"), icon: CalendarHeart, title: c.muhuratTitle, body: c.muhuratBody, cta: c.muhuratCta, preview: <MuhuratPreview locale={locale} /> },
                    ].map(({ href, icon: Icon, title, body, cta, preview }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_60px_-30px_rgb(var(--shadow-color)/0.5)] md:p-8"
                        >
                            <span aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
                            <div className="relative flex items-start gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                                    <Icon className="h-6 w-6" aria-hidden />
                                </span>
                                <div>
                                    <h3 className="font-display text-2xl md:text-3xl">{title}</h3>
                                    <p className="mt-2 text-sm text-foreground-muted md:text-base">{body}</p>
                                </div>
                            </div>
                            <div className="relative mt-6 flex-1">{preview}</div>
                            <span className="relative mt-6 inline-flex items-center gap-2 font-medium text-accent">
                                {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
