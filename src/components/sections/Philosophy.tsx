"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import Image from "next/image";

export function Philosophy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    return (
        <section ref={containerRef} className="section-padding overflow-hidden">
            <div className="container-custom">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Image Column with Parallax */}
                    <SectionWrapper animation="fade-right" className="relative">
                        <div className="relative aspect-[4/5] overflow-hidden">
                            {/* Decorative frame */}
                            <motion.div
                                className="absolute -left-4 -top-4 z-10 h-24 w-24 border-l-2 border-t-2 border-accent"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                viewport={{ once: true }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -right-4 z-10 h-24 w-24 border-b-2 border-r-2 border-accent"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                viewport={{ once: true }}
                            />

                            {/* Image container */}
                            <motion.div
                                className="h-full w-full overflow-hidden bg-background-secondary relative"
                                style={{ y: imageY }}
                            >
                                <div className="h-[120%] w-full relative">
                                    <Image
                                        src="/DSC_4597.JPG"
                                        alt="Sindhu Studio Philosophy"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                        quality={85}
                                    />
                                    <div className="absolute inset-0 bg-background/10 mix-blend-overlay" />
                                </div>
                            </motion.div>
                        </div>
                    </SectionWrapper>

                    {/* Content Column */}
                    <SectionWrapper animation="fade-left" delay={0.2}>
                        <div className="max-w-xl">
                            {/* Eyebrow */}
                            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                                Our Philosophy
                            </p>

                            {/* Headline */}
                            <h2 className="font-display text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
                                We Don&apos;t Just Take Photos
                            </h2>

                            {/* Accent text */}
                            <p className="mt-2 font-display text-4xl font-light italic text-accent md:text-5xl lg:text-6xl">
                                We Tell Stories
                            </p>

                            {/* Description */}
                            <div className="mt-8 space-y-4 text-foreground-muted">
                                <p>
                                    At Sindhu Studio, photography is more than pressing a shutter.
                                    It&apos;s about understanding the essence of each moment, the
                                    unspoken emotions, and the connections that make your story
                                    unique.
                                </p>
                                <p>
                                    With over a decade of experience, we&apos;ve learned that the
                                    best photographs aren&apos;t posed—they&apos;re felt. Our approach
                                    blends technical excellence with artistic intuition, creating
                                    images that resonate for generations.
                                </p>
                            </div>

                            {/* Signature */}
                            <div className="mt-10 flex items-center gap-4">
                                <div className="h-px flex-1 bg-border" />
                                <p className="font-display text-lg italic text-foreground-muted">
                                    — The Sindhu Team
                                </p>
                            </div>
                        </div>
                    </SectionWrapper>
                </div>
            </div>
        </section>
    );
}
