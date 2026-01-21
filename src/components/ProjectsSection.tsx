"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cases = [
    {
        id: 1,
        client: "LogiTech Solutions",
        category: "Logistics",
        description: "Predictive routing AI reduced delivery delays by 40%.",
        result: "+40% Eff.",
        year: "2024",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        client: "AgriFuture",
        category: "Agriculture",
        description: "Automated harvest scheduling increased yield predictability.",
        result: "$2.5M Saved",
        year: "2023",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        client: "FinFlow Corp",
        category: "Fintech",
        description: "Streamlined document processing for loan approvals.",
        result: "10x Faster",
        year: "2024",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 4,
        client: "MediCare AI",
        category: "Healthcare",
        description: "Optimized patient scheduling across 15 regional hospitals.",
        result: "98% Uptime",
        year: "2023",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2028&auto=format&fit=crop",
    },
    {
        id: 5,
        client: "RetailScale",
        category: "E-Commerce",
        description: "Dynamic pricing agents maximized Black Friday turnover.",
        result: "+25% Rev.",
        year: "2024",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
    },
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
            // MOBILE: Sequential, centered

            const spacingZ = isDesktop ? 1200 : 1600;
            const startZOffset = isDesktop ? 1000 : 800;
            const endBuffer = isDesktop ? 1000 : 500;

            // Recalculated Travel
            const totalTravel = startZOffset + ((cases.length - 1) * spacingZ) + endBuffer;

            // --- INITIAL SETUP ---
            cards.forEach((card, i) => {
                const isEven = i % 2 === 0;
                // Desktop: Alternating | Mobile: Center
                const initialX = isDesktop ? (isEven ? "-28vw" : "28vw") : 0;

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
                    end: isDesktop ? "+=5000" : "+=6000", // More scroll for mobile to handle sequential length
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Master Movement
            tl.to(cards, {
                z: `+=${totalTravel}`,
                ease: "none",
                duration: 1
            }, 0);

            // Visibility Logic
            cards.forEach((card, i) => {
                const initialZ = -startZOffset - (i * spacingZ);

                // --- FADE ZONES ---
                // DESKTOP: Overlap allowed (-1500 start)
                // MOBILE: Strict sequence. 
                // Spacing 1600.
                // Out: 200 -> 800.
                // In: -800 -> -200.
                // When N is 800, N+1 is -800 (Start In). Perfect sequence.

                const fadeInStart = isDesktop ? -1500 : -800;
                const fadeInEnd = isDesktop ? -500 : -200;
                const fadeOutStart = 200;
                const fadeOutEnd = 800;

                const getProgress = (z: number) => (z - initialZ) / totalTravel;

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
                if (pOutStart < 1) {
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
        <section ref={triggerRef} className="relative bg-[#050a18] text-white">
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
                className="h-screen w-full overflow-hidden relative flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d] z-10"
            >
                {/* Fixed Title / Background Element */}
                <div className="absolute top-10 w-full text-center z-20 pointer-events-none opacity-30 mix-blend-overlay">
                    <h2 className="text-xl font-mono uppercase tracking-[0.5em] text-white">Selected Projects</h2>
                </div>

                {cases.map((project, index) => (
                    <div
                        key={project.id}
                        className="project-card absolute w-[80vw] md:w-[600px] h-[55vh] md:h-[500px] rounded-[10px] bg-white/5 border border-white/10 overflow-hidden will-change-transform shadow-2xl"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                        {/* Card Content Overlay */}
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col z-10">

                            {/* Top: Tags */}
                            <div className="flex justify-between items-start">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] border border-white/20 text-[10px] uppercase tracking-wider text-white font-medium bg-black/30 backdrop-blur-sm">
                                    {project.category}
                                </span>
                                <span className="text-white/60 text-xs font-mono border border-white/10 px-2 py-1 rounded-[5px] bg-black/20">
                                    {project.year}
                                </span>
                            </div>

                            {/* Bottom Group: Title, Desc, Results */}
                            <div className="mt-auto space-y-6">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                                        {project.client}
                                    </h3>
                                    <p className="text-white/80 text-sm leading-relaxed mt-2 line-clamp-2 drop-shadow-md">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                                    <div>
                                        <p className="text-white/60 text-[10px] uppercase tracking-wider mb-1">Impact</p>
                                        <p className="text-2xl font-bold text-white tracking-tight">{project.result}</p>
                                    </div>

                                    <button className="w-12 h-12 rounded-[5px] border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md">
                                        <ArrowUpRight strokeWidth={1.5} className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
