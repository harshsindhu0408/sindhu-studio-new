"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { getDictionary, type Locale } from "@/i18n";

const STORAGE_KEY = "sindhu-consent";

type Choice = "granted" | "denied";

/**
 * Google Consent Mode v2 defaults. Injected in <head> before any Google tag,
 * and re-applies a stored choice so returning visitors aren't asked again.
 */
export const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted',
  wait_for_update: 500
});
try {
  var c = localStorage.getItem('${STORAGE_KEY}');
  if (c === 'granted') gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
} catch (e) {}
`;

function applyConsent(choice: Choice) {
    window.dataLayer = window.dataLayer || [];
    // gtag must push the `arguments` object itself for Consent Mode to recognise it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- signature only; the body pushes `arguments`
    function gtag(..._args: unknown[]) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
    }
    gtag("consent", "update", {
        analytics_storage: choice,
        ad_storage: choice,
        ad_user_data: choice,
        ad_personalization: choice,
    });
}

export function openConsentSettings() {
    window.dispatchEvent(new Event("sindhu:consent-open"));
}

export function ConsentBanner({ locale = "en" }: { locale?: Locale }) {
    const t = getDictionary(locale).consent;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let stored: string | null = null;
        try {
            stored = localStorage.getItem(STORAGE_KEY);
        } catch {
            // storage blocked: ask every visit, defaults stay "denied"
        }
        if (!stored) {
            const t = setTimeout(() => setOpen(true), 1200);
            return () => clearTimeout(t);
        }
    }, []);

    useEffect(() => {
        const reopen = () => setOpen(true);
        window.addEventListener("sindhu:consent-open", reopen);
        return () => window.removeEventListener("sindhu:consent-open", reopen);
    }, []);

    const choose = (choice: Choice) => {
        applyConsent(choice);
        try {
            localStorage.setItem(STORAGE_KEY, choice);
        } catch {
            // ignore
        }
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div
            data-consent
            role="dialog"
            aria-modal="false"
            aria-labelledby="consent-title"
            className="fixed inset-x-3 bottom-[5.5rem] z-[60] mx-auto max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl md:inset-x-auto md:bottom-6 md:left-6 md:mx-0"
        >
            <div className="flex items-start gap-3">
                <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                    <p id="consent-title" className="font-medium">
                        {t.title}
                    </p>
                    <p className="mt-1 text-sm text-foreground-muted">
                        {t.body}{" "}
                        <Link href="/cookie-policy" className="underline underline-offset-2 hover:text-accent">
                            {t.policy}
                        </Link>
                    </p>
                </div>
            </div>
            {/* Equal-weight buttons: rejecting must be as easy as accepting */}
            <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => choose("denied")}
                    className="min-h-11 cursor-pointer rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:border-accent"
                >
                    {t.reject}
                </button>
                <button
                    type="button"
                    onClick={() => choose("granted")}
                    className="min-h-11 cursor-pointer rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:border-accent"
                >
                    {t.accept}
                </button>
            </div>
        </div>
    );
}
