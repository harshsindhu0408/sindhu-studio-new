import { addOns, addOnPrice, type AddOn, type AddOnId } from "./addons";

export type PackageId = "silver" | "gold" | "platinum" | "diamond" | "prime" | "exclusive";

export type FeatureId =
    | "photos"
    | "video"
    | "highlights"
    | "led43"
    | "pendrive"
    | "extraCameramen"
    | "ringCeremony"
    | "preWedding"
    | "candid"
    | "teaser"
    | "cinematic"
    | "drone"
    | "albumSheets"
    | "albumPaper"
    | "albumDesign"
    | "frame"
    | "ledWall"
    | "backup";

/**
 * true    = included
 * false   = not included (and no add-on exists)
 * number  = included, quantity (e.g. LED walls)
 * string  = included, with a qualifier ("Main event only", "60 sheets")
 * {addOn} = not included, but available as an add-on
 */
export type FeatureValue = boolean | number | string | { addOn: AddOnId };

export type FeatureGroup = "coverage" | "photo" | "video" | "album" | "venue" | "delivery";

export interface Feature {
    id: FeatureId;
    label: string;
    labelHi: string;
    explainHi: string;
    group: FeatureGroup;
    explain: string;
    /** Same in every package: shown once in the "Every package includes" strip. */
    universal?: { label: string; labelHi: string };
}

export interface Package {
    id: PackageId;
    name: string;
    price: number;
    summary: string;
    summaryHi: string;
    highlights: string[];
    highlightsHi: string[];
    popular?: boolean;
    values: Record<FeatureId, FeatureValue>;
}

export const featureGroups: { id: FeatureGroup; label: string; labelHi: string }[] = [
    { id: "coverage", label: "Coverage & team", labelHi: "कवरेज और टीम" },
    { id: "photo", label: "Photography", labelHi: "फोटोग्राफी" },
    { id: "video", label: "Video & film", labelHi: "वीडियो और फ़िल्म" },
    { id: "album", label: "Album & prints", labelHi: "एल्बम और प्रिंट" },
    { id: "venue", label: "At the venue", labelHi: "वेन्यू पर" },
    { id: "delivery", label: "Delivery", labelHi: "डिलीवरी" },
];

