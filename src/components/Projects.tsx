"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Trophy } from "lucide-react";
import { usePerformance } from "@/context/PerformanceContext";

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  highlight?: string;
  details?: string;
  link?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    title: "CampusFlow",
    category: "AI & Productivity",
    description: "An AI-powered student productivity platform that helps students manage academic deadlines, attendance risks, WhatsApp alerts, and Google Calendar events.",
    image: "/projects/campusflow.png",
    link: "https://hackathon-two-theta.vercel.app/",
    tags: ["Next.js", "AI", "n8n", "Google Calendar", "WhatsApp Automation"],
    highlight: "1st Prize – UNLOX Codestorm Hackathon",
    details: "CampusFlow bridges the gap between academic administration and students. Built during a hackathon, it leverages n8n workflows to automate student notifications, track attendance risks in real time, and synchronize Google Calendars for deadline reminders."
  },
  {
    title: "FanFlow AI",
    category: "Event Automation & AI",
    description: "An AI-powered FIFA event platform designed for fans, volunteers, and organizers. It provides intelligent assistance for stadium navigation, waiting times, transport, parking, emergencies, volunteer protocols, and event-management insights.",
    image: "/projects/fanflow.png",
    link: "https://fanflow-ai-seven.vercel.app/",
    tags: ["Next.js", "Generative AI", "FastAPI", "Supabase", "Groq AI"],
    highlight: "PromptWars Hackathon Project",
    details: "Designed to optimize event operations during massive football matches. FanFlow AI integrates real-time stadium APIs, volunteer routing algorithms, and a Groq-powered AI assistant that answers fan questions on transport, queuing, and safety."
  },
  {
    title: "AMA System",
    category: "Content Automation",
    description: "An AI-powered web platform for generating, organizing, automating, and managing digital content through a modern dashboard.",
    image: "/projects/ama.png",
    link: "https://ama-system.vercel.app/",
    tags: ["Next.js", "Generative AI", "Content Automation", "Vercel"],
    highlight: "AI-Powered Content Platform",
    details: "A comprehensive digital asset and automated content generation workspace. Users can prompt the system to generate marketing copy, structure Q&As, organize assets, and instantly publish content to external sites with analytics integration."
  },
  {
    title: "6-Bubble Puzzle Simulator",
    category: "Web Games & Logic",
    description: "An interactive logic puzzle game featuring multiple levels, visual themes, clockwise and counter-clockwise controls, and responsive puzzle-solving interactions.",
    image: "/projects/bubble_puzzle.png",
    link: "https://gagn-mu.vercel.app/",
    tags: ["React", "JavaScript", "Game Logic", "Interactive UI"],
    highlight: "Interactive Web Puzzle",
    details: "A mathematical logic game built with pure React. Players rotate clusters of bubbles to match target configurations. Includes visual themes, level selectors, move counters, and highly polished particle animations."
  }
];

const ORIGINAL_PROJECTS: ProjectItem[] = [
  {
    title: "JARVIS AI Assistant",
    category: "System-Level AI",
    description: "Voice-controlled AI assistant integrating local LLMs via Ollama for real-time information retrieval and automation. Features deep system integration for hands-free local control.",
    image: "/projects/jarvis.png",
    tags: ["Python", "Ollama", "Whisper", "Automation"],
    highlight: "Local AI Integration",
    details: "JARVIS is an offline-capable system assistant built to bypass cloud LLM latencies. By hosting models locally via Ollama, it implements continuous voice monitoring, automatic transcription, and executing system-level actions (e.g. searching directories, controlling applications) with zero external network dependency."
  },
  {
    title: "Facial Emotion Detection",
    category: "Computer Vision",
    description: "Real-time machine learning model designed to predict facial expressions and classify human emotions. Built with optimized neural networks for low-latency inference.",
    image: "/projects/facial.png",
    tags: ["TensorFlow", "OpenCV", "Python", "CNN"],
    highlight: "Deep Learning Model",
    details: "A deep learning neural network designed to identify human emotions from live video streams. Built using a custom Convolutional Neural Network (CNN) structure, optimized and pruned for deployment on edge devices and real-time integration with standard webcams."
  },
  {
    title: "DCD Detection ML Model",
    category: "Healthcare AI",
    description: "Early detection model for Developmental Coordination Disorder, pre-incubated at Christ University. Helps clinicians identify motor skill deficits rapidly.",
    image: "/projects/dcd.png",
    tags: ["Scikit-Learn", "Pandas", "Healthcare", "Research"],
    highlight: "Research Pre-Incubation",
    details: "Early detection classifier for Developmental Coordination Disorder (DCD) in children. Leveraging motor skill assessment test data, the model achieves high classification accuracy, aiding medical practitioners in rapid diagnostic screenings."
  },
  {
    title: "Kinetic Gym Energy",
    category: "Sustainable Tech",
    description: "Prototype system converting mechanical gym motion into electrical energy. Features custom hardware interfacing and a tracking dashboard. Patent currently in progress.",
    image: "/projects/kinetic_gym.png",
    tags: ["IoT", "Hardware", "React", "Sustainability"],
    highlight: "Patent In Progress",
    details: "An IoT hardware prototype coupled with a real-time React dashboard. Translates mechanical rotational energy from gym equipment into clean electrical energy, showing current generation metrics, cumulative power, and device status in real time."
  }
];

