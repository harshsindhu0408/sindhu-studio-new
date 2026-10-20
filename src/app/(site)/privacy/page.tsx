import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Trash2, ImageOff } from "lucide-react";
import { LegalPage, LegalTable, type LegalSection } from "@/components/legal/LegalPage";
import { business, fullAddress, whatsappLink } from "@/data/business";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/*
 * Written to the Digital Personal Data Protection Act, 2023 and the rules made under it.
 * Have a lawyer review before relying on it. Retention periods are sensible defaults that
 * the owner should confirm.
 */

const UPDATED = "20 October 2026";
const g = business.grievanceOfficer;

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: `How ${business.name} collects, uses, stores and deletes your personal data, photos and videos, and how to use your rights under India's Digital Personal Data Protection Act, 2023.`,
    alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
    {
        id: "who-we-are",
        title: "Who we are",
        summary: [`${business.name} decides how your data is used, so we're responsible for it.`],
        body: (
            <>
                <p>
                    {business.legalName}, trading as <strong>{business.name}</strong> (&quot;we&quot;, &quot;us&quot;), is a photography and videography studio at {fullAddress}. For the
                    purposes of the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;), we are the <strong>Data Fiduciary</strong> for the personal data described in this policy.
                </p>
                <p>
                    This policy covers our website ({"sindhustudio.com"}), WhatsApp, phone and email conversations with us, and the photography and video services we provide.
                </p>
            </>
        ),
    },
    {
        id: "data-we-collect",
        title: "What we collect and why",
        summary: ["We only collect what we need to plan, shoot and deliver your event.", "Each purpose is listed below with how long we keep the data."],
        body: (
            <>
                <LegalTable
                    head={["Data", "Why we need it", "How long we keep it"]}
                    rows={[
                        [
                            <>
                                <strong>Enquiry details</strong>: name, phone/WhatsApp, email, event date, functions, your quote
                            </>,
                            "To answer your enquiry, check availability and send a quote",
                            "12 months after the last message if you don't book",
                        ],
                        [
                            <>
                                <strong>Booking details</strong>: name, address, phone, event venues and schedule, payment records
                            </>,
                            "To deliver the service, issue invoices and meet tax law",
                            "For the booking, then as long as tax and accounting laws require (currently up to 8 years) for invoices and payment records",
                        ],
                        [
                            <>
                                <strong>Photos and videos</strong> of you, your family and guests
                            </>,
                            "To create, edit and deliver your photos, videos and album",
                            "Until delivery. Packages with backup keep a copy for 6 months after delivery. Then deleted, except images you allow in our portfolio",
                        ],
                        [
                            <>
                                <strong>Website usage</strong>: pages visited, device type, approximate location (only if you accept analytics cookies)
                            </>,
                            "To understand which pages help families plan and improve the site",
                            "Up to 14 months in Google Analytics",
                        ],
                    ]}
                />
                <p>
                    We do <strong>not</strong> collect Aadhaar numbers, bank account details or card details through this website. If you pay online in future, payment details are handled
                    directly by the payment provider, not by us.
                </p>
            </>
        ),
    },
    {
        id: "consent",
        title: "Consent and how to withdraw it",
        summary: ["You choose what you share. You can change your mind any time, as easily as you said yes."],
        body: (
            <>
                <p>
                    We process your personal data on the basis of your <strong>consent</strong> (for example when you send us an enquiry, accept analytics cookies, or allow portfolio use), or
                    for a <strong>legitimate use</strong> allowed by the DPDP Act, such as data you give us voluntarily to get a quote or perform your booking.
                </p>
                <p>
                    You can withdraw consent at any time by messaging us on WhatsApp, emailing {business.email}, or (for cookies) using the &quot;Cookie settings&quot; link at the bottom of
                    every page. Withdrawing consent doesn&apos;t affect anything we did before, and we may still keep records the law requires (such as invoices).
                </p>
            </>
        ),
    },
    {
        id: "photos",
        title: "Photos of you and your guests",
        summary: ["We only show your photos in our portfolio or social media if you agree.", "Guests can ask us to remove photos of themselves from our portfolio."],
        body: (
            <>
                <p>
                    At your event we photograph and film you, your family and your guests. We use this footage to create your deliverables. As the host, please let your guests know a
                    professional team is covering the event.
                </p>
                <p>
                    <strong>Portfolio and social media:</strong> we will ask for your consent at booking before using any of your photos or videos on our website, Instagram, YouTube or other
                    marketing. You can say no, or say yes to some images only, and you can withdraw consent later. When you withdraw, we remove the images from our website and accounts we
                    control within 7 days, though we can&apos;t recall printed material already distributed.
                </p>
                <p>
                    <strong>Guests</strong> who appear in our portfolio can ask us to remove those images by contacting us, and we will do so.
                </p>
            </>
        ),
    },
    {
        id: "children",
        title: "Children",
        summary: ["For baby shoots and birthdays we act on a parent's or guardian's consent.", "We never publish a child's photo without a parent's explicit consent."],
        body: (
            <p>
                Under the DPDP Act, anyone under 18 is a child. For baby shoots, birthday coverage and other events focused on children, we process children&apos;s photos only with the consent
                of a parent or lawful guardian, and only to deliver the service. We do not use children&apos;s images for portfolio or marketing without the parent&apos;s explicit written
                consent, and we do not track children or target them with advertising.
            </p>
        ),
    },
    {
        id: "sharing",
        title: "Who we share data with",
        summary: ["We never sell your data.", "We use a few trusted services to run the studio, and they may only use your data to help us."],
        body: (
            <>
                <p>We share personal data only with service providers (&quot;Data Processors&quot;) who help us deliver our service, under instructions from us:</p>
                <ul>
                    <li>
                        <strong>Meta (WhatsApp)</strong>: messaging with you
                    </li>
                    <li>
                        <strong>Google</strong>: email, cloud storage for delivery, and website analytics (only with your consent)
                    </li>
                    <li>
                        <strong>Our website hosting provider</strong>: to run this website and receive enquiries
                    </li>
                    <li>
                        <strong>Our album printing lab</strong>: the photos you select for your album, to print it
                    </li>
                    <li>
                        <strong>Banks and UPI providers</strong>: to receive your payments
                    </li>
                </ul>
                <p>
                    Some of these providers store data on servers outside India. We use only providers with appropriate safeguards, and we will follow any restrictions the Government of India
                    places on transfers to particular countries. We may also disclose data if the law requires it.
                </p>
            </>
        ),
    },
    {
        id: "security",
        title: "How we protect your data",
        summary: ["Raw footage stays with us and is deleted on schedule.", "If a breach ever affects your data, we'll tell you and the authorities."],
        body: (
            <p>
                We take reasonable security safeguards to protect your data: access to event footage is limited to our team, delivery links are shared only with you, and data is
                deleted when the retention period ends. If a personal data breach happens, we will inform affected people and the Data Protection Board of India as the DPDP Act requires.
            </p>
        ),
    },
    {
        id: "your-rights",
        title: "Your rights",
        summary: ["Ask what we hold, correct it, delete it, or complain. We'll reply within " + g.responseDays + " days."],
        body: (
            <>
                <p>Under the DPDP Act you have the right to:</p>
                <ul>
                    <li>
                        <strong>Access</strong>: get a summary of the personal data we hold about you and how we use it, and who we&apos;ve shared it with
                    </li>
                    <li>
                        <strong>Correction and completion</strong>: fix anything wrong or incomplete
                    </li>
                    <li>
                        <strong>Erasure</strong>: ask us to delete your data, unless the law requires us to keep it
                    </li>
                    <li>
                        <strong>Withdraw consent</strong>: at any time (see above)
                    </li>
                    <li>
                        <strong>Nominate</strong> someone to use these rights for you in case of death or incapacity
                    </li>
                    <li>
                        <strong>Grievance redressal</strong>: complain to us, and if you&apos;re not satisfied, to the Data Protection Board of India
                    </li>
                </ul>
                <p>Use the buttons at the end of this page, or contact our Grievance Officer below. We may ask you to confirm your identity before acting on a request.</p>
            </>
        ),
    },
    {
        id: "cookies",
        title: "Cookies",
        summary: ["Analytics cookies only load if you click Accept."],
        body: (
            <p>
                We use essential storage to remember your theme and saved quote, and Google Analytics cookies only if you accept them. See our <Link href="/cookie-policy">Cookie Policy</Link>{" "}
                for the full list. You can change your choice any time from &quot;Cookie settings&quot; at the bottom of every page.
            </p>
        ),
    },
    {
        id: "grievance",
        title: "Grievance Officer and contact",
        summary: [`Write to us and we'll respond within ${g.responseDays} days.`],
        body: (
            <>
                <div className="rounded-xl border border-border bg-card p-5 text-foreground">
                    <p className="font-semibold">{g.title}</p>
                    <p className="mt-1 text-foreground-muted">{fullAddress}</p>
                    <p className="mt-1">
                        Email: <a href={`mailto:${g.email}`}>{g.email}</a>
                    </p>
                    <p>
                        Phone / WhatsApp: <a href={`tel:${g.phone.replace(/\s/g, "")}`}>{g.phone}</a>
                    </p>
                </div>
                <p>
                    We acknowledge grievances within 48 hours and aim to resolve them within {g.responseDays} days. If you&apos;re not satisfied with our response, you can complain to the
                    Data Protection Board of India.
                </p>
            </>
        ),
    },
    {
        id: "changes",
        title: "Changes to this policy",
        body: (
            <p>
                If we change this policy, we&apos;ll update the date at the top. If a change affects how we use data you&apos;ve already given us, we&apos;ll tell you and ask for consent
                where required.
            </p>
        ),
    },
];

