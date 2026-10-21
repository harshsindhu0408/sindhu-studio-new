import type { Metadata } from "next";
import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { media } from "@/data/media";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";
import { JsonLd, breadcrumbSchema, gallerySchema } from "@/lib/schema";

const title = `Wedding Photography Portfolio: ${business.address.locality}, Haryana`;
const description = `Bridal portraits, varmala and sindoor moments, haldi, mehendi and couple shoots photographed by ${business.name}, ${business.address.locality}. ${media.length} photos from real Haryana weddings, with no stock images.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/portfolio", ...languageAlternates("/portfolio") },
    openGraph: { title, description, url: "/portfolio" },
};

// Featured first, then the rest, so the strongest work leads
const ordered = [...media.filter((m) => m.featured), ...media.filter((m) => !m.featured)];

export default function PortfolioPage() {
    return (
        <>
            <JsonLd data={gallerySchema(title, description, "/portfolio", ordered)} />
            <JsonLd data={breadcrumbSchema([{ name: "Portfolio", path: "/portfolio" }])} />
            <PortfolioView
                active={null}
                items={ordered}
                title="Real weddings, real families"
                intro="Every photo here was taken by our team at weddings across Haryana. Tap any photo to view it full screen."
            />
        </>
    );
}
