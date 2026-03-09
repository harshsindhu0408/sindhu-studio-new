"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { JsonLd, getImageGallerySchema } from "@/lib/schema";
import Link from "next/link";

// --- Types & Data ---

const LOCAL_IMAGES = [
    { src: "/DSC_1487.JPG", width: 6048, height: 4024 },
    { src: "/DSC_2286.JPG", width: 6048, height: 4024 },
    { src: "/DSC_2639.JPG", width: 6048, height: 4024 },
    { src: "/DSC_2828.JPG", width: 6048, height: 4024 },
    { src: "/DSC_4112.JPG", width: 6048, height: 4024 },
    { src: "/DSC_4138.JPG", width: 6048, height: 4024 },
    { src: "/DSC_4144.JPG", width: 4528, height: 3016 },
    { src: "/DSC_4223.JPG", width: 6048, height: 4024 },
    { src: "/DSC_4592.JPG", width: 6048, height: 4024 },
    { src: "/DSC_4597.JPG", width: 6048, height: 4024 },
    { src: "/DSC_4602.JPG", width: 6048, height: 4024 },
    { src: "/DSC_4887.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5057.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5058 (1).JPG", width: 6048, height: 4024 },
    { src: "/DSC_5058.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5084.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5140.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5181.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5733.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5753.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5757.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5834.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5851.JPG", width: 6048, height: 4024 },
    { src: "/DSC_5870.JPG", width: 6048, height: 4024 },
    { src: "/DSC_6174.JPG", width: 6048, height: 4024 },
    { src: "/DSC_6192.JPG", width: 6048, height: 4024 },
    { src: "/DSC_6194.JPG", width: 6048, height: 4024 },
    { src: "/DSC_6638.JPG", width: 6048, height: 4024 },
    { src: "/DSC_6772.JPG", width: 6048, height: 4024 },
    { src: "/DSC_7067.JPG", width: 3024, height: 2016 },
    { src: "/DSC_7716.JPG", width: 6048, height: 4024 },
    { src: "/DSC_7759.JPG", width: 6048, height: 4024 },
    { src: "/DSC_9011.JPG", width: 6048, height: 4024 },
    { src: "/DSC_9026.JPG", width: 6048, height: 4024 },
    { src: "/DSC_9071.JPG", width: 6048, height: 4024 },
    { src: "/DSC_9608.JPG", width: 6048, height: 4024 },
    { src: "/IMG_9247.JPG", width: 6240, height: 4160 },
    { src: "/IMG_9317.JPG", width: 6240, height: 4160 },
    { src: "/LSP_6001.JPG", width: 6720, height: 4480 },
    { src: "/LSP_6018.JPG", width: 6720, height: 4480 },
    { src: "/LSP_6047.JPG", width: 6720, height: 4480 },
    { src: "/LSP_6115.JPG", width: 6720, height: 4480 },
    { src: "/LSP_6238.JPG", width: 6720, height: 4480 },
    { src: "/LSP_6344.JPG", width: 6720, height: 4480 },
    { src: "/LSP_6736.JPG", width: 6720, height: 4480 }
];

// Helper to generate deterministic but varied data
const generatePortfolioData = (): PortfolioItem[] => {
    const categories = ["Wedding", "Pre-Wedding", "Maternity", "Portrait", "Couple"];

    return LOCAL_IMAGES.map((img, i) => ({
        id: i + 1,
        title: `Sindhu Studio Photography ${i + 1}`,
        category: categories[i % categories.length],
        size: "hero", // not used for masonry but keeping to satisfy type
        imageUrl: img.src,
        width: img.width,
        height: img.height,
        year: "2024",
    }));
};

const portfolioItems = generatePortfolioData();

// --- Components ---

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-background pb-20 pt-24 text-foreground">
            <JsonLd data={getImageGallerySchema()} />
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

            {/* Masonry Grid */}
            <section className="container-custom">
                {/* 
                  Masonry Layout Strategy: 
                  Preserves original aspect ratio of all images. Nothing gets cut off or cropped.
                  Columns reduced to make individual images render significantly larger.
                */}
                <div className="columns-1 md:columns-2 xl:columns-3 gap-8 space-y-8">
                    {portfolioItems.map((item) => (
                        <div key={item.id} className="break-inside-avoid">
                            <PortfolioCard item={item} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="mt-32 border-t border-border/40 py-20 text-center">
                <div className="container-custom">
                    <h2 className="mb-8 font-display text-4xl md:text-5xl">
                        Create something timeless.
                    </h2>
                    <Link
                        href="/contact"
                        className="btn btn-primary inline-flex items-center gap-2"
                    >
                        <span>Book Your Session</span>
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

type GridSize = "hero" | "tall" | "wide" | "square";

interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    size: GridSize;
    imageUrl: string;
    width: number;
    height: number;
    year: string;
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
    return (
        <article className="group relative overflow-hidden rounded-xl bg-background-secondary w-full cursor-pointer hover:shadow-xl transition-shadow duration-500">
            {/* Image Container directly retaining responsive dimensions natively without fill */}
            <Image
                src={item.imageUrl}
                alt={item.title}
                width={item.width}
                height={item.height}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="w-full h-auto object-contain transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
                quality={85}
                priority={item.id <= 6}
                fetchPriority={item.id <= 6 ? "high" : "auto"}
            />

            {/* Elegant Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

            {/* Hover Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white opacity-0 transition-opacity duration-300 md:group-hover:opacity-100 pointer-events-none">
                <div className="transform translate-y-4 transition-transform duration-300 md:group-hover:translate-y-0">
                    <h3 className="font-display text-xl leading-tight text-white mb-2 shadow-sm">
                        {item.title}
                    </h3>
                </div>
            </div>

            {/* Top right corner subtle icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
            </div>
        </article>
    );
}
