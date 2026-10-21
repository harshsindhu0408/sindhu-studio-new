import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { services, type Service } from "@/data/services";
import { localizeService } from "@/data/services.hi";
import { getMedia, mediaByCategory } from "@/data/media";
import { getAddOn, addOnFromPrice, addOnUnitLabel } from "@/data/addons";
import { getPackage } from "@/data/packages";
import { business, SITE_URL, whatsappLink } from "@/data/business";
import { cities } from "@/data/cities";
import { formatINR } from "@/lib/quote";
import { localePath, type Locale } from "@/i18n";
import { FaqList } from "@/components/ui/FaqList";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

const copy = {
    en: {
        services: "Services",
        inCity: `in ${business.address.locality}`,
        addToQuote: "Add to my quote",
        seePackages: "See packages",
        askWa: "Ask on WhatsApp",
        whatYouGet: "What you get",
        how: "How we shoot it",
        fromWork: "From our work",
        seeMore: "See more",
        questions: "Questions",
        asAddon: "As an add-on",
        from: "from",
        day: "day",
        includedIn: "Included in",
        compare: "Compare packages",
        where: "Where we shoot",
        more: "More from the studio",
    },
    hi: {
        services: "सेवाएं",
        inCity: "रोहतक में",
        addToQuote: "मेरे कोटेशन में जोड़ें",
        seePackages: "पैकेज देखें",
        askWa: "WhatsApp पर पूछें",
        whatYouGet: "आपको क्या मिलेगा",
        how: "हम कैसे शूट करते हैं",
        fromWork: "हमारे काम से",
        seeMore: "और देखें",
        questions: "सवाल-जवाब",
        asAddon: "ऐड-ऑन के रूप में",
        from: "शुरुआती दाम",
        day: "दिन",
        includedIn: "इन पैकेज में शामिल",
        compare: "पैकेज की तुलना करें",
        where: "हम कहां शूट करते हैं",
        more: "स्टूडियो की और सेवाएं",
    },
};

