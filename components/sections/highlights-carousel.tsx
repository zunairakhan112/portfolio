"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

type HighlightsSection = Extract<PortfolioSection, { type: "highlights" }>;

interface HighlightsCarouselProps {
  section: HighlightsSection;
}

const highlightVariants = {
  initial: { opacity: 0, y: 28, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -24,
    scale: 0.96,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function HighlightsCarousel({ section }: HighlightsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const resolveLogo = (logo?: string) => {
    if (!logo) return undefined;
    const normalized = logo.startsWith("/") ? logo : `/logos/${logo}`;
    return encodeURI(normalized);
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((current) =>
        current === section.highlights.length - 1 ? 0 : current + 1
      );
    }, 5400);

    return () => window.clearInterval(id);
  }, [section.highlights.length]);

  const activeHighlight = section.highlights[activeIndex];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-[2.8rem] border border-white/14 bg-gradient-to-br from-[#0d1216] via-[#10171d] to-[#162028] p-10 shadow-[0_45px_120px_rgba(9,12,17,0.45)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(143,183,195,0.35),_transparent_60%)]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHighlight.title}
            className="relative z-10 flex h-full flex-col gap-8"
            variants={highlightVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {activeHighlight.logo ? (
              <span className="inline-flex h-20 w-20 items-center justify-center">
                <Image
                  src={resolveLogo(activeHighlight.logo) ?? ""}
                  alt={activeHighlight.logoAlt ?? activeHighlight.title}
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                  sizes="80px"
                />
              </span>
            ) : null}
            <div className="flex items-center justify-between font-creative text-xs uppercase tracking-[0.45em] text-white/55">
              <span>Highlight {String(activeIndex + 1).padStart(2, "0")}</span>
              {activeHighlight.metric ? <span>{activeHighlight.metric}</span> : null}
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-[clamp(2rem,4vw,3.1rem)] leading-[1]">
                {activeHighlight.title}
              </h3>
              <p className="max-w-2xl font-creative text-sm leading-relaxed text-white/70 sm:text-base">
                {activeHighlight.description}
              </p>
            </div>
            <div className="mt-auto flex items-center gap-3">
              {section.highlights.map((_, index) => (
                <motion.button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="h-2.5 w-8 overflow-hidden rounded-full border border-white/20 bg-white/10"
                  aria-label={`Show highlight ${index + 1}`}
                >
                  <motion.span
                    className="block h-full w-full bg-white"
                    animate={{ width: index === activeIndex ? "100%" : "0%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-3">
        {section.highlights.map((highlight, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.button
              key={highlight.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition ${
                isActive
                  ? "border-[#89b0c1]/60 bg-[#e6f0f6]/80 shadow-[0_22px_60px_rgba(15,26,32,0.2)]"
                  : "border-white/14 bg-white/[0.04] hover:border-white/24 hover:bg-white/[0.08]"
              }`}
              whileHover={{ translateX: 6 }}
            >
              {highlight.logo ? (
                <span className="inline-flex h-14 w-14 items-center justify-center">
                  <Image
                    src={resolveLogo(highlight.logo) ?? ""}
                    alt={highlight.logoAlt ?? highlight.title}
                    width={72}
                    height={72}
                    className="h-full w-full object-contain"
                    sizes="64px"
                  />
                </span>
              ) : null}
              <span className="font-creative text-[0.68rem] uppercase tracking-[0.4em] text-foreground/40 group-hover:text-foreground/60">
                {highlight.accent ?? "Spotlight"}
              </span>
              <span className="font-display text-2xl text-foreground">
                {highlight.title}
              </span>
              <p className="font-creative text-sm leading-relaxed text-foreground/70">
                {highlight.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

