import type { Metadata } from "next";
import { CancellationPolicy, cancellationMeta } from "@/components/legal/pages/CancellationPolicy";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: cancellationMeta.en.title,
    description: cancellationMeta.en.description,
    alternates: { canonical: "/cancellation-policy", ...languageAlternates("/cancellation-policy") },
    openGraph: { title: cancellationMeta.en.title, description: cancellationMeta.en.description, url: "/cancellation-policy" },
};

export default function Page() {
    return <CancellationPolicy locale="en" />;
}
