import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournalPost, getJournalPosts } from "@/lib/content";
import { languageAlternates } from "@/i18n";
import { JournalArticle } from "@/components/journal/JournalArticle";

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
        alternates: { canonical: `/journal/${slug}`, ...languageAlternates(`/journal/${slug}`) },
        openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/journal/${slug}`, publishedTime: post.date ?? undefined, images: post.cover ? [{ url: post.cover }] : undefined },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getJournalPost(slug);
    if (!post) notFound();
    return <JournalArticle post={post} locale="en" />;
}
