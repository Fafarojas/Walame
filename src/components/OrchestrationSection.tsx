"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Link as LinkIcon, PieChart, Command } from "lucide-react";
import { cn } from "@/lib/utils";


const cardsData = [
    {
        id: "01.",
        title: "Amplify Intelligence",
        icon: Zap,
        image: "/assets/bgcards/1.jpg",
        desc: "Coordinate your entire organization through orchestrated agents that ensure precision, compliance, and efficiency.",
    },
    {
        id: "02.",
        title: "Command Global Operations",
        icon: Command,
        image: "/assets/bgcards/2.jpg",
        desc: "Coordinate your entire organization through orchestrated agents that ensure precision, compliance, and efficiency everywhere you operate.",
    },
    {
        id: "03.",
        title: "Eliminate Silos",
        icon: LinkIcon,
        image: "/assets/bgcards/3.jpg",
        desc: "Coordinate your entire organization through orchestrated agents that ensure precision.",
    },
    {
        id: "04.",
        title: "Scale with Clarity",
        icon: PieChart,
        image: "/assets/bgcards/4.jpg",
        desc: "Coordinate your entire organization through orchestrated agents that ensure precision.",
    },
];

export function OrchestrationSection() {
    // Default active is 01 (Left/Top column)
    const [activeId, setActiveId] = useState("01.");

    // Helper to determine active column
    const isCol1Active = activeId === "01.";
    const isCol2Active = activeId === "02.";
    const isCol3Active = activeId === "03." || activeId === "04.";

    const [isMobile, setIsMobile] = useState(false);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Mobile GSAP animation removed as per request - cards should be always open on mobile.


    return (
        <section className="py-24 bg-[#fafafa] relative overflow-hidden text-[#050a18]">

            {/* Fade mask for grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-transparent to-[#fafafa] z-0 pointer-events-none" />

            <div className="mx-auto px-6 md:px-12 relative z-10">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div className="max-w-xl">

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl font-medium text-[#050a18] tracking-tight leading-[1.1]"
                        >
                            We've orchestrated <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#000B20] to-[#3b82f6]">Intelligence.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-sm text-left"
                    >
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                            Metafore brings clarity, not complexity - uniting every agent into one adaptive
                            system that learns, acts, and evolves across your enterprise.
                        </p>
                        <button className="bg-[#050a18] text-white px-6 py-2.5 rounded-[5px] text-xs font-medium hover:bg-black transition-all hover:shadow-lg flex items-center justify-center gap-2">
                            Explore More
                        </button>
                    </motion.div>
                </div>

                {/* Flex Expanding Grid */}
                <div className="flex flex-col md:flex-row h-auto md:h-[400px] 2xl:h-[600px] border border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-white">

                    {/* Column 1: Card 01 */}
                    <motion.div
                        ref={(el) => { cardsRef.current[0] = el }}
                        animate={{ flex: isMobile ? 1 : (isCol1Active ? 2 : 1) }}
                        className="flex flex-col h-[400px] md:h-auto transition-all duration-500 ease-in-out"
                        onViewportEnter={!isMobile ? () => setActiveId("01.") : undefined}
                        viewport={{ margin: "-30% 0px -30% 0px" }}
                    >
                        <InteractiveCard
                            card={cardsData[0]}
                            isActive={isCol1Active}
                            isMobile={isMobile}
                            onMouseEnter={!isMobile ? () => setActiveId("01.") : undefined}
                        />
                    </motion.div>

                    {/* Column 2: Card 02 */}
                    <motion.div
                        ref={(el) => { cardsRef.current[1] = el }}
                        animate={{ flex: isMobile ? 1 : (isCol2Active ? 2 : 1) }}
                        className="flex flex-col h-[400px] md:h-auto transition-all duration-500 ease-in-out"
                        onViewportEnter={!isMobile ? () => setActiveId("02.") : undefined}
                        viewport={{ margin: "-30% 0px -30% 0px" }}
                    >
                        <InteractiveCard
                            card={cardsData[1]}
                            isActive={isCol2Active}
                            isMobile={isMobile}
                            onMouseEnter={!isMobile ? () => setActiveId("02.") : undefined}
                        />
                    </motion.div>

                    {/* Column 3: Stack (Card 03 & 04) */}
                    <motion.div
                        animate={{ flex: isMobile ? 2 : (isCol3Active ? 2 : 1) }}
                        className="flex flex-col h-[800px] md:h-auto transition-all duration-500 ease-in-out divide-y divide-gray-200"
                    >
                        {/* Card 03 */}
                        <motion.div
                            ref={(el) => { cardsRef.current[2] = el }}
                            animate={{ flex: isMobile ? 1 : (activeId === "03." ? 2 : 1) }}
                            className="h-full relative flex flex-col transition-all duration-500 ease-in-out"
                            onViewportEnter={!isMobile ? () => setActiveId("03.") : undefined}
                            viewport={{ margin: "-30% 0px -30% 0px" }}
                        >
                            <InteractiveCard
                                card={cardsData[2]}
                                isActive={activeId === "03."}
                                isMobile={isMobile}
                                onMouseEnter={!isMobile ? () => setActiveId("03.") : undefined}
                            />
                        </motion.div>

                        {/* Card 04 */}
                        <motion.div
                            ref={(el) => { cardsRef.current[3] = el }}
                            animate={{ flex: isMobile ? 1 : (activeId === "04." ? 2 : 1) }}
                            className="h-full relative flex flex-col transition-all duration-500 ease-in-out"
                            onViewportEnter={!isMobile ? () => setActiveId("04.") : undefined}
                            viewport={{ margin: "-30% 0px -30% 0px" }}
                        >
                            <InteractiveCard
                                card={cardsData[3]}
                                isActive={activeId === "04."}
                                isMobile={isMobile}
                                onMouseEnter={!isMobile ? () => setActiveId("04.") : undefined}
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function InteractiveCard({
    card,
    isActive,
    isMobile,
    onMouseEnter,
}: {
    card: typeof cardsData[0];
    isActive: boolean;
    isMobile?: boolean;
    onMouseEnter?: () => void;
}) {
    return (
        <div
            onMouseEnter={onMouseEnter}
            className={cn(
                "interactive-card-root relative w-full h-full overflow-hidden transition-all duration-500 cursor-pointer group",
                (!isMobile && isActive) || isMobile
                    ? "bg-gray-900"
                    : "bg-white hover:bg-gray-50",
                // On mobile, we let GSAP handle background color, so we start with white (or default)
            )}
        >
            {/* Content for Active State */}
            {isMobile ? (
                // Mobile: Always present in DOM, controlled by GSAP
                <div
                    className="mobile-card-bg absolute inset-0 z-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${card.image}')` }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            ) : (
                // Desktop: AnimatePresence
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 z-0"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('${card.image}')` }}
                            />
                            {/* Overlay for legibility */}
                            <div className="absolute inset-0 bg-black/20" />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* Content Container */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <span className={cn(
                        "text-4xl font-light transition-colors duration-300 mobile-card-id",
                        (!isMobile && isActive) || isMobile ? "text-white/60" : "text-gray-200 group-hover:text-gray-300"
                    )}>
                        {card.id}
                    </span>
                    <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 mobile-card-icon-box",
                        (!isMobile && isActive) || isMobile ? "bg-white/20 backdrop-blur-md text-white" : "bg-gray-50 text-black group-hover:bg-gray-100"
                    )}>
                        <card.icon className="w-5 h-5 mobile-card-icon" />
                    </div>
                </div>

                <div>
                    <h3 className={cn(
                        "font-medium leading-tight transition-all duration-300 mobile-card-title",
                        (!isMobile && isActive) || isMobile ? "text-3xl mb-4 text-white" : "text-xl text-gray-900"
                    )}>
                        {card.title}
                    </h3>

                    {/* Description only shows for Active */}
                    {isMobile ? (
                        <div className="mobile-card-desc overflow-hidden">
                            <p className="text-gray-200 text-sm leading-relaxed max-w-sm pb-2">
                                {card.desc}
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            initial={false}
                            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                            className="overflow-hidden"
                        >
                            <p className="text-gray-200 text-sm leading-relaxed max-w-sm pb-2">
                                {card.desc}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
