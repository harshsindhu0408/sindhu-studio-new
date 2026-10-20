import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";
import { keystaticEnabled } from "@/lib/keystatic-access";

export const metadata = { title: "Sindhu Studio · Content editor", robots: { index: false, follow: false } };

// Separate root layout: the editor renders without the site's header, footer and analytics.
export default function KeystaticLayout() {
    if (!keystaticEnabled) notFound();
    return (
        <html lang="en">
            <body>
                <KeystaticApp />
            </body>
        </html>
    );
}
