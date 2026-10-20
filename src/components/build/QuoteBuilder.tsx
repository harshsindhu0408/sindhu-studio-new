"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, Download, Link2, Minus, Plus, Share2, Sparkles, X } from "lucide-react";
import { addOns, addOnCategories, addOnPrice, addOnFromPrice, maxQty, type AddOn, type AddOnId } from "@/data/addons";
import { packages, addOnCoverage, type PackageId } from "@/data/packages";
import { business, paymentTerms, SITE_URL, whatsappLink } from "@/data/business";
import {
    emptyQuote,
    formatINR,
    parseQuote,
    qtyLabel,
    quoteRef,
    quoteWhatsAppMessage,
    serializeQuote,
    summarizeQuote,
    type QuoteState,
} from "@/lib/quote";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { AddOnMedia } from "@/components/addons/AddOnMedia";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getDictionary, localePath, type Locale } from "@/i18n";

const DRAFT_KEY = "sindhu-quote-draft";

interface Details {
    name: string;
    phone: string;
    date: string;
    functions: string;
}

export function QuoteBuilder({ locale = "en" }: { locale?: Locale }) {
    const params = useSearchParams();
    const t = getDictionary(locale).builder;
    const tc = getDictionary(locale).common;
    const hi = locale === "hi";
    const basePath = localePath(locale, "/build");
    const [quote, setQuote] = useState<QuoteState>(() => parseQuote({ p: params.get("p"), a: params.get("a") }));
    const [details, setDetails] = useState<Details>({ name: "", phone: "", date: "", functions: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [toast, setToast] = useState<string | null>(null);
    const [restored, setRestored] = useState(false);
    const summaryRef = useRef<HTMLDivElement>(null);

    const summary = useMemo(() => summarizeQuote(quote), [quote]);
    const query = serializeQuote(quote);
    const shareUrl = `${SITE_URL}${basePath}${query ? `?${query}` : ""}`;
    const ref = quoteRef(quote);

    // Restore an unfinished quote when the page is opened without one in the URL
    useEffect(() => {
        if (params.get("p") || params.get("a")) return;
        try {
            const raw = localStorage.getItem(DRAFT_KEY);
            if (raw) {
                const draft = parseQuote(Object.fromEntries(new URLSearchParams(raw)));
                if (draft.packageId || Object.keys(draft.addOns).length) {
                    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from storage
                    setQuote(draft);
                    setRestored(true);
                }
            }
        } catch {
            // storage unavailable
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keep the URL shareable and the draft saved
    useEffect(() => {
        window.history.replaceState(null, "", `${basePath}${query ? `?${query}` : ""}`);
        try {
            if (query) localStorage.setItem(DRAFT_KEY, query);
            else localStorage.removeItem(DRAFT_KEY);
        } catch {
            // ignore
        }
    }, [query, basePath]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(t);
    }, [toast]);

    const setPackage = (id: PackageId | null) => {
        setQuote((q) => ({ ...q, packageId: id }));
        track("builder_package", { package: id ?? "none" });
    };

    const setQty = (id: AddOnId, qty: number) => {
        setQuote((q) => {
            const next = { ...q.addOns };
            if (qty <= 0) delete next[id];
            else next[id] = qty;
            return { ...q, addOns: next };
        });
        if (qty > 0) track("builder_addon", { addon: id, qty });
    };

    const message = () =>
        quoteWhatsAppMessage(quote, {
            url: shareUrl,
            name: details.name || undefined,
            date: details.date ? new Date(details.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : undefined,
            functions: details.functions || undefined,
        });

    const sendToStudio = async () => {
        setStatus("sending");
        // Open the window synchronously so popup blockers allow it, then point it at WhatsApp
        const win = window.open("", "_blank");
        try {
            await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ source: "quote_builder", ref, quote: query, total: summary.total, ...details }),
                keepalive: true,
            });
        } catch {
            // The WhatsApp message still carries the full quote
        }
        const url = whatsappLink(message());
        if (win) win.location.href = url;
        else window.location.href = url;
        setStatus("sent");
        track("generate_lead", { source: "quote_builder", value: summary.total, currency: "INR" });
    };

    const shareWithFamily = async () => {
        const text = `${t.shareText}: ${summary.pkg ? summary.pkg.name : t.addons}, ${t.total} ${formatINR(summary.total)}`;
        track("quote_shared", { method: "share", value: summary.total });
        try {
            const cardUrl = `/build/card?${query}${details.date ? `&d=${details.date}` : ""}`;
            const blob = await fetch(cardUrl).then((r) => (r.ok ? r.blob() : Promise.reject()));
            const file = new File([blob], `sindhu-studio-quote-${ref}.jpg`, { type: "image/jpeg" });
            if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({ files: [file], text: `${text}\n${shareUrl}` });
                return;
            }
        } catch (e) {
            if ((e as Error)?.name === "AbortError") return;
        }
        if (navigator.share) {
            try {
                await navigator.share({ title: t.shareTitle, text, url: shareUrl });
                return;
            } catch (e) {
                if ((e as Error)?.name === "AbortError") return;
            }
        }
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${shareUrl}`)}`, "_blank");
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setToast(t.copied);
            track("quote_shared", { method: "copy" });
        } catch {
            setToast(t.copyFail);
        }
    };

    const hasSomething = Boolean(summary.pkg) || summary.lines.length > 0;

    return (
        <div className="container-custom grid gap-10 pb-40 lg:grid-cols-[1fr_400px] lg:gap-12 lg:pb-24">
            <div className="min-w-0 print:hidden">
                {restored && (
                    <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm">
                        <span>{t.welcomeBack}</span>
                        <button
                            type="button"
                            onClick={() => {
                                setQuote(emptyQuote);
                                setRestored(false);
                            }}
                            className="min-h-11 shrink-0 cursor-pointer px-2 underline underline-offset-2"
                        >
                            {t.startFresh}
                        </button>
                    </div>
                )}

                {/* Step 1 */}
                <section aria-labelledby="step1">
                    <StepHeading n={1} id="step1" title={t.step1} hint={<Link href={localePath(locale, "/packages")} className="text-accent hover:underline">{t.compareLink}</Link>} />
                    <div role="radiogroup" aria-labelledby="step1" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                        {packages.map((p) => {
                            const on = quote.packageId === p.id;
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    role="radio"
                                    aria-checked={on}
                                    onClick={() => setPackage(p.id)}
                                    className={cn(
                                        "relative min-h-20 cursor-pointer rounded-2xl border p-4 text-left transition-colors",
                                        on ? "border-accent bg-accent/10 ring-1 ring-accent" : "border-border bg-card hover:border-accent/60"
                                    )}
                                >
                                    {p.popular && <span className="absolute right-3 top-3 text-[10px] font-bold uppercase tracking-wider text-sindoor">{tc.popular}</span>}
                                    <span className="block font-display text-lg">{p.name}</span>
                                    <span className="tabular block text-sm text-foreground-muted">{formatINR(p.price)}</span>
                                    {on && <Check className="absolute bottom-3 right-3 h-4 w-4 text-accent" aria-hidden />}
                                </button>
                            );
                        })}
                        <button
                            type="button"
                            role="radio"
                            aria-checked={quote.packageId === null}
                            onClick={() => setPackage(null)}
                            className={cn(
                                "min-h-20 cursor-pointer rounded-2xl border border-dashed p-4 text-left transition-colors",
                                quote.packageId === null ? "border-accent bg-accent/10" : "border-border hover:border-accent/60"
                            )}
                        >
                            <span className="block font-display text-lg">{t.justAddons}</span>
                            <span className="block text-sm text-foreground-muted">{t.justAddonsHint}</span>
                        </button>
                    </div>
                    {summary.pkg && <p className="mt-3 text-sm text-foreground-muted">{hi ? summary.pkg.summaryHi : summary.pkg.summary}</p>}
                </section>

                {/* Step 2 */}
                <section aria-labelledby="step2" className="mt-14">
                    <StepHeading n={2} id="step2" title={t.step2} />

                    <AnimatePresence>
                        {summary.smartSwitch && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="mt-5 rounded-2xl border border-marigold/50 bg-marigold/10 p-5"
                                role="status"
                            >
                                <p className="flex items-center gap-2 font-medium">
                                    <Sparkles className="h-4 w-4 text-marigold" aria-hidden />
                                    {summary.smartSwitch.to.name} {t.alreadyIncludes} {summary.smartSwitch.covered.map((a) => (hi ? a.nameHi : a.name)).join(", ")}
                                </p>
                                <p className="mt-1 text-sm text-foreground-muted">
                                    {t.smartCost} <span className="tabular">{formatINR(summary.smartSwitch.coveredValue)}</span>. {summary.smartSwitch.to.name} {t.smartCosts}{" "}
                                    <span className="tabular">{formatINR(summary.smartSwitch.extra)}</span> {t.smartMore} {summary.pkg?.name} {t.smartBigger}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const { to, covered } = summary.smartSwitch!;
                                        track("smart_switch", { from: quote.packageId ?? "", to: to.id });
                                        // The new package includes these add-ons, so take them off the bill
                                        setQuote((q) => {
                                            const next = { ...q.addOns };
                                            for (const a of covered) delete next[a.id];
                                            return { packageId: to.id, addOns: next };
                                        });
                                    }}
                                    className="btn btn-primary mt-4 min-h-11 px-5"
                                >
                                    {t.switchTo} {summary.smartSwitch.to.name}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {addOnCategories.map((cat) => {
                        const items = addOns.filter((a) => a.category === cat.id);
                        return (
                            <div key={cat.id} className="mt-8">
                                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-accent">{getDictionary(locale).addonCategories[cat.id]}</h3>
                                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                                    {items.map((a) => (
                                        <AddOnRow
                                            key={a.id}
                                            addOn={a}
                                            qty={quote.addOns[a.id] ?? 0}
                                            coverage={addOnCoverage(summary.pkg, a)}
                                            pkgName={summary.pkg?.name}
                                            onQty={(q) => setQty(a.id, q)}
                                            locale={locale}
                                        />
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </section>
            </div>

            {/* Step 3: summary */}
            <aside aria-labelledby="step3" className="lg:sticky lg:top-24 lg:self-start" ref={summaryRef} id="quote-summary">
                <div data-print-quote className="rounded-3xl border border-border bg-card p-6">
                    <StepHeading n={3} id="step3" title={t.step3} />
                    <p className="mt-1 text-xs text-foreground-muted">
                        {t.ref} {ref} · {t.valid} {paymentTerms.quoteValidityDays} {t.days}
                    </p>

                    {!summary.pkg && <p className="mt-6 text-sm text-foreground-muted">{t.noPackage}</p>}
                    <dl className="mt-3 space-y-3 text-sm">
                        {summary.pkg && <Line label={`${summary.pkg.name} ${t.package}`} value={summary.pkg.price} removeLabel={tc.remove} />}
                        {summary.lines.map((l) => (
                            <Line key={l.addOn.id} label={`${hi ? l.addOn.nameHi : l.addOn.name}${l.label ? ` × ${qtyLabel(l.addOn, l.qty, locale)}` : ""}`} value={l.price} onRemove={() => setQty(l.addOn.id, 0)} removeLabel={tc.remove} />
                        ))}
                    </dl>

                    <div className="mt-5 border-t border-border pt-5">
                        <div className="flex items-baseline justify-between">
                            <span className="font-medium">{t.total}</span>
                            <motion.span key={summary.total} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="tabular font-sans text-3xl font-semibold">
                                {formatINR(summary.total)}
                            </motion.span>
                        </div>
                        {hasSomething && (
                            <p className="mt-2 flex items-baseline justify-between text-sm text-foreground-muted">
                                <span>
                                    {t.bookWith} {paymentTerms.bookingPercent}%
                                </span>
                                <span className="tabular font-medium text-foreground">{formatINR(summary.bookingAmount)}</span>
                            </p>
                        )}
                        <p className="mt-3 text-xs text-foreground-muted">{hi ? "दाम भारतीय रुपये में हैं। GST लागू होने पर बिल में दिखाया जाता है।" : paymentTerms.gstNote} {t.travel}</p>
                    </div>

                    <details className="group mt-6 rounded-2xl border border-border p-4 print:hidden">
                        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                            {t.details}
                            <Plus className="h-4 w-4 transition-transform group-open:rotate-45" aria-hidden />
                        </summary>
                        <div className="mt-3 grid gap-3">
                            <Field label={t.name} value={details.name} onChange={(v) => setDetails((d) => ({ ...d, name: v }))} autoComplete="name" />
                            <Field label={t.phone} type="tel" value={details.phone} onChange={(v) => setDetails((d) => ({ ...d, phone: v }))} autoComplete="tel" inputMode="tel" />
                            <Field label={t.date} type="date" value={details.date} onChange={(v) => setDetails((d) => ({ ...d, date: v }))} />
                            <Field label={t.functions} value={details.functions} onChange={(v) => setDetails((d) => ({ ...d, functions: v }))} />
                        </div>
                    </details>

                    <div className="mt-6 grid gap-2 print:hidden">
                        <button type="button" onClick={sendToStudio} disabled={!hasSomething || status === "sending"} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
                            <WhatsAppIcon className="h-4 w-4" />
                            {status === "sent" ? t.sent : status === "sending" ? t.sending : t.send}
                        </button>
                        <button type="button" onClick={shareWithFamily} disabled={!hasSomething} className="btn btn-outline w-full disabled:cursor-not-allowed disabled:opacity-50">
                            <Share2 className="h-4 w-4" aria-hidden /> {t.share}
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                            <button type="button" onClick={copyLink} disabled={!hasSomething} className="btn btn-outline whitespace-nowrap px-3 text-xs disabled:opacity-50">
                                <Link2 className="h-4 w-4" aria-hidden /> {t.copy}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    track("quote_pdf");
                                    window.print();
                                }}
                                disabled={!hasSomething}
                                className="btn btn-outline px-3 text-xs disabled:opacity-50"
                            >
                                <Download className="h-4 w-4" aria-hidden /> {t.pdf}
                            </button>
                        </div>
                    </div>
                    {status === "sent" && (
                        <p className="mt-3 text-center text-sm text-success" role="status">
                            {t.thanks}
                        </p>
                    )}
                    <p className="mt-4 hidden text-xs print:block">
                        {business.name} · {business.phones[0].display} · {business.email} · {SITE_URL}
                    </p>
                </div>
            </aside>

            {/* Mobile sticky total */}
            <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur-lg lg:hidden print:hidden">
                <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-foreground-muted">
                            {summary.pkg ? summary.pkg.name : t.addons}
                            {summary.lines.length > 0 && ` + ${summary.lines.length} ${summary.lines.length > 1 ? t.addonsCountPlural : t.addonsCount}`}
                        </p>
                        <p className="tabular text-xl font-semibold">{formatINR(summary.total)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className="btn btn-primary min-h-12 shrink-0 px-5"
                    >
                        {t.review} <ArrowDown className="h-4 w-4" aria-hidden />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {toast && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        role="status"
                        className="fixed inset-x-4 bottom-28 z-50 mx-auto max-w-sm rounded-xl bg-foreground px-4 py-3 text-center text-sm text-background shadow-xl lg:bottom-8"
                    >
                        {toast}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

function StepHeading({ n, id, title, hint }: { n: number; id: string; title: string; hint?: React.ReactNode }) {
    return (
        <div className="flex items-baseline justify-between gap-4">
            <h2 id={id} className="flex items-baseline gap-3 font-display text-2xl md:text-3xl">
                <span className="tabular font-sans text-sm font-semibold text-accent">0{n}</span>
                {title}
            </h2>
            {hint && <span className="text-sm">{hint}</span>}
        </div>
    );
}

function Line({ label, value, onRemove, removeLabel = "Remove" }: { label: string; value: number; onRemove?: () => void; removeLabel?: string }) {
    return (
        <div className="flex items-start justify-between gap-3">
            <dt className="flex items-start gap-1.5">
                {onRemove && (
                    <button type="button" onClick={onRemove} aria-label={`${removeLabel}: ${label}`} className="-ml-1 mt-px flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground-muted hover:text-sindoor print:hidden">
                        <X className="h-3.5 w-3.5" aria-hidden />
                    </button>
                )}
                {label}
            </dt>
            <dd className="tabular shrink-0">{formatINR(value)}</dd>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    type = "text",
    autoComplete,
    inputMode,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    autoComplete?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
    return (
        <label className="block text-sm">
            <span className="text-foreground-muted">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete={autoComplete}
                inputMode={inputMode}
                min={type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
                className="mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground outline-none focus:border-accent"
            />
        </label>
    );
}

function AddOnRow({
    addOn,
    qty,
    coverage,
    pkgName,
    onQty,
    locale,
}: {
    addOn: AddOn;
    qty: number;
    coverage: "full" | "partial" | "none";
    pkgName?: string;
    onQty: (q: number) => void;
    locale: Locale;
}) {
    const t = getDictionary(locale).builder;
    const tc = getDictionary(locale).common;
    const hi = locale === "hi";
    const name = hi ? addOn.nameHi : addOn.name;
    const max = maxQty(addOn);
    const included = coverage === "full";

    return (
        <li
            className={cn(
                "flex overflow-hidden rounded-2xl border bg-card transition-colors",
                qty > 0 && !included ? "border-accent ring-1 ring-accent/40" : "border-border",
                included && "bg-background-secondary"
            )}
        >
            <AddOnMedia addOn={addOn} className="w-28 shrink-0 sm:w-32" sizes="128px" compact />
            <div className="flex min-w-0 flex-1 flex-col p-4">
                <p className="font-medium leading-snug">{name}</p>
                <p className="mt-0.5 text-xs text-foreground-muted">{hi ? addOn.pitchHi : addOn.pitch}</p>
                {coverage === "partial" && pkgName && (
                    <p className="mt-1 text-xs text-success">
                        {pkgName} {addOn.feature === "ledWall" ? t.partialWall : t.partialDay}
                    </p>
                )}
                <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                    {included ? (
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
                            <Check className="h-4 w-4" aria-hidden /> {t.includedIn} {pkgName}
                        </span>
                    ) : (
                        <>
                            <span className="tabular text-sm font-semibold">
                                {formatINR(qty > 0 ? addOnPrice(addOn, qty) : addOnFromPrice(addOn))}
                                {addOn.pricing.type === "per-day" && qty <= 1 && <span className="font-normal text-foreground-muted"> {tc.perDay}</span>}
                            </span>
                            {qty === 0 ? (
                                <button
                                    type="button"
                                    onClick={() => onQty(1)}
                                    aria-label={`${tc.add} ${name}`}
                                    className="inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Plus className="h-4 w-4" aria-hidden /> {tc.add}
                                </button>
                            ) : max > 1 ? (
                                <div className="flex items-center gap-1 rounded-full border border-border" role="group" aria-label={`${name} ${t.quantity}`}>
                                    <button type="button" onClick={() => onQty(qty - 1)} aria-label={t.less} className="flex h-11 w-11 cursor-pointer items-center justify-center">
                                        <Minus className="h-4 w-4" aria-hidden />
                                    </button>
                                    <span className="tabular min-w-14 text-center text-sm" aria-live="polite">
                                        {qtyLabel(addOn, qty, locale)}
                                    </span>
                                    <button type="button" onClick={() => onQty(Math.min(qty + 1, max))} disabled={qty >= max} aria-label={t.more} className="flex h-11 w-11 cursor-pointer items-center justify-center disabled:opacity-30">
                                        <Plus className="h-4 w-4" aria-hidden />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onQty(0)}
                                    className="inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-full border border-accent px-4 text-sm font-medium text-accent"
                                    aria-label={`${tc.remove} ${name}`}
                                >
                                    <Check className="h-4 w-4" aria-hidden /> {tc.added}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </li>
    );
}

export function BuilderFallback() {
    return (
        <div className="container-custom">
            <div className="h-96 animate-pulse rounded-3xl bg-card" />
            <p className="sr-only">Loading quote builder…</p>
            <Link href="/packages" className="sr-only">
                See packages <ArrowRight />
            </Link>
        </div>
    );
}