export const features: Feature[] = [
    { id: "photos", label: "Full HD photos", labelHi: "फुल HD फोटो", explainHi: "आपके पूरे कार्यक्रम की सभी फोटो, फुल रेज़ोल्यूशन में।", group: "photo", explain: "Every photo from your event in full resolution.", universal: { label: "Full HD photos of your whole event", labelHi: "पूरे कार्यक्रम की फुल HD फोटो" } },
    { id: "video", label: "Full HD video", labelHi: "फुल HD वीडियो", explainHi: "पूरा पारंपरिक वीडियो, मास्टर कॉपी और एडिटेड कॉपी दोनों।", group: "video", explain: "The complete traditional video, as a master copy and an edited copy.", universal: { label: "Full HD video: master + edited copy", labelHi: "फुल HD वीडियो: मास्टर + एडिटेड कॉपी" } },
    { id: "highlights", label: "Highlights video", labelHi: "हाइलाइट्स वीडियो", explainHi: "सबसे अच्छे पलों का छोटा एडिटेड वीडियो।", group: "video", explain: "A short edited video of the best moments.", universal: { label: "Highlights video", labelHi: "हाइलाइट्स वीडियो" } },
    { id: "led43", label: "43\" LED screens", labelHi: "43\" LED स्क्रीन", explainHi: "वेन्यू पर दो 43 इंच की स्क्रीन, जिन पर लाइव कवरेज चलती है।", group: "venue", explain: "Two 43-inch screens at the venue showing the live feed.", universal: { label: "2 × 43\" LED screens at the venue", labelHi: "वेन्यू पर 2 × 43\" LED स्क्रीन" } },
    { id: "pendrive", label: "64 GB pendrive", labelHi: "64 GB पेनड्राइव", explainHi: "आपकी सभी फोटो और वीडियो 64 GB पेनड्राइव में।", group: "delivery", explain: "All your photos and videos delivered on a 64 GB pendrive.", universal: { label: "64 GB pendrive with everything", labelHi: "सब कुछ 64 GB पेनड्राइव में" } },

    { id: "extraCameramen", label: "Extra cameramen", labelHi: "एक्स्ट्रा कैमरामैन", explainHi: "मुख्य टीम के अलावा और कैमरामैन, ताकि ज़्यादा पल और ज़्यादा एंगल कवर हों।", group: "coverage", explain: "Additional cameramen on top of the core team, so more moments and more angles get covered." },
    { id: "ringCeremony", label: "Ring ceremony", labelHi: "रिंग सेरेमनी", explainHi: "आपके रोका / सगाई / रिंग सेरेमनी की कवरेज।", group: "coverage", explain: "Coverage of your roka / sagai / ring ceremony." },
    { id: "preWedding", label: "Pre-wedding shoot", labelHi: "प्री-वेडिंग शूट", explainHi: "शादी से पहले कपल का अलग फोटो और वीडियो शूट।", group: "coverage", explain: "A separate photo and video shoot of the couple before the wedding." },

    { id: "candid", label: "Candid photography", labelHi: "कैंडिड फोटोग्राफी", explainHi: "पारंपरिक फोटोग्राफर के साथ एक अलग फोटोग्राफर, जो बिना पोज़ के असली पल कैद करता है।", group: "photo", explain: "A dedicated photographer for natural, unposed moments, alongside the traditional photographer." },

    { id: "teaser", label: "Teaser video", labelHi: "टीज़र वीडियो", explainHi: "1–2 मिनट का टीज़र, WhatsApp और इंस्टाग्राम के लिए बढ़िया।", group: "video", explain: "A 1–2 minute teaser, perfect for WhatsApp and Instagram." },
    { id: "cinematic", label: "Cinematic film", labelHi: "सिनेमैटिक फ़िल्म", explainHi: "फ़िल्म की तरह शूट और एडिट की गई वीडियो, गानों के साथ।", group: "video", explain: "A film shot and edited like a movie, set to music." },
    { id: "drone", label: "Drone shoot", labelHi: "ड्रोन शूट", explainHi: "आपके वेन्यू और खास पलों की आसमान से फोटो और वीडियो।", group: "video", explain: "Aerial photos and video of your venue and big moments." },

    { id: "albumSheets", label: "14×40 album (leather cover)", labelHi: "14×40 एल्बम (लेदर कवर)", explainHi: "आपके 14×40 इंच के प्रिंटेड एल्बम में कितनी शीट हैं।", group: "album", explain: "Number of sheets in your printed 14×40 inch album." },
    { id: "albumPaper", label: "Album paper", labelHi: "एल्बम पेपर", explainHi: "एक्स्ट्रा हाई-क्वालिटी पेपर में रंग गहरे आते हैं और एल्बम भारी, मज़बूत लगता है।", group: "album", explain: "Extra high-quality paper gives deeper colours and a heavier feel." },
    { id: "albumDesign", label: "Custom album design", labelHi: "कस्टम एल्बम डिज़ाइन", explainHi: "हर पेज आपकी फोटो के हिसाब से हाथ से डिज़ाइन किया जाता है, तय टेम्पलेट से नहीं।", group: "album", explain: "Each spread designed by hand around your photos, instead of a fixed template." },
    { id: "frame", label: "Wedding photo frame", labelHi: "शादी का फोटो फ्रेम", explainHi: "घर के लिए प्रिंटेड फोटो फ्रेम, साइज़ इंच में।", group: "album", explain: "Printed wedding photo frames for your home, sizes in inches." },

    { id: "ledWall", label: "8×12 ft LED wall", labelHi: "8×12 फ़ीट LED वॉल", explainHi: "लाइव कवरेज और प्री-वेडिंग फ़िल्म के लिए बड़ी LED वॉल।", group: "venue", explain: "A giant LED wall for the live feed and your pre-wedding film." },

    { id: "backup", label: "Backup kept 6 months", labelHi: "6 महीने का बैकअप", explainHi: "डिलीवरी के बाद 6 महीने तक हम आपके डेटा की बैकअप कॉपी रखते हैं।", group: "delivery", explain: "We keep a backup copy of your data for 6 months after delivery." },
];

const shared = { photos: true, video: true, highlights: true, led43: 2, pendrive: true } as const;

