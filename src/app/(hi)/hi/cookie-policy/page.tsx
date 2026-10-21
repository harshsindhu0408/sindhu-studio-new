import type { Metadata } from "next";
import { CookiePolicy, cookieMeta } from "@/components/legal/pages/CookiePolicy";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: cookieMeta.hi.title,
    description: cookieMeta.hi.description,
    alternates: { canonical: "/hi/cookie-policy", ...languageAlternates("/cookie-policy") },
    openGraph: { title: cookieMeta.hi.title, description: cookieMeta.hi.description, url: "/hi/cookie-policy", locale: "hi_IN" },
};

export default function Page() {
    return <CookiePolicy locale="hi" />;
}
