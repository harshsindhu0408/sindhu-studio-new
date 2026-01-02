"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface FAQItem {
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        question: "How far in advance should we book?",
        answer:
            "We recommend booking 3-6 months in advance for weddings, especially during peak season (October-February). For other sessions like maternity or pre-wedding, 4-6 weeks notice is usually sufficient. However, we do accommodate last-minute bookings when available.",
    },
    {
        question: "What is included in your wedding packages?",
        answer:
            "Our wedding packages typically include pre-wedding consultation, full day coverage, professional editing, online gallery, and a selection of prints or albums. Specific inclusions vary by package—we offer Intimate, Classic, and Premium tiers to match different needs and budgets.",
    },
    {
        question: "How long until we receive our photos?",
        answer:
            "You'll receive sneak peeks within 48 hours after your session. The complete edited gallery is delivered within 2-3 weeks for regular sessions and 4-6 weeks for weddings. Rush delivery is available for an additional fee.",
    },
    {
        question: "Do you travel for destination weddings?",
        answer:
            "Absolutely! We love destination weddings and have covered events across India and internationally. Travel and accommodation costs are additional to the package price. Contact us for a custom quote based on your destination.",
    },
    {
        question: "What is your payment policy?",
        answer:
            "We require a 30% non-refundable deposit to secure your date, with the remaining balance due one week before the event. We accept bank transfers, UPI, and major credit cards. Payment plans are available for larger packages.",
    },
    {
        question: "Can we request specific editing styles?",
        answer:
            "Yes! During our consultation, we discuss your preferred aesthetic. While we have a signature editing style, we're flexible and can adjust warmth, contrast, and overall mood to match your vision. We'll provide test edits for approval.",
    },
];

function FAQAccordion({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
    return (
        <motion.div
            className="border-b border-border"
            initial={false}
        >
            <button
                className="flex w-full items-center justify-between py-6 text-left"
                onClick={onClick}
                data-cursor="pointer"
            >
                <span className="pr-4 font-display text-lg font-medium md:text-xl">
                    {item.question}
                </span>
                <motion.div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-accent"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? (
                        <Minus className="h-4 w-4 text-accent" />
                    ) : (
                        <Plus className="h-4 w-4" />
                    )}
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="pb-6 pr-12 text-foreground-muted">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="section-padding bg-background-secondary">
            <div className="container-custom">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
                    {/* Left Column - Header */}
                    <SectionWrapper className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                                FAQ
                            </p>
                            <h2 className="font-display text-4xl font-medium md:text-5xl">
                                Questions?{" "}
                                <span className="italic text-accent">Answered.</span>
                            </h2>
                            <p className="mt-4 text-foreground-muted">
                                Everything you need to know about working with us. Can&apos;t find
                                what you&apos;re looking for? Reach out directly.
                            </p>
                        </div>
                    </SectionWrapper>

                    {/* Right Column - Accordion */}
                    <div className="lg:col-span-8">
                        <div className="divide-y divide-border border-t border-border">
                            {faqItems.map((item, index) => (
                                <FAQAccordion
                                    key={index}
                                    item={item}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
