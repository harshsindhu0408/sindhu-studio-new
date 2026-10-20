"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CalendarX, MapPin, Plus, Sparkles, Trash2, Users } from "lucide-react";
import { getAddOn, type AddOnId } from "@/data/addons";
import { cities } from "@/data/cities";
import { whatsappLink } from "@/data/business";
import { isMuhurat } from "@/data/muhurat";
import { formatINR, serializeQuote } from "@/lib/quote";
import { cheapestFitWithQty, type QtyRequirement } from "@/lib/recommend";
import { track } from "@/lib/analytics";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type FnKey = "roka" | "ring" | "haldi" | "mehendi" | "sangeet" | "shaadi" | "kuan" | "reception" | "prewed";
type Pref = "candid" | "cinematic" | "drone" | "ledwall";

const FN_ORDER: FnKey[] = ["prewed", "roka", "ring", "haldi", "mehendi", "sangeet", "shaadi", "reception", "kuan"];
const FN_ADDON: Partial<Record<FnKey, AddOnId>> = { ring: "ring-ceremony", prewed: "pre-wedding", kuan: "kuan-poojan" };
const PREF_ADDON: Record<Pref, AddOnId> = { candid: "candid", cinematic: "cinematic", drone: "drone", ledwall: "led-wall" };
const BIG_WEDDING = 400;

interface Fn {
    key: FnKey;
    date: string;
    guests: number;
}

