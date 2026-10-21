import type { Metadata } from "next";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const title = `Photography & Film Services in ${business.address.locality}`;
const description = `Wedding photography, candid, cinematic films, pre-wedding shoots, drone, LED screens, live streaming, ring ceremony, Kuan Poojan, baby and birthday coverage by ${business.name}, ${business.address.locality}.`;

export const metadata: Metadata = { title, description, alternates: { canonical: "/services", ...languageAlternates("/services") }, openGraph: { title, description, url: "/services" } };

export default function Page() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />
            <ServicesIndex locale="en" />
        </>
    );
}
