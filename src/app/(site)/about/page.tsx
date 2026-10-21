import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";
import { JsonLd, breadcrumbSchema, personSchema } from "@/lib/schema";

const title = `About Us: Wedding Photographers in ${business.address.locality} since ${business.foundingYear}`;
const description = `${business.name} was founded in ${business.foundingYear} by ${business.founder.name}. Meet the family and team behind ${business.address.locality}'s wedding photography and films.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/about", ...languageAlternates("/about") },
    openGraph: { title, description, url: "/about" },
};

export default function Page() {
    return (
        <>
            <JsonLd data={personSchema()} />
            <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
            <AboutPage locale="en" />
        </>
    );
}
