"use client";

import { motion } from "framer-motion";
import {
    Aperture,
    Zap,
    Eye,
    Film,
    Sparkles,
    Heart,
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/SectionWrapper";

interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: Aperture,
        title: "Premium Equipment",
        description:
            "State-of-the-art cameras, lenses, and lighting for gallery-quality results in any condition.",
    },
    {
        icon: Eye,
        title: "Candid Expertise",
        description:
            "We specialize in capturing authentic moments—the laughter, tears, and genuine emotions.",
    },
    {
        icon: Zap,
        title: "Fast Turnaround",
        description:
            "Sneak peeks within 48 hours, full gallery delivered in 2-3 weeks with premium editing.",
    },
    {
        icon: Film,
        title: "Cinematic Video",
        description:
            "Complement your photos with stunning 4K cinematography that tells your complete story.",
    },
    {
        icon: Sparkles,
        title: "Artistic Vision",
        description:
            "Our signature editing style creates timeless images with a distinctive, editorial feel.",
    },
    {
        icon: Heart,
        title: "Personal Touch",
        description:
            "We build relationships with our clients, ensuring comfort and trust throughout the journey.",
    },
];

export function SindhuEdge() {
    return (
        <section className="section-padding">
            <div className="container-custom">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Left Column - Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                                Why Choose Us
                            </p>
                            <h2 className="font-display text-4xl font-medium md:text-5xl">
                                The <span className="italic text-accent">Sindhu</span> Edge
                            </h2>
                            <p className="mt-6 text-foreground-muted">
                                What sets us apart isn&apos;t just our equipment or experience—it&apos;s
                                our unwavering commitment to excellence and the personal
                                connection we build with every client.
                            </p>
                        </motion.div>

                        {/* Features Grid */}
                        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2" staggerDelay={0.1}>
                            {features.slice(0, 4).map((feature) => (
                                <StaggerItem key={feature.title}>
                                    <div className="group">
                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background-secondary transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-display text-lg font-medium">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-foreground-muted">
                                            {feature.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>

                    {/* Right Column - Featured Image + Additional Features */}
                    <div className="space-y-8">
                        {/* Image placeholder */}
                        <motion.div
                            className="relative aspect-[4/3] overflow-hidden rounded-lg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="h-full w-full bg-gradient-to-br from-accent/30 via-background-secondary to-accent/10" />

                            {/* Floating badge */}
                            <motion.div
                                className="absolute bottom-6 left-6 rounded-full bg-accent px-6 py-2 text-sm font-medium text-accent-foreground"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                15+ Years of Excellence
                            </motion.div>
                        </motion.div>

                        {/* Additional features */}
                        <StaggerContainer className="grid gap-6 sm:grid-cols-2" staggerDelay={0.1}>
                            {features.slice(4).map((feature) => (
                                <StaggerItem key={feature.title}>
                                    <div className="group">
                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background-secondary transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-display text-lg font-medium">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-foreground-muted">
                                            {feature.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}
