"use client";

import { motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

type ManifestoSection = Extract<PortfolioSection, { type: "manifesto" }>;

interface ManifestoSectionProps {
  section: ManifestoSection;
}

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
  return (
    <motion.div
      className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#9fc7d1]/20 blur-[120px]" />
      {section.tenets.map((tenet, index) => (
        <motion.article
          key={tenet.title}
          variants={cardVariants}
          className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/[0.05] p-8 shadow-[0_30px_80px_rgba(5,12,18,0.2)] backdrop-blur-3xl"
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