export function Planner({ locale = "en", availability }: { locale?: Locale; availability: Record<string, "booked" | "limited"> }) {
    const t = getDictionary(locale);
    const p = t.planner;
    const q = t.quiz;
    const hi = locale === "hi";
    const params = useSearchParams();

    const [fns, setFns] = useState<Fn[]>(() => [{ key: "shaadi", date: params.get("date") ?? "", guests: 300 }]);
    const [city, setCity] = useState("rohtak");
    const [prefs, setPrefs] = useState<Pref[]>(["candid"]);

    useEffect(() => {
        track("planner_open", { date: params.get("date") ?? "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const has = (k: FnKey) => fns.some((f) => f.key === k);
    const toggleFn = (k: FnKey) => setFns((list) => (list.some((f) => f.key === k) ? list.filter((f) => f.key !== k) : [...list, { key: k, date: "", guests: list[0]?.guests ?? 200 }]));
    const update = (k: FnKey, patch: Partial<Fn>) => setFns((list) => list.map((f) => (f.key === k ? { ...f, ...patch } : f)));
    const togglePref = (x: Pref) => setPrefs((list) => (list.includes(x) ? list.filter((y) => y !== x) : [...list, x]));

    const plan = useMemo(() => {
        const wedding = fns.filter((f) => f.key !== "prewed" && f.key !== "kuan");
        const dated = new Set(wedding.filter((f) => f.date).map((f) => f.date));
        const days = Math.max(1, dated.size + wedding.filter((f) => !f.date).length);
        const maxGuests = Math.max(0, ...fns.map((f) => f.guests || 0));

        const reqs: QtyRequirement[] = [];
        for (const f of fns) {
            const a = FN_ADDON[f.key];
            if (a) reqs.push({ addOn: a, qty: 1 });
        }
        for (const x of prefs) {
            const a = PREF_ADDON[x];
            reqs.push({ addOn: a, qty: x === "candid" || x === "cinematic" ? days : 1 });
        }
        const autoLed = maxGuests >= BIG_WEDDING && !prefs.includes("ledwall");
        if (autoLed) reqs.push({ addOn: "led-wall", qty: 1 });

        const fit = cheapestFitWithQty(reqs);
        const sorted = [...fns].sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999") || FN_ORDER.indexOf(a.key) - FN_ORDER.indexOf(b.key));
        return { fit, days, sorted, autoLed, maxGuests };
    }, [fns, prefs]);

    const quoteQuery = plan.fit
        ? serializeQuote({ packageId: plan.fit.pkg.id, addOns: Object.fromEntries(plan.fit.extras.map((e) => [e.id, e.qty])) })
        : "";

    const fnName = (k: FnKey) => p.functions[k];
    const fmtDate = (iso: string) =>
        new Date(`${iso}T00:00:00`).toLocaleDateString(hi ? "hi-IN" : "en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    const cityObj = cities.find((c) => c.slug === city);

    const message = () => {
        const lines = [p.planMessage, ""];
        for (const f of plan.sorted) lines.push(`• ${fnName(f.key)}: ${f.date ? fmtDate(f.date) : p.tbd} (${f.guests} ${p.guestsShort})`);
        lines.push("", `${p.city}: ${cityObj ? (hi ? cityObj.nameHi : cityObj.name) : p.cityOther}`);
        if (plan.fit) lines.push(`${p.recTitle}: ${plan.fit.pkg.name}${plan.fit.extras.length ? ` + ${plan.fit.extras.map((e) => getAddOn(e.id).name).join(", ")}` : ""} = ${formatINR(plan.fit.total)}`);
        return lines.join("\n");
    };

    return (
        <div className="container-custom grid gap-10 pb-40 lg:grid-cols-[1fr_420px] lg:gap-12 lg:pb-24">
            <div className="min-w-0 space-y-12">
                {/* Functions */}
                <section aria-labelledby="fns">
                    <h2 id="fns" className="flex items-baseline gap-3 font-display text-2xl md:text-3xl">
                        <span className="tabular font-sans text-sm font-semibold text-accent">01</span>
                        {p.step1}
                    </h2>
                    <p className="mt-2 text-sm text-foreground-muted">{p.step1Hint}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {FN_ORDER.map((k) => (
                            <button
                                key={k}
                                type="button"
                                aria-pressed={has(k)}
                                onClick={() => toggleFn(k)}
                                className={cn(
                                    "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm transition-colors",
                                    has(k) ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"
                                )}
                            >
                                {!has(k) && <Plus className="h-3.5 w-3.5" aria-hidden />}
                                {fnName(k)}
                            </button>
                        ))}
                    </div>

                    <ul className="mt-6 space-y-3">
                        {FN_ORDER.filter(has).map((k) => {
                            const f = fns.find((x) => x.key === k)!;
                            const status = f.date ? availability[f.date] : undefined;
                            return (
                                <li key={k} className="rounded-2xl border border-border bg-card p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-medium">{fnName(k)}</p>
                                        <button type="button" onClick={() => toggleFn(k)} aria-label={`${p.remove}: ${fnName(k)}`} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-foreground-muted hover:text-sindoor">
                                            <Trash2 className="h-4 w-4" aria-hidden />
                                        </button>
                                    </div>
                                    <div className="mt-3 grid grid-cols-[1fr_120px] gap-3">
                                        <label className="block text-sm">
                                            <span className="text-foreground-muted">{p.date}</span>
                                            <input
                                                type="date"
                                                value={f.date}
                                                min={new Date().toISOString().slice(0, 10)}
                                                onChange={(e) => update(k, { date: e.target.value })}
                                                className="mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
                                            />
                                        </label>
                                        <label className="block text-sm">
                                            <span className="text-foreground-muted">{p.guests}</span>
                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                min={0}
                                                step={50}
                                                value={f.guests}
                                                onChange={(e) => update(k, { guests: Math.max(0, Number(e.target.value) || 0) })}
                                                className="tabular mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
                                            />
                                        </label>
                                    </div>
                                    {f.date && (
                                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                            {k === "shaadi" &&
                                                (isMuhurat(f.date) ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-foreground">
                                                        <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden /> {p.muhurat}
                                                    </span>
                                                ) : (
                                                    <Link href={localePath(locale, "/vivah-muhurat-2027")} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-foreground-muted hover:border-accent">
                                                        {p.notMuhurat}
                                                    </Link>
                                                ))}
                                            <AvailabilityChip status={status} p={p} />
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </section>

                {/* Where + what matters */}
                <section aria-labelledby="where">
                    <h2 id="where" className="flex items-baseline gap-3 font-display text-2xl md:text-3xl">
                        <span className="tabular font-sans text-sm font-semibold text-accent">02</span>
                        {p.step2}
                    </h2>
                    <label className="mt-5 block max-w-sm text-sm">
                        <span className="text-foreground-muted">{p.city}</span>
                        <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 min-h-11 w-full cursor-pointer rounded-xl border border-border bg-card px-3">
                            {cities.map((c) => (
                                <option key={c.slug} value={c.slug}>
                                    {hi ? c.nameHi : c.name}
                                    {c.distanceKm ? ` (~${c.distanceKm} km)` : ""}
                                </option>
                            ))}
                            <option value="other">{p.cityOther}</option>
                        </select>
                    </label>
                    {city !== "rohtak" && <p className="mt-2 text-sm text-foreground-muted">{p.travel}</p>}

                    <fieldset className="mt-8">
                        <legend className="text-sm font-semibold">{p.prefs}</legend>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {(Object.keys(PREF_ADDON) as Pref[]).map((x) => (
                                <button
                                    key={x}
                                    type="button"
                                    aria-pressed={prefs.includes(x)}
                                    onClick={() => togglePref(x)}
                                    className={cn(
                                        "min-h-11 cursor-pointer rounded-full border px-4 text-sm transition-colors",
                                        prefs.includes(x) ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"
                                    )}
                                >
                                    {q.wants[x]}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </section>
            </div>

            {/* Timeline + recommendation */}
            <aside className="lg:sticky lg:top-24 lg:self-start" aria-labelledby="timeline">
                <div className="rounded-3xl border border-border bg-card p-6">
                    <h2 id="timeline" className="font-display text-2xl">
                        {p.timeline}
                    </h2>
                    {plan.sorted.length === 0 ? (
                        <p className="mt-4 text-sm text-foreground-muted">{p.empty}</p>
                    ) : (
                        <ol className="relative mt-5 space-y-4 border-l border-accent/40 pl-5">
                            {plan.sorted.map((f) => (
                                <li key={f.key} className="relative">
                                    <span aria-hidden className={cn("absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-card", f.key === "shaadi" ? "bg-sindoor" : "bg-accent")} />
                                    <p className="text-xs uppercase tracking-wider text-foreground-muted">{f.date ? fmtDate(f.date) : p.tbd}</p>
                                    <p className="font-medium">{fnName(f.key)}</p>
                                    <p className="flex items-center gap-1 text-xs text-foreground-muted">
                                        <Users className="h-3 w-3" aria-hidden /> {f.guests} {p.guestsShort}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    )}

                    {plan.fit && (
                        <div className="mt-6 rounded-2xl border border-marigold/40 bg-marigold/[0.07] p-5" aria-live="polite">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">{p.recTitle}</p>
                            <p className="mt-2 font-display text-3xl">{plan.fit.pkg.name}</p>
                            {plan.fit.extras.length > 0 && (
                                <ul className="mt-2 space-y-1 text-sm">
                                    {plan.fit.extras.map((e) => {
                                        const a = getAddOn(e.id);
                                        return (
                                            <li key={e.id} className="flex justify-between gap-3">
                                                <span>
                                                    + {hi ? a.nameHi : a.name}
                                                    {e.qty > 1 ? ` × ${e.qty}` : ""}
                                                </span>
                                                <span className="tabular text-foreground-muted">{formatINR(e.price)}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                            <p className="tabular mt-3 border-t border-border pt-3 text-2xl font-semibold">{formatINR(plan.fit.total)}</p>
                            <p className="mt-1 text-xs text-foreground-muted">
                                {plan.days} {plan.days === 1 ? p.dayWord : p.daysWord}
                                {plan.autoLed ? ` · ${hi ? `${BIG_WEDDING}+ मेहमानों के लिए LED वॉल सुझाई गई` : `LED wall suggested for ${BIG_WEDDING}+ guests`}` : ""}
                            </p>
                            <p className="mt-2 text-sm text-foreground-muted">{p.recReason}</p>
                            <div className="mt-4 grid gap-2">
                                <Link
                                    href={`${localePath(locale, "/build")}?${quoteQuery}`}
                                    onClick={() => track("planner_to_builder", { package: plan.fit!.pkg.id })}
                                    className="btn btn-primary w-full"
                                >
                                    {p.openBuilder} <ArrowRight className="h-4 w-4" aria-hidden />
                                </Link>
                                <a
                                    href={whatsappLink(message())}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track("generate_lead", { source: "planner" })}
                                    className="btn btn-outline w-full"
                                >
                                    <WhatsAppIcon className="h-4 w-4" /> {p.whatsapp}
                                </a>
                            </div>
                            {city !== "rohtak" && (
                                <p className="mt-3 flex items-start gap-1.5 text-xs text-foreground-muted">
                                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {p.travel}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}

function AvailabilityChip({ status, p }: { status?: "booked" | "limited"; p: ReturnType<typeof getDictionary>["planner"] }) {
    if (status === "booked")
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-sindoor/15 px-2.5 py-1">
                <CalendarX className="h-3.5 w-3.5 text-sindoor" aria-hidden /> {p.booked}
            </span>
        );
    if (status === "limited")
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-marigold/15 px-2.5 py-1">
                <CalendarCheck className="h-3.5 w-3.5 text-marigold" aria-hidden /> {p.limited}
            </span>
        );
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1">
            <CalendarCheck className="h-3.5 w-3.5 text-success" aria-hidden /> {p.free}
        </span>
    );
}
