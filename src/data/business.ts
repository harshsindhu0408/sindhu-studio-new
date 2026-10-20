/**
 * Single source of truth for every business fact on the site.
 * Components, JSON-LD, legal pages, llms.txt and the sitemap all read from here.
 *
 * Items marked VERIFY were inconsistent in the old code; the value chosen is
 * the most likely one, but the owner should confirm it.
 */

export const SITE_URL = "https://sindhustudio.com";

export const business = {
    name: "Sindhu Studio",
    legalName: "Sindhu Digital Studio",
    // VERIFY: an online directory lists the business as "Sindhu Photo Studio".
    // Google Business Profile, Justdial etc. should all use the same name as `name`.
    alternateNames: ["Sindhu Digital Studio", "Sindhu Photo Studio"],
    tagline: "Wedding photography & films in Rohtak since 2000",
    description:
        "Sindhu Studio is a wedding photography and videography studio on Delhi Road, Rohtak, Haryana. Founded in 2000 by Krishan Sindhu, it covers weddings, pre-wedding shoots, haldi, mehendi and ring ceremonies with candid photography, cinematic films, drone shoots and LED screens.",
    foundingYear: 2000,
    founder: { name: "Krishan Sindhu", jobTitle: "Founder & Lead Photographer" },

    phones: [
        { display: "+91 94163 70132", tel: "+919416370132", primary: true },
        { display: "+91 79888 04223", tel: "+917988804223" },
        { display: "+91 89502 00913", tel: "+918950200913" },
        { display: "+91 98175 54363", tel: "+919817554363" },
    ],
    whatsapp: "919416370132",
    email: "sindhustudiorohtak@gmail.com",

    address: {
        street: "Shop no. 17, Delhi Road, opp. Balmev Plaza, Dev Colony",
        locality: "Rohtak",
        region: "Haryana",
        postalCode: "124001",
        country: "IN",
        countryName: "India",
    },
    // VERIFY: the old map embed pointed elsewhere (28.8929, 76.5764).
    geo: { lat: 28.8955, lng: 76.6066 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sindhu+Studio+Delhi+Road+Dev+Colony+Rohtak",
    mapsEmbedUrl: "https://www.google.com/maps?q=Sindhu+Studio,+Delhi+Road,+Dev+Colony,+Rohtak,+Haryana+124001&output=embed",

    // VERIFY: schema said Mon–Sat 10–7, the contact page said Mon–Sun 9–9.
    // The customer-facing contact page version is used.
    hours: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "21:00",
        display: "Open every day, 9 am – 9 pm",
        note: "Shoots any time of day or night",
    },

    // VERIFY: none of these profiles could be confirmed online. Remove any that aren't yours.
    socials: {
        instagram: "https://www.instagram.com/sindhustudio",
        facebook: "https://www.facebook.com/sindhustudio",
        youtube: "https://www.youtube.com/@sindhustudiorohtak",
    },

    areaServed: ["Rohtak", "Jhajjar", "Sonipat", "Bhiwani", "Jind", "Hisar", "Panipat", "Bahadurgarh", "Delhi NCR"],

    // VERIFY: legal pages need these. The grievance contact is a role until a named person is given.
    grievanceOfficer: {
        title: "Grievance Officer, Sindhu Studio",
        email: "sindhustudiorohtak@gmail.com",
        phone: "+91 94163 70132",
        responseDays: 7,
    },
    gstin: undefined as string | undefined,
    jurisdiction: "Rohtak, Haryana",
} as const;

export const primaryPhone = business.phones.find((p) => "primary" in p && p.primary) ?? business.phones[0];

export const fullAddress = `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}, ${business.address.countryName}`;

export const yearsInBusiness = new Date().getFullYear() - business.foundingYear;

export function whatsappLink(message?: string) {
    return `https://wa.me/${business.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

/** Booking & payment terms. Used by the FAQ, terms, quote builder and cancellation calculator. */
export const paymentTerms = {
    // Confirmed by the owner: 25%.
    bookingPercent: 25,
    schedule: [
        { percent: 25, when: "to book your date (non-refundable)" },
        { percent: 50, when: "on the day of the event" },
        { percent: 25, when: "before final delivery of photos and videos" },
    ],
    methods: ["UPI", "Bank transfer (NEFT/IMPS/RTGS)", "Cash", "Cards"],
    // VERIFY: are package prices GST-inclusive?
    gstNote: "Prices are in Indian Rupees. GST, if applicable, is shown on your invoice.",
    quoteValidityDays: 7,
} as const;

/** Cancellation tiers, taken from the existing terms, in days before the event. */
export const cancellationTiers = [
    {
        id: "early",
        minDays: 61,
        label: "More than 60 days before",
        outcome: "Booking amount is non-refundable, but can be moved to a new date once, subject to availability.",
        chargePercent: 25,
        transferable: true,
    },
    {
        id: "mid",
        minDays: 30,
        label: "30 to 60 days before",
        outcome: "Booking amount is non-refundable.",
        chargePercent: 25,
        transferable: false,
    },
    {
        id: "late",
        minDays: 0,
        label: "Less than 30 days before",
        outcome: "50% of the total package price is payable.",
        chargePercent: 50,
        transferable: false,
    },
] as const;

export const deliveryTimeline = [
    { item: "Teaser & highlights", time: "1–2 weeks after the event" },
    { item: "Full photo gallery for selection", time: "4–6 weeks after the event" },
    { item: "Cinematic film & album", time: "8–12 weeks after you approve photo selection and songs" },
] as const;
