import type { Metadata } from "next";
import { JournalIndex, journalCopy } from "@/components/journal/JournalIndex";
import { languageAlternates } from "@/i18n";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const title = "Wedding Planning Journal";
const { description } = journalCopy.en;

export const metadata: Metadata = { title, description, alternates: { canonical: "/journal", ...languageAlternates("/journal") }, openGraph: { title, description, url: "/journal" } };

export default function Page() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: "Journal", path: "/journal" }])} />
            <JournalIndex locale="en" />
        </>
    );
}
