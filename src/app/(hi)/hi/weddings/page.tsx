import type { Metadata } from "next";
import { WeddingsIndex, weddingsCopy } from "@/components/weddings/WeddingsIndex";
import { languageAlternates } from "@/i18n";

const title = "असली शादियां";
const { description } = weddingsCopy.hi;

export const metadata: Metadata = { title, description, alternates: { canonical: "/hi/weddings", ...languageAlternates("/weddings") }, openGraph: { title, description, url: "/hi/weddings", locale: "hi_IN" } };

export default function Page() {
    return <WeddingsIndex locale="hi" />;
}
