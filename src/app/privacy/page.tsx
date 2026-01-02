import { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Sindhu Studio's privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24">
            {/* Page Header */}
            <section className="section-padding pb-12">
                <div className="container-custom">
                    <SectionWrapper className="mx-auto max-w-3xl text-center">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                            Legal
                        </p>
                        <h1 className="font-display text-5xl font-medium md:text-6xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-6 text-foreground-muted">
                            Last updated: January 2, 2026
                        </p>
                    </SectionWrapper>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding pt-0">
                <div className="container-custom">
                    <div className="mx-auto max-w-3xl">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <SectionWrapper>
                                <div className="space-y-8">
                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            Introduction
                                        </h2>
                                        <p className="mt-4 text-foreground-muted">
                                            At Sindhu Studio (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed
                                            to protecting your privacy. This Privacy Policy explains
                                            how we collect, use, disclose, and safeguard your
                                            information when you visit our website or use our
                                            photography services.
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            Information We Collect
                                        </h2>
                                        <div className="mt-4 space-y-4 text-foreground-muted">
                                            <p>
                                                We may collect information about you in various ways,
                                                including:
                                            </p>
                                            <h3 className="font-display text-lg font-medium text-foreground">
                                                Personal Data
                                            </h3>
                                            <p>
                                                When you contact us or book our services, we may collect
                                                personally identifiable information such as your name,
                                                email address, phone number, and mailing address.
                                            </p>
                                            <h3 className="font-display text-lg font-medium text-foreground">
                                                Photography and Media
                                            </h3>
                                            <p>
                                                As part of our photography services, we will capture
                                                photographs and videos of you and your event. These
                                                images are subject to our service agreement and usage
                                                rights.
                                            </p>
                                            <h3 className="font-display text-lg font-medium text-foreground">
                                                Usage Data
                                            </h3>
                                            <p>
                                                We may automatically collect certain information about
                                                your device and your use of our website, including your
                                                IP address, browser type, and pages visited.
                                            </p>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            How We Use Your Information
                                        </h2>
                                        <div className="mt-4 space-y-4 text-foreground-muted">
                                            <p>We use the information we collect to:</p>
                                            <ul className="list-disc space-y-2 pl-6">
                                                <li>Provide, maintain, and improve our services</li>
                                                <li>Process bookings and transactions</li>
                                                <li>
                                                    Communicate with you about our services, including
                                                    updates and promotions
                                                </li>
                                                <li>
                                                    Display our work in our portfolio (with your consent)
                                                </li>
                                                <li>Respond to your inquiries and provide support</li>
                                                <li>
                                                    Comply with legal obligations and protect our rights
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            Sharing Your Information
                                        </h2>
                                        <div className="mt-4 space-y-4 text-foreground-muted">
                                            <p>
                                                We do not sell, trade, or otherwise transfer your
                                                personally identifiable information to outside parties
                                                except in the following circumstances:
                                            </p>
                                            <ul className="list-disc space-y-2 pl-6">
                                                <li>
                                                    With your explicit consent for portfolio or marketing
                                                    purposes
                                                </li>
                                                <li>
                                                    To trusted third-party service providers who assist us
                                                    in operating our business
                                                </li>
                                                <li>
                                                    When required by law or to protect our legal rights
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            Image Usage Rights
                                        </h2>
                                        <p className="mt-4 text-foreground-muted">
                                            By engaging our services, you grant Sindhu Studio the
                                            non-exclusive right to use photographs from your session
                                            for promotional purposes, including our website, social
                                            media, and marketing materials, unless otherwise specified
                                            in writing. You may request to opt out of promotional
                                            usage at any time.
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            Data Security
                                        </h2>
                                        <p className="mt-4 text-foreground-muted">
                                            We implement appropriate security measures to protect your
                                            personal information against unauthorized access,
                                            alteration, disclosure, or destruction. However, no method
                                            of transmission over the Internet is 100% secure, and we
                                            cannot guarantee absolute security.
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            Your Rights
                                        </h2>
                                        <div className="mt-4 space-y-4 text-foreground-muted">
                                            <p>You have the right to:</p>
                                            <ul className="list-disc space-y-2 pl-6">
                                                <li>Access the personal information we hold about you</li>
                                                <li>Request correction of inaccurate information</li>
                                                <li>
                                                    Request deletion of your personal information (subject
                                                    to legal requirements)
                                                </li>
                                                <li>Opt out of marketing communications</li>
                                                <li>Withdraw consent for portfolio usage</li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            Cookies
                                        </h2>
                                        <p className="mt-4 text-foreground-muted">
                                            Our website may use cookies to enhance your browsing
                                            experience. You can choose to disable cookies through your
                                            browser settings, though this may affect some
                                            functionality of the website.
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            Changes to This Policy
                                        </h2>
                                        <p className="mt-4 text-foreground-muted">
                                            We may update this Privacy Policy from time to time. We
                                            will notify you of any changes by posting the new Privacy
                                            Policy on this page and updating the &quot;Last updated&quot; date.
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="font-display text-2xl font-medium">
                                            Contact Us
                                        </h2>
                                        <p className="mt-4 text-foreground-muted">
                                            If you have any questions about this Privacy Policy,
                                            please contact us at:
                                        </p>
                                        <div className="mt-4 rounded-lg border border-border bg-card p-6">
                                            <p className="font-medium">Sindhu Studio</p>
                                            <p className="text-foreground-muted">
                                                Email: privacy@sindhustudio.com
                                            </p>
                                            <p className="text-foreground-muted">
                                                Phone: +91 98765 43210
                                            </p>
                                            <p className="text-foreground-muted">
                                                Address: 123 Creative Lane, Photography District, Mumbai
                                                400001
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </SectionWrapper>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
