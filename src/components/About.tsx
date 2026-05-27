"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative z-20 bg-[#121212] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left Side: Title & Decoration */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/3 flex flex-col items-start"
        >
          <div className="w-16 h-1 bg-emerald-400 mb-6 rounded-full" />
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            About Me
          </h3>
        </motion.div>

        {/* Right Side: Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="md:w-2/3 flex flex-col gap-6"
        >
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            I am a BTech student specializing in <span className="text-emerald-400 font-medium">Artificial Intelligence and Machine Learning</span>, with a strong interest in building intelligent, interactive, and user-focused technology solutions. My areas of interest include AI systems, automation, machine learning, modern web development, and immersive digital experiences.
          </p>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            I enjoy working on projects that combine innovation with functionality, particularly in the fields of AI assistants, speech-based systems, and advanced user interfaces. I am passionate about continuously learning new technologies and applying them to real-world challenges through practical development and experimentation.
          </p>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            With a growing foundation in programming, problem-solving, and emerging technologies, I aim to develop impactful solutions that enhance user experience and push the boundaries of intelligent systems. I am currently focused on expanding my expertise in AI development, full-stack technologies, and interactive web applications while building projects that reflect creativity, technical skill, and innovation.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
