import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWedding, getWeddings } from "@/lib/content";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";
import { WeddingStory } from "@/components/weddings/WeddingStory";

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
    return { title, description, alternates: { canonical: `/weddings/${slug}`, ...languageAlternates(`/weddings/${slug}`) }, openGraph: { type: "article", title, description, images: [{ url: w.cover, alt: w.coverAlt }] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const w = await getWedding(slug);
    if (!w) notFound();
    return <WeddingStory wedding={w} locale="en" />;
}
