import { Suspense } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { business, fullAddress, whatsappLink } from "@/data/business";
import type { Locale } from "@/i18n";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactForm } from "./ContactForm";

const copy = {
    en: {
        eyebrow: "Contact",
        titleA: "Let's talk about",
        titleEm: "your shaadi",
        intro: "Check a date, ask about a package or come and see our albums. WhatsApp is the fastest way to reach us.",
        waTitle: "WhatsApp us",
        waBody: "Usually the quickest reply",
        waMessage: "Namaste Sindhu Studio, I'd like to know more about your wedding packages.",
        callTitle: "Call the studio",
        visitTitle: "Visit the studio",
        visitBody: `${business.address.locality}, ${business.address.region}`,
        detailsTitle: "Studio details",
        phones: "Phone numbers",
        email: "Email",
        address: "Address",
        hours: "Hours",
        hoursDisplay: business.hours.display,
        hoursNote: business.hours.note,
        directions: "Get directions",
        mapTitle: `Map showing ${business.name}, ${business.address.locality}`,
        nextTitle: "What happens next",
        next: [
            { title: "We reply", body: "On WhatsApp or by phone, whichever you prefer." },
            { title: "We check your dates", body: "Against our bookings and the muhurat calendar." },
            { title: "You get a clear quote", body: "Package and add-ons, with the total written down." },
        ],
    },
    hi: {
        eyebrow: "संपर्क",
        titleA: "आइए बात करें",
        titleEm: "आपकी शादी की",
        intro: "तारीख चेक करनी हो, पैकेज के बारे में पूछना हो या एल्बम देखने आना हो। हम तक पहुंचने का सबसे तेज़ तरीका WhatsApp है।",
        waTitle: "WhatsApp करें",
        waBody: "आमतौर पर सबसे जल्दी जवाब",
        waMessage: "नमस्ते Sindhu Studio, मुझे आपके शादी पैकेज के बारे में जानना है।",
        callTitle: "स्टूडियो कॉल करें",
        visitTitle: "स्टूडियो आएं",
        visitBody: "रोहतक, हरियाणा",
        detailsTitle: "स्टूडियो की जानकारी",
        phones: "फ़ोन नंबर",
        email: "ईमेल",
        address: "पता",
        hours: "समय",
        hoursDisplay: "हर दिन खुला, सुबह 9 से रात 9 बजे तक",
        hoursNote: "शूट दिन या रात, किसी भी समय",
        directions: "रास्ता देखें",
        mapTitle: `${business.name}, रोहतक का नक्शा`,
        nextTitle: "आगे क्या होगा",
        next: [
            { title: "हम जवाब देंगे", body: "WhatsApp या फ़ोन पर, जैसा आप चाहें।" },
            { title: "आपकी तारीख चेक करेंगे", body: "अपनी बुकिंग और मुहूर्त कैलेंडर के हिसाब से।" },
            { title: "साफ़ कोटेशन मिलेगा", body: "पैकेज और ऐड-ऑन, कुल रकम लिखकर।" },
        ],
    },
};

