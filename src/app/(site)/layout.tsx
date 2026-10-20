import type { Metadata, Viewport } from "next";
import "../globals.css";
import { SiteShell } from "@/components/site/SiteShell";
import { business, SITE_URL } from "@/data/business";
import { lowestPrice } from "@/data/packages";
import { languageAlternates } from "@/i18n";

const description = `Wedding photography, cinematic films, drone and LED screens in ${business.address.locality}, Haryana since ${business.foundingYear}. Transparent packages from ₹${lowestPrice.toLocaleString("en-IN")}. Compare packages and build your quote online.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} | Wedding Photographer in ${business.address.locality}, Haryana`,
    template: `%s | ${business.name}`,
  },
  description,
  applicationName: business.name,
  authors: [{ name: business.name, url: SITE_URL }],
  creator: business.name,
  publisher: business.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: { canonical: "/", ...languageAlternates("/") },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: business.name,
    title: `${business.name} | Wedding Photography in ${business.address.locality}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Wedding Photography in ${business.address.locality}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-HR",
    "geo.placename": business.address.locality,
    "geo.position": `${business.geo.lat};${business.geo.lng}`,
    ICBM: `${business.geo.lat}, ${business.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14110F" },
    { media: "(prefers-color-scheme: light)", color: "#FBF7F0" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
