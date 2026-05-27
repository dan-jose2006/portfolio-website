"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { usePerformance } from "@/context/PerformanceContext";

const FRAME_COUNT = 120;
// Maps to the padded frame format: frame_000_delay-0.066s.jpg
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequenze/frame_${paddedIndex}_delay-0.066s.jpg`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0-1) to frame index (0 to 119)
  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload all frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    
    // Use timeout to prevent synchronous setState inside useEffect warning
    setTimeout(() => {
      setImages(loadedImages);
    }, 0);
  }, []);

  const { tier, isMobile } = usePerformance();

  const lastDrawnIndex = useRef<number>(-1);
  const requestRef = useRef<number | null>(null);

  // Draw a specific frame to the canvas
  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length < FRAME_COUNT) return;

    const frameIndex = Math.floor(index);
    if (frameIndex === lastDrawnIndex.current) return;
    lastDrawnIndex.current = frameIndex;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isLowEnd = tier === "low" || isMobile;

    if (!isLowEnd) {
      // Enable 4K/High-res upscaling algorithms only on powerful desktop
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.filter = "contrast(1.05) saturate(1.05)";
    } else {
      // Fast path for low-end / mobile CPUs
      ctx.imageSmoothingEnabled = false;
      ctx.filter = "none";
    }

    const img = images[frameIndex];
    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = canvasWidth / 2 - (imgWidth / 2) * scale;
    const y = canvasHeight / 2 - (imgHeight / 2) * scale;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);

    const maskWidth = 120;
    const maskHeight = 60;
    const paddingRight = 0;
    const paddingBottom = 0;

    const logoX = imgWidth - maskWidth - paddingRight;
    const logoY = imgHeight - maskHeight - paddingBottom;

    const renderX = x + logoX * scale;
    const renderY = y + logoY * scale;
    const renderW = maskWidth * scale;
    const renderH = maskHeight * scale;

    // GPU pipeline stall fix: Only read back from canvas if high-end desktop
    if (!isLowEnd && renderY > 0) {
      ctx.drawImage(
        canvas,
        renderX, renderY - 1, renderW, 1, 
        renderX, renderY, renderW, renderH 
      );
    }
  };

  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(() => {
      drawFrame(latest);
    });
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Drastically limit rendering resolution on low-end hardware
        const maxDpr = tier === "low" ? (isMobile ? 0.5 : 1.0) : (isMobile ? 1.0 : 2.5);
        const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
        
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        
        lastDrawnIndex.current = -1;
        drawFrame(currentIndex.get());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded, images, tier, isMobile]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <AnimatePresence>
          {imagesLoaded < FRAME_COUNT && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl"
            >
              <p className="text-white font-mono text-xs uppercase tracking-widest whitespace-nowrap">
                Loading Assets... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
              </p>
              <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-300" 
                  style={{ width: `${(imagesLoaded / FRAME_COUNT) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
        />
      </div>
    </div>
  );
}
