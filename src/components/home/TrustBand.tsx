import Image from "next/image";
import { getMedia } from "@/data/media";
import { business, yearsInBusiness } from "@/data/business";
import type { Locale } from "@/i18n";

const bg = getMedia("varmala-couple-night-venue");

export function TrustBand({ locale = "en" }: { locale?: Locale }) {
    const hi = locale === "hi";
    // Only verified numbers: years since founding, families served (confirmed by the owner),
    // the About page's 500-wedding milestone, and the cities in business.areaServed.
    const stats = [
        { value: `${yearsInBusiness}`, label: hi ? `साल, ${business.foundingYear} से` : `years, since ${business.foundingYear}` },
        { value: "2,000+", label: hi ? "परिवारों की यादें" : "families served" },
        { value: "500+", label: hi ? "शादियां कवर" : "weddings covered" },
        { value: `${business.areaServed.length}`, label: hi ? "शहरों में कवरेज" : "cities & regions covered" },
    ];
    return (
        <section className="relative overflow-hidden py-20 text-[#F5EFE6] md:py-28" aria-label={hi ? "हमारे बारे में आंकड़े" : "Studio in numbers"}>
            <Image src={bg.src} alt="" fill sizes="100vw" className="object-cover" placeholder="blur" blurDataURL={bg.blurDataURL} />
            <div className="absolute inset-0 bg-[#14110F]/80" />
            <div className="container-custom relative">
                <p lang="hi" className="text-center font-hindi text-xl text-[#F2A93B]">
                    आपकी यादें, हमारी ज़िम्मेदारी
                </p>
                <ul className="mt-10 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-[#F5EFE6]/15">
                    {stats.map((s) => (
                        <li key={s.label} className="px-4 text-center">
                            <p className="tabular font-display text-5xl text-[#E8C785] md:text-7xl">{s.value}</p>
                            <p className="mt-2 text-sm uppercase tracking-[0.15em] text-[#F5EFE6]/75">{s.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
