"use client";

import Link from "next/link";
import { Star, Twitter, Linkedin, Github, Disc } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white relative overflow-hidden pt-12 pb-6 ">
            <div className="mx-auto px-6 md:px-12 relative z-10 ">
                <div className="flex flex-col lg:flex-row gap-4">

                    {/* Left Card - Blue Gradient */}
                    <div className="w-full lg:w-[400px] bg-cover bg-center bg-[url('/assets/hero-bg.png')] rounded-[5px] p-10 flex flex-col justify-between text-white relative overflow-hidden ">
                        <div>
                            <div className="flex items-center gap-2 mb-8">
                                <span className="text-xl font-bold tracking-wide">Walame</span>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-medium leading-tight mb-2">
                                Smarter sales automation,<br /> powered by AI.
                            </h2>

                            <div className="mt-12">
                                <p className="font-serif italic text-blue-100 mb-4 text-lg">Stay in touch!</p>
                                <div className="flex gap-3">
                                    <SocialIcon icon={Disc} />
                                    <SocialIcon icon={Twitter} />
                                    <SocialIcon icon={Linkedin} />
                                    <SocialIcon icon={Github} />
                                </div>
                            </div>
                        </div>

                        {/* Subtle glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />
                    </div>

                    {/* Right Section - Links & Newsletter */}
                    <div className="flex-1 bg-[#000B20] rounded-[5px] p-6 lg:p-16 relative flex flex-col border border-white/5">

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20 relative z-10">
                            {/* Navigation */}
                            <div className="space-y-6">
                                <h3 className="font-serif italic text-gray-400 text-lg">Navigation</h3>
                                <ul className="space-y-4">
                                    {["Home", "About", "Services"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-sm 2xl:text-[20px] text-white font-medium hover:text-blue-500 transition-colors">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company */}
                            <div className="space-y-6">
                                <h3 className="font-serif italic text-gray-400 text-lg">Company</h3>
                                <ul className="space-y-4">
                                    {["Contact Us", "Terms and Condition", "Privacy Policy"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-sm 2xl:text-[20px] text-white font-medium hover:text-blue-500 transition-colors">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Products */}
                            <div className="space-y-6">
                                <h3 className="font-serif italic text-gray-400 text-lg">Products</h3>
                                <ul className="space-y-4">
                                    {["Walame AI", "Walame Chat", "Walame CRM"].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-sm 2xl:text-[20px] text-white font-medium hover:text-blue-500 transition-colors">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                        </div>

                        {/* Newsletter & Copyright */}
                        <div className="mt-auto relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">AI moves fast.</p>
                                    <h4 className="text-1xl 2xl:text-2xl font-semibold text-white mb-6">Stay ahead with Walame</h4>
                                </div>

                                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        className="flex-1 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-[5px] px-6 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none shadow-sm w-full"
                                    />
                                    <button className="bg-white text-[#000B20] px-8 py-3 rounded-[5px] text-sm font-medium hover:bg-gray-100 transition-colors shadow-lg w-full md:w-auto">
                                        Subscribe
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 mt-8">
                                <p className="text-gray-500 text-xs text-center md:text-left w-full">
                                    &copy; 2025 Walame. All rights reserved.
                                </p>
                                <div className="text-gray-500 text-[10px] mt-4 md:mt-2 md:ml-auto md:text-right w-full md:w-auto text-center md:whitespace-nowrap">
                                    Made by Rojascode
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Large Background Watermark */}
            <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 w-full overflow-hidden flex justify-center">
                <h1 className="text-[18vw] font-bold text-white tracking-tighter leading-none whitespace-nowrap opacity-[0.03]">
                    Walame
                </h1>
            </div>
        </footer>
    );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <div className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center cursor-pointer transition-colors group">
            <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </div>
    )
}

