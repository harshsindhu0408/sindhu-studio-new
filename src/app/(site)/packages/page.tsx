import type { Metadata } from "next";
import { PackagesPage } from "@/components/packages/PackagesPage";
import { lowestPrice, highestPrice } from "@/data/packages";
import { business } from "@/data/business";
import { formatINR, formatLakh } from "@/lib/quote";
import { languageAlternates } from "@/i18n";

const title = `Wedding Photography Packages in ${business.address.locality}: ${formatINR(lowestPrice)} to ${formatLakh(highestPrice)}`;
const description = `Compare all 6 Sindhu Studio wedding packages side by side, from ${formatINR(lowestPrice)} to ${formatINR(highestPrice)}. Candid, cinematic film, drone, LED wall and albums, with transparent add-on prices. Find your best fit in 20 seconds.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/packages", ...languageAlternates("/packages") },
    openGraph: { title, description, url: "/packages" },
    twitter: { title, description },
};

export default function Page() {
    return <PackagesPage locale="en" />;
}
