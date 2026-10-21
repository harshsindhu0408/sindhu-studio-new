import Link from "next/link";
import { Mail, Trash2, ImageOff } from "lucide-react";
import { LegalPage, LegalTable, type LegalSection } from "@/components/legal/LegalPage";
import { business, fullAddress, whatsappLink } from "@/data/business";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import type { Locale } from "@/i18n";

/*
 * Written to the Digital Personal Data Protection Act, 2023 and the rules made under it.
 * Have a lawyer review before relying on it. Retention periods are sensible defaults that
 * the owner should confirm. The Hindi version is a convenience translation; the English text prevails.
 */

const g = business.grievanceOfficer;

export const privacyMeta = {
    en: {
        title: "Privacy Policy",
        description: `How ${business.name} collects, uses, stores and deletes your personal data, photos and videos, and how to use your rights under India's Digital Personal Data Protection Act, 2023.`,
    },
    hi: {
        title: "प्राइवेसी पॉलिसी",
        description: `${business.name} आपका व्यक्तिगत डेटा, फोटो और वीडियो कैसे लेता, इस्तेमाल करता, रखता और डिलीट करता है, और डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के तहत अपने अधिकार कैसे इस्तेमाल करें।`,
    },
};

const sectionsEn: LegalSection[] = [
    {
        id: "who-we-are",
        title: "Who we are",
        summary: [`${business.name} decides how your data is used, so we're responsible for it.`],
        body: (
            <>
                <p>
                    {business.legalName}, trading as <strong>{business.name}</strong> (&quot;we&quot;, &quot;us&quot;), is a photography and videography studio at {fullAddress}. For the
                    purposes of the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;), we are the <strong>Data Fiduciary</strong> for the personal data described in this policy.
                </p>
                <p>
                    This policy covers our website ({"sindhustudio.com"}), WhatsApp, phone and email conversations with us, and the photography and video services we provide.
                </p>
            </>
        ),
    },
    {
        id: "data-we-collect",
        title: "What we collect and why",
        summary: ["We only collect what we need to plan, shoot and deliver your event.", "Each purpose is listed below with how long we keep the data."],
        body: (
            <>
                <LegalTable
                    head={["Data", "Why we need it", "How long we keep it"]}
                    rows={[
                        [
                            <>
                                <strong>Enquiry details</strong>: name, phone/WhatsApp, email, event date, functions, your quote
                            </>,
                            "To answer your enquiry, check availability and send a quote",
                            "12 months after the last message if you don't book",
                        ],
                        [
                            <>
                                <strong>Booking details</strong>: name, address, phone, event venues and schedule, payment records
                            </>,
                            "To deliver the service, issue invoices and meet tax law",
                            "For the booking, then as long as tax and accounting laws require (currently up to 8 years) for invoices and payment records",
                        ],
                        [
                            <>
                                <strong>Photos and videos</strong> of you, your family and guests
                            </>,
                            "To create, edit and deliver your photos, videos and album",
                            "Until delivery. Packages with backup keep a copy for 6 months after delivery. Then deleted, except images you allow in our portfolio",
                        ],
                        [
                            <>
                                <strong>Website usage</strong>: pages visited, device type, approximate location (only if you accept analytics cookies)
                            </>,
                            "To understand which pages help families plan and improve the site",
                            "Up to 14 months in Google Analytics",
                        ],
                    ]}
                />
                <p>
                    We do <strong>not</strong> collect Aadhaar numbers, bank account details or card details through this website. If you pay online in future, payment details are handled
                    directly by the payment provider, not by us.
                </p>
            </>
        ),
    },
    {
        id: "consent",
        title: "Consent and how to withdraw it",
        summary: ["You choose what you share. You can change your mind any time, as easily as you said yes."],
        body: (
            <>
                <p>
                    We process your personal data on the basis of your <strong>consent</strong> (for example when you send us an enquiry, accept analytics cookies, or allow portfolio use), or
                    for a <strong>legitimate use</strong> allowed by the DPDP Act, such as data you give us voluntarily to get a quote or perform your booking.
                </p>
                <p>
                    You can withdraw consent at any time by messaging us on WhatsApp, emailing {business.email}, or (for cookies) using the &quot;Cookie settings&quot; link at the bottom of
                    every page. Withdrawing consent doesn&apos;t affect anything we did before, and we may still keep records the law requires (such as invoices).
                </p>
            </>
        ),
    },
    {
        id: "photos",
        title: "Photos of you and your guests",
        summary: ["We only show your photos in our portfolio or social media if you agree.", "Guests can ask us to remove photos of themselves from our portfolio."],
        body: (
            <>
                <p>
                    At your event we photograph and film you, your family and your guests. We use this footage to create your deliverables. As the host, please let your guests know a
                    professional team is covering the event.
                </p>
                <p>
                    <strong>Portfolio and social media:</strong> we will ask for your consent at booking before using any of your photos or videos on our website, Instagram, YouTube or other
                    marketing. You can say no, or say yes to some images only, and you can withdraw consent later. When you withdraw, we remove the images from our website and accounts we
                    control within 7 days, though we can&apos;t recall printed material already distributed.
                </p>
                <p>
                    <strong>Guests</strong> who appear in our portfolio can ask us to remove those images by contacting us, and we will do so.
                </p>
            </>
        ),
    },
    {
        id: "children",
        title: "Children",
        summary: ["For baby shoots and birthdays we act on a parent's or guardian's consent.", "We never publish a child's photo without a parent's explicit consent."],
        body: (
            <p>
                Under the DPDP Act, anyone under 18 is a child. For baby shoots, birthday coverage and other events focused on children, we process children&apos;s photos only with the consent
                of a parent or lawful guardian, and only to deliver the service. We do not use children&apos;s images for portfolio or marketing without the parent&apos;s explicit written
                consent, and we do not track children or target them with advertising.
            </p>
        ),
    },
    {
        id: "sharing",
        title: "Who we share data with",
        summary: ["We never sell your data.", "We use a few trusted services to run the studio, and they may only use your data to help us."],
        body: (
            <>
                <p>We share personal data only with service providers (&quot;Data Processors&quot;) who help us deliver our service, under instructions from us:</p>
                <ul>
                    <li>
                        <strong>Meta (WhatsApp)</strong>: messaging with you
                    </li>
                    <li>
                        <strong>Google</strong>: email, cloud storage for delivery, and website analytics (only with your consent)
                    </li>
                    <li>
                        <strong>Our website hosting provider</strong>: to run this website and receive enquiries
                    </li>
                    <li>
                        <strong>Our album printing lab</strong>: the photos you select for your album, to print it
                    </li>
                    <li>
                        <strong>Banks and UPI providers</strong>: to receive your payments
                    </li>
                </ul>
                <p>
                    Some of these providers store data on servers outside India. We use only providers with appropriate safeguards, and we will follow any restrictions the Government of India
                    places on transfers to particular countries. We may also disclose data if the law requires it.
                </p>
            </>
        ),
    },
    {
        id: "security",
        title: "How we protect your data",
        summary: ["Raw footage stays with us and is deleted on schedule.", "If a breach ever affects your data, we'll tell you and the authorities."],
        body: (
            <p>
                We take reasonable security safeguards to protect your data: access to event footage is limited to our team, delivery links are shared only with you, and data is
                deleted when the retention period ends. If a personal data breach happens, we will inform affected people and the Data Protection Board of India as the DPDP Act requires.
            </p>
        ),
    },
    {
        id: "your-rights",
        title: "Your rights",
        summary: ["Ask what we hold, correct it, delete it, or complain. We'll reply within " + g.responseDays + " days."],
        body: (
            <>
                <p>Under the DPDP Act you have the right to:</p>
                <ul>
                    <li>
                        <strong>Access</strong>: get a summary of the personal data we hold about you and how we use it, and who we&apos;ve shared it with
                    </li>
                    <li>
                        <strong>Correction and completion</strong>: fix anything wrong or incomplete
                    </li>
                    <li>
                        <strong>Erasure</strong>: ask us to delete your data, unless the law requires us to keep it
                    </li>
                    <li>
                        <strong>Withdraw consent</strong>: at any time (see above)
                    </li>
                    <li>
                        <strong>Nominate</strong> someone to use these rights for you in case of death or incapacity
                    </li>
                    <li>
                        <strong>Grievance redressal</strong>: complain to us, and if you&apos;re not satisfied, to the Data Protection Board of India
                    </li>
                </ul>
                <p>Use the buttons at the end of this page, or contact our Grievance Officer below. We may ask you to confirm your identity before acting on a request.</p>
            </>
        ),
    },
    {
        id: "cookies",
        title: "Cookies",
        summary: ["Analytics cookies only load if you click Accept."],
        body: (
            <p>
                We use essential storage to remember your theme and saved quote, and Google Analytics cookies only if you accept them. See our <Link href="/cookie-policy">Cookie Policy</Link>{" "}
                for the full list. You can change your choice any time from &quot;Cookie settings&quot; at the bottom of every page.
            </p>
        ),
    },
    {
        id: "grievance",
        title: "Grievance Officer and contact",
        summary: [`Write to us and we'll respond within ${g.responseDays} days.`],
        body: (
            <>
                <div className="rounded-xl border border-border bg-card p-5 text-foreground">
                    <p className="font-semibold">{g.title}</p>
                    <p className="mt-1 text-foreground-muted">{fullAddress}</p>
                    <p className="mt-1">
                        Email: <a href={`mailto:${g.email}`}>{g.email}</a>
                    </p>
                    <p>
                        Phone / WhatsApp: <a href={`tel:${g.phone.replace(/\s/g, "")}`}>{g.phone}</a>
                    </p>
                </div>
                <p>
                    We acknowledge grievances within 48 hours and aim to resolve them within {g.responseDays} days. If you&apos;re not satisfied with our response, you can complain to the
                    Data Protection Board of India.
                </p>
            </>
        ),
    },
    {
        id: "changes",
        title: "Changes to this policy",
        body: (
            <p>
                If we change this policy, we&apos;ll update the date at the top. If a change affects how we use data you&apos;ve already given us, we&apos;ll tell you and ask for consent
                where required.
            </p>
        ),
    },
];

