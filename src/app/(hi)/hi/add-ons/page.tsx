import type { Metadata } from "next";
import { AddOnsPage } from "@/components/addons/AddOnsPage";
import { addOnPrice, getAddOn } from "@/data/addons";
import { formatINR } from "@/lib/quote";
import { languageAlternates } from "@/i18n";

const price = (id: Parameters<typeof getAddOn>[0]) => formatINR(addOnPrice(getAddOn(id)));
const title = "शादी के ऐड-ऑन: ड्रोन, LED वॉल, कैंडिड, लाइव स्ट्रीम";
const description = `ड्रोन शूट ${price("drone")}, 8×12 LED वॉल ${price("led-wall")}, कैंडिड फोटोग्राफी ${price("candid")} प्रति दिन, सिनेमैटिक फ़िल्म, YouTube लाइव स्ट्रीम, प्री-वेडिंग शूट और कुआं पूजन कवरेज। इनमें से कुछ भी अपने Sindhu Studio पैकेज में जोड़ें।`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/hi/add-ons", ...languageAlternates("/add-ons") },
    openGraph: { title, description, url: "/hi/add-ons", locale: "hi_IN" },
};

export default function Page() {
    return <AddOnsPage locale="hi" />;
}
