import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getJournalPosts } from "@/lib/content";
import type { Locale } from "@/i18n";

export async function JournalTeaser({ locale = "en" }: { locale?: Locale }) {
    const posts = (await getJournalPosts()).slice(0, 3);
    if (!posts.length) return null;
    const hi = locale === "hi";
    return (
        <section className="section-padding" aria-labelledby="journal-title">
            <div className="container-custom">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{hi ? "जर्नल" : "Journal"}</p>
                        <h2 id="journal-title" className="mt-4 font-display text-4xl font-medium md:text-5xl">
                            {hi ? "सीधे जवाब, शादी की योजना के लिए" : "Straight answers for planning"}
                        </h2>
                        {hi && <p className="mt-2 text-sm text-foreground-muted">लेख अंग्रेज़ी में हैं।</p>}
                    </div>
                    <Link href="/journal" className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-accent">
                        {hi ? "सभी लेख" : "All articles"} <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
                <ul className="mt-10 grid gap-6 md:grid-cols-3">
                    {posts.map((p) => (
                        <li key={p.slug}>
                            <Link href={`/journal/${p.slug}`} className="group block h-full">
                                {p.cover && (
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-background-secondary">
                                        <Image src={p.cover} alt={p.coverAlt || p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                )}
                                <h3 className="mt-4 font-display text-xl leading-snug group-hover:text-accent">{p.title}</h3>
                                {p.excerpt && <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{p.excerpt}</p>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