// Source: the old free-text package lists. See docs/EXPERIENCE_SPEC.md §2 for open questions.
export const packages: Package[] = [
    {
        id: "silver",
        name: "Silver",
        price: 49999,
        summary: "Everything a 2-day wedding needs, done properly.",
        highlights: ["2-day programme coverage", "50-sheet 14×40 album", "Full HD photos & video", "2 LED screens at the venue", "16×20 wedding frame"],
        highlightsHi: ["2 दिन के कार्यक्रम की कवरेज", "50 शीट का 14×40 एल्बम", "फुल HD फोटो और वीडियो", "वेन्यू पर 2 LED स्क्रीन", "16×20 शादी का फ्रेम"],
        summaryHi: "2 दिन की शादी के लिए ज़रूरी सब कुछ, अच्छे से।",
        values: {
            ...shared,
            extraCameramen: false,
            ringCeremony: { addOn: "ring-ceremony" },
            preWedding: { addOn: "pre-wedding" },
            candid: { addOn: "candid" },
            teaser: false,
            cinematic: { addOn: "cinematic" },
            drone: { addOn: "drone" },
            albumSheets: "50 sheets",
            albumPaper: "Standard",
            albumDesign: false,
            frame: "1 × 16×20",
            ledWall: { addOn: "led-wall" },
            backup: false,
        },
    },
    {
        id: "gold",
        name: "Gold",
        price: 69999,
        popular: true,
        summary: "Adds candid photography, a teaser and a hand-designed album.",
        highlights: ["Candid photography (wedding day)", "Video teaser", "60-sheet custom-designed album", "Full HD photos & video", "16×24 wedding frame"],
        highlightsHi: ["कैंडिड फोटोग्राफी (शादी का दिन)", "वीडियो टीज़र", "60 शीट का कस्टम डिज़ाइन एल्बम", "फुल HD फोटो और वीडियो", "16×24 शादी का फ्रेम"],
        summaryHi: "कैंडिड फोटोग्राफी, टीज़र और डिज़ाइन किया हुआ एल्बम जुड़ता है।",
        values: {
            ...shared,
            extraCameramen: false,
            ringCeremony: { addOn: "ring-ceremony" },
            preWedding: { addOn: "pre-wedding" },
            // Confirmed by the owner: Gold and Platinum both include candid on the wedding day only.
            candid: "Wedding day",
            teaser: true,
            cinematic: { addOn: "cinematic" },
            drone: { addOn: "drone" },
            albumSheets: "60 sheets",
            albumPaper: "Standard",
            albumDesign: true,
            frame: "1 × 16×24",
            ledWall: { addOn: "led-wall" },
            backup: false,
        },
    },
    {
        id: "platinum",
        name: "Platinum",
        price: 99999,
        summary: "Adds drone, a cinematic film and the giant LED wall.",
        highlights: ["Drone shoot", "Cinematic film (wedding day)", "8×12 ft LED wall", "80-sheet custom album", "20×30 wedding frame"],
        highlightsHi: ["ड्रोन शूट", "सिनेमैटिक फ़िल्म (शादी का दिन)", "8×12 फ़ीट LED वॉल", "80 शीट का कस्टम एल्बम", "20×30 शादी का फ्रेम"],
        summaryHi: "ड्रोन, सिनेमैटिक फ़िल्म और बड़ी LED वॉल जुड़ती है।",
        values: {
            ...shared,
            extraCameramen: false,
            ringCeremony: { addOn: "ring-ceremony" },
            preWedding: { addOn: "pre-wedding" },
            candid: "Wedding day",
            teaser: true,
            cinematic: "Wedding day",
            drone: true,
            albumSheets: "80 sheets",
            albumPaper: "Standard",
            albumDesign: true,
            frame: "1 × 20×30",
            ledWall: 1,
            backup: false,
        },
    },
    {
        id: "diamond",
        name: "Diamond",
        price: 124999,
        summary: "Two albums, your ring ceremony and a bigger team.",
        highlights: ["Ring ceremony included", "Two 50-sheet albums", "Extra cameramen", "Drone + cinematic film", "6-month backup"],
        highlightsHi: ["रिंग सेरेमनी शामिल", "दो 50 शीट के एल्बम", "एक्स्ट्रा कैमरामैन", "ड्रोन + सिनेमैटिक फ़िल्म", "6 महीने का बैकअप"],
        summaryHi: "दो एल्बम, आपकी रिंग सेरेमनी और बड़ी टीम।",
        values: {
            ...shared,
            extraCameramen: "Yes",
            ringCeremony: true,
            preWedding: { addOn: "pre-wedding" },
            candid: "Wedding day",
            teaser: true,
            cinematic: "Wedding day",
            drone: true,
            albumSheets: "2 × 50 sheets",
            albumPaper: "Standard",
            albumDesign: true,
            frame: "20×30 + 16×20",
            ledWall: 1,
            backup: true,
        },
    },
    {
        id: "prime",
        name: "Prime",
        price: 149999,
        summary: "Premium album paper, two extra cameramen and candid at the ring ceremony.",
        highlights: ["2 extra cameramen", "Extra high-quality album paper", "Ring ceremony with candid", "Two 50-sheet albums", "2 × 20×30 frames"],
        highlightsHi: ["2 एक्स्ट्रा कैमरामैन", "एक्स्ट्रा हाई-क्वालिटी एल्बम पेपर", "रिंग सेरेमनी कैंडिड के साथ", "दो 50 शीट के एल्बम", "2 × 20×30 फ्रेम"],
        summaryHi: "प्रीमियम एल्बम पेपर, दो एक्स्ट्रा कैमरामैन और रिंग सेरेमनी में कैंडिड।",
        values: {
            ...shared,
            extraCameramen: "+2",
            ringCeremony: "With candid",
            preWedding: { addOn: "pre-wedding" },
            candid: "Wedding day",
            teaser: true,
            cinematic: "Wedding day",
            drone: true,
            albumSheets: "2 × 50 sheets",
            albumPaper: "Extra high-quality",
            albumDesign: true,
            frame: "2 × 20×30",
            ledWall: 1,
            backup: true,
        },
    },
    {
        id: "exclusive",
        name: "Exclusive",
        price: 199999,
        summary: "Every function for 3 days: pre-wedding, ring ceremony and the wedding.",
        highlights: ["3-day programme coverage", "Pre-wedding shoot included", "Candid & cinematic at every function", "130-sheet premium album", "2 LED walls + acrylic frames"],
        highlightsHi: ["3 दिन के कार्यक्रम की कवरेज", "प्री-वेडिंग शूट शामिल", "हर कार्यक्रम में कैंडिड और सिनेमैटिक", "130 शीट का प्रीमियम एल्बम", "2 LED वॉल + एक्रेलिक फ्रेम"],
        summaryHi: "3 दिन, हर कार्यक्रम: प्री-वेडिंग, रिंग सेरेमनी और शादी।",
        values: {
            ...shared,
            extraCameramen: "+2",
            ringCeremony: true,
            preWedding: true,
            candid: "All functions",
            teaser: true,
            cinematic: "All functions",
            drone: true,
            albumSheets: "130 sheets",
            albumPaper: "Extra high-quality",
            albumDesign: true,
            frame: "2 × 20×30 acrylic",
            ledWall: 2,
            backup: true,
        },
    },
];

