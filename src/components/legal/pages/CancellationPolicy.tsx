import Link from "next/link";
import { LegalPage, LegalTable, type LegalSection } from "@/components/legal/LegalPage";
import { CancellationCalculator } from "@/components/legal/CancellationCalculator";
import { business, cancellationTiers, paymentTerms } from "@/data/business";
import type { Locale } from "@/i18n";

export const cancellationMeta = {
    en: { title: "Cancellation & Refund Policy", description: `${business.name} cancellation, rescheduling and refund rules, with a calculator to see exactly what cancelling would cost for your date.` },
    hi: { title: "कैंसिलेशन और रिफ़ंड पॉलिसी", description: `${business.name} के कैंसिलेशन, तारीख बदलने और रिफ़ंड के नियम, और एक कैलकुलेटर जिससे आप अपनी तारीख के लिए कैंसिलेशन का सही खर्च देख सकें।` },
};

const sectionsEn: LegalSection[] = [
    {
        id: "by-you",
        title: "If you cancel",
        summary: ["The earlier you tell us, the more flexibility you have."],
        body: (
            <>
                <LegalTable
                    head={["When you cancel", "What you pay", "Can you move the date?"]}
                    rows={cancellationTiers.map((t) => [t.label + " the event", `${t.chargePercent}% of the total${t.chargePercent === paymentTerms.bookingPercent ? " (the booking amount)" : ""}`, t.transferable ? "Yes, once" : "At our discretion"])}
                />
                <p>
                    The booking amount ({paymentTerms.bookingPercent}% of the total) reserves your date and turns away other families, so it is non-refundable. Anything you have paid
                    above the amount due is refunded.
                </p>
            </>
        ),
    },
    {
        id: "reschedule",
        title: "Moving to a new date",
        summary: ["Tell us more than 60 days before and we'll move your booking once, if the new date is free."],
        body: (
            <p>
                If you tell us more than 60 days before the event, we will move your booking to a new date once, subject to availability, with your payments carried over. If the new
                date is in a different season or year, current prices may apply to any change in package or add-ons.
            </p>
        ),
    },
    {
        id: "by-us",
        title: "If we cancel",
        summary: ["You get 100% of your money back."],
        body: <p>If we have to cancel for any reason within our control, we refund 100% of all amounts you have paid.</p>,
    },
    {
        id: "force-majeure",
        title: "Events outside anyone's control",
        body: (
            <p>
                If the event can&apos;t go ahead because of something outside your and our control (natural disaster, epidemic, government orders or similar), we will move your booking to
                a new date with all payments carried over. If no new date works, contact us and we&apos;ll agree a fair settlement for work already done.
            </p>
        ),
    },
    {
        id: "how-refunds",
        title: "How refunds are paid",
        summary: ["Refunds go back to your bank or UPI within 7–10 working days."],
        body: (
            <p>
                Refunds are paid to the original bank account or UPI ID within 7–10 working days of the cancellation being confirmed in writing (WhatsApp or email is fine). Cash payments
                are refunded by bank transfer.
            </p>
        ),
    },
    {
        id: "how-to-cancel",
        title: "How to cancel or reschedule",
        body: (
            <p>
                Message us on WhatsApp at {business.phones[0].display} or email <a href={`mailto:${business.email}`}>{business.email}</a> with your name and event date. The date we
                receive your message is the date used to work out the charges above. These rules are part of our <Link href="/terms">Terms &amp; Conditions</Link>.
            </p>
        ),
    },
];

