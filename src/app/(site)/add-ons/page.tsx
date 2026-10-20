import type { Metadata } from "next";
import { AddOnsPage } from "@/components/addons/AddOnsPage";
import { addOnPrice, getAddOn } from "@/data/addons";
import { business } from "@/data/business";
import { formatINR } from "@/lib/quote";
import { languageAlternates } from "@/i18n";

const price = (id: Parameters<typeof getAddOn>[0]) => formatINR(addOnPrice(getAddOn(id)));
const title = `Wedding Add-ons in ${business.address.locality}: Drone, LED Wall, Candid, Live Stream`;
const description = `Drone shoot ${price("drone")}, 8×12 LED wall ${price("led-wall")}, candid photography ${price("candid")}/day, cinematic film, YouTube live stream, pre-wedding shoot and Kuan Poojan coverage. Add any of them to your Sindhu Studio package.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/add-ons", ...languageAlternates("/add-ons") },
    openGraph: { title, description, url: "/add-ons" },
};

export default function Page() {
    return <AddOnsPage locale="en" />;
}
