"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type PerformanceTier = "low" | "high";

interface PerformanceContextType {
  tier: PerformanceTier;
  isMobile: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
  tier: "high", // default to high until evaluated
  isMobile: false,
});

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<PerformanceTier>("high");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Initial mobile check
    const mobileCheck = window.innerWidth < 768;

    let calculatedTier: PerformanceTier = "high";

    // Detect CPU cores using hardwareConcurrency
    const cores = navigator.hardwareConcurrency || 4;
    
    // Detect RAM (if supported by browser, returns gigabytes)
    // @ts-expect-error deviceMemory is non-standard but useful where available
    const ram = navigator.deviceMemory || 4;

    // Check if the user has requested reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A device is considered "low" tier if:
    // 1. It has < 4 CPU cores (true budget devices)
    // 2. It has < 4GB of RAM
    // 3. User specifically requested reduced motion
    if (cores < 4 || ram < 4 || prefersReducedMotion) {
      calculatedTier = "low";
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTier(calculatedTier);
    setIsMobile(mobileCheck);
  }, []);

  return (
    <PerformanceContext.Provider value={{ tier, isMobile }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
