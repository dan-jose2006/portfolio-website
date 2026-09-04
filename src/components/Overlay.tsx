"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: Hero Intro (0% to ~28%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.16, 0.28], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.28], [0, -60]);
  const scale1 = useTransform(scrollYProgress, [0, 0.28], [1, 0.95]);

  // Section 2: "I build intelligent systems." (33% to 65%)
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.42, 0.56, 0.66], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.33, 0.42, 0.56, 0.66], [50, 0, 0, -50]);
  const scale2 = useTransform(scrollYProgress, [0.33, 0.42, 0.56, 0.66], [0.92, 1, 1, 0.96]);

  // Section 3: "Bridging ML and automation." (70% to 98%)
  const opacity3 = useTransform(scrollYProgress, [0.70, 0.78, 0.90, 0.98], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.70, 0.78, 0.90, 0.98], [50, 0, 0, -50]);
  const scale3 = useTransform(scrollYProgress, [0.70, 0.78, 0.90, 0.98], [0.92, 1, 1, 0.96]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center overflow-hidden">
      {/* Slide 1 */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
          Dan Abraham Jose.
        </h1>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/80 font-light tracking-wide">
          AI/ML Engineer & Student.
        </p>
      </motion.div>

      {/* Slide 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2, scale: scale2 }}
        className="absolute w-full px-6 sm:px-12 md:px-32 flex justify-start"
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white max-w-2xl drop-shadow-2xl leading-tight">
          I build intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">systems.</span>
        </h2>
      </motion.div>

      {/* Slide 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3, scale: scale3 }}
        className="absolute w-full px-6 sm:px-12 md:px-32 flex justify-end text-right"
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white max-w-2xl drop-shadow-2xl leading-tight">
          Bridging ML and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">automation.</span>
        </h2>
      </motion.div>
    </div>
  );
}
