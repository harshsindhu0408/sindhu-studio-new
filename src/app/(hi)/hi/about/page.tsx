import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";
import { JsonLd, personSchema } from "@/lib/schema";

const title = `हमारे बारे में: ${business.foundingYear} से रोहतक में शादी फोटोग्राफर`;
const description = `${business.name} की शुरुआत ${business.foundingYear} में ${business.founder.name} ने की थी। रोहतक की शादी फोटोग्राफी और फ़िल्मों के पीछे के परिवार और टीम से मिलिए।`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/hi/about", ...languageAlternates("/about") },
    openGraph: { title, description, url: "/hi/about", locale: "hi_IN" },
};

export default function Page() {
    return (
        <>
            <JsonLd data={personSchema()} />
            <AboutPage locale="hi" />
        </>
    );
}
