"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Share2, X } from "lucide-react";
import type { MediaItem } from "@/data/media";
import { SITE_URL } from "@/data/business";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n";

const labels = {
    en: { open: "Open photo", viewer: "Photo viewer", share: "Share this photo", close: "Close", prev: "Previous photo", next: "Next photo" },
    hi: { open: "फोटो खोलें", viewer: "फोटो व्यूअर", share: "यह फोटो शेयर करें", close: "बंद करें", prev: "पिछली फोटो", next: "अगली फोटो" },
};

export function Gallery({ items, locale = "en" }: { items: MediaItem[]; locale?: Locale }) {
    const t = labels[locale];
    const [index, setIndex] = useState<number | null>(null);
    const touchX = useRef<number | null>(null);
    const openerRef = useRef<HTMLButtonElement | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const close = useCallback(() => {
        setIndex(null);
        openerRef.current?.focus();
    }, []);
    const go = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

    useEffect(() => {
        if (index === null) return;
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [index, close, go]);

    const current = index !== null ? items[index] : null;

    const share = async () => {
        if (!current) return;
        const url = `${SITE_URL}${locale === "hi" ? "/hi" : ""}/portfolio/${current.category}#${current.id}`;
        track("photo_share", { photo: current.id });
        if (navigator.share) {
            try {
                await navigator.share({ title: "Sindhu Studio", text: current.alt, url });
                return;
            } catch {
                return;
            }
        }
        window.open(`https://wa.me/?text=${encodeURIComponent(`${current.alt}\n${url}`)}`, "_blank");
    };

    return (
        <>
            <ul className="columns-2 gap-3 md:columns-2 md:gap-6 xl:columns-3 [&>li]:mb-3 md:[&>li]:mb-6">
                {items.map((m, i) => (
                    <li key={m.id} id={m.id} className="break-inside-avoid scroll-mt-24">
                        <button
                            type="button"
                            onClick={(e) => {
                                openerRef.current = e.currentTarget;
                                setIndex(i);
                            }}
                            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-background-secondary"
                            aria-label={`${t.open}: ${m.alt}`}
                        >
                            <Image
                                src={m.src}
                                alt={m.alt}
                                width={m.width}
                                height={m.height}
                                sizes="(max-width: 1280px) 50vw, 33vw"
                                placeholder="blur"
                                blurDataURL={m.blurDataURL}
                                priority={i < 2}
                                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {/* Portal to <body> so no transformed ancestor can trap the fixed overlay */}
            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {current && (
                            <motion.div
                                role="dialog"
                                aria-modal="true"
                                aria-label={t.viewer}
                                className="fixed inset-0 z-[70] flex flex-col bg-black/95 text-white"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                                onTouchEnd={(e) => {
                                    if (touchX.current === null) return;
                                    const dx = e.changedTouches[0].clientX - touchX.current;
                                    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                                    touchX.current = null;
                                }}
                            >
                                <div className="flex items-center justify-between p-3">
                                    <span className="tabular px-2 text-sm text-white/70">
                                        {index! + 1} / {items.length}
                                    </span>
                                    <div className="flex gap-1">
                                        <button
                                            type="button"
                                            onClick={share}
                                            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-white/10"
                                            aria-label={t.share}
                                        >
                                            <Share2 className="h-5 w-5" aria-hidden />
                                        </button>
                                        <button
                                            ref={closeRef}
                                            type="button"
                                            onClick={close}
                                            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-white/10"
                                            aria-label={t.close}
                                        >
                                            <X className="h-6 w-6" aria-hidden />
                                        </button>
                                    </div>
                                </div>

                                <div className="relative flex-1">
                                    <motion.div key={current.id} className="absolute inset-0" initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                                        <Image
                                            src={current.src}
                                            alt={current.alt}
                                            fill
                                            sizes="100vw"
                                            placeholder="blur"
                                            blurDataURL={current.blurDataURL}
                                            className="object-contain"
                                        />
                                    </motion.div>
                                    <button
                                        type="button"
                                        onClick={() => go(-1)}
                                        className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20 md:flex"
                                        aria-label={t.prev}
                                    >
                                        <ChevronLeft className="h-6 w-6" aria-hidden />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => go(1)}
                                        className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20 md:flex"
                                        aria-label={t.next}
                                    >
                                        <ChevronRight className="h-6 w-6" aria-hidden />
                                    </button>
                                </div>

                                <div className="pb-safe flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                                    <p className="max-w-2xl text-sm text-white/80">{current.alt}</p>
                                    <Link href={locale === "hi" ? "/hi/build" : "/build"} onClick={close} className="btn btn-primary shrink-0">
                                        {locale === "hi" ? "मुझे ऐसी फोटो चाहिए" : "I want photos like this"}
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
}
