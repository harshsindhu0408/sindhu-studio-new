import Link from "next/link";
import Image from "next/image";
import { getWedding, renderMarkdoc } from "@/lib/content";
import { SITE_URL } from "@/data/business";
import { localePath, type Locale } from "@/i18n";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { weddingsCopy } from "./WeddingsIndex";

type Wedding = NonNullable<Awaited<ReturnType<typeof getWedding>>>;

export function WeddingStory({ wedding: w, locale = "en" }: { wedding: Wedding; locale?: Locale }) {
    const c = weddingsCopy[locale];
    const hi = locale === "hi";
    const L = (p: string) => localePath(locale, p);
    return (
        <article className="pb-24">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    headline: `${w.title}: ${w.city} wedding`,
                    datePublished: w.date,
                    image: [w.cover, ...w.gallery.map((g) => g.image)].map((src) => `${SITE_URL}${src}`),
                    author: { "@id": `${SITE_URL}/#business` },
                    contentLocation: { "@type": "Place", name: w.venue || w.city, address: { "@type": "PostalAddress", addressLocality: w.city, addressCountry: "IN" } },
                }}
            />
            {!hi && <JsonLd data={breadcrumbSchema([{ name: "Real Weddings", path: "/weddings" }, { name: w.title, path: `/weddings/${w.slug}` }])} />}
            <section className="relative flex min-h-[75svh] items-end overflow-hidden pb-14 pt-32">
                <Image src={w.cover} alt={w.coverAlt} fill priority sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/40 to-transparent" />
                <div className="container-custom relative text-[#F5EFE6]">
                    <Link href={L("/weddings")} className="text-sm text-[#E8C785] hover:underline">
                        ← {c.back}
                    </Link>
                    <h1 className="mt-3 font-display text-5xl md:text-7xl">{w.title}</h1>
                    <p className="mt-3 text-[#F5EFE6]/80">
                        {w.city}
                        {w.venue ? ` · ${w.venue}` : ""} · {w.functions.map((f) => c.functions[f] ?? f).join(" · ")}
                    </p>
                </div>
            </section>
            {hi && <p className="container-custom mt-8 max-w-3xl text-sm text-foreground-muted">{c.storyNote}</p>}
            <div lang={hi ? "en" : undefined} className="prose-studio container-custom mt-12 max-w-3xl">
                {renderMarkdoc(w.node)}
            </div>
            {w.gallery.length > 0 && (
                <ul className="container-custom mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
                    {w.gallery.map((g) => (
                        <li key={g.image} className="break-inside-avoid overflow-hidden rounded-2xl">
                            <Image src={g.image} alt={g.alt || w.title} width={1200} height={1500} sizes="(max-width: 640px) 100vw, 33vw" className="h-auto w-full" />
                        </li>
                    ))}
                </ul>
            )}
            <aside className="container-custom mt-14 max-w-3xl rounded-3xl border border-accent/40 bg-accent/[0.06] p-6">
                <p className="font-display text-xl">{c.chose(w.title, w.packageName)}</p>
                <Link href={L("/packages")} className="mt-2 inline-block text-accent hover:underline">
                    {c.compare} →
                </Link>
            </aside>
        </article>
    );
}
