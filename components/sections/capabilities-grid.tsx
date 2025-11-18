"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { PortfolioSection } from "@/lib/content-schema";
import { useMediaQuery } from "@/hooks/use-media-query";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CapabilitiesSection = Extract<PortfolioSection, { type: "capabilities" }>;

interface CapabilitiesGridProps {
  section: CapabilitiesSection;
}

// Simplified variants for mobile
const mobileContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05
    }
  }
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Full variants for desktop
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const paletteByTone: Record<string, string> = {
  aurora: "from-[#87b6b9]/75 via-[#ecf5f4]/40 to-transparent",
  midnight: "from-[#3d4f5c]/70 via-[#eff3f8]/35 to-transparent",
  tundra: "from-[#d8c8b8]/80 via-[#f7f2ec]/42 to-transparent",
  glacier: "from-[#9fb7d4]/75 via-[#edf2f9]/30 to-transparent"
};

const gradientPalette = [
  "from-[#9fc7d1]/80 via-[#eef2f4]/40 to-transparent",
  "from-[#b7d9c8]/80 via-[#f3f7f1]/40 to-transparent",
  "from-[#d7c7e9]/80 via-[#f6f1fb]/35 to-transparent"
];

export function CapabilitiesGrid({ section }: CapabilitiesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Skip heavy GSAP animations on mobile
    if (isMobile || !isClient) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".capability-card", {
        interval: 0.2,
        batchMax: 3,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 60, rotateX: -8 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "expo.out"
            }
          );
        },
        once: true,
        start: "top 85%"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, isClient]);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="relative z-10 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        variants={isMobile ? mobileContainerVariants : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobile ? 0.1 : 0.25 }}
      >
        {section.capabilities.map((capability, index) => {
          const gradient =
            (capability.tone && paletteByTone[capability.tone]) ??
            gradientPalette[index % gradientPalette.length];

          return (
            <motion.div
              key={capability.title}
              className={`capability-card group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.045] p-6 shadow-lg md:rounded-3xl md:p-8 ${
                isMobile ? "" : "backdrop-blur-[28px] md:shadow-[0_28px_60px_rgba(9,14,17,0.22)]"
              }`}
              variants={isMobile ? mobileItemVariants : itemVariants}
              whileHover={isMobile ? undefined : { y: -6 }}
            >
              <div
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} opacity-75 ${
                  isMobile ? "" : "transition-opacity duration-500 group-hover:opacity-100"
                }`}
              />
              <div className="flex items-start justify-between gap-4">
                {isMobile ? (
                  <span className="text-3xl md:text-4xl">
                    {capability.icon ?? "✦"}
                  </span>
                ) : (
                  <motion.span
                    className="text-4xl"
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {capability.icon ?? "✦"}
                  </motion.span>
                )}
                <span className="font-creative text-[0.7rem] uppercase tracking-[0.4em] text-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 space-y-3 md:mt-6 md:space-y-4">
                <h3 className="font-display text-xl text-foreground md:text-2xl">
                  {capability.title}
                </h3>
                <p className="font-creative text-sm leading-relaxed text-foreground/70">
                  {capability.description}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
                {capability.skills.map((skill, skillIndex) => (
                  isMobile ? (
                    <span
                      key={skill}
                      className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-creative text-[0.62rem] uppercase tracking-[0.32em] text-foreground/70"
                    >
                      {skill}
                    </span>
                  ) : (
                    <motion.span
                      key={skill}
                      className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-creative text-[0.62rem] uppercase tracking-[0.32em] text-foreground/70"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + skillIndex * 0.05 }}
                    >
                      {skill}
                    </motion.span>
                  )
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      {!isMobile && (
        <>
          <div className="pointer-events-none absolute inset-0 -z-20 opacity-70">
            <div className="animated-grid h-full w-full rounded-[2.5rem]" />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-30 blur-[120px]">
            <div className="absolute -top-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#9fc7d1]/25" />
            <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-[#d7c7e9]/30" />
            <div className="absolute bottom-6 right-6 h-40 w-40 rounded-full bg-[#b7d9c8]/35" />
          </div>
        </>
      )}
    </div>
  );
}
