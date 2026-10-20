import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { languageAlternates } from "@/i18n";

export const revalidate = 3600;

export const metadata: Metadata = {
    alternates: { canonical: "/hi", ...languageAlternates("/") },
};

export default function HindiHome() {
    return <HomePage locale="hi" />;
}
