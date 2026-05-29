"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { usePerformance } from "@/context/PerformanceContext";

const CONTACT_LINKS = [
  {
    id: "email",
    label: "Email",
    value: "dan.abraham1602@gmail.com",
    href: "mailto:dan.abraham1602@gmail.com",
    icon: <Mail className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-500" />,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Dan Jose",
    href: "https://www.linkedin.com/in/dan-jose-4997b5315/",
    icon: <FaLinkedin className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-500" />,
  },
  {
    id: "github",
    label: "GitHub",
    value: "dan-jose2006",
    href: "https://github.com/dan-jose2006",
    icon: <FaGithub className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" />,
  },
];

export default function Contact() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";

  return (
    <section id="contact" className="relative z-20 bg-transparent pt-32 pb-24 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">intelligent.</span>
            </h2>
          </div>
          <p className="text-xl text-white/70 mb-12 max-w-lg">
            I&apos;m currently looking for new opportunities and collaborations. My inbox is always open.
          </p>
          <motion.a
            href="mailto:dan.abraham1602@gmail.com"
            whileHover={isLowEnd ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className={`inline-flex items-center justify-center px-10 py-5 font-bold text-white rounded-full uppercase tracking-widest text-sm ${isLowEnd ? 'bg-[#333]' : 'shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'}`}
            style={isLowEnd ? {} : {
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "inset 0px 2px 4px rgba(255,255,255,0.4), inset 0px -4px 8px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span className={isLowEnd ? '' : 'mix-blend-screen'}>Say Hello</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 flex flex-col gap-4 w-full relative"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {CONTACT_LINKS.map((link, idx) => (
            <a
              key={link.id}
              href={link.href}
              target={link.id !== "email" ? "_blank" : undefined}
              rel={link.id !== "email" ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="relative group flex items-center justify-between p-6 rounded-3xl z-10"
            >
              {hoveredIdx === idx && (
                <motion.span
                  layoutId="contact-hover-droplet"
                  className={`absolute inset-0 rounded-3xl -z-10 ${isLowEnd ? 'bg-white/10' : ''}`}
                  style={isLowEnd ? {} : {
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: "inset 0px 2px 4px rgba(255,255,255,0.3), inset 0px -4px 8px rgba(0,0,0,0.1), 0px 8px 24px rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  transition={isLowEnd ? { duration: 0.2 } : { type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}

              {/* Default background */}
              <div className={`absolute inset-0 border border-white/10 rounded-3xl -z-20 transition-opacity duration-500 ${isLowEnd ? 'bg-[#222]' : 'bg-white/5'} ${hoveredIdx === idx ? 'opacity-0' : 'opacity-100'}`} />

              <div className={`flex items-center gap-6 ${isLowEnd ? '' : 'mix-blend-screen'}`}>
                {link.icon}
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-widest mb-1 group-hover:text-white/70 transition-colors">{link.label}</p>
                  <p className="text-lg md:text-xl text-white font-medium">{link.value}</p>
                </div>
              </div>
              <ArrowUpRight className={`w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ${isLowEnd ? '' : 'mix-blend-screen'}`} />
            </a>
          ))}
        </motion.div>

      </div>

      <div className="mt-32 pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center">
        <p className="text-white/40 text-sm tracking-wide">
          &copy; {new Date().getFullYear()} Dan Abraham Jose. All rights reserved.
        </p>
      </div>
    </section>
  );
}
