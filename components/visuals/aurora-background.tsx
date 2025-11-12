"use client";

import { motion } from "framer-motion";
import { useId } from "react";

type AuroraBackgroundProps = {
  children: React.ReactNode;
};

const glowKeyframes = {
  rotate: [0, 20, -15, 10, 0],
  scale: [1, 1.2, 0.95, 1.3, 1]
};

export function AuroraBackground({ children }: AuroraBackgroundProps) {
  const id = useId();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(21,16,11,0.95),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(11,36,26,0.75),_transparent_60%),linear-gradient(120deg,_rgba(11,11,15,0.92),_rgba(16,9,5,0.95))] text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-40 mix-blend-screen backdrop-blur-3xl" />
      <motion.div
        key={`${id}-aurora-a`}
        aria-hidden
        className="pointer-events-none absolute -left-1/3 -top-1/4 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,_rgba(255,140,66,0.55),_transparent_55%)] blur-3xl"
        animate={glowKeyframes}
        transition={{ duration: 24, repeat: Infinity, ease: [0.43, 0.13, 0.23, 0.96] }}
      />
      <motion.div
        key={`${id}-aurora-b`}
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-1/3 h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,_rgba(139,195,74,0.5),_transparent_60%)] blur-[180px]"
        animate={{ rotate: [-8, 10, -12], scale: [1.1, 0.8, 1.3] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        key={`${id}-aurora-c`}
        aria-hidden
        className="pointer-events-none absolute bottom-[-25vw] left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(253,224,71,0.4),_transparent_65%)] blur-[200px]"
        animate={{ rotate: [0, -30, 20], scale: [1, 1.25, 0.9] }}
        transition={{ duration: 30, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
      />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
