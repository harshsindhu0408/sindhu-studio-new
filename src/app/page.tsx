import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { JsonLd, getLocalBusinessSchema, getOrganizationSchema } from "@/lib/schema";

// Skeleton loader for sections
function SectionSkeleton() {
  return (
    <div className="section-padding animate-pulse">
      <div className="container-custom">
        <div className="h-8 w-48 bg-foreground/10 rounded mb-4"></div>
        <div className="h-12 w-3/4 bg-foreground/10 rounded mb-8"></div>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-foreground/10 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dynamic imports for below-the-fold sections to reduce initial JS bundle
const FeaturedFilms = dynamic(
  () => import("@/components/sections/FeaturedFilms").then((mod) => mod.FeaturedFilms),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const ServiceGrid = dynamic(
  () => import("@/components/sections/ServiceGrid").then((mod) => mod.ServiceGrid),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const PortfolioHighlight = dynamic(
  () => import("@/components/sections/PortfolioHighlight").then((mod) => mod.PortfolioHighlight),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const Process = dynamic(
  () => import("@/components/sections/Process").then((mod) => mod.Process),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const Stats = dynamic(
  () => import("@/components/sections/Stats").then((mod) => mod.Stats),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((mod) => mod.Testimonials),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const SindhuEdge = dynamic(
  () => import("@/components/sections/SindhuEdge").then((mod) => mod.SindhuEdge),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const Timeline = dynamic(
  () => import("@/components/sections/Timeline").then((mod) => mod.Timeline),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((mod) => mod.FAQ),
  { loading: () => <SectionSkeleton />, ssr: true }
);

const CTABanner = dynamic(
  () => import("@/components/sections/CTABanner").then((mod) => mod.CTABanner),
  { loading: () => <SectionSkeleton />, ssr: true }
);

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={getLocalBusinessSchema()} />
      <JsonLd data={getOrganizationSchema()} />

      {/* Critical above-the-fold content - loaded immediately */}
      <Hero />
      <Philosophy />

      {/* Below-the-fold content - dynamically loaded */}
      <FeaturedFilms />
      <ServiceGrid />
      <PortfolioHighlight />
      <Process />
      <Stats />
      <Testimonials />
      <SindhuEdge />
      <Timeline />
      <FAQ />
      <CTABanner />
    </>
  );
}
