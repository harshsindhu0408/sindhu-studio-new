import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalTable, type LegalSection } from "@/components/legal/LegalPage";
import { business, cancellationTiers, deliveryTimeline, fullAddress, paymentTerms } from "@/data/business";

/*
 * Built from the studio's existing terms (booking %, cancellation, delivery, copyright).
 * Have a lawyer review before relying on it, especially limitation of liability.
 */

const UPDATED = "20 October 2026";

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description: `${business.name} booking terms: payment schedule, cancellation and rescheduling, delivery timelines, RAW data, copyright and portfolio use, drone permissions.`,
    alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
    {
        id: "agreement",
        title: "About these terms",
        body: (
            <p>
                These terms apply when you book photography, videography or related services (such as LED screens, live streaming or drone) from {business.legalName}, trading as{" "}
                {business.name}, {fullAddress} (&quot;we&quot;, &quot;us&quot;). &quot;You&quot; means the person who books and pays. Your booking confirmation (package, add-ons, dates,
                venues and price) together with these terms forms our agreement. If the two differ, your booking confirmation wins.
            </p>
        ),
    },
    {
        id: "booking",
        title: "Booking and payment",
        summary: [`Your date is reserved once we receive ${paymentTerms.bookingPercent}% of the total.`, "The rest is paid in two parts: on the event day and before final delivery."],
        body: (
            <>
                <LegalTable head={["When", "How much"]} rows={paymentTerms.schedule.map((s) => [s.when.replace(/^\w/, (c) => c.toUpperCase()), `${s.percent}% of the total`])} />
                <ul>
                    <li>Dates are reserved first come, first served. We can&apos;t hold a date without the booking amount.</li>
                    <li>We accept {paymentTerms.methods.join(", ")}. Please pay only to the accounts we confirm in writing.</li>
                    <li>{paymentTerms.gstNote}</li>
                    <li>Quotes from our website are valid for {paymentTerms.quoteValidityDays} days. Prices on the date you book apply to that booking.</li>
                </ul>
            </>
        ),
    },
    {
        id: "outstation",
        title: "Events outside Rohtak",
        summary: ["Travel and stay for the team are added for outstation events. We tell you the amount before you book."],
        body: (
            <p>
                For events outside {business.address.locality}, travel and accommodation for our team are charged in addition to the package price, as quoted in your booking confirmation.
                Destination weddings are quoted separately.
            </p>
        ),
    },
    {
        id: "cancellation",
        title: "Cancellation and rescheduling",
        summary: ["The booking amount is non-refundable.", "More than 60 days' notice: you can move your booking to a new date once."],
        body: (
            <>
                <LegalTable head={["If you cancel", "What happens"]} rows={cancellationTiers.map((t) => [t.label + " the event", t.outcome])} />
                <p>
                    If <strong>we</strong> have to cancel for any reason within our control, we refund 100% of everything you have paid. Full details, and a calculator, are on our{" "}
                    <Link href="/cancellation-policy">Cancellation &amp; Refund Policy</Link>.
                </p>
            </>
        ),
    },
    {
        id: "coverage",
        title: "Coverage and creative style",
        summary: ["We cover your event in the style shown in our portfolio.", "Live events are unpredictable, so we can't promise every single shot."],
        body: (
            <>
                <p>
                    Photography and film are creative work. We cover your event in the style shown in our portfolio, using our professional judgement about angles, lighting and editing.
                </p>
                <ul>
                    <li>
                        We aim to capture every important moment, but we can&apos;t guarantee specific shots that depend on things outside our control: lighting, weather, timing changes,
                        crowding, or venue restrictions. Share a list of must-have family photos before the day and we&apos;ll prioritise it.
                    </li>
                    <li>Coverage is for the functions, days and hours in your booking. Extra functions or days can be added at our current add-on prices.</li>
                    <li>We are the exclusive professional photography and video team for the functions we cover, unless agreed otherwise in writing.</li>
                </ul>
            </>
        ),
    },
    {
        id: "drone-led",
        title: "Drone, LED screens and live streaming",
        summary: ["Drone flights depend on venue and legal permissions.", "LED screens and live streams need power and, for streaming, internet at the venue."],
        body: (
            <ul>
                <li>
                    Drone shoots follow the Drone Rules, 2021 and the venue&apos;s rules. If flying isn&apos;t permitted at your venue or on the day (for example near airports, in restricted
                    zones or in bad weather), we will tell you as early as possible and either adjust coverage or remove the drone charge.
                </li>
                <li>LED screens and live streaming need a stable power supply at the venue. Live streaming also needs a working internet connection there.</li>
                <li>Live streams are set up as private or unlisted links. Please share the link only with people you trust.</li>
            </ul>
        ),
    },
    {
        id: "delivery",
        title: "Delivery and timelines",
        summary: ["Teaser in 1–2 weeks, full gallery in 4–6 weeks, film and album after you approve the photo selection."],
        body: (
            <>
                <LegalTable head={["What", "When"]} rows={deliveryTimeline.map((d) => [d.item, d.time])} />
                <ul>
                    <li>Album and film timelines start when you have sent your final photo selection and song choices. Delays in selection delay delivery.</li>
                    <li>
                        <strong>&quot;Full HD photos (RAW data)&quot;</strong> in our packages means every photo from your event in full resolution, delivered on your pendrive. Album photos
                        are colour-corrected and retouched.
                    </li>
                    <li>
                        Packages that include <strong>backup</strong> keep a copy of your data for 6 months after delivery. For other packages, please keep your pendrive and make your own
                        backup: after delivery we are not responsible for lost copies.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "copyright",
        title: "Copyright and how you can use your photos",
        summary: ["You can print and share your photos for personal use, forever.", "Commercial use needs our written permission."],
        body: (
            <>
                <p>
                    {business.name} owns the copyright in the photos and videos we create, as the Copyright Act, 1957 provides. You receive a permanent, non-exclusive licence to use them
                    for personal purposes: printing, framing, and sharing with family and on social media. Please credit {business.name} when you post online.
                </p>
                <p>Commercial use (for example in advertising, or selling the images) needs our written permission.</p>
            </>
        ),
    },
    {
        id: "portfolio",
        title: "Use of your photos in our portfolio",
        summary: ["We ask before using your photos in our portfolio, and you can say no."],
        body: (
            <p>
                We would love to show some of your images on our website and social media. We will ask for your consent at booking, and you can refuse, limit it to certain images, or
                withdraw it later. See our <Link href="/privacy#photos">Privacy Policy</Link> for details.
            </p>
        ),
    },
    {
        id: "liability",
        title: "If something goes wrong",
        summary: ["If we can't deliver part of your coverage, you get a fair refund for that part.", "Our liability is limited to what you've paid us."],
        body: (
            <>
                <p>
                    We use professional equipment. If part of your coverage is lost or can&apos;t be delivered because of equipment failure, illness or
                    another reason within our control, we will offer a fair refund for the affected part of the service.
                </p>
                <p>
                    To the extent the law allows, our total liability for any claim relating to a booking is limited to the amount you have paid us for that booking. We are not liable for
                    events outside our reasonable control (&quot;force majeure&quot;), such as natural disasters, epidemics, government orders, strikes or venue closures. In such cases we
                    will work with you to move your booking to a new date.
                </p>
            </>
        ),
    },
    {
        id: "conduct",
        title: "Safety at the event",
        body: (
            <p>
                Our team needs a safe working environment. We may pause coverage if a team member is threatened, harassed or put in danger, and will resume as soon as it is safe.
            </p>
        ),
    },
    {
        id: "law",
        title: "Governing law and disputes",
        summary: ["Talk to us first: most issues are sorted with a phone call."],
        body: (
            <p>
                These terms are governed by the laws of India. Please contact us first so we can try to resolve any issue directly. If we can&apos;t, the courts at {business.jurisdiction}{" "}
                have jurisdiction. Nothing here affects your rights under the Consumer Protection Act, 2019.
            </p>
        ),
    },
    {
        id: "contact",
        title: "Contact",
        body: (
            <p>
                {business.name}, {fullAddress}. Email <a href={`mailto:${business.email}`}>{business.email}</a>, phone{" "}
                <a href={`tel:${business.phones[0].tel}`}>{business.phones[0].display}</a>.
            </p>
        ),
    },
];

export default function TermsPage() {
    return (
        <LegalPage
            title="Terms & Conditions"
            path="/terms"
            updated={UPDATED}
            intro={<p>The rules of our booking, in plain words first and in full below. Please read them before you pay the booking amount.</p>}
            inShort={[
                `Pay ${paymentTerms.bookingPercent}% to book your date, 50% on the event day and the last 25% before final delivery.`,
                "The booking amount is non-refundable. With more than 60 days' notice you can move to a new date once.",
                "Teaser in 1–2 weeks, full gallery in 4–6 weeks, film and album 8–12 weeks after your selection.",
                "You can use your photos for personal use forever. We ask before using them in our portfolio.",
            ]}
            sections={sections}
            related={[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Cancellation & Refunds", href: "/cancellation-policy" },
                { label: "Delivery Policy", href: "/delivery-policy" },
            ]}
        />
    );
}
