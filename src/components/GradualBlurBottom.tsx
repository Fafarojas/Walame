"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function GradualBlurBottom() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Logic: Hide if at very top (< 50px) OR very bottom (> docHeight - 50px)
            const isAtTop = scrollTop < 30;
            const isAtBottom = scrollTop + windowHeight >= docHeight - 30;

            setIsVisible(!isAtTop && !isAtBottom);
        };

        handleScroll(); // Initial check
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={cn(
                "pointer-events-none fixed bottom-0 left-0 z-[40] w-full h-40 flex flex-col justify-end transition-opacity duration-300 ease-in-out",
                isVisible ? "opacity-100" : "opacity-0"
            )}
        >
            {/* 
         Stacked backdrop-blur layers to create a "gradient" of blur intensity.
         Browsers don't support "gradient blur" natively commonly, so we stack layers 
         with different mask gradients and blur amounts.
      */}

            {/* Layer 1: Light blur */}
            <div
                className="absolute inset-0 backdrop-blur-[1px]"
                style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 25%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%)" }}
            />

            {/* Layer 2: Medium blur */}
            <div
                className="absolute inset-0 h-[85%] mt-auto backdrop-blur-[2px]"
                style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%)" }}
            />

            {/* Layer 3: Stronger blur */}
            <div
                className="absolute inset-0 h-[70%] mt-auto backdrop-blur-[4px]"
                style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 60%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 60%)" }}
            />

            {/* Layer 4: Strongest blur */}
            <div
                className="absolute inset-0 h-[55%] mt-auto backdrop-blur-[8px]"
                style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 80%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 80%)" }}
            />

            {/* Layer 5: Max blur */}
            <div
                className="absolute inset-0 h-[40%] mt-auto backdrop-blur-[12px]"
                style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)" }}
            />
        </div>
    );
}
