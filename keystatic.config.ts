import { config, collection, fields, singleton } from "@keystatic/core";

/**
 * Content the studio edits without touching code, at /keystatic.
 *
 * - Locally (`npm run dev`) content is saved straight into /content.
 * - In production, set KEYSTATIC_GITHUB_CLIENT_ID / _SECRET / KEYSTATIC_SECRET
 *   (see README) and edits are committed to the GitHub repo, which redeploys the site.
 *
 * Prices, packages and business facts stay in src/data/ on purpose: they feed the
 * comparison table, schema and legal pages and need a code review to change.
 */
const isProdGithub = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

export default config({
    storage: isProdGithub ? { kind: "github", repo: "harshsindhu0408/sindhu-studio-new" } : { kind: "local" },
    ui: {
        brand: { name: "Sindhu Studio" },
        navigation: {
            Bookings: ["availability"],
            Stories: ["weddings", "reviews"],
            Journal: ["journal"],
        },
    },
    singletons: {
        availability: singleton({
            label: "Booked dates",
            path: "content/availability",
            format: { data: "json" },
            schema: {
                dates: fields.array(
                    fields.object({
                        date: fields.date({ label: "Date", validation: { isRequired: true } }),
                        status: fields.select({
                            label: "Status",
                            options: [
                                { label: "Fully booked", value: "booked" },
                                { label: "Few slots left", value: "limited" },
                            ],
                            defaultValue: "booked",
                        }),
                    }),
                    {
                        label: "Dates",
                        itemLabel: (props) => `${props.fields.date.value ?? "?"} · ${props.fields.status.value === "booked" ? "Booked" : "Few left"}`,
                    }
                ),
            },
        }),
    },
    collections: {
        journal: collection({
            label: "Journal articles",
            slugField: "title",
            path: "content/journal/*",
            format: { contentField: "content" },
            entryLayout: "content",
            columns: ["title", "date"],
            schema: {
                title: fields.slug({ name: { label: "Title" } }),
                date: fields.date({ label: "Published", validation: { isRequired: true } }),
                excerpt: fields.text({ label: "Summary (shown in lists and Google)", multiline: true, validation: { length: { max: 200 } } }),
                cover: fields.image({ label: "Cover image", directory: "public/images/journal", publicPath: "/images/journal/" }),
                coverAlt: fields.text({ label: "Cover image description" }),
                tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (p) => p.value }),
                content: fields.markdoc({ label: "Article", options: { image: { directory: "public/images/journal", publicPath: "/images/journal/" } } }),
            },
        }),
        weddings: collection({
            label: "Real weddings",
            slugField: "title",
            path: "content/weddings/*",
            format: { contentField: "story" },
            entryLayout: "content",
            columns: ["title", "date"],
            schema: {
                title: fields.slug({ name: { label: "Couple (e.g. Riya & Aman)" } }),
                date: fields.date({ label: "Wedding date", validation: { isRequired: true } }),
                city: fields.text({ label: "City", validation: { isRequired: true } }),
                venue: fields.text({ label: "Venue" }),
                functions: fields.multiselect({
                    label: "Functions covered",
                    options: ["Roka", "Ring ceremony", "Haldi", "Mehendi", "Sangeet", "Shaadi", "Reception", "Kuan Poojan", "Pre-wedding"].map((v) => ({ label: v, value: v })),
                }),
                packageName: fields.select({
                    label: "Package",
                    options: ["Silver", "Gold", "Platinum", "Diamond", "Prime", "Exclusive", "Custom"].map((v) => ({ label: v, value: v })),
                    defaultValue: "Gold",
                }),
                cover: fields.image({ label: "Cover photo", directory: "public/images/weddings", publicPath: "/images/weddings/", validation: { isRequired: true } }),
                coverAlt: fields.text({ label: "Cover photo description", validation: { isRequired: true } }),
                gallery: fields.array(
                    fields.object({
                        image: fields.image({ label: "Photo", directory: "public/images/weddings", publicPath: "/images/weddings/", validation: { isRequired: true } }),
                        alt: fields.text({ label: "Description" }),
                    }),
                    { label: "Gallery", itemLabel: (p) => p.fields.alt.value || "Photo" }
                ),
                consent: fields.checkbox({
                    label: "The couple agreed in writing to publish these photos",
                    description: "Required by our privacy policy. Unticked stories are never shown.",
                    defaultValue: false,
                }),
                story: fields.markdoc({ label: "Story", options: { image: { directory: "public/images/weddings", publicPath: "/images/weddings/" } } }),
            },
        }),
        reviews: collection({
            label: "Client reviews",
            slugField: "name",
            path: "content/reviews/*",
            format: { data: "json" },
            columns: ["name", "date"],
            schema: {
                name: fields.slug({ name: { label: "Name as the client wants it shown" } }),
                event: fields.text({ label: "Event (e.g. Wedding, Rohtak)" }),
                date: fields.date({ label: "Date", validation: { isRequired: true } }),
                rating: fields.integer({ label: "Rating (1–5)", defaultValue: 5, validation: { min: 1, max: 5 } }),
                quote: fields.text({ label: "Review", multiline: true, validation: { isRequired: true } }),
                source: fields.select({
                    label: "Where it was posted",
                    options: [
                        { label: "Google", value: "Google" },
                        { label: "WhatsApp (with permission)", value: "WhatsApp" },
                        { label: "Instagram", value: "Instagram" },
                        { label: "WedMeGood / Justdial", value: "Directory" },
                    ],
                    defaultValue: "Google",
                }),
                sourceUrl: fields.url({ label: "Link to the original review (optional)" }),
                consent: fields.checkbox({
                    label: "The client agreed to this review being shown on the website",
                    description: "Only real reviews, with permission. Unticked reviews are never shown.",
                    defaultValue: false,
                }),
            },
        }),
    },
});
