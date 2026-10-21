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
    const title = `Wedding Photographer in ${c.name}`;
    const description = `${business.name} covers weddings in ${c.name}${c.distanceKm ? `, about ${c.distanceKm} km from our Rohtak studio` : ""}. Packages from ${formatINR(lowestPrice)} with candid, cinematic films, drone and LED screens. See prices and build your quote.`;
    return {
        title,
        description,
        alternates: { canonical: `/wedding-photographer/${c.slug}`, ...languageAlternates(`/wedding-photographer/${c.slug}`) },
        // Thin city pages are doorway pages: keep them out of Google until there's real local proof
        robots: cityHasProof(c) ? undefined : { index: false, follow: true },
        openGraph: { title, description, url: `/wedding-photographer/${c.slug}` },
    };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const c = getCity(city);
    if (!c) notFound();
    return <CityPage city={c} locale="en" />;
}
