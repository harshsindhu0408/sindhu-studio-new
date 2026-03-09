/**
 * JSON-LD Schema generators for SEO
 */

export interface LocalBusinessSchema {
    "@context": "https://schema.org";
    "@type": "LocalBusiness";
    "@id": string;
    name: string;
    image: string[];
    description: string;
    url: string;
    telephone: string;
    email: string;
    address: {
        "@type": "PostalAddress";
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    geo: {
        "@type": "GeoCoordinates";
        latitude: number;
        longitude: number;
    };
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification";
        dayOfWeek: string[];
        opens: string;
        closes: string;
    }[];
    priceRange: string;
    sameAs: string[];
}

export function getLocalBusinessSchema(): LocalBusinessSchema {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://sindhustudio.com",
        name: "Sindhu Studio",
        image: [
            "https://sindhustudio.com/images/studio-1.jpg",
            "https://sindhustudio.com/images/studio-2.jpg",
        ],
        description:
            "Premium photography studio specializing in wedding, pre-wedding, maternity, and portrait photography in Rohtak, India.",
        url: "https://sindhustudio.com",
        telephone: "+91-94163-70132",
        email: "sindhustudiorohtak@gmail.com",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Shop no. 17, Sindhu Digital Studio, Delhi Road, opp. Balmev plaza, Dev Colony, Rohtak, Haryana, India",
            addressLocality: "Rohtak",
            addressRegion: "Haryana",
            postalCode: "124001",
            addressCountry: "IN",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 28.8955,
            longitude: 76.6066,
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "10:00",
                closes: "19:00",
            },
        ],
        priceRange: "₹₹₹",
        sameAs: [
            "https://www.instagram.com/sindhustudio",
            "https://www.facebook.com/sindhustudio",
            "https://www.youtube.com/sindhustudio",
        ],
    };
}

export interface PhotographyServiceSchema {
    "@context": "https://schema.org";
    "@type": "Service";
    name: string;
    description: string;
    provider: {
        "@type": "LocalBusiness";
        name: string;
        url: string;
    };
    serviceType: string;
    areaServed: {
        "@type": "Country";
        name: string;
    };
}

export function getPhotographyServiceSchema(
    serviceName: string,
    description: string,
    serviceType: string
): PhotographyServiceSchema {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceName,
        description,
        provider: {
            "@type": "LocalBusiness",
            name: "Sindhu Studio",
            url: "https://sindhustudio.com",
        },
        serviceType,
        areaServed: {
            "@type": "Country",
            name: "India",
        },
    };
}

export interface OrganizationSchema {
    "@context": "https://schema.org";
    "@type": "Organization";
    name: string;
    url: string;
    logo: string;
    description: string;
    founder: {
        "@type": "Person";
        name: string;
    };
    foundingDate: string;
    sameAs: string[];
}

export function getOrganizationSchema(): OrganizationSchema {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Sindhu Studio",
        url: "https://sindhustudio.com",
        logo: "https://sindhustudio.com/logo.png",
        description:
            "Premium photography studio capturing life's most precious moments with artistry and passion since 2000.",
        founder: {
            "@type": "Person",
            name: "Krishan Sindhu",
        },
        foundingDate: "2000",
        sameAs: [
            "https://www.instagram.com/sindhustudio",
            "https://www.facebook.com/sindhustudio",
            "https://www.youtube.com/@sindhustudiorohtak",
        ],
    };
}

export function getProductSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            {
                "@type": "Product",
                "name": "Silver Package - Wedding Essential",
                "description": "2 Day Coverage, Candid & Traditional Photography, High Resolution Digital Files.",
                "brand": { "@type": "Brand", "name": "Sindhu Studio" },
                "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
            },
            {
                "@type": "Product",
                "name": "Gold Package - Cinematic Premium",
                "description": "3 Day Coverage, Pre-wedding shoot, Drone coverage, Cinematic Film.",
                "brand": { "@type": "Brand", "name": "Sindhu Studio" },
                "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
            },
            {
                "@type": "Product",
                "name": "Platinum Package - The Royal Edit",
                "description": "Complete wedding coverage, luxury albums, same-day edit, dedicated senior team.",
                "brand": { "@type": "Brand", "name": "Sindhu Studio" },
                "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
            }
        ]
    };
}

export function getImageGallerySchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Sindhu Studio Best Wedding Photos",
        "description": "A curated collection of our finest wedding, pre-wedding, and portrait photography from Rohtak and across India.",
        "provider": { "@type": "LocalBusiness", "name": "Sindhu Studio" }
    };
}

/**
 * Generates a script tag with JSON-LD data
 */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
