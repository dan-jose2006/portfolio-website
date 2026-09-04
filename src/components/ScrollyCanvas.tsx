"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence, useSpring } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 120;

// Maps to the padded frame format: frame_000_delay-0.066s.jpg
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequenze/frame_${paddedIndex}_delay-0.066s.jpg`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress to eliminate jaggedness from mouse wheels while staying responsive
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 35,
    restDelta: 0.0005,
  });

  // Map scroll progress (0-1) to frame index (0 to 119)
  const currentIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const lastDrawnIndex = useRef<number>(-1);
  const requestRef = useRef<number | null>(null);

  // Draw a specific frame to the canvas
  const drawFrame = useCallback(
    (index: number) => {
      if (!canvasRef.current || imagesRef.current.length < FRAME_COUNT) return;

      const frameIndex = Math.min(Math.max(0, Math.floor(index)), FRAME_COUNT - 1);
      const img = imagesRef.current[frameIndex];

      // Ensure the image is loaded before drawing
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Avoid redundant redraws when integer frame hasn't changed
      if (frameIndex === lastDrawnIndex.current) return;
      lastDrawnIndex.current = frameIndex;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

      ctx.imageSmoothingEnabled = !isMobile;
      if (!isMobile) {
        ctx.imageSmoothingQuality = "high";
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      if (canvasWidth === 0 || canvasHeight === 0) return;

      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const x = canvasWidth / 2 - (imgWidth / 2) * scale;
      const y = canvasHeight / 2 - (imgHeight / 2) * scale;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);

      // --- MASK THE VEO LOGO (BLENDED SMEAR TECHNIQUE FROM SOURCE IMAGE) ---
      const maskWidth = 120;
      const maskHeight = 60;
      const logoX = imgWidth - maskWidth;
      const logoY = imgHeight - maskHeight;

      const renderX = x + logoX * scale;
      const renderY = y + logoY * scale;
      const renderW = maskWidth * scale;
      const renderH = maskHeight * scale;

      // Sample directly from source img to avoid canvas readback pipeline stalls
      if (logoY > 1 && imgWidth > maskWidth) {
        ctx.drawImage(
          img,
          logoX, logoY - 1, maskWidth, 1, // Source slice
          renderX, renderY, renderW, renderH // Target destination over logo
        );
      }
    },
    []
  );

  // Preload all frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!isMounted) return;
        setImagesLoaded((prev) => prev + 1);
      };
      loadedImages[i] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  // Redraw as images finish loading so frame 0 and active frame are guaranteed to render
  useEffect(() => {
    if (imagesLoaded > 0) {
      lastDrawnIndex.current = -1;
      drawFrame(currentIndex.get());
    }
  }, [imagesLoaded, drawFrame, currentIndex]);

  // Listen to scroll progress and redraw efficiently
  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(() => {
      drawFrame(latest);
    });
  });

  // Handle window resize and layout updates
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const isMobile = window.innerWidth < 768;
        const maxDpr = isMobile ? 1.0 : 2.0;
        const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

        const newW = Math.floor(window.innerWidth * dpr);
        const newH = Math.floor(window.innerHeight * dpr);

        if (canvasRef.current.width !== newW || canvasRef.current.height !== newH) {
          canvasRef.current.width = newW;
          canvasRef.current.height = newH;
        }

        lastDrawnIndex.current = -1;
        drawFrame(currentIndex.get());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame, currentIndex]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
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
          className="block w-full h-full object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        <Overlay scrollYProgress={smoothProgress} />
      </div>
    </div>
  );
}
