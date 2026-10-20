import type { Metadata, Viewport } from "next";
import "../globals.css";
import { SiteShell } from "@/components/site/SiteShell";
import { business, SITE_URL } from "@/data/business";
import { lowestPrice } from "@/data/packages";

const description = `${business.address.locality}, हरियाणा में ${business.foundingYear} से शादी फोटोग्राफी, सिनेमैटिक फ़िल्म, ड्रोन और LED स्क्रीन। ₹${lowestPrice.toLocaleString("en-IN")} से शुरू साफ़ दाम वाले पैकेज। पैकेज की तुलना करें और ऑनलाइन अपना कोटेशन बनाएं।`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} | रोहतक में शादी फोटोग्राफर`,
    template: `%s | ${business.name}`,
  },
  description,
  applicationName: business.name,
  openGraph: { type: "website", locale: "hi_IN", siteName: business.name, description },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
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

export default function HindiRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="hi">{children}</SiteShell>;
}
