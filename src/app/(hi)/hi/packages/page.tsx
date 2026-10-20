import type { Metadata } from "next";
import { PackagesPage } from "@/components/packages/PackagesPage";
import { lowestPrice, highestPrice } from "@/data/packages";
import { formatINR } from "@/lib/quote";
import { languageAlternates } from "@/i18n";

const title = `रोहतक में शादी फोटोग्राफी पैकेज: ${formatINR(lowestPrice)} से ${formatINR(highestPrice)}`;
const description = `Sindhu Studio के सभी 6 शादी पैकेज की आमने-सामने तुलना, ${formatINR(lowestPrice)} से ${formatINR(highestPrice)} तक। कैंडिड, सिनेमैटिक फ़िल्म, ड्रोन, LED वॉल और एल्बम, साफ़ ऐड-ऑन दामों के साथ। 20 सेकंड में अपना सही पैकेज जानें।`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/hi/packages", ...languageAlternates("/packages") },
    openGraph: { title, description, url: "/hi/packages", locale: "hi_IN" },
};

export default function Page() {
    return <PackagesPage locale="hi" />;
}
