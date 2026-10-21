import type { FeatureId } from "./packages";

export type AddOnId =
    | "drone"
    | "led-wall"
    | "led-43"
    | "candid"
    | "cinematic"
    | "ring-ceremony"
    | "pre-wedding"
    | "live-stream"
    | "kuan-poojan"
    | "baby-shoot"
    | "birthday";

export type AddOnPricing =
    | { type: "flat"; price: number }
    | { type: "per-day"; price: number; maxQty: number }
    | { type: "tiered"; tiers: { qty: number; label: string; price: number }[] };

export type AddOnCategory = "film-photo" | "venue-tech" | "functions" | "other-events";

export interface AddOn {
    id: AddOnId;
    name: string;
    nameHi: string;
    pitch: string;
    pitchHi: string;
    description: string;
    descriptionHi: string;
    category: AddOnCategory;
    pricing: AddOnPricing;
    /** Matrix feature this add-on corresponds to, so we know when a package already includes it. */
    feature?: FeatureId;
    /** Real photo (media id) or real clip from the studio's own work. No stock imagery. */
    media?: { image?: string; src?: string; alt?: string; video?: string; poster?: string };
    /** Separate events that can be booked without a wedding package. */
    standalone?: boolean;
    /**
     * Only real, dated offers. When set, the UI shows the old price struck through
     * and the end date; when `endsOn` passes, the offer disappears by itself.
     */
    offer?: { price: number; endsOn: string; reason: string };
}

export const addOnCategories: { id: AddOnCategory; label: string }[] = [
    { id: "film-photo", label: "Photo & film" },
    { id: "venue-tech", label: "Venue tech" },
    { id: "functions", label: "Extra functions" },
    { id: "other-events", label: "Other events" },
];

