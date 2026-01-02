import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio | Sindhu Studio - Best Wedding Photographers in Rohtak",
    description: "Browse our gallery of stunning wedding, pre-wedding, and portrait photography. Capturing real emotions and timeless moments in Rohtak and beyond.",
    keywords: [
        "wedding portfolio",
        "candid wedding photography gallery",
        "pre-wedding photoshoot samples",
        "best wedding photos rohtak",
        "Sindhu Studio gallery",
        "cinematic wedding films"
    ],
    openGraph: {
        title: "Our Portfolio | Sindhu Studio",
        description: "Witness the magic of love through our lens. View our latest wedding and portrait work.",
        url: "https://sindhustudio.com/portfolio",
        images: [
            {
                url: "/images/portfolio-cover.jpg",
                width: 1200,
                height: 630,
                alt: "Sindhu Studio Portfolio",
            },
        ],
    },
};

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
