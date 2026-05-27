"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { category: "Languages", items: ["Python", "TypeScript", "C++", "SQL"] },
  { category: "AI / ML", items: ["PyTorch", "TensorFlow", "Scikit-Learn", "Computer Vision", "NLP", "Ollama"] },
  { category: "Web & Systems", items: ["Next.js", "React", "Node.js", "Tailwind CSS"] },
  { category: "Tools & Cloud", items: ["Git", "Docker", "AWS", "Linux"] },
];

export default function Skills() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="skills" className="relative z-20 bg-[#121212] pt-24 pb-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Technical Arsenal
          </h3>
        </motion.div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {SKILLS.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="relative p-8 rounded-3xl cursor-default group z-10"
            >
              {hoveredIdx === idx && (
                <motion.span
                  layoutId="skills-hover-droplet"
                  className="absolute inset-0 rounded-3xl -z-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: "inset 0px 2px 4px rgba(255,255,255,0.3), inset 0px -4px 8px rgba(0,0,0,0.1), 0px 8px 24px rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
              
              {/* Default background that fades out when the fluid glass droplet slides behind it */}
              <div className={`absolute inset-0 bg-white/5 border border-white/10 rounded-3xl -z-20 transition-opacity duration-500 ${hoveredIdx === idx ? 'opacity-0' : 'opacity-100'}`} />

              <h4 className="text-2xl font-semibold text-emerald-400 mb-8 group-hover:text-white transition-colors duration-500 drop-shadow-md">{skillGroup.category}</h4>
              <ul className="flex flex-col gap-5">
                {skillGroup.items.map((item) => (
                  <li key={item} className="text-white/80 font-medium flex items-center gap-4 group-hover:text-white transition-colors duration-500 text-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-emerald-400 group-hover:scale-150 group-hover:shadow-[0_0_10px_#34d399] transition-all duration-500" />
                    <span className="group-hover:mix-blend-screen">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
