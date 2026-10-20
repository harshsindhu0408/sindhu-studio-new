import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import { AddOnMedia } from "./AddOnMedia";
import { addOns, addOnCategories, addOnFromPrice, addOnUnitLabel, activeOffer, addOnPrice, type AddOn } from "@/data/addons";
import { packages, addOnCoverage } from "@/data/packages";
import { services } from "@/data/services";
import { formatINR } from "@/lib/quote";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getDictionary, localePath, type Locale } from "@/i18n";

const copy = {
    en: {
        eyebrow: "Add-ons",
        titleA: "Make your package",
        titleEm: "yours",
        intro: "Add a drone, a giant LED wall, extra days of candid photography or a live stream for family abroad. Prices are fixed and shown upfront, and each add-on shows which packages already include it.",
        standalone: "Book these on their own or alongside a wedding package.",
        includedIn: "Included in",
        partlyIn: "partly in",
        until: "until",
        more: "More about this",
        illustration: "Illustration",
    },
    hi: {
        eyebrow: "ऐड-ऑन",
        titleA: "पैकेज को बनाएं",
        titleEm: "अपने हिसाब से",
        intro: "ड्रोन, बड़ी LED वॉल, कैंडिड फोटोग्राफी के और दिन, या विदेश में बैठे परिवार के लिए लाइव स्ट्रीम जोड़ें। दाम तय हैं और पहले से दिखते हैं, और हर ऐड-ऑन बताता है कि वो किन पैकेज में पहले से शामिल है।",
        standalone: "इन्हें अलग से भी बुक कर सकते हैं, या शादी पैकेज के साथ।",
        includedIn: "शामिल:",
        partlyIn: "आंशिक रूप से:",
        until: "तक",
        more: "इसके बारे में और जानें",
        illustration: "चित्रण",
    },
};

function PriceTag({ addOn, locale }: { addOn: AddOn; locale: Locale }) {
    const t = getDictionary(locale).common;
    const offer = activeOffer(addOn);
    const unit = addOnUnitLabel(addOn);
    return (
        <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="tabular text-2xl font-semibold">
                {addOn.pricing.type === "tiered" ? <span className="text-sm font-normal text-foreground-muted">{t.from} </span> : null}
                {formatINR(addOnFromPrice(addOn))}
            </span>
            {unit === "per day" && <span className="text-sm text-foreground-muted">{t.perDay}</span>}
            {offer && addOn.pricing.type !== "tiered" && (
                <span className="text-xs text-foreground-muted">
                    <s className="tabular">{formatINR(addOn.pricing.price)}</s> · {offer.reason}, {copy[locale].until}{" "}
                    {new Date(offer.endsOn).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short" })}
                </span>
            )}
        </p>
    );
}

function IncludedIn({ addOn, locale }: { addOn: AddOn; locale: Locale }) {
    const c = copy[locale];
    const L = (p: string) => localePath(locale, p);
    const full = packages.filter((p) => addOnCoverage(p, addOn) === "full");
    const partial = packages.filter((p) => addOnCoverage(p, addOn) === "partial");
    if (!full.length && !partial.length) return null;
    return (
        <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-foreground-muted">
            <Check className="h-3.5 w-3.5 text-success" aria-hidden />
            {full.length > 0 && c.includedIn}
            {full.map((p) => (
                <Link key={p.id} href={`${L("/packages")}#pkg-${p.id}`} className="rounded-full bg-success/10 px-2 py-0.5 text-foreground hover:bg-success/20">
                    {p.name}
                </Link>
            ))}
            {partial.length > 0 && (
                <>
                    <span>{full.length > 0 ? "·" : ""} {c.partlyIn}</span>
                    {partial.map((p) => (
                        <Link key={p.id} href={`${L("/packages")}#pkg-${p.id}`} className="rounded-full border border-border px-2 py-0.5 hover:border-accent">
                            {p.name}
                        </Link>
                    ))}
                </>
            )}
        </p>
    );
}

export function AddOnsPage({ locale }: { locale: Locale }) {
    const c = copy[locale];
    const t = getDictionary(locale);
    const hi = locale === "hi";
    const L = (p: string) => localePath(locale, p);

    return (
        <div className="pb-24 pt-28 md:pt-36">
            {!hi && <JsonLd data={breadcrumbSchema([{ name: "Add-ons", path: "/add-ons" }])} />}
            <header className="container-custom mb-16 max-w-3xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{c.eyebrow}</p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
                    {c.titleA} <span className="italic text-accent">{c.titleEm}</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted">{c.intro}</p>
                <Link href={L("/build")} className="btn btn-primary mt-8">
                    {t.common.buildQuote} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
            </header>

            {addOnCategories.map((cat) => {
                const items = addOns.filter((a) => a.category === cat.id);
                if (!items.length) return null;
                return (
                    <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="container-custom mt-16">
                        <h2 id={`cat-${cat.id}`} className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent">
                            {t.addonCategories[cat.id]}
                        </h2>
                        {cat.id === "other-events" && <p className="mt-2 text-sm text-foreground-muted">{c.standalone}</p>}
                        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((a) => {
                                const service = services.find((s) => s.addOn === a.id);
                                const isIllustration = a.media?.src?.includes("/addons/") && ["kuan-poojan", "baby-shoot", "birthday"].includes(a.id);
                                return (
                                    <li key={a.id} id={a.id} className="group flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-border bg-card">
                                        <div className="relative">
                                            <AddOnMedia addOn={a} className="aspect-[4/3]" />
                                            {isIllustration && (
                                                <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/80">{c.illustration}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-1 flex-col p-6">
                                            <div className="flex items-baseline justify-between gap-3">
                                                <h3 className="font-display text-2xl">{hi ? a.nameHi : a.name}</h3>
                                                {!hi && (
                                                    <span lang="hi" className="font-hindi text-sm text-foreground-muted">
                                                        {a.nameHi}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 font-medium text-accent">{hi ? a.pitchHi : a.pitch}</p>
                                            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">{hi ? a.descriptionHi : a.description}</p>
                                            {a.pricing.type === "tiered" && (
                                                <p className="mt-3 text-xs text-foreground-muted">
                                                    {a.pricing.tiers.map((tier) => `${hi ? `${tier.qty} स्क्रीन` : tier.label}: ${formatINR(tier.price)}`).join(" · ")}
                                                </p>
                                            )}
                                            <IncludedIn addOn={a} locale={locale} />
                                            {service && !hi && (
                                                <Link href={`/services/${service.slug}`} className="mt-3 text-xs text-accent underline underline-offset-2">
                                                    {c.more}
                                                </Link>
                                            )}
                                            <div className="mt-6 flex items-center justify-between gap-4 border-t border-dashed border-border pt-5">
                                                <PriceTag addOn={a} locale={locale} />
                                                <Link
                                                    href={`${L("/build")}?a=${a.id}`}
                                                    className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
                                                    aria-label={`${t.common.add} ${hi ? a.nameHi : a.name} (${formatINR(addOnPrice(a))})`}
                                                >
                                                    <Plus className="h-4 w-4" aria-hidden /> {t.common.add}
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
}
