"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, ReactNode } from "react";
import { usePerformance } from "@/context/PerformanceContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 3D Tilt Effect tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isLowEnd) return; // Disable expensive layout calculations on slow hardware
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isLowEnd) return;
    x.set(0);
    y.set(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12" style={isLowEnd ? {} : { perspective: "2000px" }}>
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ opacity: 1, backdropFilter: isLowEnd ? "none" : "blur(20px)", backgroundColor: isLowEnd ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.6)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Fixed Static Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            onClick={onClose}
            className={`absolute top-6 right-6 md:top-10 md:right-10 p-4 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all duration-300 z-[110] shadow-2xl hover:scale-110 active:scale-95 ${isLowEnd ? 'bg-[#333]' : 'bg-white/10 backdrop-blur-md'}`}
          >
            <X className="w-6 h-6" />
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100, rotateX: isLowEnd ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: isLowEnd ? 0 : -20 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={isLowEnd ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-transparent z-10 flex items-center justify-center"
          >
            <div 
              style={isLowEnd ? {} : { transform: "translateZ(30px)" }}
              className={`relative w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/20 pointer-events-none ${isLowEnd ? 'bg-[#222]' : 'bg-white/5 backdrop-blur-xl'}`}
            >
              <div className="p-2 w-full h-full flex justify-center items-center pointer-events-auto">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