const sectionsHi: LegalSection[] = [
    {
        id: "by-you",
        title: "अगर आप कैंसिल करते हैं",
        summary: ["आप जितना पहले बताएंगे, उतनी ज़्यादा सुविधा मिलेगी।"],
        body: (
            <>
                <LegalTable
                    head={["कब कैंसिल करते हैं", "कितना देना होगा", "क्या तारीख बदल सकते हैं?"]}
                    rows={cancellationTiers.map((t) => [`कार्यक्रम से ${t.labelHi}`, `कुल रकम का ${t.chargePercent}%${t.chargePercent === paymentTerms.bookingPercent ? " (बुकिंग अमाउंट)" : ""}`, t.transferable ? "हां, एक बार" : "हमारे विवेक पर"])}
                />
                <p>
                    बुकिंग अमाउंट (कुल रकम का {paymentTerms.bookingPercent}%) आपकी तारीख पक्की करता है और उस दिन के लिए दूसरे परिवारों को मना किया जाता है, इसलिए यह वापस नहीं होता। देय रकम से ज़्यादा जो भी आपने दिया है, वो वापस किया जाता है।
                </p>
            </>
        ),
    },
    {
        id: "reschedule",
        title: "नई तारीख पर ले जाना",
        summary: ["60 दिन से ज़्यादा पहले बताएं, तो नई तारीख खाली होने पर हम आपकी बुकिंग एक बार आगे कर देंगे।"],
        body: (
            <p>
                अगर आप कार्यक्रम से 60 दिन से ज़्यादा पहले बताते हैं, तो उपलब्धता के हिसाब से हम आपकी बुकिंग एक बार नई तारीख पर ले जाएंगे, आपके भुगतान के साथ। अगर नई तारीख अलग सीज़न या साल में है, तो पैकेज या ऐड-ऑन में किसी बदलाव पर उस समय के दाम लागू हो सकते हैं।
            </p>
        ),
    },
    {
        id: "by-us",
        title: "अगर हम कैंसिल करते हैं",
        summary: ["आपको 100% पैसे वापस मिलेंगे।"],
        body: <p>अगर हमें अपने नियंत्रण वाली किसी भी वजह से कैंसिल करना पड़े, तो आपके दिए सारे पैसे 100% वापस किए जाएंगे।</p>,
    },
    {
        id: "force-majeure",
        title: "जो किसी के नियंत्रण में न हो",
        body: (
            <p>
                अगर कार्यक्रम किसी ऐसी वजह से नहीं हो पाता जो न आपके और न हमारे नियंत्रण में है (प्राकृतिक आपदा, महामारी, सरकारी आदेश या ऐसा कुछ), तो हम आपकी बुकिंग सारे भुगतान के साथ नई तारीख पर ले जाएंगे। अगर कोई नई तारीख नहीं बनती, तो हमसे बात करें, हम पहले हो चुके काम के हिसाब से उचित समझौता करेंगे।
            </p>
        ),
    },
    {
        id: "how-refunds",
        title: "रिफ़ंड कैसे मिलता है",
        summary: ["रिफ़ंड 7–10 कामकाजी दिनों में आपके बैंक या UPI में वापस आता है।"],
        body: <p>कैंसिलेशन लिखित में (WhatsApp या ईमेल भी चलेगा) पक्का होने के 7–10 कामकाजी दिनों के अंदर रिफ़ंड उसी बैंक खाते या UPI ID में भेजा जाता है। नकद भुगतान बैंक ट्रांसफ़र से वापस किया जाता है।</p>,
    },
    {
        id: "how-to-cancel",
        title: "कैंसिल या तारीख कैसे बदलें",
        body: (
            <p>
                हमें {business.phones[0].display} पर WhatsApp करें या <a href={`mailto:${business.email}`}>{business.email}</a> पर ईमेल करें, अपने नाम और कार्यक्रम की तारीख के साथ। ऊपर के खर्च उसी तारीख से गिने जाते हैं जिस दिन हमें आपका मैसेज मिलता है। ये नियम हमारे <Link href="/hi/terms">नियम और शर्तों</Link> का हिस्सा हैं।
            </p>
        ),
    },
];

export function CancellationPolicy({ locale = "en" }: { locale?: Locale }) {
    if (locale === "hi") {
        return (
            <LegalPage
                locale="hi"
                title={cancellationMeta.hi.title}
                path="/cancellation-policy"
                updated="20 अक्टूबर 2026"
                intro={<p>योजनाएं बदलती हैं। अगर आपकी बदलें तो ठीक-ठीक क्या होगा, यहां लिखा है, एक कैलकुलेटर के साथ ताकि कोई हैरानी न हो।</p>}
                inShort={[
                    `बुकिंग अमाउंट (${paymentTerms.bookingPercent}%) वापस नहीं होता।`,
                    "60 दिन से ज़्यादा पहले बताने पर: बुकिंग एक बार मुफ़्त में नई तारीख पर ले जाएं।",
                    "30 दिन से कम पहले: कुल रकम का 50% देना होगा।",
                    "अगर हम कैंसिल करें, तो आपको 100% वापस मिलेगा।",
                ]}
                sections={[{ id: "calculator", title: "अपनी तारीख चेक करें", body: <CancellationCalculator locale="hi" /> }, ...sectionsHi]}
                related={[
                    { label: "नियम और शर्तें", href: "/hi/terms" },
                    { label: "प्राइवेसी पॉलिसी", href: "/hi/privacy" },
                    { label: "डिलीवरी पॉलिसी", href: "/hi/delivery-policy" },
                ]}
            />
        );
    }
    return (
        <LegalPage
            title={cancellationMeta.en.title}
            path="/cancellation-policy"
            updated="20 October 2026"
            intro={<p>Plans change. Here is exactly what happens if yours do, with a calculator so there are no surprises.</p>}
            inShort={[
                `The booking amount (${paymentTerms.bookingPercent}%) is non-refundable.`,
                "More than 60 days' notice: move your booking to a new date once, free.",
                "Less than 30 days: 50% of the total is payable.",
                "If we cancel, you get 100% back.",
            ]}
            sections={[
                {
                    id: "calculator",
                    title: "Check your date",
                    body: <CancellationCalculator />,
                },
                ...sectionsEn,
            ]}
            related={[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Delivery Policy", href: "/delivery-policy" },
            ]}
        />
    );
}
