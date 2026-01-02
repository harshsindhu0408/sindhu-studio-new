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
    accent: string;
}

const services: Service[] = [
    {
        icon: Heart,
        title: "Wedding",
        description:
            "Capturing the magic of your special day with artistry and emotion. From intimate ceremonies to grand celebrations.",
        href: "/portfolio?category=wedding",
        accent: "from-rose-500/20 to-pink-500/20",
    },
    {
        icon: Camera,
        title: "Pre-Wedding",
        description:
            "Romantic sessions that tell your love story. Scenic locations and creative concepts for unforgettable memories.",
        href: "/portfolio?category=pre-wedding",
        accent: "from-amber-500/20 to-orange-500/20",
    },
    {
        icon: Baby,
        title: "Maternity",
        description:
            "Celebrating the beautiful journey of motherhood. Elegant and intimate portraits honoring this precious time.",
        href: "/portfolio?category=maternity",
        accent: "from-purple-500/20 to-violet-500/20",
    },
    {
        icon: Sparkles,
        title: "Child",
        description:
            "Preserving the wonder and joy of childhood. Candid moments and playful sessions that capture pure happiness.",
        href: "/portfolio?category=child",
        accent: "from-cyan-500/20 to-blue-500/20",
    },
    {
        icon: Users,
        title: "Matrimony",
        description:
            "Professional portraits that make lasting impressions. Elegant headshots and family portraits with sophistication.",
        href: "/portfolio?category=matrimony",
        accent: "from-emerald-500/20 to-teal-500/20",
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
                    {services.map((service, index) => (
                        <StaggerItem key={service.title}>
                            <Link href={service.href} data-cursor="pointer" data-cursor-text="View">
                                <motion.div
                                    className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-500 hover:border-accent/50"
                                    whileHover={{ y: -8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Background gradient on hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                                            <service.icon className="h-6 w-6" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-display text-2xl font-medium">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                                            {service.description}
                                        </p>

                                        {/* Link indicator */}
                                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            <span>Explore</span>
                                            <motion.span
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                →
                                            </motion.span>
                                        </div>
                                    </div>

                                    {/* Corner decoration */}
                                    <div className="absolute bottom-0 right-0 h-16 w-16 translate-x-8 translate-y-8 rounded-full border border-accent/20 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
                                </motion.div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
