"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cases = [
    { id: 1, image: "/assets/posts/1.jpg" },
    { id: 2, image: "/assets/posts/2.jpg" },
    { id: 3, image: "/assets/posts/3.jpg" },
    { id: 4, image: "/assets/posts/4.jpg" },
    { id: 5, image: "/assets/posts/5.jpg" },
    { id: 6, image: "/assets/posts/6.jpg" },
    { id: 7, image: "/assets/posts/7.jpg" },
];

export function ProjectsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let mm = gsap.matchMedia();
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");

        // Common Trigger Logic
        // We will create the timeline inside the media query to capture specific values

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean, isMobile: boolean };

            // --- CONFIGURATION ---
            // DESKTOP: Overlapping, alternating sides
            // MOBILE: Sequential, centered (Strict non-overlapping)

            const spacingZ = isDesktop ? 1200 : 1600; // Wide spacing for sequence
            const startZOffset = isDesktop ? 1000 : 800;
            const endBuffer = isDesktop ? 1000 : 500;

            // Recalculated Travel
            const totalTravel = startZOffset + ((cards.length - 1) * spacingZ) + endBuffer;

            // --- INITIAL SETUP ---
            cards.forEach((card, i) => {
                const isEven = i % 2 === 0;
                const isLast = i === cards.length - 1;
                // Desktop: Alternating | Mobile: Center. Last card (Text) is always centered.
                const initialX = isLast ? 0 : (isDesktop ? (isEven ? "-28vw" : "28vw") : 0);

                gsap.set(card, {
                    left: "50%",
                    top: "50%",
                    xPercent: -50,
                    yPercent: -50,
                    x: initialX,
                    y: 0,
                    z: -startZOffset - (i * spacingZ),
                    opacity: 0,
                    scale: 1,
                    pointerEvents: "none"
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: isDesktop ? "+=5000" : "+=4000", // Reduced mobile scroll length to prevent "overscroll" feel
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // Fix for mobile browser resizing (address bar)
                }
            });

            // Master Movement
            // We split movement: Image cards go effectively "through" the viewer (high Z)
            // Text card stops at a readable distance (Z=0 or small positive) to avoid extreme zoom

            const textCard = cards[cards.length - 1];
            const imageCards = cards.slice(0, -1);

            // Text card should stop around Z=0 (Screen plane) to be readable but not huge
            // Current FinalZ = endBuffer. We want FinalZ = 0.
            // So reduce travel by endBuffer.
            const totalTravelText = totalTravel - endBuffer;

            // Images Move Full Distance
            tl.to(imageCards, {
                z: `+=${totalTravel}`,
                ease: "none",
                duration: 1
            }, 0);

            // Text Moves Less Distance (Slower visual approach, stops earlier)
            tl.to(textCard, {
                z: `+=${totalTravelText}`,
                ease: "none",
                duration: 1
            }, 0);

            // Visibility Logic
            cards.forEach((card, i) => {
                const initialZ = -startZOffset - (i * spacingZ);
                const isLast = i === cards.length - 1;

                // Use the correct travel distance for calculations
                const currentTravel = isLast ? totalTravelText : totalTravel;

                // --- FADE ZONES ---
                // DESKTOP: Overlap allowed (-1500 start)
                // MOBILE: Strict sequence. Spacing 1600.
                // Out: 200 -> 800.
                // Next card starts In at -800 (when Prev is at 800).

                // For the LAST card (Text), we want strict "appear after previous gone" behavior on ALL devices
                // Previous card gone at: Z = 800
                // Last card position at that moment: Z = 800 - spacingZ
                // So start fade in EXACTLY at 800 - spacingZ

                const standardFadeInStart = isDesktop ? -1500 : -800;
                const standardFadeInEnd = isDesktop ? -500 : -200;

                const fadeInStart = isLast ? (100 - spacingZ) : standardFadeInStart;
                // Make text appear quicker (shorter fade) so it's readable before fading out
                const fadeInEnd = isLast ? (fadeInStart + 1000) : standardFadeInEnd;

                // Prevent text from getting too big: Fade it out earlier (at 500 instead of 800)
                const fadeOutStart = 200;
                const fadeOutEnd = isLast ? 500 : 800;

                const getProgress = (z: number) => (z - initialZ) / currentTravel;

                const pInStart = getProgress(fadeInStart);
                const pInEnd = getProgress(fadeInEnd);
                const pOutStart = getProgress(fadeOutStart);
                const pOutEnd = getProgress(fadeOutEnd);

                // 1. Fade In
                if (pInStart < 1 && pInEnd > 0) {
                    const safeStart = Math.max(0, pInStart);
                    const duration = Math.max(0.01, pInEnd - safeStart);

                    if (duration > 0) {
                        tl.to(card, {
                            opacity: 1,
                            pointerEvents: "auto",
                            ease: "power1.out",
                            duration: duration
                        }, safeStart);
                    }
                }

                // 2. Fade Out
                if (!isLast && pOutStart < 1) {
                    const safeStart = Math.max(0, pOutStart);
                    const duration = Math.max(0.01, pOutEnd - safeStart);

                    if (duration > 0) {
                        tl.to(card, {
                            opacity: 0,
                            pointerEvents: "none",
                            ease: "power1.in",
                            duration: duration
                        }, safeStart);
                    }
                }
            });

            return () => {
                // Cleanup if needed, but matchMedia handles most revert logic
            };
        });

        return () => mm.revert();
    }, []);



    // New: Canvas Animation for "Warp Speed" Background
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const stars: { x: number, y: number, z: number, o: number }[] = [];
        const numStars = 400;
        const speed = 2;
        const focalLength = canvas.width;

        // Initialize stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * focalLength,
                o: Math.random()
            });
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", resize);
        resize();

        let animationFrameId: number;

        const animate = () => {
            ctx.fillStyle = "#050a18"; // Clear with dark bg (or transparent if keeping section bg)
            ctx.clearRect(0, 0, width, height);

            // Draw Stars
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

            for (const star of stars) {
                // Update Star Position
                star.z -= speed;

                if (star.z <= 0) {
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                    star.z = focalLength;
                }

                // Project to 2D
                // Perspective projection: x2d = x * (focalLength / z)
                // We add width/2 and height/2 to center it
                const scale = focalLength / star.z;
                const x2d = star.x * scale + width / 2;
                const y2d = star.y * scale + height / 2;
                const radius = Math.max(0.1, 1.5 * (1 - star.z / focalLength)); // Size based on distance

                // Draw
                ctx.beginPath();
                ctx.fillStyle = `rgba(180, 200, 255, ${0.3 + (1 - star.z / focalLength) * 0.7})`; // Fade in as they get close
                ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section ref={triggerRef} className="relative bg-[#050a18] text-white overflow-hidden">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 "
                style={{ backgroundImage: "url('/assets/bg2.jpg')" }}
            />

            {/* Animated Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none"
            />

            <div
                ref={containerRef}
                className="h-[100svh] w-full relative flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d] z-10"
            >
                {/* Fixed Title / Background Element */}
                <div className="absolute top-25 w-full text-center z-20 pointer-events-none opacity-60 mix-blend-overlay">
                    <h2 className="text-[15px] md:text-2xl font-mono uppercase tracking-[0.5em] text-white">Selected Projects</h2>
                </div>

                {cases.map((project, index) => (
                    <div
                        key={project.id}
                        className="project-card absolute w-[85vw] md:w-[600px] h-auto rounded-[10px] bg-white/5 border border-white/10 overflow-hidden will-change-transform shadow-2xl [backface-visibility:hidden]"
                    >
                        {/* Background Image */}
                        <img
                            src={project.image}
                            alt={`Project ${project.id}`}
                            className="w-full h-auto block"
                        />
                    </div>
                ))}

                {/* Final "You Could Be Next" Text Card */}
                <div className="project-card absolute w-full md:w-auto h-auto flex items-center justify-center pointer-events-none will-change-transform z-20 [backface-visibility:hidden]">
                    <h2 className="text-4xl md:text-7xl font-black text-white text-center uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        You Could<br />Be Next
                    </h2>
                </div>
            </div>
        </section>
    );
}
