import type { Metadata } from "next";
import { TermsPage, termsMeta } from "@/components/legal/pages/TermsPage";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: termsMeta.hi.title,
    description: termsMeta.hi.description,
    alternates: { canonical: "/hi/terms", ...languageAlternates("/terms") },
    openGraph: { title: termsMeta.hi.title, description: termsMeta.hi.description, url: "/hi/terms", locale: "hi_IN" },
};

export default function Page() {
    return <TermsPage locale="hi" />;
}
