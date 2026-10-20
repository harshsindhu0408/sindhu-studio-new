"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calculator } from "lucide-react";
import { primaryPhone, whatsappLink } from "@/data/business";
import { track } from "@/lib/analytics";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { getDictionary, localePath, type Locale } from "@/i18n";

/** Sticky WhatsApp · Call · Quote bar on phones. Hidden where a page has its own sticky bar. */
export function MobileActionBar({ locale = "en" }: { locale?: Locale }) {
    const pathname = usePathname();
    const t = getDictionary(locale).mobileBar;
    if (pathname?.startsWith("/build") || pathname?.startsWith("/hi/build") || pathname?.startsWith("/plan") || pathname?.startsWith("/hi/plan")) return null;

    return (
        <nav
            data-mobile-bar
            aria-label={t.label}
            className="pb-safe fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background/95 pt-2 backdrop-blur-lg md:hidden"
        >
            <a
                href={whatsappLink(t.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "mobile_bar" })}
                className="flex min-h-12 flex-col items-center justify-center gap-1 text-xs font-medium"
            >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                {t.whatsapp}
            </a>
            <a
                href={`tel:${primaryPhone.tel}`}
                onClick={() => track("call_click", { location: "mobile_bar" })}
                className="flex min-h-12 flex-col items-center justify-center gap-1 text-xs font-medium"
            >
                <Phone className="h-5 w-5 text-accent" aria-hidden />
                {t.call}
            </a>
            <Link
                href={localePath(locale, "/build")}
                className="mx-2 mb-1 flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg bg-accent text-xs font-semibold text-accent-foreground"
            >
                <Calculator className="h-5 w-5" aria-hidden />
                {t.quote}
            </Link>
        </nav>
    );
}