function SelfService() {
    const actions = [
        { icon: ImageOff, label: "Remove my photos from your portfolio", msg: "Namaste, I'd like my photos removed from Sindhu Studio's portfolio and social media. My name / event date: " },
        { icon: Trash2, label: "Delete my enquiry data", msg: "Namaste, under the DPDP Act please delete the personal data you hold from my enquiry. My name / phone: " },
        { icon: Mail, label: "Tell me what data you hold", msg: "Namaste, under the DPDP Act I'd like a summary of the personal data you hold about me. My name / phone: " },
    ];
    return (
        <section aria-labelledby="self-service" className="mt-16 rounded-3xl border border-border bg-card p-6 md:p-8 print:hidden">
            <h2 id="self-service" className="font-display text-2xl">
                Use your rights in one tap
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">Each button opens a pre-written WhatsApp message to us. Add your name and send.</p>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {actions.map((a) => (
                    <li key={a.label}>
                        <a
                            href={whatsappLink(a.msg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-full min-h-20 items-start gap-3 rounded-2xl border border-border p-4 text-sm transition-colors hover:border-accent"
                        >
                            <a.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                            <span className="flex-1">{a.label}</span>
                            <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function PrivacyPage() {
    return (
        <LegalPage
            title="Privacy Policy"
            path="/privacy"
            updated={UPDATED}
            intro={<p>Your wedding is personal. Here&apos;s exactly what we do with your details, your photos and your guests&apos; photos, and how to control it.</p>}
            inShort={[
                "We collect only what we need to quote, shoot and deliver your event.",
                "We never sell your data and never post your photos without your permission.",
                "Raw footage is deleted on a fixed schedule after delivery.",
                `You can see, correct or delete your data any time. We reply within ${g.responseDays} days.`,
            ]}
            sections={sections}
            related={[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Cancellation & Refunds", href: "/cancellation-policy" },
                { label: "Cookie Policy", href: "/cookie-policy" },
            ]}
            after={<SelfService />}
        />
    );
}
