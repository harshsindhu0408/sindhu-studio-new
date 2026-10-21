import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Car, MapPin, Navigation } from "lucide-react";
import { cities, type City } from "@/data/cities";
import { packages, lowestPrice } from "@/data/packages";
import { services } from "@/data/services";
import { featuredMedia, getMedia } from "@/data/media";
import { business, fullAddress, SITE_URL, whatsappLink } from "@/data/business";
import { formatINR } from "@/lib/quote";
import { getWeddings } from "@/lib/content";
import { localePath, type Locale } from "@/i18n";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

function copy(locale: Locale, c: City) {
    const isHome = Boolean(c.home);
    const low = formatINR(packages[0].price);
    const high = formatINR(packages[packages.length - 1].price);
    if (locale === "hi") {
        return {
            region: c.region === "Delhi" ? "दिल्ली" : "हरियाणा",
            h1a: "",
            h1b: "में शादी फोटोग्राफर",
            plan: "मेरी शादी प्लान करें",
            waMessage: `नमस्ते! क्या आप ${c.nameHi} में शादी के लिए उपलब्ध हैं?`,
            checkDate: "मेरी तारीख चेक करें",
            fromStudio: "हमारे स्टूडियो से",
            rightHere: "यहीं पर",
            travel: "सफ़र",
            noTravel: "कोई सफ़र खर्च नहीं",
            quotedUpfront: "पहले से बताया जाता है",
            withinRohtak: "रोहतक के अंदर",
            samePrices: "पैकेज के दाम रोहतक जैसे ही",
            visit: "स्टूडियो आएं",
            studioArea: "दिल्ली रोड, रोहतक",
            directions: "रास्ता देखें",
            ourWork: `${c.nameHi} में हमारा काम`,
            weddingsShot: (n: number) => `${c.nameHi} में ${n}+ शादियां कवर कीं।`,
            venues: "जिन वेन्यू पर हमने शूट किया",
            packagesFor: `${c.nameHi} की शादियों के लिए पैकेज`,
            compareAll: "सबकी तुलना करें",
            plusTravel: "+ टीम का सफ़र और रुकना, बुकिंग से पहले बताया जाता है।",
            recent: "हमारा हाल का काम",
            servicesIn: `${c.nameHi} में सेवाएं`,
            faqTitle: `${c.nameHi} के परिवारों के सवाल`,
            faqs: [
                {
                    question: `क्या ${c.nameHi} की शादियों के लिए अलग से खर्च लगता है?`,
                    answer: isHome ? "नहीं। रोहतक की शादियों के लिए कोई सफ़र खर्च नहीं है।" : `${c.nameHi} के लिए टीम का सफ़र और रुकना पैकेज के दाम में जुड़ता है। बुकिंग से पहले हम सही रकम बता देते हैं, और पैकेज के दाम रोहतक जैसे ही हैं।`,
                },
                {
                    question: `${c.nameHi} आपके स्टूडियो से कितनी दूर है?`,
                    answer: isHome ? `हमारा स्टूडियो ${fullAddress} पर है।` : `सड़क से लगभग ${c.distanceKm} किमी, दिल्ली रोड, रोहतक के हमारे स्टूडियो से ${c.driveTimeHi}।`,
                },
                {
                    question: `${c.nameHi} में शादी फोटोग्राफी पैकेज कितने के हैं?`,
                    answer: `${low} (Silver) से ${high} (Exclusive) तक${isHome ? "" : ", सफ़र खर्च अलग"}। हर पैकेज में फुल HD फोटो और वीडियो, प्रिंटेड एल्बम और वेन्यू पर LED स्क्रीन शामिल हैं।`,
                },
            ],
        };
    }
    return {
        region: c.region,
        h1a: "Wedding photographer in",
        h1b: "",
        plan: "Plan my wedding",
        waMessage: `Namaste! Are you available for a wedding in ${c.name}?`,
        checkDate: "Check my date",
        fromStudio: "From our studio",
        rightHere: "Right here",
        travel: "Travel",
        noTravel: "No travel charge",
        quotedUpfront: "Quoted upfront",
        withinRohtak: "Within Rohtak",
        samePrices: "Same package prices as Rohtak",
        visit: "Visit the studio",
        studioArea: "Delhi Road, Rohtak",
        directions: "Get directions",
        ourWork: `Our work in ${c.name}`,
        weddingsShot: (n: number) => `${n}+ weddings covered in ${c.name}.`,
        venues: "Venues we've shot at",
        packagesFor: `Packages for ${c.name} weddings`,
        compareAll: "Compare all",
        plusTravel: "+ travel and stay for the team, quoted before you book.",
        recent: "Our recent work",
        servicesIn: `Services in ${c.name}`,
        faqTitle: `Questions from ${c.name} families`,
        faqs: [
            {
                question: `Do you charge extra for weddings in ${c.name}?`,
                answer: isHome
                    ? "No. There are no travel charges for weddings in Rohtak."
                    : `For ${c.name}, travel and stay for the team are added to the package price. We tell you the exact amount before you book, and package prices are the same as in Rohtak.`,
            },
            {
                question: `How far is ${c.name} from your studio?`,
                answer: isHome ? `Our studio is at ${fullAddress}.` : `About ${c.distanceKm} km by road, ${c.driveTime} from our studio on Delhi Road, Rohtak.`,
            },
            {
                question: `What do wedding photography packages cost in ${c.name}?`,
                answer: `From ${low} (Silver) to ${high} (Exclusive)${isHome ? "" : ", plus travel"}. Every package includes full HD photos and video, a printed album and LED screens at the venue.`,
            },
        ],
    };
}

