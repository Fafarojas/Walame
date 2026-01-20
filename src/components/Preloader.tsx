"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = "hidden";

        // Counter animation logic
        const duration = 2000; // 2 seconds total load time
        const intervalTime = duration / 100;

        const timer = setInterval(() => {
            setCounter((prev) => {
                const next = prev + 1;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        // Cleanup phase
        if (counter === 100) {
            // Small delay at 100% before exiting
            const delay = setTimeout(() => {
                setIsLoading(false);
                document.body.style.overflow = "";
            }, 800);
            return () => clearTimeout(delay);
        }

        return () => clearInterval(timer);
    }, [counter]);

    // Curve definition for the slide-up SVG path (optional advanced effect, keeping it simple first with standard slide)
    // We'll use a clean slide up with a staggered delay for children.

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <>
                    {/* Main Background Curtain */}
                    <motion.div
                        key="preloader"
                        initial={{ y: 0 }}
                        exit={{
                            y: "-100vh",
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
                        }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050a18]"
                    >
                        {/* Center Content */}
                        <div className="flex flex-col items-center gap-4 relative overflow-hidden">
                            {/* Logo/Text Reveal */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                <Image
                                    src="/assets/logo.png"
                                    alt="Walame"
                                    width={120}
                                    height={120}
                                    className="w-24 md:w-32 object-contain"
                                    priority
                                />
                            </motion.div>

                            {/* Text "Orchestrating..." */}
                            <motion.div
                                className="overflow-hidden"
                            >
                                <motion.p
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-white/40 text-xs uppercase tracking-[0.2em] font-light"
                                >
                                    Walame Intelligence
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Bottom Counter */}
                        <div className="absolute bottom-10 right-10 md:bottom-12 md:right-12">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: counter === 100 ? 0 : 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-end gap-1"
                            >
                                <span className="text-4xl md:text-6xl font-light text-white tabular-nums tracking-tighter leading-none">
                                    {counter}
                                </span>
                                <span className="text-sm md:text-base text-white/50 mb-1 font-mono">%</span>
                            </motion.div>
                        </div>

                        {/* Decorative Line Loader */}
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
                            <motion.div
                                className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                initial={{ width: "0%", opacity: 1 }}
                                animate={{
                                    width: `${counter}%`,
                                    opacity: counter === 100 ? 0 : 1
                                }}
                                transition={{
                                    width: { ease: "linear", duration: 0 },
                                    opacity: { duration: 0.5, delay: 0.2 } // Slight delay to let 100% register mentally before vanishing
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Secondary Layer for Depth (optional slide up slightly later) */}
                    <motion.div
                        key="preloader-layer"
                        initial={{ y: 0 }}
                        exit={{
                            y: "-100vh",
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Exits WITH main but perhaps slightly offset if desired, here keeping sync for clean cut
                        }}
                        className="fixed inset-0 z-[9998] bg-black pointer-events-none"
                    />
                </>
            )}
        </AnimatePresence>
    );
}
