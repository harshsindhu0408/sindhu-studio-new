import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site/SiteShell";
import { NotFoundView } from "@/components/site/NotFoundView";
import { business } from "@/data/business";

// Unmatched URLs skip the (site)/(hi) root layouts, so this page brings its own shell.
export const metadata: Metadata = {
    title: `Page not found | ${business.name}`,
    robots: { index: false },
};

export default function GlobalNotFound() {
    return (
        <SiteShell locale="en">
            <NotFoundView />
        </SiteShell>
    );
}
