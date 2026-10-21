import type { Metadata } from "next";
import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { media } from "@/data/media";
import { business } from "@/data/business";
import { languageAlternates } from "@/i18n";

const title = "शादी फोटोग्राफी पोर्टफोलियो: रोहतक, हरियाणा";
const description = `${business.name}, रोहतक द्वारा खींचे गए दुल्हन के पोर्ट्रेट, वरमाला और सिंदूर के पल, हल्दी, मेहंदी और कपल शूट। हरियाणा की असली शादियों की ${media.length} फोटो, कोई स्टॉक फोटो नहीं।`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/hi/portfolio", ...languageAlternates("/portfolio") },
    openGraph: { title, description, url: "/hi/portfolio", locale: "hi_IN" },
};

const ordered = [...media.filter((m) => m.featured), ...media.filter((m) => !m.featured)];

export default function Page() {
    return (
        <PortfolioView
            locale="hi"
            active={null}
            items={ordered}
            title="असली शादियां, असली परिवार"
            intro="यहां की हर फोटो हमारी टीम ने हरियाणा की शादियों में खींची है। किसी भी फोटो को पूरी स्क्रीन पर देखने के लिए उस पर टैप करें।"
        />
    );
}
