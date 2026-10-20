"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX, Pause } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useInView } from "framer-motion";
import type { Locale } from "@/i18n";

const filmCopy = {
    en: { eyebrow: "Motion pictures", title: "Cinematic love stories", intro: "More than just video: films that take you back to the emotion of your day.", badge: "Wedding teaser", name: "Drone, haldi, baraat & pheras", by: "Shot and edited by our team · 1:12", play: "Play film", pause: "Pause film", mute: "Mute", unmute: "Unmute", label: "Wedding teaser filmed by Sindhu Studio" },
    hi: { eyebrow: "चलती तस्वीरें", title: "सिनेमैटिक प्रेम कहानियां", intro: "सिर्फ़ वीडियो नहीं: ऐसी फ़िल्में जो आपको उस दिन के एहसास में वापस ले जाएं।", badge: "शादी का टीज़र", name: "ड्रोन, हल्दी, बारात और फेरे", by: "हमारी टीम द्वारा शूट और एडिट · 1:12", play: "फ़िल्म चलाएं", pause: "फ़िल्म रोकें", mute: "आवाज़ बंद करें", unmute: "आवाज़ चालू करें", label: "Sindhu Studio का शादी टीज़र" },
};

export function FeaturedFilms({ locale = "en" }: { locale?: Locale }) {
    const fc = filmCopy[locale];
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.4, margin: "0px 0px -20% 0px" });

    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);

    // Handle Autoplay behavior
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (isInView && !userInteracted && !saveData && !reducedMotion) {
            // Muted autoplay; isPlaying follows the video's own play/pause events
            video.play().catch(() => {});
        } else if (!isInView && !userInteracted) {
            video.pause();
        }
    }, [isInView, userInteracted]);

    const togglePlayback = () => {
        if (!videoRef.current) return;
        setUserInteracted(true);

        if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling playback
        if (!videoRef.current) return;

        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    return (
        <section className="section-padding bg-background-secondary text-foreground">
            <div className="container-custom">
                <SectionWrapper className="mb-12 text-center">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">{fc.eyebrow}</p>
                    <h2 className="font-display text-3xl font-medium md:text-5xl text-foreground">
                        {fc.title}
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted">
                        {fc.intro}
                    </p>
                </SectionWrapper>

                <SectionWrapper delay={0.2}>
                    <div
                        ref={containerRef}
                        className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10"
                        onClick={togglePlayback}
                    >
                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                            poster="/films/teaser-poster.webp"
                            playsInline
                            loop
                            muted={isMuted} // Controlled by React state
                            preload="none"
                            aria-label={fc.label}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        >
                            {/* 13 MB 720p on larger screens, 7 MB 540p on phones (was one 56 MB file) */}
                            <source src="/films/teaser-720.mp4" type="video/mp4" media="(min-width: 768px)" />
                            <source src="/films/teaser-540.mp4" type="video/mp4" />
                        </video>

                        {/* Overlay Gradient (visible when paused or hovering) */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} />

                        {/* Play/Pause Button Area (Centered) */}
                        <div className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100 focus-within:opacity-100' : 'opacity-100'}`}>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlayback();
                                }}
                                aria-label={isPlaying ? fc.pause : fc.play}
                                className="pointer-events-auto relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-transform duration-300 group-hover:scale-110"
                            >
                                {isPlaying ? (
                                    <Pause className="h-8 w-8 fill-white text-white drop-shadow-md" />
                                ) : (
                                    <>
                                        {/* Ping effect only when paused to encourage click */}
                                        <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                                        <Play className="ml-1 h-8 w-8 fill-white text-white drop-shadow-md" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Bottom Controls */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 md:p-10 pointer-events-none">
                            {/* Text Content */}
                            <div className={`hidden transition-transform duration-500 sm:block ${isPlaying ? 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100' : ''}`}>
                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-accent drop-shadow-md">{fc.badge}</p>
                                <h3 className="font-display text-2xl font-medium md:text-4xl drop-shadow-lg text-white">{fc.name}</h3>
                                <p className="mt-2 text-white drop-shadow-md">{fc.by}</p>
                            </div>

                            {/* Mute Toggle */}
                            <button
                                onClick={toggleMute}
                                aria-label={isMuted ? fc.unmute : fc.mute}
                                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all"
                                title={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? (
                                    <VolumeX className="h-5 w-5" />
                                ) : (
                                    <Volume2 className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                    </div>
                </SectionWrapper>
            </div>
        </section>
    );
}
