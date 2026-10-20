import { mediaItems } from "./media.generated";

export type MediaCategory = "bridal" | "couples" | "ceremonies" | "haldi-mehendi" | "portraits";

export interface MediaItem {
    id: string;
    src: string;
    width: number;
    height: number;
    blurDataURL: string;
    category: MediaCategory;
    alt: string;
    featured: boolean;
}

export const mediaCategories: { id: MediaCategory; label: string; title: string; description: string }[] = [
    {
        id: "bridal",
        label: "Bridal",
        title: "Bridal Portraits",
        description: "Bridal portraits shot in studio light and at the venue: lehengas, kaleere, choora and the quiet moments before the pheras.",
    },
    {
        id: "couples",
        label: "Couples",
        title: "Couple & Pre-Wedding Portraits",
        description: "Pre-wedding shoots, ring ceremonies and couple portraits, outdoors and indoors.",
    },
    {
        id: "ceremonies",
        label: "Ceremonies",
        title: "Wedding Ceremonies",
        description: "Bride entries, varmala, sindoor daan and the family moments in between, documented as they happen.",
    },
    {
        id: "haldi-mehendi",
        label: "Haldi & Mehendi",
        title: "Haldi & Mehendi",
        description: "Colour, laughter and rituals from haldi and mehendi functions.",
    },
    {
        id: "portraits",
        label: "Portraits",
        title: "Portraits",
        description: "Groom portraits and individual portraits for families and guests.",
    },
];

export const media = mediaItems;

export function getMedia(id: string): MediaItem {
    const item = mediaItems.find((m) => m.id === id);
    if (!item) throw new Error(`Unknown media id: ${id}`);
    return item;
}

export const featuredMedia = mediaItems.filter((m) => m.featured);

export function mediaByCategory(category: MediaCategory) {
    return mediaItems.filter((m) => m.category === category);
}
