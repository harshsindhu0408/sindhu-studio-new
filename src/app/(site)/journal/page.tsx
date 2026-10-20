import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getJournalPosts } from "@/lib/content";
import { business } from "@/data/business";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const title = "Wedding Planning Journal";
const description = `Honest guides from ${business.name}, ${business.address.locality}: wedding photography costs, muhurat dates, pre-wedding locations, what to ask your photographer, and more.`;

export const metadata: Metadata = { title, description, alternates: { canonical: "/journal" }, openGraph: { title, description, url: "/journal" } };

export default async function JournalIndex() {
    const posts = await getJournalPosts();
    return (
        <div className="pb-24 pt-28 md:pt-36">
            <JsonLd data={breadcrumbSchema([{ name: "Journal", path: "/journal" }])} />
            <header className="container-custom max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Journal</p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">Plan smarter, with straight answers</h1>
                <p className="mt-4 text-lg text-foreground-muted">{description}</p>
            </header>
            {posts.length === 0 ? (
                <p className="container-custom mt-12 text-foreground-muted">New articles are on the way.</p>
            ) : (
                <ul className="container-custom mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((p) => (
                        <li key={p.slug}>
                            <Link href={`/journal/${p.slug}`} className="group block h-full overflow-hidden rounded-3xl border border-border bg-card">
                                {p.cover && (
                                    <div className="relative aspect-[16/10]">
                                        <Image src={p.cover} alt={p.coverAlt || p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <p className="text-xs uppercase tracking-wider text-foreground-muted">
                                        {p.date && new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                                    </p>
                                    <h2 className="mt-2 font-display text-2xl group-hover:text-accent">{p.title}</h2>
                                    {p.excerpt && <p className="mt-2 text-sm text-foreground-muted">{p.excerpt}</p>}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
