"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: overlayRef,
    offset: ["start start", "end end"],
  });

  // Section 1 (0% to 20%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2 (25% to 50%)
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.5], [100, -100]);

  // Section 3 (55% to 80%)
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.8], [100, -100]);

  return (
    <div
      ref={overlayRef}
      className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">

        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
              Dan Abraham Jose.
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/80 font-light tracking-wide">
              AI/ML Engineer & Student.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute w-full px-10 md:px-32 flex justify-start"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white max-w-2xl drop-shadow-2xl leading-tight">
            I build intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">systems.</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute w-full px-10 md:px-32 flex justify-end text-right"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white max-w-2xl drop-shadow-2xl leading-tight">
            Bridging ML and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">automation.</span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
