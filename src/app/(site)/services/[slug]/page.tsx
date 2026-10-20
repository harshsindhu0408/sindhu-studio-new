import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { services, getService } from "@/data/services";
import { getMedia, mediaByCategory } from "@/data/media";
import { getAddOn, addOnFromPrice, addOnUnitLabel } from "@/data/addons";
import { getPackage } from "@/data/packages";
import { business, SITE_URL, whatsappLink } from "@/data/business";
import { cities } from "@/data/cities";
import { formatINR } from "@/lib/quote";
import { FaqList } from "@/components/ui/FaqList";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
    return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const s = getService(slug);
    if (!s) return {};
    const title = `${s.name} in ${business.address.locality}`;
    const img = s.image.media ? getMedia(s.image.media).src : s.image.src;
    return {
        title,
        description: s.answer.slice(0, 158),
        alternates: { canonical: `/services/${s.slug}` },
        openGraph: { title, description: s.answer, url: `/services/${s.slug}`, images: img ? [{ url: img, alt: s.image.alt }] : undefined },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const s = getService(slug);
    if (!s) notFound();

    const hero = s.image.media ? getMedia(s.image.media) : null;
    const heroSrc = hero?.src ?? s.image.src!;
    const addOn = s.addOn ? getAddOn(s.addOn) : undefined;
    const included = (s.includedIn ?? []).map((id) => getPackage(id)!).filter(Boolean);
    const gallery = s.galleryCategory ? mediaByCategory(s.galleryCategory).slice(0, 6) : [];
    const others = services.filter((x) => x.slug !== s.slug).slice(0, 4);

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.name,
        description: s.answer,
        serviceType: s.name,
        url: `${SITE_URL}/services/${s.slug}`,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
        ...(addOn ? { offers: { "@type": "Offer", price: addOnFromPrice(addOn), priceCurrency: "INR", url: `${SITE_URL}/build?a=${addOn.id}` } } : {}),
    };

    return (
        <div className="pb-24">
            <JsonLd data={serviceSchema} />
            <JsonLd data={faqSchema(s.faqs)} />
            <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }])} />

            {/* Hero */}
            <section className="relative flex min-h-[70svh] items-end overflow-hidden pb-14 pt-32">
                <Image src={heroSrc} alt={s.image.alt} fill priority sizes="100vw" className="object-cover" placeholder={hero ? "blur" : "empty"} blurDataURL={hero?.blurDataURL} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/60 to-[#14110F]/10" />
                <div className="container-custom relative text-[#F5EFE6]">
                    <nav aria-label="Breadcrumb" className="text-xs text-[#F5EFE6]/70">
                        <Link href="/services" className="hover:text-[#E8C785]">
                            Services
                        </Link>{" "}
                        / <span>{s.name}</span>
                    </nav>
                    <p lang="hi" className="mt-4 font-hindi text-lg text-[#F2A93B]">
                        {s.nameHi}
                    </p>
                    <h1 className="mt-1 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
                        {s.name} <span className="text-[#E8C785]">in {business.address.locality}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-[#F5EFE6]/85">{s.tagline}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href={addOn ? `/build?a=${addOn.id}` : "/packages"} className="btn btn-primary">
                            {addOn ? "Add to my quote" : "See packages"} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <a
                            href={whatsappLink(`Namaste! I'd like to know more about ${s.name.toLowerCase()}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn border border-[#F5EFE6]/40 text-[#F5EFE6] hover:border-[#E8C785] hover:text-[#E8C785]"
                        >
                            <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
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
                            What you get
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
                            How we shoot it
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
                                    From our work
                                </h2>
                                <Link href={`/portfolio/${s.galleryCategory}`} className="text-sm text-accent hover:underline">
                                    See more →
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
                            Questions
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
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">As an add-on</p>
                            <p className="tabular mt-2 text-3xl font-semibold">
                                {addOn.pricing.type === "tiered" && <span className="text-base font-normal text-foreground-muted">from </span>}
                                {formatINR(addOnFromPrice(addOn))}
                                {addOnUnitLabel(addOn) === "per day" && <span className="text-base font-normal text-foreground-muted"> / day</span>}
                            </p>
                            <Link href={`/build?a=${addOn.id}`} className="btn btn-primary mt-4 w-full">
                                Add to my quote
                            </Link>
                        </div>
                    )}
                    {included.length > 0 && (
                        <div className="rounded-3xl border border-border bg-card p-6">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Included in</p>
                            <ul className="mt-3 divide-y divide-border">
                                {included.map((p) => (
                                    <li key={p.id}>
                                        <Link href={`/build?p=${p.id}`} className="flex items-center justify-between py-3 text-sm hover:text-accent">
                                            <span className="font-display text-lg">{p.name}</span>
                                            <span className="tabular">{formatINR(p.price)}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/packages#compare" className="mt-2 inline-block text-sm text-accent hover:underline">
                                Compare packages →
                            </Link>
                        </div>
                    )}
                    <div className="rounded-3xl border border-border bg-card p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Where we shoot</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {cities.map((c) => (
                                <li key={c.slug}>
                                    <Link href={`/wedding-photographer/${c.slug}`} className="inline-flex min-h-8 items-center rounded-full border border-border px-3 text-xs hover:border-accent">
                                        {c.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>

            <section aria-labelledby="more" className="container-custom mt-20">
                <h2 id="more" className="font-display text-3xl">
                    More from the studio
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {others.map((o) => {
                        const m = o.image.media ? getMedia(o.image.media) : null;
                        return (
                            <li key={o.slug}>
                                <Link href={`/services/${o.slug}`} className="group block overflow-hidden rounded-2xl border border-border bg-card">
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
