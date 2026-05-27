"use client";

import { useEffect, useRef } from "react";
import { usePerformance } from "@/context/PerformanceContext";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number; dAlpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      // If low end, heavily reduce star count to preserve frames (e.g., just a static few)
      const divider = isLowEnd ? 40000 : 12000;
      const numStars = Math.floor((canvas.width * canvas.height) / divider); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.1, // Very slow drifting
          vy: (Math.random() - 0.5) * 0.1,
          alpha: Math.random(),
          dAlpha: (Math.random() - 0.5) * 0.02 // Twinkling speed
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      stars.forEach(star => {
        // Move star if not low end
        if (!isLowEnd) {
          star.x += star.vx;
          star.y += star.vy;
          
          // Wrap around edges
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;
        }

        // Twinkle effect (slower on low end)
        star.alpha += isLowEnd ? star.dAlpha * 0.5 : star.dAlpha;
        if (star.alpha <= 0.1 || star.alpha >= 1) {
          star.dAlpha = -star.dAlpha;
        }

        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLowEnd]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" 
    />
  );
}
