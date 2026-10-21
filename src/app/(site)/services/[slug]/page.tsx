import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { getMedia } from "@/data/media";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";
import { ServicePage } from "@/components/services/ServicePage";

export const dynamicParams = false;

export function generateStaticParams() {
    return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const s = getService(slug);
    if (!s) return {};
    const title = `${s.name} in ${business.address.locality}`;
    const img = s.image.media ? getMedia(s.image.media).src : s.image.src;
    return {
        title,
        description: s.answer.slice(0, 158),
        alternates: { canonical: `/services/${s.slug}`, ...languageAlternates(`/services/${s.slug}`) },
        openGraph: { title, description: s.answer, url: `/services/${s.slug}`, images: img ? [{ url: img, alt: s.image.alt }] : undefined },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const s = getService(slug);
    if (!s) notFound();
    return <ServicePage service={s} locale="en" />;
}
