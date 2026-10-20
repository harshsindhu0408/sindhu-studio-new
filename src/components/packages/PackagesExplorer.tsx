"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Scale, Sparkles, X } from "lucide-react";
import {
    comparableFeatures,
    featureGroups,
    packages,
    isPackageId,
    upgradeBetween,
    nextPackage,
    type Package,
    type PackageId,
} from "@/data/packages";
import { formatINR } from "@/lib/quote";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { InfoTip } from "@/components/ui/InfoTip";
import { FeatureValue } from "./FeatureValue";
import { PackageQuiz } from "./PackageQuiz";
import { getDictionary, localePath, type Locale } from "@/i18n";

const MAX_COMPARE = 3;

function sameEverywhere(featureId: (typeof comparableFeatures)[number]["id"], cols: Package[]) {
    const first = JSON.stringify(cols[0]?.values[featureId]);
    return cols.every((p) => JSON.stringify(p.values[featureId]) === first);
}

export function PackagesExplorer({ includesStrip, locale = "en" }: { includesStrip?: React.ReactNode; locale?: Locale }) {
    const t = getDictionary(locale);
    const [compare, setCompare] = useState<PackageId[]>([]);
    const [onlyDiff, setOnlyDiff] = useState(false);
    const [recommended, setRecommended] = useState<PackageId | null>(null);

    // Restore ?compare=gold,platinum so a comparison can be shared on WhatsApp
    useEffect(() => {
        const ids = new URLSearchParams(window.location.search).get("compare")?.split(",").filter(isPackageId) ?? [];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the URL after hydration
        if (ids.length) setCompare(ids.slice(0, MAX_COMPARE));
    }, []);

    useEffect(() => {
        const url = new URL(window.location.href);
        if (compare.length) url.searchParams.set("compare", compare.join(","));
        else url.searchParams.delete("compare");
        window.history.replaceState(null, "", url);
    }, [compare]);

    const toggleCompare = useCallback((id: PackageId) => {
        setCompare((prev) => {
            if (prev.includes(id)) return prev.filter((x) => x !== id);
            const next = [...prev, id].slice(-MAX_COMPARE);
            return packages.filter((p) => next.includes(p.id)).map((p) => p.id);
        });
    }, []);

    const goCompare = () => {
        track("compare_open", { source: "drawer", packages: compare.join(",") });
        document.getElementById("compare")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <section aria-labelledby="quiz-title" className="container-custom">
                <PackageQuiz
                    locale={locale}
                    onRecommend={(id) => {
                        setRecommended(id);
                        document.getElementById(`pkg-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
                    }}
                />
            </section>

            <section aria-label="Packages" className="mt-12">
                <div className="container-custom">
                    <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
                        {packages.map((pkg) => (
                            <PackageCard
                                locale={locale}
                                key={pkg.id}
                                pkg={pkg}
                                selected={compare.includes(pkg.id)}
                                recommended={recommended === pkg.id}
                                onToggle={() => toggleCompare(pkg.id)}
                            />
                        ))}
                    </ul>
                    <p className="mt-2 text-center text-xs text-foreground-muted md:hidden">{t.packages.swipe}</p>
                </div>
            </section>

            {includesStrip}

            <CompareSection locale={locale} compare={compare} setCompare={setCompare} onlyDiff={onlyDiff} setOnlyDiff={setOnlyDiff} />

            <AnimatePresence>
                {compare.length > 0 && (
                    <motion.div
                        initial={{ y: 120, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 120, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-x-3 bottom-[5.25rem] z-40 mx-auto max-w-xl rounded-2xl border border-border bg-card/95 p-3 shadow-2xl backdrop-blur-lg md:bottom-6"
                        role="region"
                        aria-label="Packages selected for comparison"
                    >
                        <div className="flex items-center gap-2">
                            <ul className="flex flex-1 flex-wrap gap-2">
                                {compare.map((id) => {
                                    const p = packages.find((x) => x.id === id)!;
                                    return (
                                        <li key={id}>
                                            <button
                                                type="button"
                                                onClick={() => toggleCompare(id)}
                                                className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-full bg-background-secondary px-3 text-sm"
                                                aria-label={`${t.packages.removeFrom}: ${p.name}`}
                                            >
                                                {p.name}
                                                <X className="h-3.5 w-3.5" aria-hidden />
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <button
                                type="button"
                                onClick={goCompare}
                                disabled={compare.length < 2}
                                className="btn btn-primary min-h-11 shrink-0 px-4 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Scale className="h-4 w-4" aria-hidden />
                                {compare.length < 2 ? t.packages.pickOne : `${t.packages.compareN} (${compare.length})`}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function PackageCard({
    pkg,
    selected,
    recommended,
    onToggle,
    locale,
}: {
    pkg: Package;
    selected: boolean;
    recommended: boolean;
    onToggle: () => void;
    locale: Locale;
}) {
    const t = getDictionary(locale);
    const hi = locale === "hi";
    return (
        <li
            id={`pkg-${pkg.id}`}
            className={cn(
                "relative flex w-[82vw] max-w-sm shrink-0 snap-center flex-col rounded-2xl border bg-card p-6 transition-shadow md:w-auto md:max-w-none",
                pkg.popular ? "border-accent shadow-lg ring-1 ring-accent/30" : "border-border",
                recommended && "ring-2 ring-marigold"
            )}
        >
            {(pkg.popular || recommended) && (
                <span
                    className={cn(
                        "absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
                        recommended ? "bg-marigold text-background" : "bg-[#B3192E] text-white"
                    )}
                >
                    {recommended ? t.quiz.bestFit : t.common.mostChosen}
                </span>
            )}

            <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl">{pkg.name}</h3>
                <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-foreground-muted">
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={onToggle}
                        className="h-5 w-5 cursor-pointer accent-[rgb(var(--accent))]"
                    />
                    {t.packages.compare}
                </label>
            </div>
            <p className="tabular mt-2 font-sans text-3xl font-semibold tracking-tight">{formatINR(pkg.price)}</p>
            <p className="mt-2 text-sm text-foreground-muted">{hi ? pkg.summaryHi : pkg.summary}</p>

            <ul className="mt-5 flex-1 space-y-2.5 border-t border-dashed border-border pt-5">
                {(hi ? pkg.highlightsHi : pkg.highlights).map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                        {h}
                    </li>
                ))}
            </ul>

            <div className="mt-6 grid gap-2">
                <Link
                    href={`${localePath(locale, "/build")}?p=${pkg.id}`}
                    onClick={() => track("package_select", { package: pkg.id, source: "card" })}
                    className={cn("btn w-full", pkg.popular ? "btn-primary" : "btn-outline")}
                >
                    {t.common.buildQuote}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a href="#compare" className="py-2 text-center text-xs text-foreground-muted underline-offset-2 hover:text-accent hover:underline">
                    {t.packages.seeEverything} {pkg.name}
                </a>
            </div>
        </li>
    );
}

function CompareSection({
    compare,
    setCompare,
    onlyDiff,
    setOnlyDiff,
    locale,
}: {
    locale: Locale;
    compare: PackageId[];
    setCompare: (ids: PackageId[]) => void;
    onlyDiff: boolean;
    setOnlyDiff: (v: boolean) => void;
}) {
    const columns = useMemo(() => (compare.length >= 2 ? packages.filter((p) => compare.includes(p.id)) : packages), [compare]);
    const t = getDictionary(locale).packages;

    return (
        <section id="compare" aria-labelledby="compare-title" className="container-custom scroll-mt-24 pt-24">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{t.compareEyebrow}</p>
                    <h2 id="compare-title" className="mt-3 font-display text-3xl md:text-5xl">
                        {t.compareTitle}
                    </h2>
                    <p className="mt-3 max-w-2xl text-foreground-muted">{t.compareIntro}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-border px-4 text-sm">
                        <input
                            type="checkbox"
                            role="switch"
                            checked={onlyDiff}
                            onChange={(e) => {
                                setOnlyDiff(e.target.checked);
                                track("compare_diff_toggle", { on: e.target.checked });
                            }}
                            className="h-4 w-4 cursor-pointer accent-[rgb(var(--accent))]"
                        />
                        {t.onlyDiff}
                    </label>
                    {compare.length >= 2 && (
                        <button
                            type="button"
                            onClick={() => setCompare([])}
                            className="min-h-11 cursor-pointer rounded-full border border-border px-4 text-sm hover:border-accent"
                        >
                            {t.showAll}
                        </button>
                    )}
                </div>
            </div>

            <DesktopTable columns={columns} onlyDiff={onlyDiff} locale={locale} />
            <MobileCompare onlyDiff={onlyDiff} initial={compare} locale={locale} />
        </section>
    );
}

function DesktopTable({ columns, onlyDiff, locale }: { columns: Package[]; onlyDiff: boolean; locale: Locale }) {
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
    const t = getDictionary(locale);
    const hi = locale === "hi";

    return (
        <div className="mt-10 hidden lg:block">
            <table className="w-full table-fixed border-separate border-spacing-0 text-left">
                <caption className="sr-only">
                    Comparison of {columns.map((c) => c.name).join(", ")} wedding packages. Prices in Indian Rupees.
                </caption>
                <colgroup>
                    <col className="w-[22%]" />
                    {columns.map((c) => (
                        <col key={c.id} className={c.popular ? "bg-accent/[0.06]" : undefined} />
                    ))}
                </colgroup>
                <thead>
                    <tr>
                        <td className="sticky top-[72px] z-10 border-b border-border bg-background" />
                        {columns.map((p) => (
                            <th
                                key={p.id}
                                scope="col"
                                className={cn(
                                    "sticky top-[72px] z-10 border-b border-border bg-background px-3 py-4 text-center align-bottom",
                                    p.popular && "bg-[color-mix(in_srgb,rgb(var(--accent))_8%,rgb(var(--background)))]"
                                )}
                            >
                                {p.popular && <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-sindoor">{t.common.mostChosen}</span>}
                                <span className="block font-display text-xl">{p.name}</span>
                                <span className="tabular mt-1 block font-sans text-base font-semibold">{formatINR(p.price)}</span>
                                <Link
                                    href={`${localePath(locale, "/build")}?p=${p.id}`}
                                    onClick={() => track("package_select", { package: p.id, source: "table" })}
                                    className="mt-3 inline-flex min-h-9 items-center rounded-full border border-border px-3 text-xs font-medium hover:border-accent hover:text-accent"
                                >
                                    {t.packages.choose}
                                </Link>
                            </th>
                        ))}
                    </tr>
                </thead>
                {featureGroups.map((group) => {
                    const rows = comparableFeatures.filter((f) => f.group === group.id && !(onlyDiff && sameEverywhere(f.id, columns)));
                    if (!rows.length) return null;
                    const isCollapsed = collapsed[group.id];
                    return (
                        <tbody key={group.id}>
                            <tr>
                                <th colSpan={columns.length + 1} scope="colgroup" className="border-b border-border pt-8 pb-3">
                                    <button
                                        type="button"
                                        onClick={() => setCollapsed((c) => ({ ...c, [group.id]: !c[group.id] }))}
                                        aria-expanded={!isCollapsed}
                                        className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent"
                                    >
                                        <ChevronDown className={cn("h-4 w-4 transition-transform", isCollapsed && "-rotate-90")} aria-hidden />
                                        {hi ? group.labelHi : group.label}
                                    </button>
                                </th>
                            </tr>
                            {!isCollapsed &&
                                rows.map((f) => (
                                    <tr key={f.id} className="group">
                                        <th scope="row" className="border-b border-border/60 py-3 pr-3 text-sm font-medium group-hover:bg-background-secondary/60">
                                            <span className="inline-flex items-center gap-1">
                                                {hi ? f.labelHi : f.label}
                                                <InfoTip label={hi ? `${f.labelHi} क्या है` : f.label} ask={hi ? "" : t.common.whatIs}>
                                                    {hi ? f.explainHi : f.explain}
                                                </InfoTip>
                                            </span>
                                        </th>
                                        {columns.map((p) => (
                                            <td key={p.id} className="border-b border-border/60 px-3 py-3 group-hover:bg-background-secondary/60">
                                                <FeatureValue feature={f.id} value={p.values[f.id]} packageId={p.id} locale={locale} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    );
                })}
                <tbody>
                    <tr>
                        <th scope="row" className="pt-6 pr-3 align-top text-sm font-medium">
                            <span className="inline-flex items-center gap-1.5 text-accent">
                                <Sparkles className="h-4 w-4" aria-hidden /> {t.packages.stepUp}
                            </span>
                        </th>
                        {columns.map((p) => (
                            <td key={p.id} className="px-2 pt-6 align-top">
                                <UpgradeHint pkg={p} locale={locale} />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function UpgradeHint({ pkg, locale }: { pkg: Package; locale: Locale }) {
    const t = getDictionary(locale).packages;
    const hi = locale === "hi";
    const next = nextPackage(pkg);
    if (!next) return <p className="text-center text-xs text-foreground-muted">{t.mostComplete}</p>;
    const up = upgradeBetween(pkg, next);
    return (
        <div className="rounded-xl border border-dashed border-border p-3 text-xs">
            <p className="font-medium">
                → {next.name} <span className="tabular text-foreground-muted">+{formatINR(up.extra)}</span>
            </p>
            {up.priced.length > 0 ? (
                <p className="mt-1 text-foreground-muted">
                    {t.adds} {up.priced.map((x) => (hi ? x.addOn.nameHi : x.addOn.name).replace(/ \(.*\)/, "")).join(", ")}
                    <span className="tabular block">
                        ({formatINR(up.pricedTotal)} {t.ifSeparate})
                    </span>
                </p>
            ) : (
                <p className="mt-1 text-foreground-muted">{(hi ? up.alsoBetterHi : up.alsoBetter).slice(0, 3).join(" · ")}</p>
            )}
        </div>
    );
}

function MobileCompare({ onlyDiff, initial, locale }: { onlyDiff: boolean; initial: PackageId[]; locale: Locale }) {
    const t = getDictionary(locale);
    const hi = locale === "hi";
    const [pair, setPair] = useState<[PackageId, PackageId]>(["gold", "platinum"]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- follow the cards' compare selection
        if (initial.length >= 2) setPair([initial[0], initial[1]]);
    }, [initial]);

    const cols = pair.map((id) => packages.find((p) => p.id === id)!) as [Package, Package];

    const setSide = (side: 0 | 1, id: PackageId) => {
        const next: [PackageId, PackageId] = [...pair];
        next[side] = id;
        setPair(next);
        track("compare_pair", { a: next[0], b: next[1] });
    };

    return (
        <div className="mt-8 lg:hidden">
            <div className="sticky top-[64px] z-10 -mx-4 grid grid-cols-2 gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
                {cols.map((p, side) => (
                    <label key={side} className="block">
                        <span className="sr-only">{side === 0 ? t.packages.firstPkg : t.packages.secondPkg}</span>
                        <select
                            value={p.id}
                            onChange={(e) => setSide(side as 0 | 1, e.target.value as PackageId)}
                            className="min-h-11 w-full cursor-pointer rounded-xl border border-border bg-card px-3 font-display text-lg"
                        >
                            {packages.map((o) => (
                                <option key={o.id} value={o.id}>
                                    {o.name}
                                </option>
                            ))}
                        </select>
                        <span className="tabular mt-1 block px-1 text-sm font-semibold">{formatINR(p.price)}</span>
                    </label>
                ))}
            </div>

            {featureGroups.map((group) => {
                const rows = comparableFeatures.filter((f) => f.group === group.id && !(onlyDiff && sameEverywhere(f.id, cols)));
                if (!rows.length) return null;
                return (
                    <div key={group.id} className="mt-6">
                        <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-accent">{hi ? group.labelHi : group.label}</h3>
                        <dl className="mt-2 divide-y divide-border/60 border-y border-border/60">
                            {rows.map((f) => (
                                <div key={f.id} className="py-3">
                                    <dt className="flex items-center gap-1 text-sm font-medium">
                                        {hi ? f.labelHi : f.label}
                                        <InfoTip label={hi ? `${f.labelHi} क्या है` : f.label} ask={hi ? "" : t.common.whatIs}>
                                            {hi ? f.explainHi : f.explain}
                                        </InfoTip>
                                    </dt>
                                    <dd className="mt-1 grid grid-cols-2 gap-3">
                                        {cols.map((p) => (
                                            <FeatureValue key={p.id} feature={f.id} value={p.values[f.id]} packageId={p.id} align="start" locale={locale} />
                                        ))}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                );
            })}

            <div className="mt-6 grid grid-cols-2 gap-3">
                {cols.map((p) => (
                    <Link key={p.id} href={`${localePath(locale, "/build")}?p=${p.id}`} className={cn("btn w-full px-3", p.popular ? "btn-primary" : "btn-outline")}>
                        {p.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
