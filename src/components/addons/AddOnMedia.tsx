"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Baby, Cake, Camera, Clapperboard, Gem, Heart, MonitorPlay, Plane, Radio, Sparkles, Tv } from "lucide-react";
import type { AddOn, AddOnId } from "@/data/addons";
import { getMedia } from "@/data/media";
import { cn } from "@/lib/utils";

const icons: Record<AddOnId, typeof Camera> = {
    drone: Plane,
    candid: Camera,
    cinematic: Clapperboard,
    "pre-wedding": Heart,
    "ring-ceremony": Gem,
    "led-wall": MonitorPlay,
    "led-43": Tv,
    "live-stream": Radio,
    "kuan-poojan": Sparkles,
    "baby-shoot": Baby,
    birthday: Cake,
};

export function AddOnIcon({ id, className }: { id: AddOnId; className?: string }) {
    const Icon = icons[id];
    return <Icon className={className} aria-hidden />;
}

/**
 * Real photo or clip from the studio's own work. Add-ons without one get a
 * typographic panel instead of a stock photo.
 */
export function AddOnMedia({
    addOn,
    className,
    sizes = "(max-width: 768px) 100vw, 33vw",
    compact = false,
}: {
    addOn: AddOn;
    className?: string;
    sizes?: string;
    /** Small thumbnails: icon only, no Hindi label */
    compact?: boolean;
}) {
    const ref = useRef<HTMLVideoElement>(null);
    const [canPlay, setCanPlay] = useState(false);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (saveData || reduced) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCanPlay(true);
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.4 }
        );
        io.observe(video);
        return () => io.disconnect();
    }, []);

    if (addOn.media?.video) {
        return (
            <div className={cn("relative overflow-hidden bg-background-secondary", className)}>
                <video
                    ref={ref}
                    src={canPlay ? addOn.media.video : undefined}
                    poster={addOn.media.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label={`${addOn.name} sample from our work`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        );
    }

    if (addOn.media?.src) {
        return (
            <div className={cn("relative overflow-hidden bg-background-secondary", className)}>
                <Image src={addOn.media.src} alt={addOn.media.alt ?? addOn.name} fill sizes={sizes} className="object-cover" />
            </div>
        );
    }

    if (addOn.media?.image) {
        const m = getMedia(addOn.media.image);
        return (
            <div className={cn("relative overflow-hidden bg-background-secondary", className)}>
                <Image src={m.src} alt={m.alt} fill sizes={sizes} placeholder="blur" blurDataURL={m.blurDataURL} className="object-cover" />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent)/0.25),transparent_60%),radial-gradient(circle_at_80%_90%,rgb(var(--sindoor)/0.2),transparent_55%)] bg-background-secondary",
                className
            )}
        >
            <AddOnIcon id={addOn.id} className={compact ? "h-7 w-7 text-accent" : "h-10 w-10 text-accent"} />
            {!compact && (
                <span lang="hi" className="px-4 text-center font-hindi text-2xl text-foreground/80">
                    {addOn.nameHi}
                </span>
            )}
        </div>
    );
}
