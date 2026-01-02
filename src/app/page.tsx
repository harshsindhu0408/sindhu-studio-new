import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { PortfolioHighlight } from "@/components/sections/PortfolioHighlight";
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
      <ServiceGrid />
      <PortfolioHighlight />
      <Timeline />
      <Stats />
      <Testimonials />
      <SindhuEdge />
      <FAQ />
      <CTABanner />
    </>
  );
}
