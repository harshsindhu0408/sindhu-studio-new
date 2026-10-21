import type { AddOnId } from "./addons";
import type { MediaCategory } from "./media";
import type { PackageId } from "./packages";

export interface Service {
    slug: string;
    name: string;
    nameHi: string;
    /** Primary search phrase this page is written for */
    keyword: string;
    tagline: string;
    /** 40–60 word self-contained summary, written to be quoted by search and AI engines */
    answer: string;
    image: { media?: string; src?: string; alt: string };
    galleryCategory?: MediaCategory;
    addOn?: AddOnId;
    /** Packages that include it (shown with prices) */
    includedIn?: PackageId[];
    whatYouGet: string[];
    howWeShoot: { title: string; body: string }[];
    faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
    {
        slug: "wedding-photography",
        name: "Wedding Photography",
        nameHi: "शादी फोटोग्राफी",
        keyword: "wedding photographer in Rohtak",
        tagline: "Every ritual, every relative, every glance, from baraat to vidaai.",
        answer:
            "Sindhu Studio is a wedding photography studio in Rohtak, Haryana, working since 2000. Wedding packages cost ₹49,999 to ₹1,99,999 and include full HD photos and video, a printed 14×40 album and LED screens at the venue. Candid photography, cinematic films and drone are included from Gold, Platinum and above.",
        image: { media: "varmala-stage-sparklers-fog", alt: "Varmala on a decorated stage with sparklers at a Haryana wedding" },
        galleryCategory: "ceremonies",
        includedIn: ["silver", "gold", "platinum", "diamond", "prime", "exclusive"],
        whatYouGet: [
            "Traditional photographer and videographer for every ritual and family group",
            "Full HD photos of the whole event and a master + edited video",
            "Highlights video, and a teaser from Gold upwards",
            "Printed 14×40 album with leather cover and a framed wedding photo",
            "Two 43\" LED screens at the venue showing the live feed",
        ],
        howWeShoot: [
            { title: "Before the day", body: "We go through your functions, timings and family list with you, so the team knows who matters and where to stand for the pheras." },
            { title: "On the day", body: "The traditional team makes sure no ritual or relative is missed, while candid and cinematic teams (if included) work quietly around them." },
            { title: "After the day", body: "Teaser and highlights in 1–2 weeks, the full gallery in 4–6 weeks, then your album and film once you've picked your photos and songs." },
        ],
        faqs: [
            { question: "How many photographers come to a wedding?", answer: "Every package has a traditional photography and video team. Diamond adds extra cameramen, and Prime and Exclusive add two more, so more moments and more angles are covered." },
            { question: "Do you cover both the bride's and groom's side?", answer: "We cover the functions in your booking. If both families have events at different venues on the same day, tell us when you book and we'll plan an extra team." },
        ],
    },
    {
        slug: "candid-wedding-photography",
        name: "Candid Wedding Photography",
        nameHi: "कैंडिड वेडिंग फोटोग्राफी",
        keyword: "candid wedding photographer Rohtak",
        tagline: "The laughs, tears and glances nobody posed for.",
        answer:
            "Candid wedding photography captures natural, unposed moments while the traditional photographer covers rituals and family groups. At Sindhu Studio in Rohtak, candid photography on the wedding day is included in the Gold, Platinum, Diamond and Prime packages, at every function in Exclusive, and costs ₹11,999 per extra day.",
        image: { media: "bride-candid-smile-over-shoulder", alt: "Candid photo of a bride smiling over her shoulder" },
        galleryCategory: "bridal",
        addOn: "candid",
        includedIn: ["gold", "platinum", "diamond", "prime", "exclusive"],
        whatYouGet: [
            "A dedicated candid photographer, separate from the traditional team",
            "Natural moments of the couple, parents and guests",
            "Colour-graded candid photos delivered with your full gallery",
            "The best candids designed into your album",
        ],
        howWeShoot: [
            { title: "Long lenses, no interruptions", body: "The candid photographer stays at a distance with telephoto lenses, so people forget the camera and act naturally." },
            { title: "Reading the room", body: "We watch for the moments that matter in Haryanvi weddings: the bride's mother at the vidaai, the groom's friends at the baraat, the elders at the pheras." },
        ],
        faqs: [
            { question: "Is candid photography included in Gold?", answer: "Yes: Gold, Platinum, Diamond and Prime include candid photography on the wedding day. Exclusive includes it at every function. For other days, or with Silver, add it for ₹11,999 per day." },
            { question: "Do we still get traditional photos?", answer: "Yes. Candid is in addition to the traditional photographer, who covers every ritual and every family group." },
        ],
    },
    {
        slug: "cinematic-wedding-films",
        name: "Cinematic Wedding Films",
        nameHi: "सिनेमैटिक शादी फ़िल्म",
        keyword: "cinematic wedding videography Haryana",
        tagline: "Your wedding, cut like a film.",
        answer:
            "A cinematic wedding film is shot on gimbals and prime lenses and edited to music around the couple's story, alongside the full traditional video. Sindhu Studio includes a cinematic film of the wedding day in Platinum, Diamond and Prime, of every function in Exclusive, and offers it for ₹12,499 per day as an add-on.",
        image: { src: "/films/cinematic-poster.webp", alt: "Frame from a Sindhu Studio wedding film" },
        addOn: "cinematic",
        includedIn: ["platinum", "diamond", "prime", "exclusive"],
        whatYouGet: ["A cinematic film edited to music", "Teaser for WhatsApp and Instagram", "Highlights video", "The full traditional video, master and edited copy"],
        howWeShoot: [
            { title: "Story first", body: "We plan the film around your functions: drone over the venue, the baraat, the pheras and the vidaai." },
            { title: "Sound and music", body: "You choose the songs. We cut the film to the music and keep the vows, speeches and laughter you want to hear again." },
        ],
        faqs: [
            { question: "How long is the cinematic film?", answer: "It depends on your functions. Tell us what you'd like and we'll agree the length when you book." },
            { question: "When do we get it?", answer: "8–12 weeks after you approve your song choices." },
        ],
    },
    {
        slug: "pre-wedding-shoot",
        name: "Pre-Wedding Shoot",
        nameHi: "प्री-वेडिंग शूट",
        keyword: "pre wedding shoot Rohtak",
        tagline: "A day for just the two of you, before the rush.",
        answer:
            "A pre-wedding shoot is a photo and video session of the couple before the wedding, at a location they choose. Sindhu Studio's pre-wedding shoot costs ₹24,999, is included in the Exclusive package, and is ready in time to play on the LED screens at your wedding.",
        image: { media: "couple-twirl-outdoor-pre-wedding", alt: "Pre-wedding shoot: groom twirling the bride in a park" },
        galleryCategory: "couples",
        addOn: "pre-wedding",
        includedIn: ["exclusive"],
        whatYouGet: ["Photo and video shoot at your chosen location", "Outfit changes as agreed", "Edited photos and a short film", "Ready to play on your wedding LED screens"],
        howWeShoot: [
            { title: "Pick a place that's you", body: "Parks, heritage spots, farms, cafés, or your own home. We help you choose light and timing." },
            { title: "Relaxed direction", body: "We guide poses gently so you look natural, then let you be yourselves." },
        ],
        faqs: [{ question: "Can the pre-wedding shoot be outside Rohtak?", answer: "Yes. For locations outside Rohtak, travel for the team is added, and we'll tell you the amount upfront." }],
    },
    {
        slug: "haldi-mehendi-photography",
        name: "Haldi & Mehendi Photography",
        nameHi: "हल्दी और मेहंदी फोटोग्राफी",
        keyword: "haldi mehendi photographer",
        tagline: "Colour, laughter and rituals, before the big day.",
        answer:
            "Haldi and mehendi photography covers the colourful pre-wedding functions: the rituals, the dancing and the family. Sindhu Studio covers haldi and mehendi as part of your programme days, with candid and cinematic coverage at every function in the Exclusive package.",
        image: { media: "mehendi-bride-hindi-sign", alt: "Bride with a floral मेहंदी sign at her mehendi function" },
        galleryCategory: "haldi-mehendi",
        whatYouGet: ["Ritual and family coverage", "Detail shots of mehendi and haldi", "Dancing and candid moments", "Edited into your film and album"],
        howWeShoot: [{ title: "Protecting the gear, not the fun", body: "We shoot haldi with weather-sealed kit so nobody has to stop the colour for the camera." }],
        faqs: [{ question: "Are haldi and mehendi included?", answer: "They're covered on your programme days. Tell us your functions in the planner and we'll confirm which package covers them all." }],
    },
    {
        slug: "drone-wedding-photography",
        name: "Drone Wedding Photography",
        nameHi: "शादी में ड्रोन शूट",
        keyword: "drone shoot for wedding price",
        tagline: "Your venue, baraat and pheras from the sky.",
        answer:
            "A wedding drone shoot captures aerial photos and video of the venue, baraat and key moments. Sindhu Studio's drone shoot costs ₹7,999 and is included in the Platinum, Diamond, Prime and Exclusive packages. Flying depends on venue rules and local permissions, which we check before your wedding.",
        image: { src: "/films/drone-poster.webp", alt: "Aerial drone shot of a lit-up wedding venue at night" },
        addOn: "drone",
        includedIn: ["platinum", "diamond", "prime", "exclusive"],
        whatYouGet: ["Aerial video edited into your film", "Aerial photos of the venue", "Baraat and entry shots from above"],
        howWeShoot: [{ title: "Permission first", body: "We check venue rules and restricted zones before the day. If flying isn't allowed, we tell you early and adjust your quote." }],
        faqs: [{ question: "Can drones fly at night?", answer: "Yes, our drone footage includes night shots of lit venues, as long as flying is permitted at the location." }],
    },
    {
        slug: "led-screen-wall-rental",
        name: "LED Screen & LED Wall for Weddings",
        nameHi: "शादी के लिए LED स्क्रीन और LED वॉल",
        keyword: "LED screen for wedding Rohtak",
        tagline: "So the last row sees the pheras.",
        answer:
            "Sindhu Studio provides LED screens at weddings showing the live camera feed. Every package includes two 43-inch LED screens. An 8×12 ft LED wall is included from Platinum (two in Exclusive), or costs ₹9,999 as an add-on. Extra 43-inch screens cost ₹2,999 for one or ₹4,999 for two.",
        image: { src: "/images/addons/led-wall-scene.webp", alt: "Guests watching the varmala live on a large LED wall at a night wedding" },
        addOn: "led-wall",
        includedIn: ["platinum", "diamond", "prime", "exclusive"],
        whatYouGet: ["Live camera feed on screen", "Your pre-wedding film and photos between rituals", "Set-up and operation by our team"],
        howWeShoot: [{ title: "Power and placement", body: "We plan screen positions with your venue so every guest has a view. The venue needs a stable power supply." }],
        faqs: [{ question: "Are LED screens included in every package?", answer: "Yes, two 43-inch screens are included in every package. The large 8×12 ft wall is included from Platinum." }],
    },
    {
        slug: "wedding-live-streaming",
        name: "Wedding Live Streaming",
        nameHi: "शादी की लाइव स्ट्रीमिंग",
        keyword: "wedding live streaming Haryana",
        tagline: "Nani in Canada watches the pheras live.",
        answer:
            "Sindhu Studio live streams weddings on a private YouTube link so family abroad or unable to travel can watch in real time. Live streaming costs ₹9,999 and uses the same professional cameras as your wedding video. The venue needs a working internet connection.",
        image: { src: "/images/addons/live-stream.webp", alt: "Wedding couple shown on a live stream on a laptop and a phone, with messages from family abroad" },
        addOn: "live-stream",
        whatYouGet: ["Private or unlisted YouTube stream", "Professional camera feed, not a phone", "A link you can share on the family WhatsApp group"],
        howWeShoot: [{ title: "Tested before the rituals", body: "We test the connection at the venue before the ceremony starts, so relatives abroad don't miss the pheras." }],
        faqs: [{ question: "Can relatives in Canada or Australia watch?", answer: "Yes. Anyone with the link can watch from anywhere in the world." }],
    },
    {
        slug: "ring-ceremony-photography",
        name: "Ring Ceremony & Roka Photography",
        nameHi: "रिंग सेरेमनी और रोका फोटोग्राफी",
        keyword: "ring ceremony photographer Rohtak",
        tagline: "Your roka or sagai, covered properly.",
        answer:
            "Sindhu Studio covers ring ceremonies, roka and sagai with a dedicated photo and video team for ₹11,999. Ring ceremony coverage is included in the Diamond, Prime (with candid) and Exclusive packages.",
        image: { media: "ring-ceremony-hands-detail", alt: "Groom holding the bride's hand to show her engagement ring" },
        galleryCategory: "couples",
        addOn: "ring-ceremony",
        includedIn: ["diamond", "prime", "exclusive"],
        whatYouGet: ["Photo and video coverage of the ceremony", "Ring exchange and family moments", "Edited photos and video"],
        howWeShoot: [{ title: "The ring moment, from two angles", body: "We position the team so the ring exchange is captured clearly, with the families' reactions in frame." }],
        faqs: [{ question: "Can we book only the ring ceremony?", answer: "Yes, ring ceremony coverage can be booked on its own for ₹11,999." }],
    },
    {
        slug: "bridal-portraits",
        name: "Bridal Portraits",
        nameHi: "दुल्हन के पोर्ट्रेट",
        keyword: "bridal photoshoot Rohtak",
        tagline: "Studio light, venue light, and the quiet moments before the pheras.",
        answer:
            "Bridal portraits are posed and candid photos of the bride in her wedding outfit, shot with studio lighting or natural light at the venue. Sindhu Studio shoots bridal portraits as part of every wedding package, and in our Rohtak studio by appointment.",
        image: { media: "bride-window-light-studio-portrait", alt: "Bridal portrait lit by window-shaped light" },
        galleryCategory: "bridal",
        includedIn: ["silver", "gold", "platinum", "diamond", "prime", "exclusive"],
        whatYouGet: ["Portraits with lehenga, jewellery and kaleere details", "Studio lighting set-ups at the venue", "Retouched portraits in your album"],
        howWeShoot: [{ title: "Light that flatters", body: "We bring lights that recreate window light and spotlight looks, so portraits look rich even in a crowded venue." }],
        faqs: [{ question: "Can we do a bridal shoot at the studio?", answer: "Yes. Call or WhatsApp us to book a time at our studio on Delhi Road, Rohtak." }],
    },
    {
        slug: "kuan-poojan-photography",
        name: "Kuan Poojan Photography",
        nameHi: "कुआं पूजन फोटोग्राफी",
        keyword: "kuan pujan photography",
        tagline: "The ritual most studios forget to cover.",
        answer:
            "Kuan Poojan (also written Kua Pujan or Jalwa Pujan) is the ritual celebrating a new mother and baby. Sindhu Studio covers Kuan Poojan with traditional photo and video for ₹9,999, as a standalone event or with a wedding package.",
        image: { src: "/images/addons/kuan-poojan.webp", alt: "Illustration of a kalash at a well for Kuan Poojan" },
        addOn: "kuan-poojan",
        whatYouGet: ["Traditional photo and video coverage", "Ritual, songs and family moments", "Edited photos and video"],
        howWeShoot: [{ title: "Respecting the ritual", body: "We follow the family's elders and the order of the ceremony, staying out of the way of the women's songs and rituals." }],
        faqs: [{ question: "Is Kuan Poojan covered on its own?", answer: "Yes, it can be booked on its own for ₹9,999." }],
    },
    {
        slug: "baby-and-birthday-photography",
        name: "Baby Shoots & Birthday Coverage",
        nameHi: "बेबी शूट और जन्मदिन कवरेज",
        keyword: "baby photoshoot Rohtak",
        tagline: "Tiny fingers, big milestones, and the party after.",
        answer:
            "Sindhu Studio offers baby milestone photoshoots and birthday party coverage in Rohtak, each for ₹9,999. Baby shoots can be at the studio or at home. Photos of children are never used for our portfolio without a parent's written consent.",
        image: { src: "/images/addons/baby-shoot.webp", alt: "Illustration of baby footprints and a crescent moon" },
        addOn: "baby-shoot",
        whatYouGet: ["Baby milestone portraits, at home or at the studio", "Birthday party photo and video coverage", "Edited photos delivered digitally"],
        howWeShoot: [{ title: "Baby-led sessions", body: "We work around feeding and naps, with soft light and no flash for little ones." }],
        faqs: [{ question: "Do you use photos of our child on social media?", answer: "Only with a parent's explicit written consent. See our privacy policy." }],
    },
];

export function getService(slug: string) {
    return services.find((s) => s.slug === slug);
}
