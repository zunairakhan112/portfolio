"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import type { PortfolioSection } from "@/lib/content-schema";

import { useIsTouchDevice } from "@/hooks/use-touch-device";

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

const EMBED_META = {
  figma: {
    logo: "/logos/Logo-Figma.svg",
    alt: "Figma",
    eyebrow: "View in Figma",
    action: "Open Design Board",
    hint: "Tap to explore the interactive prototype on Figma"
  },
  miro: {
    logo: "/logos/Logo-Miro.png",
    alt: "Miro",
    eyebrow: "View in Miro",
    action: "Open Blueprint Board",
    hint: "Tap to explore the interactive workspace on Miro"
  },
  default: {
    logo: "/window.svg",
    alt: "External resource",
    eyebrow: "View full canvas",
    action: "Open interactive board",
    hint: "Tap to open the interactive experience"
  }
} as const;

function resolveEmbedMeta(url: string | undefined) {
  if (!url) {
    return EMBED_META.default;
  }

  if (url.includes("figma")) {
    return EMBED_META.figma;
  }

  if (url.includes("miro")) {
    return EMBED_META.miro;
  }

  return EMBED_META.default;
}

export function GrowthLabSection({ section }: GrowthLabSectionProps) {
  const isTouchDevice = useIsTouchDevice();

  return (
    <motion.div
      className="flex flex-col gap-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.18 }}
    >
      {section.experiments.map((experiment, index) => {
        const meta = resolveEmbedMeta(experiment.embedUrl);

        return (
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
                <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_75%)]" />
                  {isTouchDevice ? (
                    <Link
                      href={experiment.embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${experiment.title}`}
                      className="group/embed relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-neutral-950 via-black to-neutral-950 p-8 transition-all duration-300 hover:bg-neutral-900/60 active:scale-[0.995]"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 blur-3xl [background:radial-gradient(circle,_rgba(255,255,255,0.12)_0%,_transparent_70%)]" />
                      <div className="relative h-20 w-20 opacity-50 transition duration-300 group-hover/embed:scale-110 group-hover/embed:opacity-80">
                        <Image
                          src={meta.logo}
                          alt={meta.alt}
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-3 text-center text-white">
                        <p className="font-creative text-xs uppercase tracking-[0.35em] text-white/65">
                          {meta.eyebrow}
                        </p>
                        <div className="flex items-center gap-2 font-display text-lg text-white/85 transition-colors group-hover/embed:text-white">
                          <span>{meta.action}</span>
                          <ExternalLink className="h-5 w-5" />
                        </div>
                        <p className="max-w-sm font-creative text-xs text-white/45">
                          {meta.hint}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <iframe
                      src={experiment.embedUrl}
                      title={experiment.title}
                      loading="lazy"
                      allow="fullscreen"
                      className="relative z-10 h-full w-full rounded-[2rem]"
                    />
                  )}
                </div>
              </div>
            ) : null}
          </motion.article>
        );
      })}
    </motion.div>
  );
}

