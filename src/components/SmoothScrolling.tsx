"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Only initialize on desktop (using 768px as breakpoint)
        if (window.innerWidth < 768) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default smooth easing
            // direction: 'vertical', // default
            // gestureDirection: 'vertical', // default
            // smooth: true,
            // mouseMultiplier: 1,
            // smoothTouch: false, // Explicitly disable on touch devices if needed, but we do standard desktop check
            // touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
