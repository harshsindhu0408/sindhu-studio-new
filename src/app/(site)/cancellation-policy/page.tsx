import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalTable, type LegalSection } from "@/components/legal/LegalPage";
import { CancellationCalculator } from "@/components/legal/CancellationCalculator";
import { business, cancellationTiers, paymentTerms } from "@/data/business";

const UPDATED = "20 October 2026";

export const metadata: Metadata = {
    title: "Cancellation & Refund Policy",
    description: `${business.name} cancellation, rescheduling and refund rules, with a calculator to see exactly what cancelling would cost for your date.`,
    alternates: { canonical: "/cancellation-policy" },
};

const sections: LegalSection[] = [
    {
        id: "by-you",
        title: "If you cancel",
        summary: ["The earlier you tell us, the more flexibility you have."],
        body: (
            <>
                <LegalTable
                    head={["When you cancel", "What you pay", "Can you move the date?"]}
                    rows={cancellationTiers.map((t) => [t.label + " the event", `${t.chargePercent}% of the total${t.chargePercent === paymentTerms.bookingPercent ? " (the booking amount)" : ""}`, t.transferable ? "Yes, once" : "At our discretion"])}
                />
                <p>
                    The booking amount ({paymentTerms.bookingPercent}% of the total) reserves your date and turns away other families, so it is non-refundable. Anything you have paid
                    above the amount due is refunded.
                </p>
            </>
        ),
    },
    {
        id: "reschedule",
        title: "Moving to a new date",
        summary: ["Tell us more than 60 days before and we'll move your booking once, if the new date is free."],
        body: (
            <p>
                If you tell us more than 60 days before the event, we will move your booking to a new date once, subject to availability, with your payments carried over. If the new
                date is in a different season or year, current prices may apply to any change in package or add-ons.
            </p>
        ),
    },
    {
        id: "by-us",
        title: "If we cancel",
        summary: ["You get 100% of your money back."],
        body: <p>If we have to cancel for any reason within our control, we refund 100% of all amounts you have paid.</p>,
    },
    {
        id: "force-majeure",
        title: "Events outside anyone's control",
        body: (
            <p>
                If the event can&apos;t go ahead because of something outside your and our control (natural disaster, epidemic, government orders or similar), we will move your booking to
                a new date with all payments carried over. If no new date works, contact us and we&apos;ll agree a fair settlement for work already done.
            </p>
        ),
    },
    {
        id: "how-refunds",
        title: "How refunds are paid",
        summary: ["Refunds go back to your bank or UPI within 7–10 working days."],
        body: (
            <p>
                Refunds are paid to the original bank account or UPI ID within 7–10 working days of the cancellation being confirmed in writing (WhatsApp or email is fine). Cash payments
                are refunded by bank transfer.
            </p>
        ),
    },
    {
        id: "how-to-cancel",
        title: "How to cancel or reschedule",
        body: (
            <p>
                Message us on WhatsApp at {business.phones[0].display} or email <a href={`mailto:${business.email}`}>{business.email}</a> with your name and event date. The date we
                receive your message is the date used to work out the charges above. These rules are part of our <Link href="/terms">Terms &amp; Conditions</Link>.
            </p>
        ),
    },
];

export default function CancellationPage() {
    return (
        <LegalPage
            title="Cancellation & Refund Policy"
            path="/cancellation-policy"
            updated={UPDATED}
            intro={<p>Plans change. Here is exactly what happens if yours do, with a calculator so there are no surprises.</p>}
            inShort={[
                `The booking amount (${paymentTerms.bookingPercent}%) is non-refundable.`,
                "More than 60 days' notice: move your booking to a new date once, free.",
                "Less than 30 days: 50% of the total is payable.",
                "If we cancel, you get 100% back.",
            ]}
            sections={[
                {
                    id: "calculator",
                    title: "Check your date",
                    body: <CancellationCalculator />,
                },
                ...sections,
            ]}
            related={[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Delivery Policy", href: "/delivery-policy" },
            ]}
        />
    );
}
