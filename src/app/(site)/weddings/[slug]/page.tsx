import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWedding, getWeddings, renderMarkdoc } from "@/lib/content";
import { business, SITE_URL } from "@/data/business";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const dynamicParams = false;

export async function generateStaticParams() {
    const weddings = await getWeddings();
    return weddings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const w = await getWedding(slug);
    if (!w) return {};
    const title = `${w.title}: ${w.city} wedding`;
    const description = `${w.title}'s wedding in ${w.city}${w.venue ? ` at ${w.venue}` : ""}, photographed by ${business.name}.`;
    return { title, description, alternates: { canonical: `/weddings/${slug}` }, openGraph: { type: "article", title, description, images: [{ url: w.cover, alt: w.coverAlt }] } };
}

export default async function WeddingStory({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const w = await getWedding(slug);
    if (!w) notFound();

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
            <JsonLd data={breadcrumbSchema([{ name: "Real Weddings", path: "/weddings" }, { name: w.title, path: `/weddings/${slug}` }])} />
            <section className="relative flex min-h-[75svh] items-end overflow-hidden pb-14 pt-32">
                <Image src={w.cover} alt={w.coverAlt} fill priority sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/40 to-transparent" />
                <div className="container-custom relative text-[#F5EFE6]">
                    <Link href="/weddings" className="text-sm text-[#E8C785] hover:underline">
                        ← Real weddings
                    </Link>
                    <h1 className="mt-3 font-display text-5xl md:text-7xl">{w.title}</h1>
                    <p className="mt-3 text-[#F5EFE6]/80">
                        {w.city}
                        {w.venue ? ` · ${w.venue}` : ""} · {w.functions.join(" · ")}
                    </p>
                </div>
            </section>
            <div className="prose-studio container-custom mt-12 max-w-3xl">{renderMarkdoc(w.node)}</div>
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
                <p className="font-display text-xl">
                    {w.title} chose the {w.packageName} package.
                </p>
                <Link href="/packages" className="mt-2 inline-block text-accent hover:underline">
                    Compare packages →
                </Link>
            </aside>
        </article>
    );
}
