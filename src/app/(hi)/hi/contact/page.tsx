import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";

const title = "संपर्क और स्टूडियो का पता, रोहतक";
const description = `${business.name} को ${business.phones[0].display} पर कॉल या WhatsApp करें, या दिल्ली रोड, रोहतक स्थित स्टूडियो आएं। हर दिन सुबह 9 से रात 9 बजे तक खुला।`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/hi/contact", ...languageAlternates("/contact") },
    openGraph: { title, description, url: "/hi/contact", locale: "hi_IN" },
};

export default function Page() {
    return <ContactPage locale="hi" />;
}
