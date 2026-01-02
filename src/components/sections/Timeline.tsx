"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Calendar,
    MessageSquare,
    Camera,
    Palette,
    Package,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface TimelineStep {
    icon: React.ElementType;
    title: string;
    description: string;
    duration: string;
}

const timelineSteps: TimelineStep[] = [
    {
        icon: Calendar,
        title: "Book Your Date",
        description:
            "Choose your preferred date and package. We'll confirm availability within 24 hours.",
        duration: "Day 1",
    },
    {
        icon: MessageSquare,
        title: "Consultation",
        description:
            "We discuss your vision, preferences, locations, and create a personalized shooting plan.",
        duration: "Week 1",
    },
    {
        icon: Camera,
        title: "The Shoot",
        description:
            "The magical day arrives! We capture every moment with precision and artistry.",
        duration: "Your Day",
    },
    {
        icon: Palette,
        title: "Post-Production",
        description:
            "Each image is carefully edited to perfection, enhancing colors and emotions.",
        duration: "2-3 Weeks",
    },
    {
        icon: Package,
        title: "Delivery",
        description:
            "Receive your complete gallery with prints, albums, and digital files.",
        duration: "Final",
    },
];

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="section-padding bg-background-secondary">
            <div className="container-custom">
                {/* Section Header */}
                <SectionWrapper className="mx-auto mb-16 max-w-2xl text-center">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                        The Journey
                    </p>
                    <h2 className="font-display text-4xl font-medium md:text-5xl">
                        From Booking to{" "}
                        <span className="italic text-accent">Delivery</span>
                    </h2>
                    <p className="mt-4 text-foreground-muted">
                        A seamless experience designed to make your photography journey
                        stress-free and enjoyable.
                    </p>
                </SectionWrapper>

                {/* Timeline */}
                <div className="relative mx-auto max-w-3xl">
                    {/* Animated vertical line */}
                    <div className="absolute left-8 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2">
                        <motion.div
                            className="w-full bg-accent"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Timeline items */}
                    <div className="space-y-12">
                        {timelineSteps.map((step, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <SectionWrapper
                                    key={step.title}
                                    animation={isEven ? "fade-right" : "fade-left"}
                                    delay={index * 0.1}
                                >
                                    <div
                                        className={`relative flex items-start gap-6 md:gap-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                            }`}
                                    >
                                        {/* Content */}
                                        <div
                                            className={`ml-20 flex-1 md:ml-0 ${isEven ? "md:text-right" : "md:text-left"
                                                }`}
                                        >
                                            <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-accent">
                                                {step.duration}
                                            </span>
                                            <h3 className="font-display text-xl font-medium md:text-2xl">
                                                {step.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-foreground-muted">
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Icon - Center for desktop, left for mobile */}
                                        <div className="absolute left-0 md:relative md:left-auto">
                                            <motion.div
                                                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-background"
                                                whileInView={{ scale: [0.8, 1.1, 1] }}
                                                transition={{ duration: 0.5 }}
                                                viewport={{ once: true }}
                                            >
                                                <step.icon className="h-6 w-6 text-accent" />
                                            </motion.div>
                                        </div>

                                        {/* Spacer for desktop alignment */}
                                        <div className="hidden flex-1 md:block" />
                                    </div>
                                </SectionWrapper>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
