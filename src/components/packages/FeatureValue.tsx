import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { getAddOn, addOnFromPrice, addOnUnitLabel } from "@/data/addons";
import { valueToHindi, type FeatureId, type FeatureValue as Value, type PackageId } from "@/data/packages";
import { formatINR } from "@/lib/quote";
import { getDictionary, localePath, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

function quantityText(feature: FeatureId, n: number, locale: Locale) {
    if (feature === "ledWall") return locale === "hi" ? `${n} वॉल` : n === 1 ? "1 wall" : `${n} walls`;
    return String(n);
}

/**
 * One cell of the comparison. Colour never carries meaning alone:
 * included = icon + word, missing = dash + "Not included", add-on = price link.
 */
export function FeatureValue({
    feature,
    value,
    packageId,
    align = "center",
    locale = "en",
}: {
    feature: FeatureId;
    value: Value;
    packageId: PackageId;
    align?: "center" | "start";
    locale?: Locale;
}) {
    const t = getDictionary(locale).common;
    const wrap = cn("flex items-center gap-1.5 text-sm", align === "center" ? "justify-center text-center" : "justify-start text-left");

    if (value === true) {
        return (
            <span className={wrap}>
                <Check className="h-4 w-4 shrink-0 text-success" aria-hidden />
                <span>{t.included}</span>
            </span>
        );
    }
    if (value === false) {
        return (
            <span className={cn(wrap, "text-foreground-muted/70")}>
                <Minus className="h-4 w-4 shrink-0" aria-hidden />
                <span className="sr-only">{t.notIncluded}</span>
            </span>
        );
    }
    if (typeof value === "object") {
        const addOn = getAddOn(value.addOn);
        const unit = addOnUnitLabel(addOn);
        return (
            <span className={wrap}>
                <Link
                    href={`${localePath(locale, "/build")}?p=${packageId}&a=${addOn.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-foreground-muted transition-colors hover:border-accent hover:text-accent"
                >
                    <Plus className="h-3 w-3" aria-hidden />
                    <span className="tabular">{formatINR(addOnFromPrice(addOn))}</span>
                    {unit === "per day" && <span>{t.perDay.replace(" ", "")}</span>}
                    <span className="sr-only">
                        : {t.notIncluded}, {t.add} {locale === "hi" ? addOn.nameHi : addOn.name}
                    </span>
                </Link>
            </span>
        );
    }
    const text = typeof value === "number" ? quantityText(feature, value, locale) : locale === "hi" ? valueToHindi(value) : value;
    return (
        <span className={wrap}>
            <Check className="h-4 w-4 shrink-0 text-success" aria-hidden />
            <span>{text}</span>
        </span>
    );
}