const sectionsHi: LegalSection[] = [
    {
        id: "who-we-are",
        title: "हम कौन हैं",
        summary: [`आपका डेटा कैसे इस्तेमाल होगा, यह ${business.name} तय करता है, इसलिए इसकी ज़िम्मेदारी हमारी है।`],
        body: (
            <>
                <p>
                    {business.legalName}, जो <strong>{business.name}</strong> (&quot;हम&quot;) नाम से काम करता है, {fullAddress} पर स्थित एक फोटोग्राफी और वीडियोग्राफी स्टूडियो है।
                    डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (&quot;DPDP अधिनियम&quot;) के तहत, इस पॉलिसी में बताए गए व्यक्तिगत डेटा के लिए हम <strong>डेटा फ़िड्यूशरी</strong> हैं।
                </p>
                <p>यह पॉलिसी हमारी वेबसाइट (sindhustudio.com), हमसे WhatsApp, फ़ोन और ईमेल पर होने वाली बातचीत, और हमारी फोटोग्राफी व वीडियो सेवाओं पर लागू होती है।</p>
            </>
        ),
    },
    {
        id: "data-we-collect",
        title: "हम क्या लेते हैं और क्यों",
        summary: ["हम सिर्फ़ वही लेते हैं जो आपके कार्यक्रम की योजना, शूटिंग और डिलीवरी के लिए ज़रूरी है।", "हर मकसद नीचे लिखा है, और यह भी कि डेटा कितने समय तक रखा जाता है।"],
        body: (
            <>
                <LegalTable
                    head={["डेटा", "हमें क्यों चाहिए", "कितने समय तक रखते हैं"]}
                    rows={[
                        [
                            <>
                                <strong>पूछताछ की जानकारी</strong>: नाम, फ़ोन/WhatsApp, ईमेल, कार्यक्रम की तारीख, फंक्शन, आपका कोटेशन
                            </>,
                            "आपके सवाल का जवाब देने, उपलब्धता चेक करने और कोटेशन भेजने के लिए",
                            "अगर आप बुक नहीं करते, तो आख़िरी मैसेज के 12 महीने बाद तक",
                        ],
                        [
                            <>
                                <strong>बुकिंग की जानकारी</strong>: नाम, पता, फ़ोन, वेन्यू और कार्यक्रम का समय, भुगतान के रिकॉर्ड
                            </>,
                            "सेवा देने, बिल बनाने और टैक्स कानूनों का पालन करने के लिए",
                            "बुकिंग के दौरान, फिर बिल और भुगतान रिकॉर्ड उतने समय तक जितना टैक्स और अकाउंटिंग कानून मांगते हैं (अभी 8 साल तक)",
                        ],
                        [
                            <>
                                आपकी, आपके परिवार और मेहमानों की <strong>फोटो और वीडियो</strong>
                            </>,
                            "आपकी फोटो, वीडियो और एल्बम बनाने, एडिट करने और देने के लिए",
                            "डिलीवरी तक। बैकअप वाले पैकेज में डिलीवरी के बाद 6 महीने तक कॉपी रहती है। फिर डिलीट, सिवाय उन फोटो के जिन्हें आप पोर्टफोलियो में रखने की अनुमति दें",
                        ],
                        [
                            <>
                                <strong>वेबसाइट का इस्तेमाल</strong>: देखे गए पेज, डिवाइस का प्रकार, अनुमानित जगह (सिर्फ़ अगर आप एनालिटिक्स कुकी स्वीकार करें)
                            </>,
                            "यह समझने के लिए कि कौन-से पेज परिवारों की मदद करते हैं, और साइट बेहतर करने के लिए",
                            "Google Analytics में 14 महीने तक",
                        ],
                    ]}
                />
                <p>
                    हम इस वेबसाइट से आधार नंबर, बैंक खाते या कार्ड की जानकारी <strong>नहीं</strong> लेते। अगर भविष्य में आप ऑनलाइन भुगतान करते हैं, तो भुगतान की जानकारी सीधे पेमेंट
                    प्रोवाइडर संभालता है, हम नहीं।
                </p>
            </>
        ),
    },
    {
        id: "consent",
        title: "सहमति और उसे वापस कैसे लें",
        summary: ["आप क्या शेयर करते हैं, यह आप तय करते हैं। आप कभी भी अपना फ़ैसला बदल सकते हैं, उतनी ही आसानी से जितनी आसानी से आपने हां कहा था।"],
        body: (
            <>
                <p>
                    हम आपका व्यक्तिगत डेटा आपकी <strong>सहमति</strong> के आधार पर इस्तेमाल करते हैं (जैसे जब आप हमें पूछताछ भेजते हैं, एनालिटिक्स कुकी स्वीकार करते हैं, या पोर्टफोलियो
                    में इस्तेमाल की अनुमति देते हैं), या DPDP अधिनियम में अनुमत किसी <strong>वैध उपयोग</strong> के लिए, जैसे कोटेशन लेने या बुकिंग पूरी करने के लिए आपके द्वारा अपनी मर्ज़ी से
                    दिया गया डेटा।
                </p>
                <p>
                    आप कभी भी सहमति वापस ले सकते हैं: हमें WhatsApp करके, {business.email} पर ईमेल करके, या (कुकी के लिए) हर पेज के नीचे &quot;Cookie settings&quot; लिंक से। सहमति वापस लेने
                    से पहले किए गए काम पर असर नहीं पड़ता, और कानून जो रिकॉर्ड रखने को कहता है (जैसे बिल), वो हम फिर भी रख सकते हैं।
                </p>
            </>
        ),
    },
    {
        id: "photos",
        title: "आपकी और आपके मेहमानों की फोटो",
        summary: ["हम आपकी फोटो अपने पोर्टफोलियो या सोशल मीडिया पर सिर्फ़ आपकी सहमति से दिखाते हैं।", "मेहमान हमारे पोर्टफोलियो से अपनी फोटो हटवाने को कह सकते हैं।"],
        body: (
            <>
                <p>
                    आपके कार्यक्रम में हम आपकी, आपके परिवार और मेहमानों की फोटो और वीडियो लेते हैं। इनसे हम आपकी डिलीवरी तैयार करते हैं। मेज़बान होने के नाते, कृपया अपने मेहमानों को बता दें कि
                    एक प्रोफ़ेशनल टीम कार्यक्रम कवर कर रही है।
                </p>
                <p>
                    <strong>पोर्टफोलियो और सोशल मीडिया:</strong> आपकी कोई भी फोटो या वीडियो अपनी वेबसाइट, इंस्टाग्राम, YouTube या किसी और प्रचार में इस्तेमाल करने से पहले हम बुकिंग के समय
                    आपकी सहमति मांगेंगे। आप मना कर सकते हैं, या सिर्फ़ कुछ फोटो के लिए हां कह सकते हैं, और बाद में सहमति वापस भी ले सकते हैं। सहमति वापस लेने पर हम 7 दिन के अंदर फोटो अपनी
                    वेबसाइट और अपने अकाउंट्स से हटा देते हैं, पर पहले से बंट चुकी छपी सामग्री वापस नहीं ला सकते।
                </p>
                <p>
                    हमारे पोर्टफोलियो में दिखने वाले <strong>मेहमान</strong> हमसे संपर्क करके अपनी फोटो हटवा सकते हैं, और हम हटा देंगे।
                </p>
            </>
        ),
    },
    {
        id: "children",
        title: "बच्चे",
        summary: ["बेबी शूट और जन्मदिन के लिए हम माता-पिता या अभिभावक की सहमति पर काम करते हैं।", "माता-पिता की स्पष्ट सहमति के बिना हम किसी बच्चे की फोटो कभी प्रकाशित नहीं करते।"],
        body: (
            <p>
                DPDP अधिनियम के तहत 18 साल से कम उम्र का हर व्यक्ति बच्चा है। बेबी शूट, जन्मदिन कवरेज और बच्चों पर केंद्रित दूसरे कार्यक्रमों में हम बच्चों की फोटो सिर्फ़ माता-पिता या
                कानूनी अभिभावक की सहमति से, और सिर्फ़ सेवा देने के लिए इस्तेमाल करते हैं। माता-पिता की स्पष्ट लिखित सहमति के बिना हम बच्चों की फोटो पोर्टफोलियो या प्रचार में इस्तेमाल
                नहीं करते, और न ही बच्चों को ट्रैक करते हैं या उन्हें विज्ञापन दिखाते हैं।
            </p>
        ),
    },
    {
        id: "sharing",
        title: "हम डेटा किसके साथ शेयर करते हैं",
        summary: ["हम आपका डेटा कभी नहीं बेचते।", "स्टूडियो चलाने के लिए हम कुछ भरोसेमंद सेवाएं इस्तेमाल करते हैं, और वो आपका डेटा सिर्फ़ हमारी मदद के लिए इस्तेमाल कर सकती हैं।"],
        body: (
            <>
                <p>हम व्यक्तिगत डेटा सिर्फ़ उन सर्विस प्रोवाइडर (&quot;डेटा प्रोसेसर&quot;) के साथ शेयर करते हैं जो हमारी सेवा देने में मदद करते हैं, हमारे निर्देशों पर:</p>
                <ul>
                    <li>
                        <strong>Meta (WhatsApp)</strong>: आपसे बातचीत के लिए
                    </li>
                    <li>
                        <strong>Google</strong>: ईमेल, डिलीवरी के लिए क्लाउड स्टोरेज, और वेबसाइट एनालिटिक्स (सिर्फ़ आपकी सहमति से)
                    </li>
                    <li>
                        <strong>हमारी वेबसाइट होस्टिंग सेवा</strong>: यह वेबसाइट चलाने और पूछताछ पाने के लिए
                    </li>
                    <li>
                        <strong>हमारी एल्बम प्रिंटिंग लैब</strong>: आपके एल्बम के लिए चुनी गई फोटो, उसे प्रिंट करने के लिए
                    </li>
                    <li>
                        <strong>बैंक और UPI प्रोवाइडर</strong>: आपका भुगतान पाने के लिए
                    </li>
                </ul>
                <p>
                    इनमें से कुछ प्रोवाइडर डेटा भारत के बाहर के सर्वर पर रखते हैं। हम सिर्फ़ उचित सुरक्षा उपायों वाले प्रोवाइडर इस्तेमाल करते हैं, और भारत सरकार किसी देश में डेटा भेजने पर जो
                    भी पाबंदी लगाए, उसका पालन करेंगे। कानून की मांग पर हम डेटा का खुलासा भी कर सकते हैं।
                </p>
            </>
        ),
    },
    {
        id: "security",
        title: "हम आपके डेटा की सुरक्षा कैसे करते हैं",
        summary: ["कच्ची फ़ुटेज हमारे पास रहती है और तय समय पर डिलीट होती है।", "अगर कभी डेटा लीक से आपका डेटा प्रभावित हो, तो हम आपको और अधिकारियों को बताएंगे।"],
        body: (
            <p>
                आपके डेटा की सुरक्षा के लिए हम उचित उपाय करते हैं: कार्यक्रम की फ़ुटेज तक पहुंच सिर्फ़ हमारी टीम तक सीमित है, डिलीवरी लिंक सिर्फ़ आपके साथ शेयर होते हैं, और रखने की
                अवधि ख़त्म होने पर डेटा डिलीट कर दिया जाता है। अगर व्यक्तिगत डेटा लीक होता है, तो DPDP अधिनियम के अनुसार हम प्रभावित लोगों और भारत के डेटा संरक्षण बोर्ड को सूचित करेंगे।
            </p>
        ),
    },
    {
        id: "your-rights",
        title: "आपके अधिकार",
        summary: [`पूछें कि हमारे पास क्या है, उसे सुधरवाएं, डिलीट करवाएं या शिकायत करें। हम ${g.responseDays} दिन के अंदर जवाब देंगे।`],
        body: (
            <>
                <p>DPDP अधिनियम के तहत आपको ये अधिकार हैं:</p>
                <ul>
                    <li>
                        <strong>जानकारी पाना</strong>: हमारे पास आपका कौन-सा व्यक्तिगत डेटा है, हम उसे कैसे इस्तेमाल करते हैं, और किसके साथ शेयर किया है, इसका सारांश
                    </li>
                    <li>
                        <strong>सुधार और पूरा करना</strong>: कोई भी गलत या अधूरी जानकारी ठीक करवाना
                    </li>
                    <li>
                        <strong>मिटाना</strong>: अपना डेटा डिलीट करवाना, जब तक कानून उसे रखने को न कहे
                    </li>
                    <li>
                        <strong>सहमति वापस लेना</strong>: कभी भी (ऊपर देखें)
                    </li>
                    <li>
                        <strong>नामांकन</strong>: मृत्यु या अक्षमता की स्थिति में आपकी ओर से ये अधिकार इस्तेमाल करने के लिए किसी को नामित करना
                    </li>
                    <li>
                        <strong>शिकायत निवारण</strong>: हमसे शिकायत करना, और संतुष्ट न होने पर भारत के डेटा संरक्षण बोर्ड से
                    </li>
                </ul>
                <p>इस पेज के आख़िर में दिए बटन इस्तेमाल करें, या नीचे हमारे शिकायत अधिकारी से संपर्क करें। किसी अनुरोध पर काम करने से पहले हम आपकी पहचान की पुष्टि मांग सकते हैं।</p>
            </>
        ),
    },
    {
        id: "cookies",
        title: "कुकी",
        summary: ["एनालिटिक्स कुकी सिर्फ़ तब लोड होती हैं जब आप Accept दबाते हैं।"],
        body: (
            <p>
                हम आपकी थीम और सेव किया कोटेशन याद रखने के लिए ज़रूरी स्टोरेज इस्तेमाल करते हैं, और Google Analytics कुकी सिर्फ़ आपकी सहमति से। पूरी लिस्ट हमारी{" "}
                <Link href="/hi/cookie-policy">कुकी पॉलिसी</Link> में है। आप हर पेज के नीचे &quot;Cookie settings&quot; से कभी भी अपनी पसंद बदल सकते हैं।
            </p>
        ),
    },
    {
        id: "grievance",
        title: "शिकायत अधिकारी और संपर्क",
        summary: [`हमें लिखें, हम ${g.responseDays} दिन के अंदर जवाब देंगे।`],
        body: (
            <>
                <div className="rounded-xl border border-border bg-card p-5 text-foreground">
                    <p className="font-semibold">शिकायत अधिकारी, {business.name}</p>
                    <p className="mt-1 text-foreground-muted">{fullAddress}</p>
                    <p className="mt-1">
                        ईमेल: <a href={`mailto:${g.email}`}>{g.email}</a>
                    </p>
                    <p>
                        फ़ोन / WhatsApp: <a href={`tel:${g.phone.replace(/\s/g, "")}`}>{g.phone}</a>
                    </p>
                </div>
                <p>
                    हम 48 घंटे के अंदर शिकायत मिलने की पुष्टि करते हैं और {g.responseDays} दिन के अंदर उसे सुलझाने की कोशिश करते हैं। अगर आप हमारे जवाब से संतुष्ट नहीं हैं, तो आप भारत के डेटा
                    संरक्षण बोर्ड से शिकायत कर सकते हैं।
                </p>
            </>
        ),
    },
    {
        id: "changes",
        title: "इस पॉलिसी में बदलाव",
        body: (
            <p>
                अगर हम यह पॉलिसी बदलते हैं, तो ऊपर की तारीख अपडेट करेंगे। अगर किसी बदलाव से आपके पहले दिए गए डेटा के इस्तेमाल पर असर पड़ता है, तो हम आपको बताएंगे और जहां ज़रूरी हो,
                सहमति मांगेंगे।
            </p>
        ),
    },
];

