import Link from "next/link";
import { Link2, Printer } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PrintButton } from "./PrintButton";

export interface LegalSection {
    id: string;
    title: string;
    /** 1–3 bullets in plain words, shown in a box before the full text */
    summary?: string[];
    body: React.ReactNode;
}

export function LegalPage({
    title,
    path,
    updated,
    intro,
    inShort,
    sections,
    related,
    after,
}: {
    title: string;
    path: string;
    updated: string;
    intro: React.ReactNode;
    inShort: string[];
    sections: LegalSection[];
    related: { label: string; href: string }[];
    after?: React.ReactNode;
}) {
    return (
        <div className="pb-24 pt-28 md:pt-36">
            <JsonLd data={breadcrumbSchema([{ name: title, path }])} />
            <div className="container-custom grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
                {/* Table of contents */}
                <aside className="print:hidden">
                    <details className="group rounded-2xl border border-border p-4 lg:hidden">
                        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-medium [&::-webkit-details-marker]:hidden">
                            On this page
                            <span className="text-foreground-muted transition-transform group-open:rotate-180">▾</span>
                        </summary>
                        <Toc sections={sections} />
                    </details>
                    <nav aria-label="On this page" className="sticky top-28 hidden lg:block">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">On this page</p>
                        <Toc sections={sections} />
                        <div className="mt-8 border-t border-border pt-6">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground-muted">Related</p>
                            <ul className="mt-3 space-y-2 text-sm">
                                {related.map((r) => (
                                    <li key={r.href}>
                                        <Link href={r.href} className="text-foreground-muted hover:text-accent">
                                            {r.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </aside>

                <article className="min-w-0 max-w-3xl">
                    <header>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Legal</p>
                        <h1 className="mt-3 font-display text-4xl md:text-6xl">{title}</h1>
                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground-muted">
                            <span>Last updated {updated}</span>
                            <PrintButton>
                                <Printer className="h-4 w-4" aria-hidden /> Print / save PDF
                            </PrintButton>
                        </div>
                        <div className="mt-6 text-lg leading-relaxed text-foreground-muted">{intro}</div>
                    </header>

                    <section aria-labelledby="in-short" className="mt-8 rounded-2xl border border-accent/40 bg-accent/[0.06] p-6">
                        <h2 id="in-short" className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-accent">
                            In short
                        </h2>
                        <ul className="mt-3 space-y-2">
                            {inShort.map((s) => (
                                <li key={s} className="flex gap-3 leading-relaxed">
                                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {sections.map((s, i) => (
                        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-14 scroll-mt-28">
                            <h2 id={`${s.id}-h`} className="group flex items-baseline gap-3 font-display text-2xl md:text-3xl">
                                <span className="tabular font-sans text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                                {s.title}
                                <a href={`#${s.id}`} className="opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 print:hidden" aria-label={`Link to ${s.title}`}>
                                    <Link2 className="h-4 w-4 text-foreground-muted" aria-hidden />
                                </a>
                            </h2>
                            {s.summary && (
                                <div className="mt-4 rounded-xl bg-background-secondary p-4 text-sm">
                                    <p className="font-semibold">In plain words</p>
                                    <ul className="mt-1 list-disc space-y-1 pl-5 text-foreground-muted">
                                        {s.summary.map((x) => (
                                            <li key={x}>{x}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="legal-body mt-5 space-y-4 leading-relaxed text-foreground-muted">{s.body}</div>
                        </section>
                    ))}

                    {after}
                </article>
            </div>
        </div>
    );
}

function Toc({ sections }: { sections: LegalSection[] }) {
    return (
        <ol className="mt-3 space-y-1 text-sm">
            {sections.map((s, i) => (
                <li key={s.id}>
                    <a href={`#${s.id}`} className="flex min-h-9 items-center gap-2 text-foreground-muted hover:text-accent">
                        <span className="tabular text-xs">{String(i + 1).padStart(2, "0")}</span>
                        {s.title}
                    </a>
                </li>
            ))}
        </ol>
    );
}

/** Simple, readable table for data/purpose/retention and tiers */
export function LegalTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
    return (
        <>
            {/* Phones: each row as a card, so no column is hidden off-screen */}
            <div className="space-y-3 md:hidden print:hidden">
                {rows.map((r, i) => (
                    <dl key={i} className="rounded-xl border border-border p-4 text-sm">
                        {r.map((c, j) => (
                            <div key={j} className={j ? "mt-2" : undefined}>
                                <dt className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">{head[j]}</dt>
                                <dd className="mt-0.5 text-foreground">{c}</dd>
                            </div>
                        ))}
                    </dl>
                ))}
            </div>
            <LegalTableWide head={head} rows={rows} />
        </>
    );
}

function LegalTableWide({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
    return (
        <div className="hidden overflow-x-auto rounded-xl border border-border md:block print:block">
            <table className="w-full text-left text-sm">
                <thead className="bg-background-secondary text-foreground">
                    <tr>
                        {head.map((h) => (
                            <th key={h} scope="col" className="px-4 py-3 font-semibold">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className="border-t border-border align-top">
                            {r.map((c, j) => (
                                <td key={j} className="px-4 py-3">
                                    {c}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
