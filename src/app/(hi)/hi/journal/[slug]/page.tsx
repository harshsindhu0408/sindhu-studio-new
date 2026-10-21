import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournalPost, getJournalPosts } from "@/lib/content";
import { languageAlternates } from "@/i18n";
import { JournalArticle } from "@/components/journal/JournalArticle";

export const dynamicParams = false;

// Every English article gets a Hindi URL; it shows the translation when there is one.
export async function generateStaticParams() {
    const posts = await getJournalPosts("en");
    return posts.map((p) => ({ slug: p.slug }));
}

async function load(slug: string) {
    const hi = await getJournalPost(slug, "hi");
    if (hi) return { post: hi, fallback: false };
    const en = await getJournalPost(slug, "en");
    return en ? { post: en, fallback: true } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const found = await load(slug);
    if (!found) return {};
    const { post, fallback } = found;
    return {
        title: post.title,
        description: post.excerpt,
        // An untranslated article points search engines at the English original
        alternates: fallback ? { canonical: `/journal/${slug}` } : { canonical: `/hi/journal/${slug}`, ...languageAlternates(`/journal/${slug}`) },
        openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/hi/journal/${slug}`, locale: "hi_IN", publishedTime: post.date ?? undefined, images: post.cover ? [{ url: post.cover }] : undefined },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const found = await load(slug);
    if (!found) notFound();
    return <JournalArticle post={found.post} locale="hi" fallback={found.fallback} />;
}
