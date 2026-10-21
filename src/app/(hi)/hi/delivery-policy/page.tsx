import type { Metadata } from "next";
import { DeliveryPolicy, deliveryMeta } from "@/components/legal/pages/DeliveryPolicy";
import { languageAlternates } from "@/i18n";

export const metadata: Metadata = {
    title: deliveryMeta.hi.title,
    description: deliveryMeta.hi.description,
    alternates: { canonical: "/hi/delivery-policy", ...languageAlternates("/delivery-policy") },
    openGraph: { title: deliveryMeta.hi.title, description: deliveryMeta.hi.description, url: "/hi/delivery-policy", locale: "hi_IN" },
};

export default function Page() {
    return <DeliveryPolicy locale="hi" />;
}
