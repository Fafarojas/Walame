"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          layout
          transition={{ duration: 0.3, ease: "linear" }}
          className={cn(
            "flex items-center justify-between pointer-events-auto mx-auto",
            isScrolled
              ? "w-full md:justify-center md:gap-2"
              : "w-full"
          )}
        >

          {/* Segment 1: Logo */}
          <motion.div layout className="flex-shrink-0">
            <Link href="/" className="group">
              <motion.div
                className={cn(
                  "rounded-[5px] h-12 flex items-center px-5 transition-all duration-300",
                  isScrolled
                    ? "bg-black/30 backdrop-blur-xl border border-white/10"
                    : "bg-transparent border border-transparent"
                )}
              >
                <span className="text-sm font-medium tracking-wide text-white whitespace-nowrap">
                  Walame
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Segment 2: Navigation (Desktop) */}
          <motion.div
            layout
            className={cn(
              "hidden md:flex rounded-[5px] h-12 items-center px-1 gap-1 transition-all duration-300",
              isScrolled
                ? "bg-black/30 backdrop-blur-md border border-white/10"
                : "bg-transparent border border-transparent"
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-[13px] font-medium text-white hover:bg-black/30 rounded-lg transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          {/* Segment 3: Action / Mobile Toggle */}
          <motion.div layout className="flex gap-2 flex-shrink-0">
            {/* Desktop Action */}
            <button className={cn(
              "hidden md:flex rounded-[5px] h-12 items-center px-5 text-sm font-medium text-white transition-all gap-2 group whitespace-nowrap",
              isScrolled
                ? "bg-black/30 backdrop-blur-xl border border-white/10"
                : "bg-transparent border border-transparent"
            )}>
              <span>Book a call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className={cn(
                "md:hidden rounded-[5px] h-12 w-12 flex items-center justify-center text-white transition-all",
                isScrolled
                  ? "bg-black/30 backdrop-blur-xl border border-white/10 hover:bg-white/10"
                  : "bg-transparent border border-transparent hover:bg-black/30"
              )}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </motion.div>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#050a18] flex flex-col pt-6 px-4 pb-6"
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center">
              {/* Logo Placeholder (matches closed state position) */}
              <div className="h-12 flex items-center px-5 border border-transparent">
                <span className="text-sm font-medium tracking-wide text-white whitespace-nowrap">
                  Walame
                </span>
              </div>

              {/* Close Button (matches closed state position) */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-[5px] bg-transparent border border-transparent hover:bg-white/10 flex items-center justify-center text-white transition-all duration-300"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 flex flex-col justify-center w-full">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative overflow-hidden w-full border-b border-white/5"
                >
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.1,
                      duration: 0.5,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="py-6"
                  >
                    <span className="text-3xl md:text-5xl font-light text-white tracking-tight group-hover:text-blue-500 transition-colors duration-300 block">
                      {link.name}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-[1px] bg-white/10 mb-4" />
              <div className="flex justify-between w-full text-xs text-white/40 font-mono uppercase tracking-wider">
                <div className="flex gap-4 w-full flex justify-between">
                  <a href="#" className="hover:text-white transition-colors">Facebook</a>
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </>
  );
}
