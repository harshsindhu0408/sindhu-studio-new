import Link from "next/link";
import { ArrowRight, CalendarHeart, ExternalLink } from "lucide-react";
import {
    muhuratMonths,
    muhuratSources,
    muhuratRetrieved,
    muhuratCount2027,
    allMuhuratDates,
    monthNamesEn,
    monthNamesHi,
    weekdaysEn,
    weekdaysHi,
    type MuhuratMonth,
} from "@/data/muhurat";
import { whatsappLink } from "@/data/business";
import { getAvailability, type DayStatus } from "@/lib/content";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

function todayISO() {
    // India time, so the "past" cutoff matches the visitor's day
    return new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
}

function formatLong(iso: string, locale: Locale) {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export async function MuhuratPage({ locale }: { locale: Locale }) {
    const t = getDictionary(locale).muhurat;
    const availability = await getAvailability();
    const today = todayISO();
    const upcoming = allMuhuratDates.filter((d) => d.iso >= today).slice(0, 6);
    const monthNames = locale === "hi" ? monthNamesHi : monthNamesEn;
    const L = (p: string) => localePath(locale, p);

    return (
        <div className="pb-24 pt-28 md:pt-36">
            <header className="container-custom max-w-4xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {t.eyebrow} <span lang="hi" className="font-hindi normal-case tracking-normal text-sindoor">· शुभ विवाह</span>
                </p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">{t.title}</h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">{t.intro}</p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm">
                    <CalendarHeart className="h-4 w-4 text-accent" aria-hidden />
                    <strong className="tabular">{muhuratCount2027}</strong> {t.count}
                </p>
            </header>

            {/* Upcoming dates */}
            {upcoming.length > 0 && (
                <section aria-labelledby="upcoming" className="container-custom mt-14">
                    <h2 id="upcoming" className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        {t.upcoming}
                    </h2>
                    <ul className="-mx-4 mt-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
                        {upcoming.map((d) => {
                            const date = new Date(`${d.iso}T00:00:00`);
                            const status = availability[d.iso];
                            return (
                                <li key={d.iso} className="w-36 shrink-0 snap-start md:w-auto">
                                    <Link
                                        href={`${L("/plan")}?date=${d.iso}`}
                                        className={cn(
                                            "block rounded-2xl border p-4 transition-colors hover:border-accent",
                                            status === "booked" ? "border-border opacity-60" : "border-accent/40 bg-card"
                                        )}
                                    >
                                        <span className="block text-xs uppercase tracking-wider text-foreground-muted">{monthNames[date.getMonth()]}</span>
                                        <span className="tabular block font-display text-4xl">{date.getDate()}</span>
                                        <span className="block text-sm text-foreground-muted">{(locale === "hi" ? weekdaysHi : weekdaysEn)[date.getDay()]}</span>
                                        <StatusText status={status} t={t} />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}

            {/* Legend + month jump */}
            <section className="container-custom mt-14">
                <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <span aria-hidden className="h-4 w-4 rounded-md bg-accent" /> {t.legendMuhurat}
                        </li>
                        <li className="flex items-center gap-2">
                            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sindoor" /> {t.legendAgreed}
                        </li>
                        <li className="flex items-center gap-2">
                            <span aria-hidden className="h-4 w-4 rounded-md border border-border bg-background-secondary line-through" /> {t.legendBooked}
                        </li>
                        <li className="flex items-center gap-2">
                            <span aria-hidden className="h-4 w-4 rounded-md ring-2 ring-marigold" /> {t.legendLimited}
                        </li>
                    </ul>
                    <nav aria-label={t.jump} className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0">
                        {muhuratMonths.map((m) => (
                            <a
                                key={m.key}
                                href={`#m-${m.key}`}
                                className={cn(
                                    "inline-flex min-h-9 shrink-0 items-center rounded-full border px-3 text-xs",
                                    m.dates.length ? "border-border hover:border-accent" : "border-transparent text-foreground-muted"
                                )}
                            >
                                {monthNames[m.month - 1].slice(0, locale === "hi" ? undefined : 3)} {String(m.year).slice(2)}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {muhuratMonths.map((m) => (
                        <MonthCard key={m.key} month={m} locale={locale} availability={availability} today={today} />
                    ))}
                </div>
            </section>

            <section className="container-custom mt-16 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-accent/40 bg-accent/[0.06] p-6 md:p-8">
                    <h2 className="font-display text-2xl md:text-3xl">{t.bookingTitle}</h2>
                    <p className="mt-3 text-foreground-muted">{t.bookingBody}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={L("/plan")} className="btn btn-primary">
                            {getDictionary(locale).nav.plan} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <Link href={L("/packages")} className="btn btn-outline">
                            {getDictionary(locale).nav.packages}
                        </Link>
                    </div>
                </div>
                <div id="sources" className="rounded-3xl border border-border bg-card p-6 md:p-8">
                    <h2 className="font-display text-2xl">{t.sourcesTitle}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{t.sourcesBody}</p>
                    <ul className="mt-4 space-y-2 text-sm">
                        {muhuratSources.map((s) => (
                            <li key={s.url}>
                                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent underline underline-offset-2">
                                    {s.name} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-xs text-foreground-muted">
                        {t.retrieved}: {muhuratRetrieved}
                    </p>
                </div>
            </section>
        </div>
    );
}

function StatusText({ status, t }: { status?: DayStatus; t: ReturnType<typeof getDictionary>["muhurat"] }) {
    if (status === "booked") return <span className="mt-2 block text-xs text-sindoor">{t.legendBooked}</span>;
    if (status === "limited") return <span className="mt-2 block text-xs text-marigold">{t.legendLimited}</span>;
    return null;
}

function MonthCard({ month, locale, availability, today }: { month: MuhuratMonth; locale: Locale; availability: Record<string, DayStatus>; today: string }) {
    const t = getDictionary(locale).muhurat;
    const monthNames = locale === "hi" ? monthNamesHi : monthNamesEn;
    const weekdays = locale === "hi" ? weekdaysHi : weekdaysEn;
    const first = new Date(month.year, month.month - 1, 1).getDay();
    const daysIn = new Date(month.year, month.month, 0).getDate();
    const byIso = new Map(month.dates.map((d) => [d.iso, d]));
    const L = (p: string) => localePath(locale, p);

    return (
        <article id={`m-${month.key}`} className="scroll-mt-28 rounded-3xl border border-border bg-card p-5" aria-labelledby={`h-${month.key}`}>
            <header className="flex items-baseline justify-between">
                <h3 id={`h-${month.key}`} className="font-display text-2xl">
                    {monthNames[month.month - 1]} <span className="tabular text-foreground-muted">{month.year}</span>
                </h3>
                <span className="text-sm text-foreground-muted">
                    {month.dates.length ? (
                        <>
                            <strong className="tabular text-foreground">{month.dates.length}</strong> {t.datesThisMonth}
                        </>
                    ) : null}
                </span>
            </header>

            {month.dates.length === 0 ? (
                <div className="mt-4 rounded-2xl bg-background-secondary p-4 text-sm text-foreground-muted">
                    <p className="font-medium text-foreground">{t.noDates}</p>
                    {month.note && <p className="mt-1">{month.note}</p>}
                </div>
            ) : (
                <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                    {weekdays.map((w) => (
                        <span key={w} aria-hidden className="pb-1 text-[11px] font-medium uppercase text-foreground-muted">
                            {w}
                        </span>
                    ))}
                    {Array.from({ length: first }).map((_, i) => (
                        <span key={`b${i}`} aria-hidden />
                    ))}
                    {Array.from({ length: daysIn }).map((_, i) => {
                        const day = i + 1;
                        const iso = `${month.key}-${String(day).padStart(2, "0")}`;
                        const m = byIso.get(iso);
                        const status = availability[iso];
                        const past = iso < today;
                        if (!m) {
                            return (
                                <span key={iso} aria-hidden className={cn("tabular flex aspect-square items-center justify-center rounded-lg text-sm text-foreground-muted", past && "opacity-40")}>
                                    {day}
                                </span>
                            );
                        }
                        const label = `${formatLong(iso, locale)}: ${t.legendMuhurat}${m.agreed ? `, ${t.legendAgreed}` : ""}${status === "booked" ? `, ${t.legendBooked}` : status === "limited" ? `, ${t.legendLimited}` : ""}`;
                        return (
                            <span key={iso}>
                                <Link
                                    href={status === "booked" ? whatsappLink(`${t.checkDate}: ${iso}`) : `${L("/plan")}?date=${iso}`}
                                    aria-label={label}
                                    title={label}
                                    className={cn(
                                        "tabular relative flex aspect-square items-center justify-center rounded-lg text-sm font-semibold transition-transform hover:scale-105",
                                        status === "booked"
                                            ? "border border-border bg-background-secondary text-foreground-muted line-through"
                                            : "bg-accent text-accent-foreground",
                                        status === "limited" && "ring-2 ring-marigold ring-offset-2 ring-offset-card",
                                        past && "pointer-events-none opacity-40"
                                    )}
                                >
                                    {day}
                                    {m.agreed && <span aria-hidden className="absolute bottom-1 h-1 w-1 rounded-full bg-sindoor" />}
                                </Link>
                            </span>
                        );
                    })}
                </div>
            )}
        </article>
    );
}
