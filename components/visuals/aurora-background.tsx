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

const crackPaths = [
  "M-160 140 L20 180 L120 120 L240 180 L320 130 L430 210 L520 150 L640 220 L760 170 L870 260 L990 210 L1120 300 L1280 250",
  "M1280 80 L1110 130 L980 90 L830 180 L720 130 L620 210 L520 170 L430 260 L320 200 L210 320 L80 260 L-60 360",
  "M-100 500 L40 540 L120 460 L210 520 L320 470 L420 560 L510 500 L610 600 L720 540 L840 620 L960 560 L1100 660 L1250 610",
  "M260 -120 L300 20 L240 120 L320 220 L280 310 L360 420 L310 530 L390 640 L340 760",
  "M960 -100 L900 40 L780 120 L700 210 L560 260 L460 360 L340 420 L260 520 L140 580 L60 680",
  "M1280 520 L1160 560 L1080 500 L990 560 L920 500 L840 600 L760 540 L660 640 L580 600 L470 700 L360 640 L240 740 L140 700",
  "M-120 30 L40 110 L100 60 L180 140 L250 80 L320 180 L390 120 L470 200 L540 140 L620 230 L700 160 L800 260 L900 180 L1020 270"
];

const crackBranches = [
  "M210 220 L250 260 L230 300",
  "M540 180 L580 220 L620 210",
  "M860 260 L900 310 L940 300",
  "M420 520 L470 570 L450 610",
  "M680 640 L720 690 L760 660",
  "M180 640 L220 690 L260 660",
  "M980 120 L1020 170 L1060 140",
  "M320 60 L360 110 L400 80"
];

function GoldenCracksOverlay({ gradientId }: { gradientId: string }) {
  return (
    <motion.svg
      key={`${gradientId}-svg`}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full mix-blend-screen"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.75, 0.4, 0.75, 0] }}
      transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9e29b" />
          <stop offset="45%" stopColor="#f3c46a" />
          <stop offset="100%" stopColor="#f5ad63" />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {crackPaths.map((path, index) => (
        <motion.path
          key={`${gradientId}-path-${index}`}
          d={path}
          stroke={`url(#${gradientId})`}
          strokeWidth={index % 2 === 0 ? 2.1 : 1.6}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={8}
          fill="none"
          pathLength={1}
          strokeDasharray="1"
          initial={{ strokeDashoffset: 1, opacity: 0 }}
          animate={{
            strokeDashoffset: [1, 0, 0.2, 1],
            opacity: [0, 0.95, 0.55, 0],
            scale: [1, 1.01, 1]
          }}
          transition={{
            duration: 3.2 + index * 0.25,
            ease: [0.42, 0, 0.58, 1],
            repeat: Infinity,
            repeatDelay: 1.4 + index * 0.35,
            times: [0, 0.5, 0.8, 1]
          }}
          filter={`url(#${gradientId}-glow)`}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {crackBranches.map((path, index) => (
        <motion.path
          key={`${gradientId}-branch-${index}`}
          d={path}
          stroke={`url(#${gradientId})`}
          strokeWidth={1.2}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="none"
          pathLength={1}
          strokeDasharray="1"
          initial={{ strokeDashoffset: 1, opacity: 0 }}
          animate={{
            strokeDashoffset: [1, 0, 0.25, 1],
            opacity: [0, 0.9, 0.45, 0],
            scale: [1, 1.01, 1]
          }}
          transition={{
            duration: 2.8 + index * 0.2,
            ease: [0.42, 0, 0.58, 1],
            repeat: Infinity,
            repeatDelay: 1.2 + index * 0.25,
            times: [0, 0.55, 0.82, 1]
          }}
          filter={`url(#${gradientId}-glow)`}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </motion.svg>
  );
}

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
      <GoldenCracksOverlay gradientId={`${id}-crack-gradient`} />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
