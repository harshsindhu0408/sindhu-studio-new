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
    driveTimeHi: string;
    /** The studio's own city */
    home?: boolean;
    /** Real local proof. Leave empty until you have it. */
    weddingsShot?: number;
    venues?: string[];
    note: string;
    noteHi: string;
}

export const cities: City[] = [
    {
        slug: "rohtak",
        name: "Rohtak",
        nameHi: "रोहतक",
        region: "Haryana",
        distanceKm: 0,
        driveTime: "Our home city",
        driveTimeHi: "हमारा अपना शहर",
        home: true,
        note: "Our studio is on Delhi Road, opposite Balmev Plaza, so for Rohtak weddings you can visit us, see real albums and meet the team before you book. There are no travel charges within Rohtak.",
        noteHi: "हमारा स्टूडियो दिल्ली रोड पर, बालमेव प्लाज़ा के सामने है, इसलिए रोहतक की शादियों के लिए आप बुकिंग से पहले हमसे मिल सकते हैं, असली एल्बम देख सकते हैं और टीम से मिल सकते हैं। रोहतक के अंदर कोई सफ़र खर्च नहीं है।",
    },
    { slug: "jhajjar", name: "Jhajjar", nameHi: "झज्जर", region: "Haryana", distanceKm: 35, driveTime: "about 45 minutes", driveTimeHi: "लगभग 45 मिनट", note: "Jhajjar is a short drive from our studio, so the team can reach early for haldi and morning functions.", noteHi: "झज्जर हमारे स्टूडियो से थोड़ी ही दूर है, इसलिए टीम हल्दी और सुबह के फंक्शन के लिए जल्दी पहुंच सकती है।" },
    { slug: "bahadurgarh", name: "Bahadurgarh", nameHi: "बहादुरगढ़", region: "Haryana", distanceKm: 50, driveTime: "about 1 hour", driveTimeHi: "लगभग 1 घंटा", note: "Bahadurgarh sits between Rohtak and Delhi on the highway, and the team travels both ways regularly.", noteHi: "बहादुरगढ़ हाईवे पर रोहतक और दिल्ली के बीच है, और टीम दोनों तरफ़ नियमित आती-जाती है।" },
    { slug: "sonipat", name: "Sonipat", nameHi: "सोनीपत", region: "Haryana", distanceKm: 50, driveTime: "about 1 hour", driveTimeHi: "लगभग 1 घंटा", note: "Sonipat is about an hour from our studio.", noteHi: "सोनीपत हमारे स्टूडियो से लगभग एक घंटे की दूरी पर है।" },
    { slug: "bhiwani", name: "Bhiwani", nameHi: "भिवानी", region: "Haryana", distanceKm: 50, driveTime: "about 1 hour", driveTimeHi: "लगभग 1 घंटा", note: "Bhiwani is about an hour from our studio.", noteHi: "भिवानी हमारे स्टूडियो से लगभग एक घंटे की दूरी पर है।" },
    { slug: "jind", name: "Jind", nameHi: "जींद", region: "Haryana", distanceKm: 65, driveTime: "about 1 hour 15 minutes", driveTimeHi: "लगभग 1 घंटा 15 मिनट", note: "Jind is a little over an hour from our studio.", noteHi: "जींद हमारे स्टूडियो से एक घंटे से थोड़ा ज़्यादा दूर है।" },
    { slug: "panipat", name: "Panipat", nameHi: "पानीपत", region: "Haryana", distanceKm: 75, driveTime: "about 1 hour 30 minutes", driveTimeHi: "लगभग 1 घंटा 30 मिनट", note: "For Panipat weddings that start early, the team can stay overnight.", noteHi: "पानीपत की जो शादियां सुबह जल्दी शुरू होती हैं, उनके लिए टीम रात में वहीं रुक सकती है।" },
    { slug: "hisar", name: "Hisar", nameHi: "हिसार", region: "Haryana", distanceKm: 100, driveTime: "about 2 hours", driveTimeHi: "लगभग 2 घंटे", note: "For multi-day weddings in Hisar, the team usually stays nearby.", noteHi: "हिसार में कई दिन की शादियों के लिए टीम आमतौर पर पास में ही रुकती है।" },
    { slug: "delhi-ncr", name: "Delhi NCR", nameHi: "दिल्ली NCR", region: "Delhi", distanceKm: 75, driveTime: "about 1 hour 30 minutes", driveTimeHi: "लगभग 1 घंटा 30 मिनट", note: "We cover weddings across Delhi, Gurugram and Noida, with Rohtak pricing plus travel.", noteHi: "हम दिल्ली, गुरुग्राम और नोएडा में शादियां कवर करते हैं, रोहतक वाले दाम और सफ़र खर्च के साथ।" },
];

export function getCity(slug: string) {
    return cities.find((c) => c.slug === slug);
}

export function cityHasProof(c: City) {
    return Boolean(c.home || c.weddingsShot || c.venues?.length);
}