export function ServicePage({ service, locale = "en" }: { service: Service; locale?: Locale }) {
    const t = copy[locale];
    const hi = locale === "hi";
    const L = (p: string) => localePath(locale, p);
    const s = localizeService(service, locale);

    const hero = s.image.media ? getMedia(s.image.media) : null;
    const heroSrc = hero?.src ?? s.image.src!;
    const addOn = s.addOn ? getAddOn(s.addOn) : undefined;
    const included = (s.includedIn ?? []).map((id) => getPackage(id)!).filter(Boolean);
    const gallery = s.galleryCategory ? mediaByCategory(s.galleryCategory).slice(0, 6) : [];
    const others = services.filter((x) => x.slug !== s.slug).slice(0, 4).map((x) => localizeService(x, locale));

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.name,
        description: s.answer,
        serviceType: s.name,
        url: `${SITE_URL}${L(`/services/${s.slug}`)}`,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
        ...(addOn ? { offers: { "@type": "Offer", price: addOnFromPrice(addOn), priceCurrency: "INR", url: `${SITE_URL}/build?a=${addOn.id}` } } : {}),
    };

    return (
        <div className="pb-24">
            <JsonLd data={serviceSchema} />
            <JsonLd data={faqSchema(s.faqs)} />
            {!hi && <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }])} />}

            {/* Hero */}
            <section className="relative flex min-h-[70svh] items-end overflow-hidden pb-14 pt-32">
                <Image src={heroSrc} alt={s.image.alt} fill priority sizes="100vw" className="object-cover" placeholder={hero ? "blur" : "empty"} blurDataURL={hero?.blurDataURL} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/70 to-[#14110F]/20" />
                <div className="container-custom relative text-[#F5EFE6]">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#F5EFE6]/70">
                        <Link href={L("/services")} className="hover:text-[#E8C785]">
                            {t.services}
                        </Link>{" "}
                        / <span>{s.name}</span>
                    </nav>
                    {!hi && (
                        <p lang="hi" className="mt-4 font-hindi text-lg text-[#F2A93B]">
                            {s.nameHi}
                        </p>
                    )}
                    <h1 className={`${hi ? "mt-4" : "mt-1"} max-w-3xl font-display text-4xl leading-tight md:text-6xl`}>
                        {s.name} <span className="text-[#E8C785]">{t.inCity}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-[#F5EFE6]/85">{s.tagline}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href={addOn ? `${L("/build")}?a=${addOn.id}` : L("/packages")} className="btn btn-primary">
                            {addOn ? t.addToQuote : t.seePackages} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <a
                            href={whatsappLink(hi ? `नमस्ते! मुझे ${s.name} के बारे में और जानना है।` : `Namaste! I'd like to know more about ${s.name.toLowerCase()}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn border border-[#F5EFE6]/40 text-[#F5EFE6] hover:border-[#E8C785] hover:text-[#E8C785]"
                        >
                            <WhatsAppIcon className="h-4 w-4" /> {t.askWa}
                        </a>
                    </div>
                </div>
            </section>

            <div className="container-custom mt-14 grid gap-12 lg:grid-cols-[1fr_360px]">
                <div className="min-w-0">
                    {/* Answer block */}
                    <p className="text-xl leading-relaxed">{s.answer}</p>

                    <section aria-labelledby="get" className="mt-12">
                        <h2 id="get" className="font-display text-3xl">
                            {t.whatYouGet}
                        </h2>
                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                            {s.whatYouGet.map((w) => (
                                <li key={w} className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                                    {w}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section aria-labelledby="how" className="mt-12">
                        <h2 id="how" className="font-display text-3xl">
                            {t.how}
                        </h2>
                        <ol className="mt-5 space-y-5">
                            {s.howWeShoot.map((h, i) => (
                                <li key={h.title} className="flex gap-4">
                                    <span className="tabular flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent text-sm text-accent">{i + 1}</span>
                                    <div>
                                        <h3 className="font-display text-xl">{h.title}</h3>
                                        <p className="mt-1 text-foreground-muted">{h.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {gallery.length > 0 && (
                        <section aria-labelledby="work" className="mt-12">
                            <div className="flex items-end justify-between">
                                <h2 id="work" className="font-display text-3xl">
                                    {t.fromWork}
                                </h2>
                                <Link href={L(`/portfolio/${s.galleryCategory}`)} className="text-sm text-accent hover:underline">
                                    {t.seeMore} →
                                </Link>
                            </div>
                            <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                                {gallery.map((m) => (
                                    <li key={m.id} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-background-secondary">
                                        <Image src={m.src} alt={m.alt} fill sizes="(max-width: 768px) 50vw, 25vw" placeholder="blur" blurDataURL={m.blurDataURL} className="object-cover" />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section aria-labelledby="faq" className="mt-12">
                        <h2 id="faq" className="font-display text-3xl">
                            {t.questions}
                        </h2>
                        <div className="mt-5">
                            <FaqList items={s.faqs} defaultOpen={null} />
                        </div>
                    </section>
                </div>

                {/* Price sidebar */}
                <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                    {addOn && (
                        <div className="rounded-3xl border border-accent/40 bg-card p-6">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{t.asAddon}</p>
                            <p className="tabular mt-2 text-3xl font-semibold">
                                {addOn.pricing.type === "tiered" && <span className="text-base font-normal text-foreground-muted">{t.from} </span>}
                                {formatINR(addOnFromPrice(addOn))}
                                {addOnUnitLabel(addOn) === "per day" && <span className="text-base font-normal text-foreground-muted"> / {t.day}</span>}
                            </p>
                            <Link href={`${L("/build")}?a=${addOn.id}`} className="btn btn-primary mt-4 w-full">
                                {t.addToQuote}
                            </Link>
                        </div>
                    )}
                    {included.length > 0 && (
                        <div className="rounded-3xl border border-border bg-card p-6">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{t.includedIn}</p>
                            <ul className="mt-3 divide-y divide-border">
                                {included.map((p) => (
                                    <li key={p.id}>
                                        <Link href={`${L("/build")}?p=${p.id}`} className="flex items-center justify-between py-3 text-sm hover:text-accent">
                                            <span className="font-display text-lg">{p.name}</span>
                                            <span className="tabular">{formatINR(p.price)}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link href={`${L("/packages")}#compare`} className="mt-2 inline-block text-sm text-accent hover:underline">
                                {t.compare} →
                            </Link>
                        </div>
                    )}
                    <div className="rounded-3xl border border-border bg-card p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{t.where}</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {cities.map((c) => (
                                <li key={c.slug}>
                                    <Link href={L(`/wedding-photographer/${c.slug}`)} className="inline-flex min-h-8 items-center rounded-full border border-border px-3 text-xs hover:border-accent">
                                        {hi ? c.nameHi : c.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>

            <section aria-labelledby="more" className="container-custom mt-20">
                <h2 id="more" className="font-display text-3xl">
                    {t.more}
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {others.map((o) => {
                        const m = o.image.media ? getMedia(o.image.media) : null;
                        return (
                            <li key={o.slug}>
                                <Link href={L(`/services/${o.slug}`)} className="group block overflow-hidden rounded-2xl border border-border bg-card">
                                    <div className="relative aspect-[4/3]">
                                        <Image src={m?.src ?? o.image.src!} alt={o.image.alt} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <p className="p-4 font-display text-lg">{o.name}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
}
