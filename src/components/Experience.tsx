"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePerformance } from "@/context/PerformanceContext";

interface ExperienceProps {
  onShowCertificate: (type: 'lnt' | 'christ') => void;
}

export default function Experience({ onShowCertificate }: ExperienceProps) {
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";

  return (
    <section id="experience" className="relative z-20 bg-transparent pt-16 md:pt-32 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 md:sticky md:top-32"
        >
          <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-widest mb-4">
            Professional Experience
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Building enterprise-scale AI solutions.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-2/3 flex flex-col gap-8 w-full"
        >
          <motion.div
            whileHover={isLowEnd ? {} : { scale: 1.02 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className={`relative border border-white/10 rounded-[2rem] p-8 md:p-12 transition-colors duration-500 group overflow-hidden ${isLowEnd ? 'bg-[#222]' : 'bg-white/5 backdrop-blur-md'}`}
          >
            {/* Subtle liquid highlight that appears on hover for the card itself */}
            {!isLowEnd && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                <div className="rotating-border-glow opacity-100" />
              </>
            )}

            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">AI/ML Internship</h4>
                <p className="text-xl text-emerald-400 font-medium">Larsen & Toubro EduTech</p>
              </div>
              <div className="text-white/60 text-sm font-mono bg-black/40 px-5 py-2.5 rounded-full inline-block border border-white/5 shadow-inner">
                April – May 2026 | Chennai, India
              </div>
            </div>

            <p className="relative z-10 text-white/70 leading-relaxed mb-10 text-lg md:text-xl font-light">
              Successfully completed an intensive internship program at Larsen & Toubro Campus, Chennai, focusing on practical AI/ML applications and system-level development. This experience reinforced my expertise in real-world AI implementation and problem-solving in enterprise environments.
            </p>

            <motion.button
              onClick={() => onShowCertificate('lnt')}
              whileHover={isLowEnd ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
              className={`relative z-10 inline-flex items-center gap-3 px-8 py-4 text-white font-bold tracking-wide rounded-full overflow-hidden group ${isLowEnd ? 'bg-[#444]' : 'shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'}`}
              style={isLowEnd ? {} : {
                background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "inset 0px 2px 4px rgba(255,255,255,0.4), inset 0px -4px 8px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span className={`flex items-center gap-3 ${isLowEnd ? '' : 'mix-blend-screen'}`}>
                Show Certificate
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={isLowEnd ? {} : { scale: 1.02 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className={`relative border border-white/10 rounded-[2rem] p-8 md:p-12 transition-colors duration-500 group overflow-hidden ${isLowEnd ? 'bg-[#222]' : 'bg-white/5 backdrop-blur-md'}`}
          >
            {/* Subtle liquid highlight that appears on hover for the card itself */}
            {!isLowEnd && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                <div className="rotating-border-glow opacity-100" />
              </>
            )}

            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">Pre-Incubatee / Co-Founder</h4>
                <p className="text-xl text-emerald-400 font-medium">CHRIST Incubation Centre (CIC)</p>
              </div>
              <div className="text-white/60 text-sm font-mono bg-black/40 px-5 py-2.5 rounded-full inline-block border border-white/5 shadow-inner">
                Nov 2025 – Present | Bangalore, India
              </div>
            </div>

            <p className="relative z-10 text-white/70 leading-relaxed mb-10 text-lg md:text-xl font-light">
              Selected for the prestigious Pre-Incubation program at CHRIST Incubation Centre (CIC), Kengeri Campus, alongside a team of co-founders. Actively participating in the university&apos;s entrepreneurial ecosystem to build, scale, and turn innovative technical ideas into viable real-world products.
            </p>

            <motion.button
              onClick={() => onShowCertificate('christ')}
              whileHover={isLowEnd ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
              className={`relative z-10 inline-flex items-center gap-3 px-8 py-4 text-white font-bold tracking-wide rounded-full overflow-hidden group ${isLowEnd ? 'bg-[#444]' : 'shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'}`}
              style={isLowEnd ? {} : {
                background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "inset 0px 2px 4px rgba(255,255,255,0.4), inset 0px -4px 8px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span className={`flex items-center gap-3 ${isLowEnd ? '' : 'mix-blend-screen'}`}>
                Show Certificate
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
