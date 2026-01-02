"use client";

import { motion } from "framer-motion";
import { SectionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/SectionWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pillars = [
    {
        title: "Unmatched Artistry",
        description: "We blend editorial fashion aesthetics with genuine emotional storytelling. Your photos will look like they belong in a magazine, yet feel undeniably 'you'."
    },
    {
        title: "Cutting-Edge Quality",
        description: "Equipped with industry-leading cameras, drones, and lighting, we ensure crystal-clear 4K films and high-resolution images in any environment, day or night."
    },
    {
        title: "World-Class Experience",
        description: "More than photographers, we are your calm in the chaos. We guide you through the process with a smile, ensuring a seamless, stress-free, and joyful experience."
    }
];

export function SindhuEdge() {
    return (
        <section className="section-padding bg-background text-foreground overflow-hidden">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left Column: Sticky Header */}
                    <SectionWrapper className="lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                            Why Choose Sindhu Studio
                        </p>
                        <h2 className="font-display text-5xl font-medium md:text-7xl leading-[0.9]">
                            The Sindhu <br />
                            <span className="text-accent italic">Difference</span>
                        </h2>
                        <p className="mt-8 text-xl leading-relaxed text-foreground-muted max-w-md">
                            Defining the standard of premium photography in Rohtak. We don&apos;t just capture moments; we craft legacy.
                        </p>
                        <div className="mt-10">
                            <Link href="/contact" className="btn btn-primary inline-flex items-center gap-2">
                                Start Your Journey <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </SectionWrapper>

                    {/* Right Column: Editorial List */}
                    <StaggerContainer className="space-y-0" staggerDelay={0.15}>
                        {pillars.map((pillar, index) => (
                            <StaggerItem key={index} className="group cursor-pointer relative border-b border-border/40 py-12 first:pt-0 last:border-0 transition-colors duration-500 hover:border-accent/50">
                                <div className="absolute left-0 top-12 md:top-14 transition-transform duration-500 group-hover:-translate-x-2">
                                    <span className="font-display text-4xl md:text-5xl text-accent/20 group-hover:text-accent transition-colors duration-500">
                                        0{index + 1}
                                    </span>
                                </div>
                                <div className="pl-16 md:pl-24">
                                    <h3 className="font-display text-2xl md:text-4xl font-medium mb-4 group-hover:text-accent transition-colors duration-300">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-lg text-foreground-muted leading-relaxed group-hover:text-foreground transition-colors duration-300">
                                        {pillar.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    );
}
