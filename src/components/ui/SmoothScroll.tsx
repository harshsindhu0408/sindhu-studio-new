"use client";

interface SmoothScrollProps {
    children: React.ReactNode;
}

// Removed Lenis smooth scroll - it causes significant performance issues
// Native browser scrolling is GPU-accelerated and performs much better
export function SmoothScroll({ children }: SmoothScrollProps) {
    return <>{children}</>;
}

export function useLenis() {
    return null;
}
