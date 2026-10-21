import "server-only";
import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import Markdoc, { type Node } from "@markdoc/markdoc";
import React from "react";
import keystaticConfig from "../../keystatic.config";

/** Reads CMS content from /content (edited at /keystatic). */
const reader = createReader(process.cwd(), keystaticConfig);

export type DayStatus = "booked" | "limited";

export const getAvailability = cache(async (): Promise<Record<string, DayStatus>> => {
    const data = await reader.singletons.availability.read();
    const map: Record<string, DayStatus> = {};
    for (const d of data?.dates ?? []) if (d.date) map[d.date] = d.status as DayStatus;
    return map;
});

/** Hindi articles live in their own collection, with the same slugs as the English ones. */
const journalCollection = (locale: "en" | "hi") => (locale === "hi" ? reader.collections.journalHi : reader.collections.journal);

export const getJournalPosts = cache(async (locale: "en" | "hi" = "en") => {
    const posts = await journalCollection(locale).all();
    return posts
        .map((p) => ({ slug: p.slug, ...p.entry }))
        .filter((p) => p.date)
        .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
});

export async function getJournalPost(slug: string, locale: "en" | "hi" = "en") {
    const entry = await journalCollection(locale).read(slug);
    if (!entry) return null;
    const { node } = await entry.content();
    return { slug, ...entry, node };
}

/** Only stories the couple agreed to publish. */
export const getWeddings = cache(async () => {
    const all = await reader.collections.weddings.all();
    return all
        .filter((w) => w.entry.consent)
        .map((w) => ({ slug: w.slug, ...w.entry }))
        .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
});

export async function getWedding(slug: string) {
    const entry = await reader.collections.weddings.read(slug);
    if (!entry || !entry.consent) return null;
    const { node } = await entry.story();
    return { slug, ...entry, node };
}

/** Only real reviews shown with the client's permission. */
export const getReviews = cache(async () => {
    const all = await reader.collections.reviews.all();
    return all
        .filter((r) => r.entry.consent)
        .map((r) => ({ slug: r.slug, ...r.entry }))
        .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
});

export function renderMarkdoc(node: Node) {
    const errors = Markdoc.validate(node);
    if (errors.length) console.error("[markdoc]", errors);
    return Markdoc.renderers.react(Markdoc.transform(node), React);
}
