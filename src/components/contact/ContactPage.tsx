import { Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { business, fullAddress, whatsappLink } from "@/data/business";
import { getMedia } from "@/data/media";
import type { Locale } from "@/i18n";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactForm } from "./ContactForm";

const photo = getMedia("bride-candid-smile-over-shoulder");

const copy = {
    en: {
        kicker: `${business.address.locality} · since ${business.foundingYear}`,
        title: "Tell us about your wedding.",
        intro: "The date, the venue, how many functions, what you have in mind. Even if it's still half-planned, send it over and we'll take it from there.",
        waCta: "Message us on WhatsApp",
        waMessage: "Namaste Sindhu Studio, I'd like to know more about your wedding packages.",
        orCall: "or call",
        caption: "Photographed by Sindhu Studio",
        visitTitle: "Come see us",
        visitBody: "Drop by the studio on Delhi Road, look through real wedding albums and talk it over in person.",
        address: "Studio",
        hours: "Hours",
        hoursDisplay: business.hours.display,
        hoursNote: business.hours.note,
        phones: "Other numbers",
        email: "Email",
        directions: "Directions on Google Maps",
        mapTitle: `Map showing ${business.name}, ${business.address.locality}`,
    },
    hi: {
        kicker: `रोहतक · ${business.foundingYear} से`,
        title: "अपनी शादी के बारे में बताइए।",
        intro: "तारीख, वेन्यू, कितने फंक्शन, आपके मन में क्या है। अभी आधी ही प्लानिंग हुई हो, तब भी भेज दीजिए, आगे हम संभाल लेंगे।",
        waCta: "WhatsApp पर मैसेज करें",
        waMessage: "नमस्ते Sindhu Studio, मुझे आपके शादी पैकेज के बारे में जानना है।",
        orCall: "या कॉल करें",
        caption: "Sindhu Studio की खींची तस्वीर",
        visitTitle: "स्टूडियो आइए",
        visitBody: "दिल्ली रोड पर स्टूडियो आइए, असली शादी के एल्बम देखिए और आमने-सामने बात कीजिए।",
        address: "स्टूडियो",
        hours: "समय",
        hoursDisplay: "हर दिन खुला, सुबह 9 से रात 9 बजे तक",
        hoursNote: "शूट दिन या रात, किसी भी समय",
        phones: "दूसरे नंबर",
        email: "ईमेल",
        directions: "Google Maps पर रास्ता देखें",
        mapTitle: `${business.name}, रोहतक का नक्शा`,
    },
};

export function ContactPage({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    const [primary, ...otherPhones] = business.phones;

    return (
        <div className="pb-20 pt-28 md:pb-28 md:pt-36">
            <div className="container-custom">
                {/* Opening: a direct line to us, next to a real photograph */}
                <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
                    <div>
                        <p className="text-sm text-foreground-muted">{c.kicker}</p>
                        <h1 className="mt-5 max-w-xl font-display text-5xl leading-[1.04] md:text-7xl">{c.title}</h1>
                        <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground-muted">{c.intro}</p>

                        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                            <a
                                href={whatsappLink(c.waMessage)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#1F7A4A] px-7 font-medium text-white transition-colors hover:bg-[#19663D]"
                            >
                                <WhatsAppIcon className="h-5 w-5" />
                                {c.waCta}
                            </a>
                            <p className="text-foreground-muted">
                                {c.orCall}{" "}
                                <a href={`tel:${primary.tel}`} className="tabular font-display text-2xl text-foreground underline decoration-accent/40 decoration-1 underline-offset-[6px] transition-colors hover:text-accent">
                                    {primary.display}
                                </a>
                            </p>
                        </div>
                    </div>

                    <figure className="mx-auto w-full max-w-md lg:max-w-none">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                            <Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 1024px) 90vw, 40vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" />
                        </div>
                        <figcaption className="mt-3 text-sm italic text-foreground-muted">{c.caption}</figcaption>
                    </figure>
                </section>

                <hr className="my-20 border-border md:my-28" />

                {/* Form, with the studio details beside it */}
                <section className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
                    <Suspense fallback={<div className="h-[560px] animate-pulse rounded-sm bg-card" />}>
                        <ContactForm locale={locale} />
                    </Suspense>

                    <aside>
                        <h2 className="font-display text-3xl md:text-4xl">{c.visitTitle}</h2>
                        <p className="mt-3 text-foreground-muted">{c.visitBody}</p>

                        <dl className="mt-8 divide-y divide-border border-y border-border">
                            <div className="py-5">
                                <dt className="text-sm text-foreground-muted">{c.address}</dt>
                                <dd className="mt-1 leading-relaxed">{fullAddress}</dd>
                            </div>
                            <div className="py-5">
                                <dt className="text-sm text-foreground-muted">{c.hours}</dt>
                                <dd className="mt-1">
                                    {c.hoursDisplay}
                                    <span className="block text-sm text-foreground-muted">{c.hoursNote}</span>
                                </dd>
                            </div>
                            <div className="py-5">
                                <dt className="text-sm text-foreground-muted">{c.phones}</dt>
                                <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                                    {otherPhones.map((p) => (
                                        <a key={p.tel} href={`tel:${p.tel}`} className="tabular inline-flex min-h-8 items-center transition-colors hover:text-accent">
                                            {p.display}
                                        </a>
                                    ))}
                                </dd>
                            </div>
                            <div className="py-5">
                                <dt className="text-sm text-foreground-muted">{c.email}</dt>
                                <dd className="mt-1">
                                    <a href={`mailto:${business.email}`} className="break-all transition-colors hover:text-accent">
                                        {business.email}
                                    </a>
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-8 overflow-hidden rounded-sm border border-border">
                            <iframe src={business.mapsEmbedUrl} title={c.mapTitle} width="100%" height="220" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block grayscale-[0.6]" />
                        </div>
                        <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm text-accent underline-offset-4 hover:underline">
                            {c.directions} <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                    </aside>
                </section>
            </div>
        </div>
    );
}
