import { business, deliveryTimeline, paymentTerms } from "./business";
import { packages, lowestPrice, highestPrice } from "./packages";
import { getAddOn, addOnPrice } from "./addons";

export interface FAQItem {
    question: string;
    answer: string;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const tiers = packages.map((p) => `${p.name} (${inr(p.price)})`).join(", ");
const schedule = paymentTerms.schedule.map((s) => `${s.percent}% ${s.when}`).join(", ");

export const generalFaqs: FAQItem[] = [
    {
        question: "How much does wedding photography cost at Sindhu Studio?",
        answer: `Our wedding packages cost ${inr(lowestPrice)} to ${inr(highestPrice)}: ${tiers}. Every package includes full HD photos and video, a highlights video, a 14×40 leather-cover album, two 43-inch LED screens at the venue and a 64 GB pendrive. You can add extras like drone (${inr(addOnPrice(getAddOn("drone")))}) or candid photography per day.`,
    },
    {
        question: "How far in advance should we book?",
        answer: "Book 3–6 months ahead for weddings in peak season (October to February), as popular muhurat dates fill up first. For pre-wedding shoots and smaller functions, 3–4 weeks is usually enough. Message us on WhatsApp to check your date.",
    },
    {
        question: "What is your payment policy?",
        answer: `${schedule}. We accept ${paymentTerms.methods.join(", ")}. ${paymentTerms.gstNote}`,
    },
    {
        question: "When will we receive our photos and videos?",
        answer: deliveryTimeline.map((d) => `${d.item}: ${d.time}`).join(". ") + ".",
    },
    {
        question: "Do you travel outside Rohtak?",
        answer: `Yes. We regularly cover weddings across ${business.areaServed.join(", ")}, and travel further for destination weddings. For events outside Rohtak, travel and stay for the team are added to the package price. We'll tell you the exact amount before you book.`,
    },
    {
        question: "Can we customise a package?",
        answer: "Yes. Start with any package and add what you need, such as an extra day of candid photography, a drone, a second LED wall or a live stream. Our online quote builder shows the exact total as you go, and you can send it to us or share it with your family on WhatsApp.",
    },
];

export const packageFaqs: FAQItem[] = [
    {
        question: "What does \"Full HD photos (RAW data)\" mean?",
        // VERIFY with the owner: original camera files vs full-resolution JPEGs.
        answer: "You get every photo we take at your event in full resolution, not just the selected or edited ones, delivered on your pendrive. Album photos are colour-corrected and retouched.",
    },
    {
        question: "Is GST included in the package price?",
        answer: paymentTerms.gstNote,
    },
    {
        question: "What's the difference between candid and traditional photography?",
        answer: "The traditional photographer covers every ritual and every family group photo, so nobody is missed. The candid photographer works quietly to catch natural moments: laughter, tears, glances. Gold to Prime include candid on the wedding day, and Exclusive covers every function. Add extra days, or candid for Silver, from the add-ons.",
    },
    {
        question: "What's the difference between highlights, a teaser and a cinematic film?",
        answer: "A teaser is a 1–2 minute clip made for WhatsApp and Instagram. Highlights is a longer edit of the best moments. A cinematic film is shot and edited like a movie, set to music and built around the couple's story. Every package has highlights, Gold and above add a teaser, and Platinum and above include a cinematic film of the wedding day.",
    },
    {
        question: "Can we use drones at every venue?",
        answer: "Many venues allow drones, but some venues, and areas near airports or restricted zones, need permission or don't allow flying at all. We check this before your wedding. If drone use isn't allowed, we'll tell you in advance and adjust your quote.",
    },
];

const schedulehi = paymentTerms.schedule.map((s, i) => `${s.percent}% ${["तारीख बुक करने के लिए (वापस नहीं होगा)", "कार्यक्रम वाले दिन", "फोटो और वीडियो की फ़ाइनल डिलीवरी से पहले"][i]}`).join(", ");

export const generalFaqsHi: FAQItem[] = [
    {
        question: "Sindhu Studio में शादी फोटोग्राफी का कितना खर्च आता है?",
        answer: `हमारे शादी पैकेज ${inr(lowestPrice)} से ${inr(highestPrice)} तक हैं: ${tiers}। हर पैकेज में फुल HD फोटो और वीडियो, हाइलाइट्स वीडियो, 14×40 लेदर कवर एल्बम, वेन्यू पर दो 43 इंच LED स्क्रीन और 64 GB पेनड्राइव शामिल है। ड्रोन (${inr(addOnPrice(getAddOn("drone")))}) या हर दिन के हिसाब से कैंडिड फोटोग्राफी जैसी चीज़ें अलग से जोड़ सकते हैं।`,
    },
    {
        question: "कितने दिन पहले बुकिंग करनी चाहिए?",
        answer: "शादी के सीज़न (अक्टूबर से फ़रवरी) में 3–6 महीने पहले बुक करें, क्योंकि बड़े मुहूर्त की तारीखें सबसे पहले भरती हैं। प्री-वेडिंग शूट और छोटे कार्यक्रमों के लिए 3–4 हफ़्ते काफ़ी हैं। अपनी तारीख चेक करने के लिए WhatsApp करें।",
    },
    { question: "पेमेंट कैसे करना होता है?", answer: `${schedulehi}। हम UPI, बैंक ट्रांसफ़र, कैश और कार्ड लेते हैं। GST लागू होने पर आपके बिल में दिखाया जाता है।` },
    {
        question: "फोटो और वीडियो कब मिलेंगे?",
        answer: "टीज़र और हाइलाइट्स: कार्यक्रम के 1–2 हफ़्ते बाद। पूरी फोटो गैलरी (चुनने के लिए): 4–6 हफ़्ते बाद। सिनेमैटिक फ़िल्म और एल्बम: आपकी फोटो और गानों की पसंद के 8–12 हफ़्ते बाद।",
    },
    {
        question: "क्या आप रोहतक से बाहर भी आते हैं?",
        answer: `हां। हम ${business.areaServed.join(", ")} में नियमित रूप से शादियां कवर करते हैं, और डेस्टिनेशन वेडिंग के लिए और दूर भी जाते हैं। रोहतक से बाहर टीम के आने-जाने और रुकने का खर्च पैकेज में जुड़ता है, जो बुकिंग से पहले बता दिया जाता है।`,
    },
    {
        question: "क्या पैकेज में बदलाव कर सकते हैं?",
        answer: "हां। कोई भी पैकेज चुनें और जो चाहिए वो जोड़ें: कैंडिड का एक और दिन, ड्रोन, दूसरी LED वॉल या लाइव स्ट्रीम। हमारा ऑनलाइन कोटेशन बिल्डर साथ-साथ सही कुल दिखाता है, और आप उसे हमें या परिवार के WhatsApp ग्रुप में भेज सकते हैं।",
    },
];

export const packageFaqsHi: FAQItem[] = [
    { question: "\"फुल HD फोटो (RAW डेटा)\" का मतलब क्या है?", answer: "आपके कार्यक्रम की हर फोटो फुल रेज़ोल्यूशन में, सिर्फ़ चुनी हुई या एडिट की हुई नहीं, पेनड्राइव में मिलती है। एल्बम की फोटो कलर-करेक्ट और रीटच की जाती हैं।" },
    { question: "क्या पैकेज के दाम में GST शामिल है?", answer: "दाम भारतीय रुपये में हैं। GST लागू होने पर आपके बिल में दिखाया जाता है।" },
    { question: "कैंडिड और पारंपरिक फोटोग्राफी में क्या फ़र्क है?", answer: "पारंपरिक फोटोग्राफर हर रस्म और हर फैमिली फोटो कवर करता है, ताकि कोई छूटे नहीं। कैंडिड फोटोग्राफर चुपचाप असली पल कैद करता है: हंसी, आंसू, नज़रें। Gold से Prime तक शादी के दिन कैंडिड शामिल है, और Exclusive में हर कार्यक्रम में। और दिन, या Silver के साथ कैंडिड, ऐड-ऑन से जोड़ें।" },
    { question: "हाइलाइट्स, टीज़र और सिनेमैटिक फ़िल्म में क्या फ़र्क है?", answer: "टीज़र 1–2 मिनट का क्लिप है, WhatsApp और इंस्टाग्राम के लिए। हाइलाइट्स सबसे अच्छे पलों का लंबा एडिट है। सिनेमैटिक फ़िल्म फ़िल्म की तरह शूट और एडिट होती है, गानों के साथ, कपल की कहानी पर बनी। हर पैकेज में हाइलाइट्स है, Gold से टीज़र जुड़ता है, और Platinum से शादी के दिन की सिनेमैटिक फ़िल्म।" },
    { question: "क्या हर वेन्यू पर ड्रोन उड़ सकता है?", answer: "कई वेन्यू पर ड्रोन उड़ सकता है, लेकिन कुछ वेन्यू और एयरपोर्ट या प्रतिबंधित इलाकों के पास अनुमति चाहिए या उड़ान मना है। हम शादी से पहले यह चेक करते हैं। अगर अनुमति नहीं मिली तो पहले बता देंगे और कोटेशन बदल देंगे।" },
];
