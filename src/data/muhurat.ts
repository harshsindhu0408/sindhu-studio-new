/**
 * Shubh vivah muhurat dates, calculated for Delhi (the nearest major panchang reference
 * to Rohtak). Panchangs differ by method and location, so the page always tells
 * families to confirm with their pandit.
 *
 * Primary list: PanchangBodh (New Delhi), Nov 2026 – Dec 2027.
 * Cross-check: Vaya (Delhi, Drik Panchang "Panchang Shuddhi" method), Jan–Mar 2027.
 * Retrieved 20 October 2026. Re-check before each season.
 */

export const muhuratSources = [
    { name: "PanchangBodh: Vivah Muhurat (New Delhi)", url: "https://panchangbodh.com/vivah-muhurat?year=2027" },
    { name: "Vaya: Vivah Muhurat 2027 (Delhi, Drik Panchang method)", url: "https://vaya.so/tools/muhurat/vivah?m=1&y=2027" },
];

export const muhuratRetrieved = "20 October 2026";

const primary: Record<string, number[]> = {
    "2026-11": [21, 25, 26, 30],
    "2026-12": [2, 3, 4, 5, 6, 9, 12],
    "2027-01": [15, 19, 20, 24, 26, 27, 29, 31],
    "2027-02": [2, 3, 10, 11, 12, 15, 16, 21, 22, 23, 25, 26, 27, 28],
    "2027-03": [1, 2, 4, 9, 10, 11, 14],
    "2027-04": [18, 19, 21, 22, 23, 24, 25, 26, 28],
    "2027-05": [3, 4, 8, 9, 13, 17, 19, 20, 21, 22, 24, 25, 30, 31],
    "2027-06": [1, 5, 9, 10, 11, 12, 13, 16, 17, 19, 21, 26, 27, 28],
    "2027-07": [1, 7, 9, 12],
    "2027-08": [],
    "2027-09": [],
    "2027-10": [],
    "2027-11": [20, 21, 22, 23, 24, 25, 26, 28, 29, 30],
    "2027-12": [2, 7, 8, 9, 12, 13, 14],
};

/** Second Delhi source, available for Jan–Mar 2027 only */
const crossCheck: Record<string, number[]> = {
    "2027-01": [15, 18, 19, 20, 24, 26, 27, 30, 31],
    "2027-02": [2, 3, 9, 10, 11, 14, 15, 21, 22, 25, 26, 27, 28],
    "2027-03": [1, 2, 3, 4, 9, 10, 14],
};

export interface MuhuratDate {
    iso: string; // YYYY-MM-DD
    /** Listed by both Delhi sources (only checkable Jan–Mar 2027) */
    agreed: boolean;
}

export interface MuhuratMonth {
    key: string; // YYYY-MM
    year: number;
    month: number; // 1-12
    dates: MuhuratDate[];
    /** Why a month has no dates, in plain words */
    note?: string;
}

const monthNotes: Record<string, string> = {
    "2027-08": "Chaturmas: traditionally no weddings until Dev Uthani Ekadashi.",
    "2027-09": "Chaturmas: traditionally no weddings until Dev Uthani Ekadashi.",
    "2027-10": "Chaturmas: weddings resume after Dev Uthani Ekadashi in November.",
};

export const muhuratMonths: MuhuratMonth[] = Object.entries(primary).map(([key, days]) => {
    const [year, month] = key.split("-").map(Number);
    const check = crossCheck[key];
    return {
        key,
        year,
        month,
        note: monthNotes[key],
        dates: days.map((d) => ({
            iso: `${key}-${String(d).padStart(2, "0")}`,
            agreed: Boolean(check?.includes(d)),
        })),
    };
});

export const allMuhuratDates = muhuratMonths.flatMap((m) => m.dates);

export function isMuhurat(iso: string) {
    return allMuhuratDates.some((d) => d.iso === iso);
}

export const muhuratCount2027 = allMuhuratDates.filter((d) => d.iso.startsWith("2027")).length;

export const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const monthNamesHi = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
export const weekdaysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const weekdaysHi = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];
