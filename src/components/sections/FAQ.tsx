import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FaqList } from "@/components/ui/FaqList";
import { generalFaqs, generalFaqsHi } from "@/data/faqs";
import type { Locale } from "@/i18n";
import { JsonLd, faqSchema } from "@/lib/schema";

export function FAQ({ locale = "en" }: { locale?: Locale }) {
    const hi = locale === "hi";
    const items = hi ? generalFaqsHi : generalFaqs;
    return (
        <section className="section-padding bg-background-secondary">
            <JsonLd data={faqSchema(items)} />
            <div className="container-custom">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
                    <SectionWrapper className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">FAQ</p>
                            <h2 className="font-display text-4xl font-medium md:text-5xl">
                                {hi ? "सवाल?" : "Questions?"} <span className="italic text-accent">{hi ? "जवाब यहां।" : "Answered."}</span>
                            </h2>
                            <p className="mt-4 text-foreground-muted">
                                {hi ? "दाम, पेमेंट और डिलीवरी पर सीधे जवाब। कुछ और पूछना हो तो" : "Straight answers on price, payment and delivery. Anything else,"}{" "}
                                <Link href="/contact" className="text-accent underline underline-offset-2">
                                    {hi ? "पूछिए" : "just ask"}
                                </Link>
                                .
                            </p>
                        </div>
                    </SectionWrapper>

                    <div className="lg:col-span-8">
                        <FaqList items={items} />
                    </div>
                </div>
            </div>
        </section>
    );
}
