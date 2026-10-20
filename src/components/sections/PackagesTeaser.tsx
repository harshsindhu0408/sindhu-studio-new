import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { packages, universalFeatures, lowestPrice } from "@/data/packages";
import { formatINR } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { getDictionary, localePath, type Locale } from "@/i18n";

const ptCopy = {
    en: { eyebrow: "Prices, upfront", title: "Wedding packages from", intro: "Most studios make you call for a price. We show all six packages, compare them line by line, and let you build your exact quote.", build: "Build with" },
    hi: { eyebrow: "दाम, पहले से साफ़", title: "शादी पैकेज, शुरुआत", intro: "ज़्यादातर स्टूडियो दाम जानने के लिए कॉल करवाते हैं। हम सभी छह पैकेज दिखाते हैं, लाइन-दर-लाइन तुलना करते हैं, और आपको खुद सही कोटेशन बनाने देते हैं।", build: "चुनें:" },
};

const shown = packages.filter((p) => ["silver", "gold", "platinum"].includes(p.id));

export function PackagesTeaser({ locale = "en" }: { locale?: Locale }) {
    const pc = ptCopy[locale];
    const t = getDictionary(locale);
    const hi = locale === "hi";
    const L = (p: string) => localePath(locale, p);
    return (
        <section id="after-hero" className="section-padding scroll-mt-16">
            <div className="container-custom">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                            {pc.eyebrow} <span lang="hi" className="font-hindi normal-case tracking-normal text-sindoor">· कोई छुपा खर्च नहीं</span>
                        </p>
                        <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl">
                            {pc.title} <span className="tabular italic text-accent">{formatINR(lowestPrice)}</span>
                        </h2>
                        <p className="mt-4 text-foreground-muted">
                            {pc.intro}
                        </p>
                    </div>
                    <Link href={`${L("/packages")}#compare`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent hover:underline">
                        {t.common.compareAll} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>

                <ul className="mt-10 grid gap-4 md:grid-cols-3">
                    {shown.map((p) => (
                        <li key={p.id} className={cn("flex flex-col rounded-2xl border bg-card p-6", p.popular ? "border-accent ring-1 ring-accent/30" : "border-border")}>
                            <div className="flex items-baseline justify-between">
                                <h3 className="font-display text-2xl">{p.name}</h3>
                                {p.popular && <span className="text-[11px] font-bold uppercase tracking-wider text-sindoor">{t.common.mostChosen}</span>}
                            </div>
                            <p className="tabular mt-1 text-2xl font-semibold">{formatINR(p.price)}</p>
                            <ul className="mt-4 flex-1 space-y-2 text-sm">
                                {(hi ? p.highlightsHi : p.highlights).slice(0, 3).map((h) => (
                                    <li key={h} className="flex gap-2">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> {h}
                                    </li>
                                ))}
                            </ul>
                            <Link href={`${L("/build")}?p=${p.id}`} className={cn("btn mt-6 w-full", p.popular ? "btn-primary" : "btn-outline")}>
                                {pc.build} {p.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground-muted">
                    <span className="font-medium text-foreground">{t.common.everyPackageIncludes}:</span>
                    {universalFeatures.map((f) => (
                        <span key={f.id} className="inline-flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-success" aria-hidden /> {hi ? f.universal!.labelHi : f.universal!.label}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}