export const addOns: AddOn[] = [
    {
        id: "drone",
        name: "Drone Shoot",
        nameHi: "ड्रोन शूट",
        pitch: "Your venue, baraat and pheras from the sky.",
        description: "Aerial photos and video of your venue and key moments, edited into your film. Flying depends on venue and local permissions.",
        pitchHi: "आपका वेन्यू, बारात और फेरे, आसमान से।",
        descriptionHi: "आपके वेन्यू और खास पलों की आसमान से फोटो और वीडियो, आपकी फ़िल्म में एडिट करके। उड़ान वेन्यू और स्थानीय अनुमति पर निर्भर है।",
        category: "film-photo",
        pricing: { type: "flat", price: 7999 },
        feature: "drone",
        media: { video: "/films/drone-loop.mp4", poster: "/films/drone-poster.webp" },
    },
    {
        id: "candid",
        name: "Candid Photography",
        nameHi: "कैंडिड फोटोग्राफी",
        pitch: "The laughs and tears nobody posed for.",
        description: "A dedicated candid photographer who captures natural, unposed moments while the traditional team covers the rituals.",
        pitchHi: "वो हंसी और आंसू, जिनके लिए किसी ने पोज़ नहीं दिया।",
        descriptionHi: "एक अलग कैंडिड फोटोग्राफर जो असली, बिना पोज़ के पल कैद करता है, जबकि पारंपरिक टीम रस्में कवर करती है।",
        category: "film-photo",
        pricing: { type: "per-day", price: 11999, maxQty: 3 },
        feature: "candid",
        media: { image: "bride-candid-smile-over-shoulder" },
    },
    {
        id: "cinematic",
        name: "Cinematic Videography",
        nameHi: "सिनेमैटिक वीडियो",
        pitch: "Your wedding, cut like a film.",
        description: "A cinematic film shot on gimbals and prime lenses, edited to music, alongside your full traditional video.",
        pitchHi: "आपकी शादी, फ़िल्म की तरह।",
        descriptionHi: "जिम्बल और प्राइम लेंस से शूट की गई, गानों के साथ एडिट की गई सिनेमैटिक फ़िल्म, पूरे पारंपरिक वीडियो के साथ।",
        category: "film-photo",
        pricing: { type: "per-day", price: 12499, maxQty: 3 },
        feature: "cinematic",
        media: { video: "/films/cinematic-loop.mp4", poster: "/films/cinematic-poster.webp" },
    },
    {
        id: "pre-wedding",
        name: "Pre-Wedding Shoot",
        nameHi: "प्री-वेडिंग शूट",
        pitch: "A day for just the two of you before the rush.",
        description: "A romantic photo and video shoot at a location you choose, ready to play on the LED screens at your wedding.",
        pitchHi: "शादी की भागदौड़ से पहले, सिर्फ़ आप दोनों का एक दिन।",
        descriptionHi: "आपकी पसंद की जगह पर रोमांटिक फोटो और वीडियो शूट, जो शादी की LED स्क्रीन पर चलाने के लिए तैयार होता है।",
        category: "functions",
        pricing: { type: "flat", price: 24999 },
        feature: "preWedding",
        media: { image: "couple-twirl-outdoor-pre-wedding" },
    },
    {
        id: "ring-ceremony",
        name: "Ring Ceremony",
        nameHi: "रिंग सेरेमनी / सगाई",
        pitch: "Your roka or sagai, covered properly.",
        description: "Full photo and video coverage of your ring ceremony with a dedicated team.",
        pitchHi: "आपका रोका या सगाई, पूरी तरह कवर।",
        descriptionHi: "अलग टीम के साथ आपकी रिंग सेरेमनी की पूरी फोटो और वीडियो कवरेज।",
        category: "functions",
        pricing: { type: "flat", price: 11999 },
        feature: "ringCeremony",
        media: { image: "ring-ceremony-hands-detail" },
    },
    {
        id: "led-wall",
        name: "LED Wall (8×12 ft)",
        nameHi: "LED वॉल (8×12)",
        pitch: "A giant live screen so the last row sees the pheras.",
        description: "An 8×12 ft high-definition LED wall showing the live feed, your pre-wedding film and photos.",
        pitchHi: "बड़ी लाइव स्क्रीन, ताकि आख़िरी लाइन में बैठे मेहमान भी फेरे देख सकें।",
        descriptionHi: "8×12 फ़ीट की हाई-डेफ़िनिशन LED वॉल, जिस पर लाइव कवरेज, प्री-वेडिंग फ़िल्म और फोटो चलती हैं।",
        category: "venue-tech",
        pricing: { type: "flat", price: 9999 },
        media: { src: "/images/addons/led-wall.webp", alt: "LED wall beside a decorated wedding stage" },
        feature: "ledWall",
    },
    {
        id: "led-43",
        name: "Extra 43\" LED Screens",
        nameHi: "43 इंच LED स्क्रीन",
        pitch: "More screens around the venue for the live feed.",
        description: "Additional 43-inch LED screens placed around the venue, showing the live feed.",
        pitchHi: "वेन्यू में लाइव कवरेज के लिए और स्क्रीन।",
        descriptionHi: "वेन्यू में अलग-अलग जगह लगाई जाने वाली 43 इंच की अतिरिक्त LED स्क्रीन, जिन पर लाइव कवरेज चलती है।",
        category: "venue-tech",
        pricing: {
            type: "tiered",
            tiers: [
                { qty: 1, label: "1 screen", price: 2999 },
                { qty: 2, label: "2 screens", price: 4999 },
            ],
        },
        media: { src: "/images/addons/led-screens.webp", alt: "The live feed of a wedding couple shown on two 43-inch LED screens" },
    },
    {
        id: "live-stream",
        name: "Live Stream on YouTube",
        nameHi: "यूट्यूब लाइव स्ट्रीम",
        pitch: "Nani in Canada watches the pheras live.",
        description: "A private YouTube live stream of your ceremony for family who can't travel, in India or abroad.",
        pitchHi: "कनाडा में बैठी नानी भी फेरे लाइव देखें।",
        descriptionHi: "आपकी शादी की प्राइवेट YouTube लाइव स्ट्रीम, उन रिश्तेदारों के लिए जो आ नहीं सकते, देश में हों या विदेश में।",
        category: "venue-tech",
        pricing: { type: "flat", price: 9999 },
        media: { src: "/images/addons/live-stream.webp", alt: "Wedding couple shown on a live stream, watched by family abroad" },
    },
    {
        id: "kuan-poojan",
        name: "Kuan Poojan",
        nameHi: "कुआं पूजन",
        pitch: "The ritual most studios forget to cover.",
        description: "Traditional photo and video coverage of the Kuan Poojan (Kua Pujan) ceremony.",
        pitchHi: "वो रस्म जिसे ज़्यादातर स्टूडियो भूल जाते हैं।",
        descriptionHi: "कुआं पूजन (कुआ पूजन) की पारंपरिक फोटो और वीडियो कवरेज।",
        category: "other-events",
        pricing: { type: "flat", price: 9999 },
        media: { src: "/images/addons/kuan-poojan.webp", alt: "Illustration of a kalash on a well with marigolds and diyas" },
        standalone: true,
    },
    {
        id: "baby-shoot",
        name: "Baby Shoot",
        nameHi: "बेबी शूट",
        pitch: "Tiny fingers, big milestones.",
        description: "A creative portrait session for your baby's milestones, at the studio or at home.",
        pitchHi: "छोटी उंगलियां, बड़े पल।",
        descriptionHi: "आपके बच्चे के खास पलों का क्रिएटिव पोर्ट्रेट सेशन, स्टूडियो में या घर पर।",
        category: "other-events",
        pricing: { type: "flat", price: 9999 },
        media: { src: "/images/addons/baby-shoot.webp", alt: "Illustration of baby footprints under a crescent moon" },
        standalone: true,
    },
    {
        id: "birthday",
        name: "Birthday Coverage",
        nameHi: "जन्मदिन कवरेज",
        pitch: "The party, the cake, the chaos.",
        description: "Photo and video coverage of a birthday party for children or adults.",
        pitchHi: "पार्टी, केक और पूरी मस्ती।",
        descriptionHi: "बच्चों या बड़ों की जन्मदिन पार्टी की फोटो और वीडियो कवरेज।",
        category: "other-events",
        pricing: { type: "flat", price: 9999 },
        media: { src: "/images/addons/birthday.webp", alt: "Illustration of a birthday cake with candles and bunting" },
        standalone: true,
    },
];

