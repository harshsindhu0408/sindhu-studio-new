import type { Metadata } from "next";
import { MuhuratPage } from "@/components/muhurat/MuhuratPage";
import { muhuratCount2027 } from "@/data/muhurat";
import { languageAlternates } from "@/i18n";
import { JsonLd, faqSchema } from "@/lib/schema";

export const revalidate = 86400;

const title = "विवाह मुहूर्त 2027: शादी की शुभ तिथियां";
const description = `2027 की सभी ${muhuratCount2027} शुभ विवाह तिथियां (साथ में नवंबर–दिसंबर 2026), दिल्ली, हरियाणा और रोहतक के लिए, महीने के हिसाब से, और हर तारीख पर Sindhu Studio की उपलब्धता।`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/hi/vivah-muhurat-2027", ...languageAlternates("/vivah-muhurat-2027") },
    openGraph: { title, description, url: "/hi/vivah-muhurat-2027", locale: "hi_IN" },
};

const faqs = [
    { question: "2027 में कितने विवाह मुहूर्त हैं?", answer: `हमारी दिल्ली आधारित सूची में 2027 में ${muhuratCount2027} शुभ विवाह तिथियां हैं। अगस्त, सितंबर और अक्टूबर 2027 (चातुर्मास) में कोई विवाह मुहूर्त नहीं है।` },
    { question: "2027 में किन महीनों में सबसे ज़्यादा शादी की तारीखें हैं?", answer: "फ़रवरी, मई और जून 2027 में सबसे ज़्यादा तिथियां हैं, उसके बाद नवंबर 2027।" },
    { question: "क्या ये मुहूर्त हरियाणा के लिए सही हैं?", answer: "ये दिल्ली के पंचांग के हिसाब से हैं, जो रोहतक और हरियाणा के सबसे नज़दीक का बड़ा संदर्भ है। अंतिम तारीख और समय अपने पंडित जी से ज़रूर पक्का करें।" },
];

export default function Page() {
    return (
        <>
            <JsonLd data={faqSchema(faqs)} />
            <MuhuratPage locale="hi" />
        </>
    );
}
