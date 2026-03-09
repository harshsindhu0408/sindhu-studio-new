import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider, themeScript } from "@/components/ui/ThemeProvider";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sindhustudio.com"),
  title: {
    default: "Sindhu Studio | Premium Photography Studio",
    template: "%s | Sindhu Studio",
  },
  description:
    "Capturing life's most precious moments with artistry and passion. Premium wedding, pre-wedding, maternity, and portrait photography in Rohtak.",
  keywords: [
    "photography studio",
    "wedding photography",
    "pre-wedding photoshoot",
    "maternity photography",
    "portrait photography",
    "Rohtak photographer",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Critical: Theme script runs immediately to prevent FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a1a" />
        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) - kept for users without JS */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M2H8JBXF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ThemeProvider>
          <SmoothScroll>

            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <ScrollToTop />
        </ThemeProvider>

        {/* Analytics scripts - loaded after interactive to not block LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1LZRMC8DT6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1LZRMC8DT6', { send_page_view: true });
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M2H8JBXF');
          `}
        </Script>
      </body>
    </html>
  );
}
