import Link from "next/link";
import { LegalPage, LegalTable } from "@/components/legal/LegalPage";
import { business, deliveryTimeline } from "@/data/business";
import { localePath, type Locale } from "@/i18n";

export const deliveryMeta = {
    en: { title: "Delivery Policy", description: `How and when ${business.name} delivers your photos, videos, films and printed albums.` },
    hi: { title: "डिलीवरी पॉलिसी", description: `${business.name} आपकी फोटो, वीडियो, फ़िल्में और प्रिंटेड एल्बम कैसे और कब डिलीवर करता है।` },
};

export function DeliveryPolicy({ locale = "en" }: { locale?: Locale }) {
    const L = (p: string) => localePath(locale, p);
    if (locale === "hi") {
        return (
            <LegalPage
                locale="hi"
                title={deliveryMeta.hi.title}
                path="/delivery-policy"
                updated="20 अक्टूबर 2026"
                intro={<p>आपको क्या मिलेगा, कैसे और कब।</p>}
                inShort={["डिजिटल फ़ाइलें पेनड्राइव पर मिलती हैं (और ज़रूरत हो तो डाउनलोड लिंक भी)।", "एल्बम और फ्रेम रोहतक स्टूडियो से ले जा सकते हैं, या तय करके डिलीवर किए जाते हैं।"]}
                sections={[
                    {
                        id: "timeline",
                        title: "समय-सीमा",
                        body: (
                            <>
                                <LegalTable head={["क्या", "कब"]} rows={deliveryTimeline.map((d) => [d.itemHi, d.timeHi])} />
                                <p>एल्बम और फ़िल्म की समय-सीमा तब शुरू होती है जब आप अपनी फ़ाइनल फोटो और गाने चुनकर भेज देते हैं।</p>
                            </>
                        ),
                    },
                    {
                        id: "digital",
                        title: "डिजिटल डिलीवरी",
                        body: <p>फोटो और वीडियो हर पैकेज में शामिल 64 GB पेनड्राइव पर दिए जाते हैं। टीज़र और फोटो चुनने के लिए हम एक प्राइवेट डाउनलोड लिंक भी भेज सकते हैं, जो सिर्फ़ आपकी बुकिंग वाले संपर्क के साथ शेयर होता है।</p>,
                    },
                    {
                        id: "physical",
                        title: "एल्बम और फ्रेम",
                        body: (
                            <p>
                                प्रिंटेड एल्बम और फ्रेम हमारे स्टूडियो, {business.address.street}, रोहतक से ले जा सकते हैं। किसी और पते पर डिलीवरी खर्च लेकर करवाई जा सकती है। एल्बम मिलते ही उसे जांच लें, और प्रिंटिंग में कोई कमी हो तो 7 दिन के अंदर बताएं ताकि हम दोबारा प्रिंट कर सकें।
                            </p>
                        ),
                    },
                    {
                        id: "related",
                        title: "संबंधित पॉलिसी",
                        body: (
                            <p>
                                &quot;RAW डेटा&quot; और बैकअप का मतलब जानने के लिए <Link href={`${L("/terms")}#delivery`}>नियम और शर्तें</Link> देखें, और हमारी{" "}
                                <Link href={L("/cancellation-policy")}>कैंसिलेशन और रिफ़ंड पॉलिसी</Link> भी।
                            </p>
                        ),
                    },
                ]}
                related={[
                    { label: "नियम और शर्तें", href: L("/terms") },
                    { label: "कैंसिलेशन और रिफ़ंड", href: L("/cancellation-policy") },
                ]}
            />
        );
    }
    return (
        <LegalPage
            title={deliveryMeta.en.title}
            path="/delivery-policy"
            updated="20 October 2026"
            intro={<p>What you receive, how, and when.</p>}
            inShort={["Digital files come on a pendrive (and a download link where needed).", "Albums and frames are collected from our Rohtak studio, or delivered by arrangement."]}
            sections={[
                {
                    id: "timeline",
                    title: "Timelines",
                    body: (
                        <>
                            <LegalTable head={["What", "When"]} rows={deliveryTimeline.map((d) => [d.item, d.time])} />
                            <p>Album and film timelines start once you send your final photo selection and song choices.</p>
                        </>
                    ),
                },
                {
                    id: "digital",
                    title: "Digital delivery",
                    body: (
                        <p>
                            Photos and videos are delivered on the 64 GB pendrive included in every package. For teasers and selections we may also send a private download link,
                            shared only with the contact on your booking.
                        </p>
                    ),
                },
                {
                    id: "physical",
                    title: "Albums and frames",
                    body: (
                        <p>
                            Printed albums and frames can be collected from our studio at {business.address.street}, {business.address.locality}. Delivery to another address can be
                            arranged at cost. Please check your album when you receive it and tell us about any printing defect within 7 days so we can reprint it.
                        </p>
                    ),
                },
                {
                    id: "related",
                    title: "Related policies",
                    body: (
                        <p>
                            See <Link href="/terms#delivery">Terms &amp; Conditions</Link> for what &quot;RAW data&quot; and backup mean, and our{" "}
                            <Link href="/cancellation-policy">Cancellation &amp; Refund Policy</Link>.
                        </p>
                    ),
                },
            ]}
            related={[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Cancellation & Refunds", href: "/cancellation-policy" },
            ]}
        />
    );
}
