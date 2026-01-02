"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationType =
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "scale"
    | "blur";

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    once?: boolean;
    threshold?: number;
}

const animationVariants: Record<AnimationType, Variants> = {
    "fade-up": {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-down": {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    blur: {
        hidden: { opacity: 0, filter: "blur(10px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
    },
};

export function SectionWrapper({
    children,
    className,
    animation = "fade-up",
    delay = 0,
    duration = 0.8,
    once = true,
    threshold = 0.1,
}: SectionWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once,
        amount: threshold,
    });

    return (
        <motion.div
            ref={ref}
            className={cn(className)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={animationVariants[animation]}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1], // ease-out-expo
            }}
        >
            {children}
        </motion.div>
    );
}

// Stagger container for child animations
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    once?: boolean;
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    once = true,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: 0.1 });

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {children}
        </motion.div>
    );
}

// Stagger item (child of StaggerContainer)
interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.div className={className} variants={itemVariants}>
            {children}
        </motion.div>
    );
}

// Reveal animation with clip-path
interface RevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
}

export function Reveal({
    children,
    className,
    direction = "up",
    delay = 0,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const clipPaths: Record<string, { hidden: string; visible: string }> = {
        up: {
            hidden: "inset(100% 0 0 0)",
            visible: "inset(0 0 0 0)",
        },
        down: {
            hidden: "inset(0 0 100% 0)",
            visible: "inset(0 0 0 0)",
        },
        left: {
            hidden: "inset(0 0 0 100%)",
            visible: "inset(0 0 0 0)",
        },
        right: {
            hidden: "inset(0 100% 0 0)",
            visible: "inset(0 0 0 0)",
        },
    };

    return (
        <motion.div
            ref={ref}
            className={cn("overflow-hidden", className)}
            initial={{ clipPath: clipPaths[direction].hidden }}
            animate={{
                clipPath: isInView
                    ? clipPaths[direction].visible
                    : clipPaths[direction].hidden,
            }}
            transition={{
                duration: 1,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

// Parallax wrapper
interface ParallaxProps {
    children: React.ReactNode;
    className?: string;
    speed?: number;
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                y: 0, // This would be connected to scroll position in real implementation
            }}
            initial={{ y: 0 }}
            whileInView={{
                y: speed * -50,
                transition: { duration: 0 },
            }}
        >
            {children}
        </motion.div>
    );
}
