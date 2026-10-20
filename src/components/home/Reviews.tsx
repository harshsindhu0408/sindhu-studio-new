import { Quote, Star } from "lucide-react";
import { getReviews } from "@/lib/content";
import type { Locale } from "@/i18n";

/** Real reviews from the CMS, shown only with the client's consent. Renders nothing until there are some. */
export async function Reviews({ locale = "en" }: { locale?: Locale }) {
    const reviews = await getReviews();
    if (!reviews.length) return null;
    const hi = locale === "hi";
    return (
        <section className="section-padding overflow-hidden bg-background-secondary" aria-labelledby="reviews-title">
            <div className="container-custom">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{hi ? "परिवारों की बात" : "In their words"}</p>
                <h2 id="reviews-title" className="mt-4 font-display text-4xl font-medium md:text-5xl">
                    {hi ? "जिन परिवारों ने हमें चुना" : "Families who chose us"}
                </h2>
            </div>
            <ul className="mt-10 flex snap-x gap-5 overflow-x-auto px-[max(1rem,calc((100vw-1400px)/2+3rem))] pb-4 scrollbar-none">
                {reviews.map((r) => (
                    <li key={r.slug} className="w-[85vw] max-w-md shrink-0 snap-start rounded-3xl border border-border bg-card p-7">
                        <Quote className="h-8 w-8 text-accent/60" aria-hidden />
                        <p className="mt-4 font-display text-lg leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                        <div className="mt-6 flex items-center justify-between gap-3">
                            <div>
                                <p className="font-medium">{r.name}</p>
                                <p className="text-sm text-foreground-muted">{r.event}</p>
                            </div>
                            <div className="text-right">
                                <p className="flex gap-0.5" aria-label={`${r.rating} / 5`}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < (r.rating ?? 5) ? "fill-marigold text-marigold" : "text-border"}`} aria-hidden />
                                    ))}
                                </p>
                                {r.sourceUrl ? (
                                    <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground-muted underline">
                                        {r.source}
                                    </a>
                                ) : (
                                    <p className="text-xs text-foreground-muted">{r.source}</p>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
