"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/** Tap-to-open explanation. Works on touch (no hover-only content), closes on Escape or outside tap. */
export function InfoTip({ label, children, className, ask = "What is" }: { label: string; children: React.ReactNode; className?: string; ask?: string }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const id = useId();

    useEffect(() => {
        if (!open) return;
        const onDown = (e: PointerEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <span ref={ref} className={cn("relative inline-flex", className)}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={id}
                aria-label={`${ask} ${label}?`}
                className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-foreground-muted transition-colors hover:text-accent"
            >
                <Info className="h-3.5 w-3.5" aria-hidden />
            </button>
            {open && (
                <span
                    id={id}
                    role="note"
                    className="absolute left-0 top-full z-30 mt-1 w-64 rounded-xl border border-border bg-card p-3 text-left text-sm font-normal normal-case tracking-normal text-foreground shadow-xl"
                >
                    {children}
                </span>
            )}
        </span>
    );
}
