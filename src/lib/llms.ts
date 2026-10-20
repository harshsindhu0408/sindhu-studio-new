import { business, cancellationTiers, deliveryTimeline, fullAddress, paymentTerms, SITE_URL } from "@/data/business";
import { packages, comparableFeatures, universalFeatures, isIncluded, type FeatureValue } from "@/data/packages";
import { addOns, addOnFromPrice, addOnUnitLabel } from "@/data/addons";
import { generalFaqs, packageFaqs } from "@/data/faqs";
import { mediaCategories } from "@/data/media";
import { services } from "@/data/services";
import { muhuratMonths, muhuratCount2027 } from "@/data/muhurat";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function valueText(v: FeatureValue) {
    if (v === true) return "included";
    if (v === false) return "not included";
    if (typeof v === "object") return "available as add-on";
    return String(v);
}

/** Short llms.txt: who we are, key facts and links (https://llmstxt.org). */
export function llmsTxt() {
    return `# ${business.name}

> ${business.description}

- Location: ${fullAddress}
- Phone / WhatsApp: ${business.phones.map((p) => p.display).join(", ")}
- Email: ${business.email}
- Hours: ${business.hours.display}
- Founded: ${business.foundingYear} by ${business.founder.name}
- Areas served: ${business.areaServed.join(", ")}
- Wedding packages: ${inr(packages[0].price)} to ${inr(packages[packages.length - 1].price)} (${packages.map((p) => `${p.name} ${inr(p.price)}`).join(", ")})
- Booking: ${paymentTerms.bookingPercent}% of the total reserves the date

## Key pages

- [Wedding packages and full comparison](${SITE_URL}/packages): all 6 packages with prices and what each includes
- [Quote builder](${SITE_URL}/build): pick a package and add-ons, see the exact total
- [Add-ons](${SITE_URL}/add-ons): drone, LED wall, candid, cinematic film, live stream, pre-wedding, Kuan Poojan
- [Portfolio](${SITE_URL}/portfolio): ${mediaCategories.map((c) => c.title.toLowerCase()).join(", ")}
- [Shaadi planner](${SITE_URL}/plan): plan functions and dates, get a package recommendation
- [Vivah muhurat 2026–27](${SITE_URL}/vivah-muhurat-2027): ${muhuratCount2027} shubh wedding dates in 2027 with availability
- [Services](${SITE_URL}/services): ${services.map((s) => s.name.toLowerCase()).join(", ")}
- [Hindi version](${SITE_URL}/hi)
- [Contact](${SITE_URL}/contact)
- [Terms](${SITE_URL}/terms), [Cancellation & refunds](${SITE_URL}/cancellation-policy), [Privacy](${SITE_URL}/privacy)

## Optional

- [Full details for AI assistants](${SITE_URL}/llms-full.txt): every package feature, add-on price, policy and FAQ
`;
}

/** Long version: everything an assistant needs to answer pricing and policy questions accurately. */
export function llmsFullTxt() {
    const pkgBlocks = packages
        .map((p) => {
            const included = comparableFeatures.filter((f) => isIncluded(p.values[f.id])).map((f) => `  - ${f.label}: ${valueText(p.values[f.id])}`);
            const asAddOn = comparableFeatures.filter((f) => typeof p.values[f.id] === "object").map((f) => f.label);
            return `### ${p.name}: ${inr(p.price)}${p.popular ? " (most chosen)" : ""}
${p.summary}
- Included:
${included.join("\n")}
${asAddOn.length ? `- Available as add-ons: ${asAddOn.join(", ")}` : "- Everything above is included"}`;
        })
        .join("\n\n");

    return `${llmsTxt()}
---

## Every package includes

${[...universalFeatures.map((f) => `- ${f.universal!.label}`), "- 14×40 printed album with leather cover"].join("\n")}

## Packages

${pkgBlocks}

## Add-ons

${addOns.map((a) => `- ${a.name}: ${a.pricing.type === "tiered" ? a.pricing.tiers.map((t) => `${t.label} ${inr(t.price)}`).join(", ") : `${inr(addOnFromPrice(a))}${addOnUnitLabel(a) ? ` ${addOnUnitLabel(a)}` : ""}`}. ${a.description}`).join("\n")}

## Payment

${paymentTerms.schedule.map((s) => `- ${s.percent}% ${s.when}`).join("\n")}
- Methods: ${paymentTerms.methods.join(", ")}
- ${paymentTerms.gstNote}
- Travel and stay are extra for events outside ${business.address.locality}.

## Cancellation

${cancellationTiers.map((t) => `- ${t.label}: ${t.outcome}`).join("\n")}
- If the studio cancels: 100% refund.

## Delivery

${deliveryTimeline.map((d) => `- ${d.item}: ${d.time}`).join("\n")}

## Services

${services.map((s) => `### ${s.name}\n${s.answer}\n${SITE_URL}/services/${s.slug}`).join("\n\n")}

## Vivah muhurat dates (Delhi panchang; confirm with your pandit)

${muhuratMonths.map((m) => `- ${m.key}: ${m.dates.length ? m.dates.map((d) => Number(d.iso.slice(8))).join(", ") : "none"}`).join("\n")}

## FAQ

${[...generalFaqs, ...packageFaqs].map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}
`;
}
