import type { Metadata } from "next";
import { CookiePolicy, cookieMeta } from "@/components/legal/pages/CookiePolicy";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: cookieMeta.en.title,
    description: cookieMeta.en.description,
    alternates: { canonical: "/cookie-policy", ...languageAlternates("/cookie-policy") },
    openGraph: { title: cookieMeta.en.title, description: cookieMeta.en.description, url: "/cookie-policy" },
};

export default function Page() {
    return <CookiePolicy locale="en" />;
}
