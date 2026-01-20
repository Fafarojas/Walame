"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "What is the Walame",
        answer: "Walame is an innovative AI solution designed to assist your business in achieving significant growth. By leveraging advanced algorithms and data analytics, Walame provides tailored strategies that empower you to make informed decisions, optimize operations, and enhance customer engagement."
    },
    {
        question: "How does Walawe work?",
        answer: "Walawe works by integrating seamlessly with your existing systems to analyze data patterns and predict market trends."
    },
    {
        question: "Can Walawe improve customer service?",
        answer: "Yes, our AI-powered chatbots and analysis tools can significantly improve response times and customer satisfaction."
    },
    {
        question: "How can Walawe find new opportunities?",
        answer: "Our market analysis algorithms scan for emerging trends and gaps in the market that your business can capitalize on."
    },
    {
        question: "What benefits does Walawe offer businesses?",
        answer: "Key benefits include increased operational efficiency, data-driven decision making, and automated customer support."
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white text-black">
            <div className=" mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-medium tracking-tight mb-6"
                        >
                            Frequently <br /> Asked Question
                        </motion.h2>
                        <p className="text-gray-500 text-sm">
                            Here are some frequently asked questions with answers to clarify doubts.
                        </p>
                    </div>

                    <div className="md:w-2/3">
                        <div className="divide-y divide-gray-200">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="py-6"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                        className="flex justify-between items-center w-full text-left focus:outline-none group"
                                    >
                                        <span className="text-lg font-medium group-hover:text-brand-blue transition-colors">
                                            {faq.question}
                                        </span>
                                        <span className="ml-4 text-gray-400 group-hover:text-brand-blue transition-colors">
                                            {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pt-4 text-gray-500 text-sm leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