const selfService = {
    en: {
        title: "Use your rights in one tap",
        intro: "Each button opens a pre-written WhatsApp message to us. Add your name and send.",
        actions: [
            { icon: ImageOff, label: "Remove my photos from your portfolio", msg: "Namaste, I'd like my photos removed from Sindhu Studio's portfolio and social media. My name / event date: " },
            { icon: Trash2, label: "Delete my enquiry data", msg: "Namaste, under the DPDP Act please delete the personal data you hold from my enquiry. My name / phone: " },
            { icon: Mail, label: "Tell me what data you hold", msg: "Namaste, under the DPDP Act I'd like a summary of the personal data you hold about me. My name / phone: " },
        ],
    },
    hi: {
        title: "एक टैप में अपने अधिकार इस्तेमाल करें",
        intro: "हर बटन हमें एक पहले से लिखा WhatsApp मैसेज खोलता है। अपना नाम जोड़ें और भेजें।",
        actions: [
            { icon: ImageOff, label: "मेरी फोटो अपने पोर्टफोलियो से हटाएं", msg: "नमस्ते, मैं चाहता/चाहती हूं कि मेरी फोटो Sindhu Studio के पोर्टफोलियो और सोशल मीडिया से हटा दी जाएं। मेरा नाम / कार्यक्रम की तारीख: " },
            { icon: Trash2, label: "मेरी पूछताछ का डेटा डिलीट करें", msg: "नमस्ते, DPDP अधिनियम के तहत कृपया मेरी पूछताछ से आपके पास जो व्यक्तिगत डेटा है, उसे डिलीट कर दें। मेरा नाम / फ़ोन: " },
            { icon: Mail, label: "बताएं कि मेरा कौन-सा डेटा आपके पास है", msg: "नमस्ते, DPDP अधिनियम के तहत मुझे आपके पास मौजूद मेरे व्यक्तिगत डेटा का सारांश चाहिए। मेरा नाम / फ़ोन: " },
        ],
    },
};