export const universalFeatures = features.filter((f) => f.universal);
export const comparableFeatures = features.filter((f) => !f.universal);

export function getPackage(id: string): Package | undefined {
    return packages.find((p) => p.id === id);
}

export function isPackageId(id: string): id is PackageId {
    return packages.some((p) => p.id === id);
}

export const lowestPrice = Math.min(...packages.map((p) => p.price));
export const highestPrice = Math.max(...packages.map((p) => p.price));

export function isIncluded(v: FeatureValue): boolean {
    return v !== false && !(typeof v === "object" && "addOn" in v);
}

/** How much of an add-on a package already covers. */
export function addOnCoverage(pkg: Package | undefined, addOn: AddOn): "full" | "partial" | "none" {
    if (!pkg || !addOn.feature) return "none";
    const v = pkg.values[addOn.feature];
    if (v === true) return "full";
    if (!isIncluded(v)) return "none";
    if (typeof v === "number") return "partial";
    if (typeof v === "string" && /wedding day/i.test(v)) return "partial";
    return "full";
}

export interface Upgrade {
    from: Package;
    to: Package;
    extra: number;
    priced: { addOn: AddOn; price: number }[];
    pricedTotal: number;
    alsoBetter: string[];
    alsoBetterHi: string[];
}

/**
 * What you get by moving up one tier, priced with today's add-on prices.
 * Computed, never hand-written, so the nudge can't go stale.
 */
export function upgradeBetween(from: Package, to: Package): Upgrade {
    const priced: Upgrade["priced"] = [];
    const alsoBetter: string[] = [];
    const alsoBetterHi: string[] = [];

    for (const f of comparableFeatures) {
        const a = from.values[f.id];
        const b = to.values[f.id];
        if (JSON.stringify(a) === JSON.stringify(b) || !isIncluded(b)) continue;

        const addOn = addOns.find((x) => x.feature === f.id);
        if (typeof a === "object" && "addOn" in a && addOn) {
            priced.push({ addOn, price: addOnPrice(addOn, 1) });
        } else if (typeof a === "number" && typeof b === "number" && addOn) {
            priced.push({ addOn, price: addOnPrice(addOn, 1) * (b - a) });
        } else {
            alsoBetter.push(typeof b === "string" ? `${f.label}: ${b}` : f.label);
            alsoBetterHi.push(typeof b === "string" ? `${f.labelHi}: ${valueToHindi(b)}` : f.labelHi);
        }
    }

    return {
        from,
        to,
        extra: to.price - from.price,
        priced,
        pricedTotal: priced.reduce((s, p) => s + p.price, 0),
        alsoBetter,
        alsoBetterHi,
    };
}

export function nextPackage(pkg: Package): Package | undefined {
    return packages[packages.findIndex((p) => p.id === pkg.id) + 1];
}

const valueHi: Record<string, string> = {
    "Wedding day": "शादी का दिन",
    "All functions": "हर कार्यक्रम",
    Standard: "स्टैंडर्ड",
    "Extra high-quality": "एक्स्ट्रा हाई-क्वालिटी",
    Yes: "हां",
    "With candid": "कैंडिड के साथ",
};

/** Hindi wording for the short value strings shown in the comparison table */
export function valueToHindi(v: string) {
    if (valueHi[v]) return valueHi[v];
    return v.replace(/sheets/g, "शीट").replace(/acrylic/g, "एक्रेलिक").replace(/walls?/g, "वॉल");
}
