import type { Metadata } from "next";
import { PlannerPage } from "@/components/plan/PlannerPage";
import { languageAlternates } from "@/i18n";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const revalidate = 3600;

const title = "Shaadi Planner: Plan Your Wedding Photography by Function";
const description = "Add your roka, haldi, mehendi, sangeet, shaadi and reception with dates and guest numbers. Check muhurat dates and our availability, and get the package that covers your whole wedding for the lowest total.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/plan", ...languageAlternates("/plan") },
    openGraph: { title, description, url: "/plan" },
};

export default function Page() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: "Shaadi Planner", path: "/plan" }])} />
            <PlannerPage locale="en" />
        </>
    );
}
