import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sindhustudio.com"),
  title: {
    default: "Sindhu Studio | Premium Photography Studio",
    template: "%s | Sindhu Studio",
  },
  description:
    "Capturing life's most precious moments with artistry and passion. Premium wedding, pre-wedding, maternity, and portrait photography in Mumbai.",
  keywords: [
    "photography studio",
    "wedding photography",
    "pre-wedding photoshoot",
    "maternity photography",
    "portrait photography",
    "Mumbai photographer",
    "candid photography",
    "professional photographer",
  ],
  authors: [{ name: "Sindhu Studio" }],
  creator: "Sindhu Studio",
  publisher: "Sindhu Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sindhustudio.com",
    siteName: "Sindhu Studio",
    title: "Sindhu Studio | Premium Photography Studio",
    description:
      "Capturing life's most precious moments with artistry and passion. Premium wedding, pre-wedding, maternity, and portrait photography.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sindhu Studio - Premium Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sindhu Studio | Premium Photography Studio",
    description:
      "Capturing life's most precious moments with artistry and passion.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
