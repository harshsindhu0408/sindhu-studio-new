/**
 * Areas the studio covers. A city page is only indexed by Google when it has real
 * local proof (`weddingsShot` or `venues`); copy-paste city pages are "doorway pages"
 * and get penalised. Fill these in as you shoot there.
 *
 * Distances are approximate road distances from the studio on Delhi Road, Rohtak.
 */
export interface City {
    slug: string;
    name: string;
    nameHi: string;
    region: string;
    distanceKm: number;
    driveTime: string;
    /** The studio's own city */
    home?: boolean;
    /** Real local proof. Leave empty until you have it. */
    weddingsShot?: number;
    venues?: string[];
    note: string;
}

export const cities: City[] = [
    {
        slug: "rohtak",
        name: "Rohtak",
        nameHi: "रोहतक",
        region: "Haryana",
        distanceKm: 0,
        driveTime: "Our home city",
        home: true,
        note: "Our studio is on Delhi Road, opposite Balmev Plaza, so for Rohtak weddings you can visit us, see real albums and meet the team before you book. There are no travel charges within Rohtak.",
    },
    { slug: "jhajjar", name: "Jhajjar", nameHi: "झज्जर", region: "Haryana", distanceKm: 35, driveTime: "about 45 minutes", note: "Jhajjar is a short drive from our studio, so the team can reach early for haldi and morning functions." },
    { slug: "bahadurgarh", name: "Bahadurgarh", nameHi: "बहादुरगढ़", region: "Haryana", distanceKm: 50, driveTime: "about 1 hour", note: "Bahadurgarh sits between Rohtak and Delhi on the highway, and the team travels both ways regularly." },
    { slug: "sonipat", name: "Sonipat", nameHi: "सोनीपत", region: "Haryana", distanceKm: 50, driveTime: "about 1 hour", note: "Sonipat is about an hour from our studio." },
    { slug: "bhiwani", name: "Bhiwani", nameHi: "भिवानी", region: "Haryana", distanceKm: 50, driveTime: "about 1 hour", note: "Bhiwani is about an hour from our studio." },
    { slug: "jind", name: "Jind", nameHi: "जींद", region: "Haryana", distanceKm: 65, driveTime: "about 1 hour 15 minutes", note: "Jind is a little over an hour from our studio." },
    { slug: "panipat", name: "Panipat", nameHi: "पानीपत", region: "Haryana", distanceKm: 75, driveTime: "about 1 hour 30 minutes", note: "For Panipat weddings that start early, the team can stay overnight." },
    { slug: "hisar", name: "Hisar", nameHi: "हिसार", region: "Haryana", distanceKm: 100, driveTime: "about 2 hours", note: "For multi-day weddings in Hisar, the team usually stays nearby." },
    { slug: "delhi-ncr", name: "Delhi NCR", nameHi: "दिल्ली NCR", region: "Delhi", distanceKm: 75, driveTime: "about 1 hour 30 minutes", note: "We cover weddings across Delhi, Gurugram and Noida, with Rohtak pricing plus travel." },
];

export function getCity(slug: string) {
    return cities.find((c) => c.slug === slug);
}

export function cityHasProof(c: City) {
    return Boolean(c.home || c.weddingsShot || c.venues?.length);
}