function SelfService({ locale }: { locale: Locale }) {
    const c = selfService[locale];
    return (
        <section aria-labelledby="self-service" className="mt-16 rounded-3xl border border-border bg-card p-6 md:p-8 print:hidden">
            <h2 id="self-service" className="font-display text-2xl">
                {c.title}
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">{c.intro}</p>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {c.actions.map((a) => (
                    <li key={a.label}>
                        <a
                            href={whatsappLink(a.msg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-full min-h-20 items-start gap-3 rounded-2xl border border-border p-4 text-sm transition-colors hover:border-accent"
                        >
                            <a.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                            <span className="flex-1">{a.label}</span>
                            <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export function PrivacyPolicy({ locale = "en" }: { locale?: Locale }) {
    if (locale === "hi") {
        return (
            <LegalPage
                locale="hi"
                title={privacyMeta.hi.title}
                path="/privacy"
                updated="20 अक्टूबर 2026"
                intro={<p>आपकी शादी निजी है। यहां साफ़ लिखा है कि हम आपकी जानकारी, आपकी फोटो और आपके मेहमानों की फोटो के साथ क्या करते हैं, और आप इसे कैसे नियंत्रित कर सकते हैं।</p>}
                inShort={[
                    "हम सिर्फ़ वही लेते हैं जो कोटेशन देने, शूट करने और डिलीवरी के लिए ज़रूरी है।",
                    "हम आपका डेटा कभी नहीं बेचते, और आपकी अनुमति के बिना आपकी फोटो कभी पोस्ट नहीं करते।",
                    "डिलीवरी के बाद कच्ची फ़ुटेज तय समय पर डिलीट कर दी जाती है।",
                    `आप कभी भी अपना डेटा देख, सुधरवा या डिलीट करवा सकते हैं। हम ${g.responseDays} दिन के अंदर जवाब देते हैं।`,
                ]}
                sections={sectionsHi}
                related={[
                    { label: "नियम और शर्तें", href: "/hi/terms" },
                    { label: "कैंसिलेशन और रिफ़ंड", href: "/hi/cancellation-policy" },
                    { label: "कुकी पॉलिसी", href: "/hi/cookie-policy" },
                ]}
                after={<SelfService locale="hi" />}
            />
        );
    }
    return (
        <LegalPage
            title={privacyMeta.en.title}
            path="/privacy"
            updated="20 October 2026"
            intro={<p>Your wedding is personal. Here&apos;s exactly what we do with your details, your photos and your guests&apos; photos, and how to control it.</p>}
            inShort={[
                "We collect only what we need to quote, shoot and deliver your event.",
                "We never sell your data and never post your photos without your permission.",
                "Raw footage is deleted on a fixed schedule after delivery.",
                `You can see, correct or delete your data any time. We reply within ${g.responseDays} days.`,
            ]}
            sections={sectionsEn}
            related={[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Cancellation & Refunds", href: "/cancellation-policy" },
                { label: "Cookie Policy", href: "/cookie-policy" },
            ]}
            after={<SelfService locale="en" />}
        />
    );
}
