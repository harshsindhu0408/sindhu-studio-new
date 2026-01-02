"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { animateValue } from "@/lib/utils";

interface Stat {
    value: number;
    suffix: string;
    label: string;
}

const stats: Stat[] = [
    { value: 500, suffix: "+", label: "Weddings Covered" },
    { value: 2000, suffix: "+", label: "Happy Families" },
    { value: 25, suffix: "", label: "Years Experience" },
    { value: 500, suffix: "K+", label: "Photos Delivered" },
];

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [displayValue, setDisplayValue] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (isInView && !hasAnimated.current) {
            hasAnimated.current = true;

            // Delay the animation start
            const timeoutId = setTimeout(() => {
                animateValue(0, stat.value, 2000, setDisplayValue);
            }, delay * 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [isInView, stat.value, delay]);

    return (
        <motion.div
            ref={ref}
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 text-center transition-all duration-300 hover:border-accent/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
        >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10">
                {/* Value */}
                <div className="font-display text-5xl font-medium tabular-nums md:text-6xl">
                    <span className="text-gradient">{displayValue.toLocaleString()}</span>
                    <span className="text-accent">{stat.suffix}</span>
                </div>

                {/* Label */}
                <p className="mt-3 text-sm font-medium uppercase tracking-wider text-foreground-muted">
                    {stat.label}
                </p>
            </div>

            {/* Corner decoration */}
            <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full border border-accent/10 transition-transform duration-300 group-hover:scale-150" />
        </motion.div>
    );
}

export function Stats() {
    return (
        <section className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    className="mx-auto mb-16 max-w-2xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                        Our Impact
                    </p>
                    <h2 className="font-display text-4xl font-medium md:text-5xl">
                        Numbers That{" "}
                        <span className="italic text-accent">Speak</span>
                    </h2>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} delay={index * 0.15} />
                    ))}
                </div>
            </div>
        </section>
    );
}
