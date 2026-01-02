"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-accent-light" />

            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Decorative circles */}
            <motion.div
                className="absolute -left-32 -top-32 h-64 w-64 rounded-full border border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full border border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Content */}
            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Badge */}
                    <motion.div
                        className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Limited Availability
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        className="font-display text-4xl font-medium text-white md:text-5xl lg:text-6xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Ready to Create
                        <br />
                        <span className="italic">Timeless Memories?</span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        className="mt-6 text-lg text-white/80"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Book your date today and let us capture the moments that matter most.
                        Premium dates fill up quickly.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 rounded-sm bg-white px-8 py-4 text-sm font-medium uppercase tracking-wider text-accent transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
                            data-cursor="pointer"
                        >
                            Book Your Date
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-transparent px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/10"
                            data-cursor="pointer"
                        >
                            View Portfolio
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
