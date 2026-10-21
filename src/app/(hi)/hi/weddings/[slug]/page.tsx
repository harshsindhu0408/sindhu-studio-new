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
    const title = `${w.title}: ${w.city} की शादी`;
    const description = `${w.city}${w.venue ? `, ${w.venue}` : ""} में ${w.title} की शादी, ${business.name} द्वारा खींची गई।`;
    return { title, description, alternates: { canonical: `/hi/weddings/${slug}`, ...languageAlternates(`/weddings/${slug}`) }, openGraph: { type: "article", title, description, locale: "hi_IN", images: [{ url: w.cover, alt: w.coverAlt }] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const w = await getWedding(slug);
    if (!w) notFound();
    return <WeddingStory wedding={w} locale="hi" />;
}
