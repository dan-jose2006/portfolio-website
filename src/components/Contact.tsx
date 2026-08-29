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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");

    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json,
      });
      const data = await res.json();
      console.log("[Web3Forms Debug]", data);
      
      if (data.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("[Web3Forms Error]", data.message);
        setStatus("error");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative z-20 bg-transparent pt-16 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <div className="mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6 tracking-tight">
              Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">intelligent.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-8 max-w-lg font-light">
            I&apos;m currently looking for new opportunities and collaborations. Fill out the form and I&apos;ll get back to you shortly.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4 max-w-lg w-full">
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="Your Name" 
              className={`w-full px-4 py-3.5 sm:px-6 sm:py-4 rounded-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all text-sm sm:text-base ${isLowEnd ? 'bg-[#333]' : 'bg-white/5 backdrop-blur-md'}`}
            />
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="Your Email" 
              className={`w-full px-4 py-3.5 sm:px-6 sm:py-4 rounded-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all text-sm sm:text-base ${isLowEnd ? 'bg-[#333]' : 'bg-white/5 backdrop-blur-md'}`}
            />
            <textarea 
              name="message" 
              required 
              placeholder="Your Message" 
              rows={4}
              className={`w-full px-4 py-3.5 sm:px-6 sm:py-4 rounded-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all resize-none text-sm sm:text-base ${isLowEnd ? 'bg-[#333]' : 'bg-white/5 backdrop-blur-md'}`}
            />
            
            <motion.button
              type="submit"
              disabled={status === "loading" || status === "success"}
              whileHover={isLowEnd || status === "loading" || status === "success" ? {} : { scale: 1.02 }}
              whileTap={status === "loading" || status === "success" ? {} : { scale: 0.98 }}
              className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 font-bold text-white rounded-xl uppercase tracking-widest text-xs sm:text-sm mt-2 transition-all ${
                status === "success" 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : isLowEnd 
                    ? 'bg-[#444]' 
                    : 'shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
              }`}
              style={status === "success" || isLowEnd ? {} : {
                background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "inset 0px 2px 4px rgba(255,255,255,0.4), inset 0px -4px 8px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span className={status === "success" || isLowEnd ? '' : 'mix-blend-screen'}>
                {status === "idle" && "Send Message"}
                {status === "loading" && "Sending..."}
                {status === "success" && "Message Sent!"}
                {status === "error" && "Error! Try Again"}
              </span>
            </motion.button>
            {status === "error" && (
               <p className="text-red-400 text-xs sm:text-sm mt-2 text-center">Something went wrong. Please try again or use the direct email link.</p>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 flex flex-col gap-3.5 sm:gap-4 w-full relative"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {CONTACT_LINKS.map((link, idx) => (
            <a
              key={link.id}
              href={link.href}
              target={link.id !== "email" ? "_blank" : undefined}
              rel={link.id !== "email" ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="relative group flex items-center justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl z-10"
            >
              {hoveredIdx === idx && (
                <motion.span
                  layoutId="contact-hover-droplet"
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl -z-10 ${isLowEnd ? 'bg-white/10' : ''}`}
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
              <div className={`absolute inset-0 border border-white/10 rounded-2xl sm:rounded-3xl -z-20 transition-opacity duration-500 ${isLowEnd ? 'bg-[#222]' : 'bg-white/5'} ${hoveredIdx === idx ? 'opacity-0' : 'opacity-100'}`} />

              <div className={`flex items-center gap-4 sm:gap-6 min-w-0 ${isLowEnd ? '' : 'mix-blend-screen'}`}>
                <div className="shrink-0">
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest mb-0.5 sm:mb-1 group-hover:text-white/70 transition-colors">{link.label}</p>
                  <p className="text-sm sm:text-lg md:text-xl text-white font-medium truncate sm:break-normal">{link.value}</p>
                </div>
              </div>
              <ArrowUpRight className={`w-5 h-5 sm:w-6 sm:h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2 ${isLowEnd ? '' : 'mix-blend-screen'}`} />
            </a>
          ))}
        </motion.div>

      </div>

      <div className="mt-16 md:mt-32 pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center">
        <p className="text-white/40 text-sm tracking-wide">
          &copy; {new Date().getFullYear()} Dan Abraham Jose. All rights reserved.
        </p>
      </div>
    </section>
  );
}
