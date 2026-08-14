"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, Rocket } from "lucide-react";

export default function About() {
  const cards = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-emerald-400" />,
      title: "The Foundation",
      text: "I am a BTech student specializing in Artificial Intelligence and Machine Learning. I have a strong focus on building intelligent, interactive, and user-focused technology solutions, spanning AI systems, modern web development, and immersive digital experiences."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-400" />,
      title: "My Passion",
      text: "I thrive on combining innovation with functionality. I'm particularly drawn to the fields of AI assistants, speech-based systems, and advanced user interfaces, constantly applying new technologies to real-world challenges through hands-on experimentation."
    },
    {
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      title: "The Vision",
      text: "Armed with a growing expertise in full-stack technologies and programming, my goal is to develop impactful solutions that enhance user experience and push the boundaries of intelligent systems with creativity and technical precision."
    }
  ];

  return (
    <section id="about" className="relative z-20 bg-transparent py-16 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center relative z-10">

        {/* Left Side: Title & Decoration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/3 flex flex-col items-start"
        >
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mb-8 rounded-full" />
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Intelligence.</span>
          </h3>
          <p className="text-white/50 text-lg leading-relaxed">
            Bridging the gap between complex machine learning algorithms and seamless, intuitive human experiences.
          </p>
        </motion.div>

        {/* Right Side: Narrative Cards */}
        <div className="lg:w-2/3 flex flex-col gap-6 w-full">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="group relative p-8 rounded-3xl bg-[#1a1a1a] border border-white/5 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0 group-hover:scale-110 transition-transform duration-500">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{card.title}</h4>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">
                    {card.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
