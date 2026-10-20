import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getJournalPost, getJournalPosts, renderMarkdoc } from "@/lib/content";
import { business, SITE_URL } from "@/data/business";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const dynamicParams = false;

export async function generateStaticParams() {
    const posts = await getJournalPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getJournalPost(slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/journal/${slug}` },
        openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/journal/${slug}`, publishedTime: post.date ?? undefined, images: post.cover ? [{ url: post.cover }] : undefined },
    };
}

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getJournalPost(slug);
    if (!post) notFound();

    return (
        <article className="pb-24 pt-28 md:pt-36">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    headline: post.title,
                    description: post.excerpt,
                    datePublished: post.date,
                    image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
                    author: { "@type": "Organization", "@id": `${SITE_URL}/#business`, name: business.name },
                    publisher: { "@id": `${SITE_URL}/#business` },
                    mainEntityOfPage: `${SITE_URL}/journal/${slug}`,
                }}
            />
            <JsonLd data={breadcrumbSchema([{ name: "Journal", path: "/journal" }, { name: post.title, path: `/journal/${slug}` }])} />
            <header className="container-custom max-w-3xl">
                <Link href="/journal" className="text-sm text-accent hover:underline">
                    ← Journal
                </Link>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{post.title}</h1>
                <p className="mt-3 text-sm text-foreground-muted">
                    {post.date && new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · {business.name}
                </p>
            </header>
            {post.cover && (
                <div className="container-custom mt-8 max-w-4xl">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                        <Image src={post.cover} alt={post.coverAlt || post.title} fill priority sizes="(max-width: 1024px) 100vw, 900px" className="object-cover" />
                    </div>
                </div>
            )}
            <div className="prose-studio container-custom mt-10 max-w-3xl">{renderMarkdoc(post.node)}</div>
            <aside className="container-custom mt-14 max-w-3xl">
                <div className="flex flex-col items-start gap-3 rounded-3xl border border-accent/40 bg-accent/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-display text-xl">See your exact price in a minute</p>
                    <Link href="/build" className="btn btn-primary shrink-0">
                        Build my quote <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            </aside>
        </article>
    );
}
