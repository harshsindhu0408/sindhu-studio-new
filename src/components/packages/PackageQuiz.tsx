"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Wand2 } from "lucide-react";
import { getAddOn, type AddOnId } from "@/data/addons";
import type { FeatureId, PackageId } from "@/data/packages";
import { formatINR } from "@/lib/quote";
import { track } from "@/lib/analytics";
import { bestFit, cheapestFit, type Requirement } from "@/lib/recommend";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type WantId = "candid" | "drone" | "cinematic" | "teaser" | "ring" | "prewed" | "ledwall" | "album";

const wants: { id: WantId; addOn?: AddOnId; feature?: FeatureId }[] = [
    { id: "candid", addOn: "candid" },
    { id: "drone", addOn: "drone" },
    { id: "cinematic", addOn: "cinematic" },
    { id: "teaser", feature: "teaser" },
    { id: "ring", addOn: "ring-ceremony" },
    { id: "prewed", addOn: "pre-wedding" },
    { id: "ledwall", addOn: "led-wall" },
    { id: "album", feature: "albumDesign" },
];

const budgets = [
    { id: "75", max: 75000 },
    { id: "125", max: 125000 },
    { id: "200", max: 200000 },
    { id: "any", max: Infinity },
] as const;

export function PackageQuiz({ onRecommend, locale = "en" }: { onRecommend: (id: PackageId) => void; locale?: Locale }) {
    const t = getDictionary(locale).quiz;
    const [selected, setSelected] = useState<WantId[]>([]);
    const [budget, setBudget] = useState<(typeof budgets)[number]["id"] | null>(null);
    const [done, setDone] = useState(false);

    const result = useMemo(() => {
        const reqs: Requirement[] = wants.filter((w) => selected.includes(w.id)).map((w) => ({ addOn: w.addOn, feature: w.feature }));
        const max = budgets.find((b) => b.id === budget)?.max ?? Infinity;
        const fit = max === Infinity ? bestFit(reqs) : cheapestFit(reqs);
        return fit ? { fit, overBudget: fit.total > max } : null;
    }, [selected, budget]);

    const toggle = (id: WantId) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

    const finish = () => {
        if (!result) return;
        setDone(true);
        onRecommend(result.fit.pkg.id);
        track("quiz_complete", { package: result.fit.pkg.id, wants: selected.join(","), budget: budget ?? "" });
    };

    const fit = result?.fit;
    const addOnName = (id: AddOnId) => (locale === "hi" ? getAddOn(id).nameHi : getAddOn(id).name);

    return (
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-10">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-marigold/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
                <div>
                    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        <Wand2 className="h-4 w-4" aria-hidden /> {t.eyebrow}
                    </p>
                    <h2 id="quiz-title" className="mt-3 font-display text-3xl md:text-4xl">
                        {t.titleA} <span className="italic text-accent">{t.titleEm}</span> {t.titleB}
                    </h2>
                    <p className="mt-3 text-foreground-muted">{t.intro}</p>
                </div>

                {!done || !fit ? (
                    <div>
                        <fieldset>
                            <legend className="text-sm font-semibold">{t.mustHaves}</legend>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {wants.map((w) => {
                                    const on = selected.includes(w.id);
                                    return (
                                        <button
                                            key={w.id}
                                            type="button"
                                            aria-pressed={on}
                                            onClick={() => toggle(w.id)}
                                            className={cn(
                                                "min-h-11 cursor-pointer rounded-full border px-4 text-sm transition-colors",
                                                on ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"
                                            )}
                                        >
                                            {t.wants[w.id]}
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>
                        <fieldset className="mt-6">
                            <legend className="text-sm font-semibold">{t.budget}</legend>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                {budgets.map((b) => (
                                    <label
                                        key={b.id}
                                        className={cn(
                                            "flex min-h-11 cursor-pointer items-center rounded-xl border px-4 text-sm transition-colors",
                                            budget === b.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                                        )}
                                    >
                                        <input type="radio" name="budget" value={b.id} checked={budget === b.id} onChange={() => setBudget(b.id)} className="sr-only" />
                                        {t.budgets[b.id]}
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <button type="button" onClick={finish} disabled={!budget} className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
                            {t.find} <ArrowRight className="h-4 w-4" aria-hidden />
                        </button>
                    </div>
                ) : (
                    <div aria-live="polite" className="rounded-2xl border border-marigold/40 bg-background p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-marigold">{t.bestFit}</p>
                        <p className="mt-2 font-display text-4xl">{fit.pkg.name}</p>
                        <p className="tabular mt-1 text-lg font-semibold">
                            {formatINR(fit.total)}
                            {fit.extras.length > 0 && (
                                <span className="ml-2 text-sm font-normal text-foreground-muted">
                                    ({formatINR(fit.pkg.price)} {t.plusAddons})
                                </span>
                            )}
                        </p>
                        <p className="mt-3 text-sm text-foreground-muted">
                            {fit.extras.length === 0
                                ? `${fit.pkg.name} ${t.allIncluded}`
                                : `${fit.pkg.name} ${t.coversMostA} ${fit.extras.map((e) => `${addOnName(e.id)} (${formatINR(e.price)})`).join(` ${t.and} `)} ${t.coversMostB}`}
                        </p>
                        {result.overBudget && <p className="mt-3 rounded-lg bg-sindoor/10 p-3 text-sm">{t.overBudget}</p>}
                        <div className="mt-5 flex flex-wrap gap-2">
                            <Link href={`${localePath(locale, "/build")}?p=${fit.pkg.id}${fit.extras.length ? `&a=${fit.extras.map((e) => e.id).join(",")}` : ""}`} className="btn btn-primary">
                                {t.buildThis} <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                            <button type="button" onClick={() => setDone(false)} className="btn btn-outline">
                                <RotateCcw className="h-4 w-4" aria-hidden /> {t.change}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
