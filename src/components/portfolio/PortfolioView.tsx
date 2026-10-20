import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Gallery } from "./Gallery";
import { media, mediaCategories, type MediaCategory, type MediaItem } from "@/data/media";
import { cn } from "@/lib/utils";

export function PortfolioView({ active, items, title, intro }: { active: MediaCategory | null; items: MediaItem[]; title: string; intro: string }) {
    return (
        <div className="min-h-screen pb-20 pt-28 md:pt-36">
            <header className="container-custom mb-10 text-center">
                <div className="mx-auto max-w-2xl">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">Portfolio</p>
                    <h1 className="font-display text-4xl font-medium tracking-tight md:text-6xl">{title}</h1>
                    <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{intro}</p>
                </div>
            </header>

            <nav aria-label="Portfolio categories" className="container-custom mb-10">
                <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:flex-wrap md:justify-center md:px-0">
                    <li>
                        <Link
                            href="/portfolio"
                            aria-current={active === null ? "page" : undefined}
                            className={cn(
                                "inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-5 text-sm transition-colors",
                                active === null ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"
                            )}
                        >
                            All <span className="tabular ml-1.5">{media.length}</span>
                        </Link>
                    </li>
                    {mediaCategories.map((c) => {
                        const count = media.filter((m) => m.category === c.id).length;
                        return (
                            <li key={c.id}>
                                <Link
                                    href={`/portfolio/${c.id}`}
                                    aria-current={active === c.id ? "page" : undefined}
                                    className={cn(
                                        "inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-5 text-sm transition-colors",
                                        active === c.id ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"
                                    )}
                                >
                                    {c.label} <span className="tabular ml-1.5">{count}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <section className="container-custom" aria-label={`${title} photos`}>
                <Gallery items={items} />
            </section>

            <section className="mt-24 border-t border-border/40 py-20 text-center">
                <div className="container-custom">
                    <h2 className="mb-4 font-display text-4xl md:text-5xl">Want your wedding to look like this?</h2>
                    <p className="mx-auto mb-8 max-w-xl text-foreground-muted">See exactly what each package includes and build your quote in a minute.</p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href="/build" className="btn btn-primary">
                            Build my quote <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <Link href="/packages" className="btn btn-outline">
                            Compare packages
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
