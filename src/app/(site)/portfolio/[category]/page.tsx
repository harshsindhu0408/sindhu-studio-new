import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { mediaByCategory, mediaCategories, type MediaCategory } from "@/data/media";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";
import { JsonLd, breadcrumbSchema, gallerySchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
    return mediaCategories.map((c) => ({ category: c.id }));
}

function getCategory(id: string) {
    return mediaCategories.find((c) => c.id === id);
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const cat = getCategory(category);
    if (!cat) return {};
    const title = `${cat.title} in ${business.address.locality}, Haryana`;
    const description = `${cat.description} Photographed by ${business.name}, ${business.address.locality}, Haryana.`;
    const cover = mediaByCategory(cat.id)[0];
    return {
        title,
        description,
        alternates: { canonical: `/portfolio/${cat.id}`, ...languageAlternates(`/portfolio/${cat.id}`) },
        openGraph: { title, description, url: `/portfolio/${cat.id}`, images: cover ? [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] : undefined },
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const cat = getCategory(category);
    if (!cat) notFound();
    const items = mediaByCategory(cat.id as MediaCategory);

    return (
        <>
            <JsonLd data={gallerySchema(cat.title, cat.description, `/portfolio/${cat.id}`, items)} />
            <JsonLd
                data={breadcrumbSchema([
                    { name: "Portfolio", path: "/portfolio" },
                    { name: cat.title, path: `/portfolio/${cat.id}` },
                ])}
            />
            <PortfolioView active={cat.id} items={items} title={cat.title} intro={cat.description} />
        </>
    );
}
