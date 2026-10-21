import type { Metadata } from "next";
import { PrivacyPolicy, privacyMeta } from "@/components/legal/pages/PrivacyPolicy";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: privacyMeta.en.title,
    description: privacyMeta.en.description,
    alternates: { canonical: "/privacy", ...languageAlternates("/privacy") },
    openGraph: { title: privacyMeta.en.title, description: privacyMeta.en.description, url: "/privacy" },
};

export default function Page() {
    return <PrivacyPolicy locale="en" />;
}
