import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Clock, IndianRupee, Languages, MapPin } from "lucide-react";
import { business, yearsInBusiness } from "@/data/business";
import { getMedia } from "@/data/media";
import { packages } from "@/data/packages";
import { localePath, type Locale } from "@/i18n";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const photos = {
    main: getMedia("bride-smiling-red-lehenga-golden-hour"),
    second: getMedia("varmala-stage-sparklers-fog"),
    third: getMedia("couple-hands-bangles-detail"),
    story: getMedia("bride-with-family-group-photo"),
};

const team = [
    {
        name: "Krishan Sindhu",
        nameHi: "कृष्ण सिंधु",
        role: "Founder & Lead Photographer",
        roleHi: "संस्थापक और मुख्य फोटोग्राफर",
        bio: "Started Sindhu Studio in 2000 and still leads the camera team at weddings.",
        bioHi: "2000 में Sindhu Studio शुरू किया और आज भी शादियों में कैमरा टीम की अगुवाई करते हैं।",
    },
    {
        name: "Pawan Grewal",
        nameHi: "पवन ग्रेवाल",
        role: "Creative Director",
        roleHi: "क्रिएटिव डायरेक्टर",
        bio: "Plans the look of each shoot, from pre-wedding locations to the shot list for the pheras.",
        bioHi: "हर शूट का लुक तय करते हैं, प्री-वेडिंग लोकेशन से लेकर फेरों की शॉट लिस्ट तक।",
    },
    {
        name: "Harsh Sindhu",
        nameHi: "हर्ष सिंधु",
        role: "Post-Production Lead",
        roleHi: "पोस्ट-प्रोडक्शन हेड",
        bio: "Leads editing: colour, albums and films, so every wedding is delivered in one consistent style.",
        bioHi: "एडिटिंग की ज़िम्मेदारी: रंग, एल्बम और फ़िल्में, ताकि हर शादी एक जैसे स्टाइल में डिलीवर हो।",
    },
];

