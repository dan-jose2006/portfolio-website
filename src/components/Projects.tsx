"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const PROJECTS = [
  {
    title: "JARVIS AI Assistant",
    category: "System-Level AI",
    description: "Voice-controlled AI assistant integrating local LLMs via Ollama for real-time information retrieval and automation. Features deep system integration for hands-free local control.",
    image: "/projects/jarvis.png",
    tags: ["Python", "Ollama", "Whisper", "Automation"]
  },
  {
    title: "Facial Emotion Detection",
    category: "Computer Vision",
    description: "Real-time machine learning model designed to predict facial expressions and classify human emotions. Built with optimized neural networks for low-latency inference.",
    image: "/projects/facial.png",
    tags: ["TensorFlow", "OpenCV", "Python", "CNN"]
  },
  {
    title: "DCD Detection ML Model",
    category: "Healthcare AI",
    description: "Early detection model for Developmental Coordination Disorder, pre-incubated at Christ University. Helps clinicians identify motor skill deficits rapidly.",
    image: "/projects/dcd.png",
    tags: ["Scikit-Learn", "Pandas", "Healthcare", "Research"]
  },
  {
    title: "Kinetic Gym Energy",
    category: "Sustainable Tech",
    description: "Prototype system converting mechanical gym motion into electrical energy. Features custom hardware interfacing and a tracking dashboard. Patent currently in progress.",
    image: "/projects/kinetic_gym.png",
    tags: ["IoT", "Hardware", "React", "Sustainability"]
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section className="relative z-20 bg-transparent py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">
            Selected Works
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence>
            {PROJECTS.map((project, index) => {
              const isActive = activeProject === index;
              return (
                <motion.div
                  layout
                  key={project.title}
                  onClick={() => setActiveProject(isActive ? null : index)}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`group relative overflow-hidden rounded-3xl bg-[#1a1a1a] border border-white/5 cursor-pointer flex flex-col ${isActive ? "md:col-span-2 md:flex-row shadow-2xl shadow-emerald-900/20 ring-1 ring-white/10 z-20" : "hover:bg-[#222] hover:border-white/10"
                    }`}
                >
                  {/* Image Section */}
                  <motion.div
                    layout
                    className={`relative overflow-hidden bg-black ${isActive ? "h-[300px] md:h-[450px] md:w-1/2" : "h-[260px] w-full"
                      }`}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${isActive ? "scale-100" : "scale-105 group-hover:scale-110"}`}
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    {/* Subtle overlay for image pop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80 md:hidden" />
                    {isActive && <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a] opacity-100" />}
                  </motion.div>

                  {/* Content Section */}
                  <motion.div
                    layout
                    className={`flex flex-col justify-between p-6 md:p-8 ${isActive ? "md:w-1/2" : "w-full"
                      }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <motion.p layout className="text-sm font-medium text-emerald-400 uppercase tracking-widest">
                          {project.category}
                        </motion.p>
                        {isActive && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition text-white/70 hover:text-white hidden md:block"
                            onClick={(e) => { e.stopPropagation(); setActiveProject(null); }}
                          >
                            <X className="w-5 h-5" />
                          </motion.button>
                        )}
                      </div>

                      <motion.h4 layout className={`font-bold text-white mb-4 ${isActive ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                        {project.title}
                      </motion.h4>

                      {/* Expanded Content */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                        >
                          <p className="text-white/70 text-lg leading-relaxed mb-6">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1 bg-white/5 text-white/80 text-sm rounded-full border border-white/10">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Footer Area */}
                    <div className="mt-4">
                      {!isActive && (
                        <motion.div layout className="flex items-center gap-2">
                          <span className="text-white/80 text-sm font-medium uppercase tracking-widest group-hover:text-emerald-400 transition-colors duration-300">
                            Explore
                          </span>
                          <ArrowUpRight className="w-5 h-5 text-white/80 group-hover:text-emerald-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                        </motion.div>
                      )}
                    </div>

                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
