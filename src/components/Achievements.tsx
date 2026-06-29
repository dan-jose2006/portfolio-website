"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import { usePerformance } from "@/context/PerformanceContext";

interface AchievementsProps {
  onShowCertificate: (type: 'unlox-hackathon' | 'yesummit-2025' | 'yesummit-2026') => void;
}

export default function Achievements({ onShowCertificate }: AchievementsProps) {
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";

  return (
    <section id="achievements" className="relative z-20 bg-transparent pt-16 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 md:sticky md:top-32"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-emerald-400 w-5 h-5" />
            <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-widest">
              Certifications & Achievements
            </h3>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Recognized for innovation and excellence.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-2/3 flex flex-col gap-8 w-full"
        >
          {/* Unlox Hackathon */}
          <motion.div
            whileHover={isLowEnd ? {} : { scale: 1.02 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className={`relative border border-white/10 rounded-[2rem] p-8 md:p-12 transition-colors duration-500 group overflow-hidden ${isLowEnd ? 'bg-[#222]' : 'bg-white/5 backdrop-blur-md'}`}
          >
            {!isLowEnd && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                <div className="rotating-border-glow opacity-100" />
              </>
            )}

            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">1st Prize Winner</h4>
                <p className="text-xl text-emerald-400 font-medium">Unlox Hackathon</p>
              </div>
              <div className="text-white/60 text-sm font-mono bg-black/40 px-5 py-2.5 rounded-full inline-block border border-white/5 shadow-inner">
                June 26, 2026
              </div>
            </div>

            <p className="relative z-10 text-white/70 leading-relaxed mb-10 text-lg md:text-xl font-light">
              Won first prize and a cash prize of ₹10,000 in the Hackathon conducted by Unlox in collaboration with the Department of Artificial Intelligence & Machine Learning (AIML) and Data Science (DS).
            </p>

            <motion.button
              onClick={() => onShowCertificate('unlox-hackathon')}
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
                View Trophy
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </motion.button>
          </motion.div>

          {/* YESummit 2026 */}
          <motion.div
            whileHover={isLowEnd ? {} : { scale: 1.02 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className={`relative border border-white/10 rounded-[2rem] p-8 md:p-12 transition-colors duration-500 group overflow-hidden ${isLowEnd ? 'bg-[#222]' : 'bg-white/5 backdrop-blur-md'}`}
          >
            {!isLowEnd && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                <div className="rotating-border-glow opacity-100" />
              </>
            )}

            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">Participant Recognition</h4>
                <p className="text-xl text-emerald-400 font-medium">National YESummit 2026</p>
              </div>
              <div className="text-white/60 text-sm font-mono bg-black/40 px-5 py-2.5 rounded-full inline-block border border-white/5 shadow-inner">
                2026
              </div>
            </div>

            <p className="relative z-10 text-white/70 leading-relaxed mb-10 text-lg md:text-xl font-light">
              Participated in National YESummit 2026, engaging in entrepreneurship-focused sessions, networking, and collaborative innovation initiatives.
            </p>

            <motion.button
              onClick={() => onShowCertificate('yesummit-2026')}
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

          {/* YESummit 2025 */}
          <motion.div
            whileHover={isLowEnd ? {} : { scale: 1.02 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            className={`relative border border-white/10 rounded-[2rem] p-8 md:p-12 transition-colors duration-500 group overflow-hidden ${isLowEnd ? 'bg-[#222]' : 'bg-white/5 backdrop-blur-md'}`}
          >
            {!isLowEnd && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                <div className="rotating-border-glow opacity-100" />
              </>
            )}

            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">Certificate of Achievement</h4>
                <p className="text-xl text-emerald-400 font-medium">Karnataka State YESummit 2025</p>
              </div>
              <div className="text-white/60 text-sm font-mono bg-black/40 px-5 py-2.5 rounded-full inline-block border border-white/5 shadow-inner">
                2025
              </div>
            </div>

            <p className="relative z-10 text-white/70 leading-relaxed mb-10 text-lg md:text-xl font-light">
              Participated in Karnataka State YESummit 2025 and was recognized for innovative thinking and active involvement in entrepreneurial discussions and activities.
            </p>

            <motion.button
              onClick={() => onShowCertificate('yesummit-2025')}
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
