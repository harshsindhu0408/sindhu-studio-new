import Link from "next/link";
import { LegalPage, LegalTable, type LegalSection } from "@/components/legal/LegalPage";
import { business, cancellationTiers, deliveryTimeline, fullAddress, paymentTerms } from "@/data/business";
import type { Locale } from "@/i18n";

/*
 * Built from the studio's existing terms (booking %, cancellation, delivery, copyright).
 * Have a lawyer review before relying on it, especially limitation of liability.
 * The Hindi version is a convenience translation; the English text prevails.
 */

export const termsMeta = {
    en: { title: "Terms & Conditions", description: `${business.name} booking terms: payment schedule, cancellation and rescheduling, delivery timelines, RAW data, copyright and portfolio use, drone permissions.` },
    hi: { title: "नियम और शर्तें", description: `${business.name} की बुकिंग शर्तें: भुगतान, कैंसिलेशन और तारीख बदलना, डिलीवरी की समय-सीमा, RAW डेटा, कॉपीराइट, पोर्टफोलियो और ड्रोन की अनुमति।` },
};

const sectionsEn: LegalSection[] = [
    {
        id: "agreement",
        title: "About these terms",
        body: (
            <p>
                These terms apply when you book photography, videography or related services (such as LED screens, live streaming or drone) from {business.legalName}, trading as{" "}
                {business.name}, {fullAddress} (&quot;we&quot;, &quot;us&quot;). &quot;You&quot; means the person who books and pays. Your booking confirmation (package, add-ons, dates,
                venues and price) together with these terms forms our agreement. If the two differ, your booking confirmation wins.
            </p>
        ),
    },
    {
        id: "booking",
        title: "Booking and payment",
        summary: [`Your date is reserved once we receive ${paymentTerms.bookingPercent}% of the total.`, "The rest is paid in two parts: on the event day and before final delivery."],
        body: (
            <>
                <LegalTable head={["When", "How much"]} rows={paymentTerms.schedule.map((s) => [s.when.replace(/^\w/, (c) => c.toUpperCase()), `${s.percent}% of the total`])} />
                <ul>
                    <li>Dates are reserved first come, first served. We can&apos;t hold a date without the booking amount.</li>
                    <li>We accept {paymentTerms.methods.join(", ")}. Please pay only to the accounts we confirm in writing.</li>
                    <li>{paymentTerms.gstNote}</li>
                    <li>Quotes from our website are valid for {paymentTerms.quoteValidityDays} days. Prices on the date you book apply to that booking.</li>
                </ul>
            </>
        ),
    },
    {
        id: "outstation",
        title: "Events outside Rohtak",
        summary: ["Travel and stay for the team are added for outstation events. We tell you the amount before you book."],
        body: (
            <p>
                For events outside {business.address.locality}, travel and accommodation for our team are charged in addition to the package price, as quoted in your booking confirmation.
                Destination weddings are quoted separately.
            </p>
        ),
    },
    {
        id: "cancellation",
        title: "Cancellation and rescheduling",
        summary: ["The booking amount is non-refundable.", "More than 60 days' notice: you can move your booking to a new date once."],
        body: (
            <>
                <LegalTable head={["If you cancel", "What happens"]} rows={cancellationTiers.map((t) => [t.label + " the event", t.outcome])} />
                <p>
                    If <strong>we</strong> have to cancel for any reason within our control, we refund 100% of everything you have paid. Full details, and a calculator, are on our{" "}
                    <Link href="/cancellation-policy">Cancellation &amp; Refund Policy</Link>.
                </p>
            </>
        ),
    },
    {
        id: "coverage",
        title: "Coverage and creative style",
        summary: ["We cover your event in the style shown in our portfolio.", "Live events are unpredictable, so we can't promise every single shot."],
        body: (
            <>
                <p>
                    Photography and film are creative work. We cover your event in the style shown in our portfolio, using our professional judgement about angles, lighting and editing.
                </p>
                <ul>
                    <li>
                        We aim to capture every important moment, but we can&apos;t guarantee specific shots that depend on things outside our control: lighting, weather, timing changes,
                        crowding, or venue restrictions. Share a list of must-have family photos before the day and we&apos;ll prioritise it.
                    </li>
                    <li>Coverage is for the functions, days and hours in your booking. Extra functions or days can be added at our current add-on prices.</li>
                    <li>We are the exclusive professional photography and video team for the functions we cover, unless agreed otherwise in writing.</li>
                </ul>
            </>
        ),
    },
    {
        id: "drone-led",
        title: "Drone, LED screens and live streaming",
        summary: ["Drone flights depend on venue and legal permissions.", "LED screens and live streams need power and, for streaming, internet at the venue."],
        body: (
            <ul>
                <li>
                    Drone shoots follow the Drone Rules, 2021 and the venue&apos;s rules. If flying isn&apos;t permitted at your venue or on the day (for example near airports, in restricted
                    zones or in bad weather), we will tell you as early as possible and either adjust coverage or remove the drone charge.
                </li>
                <li>LED screens and live streaming need a stable power supply at the venue. Live streaming also needs a working internet connection there.</li>
                <li>Live streams are set up as private or unlisted links. Please share the link only with people you trust.</li>
            </ul>
        ),
    },
    {
        id: "delivery",
        title: "Delivery and timelines",
        summary: ["Teaser in 1–2 weeks, full gallery in 4–6 weeks, film and album after you approve the photo selection."],
        body: (
            <>
                <LegalTable head={["What", "When"]} rows={deliveryTimeline.map((d) => [d.item, d.time])} />
                <ul>
                    <li>Album and film timelines start when you have sent your final photo selection and song choices. Delays in selection delay delivery.</li>
                    <li>
                        <strong>&quot;Full HD photos (RAW data)&quot;</strong> in our packages means every photo from your event in full resolution, delivered on your pendrive. Album photos
                        are colour-corrected and retouched.
                    </li>
                    <li>
                        Packages that include <strong>backup</strong> keep a copy of your data for 6 months after delivery. For other packages, please keep your pendrive and make your own
                        backup: after delivery we are not responsible for lost copies.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "copyright",
        title: "Copyright and how you can use your photos",
        summary: ["You can print and share your photos for personal use, forever.", "Commercial use needs our written permission."],
        body: (
            <>
                <p>
                    {business.name} owns the copyright in the photos and videos we create, as the Copyright Act, 1957 provides. You receive a permanent, non-exclusive licence to use them
                    for personal purposes: printing, framing, and sharing with family and on social media. Please credit {business.name} when you post online.
                </p>
                <p>Commercial use (for example in advertising, or selling the images) needs our written permission.</p>
            </>
        ),
    },
    {
        id: "portfolio",
        title: "Use of your photos in our portfolio",
        summary: ["We ask before using your photos in our portfolio, and you can say no."],
        body: (
            <p>
                We would love to show some of your images on our website and social media. We will ask for your consent at booking, and you can refuse, limit it to certain images, or
                withdraw it later. See our <Link href="/privacy#photos">Privacy Policy</Link> for details.
            </p>
        ),
    },
    {
        id: "liability",
        title: "If something goes wrong",
        summary: ["If we can't deliver part of your coverage, you get a fair refund for that part.", "Our liability is limited to what you've paid us."],
        body: (
            <>
                <p>
                    We use professional equipment. If part of your coverage is lost or can&apos;t be delivered because of equipment failure, illness or
                    another reason within our control, we will offer a fair refund for the affected part of the service.
                </p>
                <p>
                    To the extent the law allows, our total liability for any claim relating to a booking is limited to the amount you have paid us for that booking. We are not liable for
                    events outside our reasonable control (&quot;force majeure&quot;), such as natural disasters, epidemics, government orders, strikes or venue closures. In such cases we
                    will work with you to move your booking to a new date.
                </p>
            </>
        ),
    },
    {
        id: "conduct",
        title: "Safety at the event",
        body: (
            <p>
                Our team needs a safe working environment. We may pause coverage if a team member is threatened, harassed or put in danger, and will resume as soon as it is safe.
            </p>
        ),
    },
    {
        id: "law",
        title: "Governing law and disputes",
        summary: ["Talk to us first: most issues are sorted with a phone call."],
        body: (
            <p>
                These terms are governed by the laws of India. Please contact us first so we can try to resolve any issue directly. If we can&apos;t, the courts at {business.jurisdiction}{" "}
                have jurisdiction. Nothing here affects your rights under the Consumer Protection Act, 2019.
            </p>
        ),
    },
    {
        id: "contact",
        title: "Contact",
        body: (
            <p>
                {business.name}, {fullAddress}. Email <a href={`mailto:${business.email}`}>{business.email}</a>, phone{" "}
                <a href={`tel:${business.phones[0].tel}`}>{business.phones[0].display}</a>.
            </p>
        ),
    },
];

const sectionsHi: LegalSection[] = [
    {
        id: "agreement",
        title: "इन शर्तों के बारे में",
        body: (
            <p>
                ये शर्तें तब लागू होती हैं जब आप {business.legalName} ({business.name} नाम से), {fullAddress} (&quot;हम&quot;) से फोटोग्राफी, वीडियोग्राफी या संबंधित सेवाएं (जैसे LED
                स्क्रीन, लाइव स्ट्रीमिंग या ड्रोन) बुक करते हैं। &quot;आप&quot; का मतलब है वो व्यक्ति जो बुकिंग करता है और भुगतान करता है। आपकी बुकिंग कन्फ़र्मेशन (पैकेज, ऐड-ऑन,
                तारीखें, वेन्यू और दाम) और ये शर्तें मिलकर हमारा समझौता बनाती हैं। दोनों में अंतर हो, तो बुकिंग कन्फ़र्मेशन मान्य होगी।
            </p>
        ),
    },
    {
        id: "booking",
        title: "बुकिंग और भुगतान",
        summary: [`कुल रकम का ${paymentTerms.bookingPercent}% मिलते ही आपकी तारीख पक्की हो जाती है।`, "बाकी दो हिस्सों में: कार्यक्रम के दिन और फ़ाइनल डिलीवरी से पहले।"],
        body: (
            <>
                <LegalTable head={["कब", "कितना"]} rows={paymentTerms.schedule.map((s) => [s.whenHi, `कुल रकम का ${s.percent}%`])} />
                <ul>
                    <li>तारीखें पहले आओ, पहले पाओ के आधार पर पक्की होती हैं। बुकिंग अमाउंट के बिना हम कोई तारीख रोक नहीं सकते।</li>
                    <li>हम {paymentTerms.methodsHi.join(", ")} लेते हैं। कृपया सिर्फ़ उन्हीं खातों में भुगतान करें जिनकी हम लिखित में पुष्टि करें।</li>
                    <li>{paymentTerms.gstNoteHi}</li>
                    <li>हमारी वेबसाइट से बने कोटेशन {paymentTerms.quoteValidityDays} दिन के लिए मान्य हैं। जिस दिन आप बुक करते हैं, उस दिन के दाम उस बुकिंग पर लागू होते हैं।</li>
                </ul>
            </>
        ),
    },
    {
        id: "outstation",
        title: "रोहतक के बाहर के कार्यक्रम",
        summary: ["बाहर के कार्यक्रमों के लिए टीम का सफ़र और रुकना जुड़ता है। हम बुकिंग से पहले रकम बता देते हैं।"],
        body: (
            <p>
                रोहतक के बाहर के कार्यक्रमों के लिए हमारी टीम का सफ़र और रुकने का खर्च पैकेज के दाम के अलावा लिया जाता है, जैसा आपकी बुकिंग कन्फ़र्मेशन में लिखा हो। डेस्टिनेशन वेडिंग का
                कोटेशन अलग से दिया जाता है।
            </p>
        ),
    },
    {
        id: "cancellation",
        title: "कैंसिलेशन और तारीख बदलना",
        summary: ["बुकिंग अमाउंट वापस नहीं होता।", "60 दिन से ज़्यादा पहले बताने पर आप बुकिंग एक बार नई तारीख पर ले जा सकते हैं।"],
        body: (
            <>
                <LegalTable head={["अगर आप कैंसिल करें", "क्या होगा"]} rows={cancellationTiers.map((t) => [`कार्यक्रम से ${t.labelHi}`, t.outcomeHi])} />
                <p>
                    अगर <strong>हमें</strong> अपने नियंत्रण वाली किसी वजह से कैंसिल करना पड़े, तो आपके दिए सारे पैसे 100% वापस किए जाएंगे। पूरी जानकारी और कैलकुलेटर हमारी{" "}
                    <Link href="/hi/cancellation-policy">कैंसिलेशन और रिफ़ंड पॉलिसी</Link> पर है।
                </p>
            </>
        ),
    },
    {
        id: "coverage",
        title: "कवरेज और क्रिएटिव स्टाइल",
        summary: ["हम आपका कार्यक्रम उसी स्टाइल में कवर करते हैं जो हमारे पोर्टफोलियो में दिखता है।", "लाइव कार्यक्रम का पहले से अंदाज़ा नहीं लगाया जा सकता, इसलिए हम हर एक शॉट का वादा नहीं कर सकते।"],
        body: (
            <>
                <p>फोटोग्राफी और फ़िल्म क्रिएटिव काम है। हम आपका कार्यक्रम अपने पोर्टफोलियो वाले स्टाइल में कवर करते हैं, एंगल, रोशनी और एडिटिंग के बारे में अपनी प्रोफ़ेशनल समझ से।</p>
                <ul>
                    <li>
                        हम हर ज़रूरी पल कैद करने की कोशिश करते हैं, पर ऐसे ख़ास शॉट की गारंटी नहीं दे सकते जो हमारे नियंत्रण से बाहर की चीज़ों पर निर्भर हों: रोशनी, मौसम, समय में बदलाव, भीड़
                        या वेन्यू की पाबंदियां। ज़रूरी पारिवारिक फोटो की लिस्ट पहले दे दें, हम उसे प्राथमिकता देंगे।
                    </li>
                    <li>कवरेज आपकी बुकिंग में लिखे फंक्शन, दिन और घंटों के लिए है। एक्स्ट्रा फंक्शन या दिन हमारे मौजूदा ऐड-ऑन दामों पर जोड़े जा सकते हैं।</li>
                    <li>जिन फंक्शन को हम कवर करते हैं, उनमें हम ही एकमात्र प्रोफ़ेशनल फोटो और वीडियो टीम होते हैं, जब तक लिखित में कुछ और तय न हो।</li>
                </ul>
            </>
        ),
    },
    {
        id: "drone-led",
        title: "ड्रोन, LED स्क्रीन और लाइव स्ट्रीमिंग",
        summary: ["ड्रोन की उड़ान वेन्यू और कानूनी अनुमति पर निर्भर है।", "LED स्क्रीन और लाइव स्ट्रीम के लिए वेन्यू पर बिजली, और स्ट्रीमिंग के लिए इंटरनेट भी चाहिए।"],
        body: (
            <ul>
                <li>
                    ड्रोन शूट ड्रोन नियम, 2021 और वेन्यू के नियमों के हिसाब से होते हैं। अगर आपके वेन्यू पर या उस दिन उड़ान की अनुमति नहीं है (जैसे हवाई अड्डे के पास, प्रतिबंधित क्षेत्र में
                    या ख़राब मौसम में), तो हम जितना जल्दी हो सके बताएंगे और या तो कवरेज बदलेंगे या ड्रोन का खर्च हटा देंगे।
                </li>
                <li>LED स्क्रीन और लाइव स्ट्रीमिंग के लिए वेन्यू पर स्थिर बिजली चाहिए। लाइव स्ट्रीमिंग के लिए वहां चालू इंटरनेट कनेक्शन भी चाहिए।</li>
                <li>लाइव स्ट्रीम प्राइवेट या अनलिस्टेड लिंक के रूप में होती हैं। कृपया लिंक सिर्फ़ भरोसेमंद लोगों के साथ शेयर करें।</li>
            </ul>
        ),
    },
    {
        id: "delivery",
        title: "डिलीवरी और समय-सीमा",
        summary: ["1–2 हफ़्ते में टीज़र, 4–6 हफ़्ते में पूरी गैलरी, फोटो चुनने के बाद फ़िल्म और एल्बम।"],
        body: (
            <>
                <LegalTable head={["क्या", "कब"]} rows={deliveryTimeline.map((d) => [d.itemHi, d.timeHi])} />
                <ul>
                    <li>एल्बम और फ़िल्म की समय-सीमा तब शुरू होती है जब आप अपनी फ़ाइनल फोटो और गाने भेज देते हैं। चुनने में देरी से डिलीवरी में भी देरी होती है।</li>
                    <li>
                        हमारे पैकेज में <strong>&quot;फुल HD फोटो (RAW डेटा)&quot;</strong> का मतलब है आपके कार्यक्रम की हर फोटो फुल रेज़ोल्यूशन में, आपकी पेनड्राइव पर। एल्बम की फोटो
                        कलर-करेक्ट और रीटच की जाती हैं।
                    </li>
                    <li>
                        जिन पैकेज में <strong>बैकअप</strong> शामिल है, उनमें डिलीवरी के बाद 6 महीने तक आपके डेटा की कॉपी रखी जाती है। बाकी पैकेज के लिए अपनी पेनड्राइव संभालकर रखें और
                        अपना बैकअप बनाएं: डिलीवरी के बाद खोई हुई कॉपी की ज़िम्मेदारी हमारी नहीं है।
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "copyright",
        title: "कॉपीराइट और आप अपनी फोटो कैसे इस्तेमाल कर सकते हैं",
        summary: ["आप अपनी फोटो निजी इस्तेमाल के लिए हमेशा प्रिंट और शेयर कर सकते हैं।", "व्यावसायिक इस्तेमाल के लिए हमारी लिखित अनुमति चाहिए।"],
        body: (
            <>
                <p>
                    कॉपीराइट अधिनियम, 1957 के अनुसार हमारी बनाई फोटो और वीडियो का कॉपीराइट {business.name} के पास है। आपको इन्हें निजी कामों के लिए इस्तेमाल करने का स्थायी, गैर-विशिष्ट
                    लाइसेंस मिलता है: प्रिंट करना, फ्रेम करवाना, और परिवार व सोशल मीडिया पर शेयर करना। ऑनलाइन पोस्ट करते समय कृपया {business.name} को क्रेडिट दें।
                </p>
                <p>व्यावसायिक इस्तेमाल (जैसे विज्ञापन में, या फोटो बेचना) के लिए हमारी लिखित अनुमति चाहिए।</p>
            </>
        ),
    },
    {
        id: "portfolio",
        title: "हमारे पोर्टफोलियो में आपकी फोटो",
        summary: ["पोर्टफोलियो में आपकी फोटो इस्तेमाल करने से पहले हम पूछते हैं, और आप मना कर सकते हैं।"],
        body: (
            <p>
                हम आपकी कुछ फोटो अपनी वेबसाइट और सोशल मीडिया पर दिखाना चाहेंगे। बुकिंग के समय हम आपकी सहमति मांगेंगे, और आप मना कर सकते हैं, कुछ ही फोटो तक सीमित कर सकते हैं, या बाद में
                सहमति वापस ले सकते हैं। जानकारी के लिए हमारी <Link href="/hi/privacy#photos">प्राइवेसी पॉलिसी</Link> देखें।
            </p>
        ),
    },
    {
        id: "liability",
        title: "अगर कुछ गलत हो जाए",
        summary: ["अगर हम आपकी कवरेज का कोई हिस्सा न दे पाएं, तो उस हिस्से का उचित रिफ़ंड मिलेगा।", "हमारी ज़िम्मेदारी उतनी ही है जितना आपने हमें भुगतान किया है।"],
        body: (
            <>
                <p>
                    हम प्रोफ़ेशनल उपकरण इस्तेमाल करते हैं। अगर उपकरण ख़राब होने, बीमारी या हमारे नियंत्रण वाली किसी और वजह से आपकी कवरेज का कोई हिस्सा खो जाए या न दिया जा सके, तो हम सेवा
                    के उस हिस्से का उचित रिफ़ंड देंगे।
                </p>
                <p>
                    कानून जितनी अनुमति देता है, किसी बुकिंग से जुड़े किसी भी दावे पर हमारी कुल ज़िम्मेदारी उस बुकिंग के लिए आपके दिए गए पैसे तक सीमित है। हमारे उचित नियंत्रण से बाहर की
                    घटनाओं (&quot;फ़ोर्स मेज्योर&quot;), जैसे प्राकृतिक आपदा, महामारी, सरकारी आदेश, हड़ताल या वेन्यू बंद होने पर हम ज़िम्मेदार नहीं हैं। ऐसे मामलों में हम आपके साथ
                    मिलकर बुकिंग नई तारीख पर ले जाएंगे।
                </p>
            </>
        ),
    },
    {
        id: "conduct",
        title: "कार्यक्रम में सुरक्षा",
        body: (
            <p>
                हमारी टीम को काम करने के लिए सुरक्षित माहौल चाहिए। अगर टीम के किसी सदस्य को धमकाया जाए, परेशान किया जाए या ख़तरे में डाला जाए, तो हम कवरेज रोक सकते हैं, और सुरक्षित होते
                ही फिर शुरू करेंगे।
            </p>
        ),
    },
    {
        id: "law",
        title: "लागू कानून और विवाद",
        summary: ["पहले हमसे बात करें: ज़्यादातर बातें एक फ़ोन कॉल से सुलझ जाती हैं।"],
        body: (
            <p>
                ये शर्तें भारत के कानूनों के अधीन हैं। कोई भी समस्या हो तो पहले हमसे संपर्क करें ताकि हम सीधे सुलझा सकें। अगर ऐसा न हो पाए, तो रोहतक, हरियाणा की अदालतों का अधिकार
                क्षेत्र होगा। इससे उपभोक्ता संरक्षण अधिनियम, 2019 के तहत आपके अधिकारों पर कोई असर नहीं पड़ता।
            </p>
        ),
    },
    {
        id: "contact",
        title: "संपर्क",
        body: (
            <p>
                {business.name}, {fullAddress}। ईमेल <a href={`mailto:${business.email}`}>{business.email}</a>, फ़ोन{" "}
                <a href={`tel:${business.phones[0].tel}`}>{business.phones[0].display}</a>।
            </p>
        ),
    },
];

export function TermsPage({ locale = "en" }: { locale?: Locale }) {
    if (locale === "hi") {
        return (
            <LegalPage
                locale="hi"
                title={termsMeta.hi.title}
                path="/terms"
                updated="20 अक्टूबर 2026"
                intro={<p>हमारी बुकिंग के नियम, पहले आसान शब्दों में और फिर पूरे विस्तार से। बुकिंग अमाउंट देने से पहले कृपया इन्हें पढ़ लें।</p>}
                inShort={[
                    `तारीख बुक करने के लिए ${paymentTerms.bookingPercent}%, कार्यक्रम के दिन 50% और फ़ाइनल डिलीवरी से पहले आख़िरी 25%।`,
                    "बुकिंग अमाउंट वापस नहीं होता। 60 दिन से ज़्यादा पहले बताने पर आप एक बार नई तारीख पर जा सकते हैं।",
                    "1–2 हफ़्ते में टीज़र, 4–6 हफ़्ते में पूरी गैलरी, चुनने के 8–12 हफ़्ते बाद फ़िल्म और एल्बम।",
                    "आप अपनी फोटो निजी इस्तेमाल के लिए हमेशा इस्तेमाल कर सकते हैं। पोर्टफोलियो में डालने से पहले हम पूछते हैं।",
                ]}
                sections={sectionsHi}
                related={[
                    { label: "प्राइवेसी पॉलिसी", href: "/hi/privacy" },
                    { label: "कैंसिलेशन और रिफ़ंड", href: "/hi/cancellation-policy" },
                    { label: "डिलीवरी पॉलिसी", href: "/hi/delivery-policy" },
                ]}
            />
        );
    }
    return (
        <LegalPage
            title={termsMeta.en.title}
            path="/terms"
            updated="20 October 2026"
            intro={<p>The rules of our booking, in plain words first and in full below. Please read them before you pay the booking amount.</p>}
            inShort={[
                `Pay ${paymentTerms.bookingPercent}% to book your date, 50% on the event day and the last 25% before final delivery.`,
                "The booking amount is non-refundable. With more than 60 days' notice you can move to a new date once.",
                "Teaser in 1–2 weeks, full gallery in 4–6 weeks, film and album 8–12 weeks after your selection.",
                "You can use your photos for personal use forever. We ask before using them in our portfolio.",
            ]}
            sections={sectionsEn}
            related={[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Cancellation & Refunds", href: "/cancellation-policy" },
                { label: "Delivery Policy", href: "/delivery-policy" },
            ]}
        />
    );
}
