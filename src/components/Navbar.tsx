"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { usePerformance } from "@/context/PerformanceContext";

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 md:p-8 pointer-events-none">

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`text-white font-bold text-lg md:text-xl tracking-tight pointer-events-auto truncate max-w-[120px] sm:max-w-none ${isLowEnd ? '' : 'drop-shadow-md'}`}
      >
        Dan Abraham Jose
      </motion.div>

      {/* Navigation Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-2 md:gap-3 pointer-events-auto"
      >
        {/* Desktop Links */}
        <div
          className={`hidden lg:flex items-center gap-1 rounded-full p-1.5 shadow-2xl mr-2 ${isLowEnd ? 'bg-[#2a2a2a]' : 'bg-[#1a1a1a]/40 backdrop-blur-md border border-white/10'}`}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              className="relative px-5 py-2 text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors z-10"
            >
              {hoveredLink === link.name && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className={`absolute inset-0 rounded-full -z-10 ${isLowEnd ? 'bg-white/10' : ''}`}
                  style={isLowEnd ? {} : {
                    background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
                    boxShadow: "inset 0px 1px 2px rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  transition={isLowEnd ? { duration: 0.2 } : { type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 ${isLowEnd ? '' : 'mix-blend-screen'}`}>{link.name}</span>
            </a>
          ))}
        </div>

        {/* Buttons */}
        <a
          href="/resume.pdf"
          target="_blank"
          className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 text-white font-medium rounded-full hover:bg-white/10 transition-colors text-xs md:text-sm whitespace-nowrap ${isLowEnd ? 'bg-[#333]' : 'bg-white/5 border border-white/10 backdrop-blur-md shadow-lg'}`}
        >
          <Download className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Resume</span>
          <span className="sm:hidden">CV</span>
        </a>

        <a
          href="#contact"
          className={`px-4 py-2 md:px-6 md:py-2.5 text-white font-bold rounded-full hover:bg-emerald-400 hover:text-[#121212] transition-all duration-500 uppercase tracking-wider text-[10px] md:text-xs whitespace-nowrap ${isLowEnd ? 'bg-[#444]' : 'bg-white/10 backdrop-blur-xl border border-white/20 hover:border-emerald-400 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]'}`}
        >
          Let&apos;s Talk
        </a>
      </motion.div>
    </div>
  );
}
