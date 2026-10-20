import type { Metadata } from "next";
import { PlannerPage } from "@/components/plan/PlannerPage";
import { languageAlternates } from "@/i18n";

export const revalidate = 3600;

const title = "शादी प्लानर: हर कार्यक्रम के हिसाब से फोटोग्राफी की योजना";
const description = "अपना रोका, हल्दी, मेहंदी, संगीत, शादी और रिसेप्शन तारीख और मेहमानों के साथ जोड़ें। मुहूर्त और हमारी उपलब्धता देखें, और वो पैकेज पाएं जो सबसे कम कुल खर्च में पूरी शादी कवर करे।";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/hi/plan", ...languageAlternates("/plan") },
    openGraph: { title, description, url: "/hi/plan", locale: "hi_IN" },
};

export default function Page() {
    return <PlannerPage locale="hi" />;
}
