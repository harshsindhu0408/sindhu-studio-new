"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
            {/* Background Atmosphere */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y, scale }}
            >
                {/* Base */}
                <div className="absolute inset-0 bg-background" />

                {/* Golden Gradient Orbs - Creates the premium atmosphere */}
                <div className="absolute -top-[20%] -right-[10%] h-[80vh] w-[80vh] rounded-full bg-accent/15 blur-[120px] mix-blend-screen" />
                <div className="absolute -bottom-[20%] -left-[10%] h-[60vh] w-[60vh] rounded-full bg-accent/10 blur-[100px] mix-blend-screen" />
                <div className="absolute top-1/2 left-1/2 h-[50vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-accent/5 blur-[80px]" />

                {/* Vignette Overlay for Focus */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="container-custom relative z-20 text-center"
                style={{ opacity }}
            >
                {/* Eyebrow text */}
                <motion.p
                    className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-accent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Premium Photography Studio
                </motion.p>

                {/* Main Headline with Clip Path Animation */}
                <div className="overflow-hidden">
                    <motion.h1
                        className="font-display text-5xl font-medium leading-tight tracking-tight md:text-7xl lg:text-8xl"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Capturing Life&apos;s
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        className="font-display text-5xl font-medium leading-tight tracking-tight md:text-7xl lg:text-8xl"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-gradient italic">Precious</span> Moments
                    </motion.h1>
                </div>

                {/* Subheadline */}
                <motion.p
                    className="mx-auto mt-8 max-w-xl text-lg text-foreground-muted md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    Where artistry meets emotion. We transform fleeting instants into
                    timeless treasures that tell your unique story.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <Link href="/portfolio" className="btn btn-primary" data-cursor="pointer">
                        View Portfolio
                    </Link>
                    <Link href="/contact" className="btn btn-outline" data-cursor="pointer">
                        Book a Session
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="flex flex-col items-center gap-2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-xs uppercase tracking-widest text-foreground-muted">
                        Scroll to explore
                    </span>
                    <ChevronDown className="h-5 w-5 text-accent" />
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="pointer-events-none absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                <motion.div
                    className="h-32 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                />
            </div>
            <div className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                <motion.div
                    className="h-32 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                />
            </div>
        </section>
    );
}