export function getAddOn(id: AddOnId): AddOn {
    const a = addOns.find((x) => x.id === id);
    if (!a) throw new Error(`Unknown add-on: ${id}`);
    return a;
}

export function isAddOnId(id: string): id is AddOnId {
    return addOns.some((a) => a.id === id);
}

export function activeOffer(addOn: AddOn, now = new Date()) {
    if (!addOn.offer) return undefined;
    return new Date(addOn.offer.endsOn) >= now ? addOn.offer : undefined;
}

/** Price for a quantity (days / screens). */
export function addOnPrice(addOn: AddOn, qty = 1): number {
    const offer = activeOffer(addOn);
    switch (addOn.pricing.type) {
        case "flat":
            return offer?.price ?? addOn.pricing.price;
        case "per-day":
            return (offer?.price ?? addOn.pricing.price) * qty;
        case "tiered":
            return (addOn.pricing.tiers.find((t) => t.qty === qty) ?? addOn.pricing.tiers[0]).price;
    }
}

export function addOnFromPrice(addOn: AddOn): number {
    return addOn.pricing.type === "tiered" ? addOn.pricing.tiers[0].price : addOnPrice(addOn, 1);
}

export function addOnUnitLabel(addOn: AddOn): string {
    if (addOn.pricing.type === "per-day") return "per day";
    if (addOn.pricing.type === "tiered") return `from ${addOn.pricing.tiers[0].label}`;
    return "";
}

export function maxQty(addOn: AddOn): number {
    if (addOn.pricing.type === "per-day") return addOn.pricing.maxQty;
    if (addOn.pricing.type === "tiered") return addOn.pricing.tiers[addOn.pricing.tiers.length - 1].qty;
    return 1;
}
