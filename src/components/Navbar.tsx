"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerformance } from "@/context/PerformanceContext";

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-8 pointer-events-none">
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`text-white font-bold text-xl tracking-tight pointer-events-auto ${isLowEnd ? '' : 'drop-shadow-md'}`}
      >
        Dan Abraham Jose
      </motion.div>
      
      {/* Desktop Links */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseLeave={() => setHoveredLink(null)}
        className={`hidden md:flex items-center gap-2 pointer-events-auto rounded-full p-1.5 shadow-2xl ${isLowEnd ? 'bg-[#2a2a2a]' : 'bg-[#1a1a1a]/20 backdrop-blur-sm border border-white/5'}`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onMouseEnter={() => setHoveredLink(link.name)}
            className="relative px-6 py-2.5 text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors z-10"
          >
            {hoveredLink === link.name && (
              <motion.span
                layoutId="nav-hover-pill"
                className={`absolute inset-0 rounded-full -z-10 ${isLowEnd ? 'bg-white/10' : ''}`}
                style={isLowEnd ? {} : {
                  background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "inset 0px 2px 4px rgba(255,255,255,0.6), inset 0px -4px 8px rgba(0,0,0,0.2), 0px 8px 16px rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
                transition={isLowEnd ? { duration: 0.2 } : { type: "spring", bounce: 0.25, duration: 0.6 }}
              />
            )}
            <span className={`relative z-10 ${isLowEnd ? '' : 'mix-blend-screen'}`}>{link.name}</span>
          </a>
        ))}
        
        <a 
          href="#contact" 
        >
          Let&apos;s Talk
        </a>
      </motion.div>
    </div>
  );
}
