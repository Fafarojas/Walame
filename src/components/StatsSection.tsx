"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
    { value: "100%", label: "Strategies for Business Growth and Market Expansion" },
    { value: "90%", label: "Global Corporations and Multinational Enterprises" },
    { value: "10k", label: "Companies collaborate to achieve goals and innovate" },
];

export function StatsSection() {
    return (
        <section className="py-32 bg-white text-black relative z-20">
            <div className="mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    <div className="md:col-span-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-[42px] leading-tight font-medium tracking-tight"
                        >
                            How can we help <br /> your business
                        </motion.h2>
                    </div>

                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <p className="text-gray-500 text-sm leading-7 mb-6">
                                At Walame, we warmly invite you to arrange an in-depth consultation designed to thoroughly examine the intricacies of your business. In this extensive session, we will dive into a multitude of topics, including cutting-edge growth strategies.
                            </p>

                            <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-black hover:text-blue-600 transition-colors border-b border-black/20 pb-0.5 hover:border-blue-600">
                                Learn More <ArrowRight className="ml-1 w-3 h-3" />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-gray-500 text-sm leading-7">
                                Our team of highly experienced professionals is committed to delivering tailored advice that addresses your distinct needs and ambitions. We aim to ensure that you depart with not only actionable insights but also a clear roadmap.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i }}
                            className="pr-8"
                        >
                            <h3 className="text-5xl font-medium mb-4 tracking-tight">{stat.value}</h3>
                            <p className="text-gray-400 text-xs uppercase tracking-wide font-medium leading-relaxed">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
