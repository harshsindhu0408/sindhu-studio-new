import type { Metadata } from "next";
import { PrivacyPolicy, privacyMeta } from "@/components/legal/pages/PrivacyPolicy";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: privacyMeta.hi.title,
    description: privacyMeta.hi.description,
    alternates: { canonical: "/hi/privacy", ...languageAlternates("/privacy") },
    openGraph: { title: privacyMeta.hi.title, description: privacyMeta.hi.description, url: "/hi/privacy", locale: "hi_IN" },
};

export default function Page() {
    return <PrivacyPolicy locale="hi" />;
}
