import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wedding Packages & Pricing | Sindhu Studio Rohtak",
    description: "Explore our transparent wedding photography packages. From budget-friendly options to premium cinematic experiences in Rohtak and Delhi NCR. Book your date today.",
    keywords: [
        "wedding photography prices rohtak",
        "pre-wedding shoot cost",
        "wedding photographer packages haryana",
        "affordable wedding photographers rohtak",
        "premium wedding photography rates",
        "Sindhu Studio pricing"
    ],
    openGraph: {
        title: "Wedding Photography Packages | Sindhu Studio Rohtak",
        description: "Transparent pricing for clear memories. Check out our Silver, Gold, and Platinum wedding packages.",
        url: "https://sindhustudio.com/pricing",
        images: [
            {
                url: "/images/pricing-bg.jpg", // Assuming generic fallback or specific
                width: 1200,
                height: 630,
                alt: "Sindhu Studio Packages",
            },
        ],
    },
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