export function ContactPage({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    const primary = business.phones[0];

    const actions = [
        { href: whatsappLink(c.waMessage), icon: <WhatsAppIcon className="h-6 w-6" />, title: c.waTitle, body: c.waBody, external: true, primary: true },
        { href: `tel:${primary.tel}`, icon: <Phone className="h-6 w-6" aria-hidden />, title: c.callTitle, body: primary.display, external: false, primary: false },
        { href: business.mapsUrl, icon: <MapPin className="h-6 w-6" aria-hidden />, title: c.visitTitle, body: c.visitBody, external: true, primary: false },
    ];

    return (
        <div className="pb-20 pt-28 md:pb-28 md:pt-36">
            <div className="container-custom">
                {/* Hero */}
                <header className="max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        {c.eyebrow}
                        {locale === "en" && (
                            <span lang="hi" className="font-hindi normal-case tracking-normal text-sindoor">
                                {" "}
                                · संपर्क करें
                            </span>
                        )}
                    </p>
                    <h1 className="mt-4 font-display text-4xl leading-[1.08] md:text-6xl">
                        {c.titleA} <span className="italic text-accent">{c.titleEm}</span>
                    </h1>
                    <p className="mt-5 text-lg text-foreground-muted">{c.intro}</p>
                </header>

                {/* Quick actions */}
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {actions.map((a) => (
                        <a
                            key={a.title}
                            href={a.href}
                            {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className={
                                a.primary
                                    ? "group flex items-center gap-4 rounded-3xl bg-[#1F7A4A] p-5 text-white transition-transform hover:-translate-y-1"
                                    : "group flex items-center gap-4 rounded-3xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent"
                            }
                        >
                            <span className={a.primary ? "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15" : "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent"}>{a.icon}</span>
                            <span className="min-w-0 flex-1">
                                <span className="block font-display text-xl">{a.title}</span>
                                <span className={a.primary ? "tabular block text-sm text-white/80" : "tabular block text-sm text-foreground-muted"}>{a.body}</span>
                            </span>
                            <ArrowUpRight className="h-5 w-5 shrink-0 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </a>
                    ))}
                </div>

                {/* Form + details */}
                <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
                    <Suspense fallback={<div className="h-[560px] animate-pulse rounded-3xl bg-card" />}>
                        <ContactForm locale={locale} />
                    </Suspense>

                    <aside className="flex flex-col gap-5">
                        <div className="rounded-3xl border border-border bg-card p-6">
                            <h2 className="font-display text-2xl">{c.detailsTitle}</h2>
                            <dl className="mt-5 space-y-5 text-sm">
                                <div className="flex gap-3">
                                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                                    <div>
                                        <dt className="font-medium">{c.phones}</dt>
                                        <dd className="mt-1 grid gap-0.5">
                                            {business.phones.map((p) => (
                                                <a key={p.tel} href={`tel:${p.tel}`} className="tabular inline-flex min-h-8 items-center text-foreground-muted transition-colors hover:text-accent">
                                                    {p.display}
                                                </a>
                                            ))}
                                        </dd>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                                    <div className="min-w-0">
                                        <dt className="font-medium">{c.email}</dt>
                                        <dd className="mt-1">
                                            <a href={`mailto:${business.email}`} className="break-all text-foreground-muted transition-colors hover:text-accent">
                                                {business.email}
                                            </a>
                                        </dd>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                                    <div>
                                        <dt className="font-medium">{c.address}</dt>
                                        <dd className="mt-1 text-foreground-muted">{fullAddress}</dd>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                                    <div>
                                        <dt className="font-medium">{c.hours}</dt>
                                        <dd className="mt-1 text-foreground-muted">
                                            {c.hoursDisplay}
                                            <br />
                                            {c.hoursNote}
                                        </dd>
                                    </div>
                                </div>
                            </dl>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-border bg-card">
                            <iframe src={business.mapsEmbedUrl} title={c.mapTitle} width="100%" height="240" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block" />
                            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between px-5 text-sm font-medium text-accent hover:bg-accent/5">
                                {c.directions} <ArrowUpRight className="h-4 w-4" aria-hidden />
                            </a>
                        </div>
                    </aside>
                </div>

                {/* Next steps */}
                <section aria-labelledby="next-title" className="mt-16">
                    <h2 id="next-title" className="font-display text-3xl">
                        {c.nextTitle}
                    </h2>
                    <ol className="mt-6 grid gap-4 md:grid-cols-3">
                        {c.next.map((s, i) => (
                            <li key={s.title} className="flex gap-4 rounded-3xl border border-border p-5">
                                <span className="tabular flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground">{i + 1}</span>
                                <div>
                                    <p className="font-medium">{s.title}</p>
                                    <p className="mt-1 text-sm text-foreground-muted">{s.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
        </div>
    );
}
