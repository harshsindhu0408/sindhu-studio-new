import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { servicesHi } from "@/data/services.hi";
import { getMedia } from "@/data/media";
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
    const h = servicesHi[s.slug];
    const title = `रोहतक में ${s.nameHi}`;
    const img = s.image.media ? getMedia(s.image.media).src : s.image.src;
    return {
        title,
        description: h.answer.slice(0, 158),
        alternates: { canonical: `/hi/services/${s.slug}`, ...languageAlternates(`/services/${s.slug}`) },
        openGraph: { title, description: h.answer, url: `/hi/services/${s.slug}`, locale: "hi_IN", images: img ? [{ url: img, alt: h.imageAlt }] : undefined },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const s = getService(slug);
    if (!s) notFound();
    return <ServicePage service={s} locale="hi" />;
}
