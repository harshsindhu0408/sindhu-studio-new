"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    event: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Priya & Rahul Sharma",
        role: "Newlyweds",
        quote:
            "Sindhu Studio captured our wedding day with such artistry. Every photo tells a story, every moment frozen in time perfectly. We couldn't have asked for better!",
        event: "Wedding Photography",
    },
    {
        id: 2,
        name: "Ananya Patel",
        role: "New Mother",
        quote:
            "The maternity session was magical. They made me feel so comfortable and beautiful. The photos are absolute treasures that we'll cherish forever.",
        event: "Maternity Session",
    },
    {
        id: 3,
        name: "Vikram & Meera",
        role: "Engaged Couple",
        quote:
            "Our pre-wedding shoot exceeded all expectations. The team's creativity and attention to detail turned our photos into works of art.",
        event: "Pre-Wedding Shoot",
    },
    {
        id: 4,
        name: "The Kapoor Family",
        role: "Happy Family",
        quote:
            "Getting the whole family together for photos was seamless thanks to Sindhu Studio. They captured our bond beautifully.",
        event: "Family Portrait",
    },
    {
        id: 5,
        name: "Deepa & Arjun",
        role: "Married 2 Years",
        quote:
            "Even after two years, we still look at our wedding album almost every week. That's the magic Sindhu Studio creates.",
        event: "Wedding Photography",
    },
];

export function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const x = useTransform(scrollXProgress, [0, 1], ["0%", "-100%"]);

    return (
        <section className="section-padding overflow-hidden bg-background-secondary">
            <div className="container-custom">
                {/* Section Header */}
                <SectionWrapper className="mb-12">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                                Testimonials
                            </p>
                            <h2 className="font-display text-4xl font-medium md:text-5xl">
                                Words from{" "}
                                <span className="italic text-accent">the Heart</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-sm text-foreground-muted">
                            Drag to explore more stories from our cherished clients
                        </p>
                    </div>
                </SectionWrapper>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex cursor-grab gap-6 overflow-x-auto px-8 pb-8 scrollbar-hide active:cursor-grabbing md:px-16"
                style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.id}
                        className="w-[85vw] flex-shrink-0 snap-center md:w-[500px]"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-accent/50 md:p-10">
                            {/* Quote icon */}
                            <Quote className="mb-6 h-10 w-10 text-accent opacity-50" />

                            {/* Quote text */}
                            <p className="font-display text-lg leading-relaxed md:text-xl">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            {/* Author info */}
                            <div className="mt-8 flex items-center gap-4">
                                {/* Avatar placeholder */}
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent/30 to-accent/10" />

                                <div>
                                    <p className="font-medium">{testimonial.name}</p>
                                    <p className="text-sm text-foreground-muted">
                                        {testimonial.event}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-12 translate-y-12 rounded-full border border-accent/20 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Scroll indicator dots */}
            <div className="container-custom mt-8">
                <div className="flex justify-center gap-2">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className="h-2 w-2 rounded-full bg-border transition-colors duration-300"
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
}
