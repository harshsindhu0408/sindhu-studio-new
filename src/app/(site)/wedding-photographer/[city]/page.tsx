import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Car, MapPin, Navigation } from "lucide-react";
import { cities, getCity, cityHasProof } from "@/data/cities";
import { packages, lowestPrice } from "@/data/packages";
import { services } from "@/data/services";
import { featuredMedia, getMedia } from "@/data/media";
import { business, fullAddress, SITE_URL, whatsappLink } from "@/data/business";
import { formatINR } from "@/lib/quote";
import { getWeddings } from "@/lib/content";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
    return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city } = await params;
    const c = getCity(city);
    if (!c) return {};
    const title = `Wedding Photographer in ${c.name}`;
    const description = `${business.name} covers weddings in ${c.name}${c.distanceKm ? `, about ${c.distanceKm} km from our Rohtak studio` : ""}. Packages from ${formatINR(lowestPrice)} with candid, cinematic films, drone and LED screens. See prices and build your quote.`;
    return {
        title,
        description,
        alternates: { canonical: `/wedding-photographer/${c.slug}` },
        // Thin city pages are doorway pages: keep them out of Google until there's real local proof
        robots: cityHasProof(c) ? undefined : { index: false, follow: true },
        openGraph: { title, description, url: `/wedding-photographer/${c.slug}` },
    };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const c = getCity(city);
    if (!c) notFound();

    const weddings = (await getWeddings()).filter((w) => w.city?.toLowerCase().includes(c.name.toLowerCase().split(" ")[0]));
    const hero = getMedia(["bride-entry-sparklers-red-lehenga", "varmala-couple-night-venue", "couple-varmala-garlands-chandelier"][cities.indexOf(c) % 3]);
    const photos = featuredMedia.slice(0, 6);
    const isHome = Boolean(c.home);

    const faqs = [
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
            answer: `From ${formatINR(packages[0].price)} (Silver) to ${formatINR(packages[packages.length - 1].price)} (Exclusive)${isHome ? "" : ", plus travel"}. Every package includes full HD photos and video, a printed album and LED screens at the venue.`,
        },
    ];

    return (
        <div className="pb-24">
            <JsonLd data={faqSchema(faqs)} />
            <JsonLd data={breadcrumbSchema([{ name: "Areas", path: "/wedding-photographer/rohtak" }, { name: c.name, path: `/wedding-photographer/${c.slug}` }])} />
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
                        <MapPin className="h-4 w-4" aria-hidden /> {c.region}
                        <span lang="hi" className="font-hindi text-sm normal-case tracking-normal text-[#F2A93B]">
                            · {c.nameHi}
                        </span>
                    </p>
                    <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
                        Wedding photographer in <span className="italic text-[#E8C785]">{c.name}</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-[#F5EFE6]/85">{c.note}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/plan" className="btn btn-primary">
                            Plan my wedding <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <a href={whatsappLink(`Namaste! Are you available for a wedding in ${c.name}?`)} target="_blank" rel="noopener noreferrer" className="btn border border-[#F5EFE6]/40 text-[#F5EFE6] hover:border-[#E8C785]">
                            <WhatsAppIcon className="h-4 w-4" /> Check my date
                        </a>
                    </div>
                </div>
            </section>

            <section className="container-custom mt-12 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-5">
                    <Car className="h-5 w-5 text-accent" aria-hidden />
                    <p className="mt-3 text-sm text-foreground-muted">From our studio</p>
                    <p className="font-display text-2xl">{isHome ? "Right here" : `~${c.distanceKm} km`}</p>
                    <p className="text-sm text-foreground-muted">{c.driveTime}</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                    <Navigation className="h-5 w-5 text-accent" aria-hidden />
                    <p className="mt-3 text-sm text-foreground-muted">Travel</p>
                    <p className="font-display text-2xl">{isHome ? "No travel charge" : "Quoted upfront"}</p>
                    <p className="text-sm text-foreground-muted">{isHome ? "Within Rohtak" : "Same package prices as Rohtak"}</p>
                </div>
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent">
                    <MapPin className="h-5 w-5 text-accent" aria-hidden />
                    <p className="mt-3 text-sm text-foreground-muted">Visit the studio</p>
                    <p className="font-display text-xl">Delhi Road, Rohtak</p>
                    <p className="text-sm text-accent">Get directions →</p>
                </a>
            </section>

            {(c.weddingsShot || c.venues?.length || weddings.length > 0) && (
                <section className="container-custom mt-12 rounded-3xl border border-accent/40 bg-accent/[0.06] p-6 md:p-8">
                    <h2 className="font-display text-2xl">Our work in {c.name}</h2>
                    {c.weddingsShot ? <p className="mt-2 text-foreground-muted">{c.weddingsShot}+ weddings covered in {c.name}.</p> : null}
                    {c.venues?.length ? <p className="mt-2 text-foreground-muted">Venues we&apos;ve shot at: {c.venues.join(", ")}.</p> : null}
                    {weddings.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {weddings.map((w) => (
                                <li key={w.slug}>
                                    <Link href={`/weddings/${w.slug}`} className="inline-flex min-h-9 items-center rounded-full border border-border px-3 text-sm hover:border-accent">
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
                        Packages for {c.name} weddings
                    </h2>
                    <Link href="/packages#compare" className="text-sm text-accent hover:underline">
                        Compare all →
                    </Link>
                </div>
                <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                    {packages.map((p) => (
                        <li key={p.id}>
                            <Link href={`/build?p=${p.id}`} className={`block h-full rounded-2xl border bg-card p-4 transition-colors hover:border-accent ${p.popular ? "border-accent" : "border-border"}`}>
                                <p className="font-display text-xl">{p.name}</p>
                                <p className="tabular mt-1 font-semibold">{formatINR(p.price)}</p>
                                <p className="mt-2 text-xs text-foreground-muted">{p.highlights.slice(0, 2).join(" · ")}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
                {!isHome && <p className="mt-3 text-sm text-foreground-muted">+ travel and stay for the team, quoted before you book.</p>}
            </section>

            <section aria-labelledby="photos" className="container-custom mt-16">
                <h2 id="photos" className="font-display text-3xl md:text-4xl">
                    Our recent work
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
                    Services in {c.name}
                </h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                    {services.map((s) => (
                        <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm hover:border-accent">
                                {s.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="cfaq" className="container-custom mt-16 max-w-3xl">
                <h2 id="cfaq" className="font-display text-3xl">
                    Questions from {c.name} families
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
