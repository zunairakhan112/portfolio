"use client";

import { motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

type GrowthLabSection = Extract<PortfolioSection, { type: "growth-lab" }>;

interface GrowthLabSectionProps {
  section: GrowthLabSection;
}

const experimentVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.8, 0.25, 1] }
  }
};

export function GrowthLabSection({ section }: GrowthLabSectionProps) {
  return (
    <motion.div
      className="flex flex-col gap-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.18 }}
    >
      {section.experiments.map((experiment, index) => (
        <motion.article
          key={experiment.title}
          variants={experimentVariants}
          className="group relative overflow-hidden rounded-[3rem] border border-white/12 bg-white/[0.04] p-8 shadow-[0_34px_90px_rgba(7,12,17,0.22)] backdrop-blur-[28px]"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/3 to-white/0 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.45em] text-foreground/40">
            <span className="font-creative">Blueprint {String(index + 1).padStart(2, "0")}</span>
            {experiment.tags.length ? (
              <span className="font-creative text-foreground/50">
                {experiment.tags.join(" • ")}
              </span>
            ) : null}
          </div>
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h3 className="font-display text-[2.2rem] leading-tight text-foreground">
            {experiment.title}
          </h3>
            <span className="font-creative text-[0.6rem] uppercase tracking-[0.4em] text-foreground/45">
              Full canvas view
            </span>
          </div>
          <p className="mt-3 font-creative text-sm leading-relaxed text-foreground/70">
            {experiment.description}
          </p>
          {experiment.embedUrl ? (
            <div className="mt-8 overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/5 p-2 shadow-inner">
              <div className="aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10">
                <iframe
                  src={experiment.embedUrl}
                  title={experiment.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          ) : null}
        </motion.article>
      ))}
    </motion.div>
  );
}

