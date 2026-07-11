"use client";

import { motion } from "framer-motion";
import { usePerformance } from "@/context/PerformanceContext";
import { useEffect, useState } from "react";

const timelineData = [
  {
    year: "2022",
    title: "10th Standard Completed",
    description: "Completed secondary education with strong foundational knowledge.",
    status: "completed",
  },
  {
    year: "2024",
    title: "12th Standard Completed",
    description: "Completed higher secondary education, focusing on science and mathematics.",
    status: "completed",
  },
  {
    year: "2024 - 2025",
    title: "1st Year B.Tech",
    description: "Started B.Tech degree. Explored computer science fundamentals and modern technologies.",
    status: "completed",
  },
  {
    year: "2025 - 2026",
    title: "2nd Year B.Tech",
    description: "Deepened knowledge in core subjects, data structures, and basic software development.",
    status: "completed",
  },
  {
    year: "2026 - 2027",
    title: "3rd Year B.Tech",
    description: "Currently engaged in advanced coursework, enterprise projects, and AI/ML specializations.",
    status: "current",
    startDate: "2026-06-01",
    endDate: "2027-04-30",
  },
  {
    year: "2027 - 2028",
    title: "4th Year B.Tech",
    description: "Will focus on final year project, internships, and industry readiness.",
    status: "future",
    startDate: "2027-06-01",
    endDate: "2028-05-31",
  },
];

export default function Education() {
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    // Update 'now' to ensure it uses client's current time for progress calculation
    setNow(Date.now());
  }, []);

  const calculateProgress = (start?: string, end?: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    
    if (now < startDate) return 0;
    if (now > endDate) return 100;
    
    return ((now - startDate) / (endDate - startDate)) * 100;
  };

  return (
    <section id="education" className="relative z-20 bg-transparent py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-widest mb-4">
            Academic Journey
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            My Education Timeline.
          </h2>
        </motion.div>

        <div className="relative ml-4 md:ml-8 py-8">
          {timelineData.map((item, index) => {
            const isLast = index === timelineData.length - 1;
            
            let progress = 0;
            if (item.status === "completed") {
              progress = 100;
            } else if (item.status === "current" && item.startDate && item.endDate) {
              progress = calculateProgress(item.startDate, item.endDate);
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 pb-12 last:pb-0"
              >
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute left-[0px] top-[14px] bottom-0 w-[2px] bg-white/10">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${progress}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 1.5, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                      className="w-full bg-emerald-400" 
                    />
                  </div>
                )}
                
                {/* Timeline Dot / Spark */}
                <div className="absolute left-[-6px] top-[8px] flex items-center justify-center w-3 h-3 z-10">
                  {item.status === 'completed' || item.status === 'current' ? (
                    <div className="relative flex items-center justify-center w-full h-full">
                      {/* Radiating pulse (Spark) */}
                      {!isLowEnd && (
                        <motion.div 
                          animate={{ 
                            scale: [1, 2.5, 1],
                            opacity: [0.6, 0, 0.6]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute w-3 h-3 bg-emerald-400 rounded-full"
                        />
                      )}
                      {/* Bright inner core */}
                      <div className="absolute w-2.5 h-2.5 bg-emerald-300 rounded-full shadow-[0_0_12px_3px_rgba(52,211,153,0.8)]" />
                    </div>
                  ) : (
                    <div className="w-2.5 h-2.5 bg-[#222] border-2 border-white/30 rounded-full transition-colors duration-500" />
                  )}
                </div>
                
                {/* Timeline Card */}
                <motion.div
                  whileHover={isLowEnd ? {} : { scale: 1.02 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  className={`relative border ${item.status === 'current' ? 'border-emerald-400/30' : 'border-white/10'} rounded-2xl p-6 md:p-8 transition-colors duration-500 group overflow-hidden ${
                    isLowEnd ? 'bg-[#222]' : 'bg-white/5 backdrop-blur-md'
                  }`}
                >
                  {!isLowEnd && (
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl ${item.status === 'current' && 'from-emerald-400/10'}`} />
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h4 className="text-xl md:text-2xl font-bold text-white">
                      {item.title}
                    </h4>
                    <div className={`font-mono text-sm px-4 py-1.5 rounded-full inline-block border shadow-inner w-fit ${
                      item.status === 'current' 
                        ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' 
                        : 'text-white/70 bg-black/30 border-white/5'
                    }`}>
                      {item.year}
                    </div>
                  </div>
                  
                  <p className="text-white/70 leading-relaxed text-base md:text-lg font-light relative z-10">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
