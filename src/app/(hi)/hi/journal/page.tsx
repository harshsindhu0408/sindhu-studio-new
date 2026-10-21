import type { Metadata } from "next";
import { JournalIndex, journalCopy } from "@/components/journal/JournalIndex";
import { languageAlternates } from "@/i18n";

const title = "शादी प्लानिंग जर्नल";
const { description } = journalCopy.hi;

export const metadata: Metadata = { title, description, alternates: { canonical: "/hi/journal", ...languageAlternates("/journal") }, openGraph: { title, description, url: "/hi/journal", locale: "hi_IN" } };

export default function Page() {
    return <JournalIndex locale="hi" />;
}
