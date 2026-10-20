import type { Metadata } from "next";
import { LegalPage, LegalTable } from "@/components/legal/LegalPage";
import { ConsentSettingsButton } from "@/components/ui/ConsentSettingsButton";
import { business } from "@/data/business";

export const metadata: Metadata = {
    title: "Cookie Policy",
    description: `The cookies and browser storage ${business.name}'s website uses, and how to change your choice.`,
    alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
    return (
        <LegalPage
            title="Cookie Policy"
            path="/cookie-policy"
            updated="20 October 2026"
            intro={<p>We keep this short because we use very little.</p>}
            inShort={["No advertising or tracking cookies.", "Google Analytics loads only if you click Accept.", "Change your mind any time from Cookie settings at the bottom of every page."]}
            sections={[
                {
                    id: "what",
                    title: "What we store",
                    body: (
                        <LegalTable
                            head={["Name", "Type", "Why", "How long"]}
                            rows={[
                                ["sindhu-theme", "Essential (your browser)", "Remembers light or dark mode", "Until you clear it"],
                                ["sindhu-consent", "Essential (your browser)", "Remembers your cookie choice", "Until you clear it"],
                                ["sindhu-quote-draft", "Essential (your browser)", "Keeps the quote you were building", "Until you clear it"],
                                ["_ga, _ga_*", "Analytics (Google), only if you accept", "Counts visits and pages anonymously so we can improve the site", "Up to 14 months"],
                            ]}
                        />
                    ),
                },
                {
                    id: "consent-mode",
                    title: "How your choice is respected",
                    body: (
                        <p>
                            We use Google Consent Mode. Until you click Accept, Google Analytics runs in a cookieless mode that doesn&apos;t store identifiers on your device. If you click
                            Reject, it stays that way.
                        </p>
                    ),
                },
                {
                    id: "change",
                    title: "Change your choice",
                    body: (
                        <p>
                            Use <ConsentSettingsButton /> to reopen the choice. You can also clear cookies in your browser settings at any time.
                        </p>
                    ),
                },
            ]}
            related={[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
            ]}
        />
    );
}
