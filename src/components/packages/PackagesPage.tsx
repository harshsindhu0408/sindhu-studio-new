import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { PackagesExplorer } from "./PackagesExplorer";
import { FaqList } from "@/components/ui/FaqList";
import { packages, universalFeatures, upgradeBetween, lowestPrice, highestPrice } from "@/data/packages";
import { addOns, addOnFromPrice, addOnUnitLabel } from "@/data/addons";
import { business, paymentTerms, whatsappLink } from "@/data/business";
import { packageFaqs, packageFaqsHi } from "@/data/faqs";
import { formatINR } from "@/lib/quote";
import { JsonLd, breadcrumbSchema, faqSchema, packagesSchema } from "@/lib/schema";
import { getDictionary, localePath, type Locale } from "@/i18n";

const copy = {
    en: {
        answer: (
            <>
                {business.name} has six wedding packages in {business.address.locality}, from <strong className="text-foreground">{formatINR(lowestPrice)}</strong> (Silver) to{" "}
                <strong className="text-foreground">{formatINR(highestPrice)}</strong> (Exclusive). All include full HD photos and video, a printed 14×40 album and LED screens at the
                venue. Higher packages add candid photography, cinematic films, drone, an 8×12 LED wall and more functions. Book with {paymentTerms.bookingPercent}% of the total.
            </>
        ),
        ladderEyebrow: "Is the next package worth it?",
        ladderTitle: "What each step up actually gets you",
        ladderIntro: "We've priced every upgrade against our own add-on prices, so you can decide for yourself.",
        youGet: "You get",
        separately: "Booked separately",
        plus: "Plus",
        addonsEyebrow: "Make it yours",
        addonsTitle: "Add exactly what you need",
        seeAllAddons: "See all add-ons",
        builderTitle: "Build your quote in 1 minute",
        builderBody: "Pick a package, add extras, see the total, then send it to us or to your family WhatsApp group.",
        openBuilder: "Open the quote builder",
        faqTitle: "Package questions",
        faqNot: "Not answered here?",
        faqAsk: "Ask us on WhatsApp",
        faqMessage: "Namaste! I have a question about your wedding packages.",
    },
    hi: {
        answer: (
            <>
                {business.address.locality} में {business.name} के छह शादी पैकेज हैं, <strong className="text-foreground">{formatINR(lowestPrice)}</strong> (Silver) से{" "}
                <strong className="text-foreground">{formatINR(highestPrice)}</strong> (Exclusive) तक। सभी में फुल HD फोटो और वीडियो, 14×40 प्रिंटेड एल्बम और वेन्यू पर LED स्क्रीन शामिल है।
                ऊपर के पैकेज में कैंडिड फोटोग्राफी, सिनेमैटिक फ़िल्म, ड्रोन, 8×12 LED वॉल और ज़्यादा कार्यक्रम जुड़ते हैं। कुल राशि का {paymentTerms.bookingPercent}% देकर बुक करें।
            </>
        ),
        ladderEyebrow: "क्या अगला पैकेज लेना सही रहेगा?",
        ladderTitle: "हर अगले पैकेज में असल में क्या मिलता है",
        ladderIntro: "हमने हर अपग्रेड का हिसाब अपने ही ऐड-ऑन के दामों से लगाया है, ताकि आप खुद फ़ैसला कर सकें।",
        youGet: "आपको मिलता है",
        separately: "अलग से लेने पर",
        plus: "साथ में",
        addonsEyebrow: "अपने हिसाब से बनाएं",
        addonsTitle: "जो चाहिए, बस वही जोड़ें",
        seeAllAddons: "सभी ऐड-ऑन देखें",
        builderTitle: "1 मिनट में अपना कोटेशन बनाएं",
        builderBody: "पैकेज चुनें, एक्स्ट्रा जोड़ें, कुल देखें, फिर हमें या परिवार के WhatsApp ग्रुप में भेजें।",
        openBuilder: "कोटेशन बिल्डर खोलें",
        faqTitle: "पैकेज से जुड़े सवाल",
        faqNot: "आपका सवाल यहां नहीं है?",
        faqAsk: "WhatsApp पर पूछें",
        faqMessage: "नमस्ते! मुझे आपके शादी पैकेज के बारे में एक सवाल पूछना है।",
    },
};

