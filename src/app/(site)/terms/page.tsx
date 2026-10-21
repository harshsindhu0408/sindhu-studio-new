import type { Metadata } from "next";
import { TermsPage, termsMeta } from "@/components/legal/pages/TermsPage";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: termsMeta.en.title,
    description: termsMeta.en.description,
    alternates: { canonical: "/terms", ...languageAlternates("/terms") },
    openGraph: { title: termsMeta.en.title, description: termsMeta.en.description, url: "/terms" },
};

export default function Page() {
    return <TermsPage locale="en" />;
}
