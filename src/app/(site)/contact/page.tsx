import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const title = `Contact & Studio Address, ${business.address.locality}`;
const description = `Call or WhatsApp ${business.name} on ${business.phones[0].display}, or visit the studio at ${business.address.street}, ${business.address.locality}. ${business.hours.display}.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/contact", ...languageAlternates("/contact") },
    openGraph: { title, description, url: "/contact" },
};

export default function Page() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
            <ContactPage locale="en" />
        </>
    );
}
