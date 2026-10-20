"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { DatePicker } from "@/components/ui/DatePicker";
import { business, fullAddress, whatsappLink } from "@/data/business";
import { packages } from "@/data/packages";
import { addOns } from "@/data/addons";
import { track } from "@/lib/analytics";

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
    ...packages.map((p) => `${p.name} Package (₹${p.price.toLocaleString("en-IN")})`),
    ...addOns.map((a) => a.name),
];

function ContactForm() {
    const searchParams = useSearchParams();
    const packageParam = searchParams.get("package");
    const addonParam = searchParams.get("addon") || searchParams.get("service");

    // Pre-fill service if a package or add-on is in the URL
    const [formData, setFormData] = useState<FormData>(() => {
        const empty = { name: "", email: "", phone: "", service: "", date: "", message: "" };
        const queryParam = packageParam || addonParam;
        if (!queryParam) return empty;
        const matchingService = services.find((s) => s.toLowerCase().includes(queryParam.toLowerCase()));
        return matchingService
            ? { ...empty, service: matchingService }
            : { ...empty, message: `I am interested in adding the following to my package: ${queryParam}` };
    });
    const [honeypot, setHoneypot] = useState("");

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (formData.phone.trim() && !/^[\d\s+()-]{10,}$/.test(formData.phone)) {
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

        // Open synchronously so popup blockers allow it; navigate once the lead is saved
        const win = window.open("", "_blank");
        const messageHeader = `Hello Sindhu Studio, I would like to inquire about your photography services for my upcoming event. Here are my details:`;
        const messageBody =
            `\n\n*Name:* ${formData.name}` +
            (formData.phone ? `\n*Phone:* ${formData.phone}` : "") +
            (formData.email ? `\n*Email:* ${formData.email}` : "") +
            (formData.service ? `\n*Service:* ${formData.service}` : "") +
            (formData.date ? `\n*Preferred Date:* ${formData.date}` : "") +
            `\n\n*Message:* ${formData.message}` +
            `\n\nI am looking forward to hearing from you. Thank you!`;

        const fullMessage = messageHeader + messageBody;
        const whatsappUrl = whatsappLink(fullMessage);

        // Save the lead first, so it isn't lost if WhatsApp doesn't open
        try {
            await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ source: "contact_form", ...formData, website: honeypot }),
                keepalive: true,
            });
        } catch {
            // WhatsApp still carries the message
        }
        if (win) win.location.href = whatsappUrl;
        else window.location.href = whatsappUrl;
        track("generate_lead", { source: "contact_form" });

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
                        Thank you! Your enquiry is saved and WhatsApp should have opened with your message. Didn&apos;t open?{" "}
                        <a href={whatsappLink()} className="text-accent underline" target="_blank" rel="noopener noreferrer">
                            Tap here
                        </a>{" "}
                        or call {business.phones[0].display}.
                    </p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* Honeypot: hidden from people, bots fill it */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                        <label>
                            Website
                            <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                        </label>
                    </div>
                    {/* Name & Event Date */}
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
                                Event Date (Optional)
                            </label>
                        </div>
                    </div>

                    {/* Phone & Email */}
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
                                Phone Number (Optional)
                            </label>
                            {errors.phone && (
                                <p className="mt-1 text-xs text-error">{errors.phone}</p>
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
                                Email Address (Optional)
                            </label>
                            {errors.email && (
                                <p className="mt-1 text-xs text-error">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Service Selection */}
                    <div className="group relative">
                        <label htmlFor="service" className="sr-only">
                            Service or package
                        </label>
                        <select
                            name="service"
                            id="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-accent [&>option]:bg-background [&>option]:text-foreground"
                        >
                            <option value="">Select Service / Package (Optional)</option>
                            {services.map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>
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
                        className="btn cursor-pointer btn-primary w-full disabled:opacity-50"
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
                                    <a href={`mailto:${business.email}`} className="group flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                                            <Mail className="h-5 w-5" aria-hidden />
                                        </div>
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-sm text-foreground-muted">{business.email}</p>
                                        </div>
                                    </a>

                                    <div className="group flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border">
                                            <Phone className="h-5 w-5" aria-hidden />
                                        </div>
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <div className="flex flex-col gap-1 text-sm text-foreground-muted">
                                                {business.phones.map((p) => (
                                                    <a
                                                        key={p.tel}
                                                        href={`tel:${p.tel}`}
                                                        onClick={() => track("call_click", { location: "contact" })}
                                                        className="tabular inline-flex min-h-8 items-center transition-colors hover:text-foreground"
                                                    >
                                                        {p.display}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border transition-colors group-hover:border-accent">
                                            <MapPin className="h-5 w-5" aria-hidden />
                                        </div>
                                        <div>
                                            <p className="font-medium">Studio</p>
                                            <p className="text-sm text-foreground-muted">{fullAddress}</p>
                                            <p className="mt-1 text-sm text-accent">Get directions →</p>
                                        </div>
                                    </a>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border">
                                            <Clock className="h-5 w-5" aria-hidden />
                                        </div>
                                        <div>
                                            <p className="font-medium">Hours</p>
                                            <p className="text-sm text-foreground-muted">
                                                {business.hours.display}
                                                <br />
                                                {business.hours.note}
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

                    <div className="mt-16 overflow-hidden rounded-2xl border border-border">
                        <iframe
                            src={business.mapsEmbedUrl}
                            title={`Map showing ${business.name}, ${business.address.locality}`}
                            width="100%"
                            height="380"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="block"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
