"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Simple portfolio preview data
const previewImages = [
    { id: 1, category: "Wedding", size: "large" },
    { id: 2, category: "Pre-Wedding", size: "medium" },
    { id: 3, category: "Maternity", size: "small" },
    { id: 4, category: "Child", size: "small" },
    { id: 5, category: "Wedding", size: "medium" },
    { id: 6, category: "Family", size: "large" },
];

const gradients = [
    "from-amber-900/40 to-amber-700/20",
    "from-rose-900/40 to-rose-700/20",
    "from-violet-900/40 to-violet-700/20",
    "from-emerald-900/40 to-emerald-700/20",
    "from-sky-900/40 to-sky-700/20",
    "from-orange-900/40 to-orange-700/20",
];

const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-2",
    large: "col-span-2 row-span-2",
};

export function PortfolioHighlight() {
    return (
        <section className="section-padding">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                            Featured Work
                        </p>
                        <h2 className="font-display text-4xl font-medium md:text-5xl">
                            Our Latest <span className="italic text-accent">Portfolio</span>
                        </h2>
                    </div>

                    <Link
                        href="/portfolio"
                        className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent"
                    >
                        View All Work
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </div>

                {/* CSS-only Bento Grid Preview */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    {previewImages.map((image, index) => (
                        <article
                            key={image.id}
                            className={`group relative overflow-hidden rounded-lg ${sizeClasses[image.size as keyof typeof sizeClasses]}`}
                        >
                            <div className="relative aspect-square w-full h-full min-h-[150px]">
                                {/* Gradient placeholder */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}
                                />

                                {/* Hover overlay - CSS only */}
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />

                                {/* Category label on hover */}
                                <div className="absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <span className="text-xs font-medium uppercase tracking-wider text-accent">
                                        {image.category}
                                    </span>
                                </div>

                                {/* Corner accent on hover */}
                                <div className="absolute right-3 top-3 h-6 w-6 border-r border-t border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link href="/contact" className="btn btn-primary">
                        Start Your Project
                    </Link>
                </div>
            </div>
        </section>
    );
}
