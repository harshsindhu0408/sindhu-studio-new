"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { cancellationTiers } from "@/data/business";
import { packages } from "@/data/packages";
import { formatINR } from "@/lib/quote";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n";

const copy = {
    en: {
        title: "What would cancelling cost me?",
        intro: "Enter your event date and booking total. Nothing is sent anywhere: this runs on your phone.",
        date: "Event date",
        total: "Booking total (₹)",
        past: "That date has already passed.",
        away: (n: number) => (
            <>
                Your event is <strong className="tabular text-foreground">{n}</strong> day{n === 1 ? "" : "s"} away:{" "}
            </>
        ),
        ifToday: "If you cancel today:",
        ofTotal: "of the total",
        canMove: "✓ You can move this booking to a new date instead of cancelling.",
        cantMove: "Moving to a new date is at our discretion at this stage. Ask us.",
    },
    hi: {
        title: "कैंसिल करने पर मुझे कितना देना होगा?",
        intro: "अपने कार्यक्रम की तारीख और बुकिंग की कुल रकम डालें। कुछ भी कहीं नहीं भेजा जाता: यह आपके फ़ोन पर ही चलता है।",
        date: "कार्यक्रम की तारीख",
        total: "बुकिंग की कुल रकम (₹)",
        past: "यह तारीख निकल चुकी है।",
        away: (n: number) => (
            <>
                आपका कार्यक्रम <strong className="tabular text-foreground">{n}</strong> दिन दूर है:{" "}
            </>
        ),
        ifToday: "अगर आज कैंसिल करें:",
        ofTotal: "कुल रकम का",
        canMove: "✓ कैंसिल करने के बजाय आप यह बुकिंग नई तारीख पर ले जा सकते हैं।",
        cantMove: "इस समय नई तारीख पर ले जाना हमारे विवेक पर है। हमसे पूछें।",
    },
};

const DAY = 24 * 60 * 60 * 1000;

export function CancellationCalculator({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    const hi = locale === "hi";
    const [date, setDate] = useState("");
    const [total, setTotal] = useState(String(packages.find((p) => p.popular)?.price ?? packages[0].price));

    const result = useMemo(() => {
        if (!date) return null;
        const event = new Date(`${date}T00:00:00`);
        const today = new Date(new Date().toDateString());
        const days = Math.round((event.getTime() - today.getTime()) / DAY);
        if (Number.isNaN(days)) return null;
        const amount = Math.max(0, Number(total) || 0);
        const tier = cancellationTiers.find((t) => days >= t.minDays) ?? cancellationTiers[cancellationTiers.length - 1];
        return { days, tier, charge: Math.round((amount * tier.chargePercent) / 100) };
    }, [date, total]);

    return (
        <section aria-labelledby="calc-title" className="rounded-3xl border border-accent/40 bg-card p-6 md:p-8 print:hidden">
            <h2 id="calc-title" className="flex items-center gap-2 font-display text-2xl">
                <Calculator className="h-5 w-5 text-accent" aria-hidden /> {c.title}
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">{c.intro}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                    <span className="text-foreground-muted">{c.date}</span>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-foreground-muted">{c.total}</span>
                    <input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        step={1000}
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        className="tabular mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
                    />
                </label>
            </div>

            <div aria-live="polite" className="mt-6">
                {result &&
                    (result.days < 0 ? (
                        <p className="rounded-xl bg-background-secondary p-4 text-sm">{c.past}</p>
                    ) : (
                        <div className="rounded-2xl bg-background-secondary p-5">
                            <p className="text-sm text-foreground-muted">
                                {c.away(result.days)}
                                <span className="text-foreground">{hi ? result.tier.labelHi : result.tier.label.toLowerCase()}</span>.
                            </p>
                            <p className="mt-3 text-lg">
                                {c.ifToday} <strong className="tabular">{formatINR(result.charge)}</strong>{" "}
                                <span className="text-sm text-foreground-muted">({hi ? `${c.ofTotal} ${result.tier.chargePercent}%` : `${result.tier.chargePercent}% ${c.ofTotal}`})</span>
                            </p>
                            <p className="mt-1 text-sm text-foreground-muted">{hi ? result.tier.outcomeHi : result.tier.outcome}</p>
                            <p className={cn("mt-3 text-sm font-medium", result.tier.transferable ? "text-success" : "text-foreground-muted")}>
                                {result.tier.transferable ? c.canMove : c.cantMove}
                            </p>
                        </div>
                    ))}
            </div>
        </section>
    );
}
