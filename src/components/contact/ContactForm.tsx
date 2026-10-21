"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Send } from "lucide-react";
import { business, whatsappLink } from "@/data/business";
import { packages } from "@/data/packages";
import { addOns } from "@/data/addons";
import { formatINR } from "@/lib/quote";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n";

interface FormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    message: string;
}

type FormErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

const copy = {
    en: {
        title: "Or write it all down",
        subtitle: "Only your name and a few lines are needed. It reaches us and opens in WhatsApp, so nothing gets lost.",
        name: "Your name",
        phone: "Phone number",
        email: "Email",
        date: "Event date",
        service: "What are you looking for?",
        servicePlaceholder: "Choose a service or package",
        message: "Tell us about your wedding",
        messagePlaceholder: "Functions, venue, number of days, anything you have in mind…",
        optional: "optional",
        send: "Send on WhatsApp",
        sending: "Sending…",
        errName: "Please tell us your name",
        errEmail: "Please enter a valid email",
        errPhone: "Please enter a valid phone number",
        errMessage: "Please write a short message",
        doneTitle: "Message sent",
        doneBody: "Your enquiry is saved and WhatsApp should have opened with your message.",
        doneRetry: "Didn't open? Tap here",
        doneCall: "or call",
        groups: { services: "Services", packages: "Packages", addons: "Add-ons" },
        services: ["Wedding photography", "Pre-wedding shoot", "Ring ceremony / roka", "Haldi & mehendi", "Baby & birthday shoot", "Something else"],
        prefill: "I'm interested in:",
        waHeader: "Namaste Sindhu Studio, I'd like to know more about your services. My details:",
        waLabels: { name: "Name", phone: "Phone", email: "Email", service: "Service", date: "Event date", message: "Message" },
    },
    hi: {
        title: "या सब लिखकर भेजें",
        subtitle: "बस नाम और दो-चार लाइनें काफ़ी हैं। मैसेज हम तक पहुंचता है और WhatsApp में खुलता है, ताकि कुछ छूटे नहीं।",
        name: "आपका नाम",
        phone: "फ़ोन नंबर",
        email: "ईमेल",
        date: "कार्यक्रम की तारीख",
        service: "आपको क्या चाहिए?",
        servicePlaceholder: "सर्विस या पैकेज चुनें",
        message: "अपनी शादी के बारे में बताएं",
        messagePlaceholder: "फंक्शन, वेन्यू, कितने दिन, जो भी आपके मन में है…",
        optional: "ज़रूरी नहीं",
        send: "WhatsApp पर भेजें",
        sending: "भेज रहे हैं…",
        errName: "कृपया अपना नाम लिखें",
        errEmail: "कृपया सही ईमेल लिखें",
        errPhone: "कृपया सही फ़ोन नंबर लिखें",
        errMessage: "कृपया छोटा-सा मैसेज लिखें",
        doneTitle: "मैसेज भेज दिया गया",
        doneBody: "आपकी जानकारी सेव हो गई है और WhatsApp आपके मैसेज के साथ खुल जाना चाहिए।",
        doneRetry: "नहीं खुला? यहां दबाएं",
        doneCall: "या कॉल करें",
        groups: { services: "सर्विस", packages: "पैकेज", addons: "ऐड-ऑन" },
        services: ["शादी फोटोग्राफी", "प्री-वेडिंग शूट", "रिंग सेरेमनी / रोका", "हल्दी और मेहंदी", "बेबी और बर्थडे शूट", "कुछ और"],
        prefill: "मुझे इसमें रुचि है:",
        waHeader: "नमस्ते Sindhu Studio, मुझे आपकी सर्विस के बारे में जानना है। मेरी जानकारी:",
        waLabels: { name: "नाम", phone: "फ़ोन", email: "ईमेल", service: "सर्विस", date: "तारीख", message: "मैसेज" },
    },
};

function FieldLabel({ c, htmlFor, text, optional }: { c: (typeof copy)["en"]; htmlFor: string; text: string; optional?: boolean }) {
    return (
        <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
            {text}
            {optional && <span className="font-normal text-foreground-muted"> ({c.optional})</span>}
        </label>
    );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
    return msg ? (
        <p id={id} className="mt-1.5 text-xs text-error">
            {msg}
        </p>
    ) : null;
}

const inputClass =
    "w-full rounded-sm border bg-card px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground-muted/60 focus:border-foreground";

