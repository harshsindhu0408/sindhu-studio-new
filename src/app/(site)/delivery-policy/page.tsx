import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalTable } from "@/components/legal/LegalPage";
import { business, deliveryTimeline } from "@/data/business";

export const metadata: Metadata = {
    title: "Delivery Policy",
    description: `How and when ${business.name} delivers your photos, videos, films and printed albums.`,
    alternates: { canonical: "/delivery-policy" },
};

export default function DeliveryPolicyPage() {
    return (
        <LegalPage
            title="Delivery Policy"
            path="/delivery-policy"
            updated="20 October 2026"
            intro={<p>What you receive, how, and when.</p>}
            inShort={["Digital files come on a pendrive (and a download link where needed).", "Albums and frames are collected from our Rohtak studio, or delivered by arrangement."]}
            sections={[
                {
                    id: "timeline",
                    title: "Timelines",
                    body: (
                        <>
                            <LegalTable head={["What", "When"]} rows={deliveryTimeline.map((d) => [d.item, d.time])} />
                            <p>Album and film timelines start once you send your final photo selection and song choices.</p>
                        </>
                    ),
                },
                {
                    id: "digital",
                    title: "Digital delivery",
                    body: (
                        <p>
                            Photos and videos are delivered on the 64 GB pendrive included in every package. For teasers and selections we may also send a private download link,
                            shared only with the contact on your booking.
                        </p>
                    ),
                },
                {
                    id: "physical",
                    title: "Albums and frames",
                    body: (
                        <p>
                            Printed albums and frames can be collected from our studio at {business.address.street}, {business.address.locality}. Delivery to another address can be
                            arranged at cost. Please check your album when you receive it and tell us about any printing defect within 7 days so we can reprint it.
                        </p>
                    ),
                },
                {
                    id: "related",
                    title: "Related policies",
                    body: (
                        <p>
                            See <Link href="/terms#delivery">Terms &amp; Conditions</Link> for what &quot;RAW data&quot; and backup mean, and our{" "}
                            <Link href="/cancellation-policy">Cancellation &amp; Refund Policy</Link>.
                        </p>
                    ),
                },
            ]}
            related={[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Cancellation & Refunds", href: "/cancellation-policy" },
            ]}
        />
    );
}
