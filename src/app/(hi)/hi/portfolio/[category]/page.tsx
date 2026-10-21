import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { mediaByCategory, mediaCategories, type MediaCategory } from "@/data/media";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
    return mediaCategories.map((c) => ({ category: c.id }));
}

const getCategory = (id: string) => mediaCategories.find((c) => c.id === id);

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const cat = getCategory(category);
    if (!cat) return {};
    const title = `${cat.titleHi}, रोहतक, हरियाणा`;
    const description = `${cat.descriptionHi} ${business.name}, रोहतक द्वारा खींची गई फोटो।`;
    const cover = mediaByCategory(cat.id)[0];
    return {
        title,
        description,
        alternates: { canonical: `/hi/portfolio/${cat.id}`, ...languageAlternates(`/portfolio/${cat.id}`) },
        openGraph: { title, description, url: `/hi/portfolio/${cat.id}`, locale: "hi_IN", images: cover ? [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] : undefined },
    };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const cat = getCategory(category);
    if (!cat) notFound();
    return <PortfolioView locale="hi" active={cat.id} items={mediaByCategory(cat.id as MediaCategory)} title={cat.titleHi} intro={cat.descriptionHi} />;
}
