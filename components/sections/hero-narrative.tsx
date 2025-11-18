"use client";

import { motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

type HeroNarrativeSection = Extract<PortfolioSection, { type: "hero-narrative" }>;

interface HeroNarrativeSectionProps {
  section: HeroNarrativeSection;
}

const paragraphVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

const statVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function HeroNarrativeSection({ section }: HeroNarrativeSectionProps) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {section.narrative.map((entry) => (
          <motion.div
            key={entry.heading}
            variants={paragraphVariants}
            className="relative rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_26px_80px_rgba(11,16,19,0.18)] backdrop-blur-2xl md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 opacity-0 transition-opacity duration-500 hover:opacity-100" />
            <h3 className="font-display text-2xl text-foreground md:text-[2.1rem]">
              {entry.heading}
            </h3>
            <p className="mt-4 font-creative text-base leading-relaxed text-foreground/70 md:text-lg">
              {entry.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col gap-8">
        {section.stats.length ? (
          <motion.div
            className="grid gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#eff4f8]/70 via-[#f3f9f4]/55 to-white/40 p-6 shadow-[0_24px_60px_rgba(9,14,17,0.16)] backdrop-blur-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
          >
            {section.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                className="flex flex-col gap-1"
              >
                <div className="mt-auto flex flex-col gap-3">
                <span className="font-creative text-[0.7rem] uppercase tracking-[0.45em] text-foreground/55">
                  {stat.label}
                </span>
                <span className="font-display text-[clamp(1.7rem,3.2vw,2.6rem)] leading-none text-foreground">
                  {stat.value}
                </span>
                {stat.annotation ? (
                  <span className="font-creative text-xs uppercase tracking-[0.3em] text-foreground/45">
                    {stat.annotation}
                  </span>
                ) : null}
                  {typeof stat.progress === "number" ? (
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full border border-foreground/15 bg-foreground/10">
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-[#4ade80] via-[#22d3ee] to-[#818cf8]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : null}

        {section.quote ? (
          <motion.blockquote
            className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#0c1013]/70 p-8 text-white shadow-[0_30px_80px_rgba(5,11,17,0.45)] backdrop-blur-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(135,182,185,0.35),_transparent_65%)]" />
            <p className="relative z-10 font-display text-2xl leading-snug">
              “{section.quote.text}”
            </p>
            <footer className="relative z-10 mt-6 space-y-1 font-creative text-sm uppercase tracking-[0.35em] text-white/70">
              <div>{section.quote.author}</div>
              {section.quote.role ? <div>{section.quote.role}</div> : null}
            </footer>
          </motion.blockquote>
        ) : null}
      </div>
    </div>
  );
}

