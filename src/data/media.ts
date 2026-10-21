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

export const mediaCategories: { id: MediaCategory; label: string; title: string; description: string; labelHi: string; titleHi: string; descriptionHi: string }[] = [
    {
        id: "bridal",
        labelHi: "दुल्हन",
        titleHi: "दुल्हन के पोर्ट्रेट",
        descriptionHi: "स्टूडियो लाइट और वेन्यू पर शूट किए गए दुल्हन के पोर्ट्रेट: लहंगा, कलीरे, चूड़ा और फेरों से पहले के शांत पल।",
        label: "Bridal",
        title: "Bridal Portraits",
        description: "Bridal portraits shot in studio light and at the venue: lehengas, kaleere, choora and the quiet moments before the pheras.",
    },
    {
        id: "couples",
        labelHi: "कपल",
        titleHi: "कपल और प्री-वेडिंग पोर्ट्रेट",
        descriptionHi: "प्री-वेडिंग शूट, रिंग सेरेमनी और कपल पोर्ट्रेट, बाहर भी और अंदर भी।",
        label: "Couples",
        title: "Couple & Pre-Wedding Portraits",
        description: "Pre-wedding shoots, ring ceremonies and couple portraits, outdoors and indoors.",
    },
    {
        id: "ceremonies",
        labelHi: "रस्में",
        titleHi: "शादी की रस्में",
        descriptionHi: "दुल्हन की एंट्री, वरमाला, सिंदूर दान और बीच के पारिवारिक पल, जैसे-जैसे होते हैं वैसे ही।",
        label: "Ceremonies",
        title: "Wedding Ceremonies",
        description: "Bride entries, varmala, sindoor daan and the family moments in between, documented as they happen.",
    },
    {
        id: "haldi-mehendi",
        labelHi: "हल्दी और मेहंदी",
        titleHi: "हल्दी और मेहंदी",
        descriptionHi: "हल्दी और मेहंदी के फंक्शन के रंग, हंसी और रस्में।",
        label: "Haldi & Mehendi",
        title: "Haldi & Mehendi",
        description: "Colour, laughter and rituals from haldi and mehendi functions.",
    },
    {
        id: "portraits",
        labelHi: "पोर्ट्रेट",
        titleHi: "पोर्ट्रेट",
        descriptionHi: "दूल्हे के पोर्ट्रेट और परिवार व मेहमानों के अलग पोर्ट्रेट।",
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
