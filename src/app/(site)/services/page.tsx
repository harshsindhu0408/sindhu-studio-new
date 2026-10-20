import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { getMedia } from "@/data/media";
import { business } from "@/data/business";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const title = `Photography & Film Services in ${business.address.locality}`;
const description = `Wedding photography, candid, cinematic films, pre-wedding shoots, drone, LED screens, live streaming, ring ceremony, Kuan Poojan, baby and birthday coverage by ${business.name}, ${business.address.locality}.`;

export const metadata: Metadata = { title, description, alternates: { canonical: "/services" }, openGraph: { title, description, url: "/services" } };

export default function ServicesIndex() {
    return (
        <div className="pb-24 pt-28 md:pt-36">
            <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />
            <header className="container-custom max-w-3xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Services</p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">Everything your wedding needs, from one team</h1>
                <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground-muted">Photography, films, drone, LED screens and live streaming, with every price shown upfront.</p>
            </header>
            <ul className="container-custom mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => {
                    const m = s.image.media ? getMedia(s.image.media) : null;
                    return (
                        <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-background-secondary">
                                <Image src={m?.src ?? s.image.src!} alt={s.image.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                    <p lang="hi" className="font-hindi text-sm text-[#F2A93B]">
                                        {s.nameHi}
                                    </p>
                                    <h2 className="mt-1 font-display text-2xl">{s.name}</h2>
                                    <p className="mt-1 text-sm text-white/80">{s.tagline}</p>
                                    <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
