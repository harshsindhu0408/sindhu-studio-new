import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { PortfolioHighlight } from "@/components/sections/PortfolioHighlight";
import { FeaturedFilms } from "@/components/sections/FeaturedFilms"; // New
import { Process } from "@/components/sections/Process"; // New
import { Timeline } from "@/components/sections/Timeline";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { SindhuEdge } from "@/components/sections/SindhuEdge";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd, getLocalBusinessSchema, getOrganizationSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={getLocalBusinessSchema()} />
      <JsonLd data={getOrganizationSchema()} />

      <Hero />
      <Philosophy />
      {/* New Video Section */}
      <FeaturedFilms />
      <ServiceGrid />
      <PortfolioHighlight />
      {/* New Process Section */}
      <Process />
      <Stats />
      <Testimonials />
      <SindhuEdge />
      <Timeline /> {/* Moved Timeline here as a history anchor before FAQ */}
      <FAQ />
      <CTABanner />
    </>
  );
}
