"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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

export function IndustriesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            // Calculate exact scroll distance
            // We scroll until the right edge of the track meets the right edge of the viewport
            // Subtracting a small buffer if needed, or ensuring padding handles it
            const scrollDistance = track.scrollWidth - window.innerWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=1500",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // 1. Fade out header
            tl.to(".section-header", {
                opacity: 0,
                y: -100,
                duration: 0.2,
                ease: "power1.out"
            }, 0)

                // 2. Move cards UP to center
                .to(track, {
                    y: "-15vh",
                    duration: 0.8,
                    ease: "power2.out"
                }, 0)

                // 3. Horizontal Scroll Track
                .to(track, {
                    x: -scrollDistance,
                    ease: "none",
                    duration: 5
                }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-[#050a18] overflow-hidden relative">
            <div ref={triggerRef} className="h-screen w-full flex flex-col justify-center px-0 py-20 overflow-hidden relative">

                {/* Section Header */}
                <div className="section-header absolute top-20 left-6 md:left-12 max-w-7xl w-full z-10 origin-top px-6 md:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                                Success Cases
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base max-w-sm">
                                Real results orchestrated by our intelligent agents across diverse industries.
                            </p>
                        </div>
                        <div className="hidden md:flex justify-end text-white/40 text-sm font-mono items-center gap-4">
                            SCROLL TO EXPLORE <span className="block w-12 h-[1px] bg-white/40"></span>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Track */}
                <div
                    ref={trackRef}
                    className="cases-track flex gap-8 w-[fit-content] items-center pl-6 md:pl-12 pr-6 md:pr-12 h-full mt-[30vh] will-change-transform"
                >
                    {cases.map((project, index) => (
                        <div
                            key={project.id}
                            className="case-card w-[85vw] md:w-[600px] h-[60vh] md:h-[50vh] 2xl:h-[550px] flex-shrink-0 relative group rounded-[5px] overflow-hidden bg-white/5 border border-white/10"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${project.image})` }}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500" />

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
                                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:translate-x-2 transition-transform duration-300">
                                            {project.client}
                                        </h3>
                                        <p className="text-white/70 text-sm leading-relaxed mt-2 line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                                        <div>
                                            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Impact</p>
                                            <p className="text-2xl font-bold text-white tracking-tight">{project.result}</p>
                                        </div>

                                        <button className="w-12 h-12 rounded-[5px] border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 backdrop-blur-md">
                                            <ArrowUpRight strokeWidth={1.5} className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
