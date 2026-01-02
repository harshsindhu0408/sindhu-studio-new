"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { DatePicker } from "@/components/ui/DatePicker";

interface FormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

const services = [
    "Wedding Photography",
    "Pre-Wedding Shoot",
    "Maternity Session",
    "Child Photography",
    "Matrimony Portrait",
    "Other",
    // Packages
    "Silver Package (50K)",
    "Gold Package (70K)",
    "Platinum Package (100K)",
    "Diamond Package (1.2L)",
    "Prime Package (1.5L)",
    "Exclusive Package (2L)",
];

function ContactForm() {
    const searchParams = useSearchParams();
    const packageParam = searchParams.get("package");

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
    });

    // Pre-fill service if package is in URL
    useEffect(() => {
        if (packageParam) {
            // Find matching service or just set it
            const matchingService = services.find(s => s.toLowerCase().includes(packageParam.toLowerCase()));
            if (matchingService) {
                setFormData(prev => ({ ...prev, service: matchingService }));
            }
        }
    }, [packageParam]);

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="rounded-lg border border-border bg-card p-8 md:p-10 shadow-sm">
            {isSubmitted ? (
                <motion.div
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Send className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-2xl font-medium">Message Sent!</h3>
                    <p className="mt-2 text-foreground-muted">
                        Thank you for reaching out. We&apos;ll get back to you within 24
                        hours.
                    </p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="group relative">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`peer w-full border-b bg-transparent py-3 text-foreground outline-none transition-colors ${errors.name
                                    ? "border-error"
                                    : "border-border focus:border-accent"
                                    }`}
                                placeholder=" "
                            />
                            <label
                                htmlFor="name"
                                className="pointer-events-none absolute left-0 top-3 text-foreground-muted transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs"
                            >
                                Your Name *
                            </label>
                            {errors.name && (
                                <p className="mt-1 text-xs text-error">{errors.name}</p>
                            )}
                        </div>

                        <div className="group relative">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`peer w-full border-b bg-transparent py-3 text-foreground outline-none transition-colors ${errors.email
                                    ? "border-error"
                                    : "border-border focus:border-accent"
                                    }`}
                                placeholder=" "
                            />
                            <label
                                htmlFor="email"
                                className="pointer-events-none absolute left-0 top-3 text-foreground-muted transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs"
                            >
                                Email Address *
                            </label>
                            {errors.email && (
                                <p className="mt-1 text-xs text-error">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Phone & Service */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="group relative">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`peer w-full border-b bg-transparent py-3 text-foreground outline-none transition-colors ${errors.phone
                                    ? "border-error"
                                    : "border-border focus:border-accent"
                                    }`}
                                placeholder=" "
                            />
                            <label
                                htmlFor="phone"
                                className="pointer-events-none absolute left-0 top-3 text-foreground-muted transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs"
                            >
                                Phone Number *
                            </label>
                            {errors.phone && (
                                <p className="mt-1 text-xs text-error">{errors.phone}</p>
                            )}
                        </div>

                        <div className="group relative">
                            <select
                                name="service"
                                id="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-accent [&>option]:bg-background [&>option]:text-foreground"
                            >
                                <option value="">Select Service / Package</option>
                                {services.map((service) => (
                                    <option key={service} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Event Date */}
                    <div className="group relative">
                        <DatePicker
                            selected={formData.date ? new Date(formData.date) : undefined}
                            onSelect={(date) => {
                                if (date && !isNaN(date.getTime())) {
                                    // Use format YYYY-MM-DD that maps correctly to local time
                                    const offset = date.getTimezoneOffset()
                                    const localDate = new Date(date.getTime() - (offset * 60 * 1000))
                                    const dateStr = localDate.toISOString().split('T')[0]
                                    setFormData(prev => ({ ...prev, date: dateStr }));
                                }
                            }}
                            placeholder="Select Event Date"
                        />
                        <label
                            className="pointer-events-none absolute -top-3 left-0 text-xs text-foreground-muted block"
                        >
                            Event Date (if applicable)
                        </label>
                    </div>

                    {/* Message */}
                    <div className="group relative">
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className={`peer w-full resize-none border-b bg-transparent py-3 text-foreground outline-none transition-colors ${errors.message
                                ? "border-error"
                                : "border-border focus:border-accent"
                                }`}
                            placeholder=" "
                        />
                        <label
                            htmlFor="message"
                            className="pointer-events-none absolute left-0 top-3 text-foreground-muted transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs"
                        >
                            Tell us about your vision *
                        </label>
                        {errors.message && (
                            <p className="mt-1 text-xs text-error">{errors.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full disabled:opacity-50"
                        data-cursor="pointer"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="inline-block h-4 w-4 rounded-full border-2 border-accent-foreground border-t-transparent"
                                />
                                Sending...
                            </span>
                        ) : (
                            <>
                                Send Message
                                <Send className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24">
            {/* Page Header */}
            <section className="section-padding pb-12">
                <div className="container-custom">
                    <SectionWrapper className="mx-auto max-w-3xl text-center">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                            Get in Touch
                        </p>
                        <h1 className="font-display text-5xl font-medium md:text-6xl lg:text-7xl">
                            Contact Us
                        </h1>
                        <p className="mt-6 text-foreground-muted">
                            Ready to create something beautiful together? We&apos;d love to
                            hear about your vision.
                        </p>
                    </SectionWrapper>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding pt-0">
                <div className="container-custom">
                    <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
                        {/* Contact Info */}
                        <SectionWrapper className="lg:col-span-2" animation="fade-right">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="font-display text-2xl font-medium">
                                        Let&apos;s Connect
                                    </h2>
                                    <p className="mt-2 text-foreground-muted">
                                        Whether you have questions or are ready to book, we&apos;re
                                        here to help.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <a
                                        href="mailto:sindhustudiorohtak@gmail.com"
                                        className="group flex items-start gap-4"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-sm text-foreground-muted">
                                                sindhustudiorohtak@gmail.com
                                            </p>
                                        </div>
                                    </a>

                                    <div className="group flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <div className="flex flex-col gap-1 text-sm text-foreground-muted">
                                                <a
                                                    href="tel:+919416370132"
                                                    className="transition-colors hover:text-foreground"
                                                >
                                                    +91 94163 70132
                                                </a>
                                                <a
                                                    href="tel:+917988804223"
                                                    className="transition-colors hover:text-foreground"
                                                >
                                                    +91 79888 04223
                                                </a>
                                                <a
                                                    href="tel:+918950208120"
                                                    className="transition-colors hover:text-foreground"
                                                >
                                                    +91 89502 08120
                                                </a>
                                                <a
                                                    href="tel:+919817554363"
                                                    className="transition-colors hover:text-foreground"
                                                >
                                                    +91 98175 54363
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Studio</p>
                                            <p className="text-sm text-foreground-muted">
                                                Shop no. 17, Sindhu DigitalStudio,
                                                <br />
                                                Delhi Road, opp. Balmev Plaza,
                                                <br />
                                                Dev Colony, Rohtak, Haryana, India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Hours</p>
                                            <p className="text-sm text-foreground-muted">
                                                Mon - Sun: 9am - 9pm
                                                <br />
                                                Available for Shoots 24/7
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>

                        {/* Contact Form */}
                        <SectionWrapper
                            className="lg:col-span-3"
                            animation="fade-left"
                            delay={0.2}
                        >
                            <Suspense
                                fallback={
                                    <div className="flex h-[400px] items-center justify-center rounded-lg border border-border p-10">
                                        Loading Form...
                                    </div>
                                }
                            >
                                <ContactForm />
                            </Suspense>
                        </SectionWrapper>
                    </div>
                </div>
            </section>
        </div>
    );
}
