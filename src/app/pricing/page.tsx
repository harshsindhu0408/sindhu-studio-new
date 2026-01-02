"use client";

import { Check, X, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { JsonLd, getProductSchema } from "@/lib/schema";

interface Package {
    name: string;
    price: number;
    highlight?: boolean;
    included: string[];
    excluded: string[];
}

const packages: Package[] = [
    {
        name: "Silver",
        price: 50000,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "50-Sheet 14 x 40 Album with Leather Cover",
            "Video Highlights",
            "64GB Pendrive",
            "LED Screen (8x12) at Venue",
            "Coverage for 2-Day Programme",
        ],
        excluded: [
            "Candid Photography",
            "Cinematic Video for Couples",
            "Drone Shoot",
            "Video Teaser",
            "Ring Ceremony Function",
            "Live Streaming of Events",
            "Pre-Wedding Shoot",
            "Custom Photo Album Design",
        ],
    },
    {
        name: "Gold",
        price: 70000,
        highlight: true,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "80-Sheet 14 x 40 Album with Leather Cover",
            "Drone Shoot",
            "64GB Pendrive",
            "LED Screen (8x12) at Venue",
            "Video Teaser",
            "Video Highlights",
            "Candid Photography",
            "Custom Photo Album Design",
        ],
        excluded: [
            "Cinematic Video for Couples",
            "Ring Ceremony Function",
            "Pre-Wedding Shoot",
            "Extra Cameramen",
            "Live Streaming of Events",
        ],
    },
    {
        name: "Platinum",
        price: 100000,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "80-Sheet 14 x 40 Album with Leather Cover",
            "Drone Shoot",
            "64GB Pendrive",
            "LED Screen (8x12) at Venue",
            "Video Teaser",
            "Video Highlights",
            "Cinematic Videography (Whole Event)",
            "Candid Photography (Whole Event)",
            "Custom Photo Album Design",
        ],
        excluded: [
            "Ring Ceremony Function",
            "Pre-Wedding Shoot",
            "Live Streaming of Events",
            "Additional Pendrive Copies",
        ],
    },
    {
        name: "Diamond",
        price: 120000,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "100-Sheet 14 x 40 Album with Leather Cover",
            "Drone Shoot",
            "64GB Pendrive",
            "LED Screen (8x12) at Venue",
            "Video Teaser",
            "Video Highlights",
            "Cinematic Videography",
            "Candid Photography (Marriage Only)",
            "Ring Ceremony Programme",
            "Custom Photo Album Design",
            "Extra Cameramen",
            "Backup Copies After 6 Months",
        ],
        excluded: [
            "Pre-Wedding Shoot",
            "Live Streaming of Events",
            "Video cinematics at ring ceremony",
        ],
    },
    {
        name: "Prime",
        price: 150000,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "100-Sheet 14 x 40 Album with Leather Cover",
            "(Extra High-Quality album Paper)",
            "Drone Shoot",
            "64GB Pendrive",
            "LED Screen (8x12) at Venue",
            "Video Teaser",
            "Video Highlights",
            "Cinematic Videography",
            "Candid Photography",
            "Extra 2 Cameramen for Capturing More Moments",
            "Ring Ceremony with Candid Photography and Cinematography",
            "Custom Photo Album Design",
            "Backup Copies After 6 Months",
        ],
        excluded: ["Pre-Wedding Shoot", "Live Streaming of Events"],
    },
    {
        name: "Exclusive",
        price: 200000,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "130-Sheet 14 x 40 Album (Extra High-Quality)",
            "Drone Shoot",
            "64GB Pendrive",
            "2 x LED Screens (8x12) at Venue",
            "Video Teaser",
            "Video Highlights",
            "Cinematic Videography",
            "Candid Photography",
            "Custom Photo Album Design",
            "Extra 2 Cameramen",
            "All Functions (Pre-Wedding, Ring Ceremony)",
            "Coverage for 3-Day Programme",
        ],
        excluded: ["Live Streaming of Events"],
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <JsonLd data={getProductSchema()} />
            {/* Header */}
            <header className="container-custom mb-16 text-center">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    Investment
                </p>
                <h1 className="font-display text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
                    Wedding Packages
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted">
                    Choose the perfect collection for your special day. Transparent pricing with no hidden costs.
                </p>
            </header>

            {/* Pricing Grid */}
            <section className="container-custom">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.name}
                            className={`relative flex flex-col rounded-2xl border bg-card p-8 transition-all hover:shadow-xl ${pkg.highlight
                                ? "border-accent shadow-lg ring-1 ring-accent/20"
                                : "border-border shadow-sm hover:border-accent/50"
                                }`}
                        >
                            {pkg.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8 border-b border-dashed border-border pb-8 text-center">
                                <h3 className="font-display text-2xl font-medium">{pkg.name}</h3>
                                <div className="mt-4 flex items-baseline justify-center gap-1">
                                    <span className="text-sm font-medium text-foreground-muted">₹</span>
                                    <span className="font-display text-4xl font-semibold tracking-tight">
                                        {pkg.price.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                {pkg.included.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        <span className="text-sm text-foreground-muted">{feature}</span>
                                    </div>
                                ))}

                                {pkg.excluded.length > 0 && (
                                    <div className="my-4 border-t border-border/50 pt-4">
                                        <p className="mb-3 text-xs font-semibold uppercase text-foreground-muted/50">Not Included</p>
                                        {pkg.excluded.map((feature) => (
                                            <div key={feature} className="flex items-start gap-3 opacity-60">
                                                <X className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" />
                                                <span className="text-sm text-foreground-muted">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-6">
                                <Link
                                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                                    className={`btn w-full justify-center ${pkg.highlight ? "btn-primary" : "btn-outline"
                                        }`}
                                >
                                    Choose {pkg.name}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact / Location Section */}
            <section className="mt-32 bg-background-secondary py-20">
                <div className="container-custom">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                                Visit Us
                            </p>
                            <h2 className="font-display text-4xl font-medium md:text-5xl">
                                Sindhu Digital Studio
                            </h2>
                            <div className="mt-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="mt-1 h-6 w-6 shrink-0 text-accent" />
                                    <div>
                                        <p className="text-lg font-medium">Headquarters</p>
                                        <p className="mt-1 text-foreground-muted">
                                            Shop no. 17, Delhi Road,<br />
                                            Opp. Balmev Plaza, Dev Colony,<br />
                                            Rohtak, Haryana, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="mt-1 h-6 w-6 shrink-0 text-accent" />
                                    <div>
                                        <p className="text-lg font-medium">Phone</p>
                                        <div className="mt-1 flex flex-col gap-1 text-foreground-muted">
                                            <a href="tel:+919416370132" className="hover:text-foreground">+91 94163 70132</a>
                                            <a href="tel:+917988804223" className="hover:text-foreground">+91 79888 04223</a>
                                            <a href="tel:+918950208120" className="hover:text-foreground">+91 89502 08120</a>
                                            <a href="tel:+919817554363" className="hover:text-foreground">+91 98175 54363</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Mail className="mt-1 h-6 w-6 shrink-0 text-accent" />
                                    <div>
                                        <p className="text-lg font-medium">Email</p>
                                        <a href="mailto:sindhustudiorohtak@gmail.com" className="mt-1 block text-foreground-muted hover:text-foreground">
                                            sindhustudiorohtak@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Embed Map or Decorative Image */}
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-card border border-border lg:aspect-auto lg:h-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.576594770335!2d76.5764003!3d28.8929003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d850000000001%3A0x1234567890abcdef!2sSindhu%20Photo%20Studio!5e0!3m2!1sen!2sin!4v1625642567890!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale transition-all hover:grayscale-0"
                            />
                            {/* 
                  Note: The Google Maps embed URL above requires a real place ID or coordinates to be perfect. 
                  I constructed a generic one based on the address 'Rohtak, Haryana'. 
                  Ideally, users should provide their real map embed link.
               */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
