import { en } from "./en";
import { hi } from "./hi";

export type Locale = "en" | "hi";
export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale];
}

/** Routes that exist only in English (tools, APIs and machine-readable files). Every other page has a Hindi version at /hi/... */
const englishOnly = ["/keystatic", "/api", "/build/card", "/llms.txt", "/llms-full.txt", "/sitemap.xml", "/robots.txt"];

export function hasHindi(path: string) {
    const clean = path.split("?")[0].split("#")[0];
    if (!clean.startsWith("/") || clean.startsWith("/hi/") || clean === "/hi") return false;
    return !englishOnly.some((p) => clean === p || clean.startsWith(`${p}/`));
}

/** Link to a page in the given locale, falling back to English when no Hindi page exists. */
export function localePath(locale: Locale, path: string) {
    if (locale === "en" || !hasHindi(path)) return path;
    return path === "/" ? "/hi" : `/hi${path}`;
}

export function localeFromPath(pathname: string | null | undefined): Locale {
    return pathname === "/hi" || pathname?.startsWith("/hi/") ? "hi" : "en";
}

/** The same page in the other language, for the language switcher and hreflang. */
export function alternatePath(pathname: string): { en: string; hi: string | null } {
    const enPath = pathname === "/hi" ? "/" : pathname.startsWith("/hi/") ? pathname.slice(3) : pathname;
    return { en: enPath, hi: hasHindi(enPath) ? localePath("hi", enPath) : null };
}

/** hreflang alternates for generateMetadata */
export function languageAlternates(enPath: string) {
    const hiPath = hasHindi(enPath) ? localePath("hi", enPath) : undefined;
    return {
        languages: {
            "en-IN": enPath,
            ...(hiPath ? { "hi-IN": hiPath } : {}),
            "x-default": enPath,
        },
    };
}
