import type { Metadata } from "next";
import { CancellationPolicy, cancellationMeta } from "@/components/legal/pages/CancellationPolicy";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: cancellationMeta.hi.title,
    description: cancellationMeta.hi.description,
    alternates: { canonical: "/hi/cancellation-policy", ...languageAlternates("/cancellation-policy") },
    openGraph: { title: cancellationMeta.hi.title, description: cancellationMeta.hi.description, url: "/hi/cancellation-policy", locale: "hi_IN" },
};

export default function Page() {
    return <CancellationPolicy locale="hi" />;
}
