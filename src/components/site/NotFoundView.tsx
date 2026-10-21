"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { localeFromPath } from "@/i18n";

const copy = {
    en: { title: "Page Not Found", body: "The page you're looking for seems to have wandered off. Let's get you back on track.", home: "Back to Home", back: "Go Back", homeHref: "/" },
    hi: { title: "पेज नहीं मिला", body: "आप जो पेज ढूंढ रहे हैं, वो शायद कहीं और चला गया है। आइए आपको सही जगह ले चलें।", home: "होम पेज पर जाएं", back: "पीछे जाएं", homeHref: "/hi" },
};

export function NotFoundView() {
    const c = copy[localeFromPath(usePathname())];
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="container-custom">
                <motion.div className="mx-auto max-w-xl text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <motion.h1 className="font-display text-8xl font-bold text-accent md:text-9xl" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
                        404
                    </motion.h1>
                    <h2 className="mt-6 font-display text-3xl font-medium md:text-4xl">{c.title}</h2>
                    <p className="mt-4 text-foreground-muted">{c.body}</p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={c.homeHref} className="btn btn-primary">
                            <Home className="h-4 w-4" aria-hidden />
                            {c.home}
                        </Link>
                        <button type="button" onClick={() => window.history.back()} className="btn btn-outline">
                            <ArrowLeft className="h-4 w-4" aria-hidden />
                            {c.back}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
