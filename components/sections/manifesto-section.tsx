"use client";

import { motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";
import { useMediaQuery } from "@/hooks/use-media-query";

type ManifestoSection = Extract<PortfolioSection, { type: "manifesto" }>;

interface ManifestoSectionProps {
  section: ManifestoSection;
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

const mobileCardVariants = {
  hidden: { opacity: 0, y: 15 },
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
      staggerChildren: 0.14,
      delayChildren: 0.18
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function ManifestoSection({ section }: ManifestoSectionProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div
      className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={isMobile ? mobileContainerVariants : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isMobile ? 0.1 : 0.25 }}
    >
      {!isMobile && (
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#9fc7d1]/20 blur-[120px]" />
      )}
      {section.tenets.map((tenet, index) => (
        <motion.article
          key={tenet.title}
          variants={isMobile ? mobileCardVariants : cardVariants}
          className={`relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] p-6 shadow-md md:rounded-[2.4rem] md:p-8 ${
            isMobile ? "" : "backdrop-blur-3xl shadow-[0_30px_80px_rgba(5,12,18,0.2)]"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#101417]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-start justify-between">
            <span className="font-creative text-[0.7rem] uppercase tracking-[0.45em] text-foreground/45">
              PRINCIPLE {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-lg text-foreground/30">✧</span>
          </div>
          <h3 className="mt-6 font-display text-[1.85rem] leading-tight text-foreground">
            {tenet.title}
          </h3>
          <p className="mt-4 font-creative text-sm leading-relaxed text-foreground/70">
            {tenet.detail}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}

