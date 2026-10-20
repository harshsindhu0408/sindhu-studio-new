import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteBuilder, BuilderFallback } from "@/components/build/QuoteBuilder";
import { languageAlternates } from "@/i18n";

const title = "शादी फोटोग्राफी कोटेशन बिल्डर: अपना सही दाम देखें";
const description = "Sindhu Studio, रोहतक के साथ अपना शादी फोटोग्राफी कोटेशन बनाएं: पैकेज चुनें, ड्रोन, कैंडिड, LED वॉल या लाइव स्ट्रीम जोड़ें और सही कुल देखें। हमें भेजें या परिवार के WhatsApp ग्रुप में शेयर करें।";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/hi/build", ...languageAlternates("/build") },
    openGraph: { title, description, url: "/hi/build", locale: "hi_IN" },
};

export default function Page() {
    return (
        <div className="pt-28 md:pt-36">
            <header className="container-custom mb-10 max-w-3xl print:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">कोटेशन बिल्डर</p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">आपकी शादी, आपका दाम</h1>
                <p className="mt-4 text-lg text-foreground-muted">पैकेज चुनें, एक्स्ट्रा जोड़ें और कुल राशि बदलते देखें। सही लगे तो हमें या परिवार के WhatsApp ग्रुप में भेजें। कोई साइन-अप नहीं।</p>
            </header>
            <Suspense fallback={<BuilderFallback />}>
                <QuoteBuilder locale="hi" />
            </Suspense>
        </div>
    );
}