export async function CityPage({ city: c, locale = "en" }: { city: City; locale?: Locale }) {
    const hi = locale === "hi";
    const L = (p: string) => localePath(locale, p);
    const name = hi ? c.nameHi : c.name;
    const t = copy(locale, c);

    const weddings = (await getWeddings()).filter((w) => w.city?.toLowerCase().includes(c.name.toLowerCase().split(" ")[0]));
    const hero = getMedia(["bride-entry-sparklers-red-lehenga", "varmala-couple-night-venue", "couple-varmala-garlands-chandelier"][cities.indexOf(c) % 3]);
    const photos = featuredMedia.slice(0, 6);
    const isHome = Boolean(c.home);

    const faqs = t.faqs;

    return (
        <div className="pb-24">
            <JsonLd data={faqSchema(faqs)} />
            {!hi && <JsonLd data={breadcrumbSchema([{ name: "Areas", path: "/wedding-photographer/rohtak" }, { name: c.name, path: `/wedding-photographer/${c.slug}` }])} />}
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: `Wedding photography in ${c.name}`,
                    serviceType: "Wedding photography",
                    provider: { "@id": `${SITE_URL}/#business` },
                    areaServed: { "@type": c.slug === "delhi-ncr" ? "AdministrativeArea" : "City", name: c.name },
                    offers: { "@type": "AggregateOffer", lowPrice: lowestPrice, highPrice: packages[packages.length - 1].price, priceCurrency: "INR" },
                }}
            />

            <section className="relative flex min-h-[60svh] items-end overflow-hidden pb-14 pt-32">
                <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={hero.blurDataURL} className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/60 to-[#14110F]/10" />
                <div className="container-custom relative text-[#F5EFE6]">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C785]">
                        <MapPin className="h-4 w-4" aria-hidden /> {t.region}
                        {!hi && (
                            <span lang="hi" className="font-hindi text-sm normal-case tracking-normal text-[#F2A93B]">
                                · {c.nameHi}
                            </span>
                        )}
                    </p>
                    <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
                        {t.h1a && <>{t.h1a} </>}<span className="italic text-[#E8C785]">{name}</span>{t.h1b && <> {t.h1b}</>}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-[#F5EFE6]/85">{hi ? c.noteHi : c.note}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href={L("/plan")} className="btn btn-primary">
                            {t.plan} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <a href={whatsappLink(t.waMessage)} target="_blank" rel="noopener noreferrer" className="btn border border-[#F5EFE6]/40 text-[#F5EFE6] hover:border-[#E8C785]">
                            <WhatsAppIcon className="h-4 w-4" /> {t.checkDate}
                        </a>
                    </div>
                </div>
            </section>

            <section className="container-custom mt-12 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-5">
                    <Car className="h-5 w-5 text-accent" aria-hidden />
                    <p className="mt-3 text-sm text-foreground-muted">{t.fromStudio}</p>
                    <p className="font-display text-2xl">{isHome ? t.rightHere : `~${c.distanceKm} km`}</p>
                    <p className="text-sm text-foreground-muted">{hi ? c.driveTimeHi : c.driveTime}</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                    <Navigation className="h-5 w-5 text-accent" aria-hidden />
                    <p className="mt-3 text-sm text-foreground-muted">{t.travel}</p>
                    <p className="font-display text-2xl">{isHome ? t.noTravel : t.quotedUpfront}</p>
                    <p className="text-sm text-foreground-muted">{isHome ? t.withinRohtak : t.samePrices}</p>
                </div>
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent">
                    <MapPin className="h-5 w-5 text-accent" aria-hidden />
                    <p className="mt-3 text-sm text-foreground-muted">{t.visit}</p>
                    <p className="font-display text-xl">{t.studioArea}</p>
                    <p className="text-sm text-accent">{t.directions} →</p>
                </a>
            </section>

            {(c.weddingsShot || c.venues?.length || weddings.length > 0) && (
                <section className="container-custom mt-12 rounded-3xl border border-accent/40 bg-accent/[0.06] p-6 md:p-8">
                    <h2 className="font-display text-2xl">{t.ourWork}</h2>
                    {c.weddingsShot ? <p className="mt-2 text-foreground-muted">{t.weddingsShot(c.weddingsShot)}</p> : null}
                    {c.venues?.length ? <p className="mt-2 text-foreground-muted">{t.venues}: {c.venues.join(", ")}.</p> : null}
                    {weddings.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {weddings.map((w) => (
                                <li key={w.slug}>
                                    <Link href={L(`/weddings/${w.slug}`)} className="inline-flex min-h-9 items-center rounded-full border border-border px-3 text-sm hover:border-accent">
                                        {w.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}

            <section aria-labelledby="prices" className="container-custom mt-16">
                <div className="flex items-end justify-between gap-4">
                    <h2 id="prices" className="font-display text-3xl md:text-4xl">
                        {t.packagesFor}
                    </h2>
                    <Link href={`${L("/packages")}#compare`} className="text-sm text-accent hover:underline">
                        {t.compareAll} →
                    </Link>
                </div>
                <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                    {packages.map((p) => (
                        <li key={p.id}>
                            <Link href={`${L("/build")}?p=${p.id}`} className={`block h-full rounded-2xl border bg-card p-4 transition-colors hover:border-accent ${p.popular ? "border-accent" : "border-border"}`}>
                                <p className="font-display text-xl">{p.name}</p>
                                <p className="tabular mt-1 font-semibold">{formatINR(p.price)}</p>
                                <p className="mt-2 text-xs text-foreground-muted">{(hi ? p.highlightsHi : p.highlights).slice(0, 2).join(" · ")}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
                {!isHome && <p className="mt-3 text-sm text-foreground-muted">{t.plusTravel}</p>}
            </section>

            <section aria-labelledby="photos" className="container-custom mt-16">
                <h2 id="photos" className="font-display text-3xl md:text-4xl">
                    {t.recent}
                </h2>
                <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {photos.map((m) => (
                        <li key={m.id} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-background-secondary">
                            <Image src={m.src} alt={m.alt} fill sizes="(max-width: 768px) 50vw, 33vw" placeholder="blur" blurDataURL={m.blurDataURL} className="object-cover" />
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="svc" className="container-custom mt-16">
                <h2 id="svc" className="font-display text-3xl md:text-4xl">
                    {t.servicesIn}
                </h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                    {services.map((s) => (
                        <li key={s.slug}>
                            <Link href={L(`/services/${s.slug}`)} className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm hover:border-accent">
                                {hi ? s.nameHi : s.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="cfaq" className="container-custom mt-16 max-w-3xl">
                <h2 id="cfaq" className="font-display text-3xl">
                    {t.faqTitle}
                </h2>
                <dl className="mt-6 divide-y divide-border border-y border-border">
                    {faqs.map((f) => (
                        <div key={f.question} className="py-5">
                            <dt className="font-display text-lg">{f.question}</dt>
                            <dd className="mt-2 text-foreground-muted">{f.answer}</dd>
                        </div>
                    ))}
                </dl>
            </section>
        </div>
    );
}
