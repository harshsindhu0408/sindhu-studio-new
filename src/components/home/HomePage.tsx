import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { PackagesTeaser } from "@/components/sections/PackagesTeaser";
import { PortfolioHighlight } from "@/components/sections/PortfolioHighlight";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServicesShowcase } from "./ServicesShowcase";
import { PlanTools } from "./PlanTools";
import { Journey } from "./Journey";
import { TrustBand } from "./TrustBand";
import { WhyUs } from "./WhyUs";
import { Reviews } from "./Reviews";
import { JournalTeaser } from "./JournalTeaser";
import { JsonLd, videoSchema } from "@/lib/schema";
import type { Locale } from "@/i18n";

// The film player is the only heavy client section below the fold: split it into its own chunk
const FeaturedFilms = dynamic(() => import("@/components/sections/FeaturedFilms").then((mod) => mod.FeaturedFilms));

export function HomePage({ locale }: { locale: Locale }) {
    return (
        <>
            <JsonLd data={videoSchema()} />
            <Hero locale={locale} />
            <PackagesTeaser locale={locale} />
            <ServicesShowcase locale={locale} />
            <PortfolioHighlight locale={locale} />
            <PlanTools locale={locale} />
            <FeaturedFilms locale={locale} />
            <Journey locale={locale} />
            <TrustBand locale={locale} />
            <WhyUs locale={locale} />
            <Reviews locale={locale} />
            <JournalTeaser locale={locale} />
            <FAQ locale={locale} />
            <CTABanner locale={locale} />
        </>
    );
}