function IncludedStrip({ locale }: { locale: Locale }) {
    const t = getDictionary(locale);
    const hi = locale === "hi";
    return (
        <section aria-labelledby="included-title" className="container-custom mt-16">
            <div className="rounded-3xl border border-border bg-background-secondary p-6 md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-sm">
                        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                            <ShieldCheck className="h-4 w-4" aria-hidden /> {t.packages.noMatter}
                        </p>
                        <h2 id="included-title" className="mt-2 font-display text-2xl md:text-3xl">
                            {t.common.everyPackageIncludes}
                        </h2>
                    </div>
                    <ul className="grid flex-1 gap-3 sm:grid-cols-2 md:max-w-2xl">
                        {[...universalFeatures.map((f) => (hi ? f.universal!.labelHi : f.universal!.label)), t.common.albumLeather].map((label) => (
                            <li key={label} className="flex items-start gap-3 text-sm">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                                    <Check className="h-3.5 w-3.5" aria-hidden />
                                </span>
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export function PackagesPage({ locale }: { locale: Locale }) {
    const c = copy[locale];
    const t = getDictionary(locale);
    const hi = locale === "hi";
    const L = (p: string) => localePath(locale, p);
    const upgrades = packages.slice(0, -1).map((p, i) => upgradeBetween(p, packages[i + 1]));
    const faqs = hi ? packageFaqsHi : packageFaqs;

    return (
        <div className="pb-24 pt-28 md:pt-36">
            <JsonLd data={packagesSchema()} />
            <JsonLd data={faqSchema(faqs)} />
            {!hi && <JsonLd data={breadcrumbSchema([{ name: "Wedding Packages", path: "/packages" }])} />}

            <header className="container-custom mb-12 max-w-4xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {t.packages.eyebrow}{" "}
                    {!hi && (
                        <span lang="hi" className="font-hindi normal-case tracking-normal text-sindoor">
                            · साफ़ दाम
                        </span>
                    )}
                </p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">{t.packages.title}</h1>
                {/* Answer block: a self-contained summary written to be quoted by search and AI engines */}
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-foreground-muted">{c.answer}</p>
            </header>

            <PackagesExplorer locale={locale} includesStrip={<IncludedStrip locale={locale} />} />

            {/* The honest upgrade ladder: computed from today's add-on prices */}
            <section aria-labelledby="ladder-title" className="container-custom mt-28">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{c.ladderEyebrow}</p>
                <h2 id="ladder-title" className="mt-3 max-w-3xl font-display text-3xl md:text-5xl">
                    {c.ladderTitle}
                </h2>
                <p className="mt-3 max-w-2xl text-foreground-muted">{c.ladderIntro}</p>
                <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {upgrades.map((u) => (
                        <li key={u.to.id} className="flex flex-col rounded-2xl border border-border bg-card p-5">
                            <p className="text-sm text-foreground-muted">
                                {u.from.name} → <span className="font-display text-lg text-foreground">{u.to.name}</span>
                            </p>
                            <p className="tabular mt-1 text-2xl font-semibold">+{formatINR(u.extra)}</p>
                            {u.priced.length > 0 && (
                                <div className="mt-4 border-t border-dashed border-border pt-4 text-sm">
                                    <p className="font-medium">{c.youGet}</p>
                                    <ul className="mt-2 space-y-1 text-foreground-muted">
                                        {u.priced.map((x) => (
                                            <li key={x.addOn.id} className="flex justify-between gap-2">
                                                <span>{hi ? x.addOn.nameHi : x.addOn.name}</span>
                                                <span className="tabular shrink-0">{formatINR(x.price)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-2 text-xs text-foreground-muted">
                                        {c.separately}: <span className="tabular">{formatINR(u.pricedTotal)}</span>
                                    </p>
                                </div>
                            )}
                            {u.alsoBetter.length > 0 && (
                                <div className="mt-4 border-t border-dashed border-border pt-4 text-sm">
                                    <p className="font-medium">{c.plus}</p>
                                    <ul className="mt-2 space-y-1 text-foreground-muted">
                                        {(hi ? u.alsoBetterHi : u.alsoBetter).map((x) => (
                                            <li key={x}>{x}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </section>

            <section aria-labelledby="addons-title" className="container-custom mt-28">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{c.addonsEyebrow}</p>
                        <h2 id="addons-title" className="mt-3 font-display text-3xl md:text-5xl">
                            {c.addonsTitle}
                        </h2>
                    </div>
                    <Link href={L("/add-ons")} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
                        {c.seeAllAddons} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
                <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {addOns
                        .filter((a) => !a.standalone)
                        .map((a) => (
                            <li key={a.id}>
                                <Link href={`${L("/add-ons")}#${a.id}`} className="block h-full rounded-2xl border border-border bg-card p-4 transition-colors hover:border-accent">
                                    <p className="font-medium">{hi ? a.nameHi : a.name}</p>
                                    <p className="tabular mt-1 text-sm text-foreground-muted">
                                        {a.pricing.type === "tiered" ? `${t.common.from} ` : ""}
                                        {formatINR(addOnFromPrice(a))}
                                        {addOnUnitLabel(a) === "per day" ? ` ${t.common.perDay}` : ""}
                                    </p>
                                </Link>
                            </li>
                        ))}
                </ul>
                <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-accent/40 bg-accent/[0.06] p-8 text-center">
                    <p className="font-display text-2xl md:text-3xl">{c.builderTitle}</p>
                    <p className="max-w-lg text-foreground-muted">{c.builderBody}</p>
                    <Link href={L("/build")} className="btn btn-primary mt-2">
                        {c.openBuilder} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            </section>

            <section aria-labelledby="pfaq-title" className="container-custom mt-28 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <h2 id="pfaq-title" className="font-display text-3xl md:text-4xl">
                        {c.faqTitle}
                    </h2>
                    <p className="mt-3 text-foreground-muted">
                        {c.faqNot}{" "}
                        <a href={whatsappLink(c.faqMessage)} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                            {c.faqAsk}
                        </a>
                        .
                    </p>
                </div>
                <div className="lg:col-span-8">
                    <FaqList items={faqs} defaultOpen={null} />
                </div>
            </section>
        </div>
    );
}
