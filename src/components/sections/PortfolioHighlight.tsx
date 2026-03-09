"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Image from "next/image";

const previewImages = [
    { id: 1, category: "Wedding", src: "/DSC_1487.JPG", width: 4024, height: 6048 },
    { id: 2, category: "Wedding", src: "/DSC_2286.JPG", width: 4024, height: 6048 },
    { id: 3, category: "Wedding", src: "/DSC_2639.JPG", width: 4024, height: 6048 },
    { id: 4, category: "Wedding", src: "/DSC_2828.JPG", width: 4024, height: 6048 },
    { id: 5, category: "Wedding", src: "/DSC_4223.JPG", width: 4024, height: 6048 },
    { id: 6, category: "Wedding", src: "/DSC_4592.JPG", width: 4024, height: 6048 },
];

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

                {/* Uncropped Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {previewImages.map((image) => (
                        <article
                            key={image.id}
                            className="group relative overflow-hidden rounded-xl bg-background-secondary w-full"
                        >
                            <div className="relative aspect-[2/3] w-full">
                                <Image
                                    src={image.src}
                                    alt={image.category}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                                    quality={85}
                                />

                                {/* Hover overlay - CSS only */}
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 pointer-events-none" />

                                {/* Corner accent on hover */}
                                <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
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
