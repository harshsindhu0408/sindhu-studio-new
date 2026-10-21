import { getAddOn, addOnPrice, maxQty, type AddOnId } from "@/data/addons";
import { packages, addOnCoverage, isIncluded, type FeatureId, type Package, type PackageId } from "@/data/packages";

export interface Requirement {
    /** Must be covered by the package or bought as this add-on */
    addOn?: AddOnId;
    /** Must be included in the package (no add-on exists) */
    feature?: FeatureId;
}

export interface Fit {
    pkg: Package;
    total: number;
    extras: { id: AddOnId; price: number }[];
}

/** Every package that can satisfy the requirements, with its total including the add-ons it's missing. */
export function evaluatePackages(reqs: Requirement[]): Fit[] {
    const fits: Fit[] = [];
    for (const pkg of packages) {
        const extras: Fit["extras"] = [];
        let possible = true;
        for (const r of reqs) {
            if (r.addOn) {
                const a = getAddOn(r.addOn);
                if (addOnCoverage(pkg, a) === "none" && !extras.some((e) => e.id === a.id)) extras.push({ id: a.id, price: addOnPrice(a, 1) });
            } else if (r.feature && !isIncluded(pkg.values[r.feature])) {
                possible = false;
            }
        }
        if (possible) fits.push({ pkg, extras, total: pkg.price + extras.reduce((s, e) => s + e.price, 0) });
    }
    return fits;
}

/** Lowest total wins; on a tie, the higher package (more included for the same money). */
export function cheapestFit(reqs: Requirement[]): Fit | undefined {
    const order = (id: PackageId) => packages.findIndex((p) => p.id === id);
    return [...evaluatePackages(reqs)].sort((a, b) => a.total - b.total || order(b.pkg.id) - order(a.pkg.id))[0];
}

/**
 * The most complete package whose total (add-ons included) stays within budget.
 * Falls back to the cheapest fit when nothing is affordable.
 */
export function bestFitWithin(reqs: Requirement[], max: number): Fit | undefined {
    const affordable = evaluatePackages(reqs).filter((f) => f.total <= max);
    return affordable.length ? affordable[affordable.length - 1] : cheapestFit(reqs);
}

export function bestFit(reqs: Requirement[]): Fit | undefined {
    const fits = evaluatePackages(reqs);
    return fits[fits.length - 1];
}

export interface QtyRequirement {
    addOn: AddOnId;
    /** Days (or units) wanted in total */
    qty: number;
}

export interface QtyFit {
    pkg: Package;
    total: number;
    extras: { id: AddOnId; qty: number; price: number }[];
}

/**
 * Like cheapestFit, but per-day add-ons are priced for every day not covered:
 * "Wedding day" coverage covers one day, "All functions" covers them all.
 */
export function cheapestFitWithQty(reqs: QtyRequirement[]): QtyFit | undefined {
    const order = (id: PackageId) => packages.findIndex((p) => p.id === id);
    const fits: QtyFit[] = packages.map((pkg) => {
        const extras: QtyFit["extras"] = [];
        for (const r of reqs) {
            const a = getAddOn(r.addOn);
            const coverage = addOnCoverage(pkg, a);
            const value = a.feature ? pkg.values[a.feature] : undefined;
            const covered = coverage === "full" ? r.qty : coverage === "partial" ? (typeof value === "number" ? value : 1) : 0;
            const qty = Math.min(Math.max(0, r.qty - covered), maxQty(a));
            if (qty > 0) extras.push({ id: a.id, qty, price: addOnPrice(a, qty) });
        }
        return { pkg, extras, total: pkg.price + extras.reduce((s, e) => s + e.price, 0) };
    });
    return fits.sort((a, b) => a.total - b.total || order(b.pkg.id) - order(a.pkg.id))[0];
}
