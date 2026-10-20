import { Plus } from "lucide-react";
import type { FAQItem } from "@/data/faqs";

/** Native <details> accordion: accessible, works without JS, readable by crawlers and LLMs. */
export function FaqList({ items, defaultOpen = 0 }: { items: FAQItem[]; defaultOpen?: number | null }) {
    return (
        <div className="divide-y divide-border border-y border-border">
            {items.map((item, i) => (
                <details key={item.question} className="group" open={i === defaultOpen}>
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                        <h3 className="font-display text-lg font-medium md:text-xl">{item.question}</h3>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-300 group-open:rotate-45 group-open:border-accent group-open:text-accent">
                            <Plus className="h-4 w-4" aria-hidden />
                        </span>
                    </summary>
                    <p className="pb-6 pr-12 leading-relaxed text-foreground-muted">{item.answer}</p>
                </details>
            ))}
        </div>
    );
}
