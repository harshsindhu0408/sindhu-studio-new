"use client";

import { Check, X, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { JsonLd, getProductSchema } from "@/lib/schema";
import { addOns, getDiscountPercentage, AddOn } from "@/lib/addons";
import { useState } from "react";

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
        price: 49999,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "50-Sheet 14 x 40 Album with Leather Cover",
            "Video Highlights",
            "64GB Pendrive",
            "2 LED Screens (43 inches) at Venue",
            "Coverage for 2-Day Programme",
            "1 16X20(inches) Wedding photo frame hard copy"
        ],
        excluded: [
            "Candid Photography",
            "Cinematic Video for Couples",
            "Drone Shoot",
            "Video Teaser",
            "Ring Ceremony Function",
            "Pre-Wedding Shoot",
            "Custom Photo Album Design",
            "LED Screen (8x12) at Venue",
        ],
    },
    {
        name: "Gold",
        price: 69999,
        highlight: true,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "60-Sheet 14 x 40 Album with Leather Cover",
            "64GB Pendrive",
            "2 LED Screens (43 inches) at Venue",
            "Video Teaser",
            "Video Highlights",
            "Candid Photography",
            "Custom Photo Album Design",
            "1 16X24(inches) Wedding photo frame hard copy"
        ],
        excluded: [
            "Cinematic Video for Couples",
            "Ring Ceremony Function",
            "Pre-Wedding Shoot",
            "Extra Cameramen",
            "Drone Shoot",
            "LED Screen (8x12) at Venue",
        ],
    },
    {
        name: "Platinum",
        price: 99999,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "80-Sheet 14 x 40 Album with Leather Cover",
            "Drone Shoot",
            "64GB Pendrive",
            "LED Screen (8x12) at Venue",
            "Video Teaser",
            "Video Highlights",
            "Cinematic Videography (Marriage main event Only)",
            "Candid Photography (Marriage Only)",
            "Custom Photo Album Design",
            "2 LED Screens (43 inches) at Venue",
            "1 20X30(inches) Wedding photo frame hard copy"
        ],
        excluded: [
            "Ring Ceremony Function",
            "Pre-Wedding Shoot",
            "Additional Pendrive Copies",
        ],
    },
    {
        name: "Diamond",
        price: 124999,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "2 (50 sheet each) 14 x 40 Album with Leather Cover",
            "Drone Shoot",
            "64GB Pendrive",
            "LED Screen (8x12) at Venue",
            "Video Teaser",
            "Video Highlights",
            "Cinematic Videography (Marriage main event Only)",
            "Candid Photography (Marriage main event Only)",
            "Ring Ceremony Programme",
            "Custom Photo Album Design",
            "Extra Cameramen",
            "Backup Copies After 6 Months",
            "2 LED Screens (43 inches) at Venue",
            "1 20X30(inches) and 1 16X20(inches) Wedding photo frame hard copy"
        ],
        excluded: [
            "Pre-Wedding Shoot",
            "Video cinematics at ring ceremony",
        ],
    },
    {
        name: "Prime",
        price: 149999,
        included: [
            "Full HD Photos (RAW Data)",
            "Full HD Videos (Master + Edited Copy)",
            "2 (50 sheet each) 14 x 40 Album with Leather Cover",
            "(Extra High-Quality album Paper)",
            "Drone Shoot",
            "64GB Pendrive",
            "LED Screen (8x12) at Venue",
            "Video Teaser",
            "Video Highlights",
            "Cinematic Videography (Marriage main event Only)",
            "Candid Photography (Marriage main event Only)",
            "Extra 2 Cameramen for Capturing More Moments",
            "Ring Ceremony with Candid Photography",
            "Custom Photo Album Design",
            "Backup Copies After 6 Months",
            "2 LED Screens (43 inches) at Venue",
            "2 20X30(inches) Wedding photo frame hard copy"
        ],
        excluded: ["Pre-Wedding Shoot"],
    },
    {
        name: "Exclusive",
        price: 199999,
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
            "Backup Copies After 6 Months",
            "2 LED Screens (43 inches) at Venue",
            "2 20X30(inches) Wedding photo frame Acrylic"
        ],
        excluded: [""],
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

            {/* Add-ons Section */}
            <section className="container-custom mt-24">
                <div className="mb-12 text-center">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        Customize
                    </p>
                    <h2 className="font-display text-4xl font-medium md:text-5xl">
                        Available Add-ons
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted">
                        Enhance your chosen package with these popular additions.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {addOns.map((addon) => (
                        <AddOnCard key={addon.name} addon={addon} />
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
                                            <a href="tel:+918950300913" className="hover:text-foreground">+91 89503 00913</a>
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

function AddOnCard({ addon }: { addon: AddOn }) {
    const [selectedOption, setSelectedOption] = useState(0);

    const price = addon.options ? addon.options[selectedOption].price : addon.price;
    const originalPrice = addon.options ? addon.options[selectedOption].originalPrice : addon.originalPrice;
    const discount = getDiscountPercentage(originalPrice, price);
    const bookingName = addon.options ? `${addon.options[selectedOption].label} ${addon.name}` : addon.name;

    return (
        <div
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-md"
        >
            {originalPrice && (
                <div className="absolute right-4 top-4 rounded-full bg-accent/10 px-2 py-1 text-xs font-bold text-accent">
                    {discount}% OFF
                </div>
            )}
            <div className="mb-4 flex-1">
                <h4 className="font-display text-xl font-medium group-hover:text-accent transition-colors">{addon.name}</h4>
                {addon.description && (
                    <p className="mt-1 text-xs uppercase tracking-wider text-foreground-muted">
                        {addon.description}
                    </p>
                )}

                {addon.options && (
                    <div className="flex items-center gap-2 mt-4 bg-background-secondary p-1 rounded-full border border-border/50 w-max">
                        {addon.options.map((opt, i) => (
                            <button
                                key={opt.label}
                                onClick={() => setSelectedOption(i)}
                                className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full transition-all ${selectedOption === i ? 'bg-accent text-white shadow-sm' : 'text-foreground-muted hover:text-foreground'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="mb-6 flex flex-wrap items-baseline gap-2">
                <span className="font-display text-2xl font-semibold">
                    ₹{price.toLocaleString("en-IN")}
                </span>
                {originalPrice && (
                    <span className="text-sm font-medium text-foreground-muted line-through opacity-70">
                        ₹{originalPrice.toLocaleString("en-IN")}
                    </span>
                )}
            </div>
            <Link
                href={`/contact?addon=${encodeURIComponent(bookingName)}`}
                className="group/link mt-auto inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
            >
                Add to Package
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
        </div>
    );
}
