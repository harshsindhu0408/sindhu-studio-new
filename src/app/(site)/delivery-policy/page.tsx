import type { Metadata } from "next";
import { DeliveryPolicy, deliveryMeta } from "@/components/legal/pages/DeliveryPolicy";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: deliveryMeta.en.title,
    description: deliveryMeta.en.description,
    alternates: { canonical: "/delivery-policy", ...languageAlternates("/delivery-policy") },
    openGraph: { title: deliveryMeta.en.title, description: deliveryMeta.en.description, url: "/delivery-policy" },
};

export default function Page() {
    return <DeliveryPolicy locale="en" />;
}
