"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX, Pause } from "lucide-react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useInView } from "framer-motion";

export function FeaturedFilms() {
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

        if (isInView && !userInteracted) {
            // Try to play
            const startPlay = async () => {
                try {
                    // First try playing (state is muted by default initially)
                    await video.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Autoplay blocked/failed", err);
                    setIsPlaying(false);
                }
            };
            startPlay();
        } else if (!isInView && !userInteracted) {
            video.pause();
            setIsPlaying(false);
        }
    }, [isInView, userInteracted]);

    const togglePlayback = () => {
        if (!videoRef.current) return;
        setUserInteracted(true);

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
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
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        Motion Pictures
                    </p>
                    <h2 className="font-display text-3xl font-medium md:text-5xl text-foreground">
                        Cinematic Love Stories
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted">
                        More than just video, we create films that transport you back to the emotion of your day.
                    </p>
                </SectionWrapper>

                <SectionWrapper delay={0.2}>
                    <div
                        ref={containerRef}
                        className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10"
                        onClick={togglePlayback}
                    >
                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                            src="/teaser.mp4"
                            poster="https://images.unsplash.com/photo-1532712938318-842217c35f1a?auto=format&fit=crop&q=80"
                            playsInline
                            loop
                            muted={isMuted} // Controlled by React state
                            preload="metadata"
                        />

                        {/* Overlay Gradient (visible when paused or hovering) */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} />

                        {/* Play/Pause Button Area (Centered) */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-transform duration-300 group-hover:scale-110">
                                {isPlaying ? (
                                    <Pause className="h-8 w-8 fill-white text-white drop-shadow-md" />
                                ) : (
                                    <>
                                        {/* Ping effect only when paused to encourage click */}
                                        <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                                        <Play className="ml-1 h-8 w-8 fill-white text-white drop-shadow-md" />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Bottom Controls */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 md:p-10 pointer-events-none">
                            {/* Text Content */}
                            <div className={`transition-transform duration-500 ${isPlaying ? 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100' : ''}`}>
                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-accent drop-shadow-md">Latest Film</p>
                                <h3 className="font-display text-2xl font-medium md:text-4xl drop-shadow-lg text-white">Akash & Srishti</h3>
                                <p className="mt-2 text-white drop-shadow-md">The Oberoi Udaivilas, Udaipur</p>
                            </div>

                            {/* Mute Toggle */}
                            <button
                                onClick={toggleMute}
                                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all"
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
