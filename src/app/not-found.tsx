"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="container-custom">
                <motion.div
                    className="mx-auto max-w-xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* 404 Text */}
                    <motion.h1
                        className="font-display text-8xl font-bold text-accent md:text-9xl"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        404
                    </motion.h1>

                    {/* Message */}
                    <h2 className="mt-6 font-display text-3xl font-medium md:text-4xl">
                        Page Not Found
                    </h2>
                    <p className="mt-4 text-foreground-muted">
                        The page you&apos;re looking for seems to have wandered off. Let&apos;s get
                        you back on track.
                    </p>

                    {/* Links */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/"
                            className="btn btn-primary"
                            data-cursor="pointer"
                        >
                            <Home className="h-4 w-4" />
                            Back to Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="btn btn-outline"
                            data-cursor="pointer"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
