"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// --- Types & Data ---

type GridSize = "hero" | "tall" | "wide" | "square";

interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    size: GridSize;
    imageUrl: string;
    year: string;
}

// Curated Unsplash IDs for a premium wedding/studio aesthetic
const UNSPLASH_IDS = [
    "1519741497674-611481863552", // Wedding Couple
    "1511285560982-1351c4a727bd", // Mood lighting wedding
    "1520854221256-17451cc330e7", // Elegant portrait
    "1606800052052-a08af7148866", // Ring detail
    "1604017011826-d3b4c23ce5a9", // New Portrait
    "1515934751635-c81c6bc9a2d8", // Ceremony
    "1532712938318-842217c35f1a", // Laughing couple
    "1465495976277-4387d4b0b4c8", // Bride profile
    "1505935428862-770b6f24f629", // Holding hands
];

// Helper to generate deterministic but varied data
const generatePortfolioData = (count: number): PortfolioItem[] => {
    const categories = ["Wedding", "Pre-Wedding", "Maternity", "Editorial", "Portrait"];
    // Varied distribution for "crazy" but balanced layout
    const sizesPattern: GridSize[] = [
        "hero", "square", "tall", "square",
        "wide", "tall", "square", "square",
        "hero", "wide", "square", "tall"
    ];

    return Array.from({ length: count }).map((_, i) => ({
        id: i + 1,
        title: `Project ${i + 1}`,
        category: categories[i % categories.length],
        size: sizesPattern[i % sizesPattern.length],
        imageUrl: `https://images.unsplash.com/photo-${UNSPLASH_IDS[i % UNSPLASH_IDS.length]}?auto=format&fit=crop&q=80`,
        year: "2024",
    }));
};

const portfolioItems = generatePortfolioData(52); // 50+ images

// --- Components ---

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-background pb-20 pt-24 text-foreground">
            {/* Header */}
            <header className="container-custom mb-16 text-center">
                <div className="mx-auto max-w-2xl">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        Selected Works
                    </p>
                    <h1 className="font-display text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
                        Visual Stories
                    </h1>
                    <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
                        A curation of moments that define our aesthetic. Natural light,
                        genuine emotion, and editorial composition.
                    </p>
                </div>
            </header>

            {/* Bento Grid */}
            <section className="container-custom">
                {/* 
          Grid Layout Strategy:
          - Mobile: 1 column flow (aspect ratios handled by container)
          - Tablet: 2 columns
          - Desktop: 4 columns
          - auto-rows: 200px base unit for finer control
          - This creates:
            - Tall (1x2) -> ~280w x 420h (2:3 Portrait)
            - Wide (2x1) -> ~580w x 200h (3:1 Panoramic)
            - Hero (2x2) -> ~580w x 420h (4:3 Landscape)
            - Square (1x1) -> ~280w x 200h (4:3 Small)
        */}
                <div className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[200px] lg:gap-6">
                    {portfolioItems.map((item) => (
                        <PortfolioCard key={item.id} item={item} />
                    ))}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="mt-32 border-t border-border/40 py-20 text-center">
                <div className="container-custom">
                    <h2 className="mb-8 font-display text-4xl md:text-5xl">
                        Create something timeless.
                    </h2>
                    <a
                        href="/contact"
                        className="btn btn-primary inline-flex items-center gap-2"
                    >
                        Book Your Session <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>
            </section>
        </div>
    );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
    // Determine grid span based on size
    const spanClasses = {
        hero: "sm:col-span-2 sm:row-span-2",
        tall: "sm:col-span-1 sm:row-span-2",
        wide: "sm:col-span-2 sm:row-span-1",
        square: "sm:col-span-1 sm:row-span-1",
    };

    return (
        <article
            className={`group relative overflow-hidden rounded-xl bg-background-secondary ${spanClasses[item.size]}`}
        >
            {/* Image Container */}
            <div className="relative h-full w-full min-h-[250px] sm:min-h-0">
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                    quality={80}
                />

                {/* Simple Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
                    <div className="transform translate-y-4 transition-transform duration-300 md:group-hover:translate-y-0">
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent-foreground/80">
                            {item.category} — {item.year}
                        </p>
                        <h3 className="font-display text-xl leading-tight text-white">
                            {item.title}
                        </h3>
                    </div>
                </div>
            </div>
        </article>
    );
}
