import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getMedia } from "@/data/media";
import { whatsappLink } from "@/data/business";
import { localePath, type Locale } from "@/i18n";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const photo = getMedia("bride-red-veil-dramatic-light");

const copy = {
    en: {
        badge: "Wedding season 2026–27",
        title: "Your story deserves",
        titleEm: "to be told beautifully",
        body: "Popular muhurat dates book out first. Build your quote in a minute and check your date with us on WhatsApp.",
        cta: "Build my quote",
        wa: "Check my date",
        waMessage: "Namaste! Is Sindhu Studio available on my wedding date?",
    },
    hi: {
        badge: "शादी का सीज़न 2026–27",
        title: "आपकी कहानी",
        titleEm: "खूबसूरती से कहने लायक है",
        body: "बड़े मुहूर्त की तारीखें सबसे पहले भरती हैं। एक मिनट में कोटेशन बनाएं और WhatsApp पर अपनी तारीख चेक करें।",
        cta: "अपना कोटेशन बनाएं",
        wa: "तारीख चेक करें",
        waMessage: "नमस्ते! क्या Sindhu Studio हमारी शादी की तारीख पर उपलब्ध है?",
    },
};

export function CTABanner({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    return (
        <section className="relative overflow-hidden py-28 text-[#F5EFE6] md:py-40">
            <Image src={photo.src} alt={photo.alt} fill sizes="100vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover object-[50%_30%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#14110F]/95 via-[#14110F]/70 to-[#14110F]/30" />
            <div className="container-custom relative">
                <div className="max-w-2xl">
                    <span className="inline-block rounded-full border border-[#F5EFE6]/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">{c.badge}</span>
                    <h2 className="mt-6 font-display text-4xl font-medium leading-tight md:text-6xl">
                        {c.title} <span className="italic text-[#E8C785]">{c.titleEm}</span>
                    </h2>
                    <p className="mt-6 text-lg text-[#F5EFE6]/80">{c.body}</p>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                        <Link href={localePath(locale, "/build")} className="btn bg-[#E8C785] text-[#14110F] hover:bg-[#F5EFE6]">
                            {c.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <a href={whatsappLink(c.waMessage)} target="_blank" rel="noopener noreferrer" className="btn border border-[#F5EFE6]/40 text-[#F5EFE6] hover:border-[#E8C785] hover:text-[#E8C785]">
                            <WhatsAppIcon className="h-4 w-4" /> {c.wa}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
