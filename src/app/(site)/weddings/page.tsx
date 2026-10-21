import type { Metadata } from "next";
import { WeddingsIndex, weddingsCopy } from "@/components/weddings/WeddingsIndex";
import { languageAlternates } from "@/i18n";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const title = "Real Weddings";
const { description } = weddingsCopy.en;

export const metadata: Metadata = { title, description, alternates: { canonical: "/weddings", ...languageAlternates("/weddings") }, openGraph: { title, description, url: "/weddings" } };

export default function Page() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: "Real Weddings", path: "/weddings" }])} />
            <WeddingsIndex locale="en" />
        </>
    );
}
