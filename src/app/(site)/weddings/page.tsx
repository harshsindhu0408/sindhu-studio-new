import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getWeddings } from "@/lib/content";
import { business } from "@/data/business";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const title = "Real Weddings";
const description = `Real weddings photographed by ${business.name}: the functions, the venue and the moments, shared with the couples' permission.`;

export const metadata: Metadata = { title, description, alternates: { canonical: "/weddings" }, openGraph: { title, description, url: "/weddings" } };

export default async function WeddingsIndex() {
    const weddings = await getWeddings();
    return (
        <div className="pb-24 pt-28 md:pt-36">
            <JsonLd data={breadcrumbSchema([{ name: "Real Weddings", path: "/weddings" }])} />
            <header className="container-custom max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Real weddings</p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">Stories from real families</h1>
                <p className="mt-4 text-lg text-foreground-muted">{description}</p>
            </header>
            {weddings.length === 0 ? (
                <div className="container-custom mt-12 max-w-3xl rounded-3xl border border-border bg-card p-8">
                    <p className="font-display text-2xl">The first stories are being written.</p>
                    <p className="mt-2 text-foreground-muted">Meanwhile, see our portfolio from real Haryana weddings.</p>
                    <Link href="/portfolio" className="btn btn-primary mt-6">
                        See the portfolio <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            ) : (
                <ul className="container-custom mt-12 grid gap-6 md:grid-cols-2">
                    {weddings.map((w) => (
                        <li key={w.slug}>
                            <Link href={`/weddings/${w.slug}`} className="group block overflow-hidden rounded-3xl bg-background-secondary">
                                <div className="relative aspect-[4/3]">
                                    <Image src={w.cover} alt={w.coverAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                        <p className="text-xs uppercase tracking-wider text-white/75">
                                            {w.city}
                                            {w.venue ? ` · ${w.venue}` : ""}
                                        </p>
                                        <h2 className="mt-1 font-display text-3xl">{w.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
