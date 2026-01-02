import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions | Sindhu Studio Rohtak",
    description: "Review our service agreement including booking policies, payment terms, cancellation details, and deliverable timelines for photography services.",
    openGraph: {
        title: "Terms & Conditions | Sindhu Studio",
        description: "Official service agreement and policies for Sindhu Studio clients.",
        url: "https://sindhustudio.com/terms",
    },
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container-custom max-w-4xl">
                <header className="mb-16">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        Legal
                    </p>
                    <h1 className="font-display text-4xl font-medium md:text-6xl text-foreground">
                        Terms & Conditions
                    </h1>
                    <p className="mt-4 text-lg text-foreground-muted">
                        Last updated: January 2026. Please read these terms carefully before booking our services.
                    </p>
                </header>

                <div className="space-y-12 text-foreground-muted">
                    <section>
                        <h2 className="mb-4 font-display text-2xl text-foreground">1. Booking & Payments</h2>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>To secure your date, a non-refundable booking fee of <strong>25%</strong> of the total package value is required.</li>
                            <li>The remaining balance is payable as follows: 50% on the day of the event, and the final 25% before the final delivery of photos/videos.</li>
                            <li>Dates are reserved on a first-come, first-served basis. No date is held without the booking fee.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl text-foreground">2. Cancellation & Rescheduling</h2>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>If the Client cancels the booking more than 60 days before the event, the booking fee remains non-refundable but may be transferable to a new date (subject to availability).</li>
                            <li>Cancellations made within 30 days of the event will require 50% payment of the total package cost.</li>
                            <li>In the unlikely event that Sindhu Studio must cancel, 100% of all monies paid will be refunded.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl text-foreground">3. Creative License & Coverage</h2>
                        <p className="mb-2">
                            The Client acknowledges that photography/videography is an art form. Sindhu Studio will capture the event according to their artistic vision and style as shown in the portfolio.
                        </p>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>While we aim to capture all important moments, we cannot guarantee specific shots due to the uncontrolled nature of live events (lighting, guests, weather).</li>
                            <li>Sindhu Studio shall be the exclusive professional photographer/videographer for the event.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl text-foreground">4. Deliverables & Timeline</h2>
                        <ul className="list-disc space-y-2 pl-5">
                            <li><strong>Teaser/Highlights:</strong> Delivered within 1-2 weeks after the event.</li>
                            <li><strong>Full Photo Gallery:</strong> Delivered within 4-6 weeks for selection.</li>
                            <li><strong>Cinematic Films & Albums:</strong> Delivered within 8-12 weeks after final photo selection/song approval.</li>
                            <li>Raw footage/data is generally not provided unless specified in the package (e.g., specific drives provided by client).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4 font-display text-2xl text-foreground">5. Copyright & Usage</h2>
                        <p>
                            Sindhu Studio retains the copyright to all images/videos created. The Client is granted a perpetual, non-exclusive license to use the materials for personal use (printing, sharing on social media). Commercial use requires written permission.
                        </p>
                        <p className="mt-2">
                            Sindhu Studio reserves the right to use select images for self-promotion (website, social media, awards) unless a privacy agreement is signed beforehand.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