export function ContactForm({ locale = "en" }: { locale?: Locale }) {
    const c = copy[locale];
    const hi = locale === "hi";
    const searchParams = useSearchParams();

    const packageOptions = packages.map((p) => `${p.name} ${hi ? "पैकेज" : "package"} (${formatINR(p.price)})`);
    const addOnOptions = addOns.map((a) => (hi ? a.nameHi : a.name));
    const allOptions = [...c.services, ...packageOptions, ...addOnOptions];

    const [formData, setFormData] = useState<FormData>(() => {
        const empty = { name: "", email: "", phone: "", service: "", date: "", message: "" };
        const q = searchParams.get("package") || searchParams.get("addon") || searchParams.get("service");
        if (!q) return empty;
        const match = allOptions.find((s) => s.toLowerCase().includes(q.toLowerCase()));
        return match ? { ...empty, service: match } : { ...empty, message: `${c.prefill} ${q}` };
    });
    const [honeypot, setHoneypot] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const e: FormErrors = {};
        if (!formData.name.trim()) e.name = c.errName;
        if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = c.errEmail;
        if (formData.phone.trim() && !/^[\d\s+()-]{10,}$/.test(formData.phone)) e.phone = c.errPhone;
        if (!formData.message.trim()) e.message = c.errMessage;
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);

        // Open synchronously so popup blockers allow it; navigate once the lead is saved
        const win = window.open("", "_blank");
        const l = c.waLabels;
        const message =
            c.waHeader +
            `\n\n*${l.name}:* ${formData.name}` +
            (formData.phone ? `\n*${l.phone}:* ${formData.phone}` : "") +
            (formData.email ? `\n*${l.email}:* ${formData.email}` : "") +
            (formData.service ? `\n*${l.service}:* ${formData.service}` : "") +
            (formData.date ? `\n*${l.date}:* ${formData.date}` : "") +
            `\n\n*${l.message}:* ${formData.message}`;
        const url = whatsappLink(message);

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
        if (win) win.location.href = url;
        else window.location.href = url;
        track("generate_lead", { source: "contact_form" });

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const set = (name: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [name]: e.target.value }));
        if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    if (isSubmitted) {
        return (
            <div role="status" className="flex flex-col items-start py-10">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                    <CheckCircle2 className="h-8 w-8" aria-hidden />
                </span>
                <h2 className="mt-6 font-display text-3xl md:text-4xl">{c.doneTitle}</h2>
                <p className="mt-2 max-w-sm text-foreground-muted">{c.doneBody}</p>
                <p className="mt-4 text-sm">
                    <a href={whatsappLink()} className="text-accent underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                        {c.doneRetry}
                    </a>{" "}
                    {c.doneCall}{" "}
                    <a href={`tel:${business.phones[0].tel}`} className="tabular text-accent">
                        {business.phones[0].display}
                    </a>
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="relative">
            <h2 className="font-display text-3xl md:text-4xl">{c.title}</h2>
            <p className="mt-3 max-w-lg text-foreground-muted">{c.subtitle}</p>

            {/* Honeypot: hidden from people, bots fill it */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                    Website
                    <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </label>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel c={c} htmlFor="name" text={c.name} />
                    <input id="name" name="name" autoComplete="name" value={formData.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby="name-err" className={cn(inputClass, errors.name ? "border-error" : "border-border")} />
                    <FieldError id="name-err" msg={errors.name} />
                </div>
                <div>
                    <FieldLabel c={c} htmlFor="phone" text={c.phone} optional />
                    <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby="phone-err" className={cn(inputClass, "tabular", errors.phone ? "border-error" : "border-border")} />
                    <FieldError id="phone-err" msg={errors.phone} />
                </div>
                <div>
                    <FieldLabel c={c} htmlFor="email" text={c.email} optional />
                    <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby="email-err" className={cn(inputClass, errors.email ? "border-error" : "border-border")} />
                    <FieldError id="email-err" msg={errors.email} />
                </div>
                <div>
                    <FieldLabel c={c} htmlFor="date" text={c.date} optional />
                    <input id="date" name="date" type="date" min={new Date().toISOString().slice(0, 10)} value={formData.date} onChange={set("date")} className={cn(inputClass, "border-border [color-scheme:light] dark:[color-scheme:dark]")} />
                </div>
                <div className="md:col-span-2">
                    <FieldLabel c={c} htmlFor="service" text={c.service} optional />
                    <select id="service" name="service" value={formData.service} onChange={set("service")} className={cn(inputClass, "border-border")}>
                        <option value="">{c.servicePlaceholder}</option>
                        <optgroup label={c.groups.services}>
                            {c.services.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </optgroup>
                        <optgroup label={c.groups.packages}>
                            {packageOptions.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </optgroup>
                        <optgroup label={c.groups.addons}>
                            {addOnOptions.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <FieldLabel c={c} htmlFor="message" text={c.message} />
                    <textarea id="message" name="message" rows={5} value={formData.message} onChange={set("message")} placeholder={c.messagePlaceholder} aria-invalid={!!errors.message} aria-describedby="message-err" className={cn(inputClass, "resize-y", errors.message ? "border-error" : "border-border")} />
                    <FieldError id="message-err" msg={errors.message} />
                </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-8 w-full disabled:opacity-50 sm:w-auto">
                {isSubmitting ? c.sending : c.send} <Send className="h-4 w-4" aria-hidden />
            </button>
        </form>
    );
}
