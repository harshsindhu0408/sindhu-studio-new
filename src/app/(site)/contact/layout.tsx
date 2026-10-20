import type { Metadata } from "next";
import { business } from "@/data/business";

export const metadata: Metadata = {
    title: `Contact & Studio Address, ${business.address.locality}`,
    description: `Call or WhatsApp ${business.name} on ${business.phones[0].display}, or visit the studio at ${business.address.street}, ${business.address.locality}. ${business.hours.display}.`,
    alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
