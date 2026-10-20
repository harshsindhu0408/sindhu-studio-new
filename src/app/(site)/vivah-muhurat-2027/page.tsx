import type { Metadata } from "next";
import { MuhuratPage } from "@/components/muhurat/MuhuratPage";
import { muhuratCount2027 } from "@/data/muhurat";
import { languageAlternates } from "@/i18n";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const revalidate = 86400;

const title = "Shubh Vivah Muhurat 2027: Wedding Dates Calendar";
const description = `All ${muhuratCount2027} shubh vivah muhurat dates in 2027 (plus Nov–Dec 2026) for Delhi, Haryana and Rohtak, month by month, with Sindhu Studio's availability on each date.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/vivah-muhurat-2027", ...languageAlternates("/vivah-muhurat-2027") },
    openGraph: { title, description, url: "/vivah-muhurat-2027" },
};

const faqs = [
    { question: "How many vivah muhurat dates are there in 2027?", answer: `Our Delhi-based list has ${muhuratCount2027} shubh vivah dates in 2027. There are no wedding muhurats in August, September and October 2027 (Chaturmas).` },
    { question: "Which months have the most wedding dates in 2027?", answer: "February, May and June 2027 have the most dates, followed by November 2027." },
    { question: "Are these muhurat dates valid for Haryana?", answer: "They are calculated for Delhi, the nearest major panchang reference to Rohtak and most of Haryana. Always confirm the final date and timing with your family pandit." },
];

export default function Page() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: "Vivah Muhurat 2027", path: "/vivah-muhurat-2027" }])} />
            <JsonLd data={faqSchema(faqs)} />
            <MuhuratPage locale="en" />
        </>
    );
}