const copy = {
    en: {
        eyebrow: "About us",
        titleA: "A family studio on Delhi Road,",
        titleEm: `since ${business.foundingYear}`,
        intro: `${business.name} has photographed weddings across Haryana for ${yearsInBusiness} years. Same family, same studio in ${business.address.locality}, with today's candid photography, cinematic films, drones and LED walls.`,
        ctaWork: "See our work",
        ctaContact: "Visit the studio",
        stats: [
            { value: `${yearsInBusiness}+`, label: "years of weddings" },
            { value: String(packages.length), label: "packages, priced upfront" },
            { value: String(business.areaServed.length), label: "districts & cities we cover" },
            { value: "24×7", label: "shoots, day or night" },
        ],
        storyEyebrow: "Our story",
        storyTitle: "Where every frame",
        storyEm: "tells a story",
        story: [
            `${business.founder.name} opened ${business.name} in ${business.foundingYear} with one camera and a simple idea: families should get photos they are proud to show, from people they can trust.`,
            "Weddings changed a lot since then. Film rolls became memory cards, video became cinematic films, and drones and LED walls became part of the shaadi. We changed with them, but the way we work stayed the same: we turn up early, we know the rituals, and we treat your family like ours.",
            "Today the studio is a small team that plans, shoots and edits every wedding in-house, from the first meeting to the final album.",
        ],
        signature: "The Sindhu family",
        caption: "A family portrait from one of our weddings",
        promisesEyebrow: "How we work",
        promisesTitle: "Four things we never compromise on",
        promises: [
            { icon: IndianRupee, title: "Prices upfront", body: "Every package and add-on price is on this website, so you can compare before you even call." },
            { icon: Camera, title: "Only our own work", body: "Every photo and film on this site was shot by our team. No stock photos, no borrowed portfolios." },
            { icon: Languages, title: "We know your rituals", body: "From kuan poojan to vidaai, we know Haryana's rituals and where to stand for each one." },
            { icon: Clock, title: "Any time of day or night", body: "Haldi at 7 am or pheras at 3 am, the team stays until the last ritual is done." },
        ],
        journeyEyebrow: "Our journey",
        journeyTitle: "From one camera to a full wedding team",
        milestones: [
            { year: String(business.foundingYear), title: "The studio opens", body: `${business.founder.name} starts ${business.name} in ${business.address.locality} with a single camera.` },
            { year: "2004", title: "Our Rohtak studio opens", body: "We open our own studio in Rohtak, where families still come to see albums and plan their weddings." },
            { year: "Today", title: "Photos, films, drones and LED walls", body: "Candid photography, cinematic films, drone shoots, live streaming and LED walls, all from one team." },
        ],
        teamEyebrow: "The people",
        teamTitle: "Who you'll meet at your wedding",
        visitTitle: "Come and see us",
        visitBody: "See real albums, talk through your dates and get your quote in person.",
        directions: "Get directions",
        contact: "Contact us",
    },
    hi: {
        eyebrow: "हमारे बारे में",
        titleA: "दिल्ली रोड पर एक पारिवारिक स्टूडियो,",
        titleEm: `${business.foundingYear} से`,
        intro: `${business.name} ${yearsInBusiness} सालों से पूरे हरियाणा में शादियों की फोटोग्राफी कर रहा है। वही परिवार, ${business.address.locality} में वही स्टूडियो, और आज की कैंडिड फोटोग्राफी, सिनेमैटिक फ़िल्में, ड्रोन और LED वॉल।`,
        ctaWork: "हमारा काम देखें",
        ctaContact: "स्टूडियो आएं",
        stats: [
            { value: `${yearsInBusiness}+`, label: "साल शादियों का अनुभव" },
            { value: String(packages.length), label: "पैकेज, साफ़ दामों के साथ" },
            { value: String(business.areaServed.length), label: "ज़िले और शहर जहां हम जाते हैं" },
            { value: "24×7", label: "शूट, दिन हो या रात" },
        ],
        storyEyebrow: "हमारी कहानी",
        storyTitle: "हर फ्रेम",
        storyEm: "एक कहानी कहता है",
        story: [
            `${business.founder.name} ने ${business.foundingYear} में एक कैमरे और एक सीधी सोच के साथ ${business.name} शुरू किया: परिवारों को ऐसी फोटो मिलें जिन्हें वो गर्व से दिखाएं, ऐसे लोगों से जिन पर वो भरोसा कर सकें।`,
            "तब से शादियां बहुत बदली हैं। फ़िल्म रोल की जगह मेमोरी कार्ड आए, वीडियो सिनेमैटिक फ़िल्म बन गई, और ड्रोन व LED वॉल शादी का हिस्सा बन गए। हम भी साथ बदले, पर काम करने का तरीका वही रहा: समय से पहले पहुंचना, हर रस्म की समझ, और आपके परिवार को अपना परिवार मानना।",
            "आज स्टूडियो एक छोटी टीम है जो हर शादी की प्लानिंग, शूटिंग और एडिटिंग खुद करती है, पहली मुलाकात से आख़िरी एल्बम तक।",
        ],
        signature: "सिंधु परिवार",
        caption: "हमारी एक शादी से परिवार की फोटो",
        promisesEyebrow: "हमारा तरीका",
        promisesTitle: "चार बातें जिन पर हम कभी समझौता नहीं करते",
        promises: [
            { icon: IndianRupee, title: "पहले से साफ़ दाम", body: "हर पैकेज और ऐड-ऑन का दाम इसी वेबसाइट पर है, ताकि कॉल करने से पहले ही आप तुलना कर सकें।" },
            { icon: Camera, title: "सिर्फ़ हमारा अपना काम", body: "इस साइट की हर फोटो और फ़िल्म हमारी टीम ने शूट की है। न स्टॉक फोटो, न किसी और का पोर्टफोलियो।" },
            { icon: Languages, title: "आपकी रस्मों की समझ", body: "कुआं पूजन से विदाई तक, हम हरियाणा की रस्में जानते हैं और हर रस्म में कहां खड़ा होना है, ये भी।" },
            { icon: Clock, title: "दिन हो या रात", body: "सुबह 7 बजे हल्दी हो या रात 3 बजे फेरे, टीम आख़िरी रस्म तक रहती है।" },
        ],
        journeyEyebrow: "हमारा सफ़र",
        journeyTitle: "एक कैमरे से पूरी वेडिंग टीम तक",
        milestones: [
            { year: String(business.foundingYear), title: "स्टूडियो की शुरुआत", body: `${business.founder.name} ने ${business.address.locality} में एक कैमरे के साथ ${business.name} शुरू किया।` },
            { year: "2004", title: "रोहतक में अपना स्टूडियो", body: "रोहतक में हमारा अपना स्टूडियो खुला, जहां परिवार आज भी एल्बम देखने और शादी प्लान करने आते हैं।" },
            { year: "आज", title: "फोटो, फ़िल्म, ड्रोन और LED वॉल", body: "कैंडिड फोटोग्राफी, सिनेमैटिक फ़िल्म, ड्रोन शूट, लाइव स्ट्रीमिंग और LED वॉल, सब एक ही टीम से।" },
        ],
        teamEyebrow: "हमारी टीम",
        teamTitle: "आपकी शादी में आप किनसे मिलेंगे",
        visitTitle: "स्टूडियो आइए",
        visitBody: "असली एल्बम देखें, अपनी तारीखों पर बात करें और आमने-सामने कोटेशन लें।",
        directions: "रास्ता देखें",
        contact: "संपर्क करें",
    },
};

