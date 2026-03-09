"use client";

import { motion } from "framer-motion";
import {
    Heart,
    Camera,
    Baby,
    Sparkles,
    Users,
    LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/ui/SectionWrapper";

interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
}

const services: Service[] = [
    {
        icon: Heart,
        title: "Wedding",
        description:
            "Capturing the magic of your special day with artistry and emotion. From intimate ceremonies to grand celebrations.",
        href: "/portfolio?category=wedding",
    },
    {
        icon: Camera,
        title: "Pre-Wedding",
        description:
            "Romantic sessions that tell your love story. Scenic locations and creative concepts for unforgettable memories.",
        href: "/portfolio?category=pre-wedding",
    },
    {
        icon: Baby,
        title: "Maternity",
        description:
            "Celebrating the beautiful journey of motherhood. Elegant and intimate portraits honoring this precious time.",
        href: "/portfolio?category=maternity",
    },
    {
        icon: Sparkles,
        title: "Child",
        description:
            "Preserving the wonder and joy of childhood. Candid moments and playful sessions that capture pure happiness.",
        href: "/portfolio?category=child",
    },
    {
        icon: Users,
        title: "Matrimony",
        description:
            "Professional portraits that make lasting impressions. Elegant headshots and family portraits with sophistication.",
        href: "/portfolio?category=matrimony",
    },
];

export function ServiceGrid() {
    return (
        <section className="section-padding bg-background-secondary">
            <div className="container-custom">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <motion.p
                        className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Services
                    </motion.p>
                    <motion.h2
                        className="font-display text-4xl font-medium md:text-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Crafted for Every{" "}
                        <span className="italic text-accent">Milestone</span>
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-foreground-muted"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        From the first look to the final dance, we&apos;re there to document
                        every precious moment of your journey.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <StaggerItem key={service.title}>
                            <Link href={service.href}>
                                <motion.div
                                    className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-500 hover:border-accent hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,215,0,0.05)]"
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Subtle Overlay instead of strong gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110">
                                            <service.icon className="h-6 w-6" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-display text-2xl font-medium group-hover:text-accent transition-colors duration-300">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                                            {service.description}
                                        </p>

                                        {/* Link indicator */}
                                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                            <span>Explore</span>
                                            <motion.span
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                →
                                            </motion.span>
                                        </div>
                                    </div>

                                    {/* Simple Border Accent at bottom */}
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </motion.div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
