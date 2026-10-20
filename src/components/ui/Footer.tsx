import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, Clock } from "lucide-react";
import { business, fullAddress, whatsappLink } from "@/data/business";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { ConsentSettingsButton } from "./ConsentSettingsButton";
import { WhatsAppIcon } from "./WhatsAppIcon";

const socials = [
    { label: "Instagram", href: business.socials.instagram, icon: Instagram },
    { label: "Facebook", href: business.socials.facebook, icon: Facebook },
    { label: "YouTube", href: business.socials.youtube, icon: Youtube },
].filter((s) => Boolean(s.href));

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
    return (
        <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground">{title}</h2>
            <ul className="mt-5 space-y-3">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-sm text-foreground-muted transition-colors hover:text-accent">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Footer({ locale = "en" }: { locale?: Locale }) {
    const t = getDictionary(locale).footer;
    const L = (p: string) => localePath(locale, p);
    const hi = locale === "hi";

    const columns = [
        {
            title: t.plan,
            links: [
                { label: t.packages, href: L("/packages") },
                { label: t.compare, href: `${L("/packages")}#compare` },
                { label: t.addons, href: L("/add-ons") },
                { label: t.build, href: L("/build") },
                { label: t.planner, href: L("/plan") },
                { label: t.muhurat, href: L("/vivah-muhurat-2027") },
            ],
        },
        {
            title: t.services,
            links: services.slice(0, 7).map((s) => ({ label: hi ? s.nameHi : s.name, href: `/services/${s.slug}` })),
        },
        {
            title: t.studio,
            links: [
                { label: t.about, href: "/about" },
                { label: t.portfolio, href: "/portfolio" },
                { label: t.weddings, href: "/weddings" },
                { label: t.journal, href: "/journal" },
                { label: t.contact, href: "/contact" },
            ],
        },
        {
            title: t.legal,
            links: [
                { label: t.privacy, href: "/privacy" },
                { label: t.terms, href: "/terms" },
                { label: t.cancellation, href: "/cancellation-policy" },
                { label: t.cookies, href: "/cookie-policy" },
            ],
        },
    ];

    return (
        <footer data-site-footer className="relative overflow-hidden border-t border-border bg-background-secondary">
            <div className="container-custom section-padding">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* Brand + NAP (name, address, phone): identical to Google Business Profile */}
                    <div className="lg:col-span-4">
                        <Link href={hi ? "/hi" : "/"} className="inline-flex items-center gap-2">
                            <span className="font-display text-2xl font-semibold tracking-tight">Sindhu</span>{" "}
                            <span className="text-gradient font-display text-2xl font-light italic">Studio</span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-muted">
                            {hi ? `${business.foundingYear} से रोहतक में शादी फोटोग्राफी और फ़िल्म।` : `${business.tagline}.`}{" "}
                            <span lang="hi" className="font-hindi text-accent">
                                आपकी यादें, हमारी ज़िम्मेदारी।
                            </span>
                        </p>

                        <address className="mt-8 space-y-4 not-italic">
                            <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-sm text-foreground-muted transition-colors hover:text-accent">
                                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                                {business.email}
                            </a>
                            <div className="flex items-start gap-3 text-sm text-foreground-muted">
                                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                                <span className="flex flex-col gap-1">
                                    {business.phones.map((p) => (
                                        <a key={p.tel} href={`tel:${p.tel}`} className="tabular transition-colors hover:text-accent">
                                            {p.display}
                                        </a>
                                    ))}
                                </span>
                            </div>
                            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-foreground-muted transition-colors hover:text-accent">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                                {fullAddress}
                            </a>
                            <p className="flex items-center gap-3 text-sm text-foreground-muted">
                                <Clock className="h-4 w-4 shrink-0" aria-hidden />
                                {hi ? "हर दिन खुला, सुबह 9 से रात 9 बजे" : business.hours.display}
                            </p>
                        </address>
                    </div>

                    <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
                        {columns.map((c) => (
                            <LinkColumn key={c.title} title={c.title} links={c.links} />
                        ))}

                        <div className="col-span-2 rounded-2xl border border-border bg-card p-6 sm:col-span-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="font-display text-xl">{t.dateTitle}</p>
                                    <p className="mt-1 text-sm text-foreground-muted">{t.dateBody}</p>
                                </div>
                                <a href={whatsappLink(t.dateMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary shrink-0">
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {t.dateCta}
                                </a>
                            </div>
                        </div>

                        <nav aria-label={t.areas} className="col-span-2 sm:col-span-4">
                            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground">{t.areas}</h2>
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {cities.map((c) => (
                                    <li key={c.slug}>
                                        <Link
                                            href={`/wedding-photographer/${c.slug}`}
                                            className="inline-flex min-h-9 items-center rounded-full border border-border px-3 text-xs text-foreground-muted transition-colors hover:border-accent hover:text-accent"
                                        >
                                            {hi ? c.nameHi : c.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {socials.length > 0 && (
                            <div className="col-span-2 flex gap-3 sm:col-span-4">
                                {socials.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                                        aria-label={`${business.name} on ${social.label}`}
                                    >
                                        <social.icon className="h-4 w-4" aria-hidden />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-border pb-24 md:pb-0">
                <div className="container-custom flex flex-col items-center justify-between gap-3 py-6 text-xs text-foreground-muted md:flex-row">
                    <p>
                        © {new Date().getFullYear()} {business.legalName}, {business.address.locality}. {t.rights}
                    </p>
                    <ConsentSettingsButton label={t.cookieSettings} />
                </div>
            </div>
        </footer>
    );
}
