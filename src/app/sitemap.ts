import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/business";
import { media, mediaByCategory, mediaCategories } from "@/data/media";
import { services } from "@/data/services";
import { cities, cityHasProof } from "@/data/cities";
import { hasHindi, localePath } from "@/i18n";
import { getJournalPosts, getWeddings } from "@/lib/content";

// Fixed dates: update when a page's content really changes. A date that moves on every
// build teaches Google to ignore lastModified.
const CONTENT_UPDATED = new Date("2026-10-20");
const LEGAL_UPDATED = new Date("2026-10-20");

type Freq = "weekly" | "monthly" | "yearly";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const abs = (p: string) => `${SITE_URL}${p}`;
    const page = (path: string, priority: number, changeFrequency: Freq, lastModified = CONTENT_UPDATED, images?: string[]): MetadataRoute.Sitemap[number] => ({
        url: abs(path),
        lastModified,
        changeFrequency,
        priority,
        ...(images ? { images: images.map(abs) } : {}),
        ...(hasHindi(path) ? { alternates: { languages: { "en-IN": abs(path), "hi-IN": abs(localePath("hi", path)) } } } : {}),
    });
    const hindi = (path: string, priority: number, changeFrequency: Freq): MetadataRoute.Sitemap[number] => ({
        url: abs(localePath("hi", path)),
        lastModified: CONTENT_UPDATED,
        changeFrequency,
        priority,
        alternates: { languages: { "en-IN": abs(path), "hi-IN": abs(localePath("hi", path)) } },
    });

    const [posts, weddings] = await Promise.all([getJournalPosts(), getWeddings()]);

    const english = [
        page("/", 1, "weekly", CONTENT_UPDATED, media.filter((m) => m.featured).map((m) => m.src)),
        page("/packages", 0.95, "monthly"),
        page("/build", 0.9, "monthly"),
        page("/plan", 0.85, "monthly"),
        page("/vivah-muhurat-2027", 0.9, "weekly"),
        page("/add-ons", 0.85, "monthly"),
        page("/services", 0.8, "monthly"),
        ...services.map((s) => page(`/services/${s.slug}`, 0.8, "monthly")),
        ...cities.filter(cityHasProof).map((c) => page(`/wedding-photographer/${c.slug}`, 0.8, "monthly")),
        page("/portfolio", 0.85, "weekly", CONTENT_UPDATED, media.map((m) => m.src)),
        ...mediaCategories.map((c) => page(`/portfolio/${c.id}`, 0.7, "monthly", CONTENT_UPDATED, mediaByCategory(c.id).map((m) => m.src))),
        page("/weddings", 0.7, "weekly"),
        ...weddings.map((w) => page(`/weddings/${w.slug}`, 0.7, "monthly", w.date ? new Date(w.date) : CONTENT_UPDATED, [w.cover])),
        page("/journal", 0.7, "weekly"),
        ...posts.map((p) => page(`/journal/${p.slug}`, 0.6, "monthly", p.date ? new Date(p.date) : CONTENT_UPDATED)),
        page("/about", 0.6, "monthly"),
        page("/contact", 0.7, "monthly"),
        // Legal
        page("/privacy", 0.3, "yearly", LEGAL_UPDATED),
        page("/terms", 0.3, "yearly", LEGAL_UPDATED),
        page("/cancellation-policy", 0.3, "yearly", LEGAL_UPDATED),
        page("/delivery-policy", 0.2, "yearly", LEGAL_UPDATED),
        page("/cookie-policy", 0.2, "yearly", LEGAL_UPDATED),
    ];

    // Every English page has a Hindi twin at /hi/..., at slightly lower priority
    const hindiPages = english.map((e) => {
        const path = e.url.slice(SITE_URL.length) || "/";
        return { ...hindi(path, Math.round((e.priority ?? 0.5) * 0.9 * 100) / 100, e.changeFrequency as Freq), lastModified: e.lastModified };
    });

    return [...english, ...hindiPages];
}