export default function Projects() {
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";
  const [activeTab, setActiveTab] = useState<"featured" | "systems">("featured");
  const [hoveredTab, setHoveredTab] = useState<"featured" | "systems" | null>(null);
  const [isDetailedMode, setIsDetailedMode] = useState<boolean>(false);

  const currentProjects = activeTab === "featured" ? PROJECTS : ORIGINAL_PROJECTS;

  return (
    <section className="relative z-20 bg-transparent py-16 md:py-32 px-6 md:px-12 lg:px-24">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-950/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mb-8 rounded-full" />
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Selected Works
          </h3>
          <p className="text-white/50 text-lg mt-4 max-w-2xl">
            A curated selection of award-winning applications, intelligent systems, and interactive web experiences.
          </p>
        </motion.div>

        {/* Custom Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div
            className={`p-1.5 rounded-full flex gap-1 border border-white/10 relative z-10 ${isLowEnd ? 'bg-[#222]' : 'bg-[#1a1a1a]/40 backdrop-blur-md'}`}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <button
              onClick={() => setActiveTab("featured")}
              onMouseEnter={() => setHoveredTab("featured")}
              className={`relative px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300 ${activeTab === "featured" ? "text-white" : "text-white/60 hover:text-white"
                }`}
            >
              {activeTab === "featured" && (
                <motion.span
                  layoutId="active-project-tab"
                  className={`absolute inset-0 rounded-full -z-10 ${isLowEnd ? 'bg-white/15' : ''}`}
                  style={isLowEnd ? {} : {
                    background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
                    boxShadow: "inset 0px 1px 2px rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  transition={isLowEnd ? { duration: 0.2 } : { type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {hoveredTab === "featured" && activeTab !== "featured" && (
                <motion.span
                  layoutId="project-tab-hover-pill"
                  className={`absolute inset-0 rounded-full -z-10 ${isLowEnd ? 'bg-white/10' : ''}`}
                  style={isLowEnd ? {} : {
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: "inset 0px 1px 2px rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  transition={isLowEnd ? { duration: 0.2 } : { type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
              <span className={isLowEnd ? '' : 'mix-blend-screen'}>Web Apps & Platforms</span>
            </button>
            <button
              onClick={() => setActiveTab("systems")}
              onMouseEnter={() => setHoveredTab("systems")}
              className={`relative px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300 ${activeTab === "systems" ? "text-white" : "text-white/60 hover:text-white"
                }`}
            >
              {activeTab === "systems" && (
                <motion.span
                  layoutId="active-project-tab"
                  className={`absolute inset-0 rounded-full -z-10 ${isLowEnd ? 'bg-white/15' : ''}`}
                  style={isLowEnd ? {} : {
                    background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
                    boxShadow: "inset 0px 1px 2px rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  transition={isLowEnd ? { duration: 0.2 } : { type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {hoveredTab === "systems" && activeTab !== "systems" && (
                <motion.span
                  layoutId="project-tab-hover-pill"
                  className={`absolute inset-0 rounded-full -z-10 ${isLowEnd ? 'bg-white/10' : ''}`}
                  style={isLowEnd ? {} : {
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: "inset 0px 1px 2px rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  transition={isLowEnd ? { duration: 0.2 } : { type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
              <span className={isLowEnd ? '' : 'mix-blend-screen'}>AI & Core Systems</span>
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              layout
              className={`grid gap-8 w-full transition-all duration-500 ease-out ${isDetailedMode ? "grid-cols-1 max-w-4xl mx-auto" : "grid-cols-1 md:grid-cols-2"
                }`}
            >
              {currentProjects.map((project) => {
                return (
                  <motion.div
                    layout
                    key={project.title}
                    whileHover={(isLowEnd || isDetailedMode) ? {} : { y: -8 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    onClick={() => setIsDetailedMode(!isDetailedMode)}
                    className={`group relative overflow-hidden rounded-[2rem] bg-[#141414] border border-white/5 flex flex-col cursor-pointer hover:bg-[#1a1a1a] hover:border-white/10 transition-all duration-500 ${isDetailedMode ? "md:flex-row ring-1 ring-emerald-500/20 shadow-2xl shadow-emerald-950/20" : ""
                      }`}
                  >
                    {/* Image Section */}
                    <motion.div
                      layout
                      className={`relative overflow-hidden bg-black aspect-video shrink-0 transition-all duration-500 ${isDetailedMode
                          ? "w-full md:w-1/2 md:aspect-auto md:min-h-[350px] rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-tr-none"
                          : "w-full rounded-t-[2rem]"
                        }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <div className="flex items-center gap-2 text-white font-medium bg-emerald-500/90 backdrop-blur-sm px-4 py-2 rounded-full self-start shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span>{isDetailedMode ? "Hide Details" : "View Details"}</span>
                          <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isDetailedMode ? "rotate-45" : ""}`} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                      layout
                      className={`flex flex-col justify-between p-6 md:p-8 flex-grow w-full ${isDetailedMode ? "md:w-1/2" : ""
                        }`}
                    >
                      <div>
                        {/* Category & Badge */}
                        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                            {project.category}
                          </span>

                          {project.highlight && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium">
                              <Trophy className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{project.highlight}</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-2xl font-bold text-white mb-3">
                          {project.title}
                        </h4>

                        {/* Description / Details */}
                        <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                          {isDetailedMode ? (project.details || project.description) : project.description}
                        </p>

                        {/* Technology Badges */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-white/5 text-white/80 text-xs rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDetailedMode(!isDetailedMode);
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium text-sm rounded-xl border border-white/10 transition duration-300 cursor-pointer"
                        >
                          <span>{isDetailedMode ? "Hide Details" : "View Details"}</span>
                          <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isDetailedMode ? "rotate-45" : ""}`} />
                        </button>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#0f0f0f] font-semibold text-sm rounded-xl transition duration-300 shadow-lg shadow-emerald-500/10"
                          >
                            <span>Live Preview</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
