import { addOns, addOnPrice, getAddOn, isAddOnId, maxQty, type AddOn, type AddOnId } from "@/data/addons";
import { addOnCoverage, getPackage, nextPackage, upgradeBetween, type Package, type PackageId } from "@/data/packages";
import { paymentTerms } from "@/data/business";

export interface QuoteState {
    packageId: PackageId | null;
    addOns: Partial<Record<AddOnId, number>>;
}

export const emptyQuote: QuoteState = { packageId: null, addOns: {} };

/** URL format: ?p=gold&a=drone,candid*2,led-43*2 */
export function parseQuote(params: { p?: string | null; a?: string | null }): QuoteState {
    const pkg = params.p ? getPackage(params.p) : undefined;
    const selected: QuoteState["addOns"] = {};
    for (const token of (params.a ?? "").split(",").filter(Boolean)) {
        const [id, rawQty] = token.split("*");
        if (!isAddOnId(id)) continue;
        const addOn = getAddOn(id);
        const qty = Math.min(Math.max(parseInt(rawQty ?? "1", 10) || 1, 1), maxQty(addOn));
        selected[id] = qty;
    }
    return { packageId: pkg?.id ?? null, addOns: selected };
}

export function serializeQuote(q: QuoteState): string {
    const params = new URLSearchParams();
    if (q.packageId) params.set("p", q.packageId);
    const a = Object.entries(q.addOns)
        .filter(([, qty]) => qty && qty > 0)
        .map(([id, qty]) => (qty === 1 ? id : `${id}*${qty}`))
        .join(",");
    if (a) params.set("a", a);
    return params.toString();
}

export interface QuoteLine {
    addOn: AddOn;
    qty: number;
    price: number;
    label: string;
}

export interface QuoteSummary {
    pkg: Package | undefined;
    lines: QuoteLine[];
    addOnTotal: number;
    total: number;
    bookingAmount: number;
    /** Set when the add-ons cost as much as the jump to the next package, which includes them. */
    smartSwitch?: { to: Package; covered: AddOn[]; extra: number; coveredValue: number };
}

export function qtyLabel(addOn: AddOn, qty: number, locale: "en" | "hi" = "en") {
    if (addOn.pricing.type === "per-day") return locale === "hi" ? `${qty} दिन` : `${qty} day${qty > 1 ? "s" : ""}`;
    if (addOn.pricing.type === "tiered") return locale === "hi" ? `${qty} स्क्रीन` : addOn.pricing.tiers.find((t) => t.qty === qty)?.label ?? "";
    return "";
}

export function summarizeQuote(q: QuoteState): QuoteSummary {
    const pkg = q.packageId ? getPackage(q.packageId) : undefined;

    const lines: QuoteLine[] = addOns
        .filter((a) => (q.addOns[a.id] ?? 0) > 0 && addOnCoverage(pkg, a) !== "full")
        .map((addOn) => {
            const qty = q.addOns[addOn.id]!;
            return { addOn, qty, price: addOnPrice(addOn, qty), label: qtyLabel(addOn, qty) };
        });

    const addOnTotal = lines.reduce((s, l) => s + l.price, 0);
    const total = (pkg?.price ?? 0) + addOnTotal;
    const bookingAmount = Math.round((total * paymentTerms.bookingPercent) / 100);

    let smartSwitch: QuoteSummary["smartSwitch"];
    const next = pkg && nextPackage(pkg);
    if (pkg && next) {
        const up = upgradeBetween(pkg, next);
        const covered = lines.filter((l) => addOnCoverage(next, l.addOn) !== "none").map((l) => l.addOn);
        const coveredValue = lines.filter((l) => covered.includes(l.addOn)).reduce((s, l) => s + l.price, 0);
        if (covered.length >= 2 && coveredValue >= up.extra * 0.9) {
            smartSwitch = { to: next, covered, extra: up.extra, coveredValue };
        }
    }

    return { pkg, lines, addOnTotal, total, bookingAmount, smartSwitch };
}

export function formatINR(n: number) {
    return `₹${n.toLocaleString("en-IN")}`;
}

/** "₹1.5 lakh" style, for headings and prose. */
export function formatLakh(n: number) {
    if (n < 100000) return formatINR(n);
    const lakh = n / 100000;
    return `₹${Number.isInteger(lakh) ? lakh : lakh.toFixed(lakh < 10 ? 2 : 1).replace(/\.?0+$/, "")} lakh`;
}

export function quoteRef(q: QuoteState) {
    // Short, stable reference so the studio can match a WhatsApp message to a saved lead.
    let h = 0;
    const s = serializeQuote(q);
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return `SS-${h.toString(36).toUpperCase().slice(0, 6).padStart(6, "0")}`;
}

export function quoteWhatsAppMessage(q: QuoteState, opts: { url: string; name?: string; date?: string; functions?: string }) {
    const s = summarizeQuote(q);
    const lines = [
        "🙏 Namaste Sindhu Studio,",
        "I'd like to book with this quote:",
        "",
        `Quote: ${quoteRef(q)}`,
        s.pkg ? `Package: ${s.pkg.name} (${formatINR(s.pkg.price)})` : "Add-ons only",
        ...s.lines.map((l) => `+ ${l.addOn.name}${l.label ? ` × ${l.label}` : ""} (${formatINR(l.price)})`),
        `Total: ${formatINR(s.total)}`,
    ];
    if (opts.date) lines.push(`Event date: ${opts.date}`);
    if (opts.functions) lines.push(`Functions: ${opts.functions}`);
    if (opts.name) lines.push(`Name: ${opts.name}`);
    lines.push("", `Quote link: ${opts.url}`);
    return lines.join("\n");
}
