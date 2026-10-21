import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getJournalPost, renderMarkdoc } from "@/lib/content";
import { business, SITE_URL } from "@/data/business";
import { localePath, type Locale } from "@/i18n";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { journalCopy } from "./JournalIndex";

type Post = NonNullable<Awaited<ReturnType<typeof getJournalPost>>>;

/** `fallback` is true when a Hindi page shows the English article because no translation exists yet. */
export function JournalArticle({ post, locale = "en", fallback = false }: { post: Post; locale?: Locale; fallback?: boolean }) {
    const c = journalCopy[locale];
    const L = (p: string) => localePath(locale, p);
    const path = L(`/journal/${post.slug}`);
    return (
        <article className="pb-24 pt-28 md:pt-36">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    headline: post.title,
                    description: post.excerpt,
                    datePublished: post.date,
                    inLanguage: locale === "hi" && !fallback ? "hi-IN" : "en-IN",
                    image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
                    author: { "@type": "Organization", "@id": `${SITE_URL}/#business`, name: business.name },
                    publisher: { "@id": `${SITE_URL}/#business` },
                    mainEntityOfPage: `${SITE_URL}${path}`,
                }}
            />
            {locale === "en" && <JsonLd data={breadcrumbSchema([{ name: "Journal", path: "/journal" }, { name: post.title, path }])} />}
            <header className="container-custom max-w-3xl">
                <Link href={L("/journal")} className="text-sm text-accent hover:underline">
                    ← {c.back}
                </Link>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{post.title}</h1>
                <p className="mt-3 text-sm text-foreground-muted">
                    {post.date && new Date(post.date).toLocaleDateString(c.dateLocale, { day: "numeric", month: "long", year: "numeric" })} · {business.name}
                </p>
                {fallback && <p className="mt-4 rounded-xl bg-accent/10 px-4 py-3 text-sm">{c.englishOnly}</p>}
            </header>
            {post.cover && (
                <div className="container-custom mt-8 max-w-4xl">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                        <Image src={post.cover} alt={post.coverAlt || post.title} fill priority sizes="(max-width: 1024px) 100vw, 900px" className="object-cover" />
                    </div>
                </div>
            )}
            <div lang={fallback ? "en" : undefined} className="prose-studio container-custom mt-10 max-w-3xl">
                {renderMarkdoc(post.node)}
            </div>
            <aside className="container-custom mt-14 max-w-3xl">
                <div className="flex flex-col items-start gap-3 rounded-3xl border border-accent/40 bg-accent/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-display text-xl">{c.ctaTitle}</p>
                    <Link href={L("/build")} className="btn btn-primary shrink-0">
                        {c.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            </aside>
        </article>
    );
}
