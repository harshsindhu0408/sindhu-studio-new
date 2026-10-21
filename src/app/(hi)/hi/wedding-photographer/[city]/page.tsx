import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCity, cityHasProof } from "@/data/cities";
import { lowestPrice } from "@/data/packages";
import { business } from "@/data/business";
import { formatINR } from "@/lib/quote";
import { languageAlternates } from "@/i18n";
import { CityPage } from "@/components/city/CityPage";

export const dynamicParams = false;

export function generateStaticParams() {
    return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city } = await params;
    const c = getCity(city);
    if (!c) return {};
    const title = `${c.nameHi} में शादी फोटोग्राफर`;
    const description = `${business.name} ${c.nameHi} में शादियां कवर करता है${c.distanceKm ? `, रोहतक स्टूडियो से लगभग ${c.distanceKm} किमी` : ""}। ${formatINR(lowestPrice)} से शुरू पैकेज, कैंडिड, सिनेमैटिक फ़िल्म, ड्रोन और LED स्क्रीन के साथ। दाम देखें और अपना कोटेशन बनाएं।`;
    return {
        title,
        description,
        alternates: { canonical: `/hi/wedding-photographer/${c.slug}`, ...languageAlternates(`/wedding-photographer/${c.slug}`) },
        // Thin city pages are doorway pages: keep them out of Google until there's real local proof
        robots: cityHasProof(c) ? undefined : { index: false, follow: true },
        openGraph: { title, description, url: `/hi/wedding-photographer/${c.slug}`, locale: "hi_IN" },
    };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const c = getCity(city);
    if (!c) notFound();
    return <CityPage city={c} locale="hi" />;
}
