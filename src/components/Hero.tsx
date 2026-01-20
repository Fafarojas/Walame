"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative min-h-[100vh] flex flex-col items-center justify-end overflow-hidden bg-[#050a18] py-10">
            {/* Background Gradient - Top Dark to Bottom Light Blue/Cyan */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-cover bg-center bg-[url('/assets/hero-bg.png')]" />
            </div>

            {/* Geometric Center Graphic */}
            <div className="absolute top-[30%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center pointer-events-none select-none z-0 opacity-80">
                {/* Concentric Diamonds */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: 45 }}
                    animate={{ scale: 1, opacity: 1, rotate: -315 }}
                    transition={{
                        scale: { duration: 1, ease: "easeOut" },
                        opacity: { duration: 1, ease: "easeOut" },
                        rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute -inset-20 md:-inset-40 border border-white/15"
                />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: 45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 405 }}
                    transition={{
                        scale: { duration: 1, delay: 0.1, ease: "easeOut" },
                        opacity: { duration: 1, delay: 0.1, ease: "easeOut" },
                        rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute inset-0 border border-white/15"
                />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: 45 }}
                    animate={{ scale: 1, opacity: 1, rotate: -315 }}
                    transition={{
                        scale: { duration: 1, delay: 0.2, ease: "easeOut" },
                        opacity: { duration: 1, delay: 0.2, ease: "easeOut" },
                        rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute inset-[25%] border border-white/15"
                />

                {/* Central Logo Image */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative z-10"
                >
                    <Image
                        src="/assets/logo.png"
                        alt="Walame Logo"
                        width={200}
                        height={200}
                        className="object-contain w-20 md:w-[200px] h-auto"
                        priority
                    />
                </motion.div>
            </div>

            <div className=" w-full mx-auto px-6 md:px-12 relative z-10 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-end">

                    {/* Left Column: Pill + Heading */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl 2xl:text-[80px] font-medium tracking-tight text-white leading-[1.05]"
                        >
                            Automate & <br />
                            manage your <br />
                            business with ease</motion.h1>
                    </div>

                    {/* Right Column: Description + CTA (Aligned to bottom) */}
                    <div className="lg:col-span-5 flex flex-col md:items-end items-center pb-4">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-sm md:text-base text-gray-100 md:text-gray-200 mb-8 text-left md:text-right leading-relaxed font-light max-w-md"
                        >
                            Discover cutting-edge AI solutions designed to elevate your business to
                            new heights and drive sustainable growth in today's competitive
                            landscape.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap items-center gap-6 flex-row md:w-auto w-full"
                        >
                            <button className="md:h-12 flex-1 h-10 md:px-8 px-6 rounded-[5px] bg-white text-black md:text-sm text-[10px] font-semibold hover:bg-gray-100 transition-colors">
                                Free Consultation
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="md:w-10 md:h-10 w-8 h-8 rounded-full border-2 border-white bg-gray-800 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" className="w-full h-full object-cover " />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col items-start leading-none gap-1">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                        <span className="text-white text-sm font-bold">4.8</span>
                                    </div>
                                    <span className="text-[10px] text-gray-200 font-medium whitespace-nowrap">Trust Score</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Fade at bottom to merge with next section - adjusted for smoother transition */}
            <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </section>
    );
}

