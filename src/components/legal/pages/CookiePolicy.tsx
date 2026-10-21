import { LegalPage, LegalTable } from "@/components/legal/LegalPage";
import { ConsentSettingsButton } from "@/components/ui/ConsentSettingsButton";
import { localePath, type Locale } from "@/i18n";

export const cookieMeta = {
    en: { title: "Cookie Policy", description: "The cookies and browser storage Sindhu Studio's website uses, and how to change your choice." },
    hi: { title: "कुकी पॉलिसी", description: "Sindhu Studio की वेबसाइट कौन-सी कुकी और ब्राउज़र स्टोरेज इस्तेमाल करती है, और अपनी पसंद कैसे बदलें।" },
};

export function CookiePolicy({ locale = "en" }: { locale?: Locale }) {
    const L = (p: string) => localePath(locale, p);
    if (locale === "hi") {
        return (
            <LegalPage
                locale="hi"
                title={cookieMeta.hi.title}
                path="/cookie-policy"
                updated="20 अक्टूबर 2026"
                intro={<p>हम बहुत कम चीज़ें इस्तेमाल करते हैं, इसलिए यह पॉलिसी छोटी है।</p>}
                inShort={["कोई विज्ञापन या ट्रैकिंग कुकी नहीं।", "Google Analytics सिर्फ़ तब लोड होता है जब आप Accept दबाते हैं।", "हर पेज के नीचे Cookie settings से कभी भी अपनी पसंद बदलें।"]}
                sections={[
                    {
                        id: "what",
                        title: "हम क्या सेव करते हैं",
                        body: (
                            <LegalTable
                                head={["नाम", "प्रकार", "क्यों", "कितने समय तक"]}
                                rows={[
                                    ["sindhu-theme", "ज़रूरी (आपका ब्राउज़र)", "लाइट या डार्क मोड याद रखता है", "जब तक आप हटाएं नहीं"],
                                    ["sindhu-consent", "ज़रूरी (आपका ब्राउज़र)", "आपकी कुकी पसंद याद रखता है", "जब तक आप हटाएं नहीं"],
                                    ["sindhu-quote-draft", "ज़रूरी (आपका ब्राउज़र)", "आपका बनाया जा रहा कोटेशन रखता है", "जब तक आप हटाएं नहीं"],
                                    ["_ga, _ga_*", "एनालिटिक्स (Google), सिर्फ़ आपकी सहमति से", "विज़िट और पेज बिना पहचान के गिनता है ताकि हम साइट बेहतर कर सकें", "14 महीने तक"],
                                ]}
                            />
                        ),
                    },
                    {
                        id: "consent-mode",
                        title: "आपकी पसंद का सम्मान कैसे होता है",
                        body: <p>हम Google Consent Mode इस्तेमाल करते हैं। जब तक आप Accept नहीं दबाते, Google Analytics बिना कुकी वाले मोड में चलता है जो आपके डिवाइस पर कोई पहचान सेव नहीं करता। Reject दबाने पर यह ऐसा ही रहता है।</p>,
                    },
                    {
                        id: "change",
                        title: "अपनी पसंद बदलें",
                        body: (
                            <p>
                                पसंद दोबारा खोलने के लिए <ConsentSettingsButton label="कुकी सेटिंग्स" /> इस्तेमाल करें। आप कभी भी अपने ब्राउज़र की सेटिंग्स में कुकी हटा भी सकते हैं।
                            </p>
                        ),
                    },
                ]}
                related={[
                    { label: "प्राइवेसी पॉलिसी", href: L("/privacy") },
                    { label: "नियम और शर्तें", href: L("/terms") },
                ]}
            />
        );
    }
    return (
        <LegalPage
            title={cookieMeta.en.title}
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
