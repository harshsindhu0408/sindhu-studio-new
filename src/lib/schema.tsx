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
            "Premium photography studio specializing in wedding, pre-wedding, maternity, and portrait photography in Mumbai, India.",
        url: "https://sindhustudio.com",
        telephone: "+91-98765-43210",
        email: "hello@sindhustudio.com",
        address: {
            "@type": "PostalAddress",
            streetAddress: "123 Creative Lane, Photography District",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            postalCode: "400001",
            addressCountry: "IN",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 19.076,
            longitude: 72.8777,
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
            "Premium photography studio capturing life's most precious moments with artistry and passion since 2009.",
        founder: {
            "@type": "Person",
            name: "Rajesh Sindhu",
        },
        foundingDate: "2009",
        sameAs: [
            "https://www.instagram.com/sindhustudio",
            "https://www.facebook.com/sindhustudio",
            "https://www.youtube.com/sindhustudio",
        ],
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
