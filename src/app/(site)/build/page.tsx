import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteBuilder, BuilderFallback } from "@/components/build/QuoteBuilder";
import { business } from "@/data/business";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { languageAlternates } from "@/i18n";

const title = "Wedding Photography Quote Builder: See Your Exact Price";
const description = `Build your wedding photography quote with ${business.name}, ${business.address.locality}: pick a package, add drone, candid, LED wall or live stream, and see the exact total. Send it to us or share it with your family on WhatsApp.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/build", ...languageAlternates("/build") },
    openGraph: { title, description, url: "/build" },
};

export default function BuildPage() {
    return (
        <div className="pt-28 md:pt-36 print:pt-0">
            <JsonLd data={breadcrumbSchema([{ name: "Quote Builder", path: "/build" }])} />
            <header className="container-custom mb-10 max-w-3xl print:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    Quote builder <span className="font-hindi normal-case tracking-normal text-sindoor">· अपना पैकेज बनाएं</span>
                </p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">Your wedding, your price</h1>
                <p className="mt-4 text-lg text-foreground-muted">
                    Pick a package, add extras, and watch the total update. When it looks right, send it to us or to the family WhatsApp group. No sign-up needed.
                </p>
            </header>
            <Suspense fallback={<BuilderFallback />}>
                <QuoteBuilder />
            </Suspense>
        </div>
    );
}
