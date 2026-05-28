"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";

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

  const lastDrawnIndex = useRef<number>(-1);
  const requestRef = useRef<number | null>(null);

  // Draw a specific frame to the canvas
  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length < FRAME_COUNT) return;

    const frameIndex = Math.floor(index);
    // CRITICAL PERFORMANCE FIX: Do not redraw if the integer frame index hasn't changed.
    // Framer motion fires hundreds of times for tiny float changes (e.g., 1.1, 1.2).
    if (frameIndex === lastDrawnIndex.current) return;
    lastDrawnIndex.current = frameIndex;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (!isMobile) {
      // Enable 4K/High-res upscaling algorithms only on desktop
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Filter is a massive performance killer on mobile CPUs, only apply on desktop
      ctx.filter = "contrast(1.05) saturate(1.05)";
    } else {
      // Fast path for mobile
      ctx.imageSmoothingEnabled = false;
      ctx.filter = "none";
    }

    const img = images[frameIndex];
    if (!img) return;

    // Calculate aspect ratio covering the canvas (object-fit: cover)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = canvasWidth / 2 - (imgWidth / 2) * scale;
    const y = canvasHeight / 2 - (imgHeight / 2) * scale;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);

    // --- MASK THE VEO LOGO (BLENDED SMEAR TECHNIQUE) ---
    const maskWidth = 120;
    const maskHeight = 60;
    const paddingRight = 0;
    const paddingBottom = 0;

    const logoX = imgWidth - maskWidth - paddingRight;
    const logoY = imgHeight - maskHeight - paddingBottom;

    // Calculate exact rendered coordinates
    const renderX = x + logoX * scale;
    const renderY = y + logoY * scale;
    const renderW = maskWidth * scale;
    const renderH = maskHeight * scale;

    // Grab a 1-pixel high horizontal slice from exactly ABOVE the logo
    // and stretch it vertically over the logo area to seamlessly blend it.
    // CRITICAL FIX: Disable this on mobile. Reading back from the canvas (`ctx.drawImage(canvas, ...)`) 
    // causes massive GPU pipeline stalls on mobile devices, killing the framerate.
    if (!isMobile && renderY > 0) {
      ctx.drawImage(
        canvas,
        renderX, renderY - 1, renderW, 1, // Source: 1px slice just above
        renderX, renderY, renderW, renderH // Destination: Over the logo
      );
    }
  };

  // Listen to scroll progress and redraw efficiently
  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(() => {
      drawFrame(latest);
    });
  });

  // Handle window resize and initial drawing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const isMobile = window.innerWidth < 768;
        // On mobile, aggressively downscale the internal rendering resolution.
        // A DPR of 0.75 renders internally smaller and lets CSS scale it up. 
        // This stops the mobile GPU from choking on massive texture uploads.
        const maxDpr = isMobile ? 0.75 : 2.5;
        const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;

        // Force redraw on resize
        lastDrawnIndex.current = -1;
        drawFrame(currentIndex.get());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded, images]);

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
