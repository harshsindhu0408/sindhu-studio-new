"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import { alternatePath, getDictionary, localePath, type Locale } from "@/i18n";
import { business, primaryPhone, whatsappLink } from "@/data/business";

export function Navbar({ locale = "en" }: { locale?: Locale }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname() ?? "/";
    const t = getDictionary(locale);
    const L = (p: string) => localePath(locale, p);

    const navLinks = [
        { href: L("/portfolio"), label: t.nav.portfolio },
        { href: L("/packages"), label: t.nav.packages },
        { href: L("/add-ons"), label: t.nav.addons },
        { href: L("/plan"), label: t.nav.plan },
        { href: L("/vivah-muhurat-2027"), label: t.nav.muhurat },
        { href: L("/about"), label: t.nav.about },
        { href: L("/contact"), label: t.nav.contact },
    ];

    const home = locale === "hi" ? "/hi" : "/";
    const isHome = pathname === home;
    // Pages that open with a full-bleed photo behind the header
    const overPhoto = isHome || /^\/(services|wedding-photographer|weddings)\/[^/]+$/.test(pathname);
    const isActive = (href: string) => (href === home ? isHome : pathname.startsWith(href));
    const alt = alternatePath(pathname);
    const switchHref = locale === "hi" ? alt.en : alt.hi ?? "/hi";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const langSwitch = (className?: string) => (
        <Link
            href={switchHref}
            hrefLang={locale === "hi" ? "en-IN" : "hi-IN"}
            lang={locale === "hi" ? "en" : "hi"}
            aria-label={t.switchLabel}
            className={cn(
                "inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-sm transition-colors hover:border-accent hover:text-accent",
                locale === "en" && "font-hindi",
                className
            )}
        >
            <Languages className="h-4 w-4" aria-hidden />
            {t.switchTo}
        </Link>
    );

    return (
        <>
            <motion.header
                data-site-header
                className={cn(
                    "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
                    isScrolled ? "glass py-3 shadow-lg" : "bg-transparent py-5",
                    // Over the homepage hero photo: light text in both themes
                    !isScrolled && !isMobileMenuOpen && overPhoto && "on-photo"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <nav className="container-custom flex items-center justify-between gap-4" aria-label="Main">
                    <Link href={home} className="group relative z-10 flex items-center gap-2" aria-label={`${business.name}: ${t.nav.home}`}>
                        <span className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Sindhu</span>
                        <span className="text-gradient font-display text-2xl font-light italic md:text-3xl">Studio</span>
                    </Link>

                    <div className="hidden items-center gap-5 lg:flex xl:gap-7">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive(link.href) ? "page" : undefined}
                                className={cn(
                                    "group relative py-2 text-[13px] font-medium tracking-wide transition-colors hover:text-foreground",
                                    locale === "en" && "uppercase tracking-[0.12em]",
                                    isActive(link.href) ? "text-foreground" : "text-foreground-muted"
                                )}
                            >
                                {link.label}
                                <span className={cn("absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 group-hover:w-full", isActive(link.href) ? "w-full" : "w-0")} />
                            </Link>
                        ))}
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        {langSwitch()}
                        <button
                            onClick={toggleTheme}
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-accent hover:bg-accent/10"
                            aria-label={t.nav.theme}
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
                        </button>
                        <Link href={L("/build")} className="btn btn-primary whitespace-nowrap px-5">
                            {t.nav.cta}
                        </Link>
                    </div>

                    <div className="flex items-center gap-1 lg:hidden">
                        {langSwitch("h-9 px-2.5 text-xs")}
                        <button onClick={toggleTheme} className="flex h-11 w-11 cursor-pointer items-center justify-center" aria-label={t.nav.theme}>
                            {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="relative z-50 flex h-11 w-11 cursor-pointer items-center justify-center"
                            aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
                        </button>
                    </div>
                </nav>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/98 px-6 pb-10 pt-28 backdrop-blur-lg lg:hidden"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                    >
                        <nav className="flex flex-col" aria-label="Mobile">
                            {[{ href: home, label: t.nav.home }, ...navLinks].map((link, i) => (
                                <motion.div key={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        aria-current={isActive(link.href) ? "page" : undefined}
                                        className={cn(
                                            "flex min-h-14 items-center justify-between border-b border-border font-display text-2xl transition-colors hover:text-accent",
                                            isActive(link.href) && "text-accent"
                                        )}
                                    >
                                        {link.label}
                                        <span aria-hidden className="text-base text-foreground-muted">→</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <div className="mt-8 grid grid-cols-2 gap-3">
                            <a href={`tel:${primaryPhone.tel}`} className="btn btn-outline">
                                {t.mobileBar.call}
                            </a>
                            <a href={whatsappLink(t.mobileBar.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                WhatsApp
                            </a>
                        </div>
                        <Link href={L("/build")} onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary mt-3">
                            {t.nav.cta}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