function initials(name: string) {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2);
}

export function AboutPage({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    const hi = locale === "hi";
    const L = (p: string) => localePath(locale, p);

    return (
        <div>
            {/* Hero */}
            <section className="overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
                <div className="container-custom grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                            {c.eyebrow}
                            {!hi && (
                                <span lang="hi" className="font-hindi normal-case tracking-normal text-sindoor">
                                    {" "}
                                    · हमारी कहानी
                                </span>
                            )}
                        </p>
                        <h1 className="mt-4 font-display text-4xl leading-[1.08] md:text-6xl">
                            {c.titleA} <span className="italic text-accent">{c.titleEm}</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg text-foreground-muted">{c.intro}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href="/portfolio" className="btn btn-primary">
                                {c.ctaWork} <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                            <Link href={L("/contact")} className="btn btn-outline">
                                <MapPin className="h-4 w-4" aria-hidden /> {c.ctaContact}
                            </Link>
                        </div>
                    </div>

                    <div className="relative mx-auto grid w-full max-w-xl grid-cols-[1.3fr_1fr] gap-3 sm:gap-4">
                        <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-3xl">
                            <Image src={photos.main.src} alt={photos.main.alt} fill priority sizes="(max-width: 1024px) 60vw, 30vw" placeholder="blur" blurDataURL={photos.main.blurDataURL} className="object-cover" />
                        </div>
                        <div className="relative aspect-square overflow-hidden rounded-3xl">
                            <Image src={photos.second.src} alt={photos.second.alt} fill sizes="(max-width: 1024px) 40vw, 20vw" placeholder="blur" blurDataURL={photos.second.blurDataURL} className="object-cover" />
                        </div>
                        <div className="relative aspect-square overflow-hidden rounded-3xl">
                            <Image src={photos.third.src} alt={photos.third.alt} fill sizes="(max-width: 1024px) 40vw, 20vw" placeholder="blur" blurDataURL={photos.third.blurDataURL} className="object-cover" />
                        </div>
                        <div className="absolute -bottom-5 left-5 rounded-2xl border border-border bg-card px-5 py-3 shadow-[0_20px_50px_-25px_rgb(var(--shadow-color)/0.6)]">
                            <p className="text-xs text-foreground-muted">{hi ? "शादियों की फोटोग्राफी" : "Photographing weddings"}</p>
                            <p className="mt-1 font-display text-3xl leading-none text-accent">{hi ? `${business.foundingYear} से` : `since ${business.foundingYear}`}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y border-border bg-background-secondary">
                <dl className="container-custom grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
                    {c.stats.map((s) => (
                        <div key={s.label} className="px-2 py-8 text-center md:py-10">
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="tabular font-display text-4xl text-accent md:text-5xl">{s.value}</dd>
                            <dd className="mt-2 text-sm text-foreground-muted">{s.label}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* Story */}
            <section className="section-padding">
                <div className="container-custom grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <SectionWrapper animation="fade-right">
                        <figure>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                                <Image src={photos.story.src} alt={photos.story.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" placeholder="blur" blurDataURL={photos.story.blurDataURL} className="object-cover" />
                            </div>
                            <figcaption className="mt-3 text-sm text-foreground-muted">{c.caption}</figcaption>
                        </figure>
                    </SectionWrapper>
                    <SectionWrapper animation="fade-left" delay={0.15}>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{c.storyEyebrow}</p>
                        <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                            {c.storyTitle} <span className="italic text-accent">{c.storyEm}</span>
                        </h2>
                        <div className="mt-6 space-y-4 text-foreground-muted">
                            {c.story.map((p) => (
                                <p key={p.slice(0, 24)}>{p}</p>
                            ))}
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <span className="h-px w-12 bg-accent" />
                            <p className="font-display text-lg italic">{c.signature}</p>
                        </div>
                    </SectionWrapper>
                </div>
            </section>

            {/* Promises */}
            <section className="section-padding bg-background-secondary">
                <div className="container-custom">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{c.promisesEyebrow}</p>
                    <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">{c.promisesTitle}</h2>
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {c.promises.map(({ icon: Icon, title, body }, i) => (
                            <div key={title} className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-7">
                                <span aria-hidden className="absolute right-5 top-4 font-display text-5xl text-accent/15">
                                    0{i + 1}
                                </span>
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                                    <Icon className="h-6 w-6" aria-hidden />
                                </span>
                                <h3 className="mt-5 font-display text-xl">{title}</h3>
                                <p className="mt-2 text-sm text-foreground-muted">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey */}
            <section className="section-padding">
                <div className="container-custom">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{c.journeyEyebrow}</p>
                    <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">{c.journeyTitle}</h2>
                    <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
                        <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-0 md:top-[7px] md:h-px md:w-full md:bg-gradient-to-r" />
                        {c.milestones.map((m) => (
                            <li key={m.year} className="relative pl-10 md:pl-0 md:pt-10">
                                <span aria-hidden className="absolute left-0 top-1 h-4 w-4 rounded-full border-4 border-background bg-accent ring-1 ring-accent md:top-0" />
                                <p className="tabular font-display text-3xl text-accent">{m.year}</p>
                                <h3 className="mt-2 font-display text-xl">{m.title}</h3>
                                <p className="mt-2 text-sm text-foreground-muted">{m.body}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Team */}
            <section className="section-padding bg-background-secondary">
                <div className="container-custom">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{c.teamEyebrow}</p>
                    <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">{c.teamTitle}</h2>
                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {team.map((m) => (
                            <div key={m.name} className="flex gap-5 rounded-3xl border border-border bg-card p-6">
                                <span aria-hidden className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-2xl italic text-accent">
                                    {initials(m.name)}
                                </span>
                                <div>
                                    <h3 className="font-display text-xl">{hi ? m.nameHi : m.name}</h3>
                                    <p className="text-sm text-accent">{hi ? m.roleHi : m.role}</p>
                                    <p className="mt-3 text-sm text-foreground-muted">{hi ? m.bioHi : m.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-accent/40 bg-card p-6 md:flex-row md:items-center md:p-8">
                        <div className="flex gap-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                                <MapPin className="h-6 w-6" aria-hidden />
                            </span>
                            <div>
                                <h3 className="font-display text-2xl">{c.visitTitle}</h3>
                                <p className="mt-1 text-sm text-foreground-muted">{c.visitBody}</p>
                                <p className="mt-2 text-sm">
                                    {business.address.street}, {business.address.locality}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                {c.directions}
                            </a>
                            <Link href={L("/contact")} className="btn btn-primary">
                                {c.contact} <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <CTABanner locale={locale} />
        </div>
    );
}
