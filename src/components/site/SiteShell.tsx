import { Inter, Playfair_Display, Tiro_Devanagari_Hindi, Noto_Sans_Devanagari } from "next/font/google";
import Script from "next/script";
import { ThemeProvider, themeScript } from "@/components/ui/ThemeProvider";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { MobileActionBar } from "@/components/ui/MobileActionBar";
import { ConsentBanner, consentDefaultScript } from "@/components/ui/ConsentBanner";
import { JsonLd, businessSchema, websiteSchema } from "@/lib/schema";
import { getDictionary, type Locale } from "@/i18n";

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

// Devanagari display face: Hindi headings and accent words (शुभ विवाह)
const tiro = Tiro_Devanagari_Hindi({
    variable: "--font-tiro",
    subsets: ["devanagari"],
    weight: "400",
    display: "swap",
    preload: false,
});

// Devanagari body text, only attached on Hindi pages
const notoDeva = Noto_Sans_Devanagari({
    variable: "--font-noto-deva",
    subsets: ["devanagari"],
    weight: ["400", "500", "600"],
    display: "swap",
    preload: true,
});

const GA_ID = "G-1LZRMC8DT6";
const GTM_ID = "GTM-M2H8JBXF";

/** Shared document shell for the English and Hindi root layouts. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
    const t = getDictionary(locale);
    const fonts = [inter.variable, playfair.variable, tiro.variable, locale === "hi" ? notoDeva.variable : ""].join(" ");

    return (
        <html lang={locale === "hi" ? "hi-IN" : "en-IN"} className={fonts} suppressHydrationWarning>
            {/* Browser extensions (e.g. LocatorJS) add attributes to <head> before hydration */}
            <head suppressHydrationWarning>
                {/* Critical: Theme script runs immediately to prevent FOUC */}
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                {/* Consent Mode v2 defaults must be set before any Google tag loads */}
                <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
                <JsonLd data={businessSchema()} />
                <JsonLd data={websiteSchema()} />
            </head>
            <body className="antialiased" suppressHydrationWarning>
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
                >
                    {t.skip}
                </a>
                {/* Google Tag Manager (noscript) - kept for users without JS */}
                <noscript>
                    <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
                </noscript>

                <ThemeProvider>
                    <SmoothScroll>
                        <Navbar locale={locale} />
                        <main id="main">{children}</main>
                        <Footer locale={locale} />
                    </SmoothScroll>
                    <ScrollToTop />
                    <MobileActionBar locale={locale} />
                    <ConsentBanner locale={locale} />
                </ThemeProvider>

                {/* Analytics scripts - loaded after interactive to not block LCP.
                    NOTE: GA4 is loaded directly AND via GTM. If the GTM container also
                    fires a GA4 tag, page views are counted twice: keep only one. */}
                <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: true });
          `}
                </Script>
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
                </Script>
            </body>
        </html>
    );
}
