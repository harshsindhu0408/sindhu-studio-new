"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Instagram,
    Facebook,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowUpRight,
} from "lucide-react";

const footerLinks = {
    services: [
        { label: "Wedding Photography", href: "/portfolio?category=wedding" },
        { label: "Pre-Wedding Shoots", href: "/portfolio?category=pre-wedding" },
        { label: "Maternity Sessions", href: "/portfolio?category=maternity" },
        { label: "Child Photography", href: "/portfolio?category=child" },
        { label: "Matrimony Portraits", href: "/portfolio?category=matrimony" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Our Portfolio", href: "/portfolio" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
    ],
    social: [
        { label: "Instagram", href: "https://instagram.com", icon: Instagram },
        { label: "Facebook", href: "https://facebook.com", icon: Facebook },
        { label: "YouTube", href: "https://youtube.com", icon: Youtube },
    ],
};

const contactInfo = {
    email: "sindhustudiorohtak@gmail.com",
    phone: "+91 94163 70132",
    address: "Shop no. 17, Sindhu Digital Studio, Delhi Road, opp. Balmev plaza, Dev Colony, Rohtak, Haryana, India",
};

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-border bg-background-secondary">
            {/* Top Section */}
            <div className="container-custom section-padding">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-block">
                            <motion.div
                                className="flex items-center gap-2"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="font-display text-2xl font-semibold tracking-tight">
                                    Sindhu
                                </span>
                                <span className="text-gradient font-display text-2xl font-light italic">
                                    Studio
                                </span>
                            </motion.div>
                        </Link>
                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground-muted">
                            Capturing life&apos;s most precious moments with artistry and passion.
                            Every frame tells a unique story, every shot preserves a memory
                            forever.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-8 space-y-4">
                            <a
                                href={`mailto:${contactInfo.email}`}
                                className="group flex items-center gap-3 text-sm text-foreground-muted transition-colors hover:text-accent"
                            >
                                <Mail className="h-4 w-4" />
                                {contactInfo.email}
                            </a>
                            <a
                                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                                className="group flex items-center gap-3 text-sm text-foreground-muted transition-colors hover:text-accent"
                            >
                                <Phone className="h-4 w-4" />
                                {contactInfo.phone}
                            </a>
                            <p className="flex items-start gap-3 text-sm text-foreground-muted">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                {contactInfo.address}
                            </p>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                            Services
                        </h4>
                        <ul className="mt-6 space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center text-sm text-foreground-muted transition-colors hover:text-foreground"
                                    >
                                        <span className="relative">
                                            {link.label}
                                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                            Company
                        </h4>
                        <ul className="mt-6 space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center text-sm text-foreground-muted transition-colors hover:text-foreground"
                                    >
                                        <span className="relative">
                                            {link.label}
                                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                            Stay Connected
                        </h4>
                        <p className="mt-6 text-sm text-foreground-muted">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="mt-6">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border-b border-border bg-transparent py-3 pr-12 text-sm outline-none transition-colors placeholder:text-foreground-muted focus:border-accent"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-foreground-muted transition-colors hover:text-accent"
                                    aria-label="Subscribe"
                                >
                                    <ArrowUpRight className="h-5 w-5" />
                                </button>
                            </div>
                        </form>

                        {/* Social Links */}
                        <div className="mt-8 flex gap-4">
                            {footerLinks.social.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-border">
                <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
                    <p className="text-center text-xs text-foreground-muted">
                        © {new Date().getFullYear()} Sindhu Studio. All rights reserved.
                    </p>
                    <p className="text-center text-xs text-foreground-muted">
                        Crafted with passion for capturing moments
                    </p>
                </div>
            </div>

            {/* Decorative Element */}
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        </footer>
    );
}
