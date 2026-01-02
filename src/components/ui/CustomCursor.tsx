"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to avoid flash

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Lighter spring config for better performance
    const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check if touch device
        const checkTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(checkTouch);

        if (checkTouch) return;

        // Use passive listener for better scroll performance
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Simplified hover detection - only on specific elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest("a, button, [data-cursor]");
            setIsHovering(!!interactive);
        };

        document.body.classList.add("has-custom-cursor");

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            document.body.classList.remove("has-custom-cursor");
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                willChange: "transform",
            }}
        >
            <motion.div
                className="relative flex items-center justify-center"
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
            >
                {/* Simple circle cursor */}
                <div
                    className="rounded-full border border-white bg-white/10"
                    style={{
                        width: isHovering ? 50 : 32,
                        height: isHovering ? 50 : 32,
                        marginLeft: isHovering ? -25 : -16,
                        marginTop: isHovering ? -25 : -16,
                        transition: "width 0.15s, height 0.15s, margin 0.15s",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
