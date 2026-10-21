import type { Metadata } from "next";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";

const title = "रोहतक में फोटोग्राफी और फ़िल्म सेवाएं";
const description = `${business.name}, रोहतक की शादी फोटोग्राफी, कैंडिड, सिनेमैटिक फ़िल्म, प्री-वेडिंग शूट, ड्रोन, LED स्क्रीन, लाइव स्ट्रीमिंग, रिंग सेरेमनी, कुआं पूजन, बेबी और जन्मदिन कवरेज।`;

export const metadata: Metadata = { title, description, alternates: { canonical: "/hi/services", ...languageAlternates("/services") }, openGraph: { title, description, url: "/hi/services", locale: "hi_IN" } };

export default function Page() {
    return <ServicesIndex locale="hi" />;
}
