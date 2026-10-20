/**
 * JSON-LD generators. Everything comes from src/data so the schema can never
 * disagree with what the page says.
 */
import { business, fullAddress, primaryPhone, SITE_URL } from "@/data/business";
import { packages, lowestPrice, highestPrice, type Package } from "@/data/packages";
import { addOns, addOnFromPrice } from "@/data/addons";
import { featuredMedia, type MediaItem } from "@/data/media";

const ORG_ID = `${SITE_URL}/#business`;
const SITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/about#founder`;

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

function packageOffer(pkg: Package) {
    return {
        "@type": "Offer",
        name: `${pkg.name} wedding photography package`,
        price: pkg.price,
        priceCurrency: "INR",
        url: `${SITE_URL}/packages#${pkg.id}`,
        availability: "https://schema.org/InStock",
        itemOffered: {
            "@type": "Service",
            name: `${pkg.name} Wedding Photography Package`,
            description: `${pkg.summary} Includes: ${pkg.highlights.join(", ")}.`,
            serviceType: "Wedding photography and videography",
            provider: { "@id": ORG_ID },
        },
    };
}

export function businessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": ORG_ID,
        name: business.name,
        legalName: business.legalName,
        alternateName: business.alternateNames,
        description: business.description,
        url: SITE_URL,
        logo: `${SITE_URL}/icon`,
        image: featuredMedia.slice(0, 6).map((m) => abs(m.src)),
        telephone: primaryPhone.tel,
        email: business.email,
        priceRange: `₹${lowestPrice.toLocaleString("en-IN")} – ₹${highestPrice.toLocaleString("en-IN")}`,
        currenciesAccepted: "INR",
        paymentAccepted: "UPI, Bank transfer, Cash, Card",
        foundingDate: String(business.foundingYear),
        founder: { "@type": "Person", "@id": FOUNDER_ID, name: business.founder.name, jobTitle: business.founder.jobTitle },
        address: {
            "@type": "PostalAddress",
            streetAddress: business.address.street,
            addressLocality: business.address.locality,
            addressRegion: business.address.region,
            postalCode: business.address.postalCode,
            addressCountry: business.address.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
        hasMap: business.mapsUrl,
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: business.hours.days,
                opens: business.hours.opens,
                closes: business.hours.closes,
            },
        ],
        areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
        knowsAbout: [
            "Wedding photography",
            "Candid photography",
            "Cinematic wedding films",
            "Pre-wedding shoots",
            "Drone photography",
            "Haldi and mehendi photography",
            "LED screen rental for weddings",
        ],
        sameAs: Object.values(business.socials),
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Wedding photography packages and add-ons",
            itemListElement: [
                {
                    "@type": "OfferCatalog",
                    name: "Wedding packages",
                    itemListElement: packages.map(packageOffer),
                },
                {
                    "@type": "OfferCatalog",
                    name: "Add-ons",
                    itemListElement: addOns.map((a) => ({
                        "@type": "Offer",
                        name: a.name,
                        price: addOnFromPrice(a),
                        priceCurrency: "INR",
                        url: `${SITE_URL}/add-ons#${a.id}`,
                        itemOffered: { "@type": "Service", name: a.name, description: a.description, provider: { "@id": ORG_ID } },
                    })),
                },
            ],
        },
    };
}

export function websiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: business.name,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
    };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: abs(item.path),
        })),
    };
}

export function faqSchema(items: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.question,
            acceptedAnswer: { "@type": "Answer", text: i.answer },
        })),
    };
}

export function packagesSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: `Wedding photography packages, ${business.address.locality}`,
        url: `${SITE_URL}/packages`,
        provider: { "@id": ORG_ID },
        itemListElement: packages.map(packageOffer),
    };
}

/** ImageObject with licence info: eligible for the "Licensable" badge in Google Images. */
export function imageObject(m: MediaItem) {
    return {
        "@type": "ImageObject",
        contentUrl: abs(m.src),
        width: m.width,
        height: m.height,
        caption: m.alt,
        creator: { "@id": ORG_ID },
        creditText: business.name,
        copyrightNotice: `© ${business.name}, ${business.address.locality}`,
        license: `${SITE_URL}/terms#copyright`,
        acquireLicensePage: `${SITE_URL}/contact`,
    };
}

export function gallerySchema(name: string, description: string, path: string, items: MediaItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name,
        description,
        url: abs(path),
        author: { "@id": ORG_ID },
        image: items.map(imageObject),
    };
}

export function videoSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "Wedding teaser by Sindhu Studio",
        description: `A wedding teaser filmed by ${business.name}, ${business.address.locality}: drone shots of the venue, haldi, baraat and pheras.`,
        thumbnailUrl: abs("/films/teaser-poster.webp"),
        contentUrl: abs("/films/teaser-720.mp4"),
        uploadDate: "2026-01-02",
        duration: "PT1M12S",
        publisher: { "@id": ORG_ID },
    };
}

export function personSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": FOUNDER_ID,
        name: business.founder.name,
        jobTitle: business.founder.jobTitle,
        worksFor: { "@id": ORG_ID },
        address: { "@type": "PostalAddress", addressLocality: business.address.locality, addressRegion: business.address.region, addressCountry: "IN" },
    };
}

export { fullAddress };

/** Renders a JSON-LD script tag. `<` is escaped so content can never close the tag. */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}
