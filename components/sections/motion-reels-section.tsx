"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

import { Card, CardContent } from "@/components/ui/card";

type MotionReelsSection = Extract<PortfolioSection, { type: "motion-reels" }>;

interface MotionReelsSectionProps {
  section: MotionReelsSection;
}

export function MotionReelsSection({ section }: MotionReelsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClose = () => setActiveIndex(null);

  return (
    <div className="relative">
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pl-1 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {section.reels.map((reel, index) => {
          const isFile = Boolean(reel.file);
          const cardKey = `${section.id}-reel-${index}`;

          return (
            <motion.button
              key={cardKey}
              type="button"
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 60, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="snap-start"
            >
              <Card className="min-w-[220px] max-w-[260px] overflow-hidden rounded-[2.5rem] border-white/12 bg-white/5 shadow-[0_30px_90px_rgba(8,10,18,0.35)] backdrop-blur-xl sm:min-w-[240px] md:min-w-[260px]">
                <CardContent className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-white/15 p-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/20" />
                  {isFile ? (
                    <video
                      playsInline
                      muted
                      loop
                      controls={false}
                      autoPlay
                      className="relative z-10 h-full w-full object-cover"
                    >
                      <source src={reel.file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                <iframe
                      title={reel.title ?? `Reel ${index + 1}`}
                  src={reel.embedUrl}
                      className="relative z-10 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                    />
                  )}
                  {reel.platform ? (
                    <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 font-creative text-[0.55rem] uppercase tracking-[0.35em] text-white/85 backdrop-blur">
                      {reel.platform}
              </span>
              ) : null}
                </CardContent>
              </Card>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <motion.div
            key="reel-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[90svh] max-w-[70svw] overflow-hidden rounded-[2rem] border border-white/20 bg-black"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute right-4 top-4 z-10 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border border-white/30 bg-black/60 px-3 py-1 font-creative text-[0.65rem] uppercase tracking-[0.35em] text-white/80 transition hover:border-white/60 hover:text-white"
                >
                  Close
                </button>
              </div>
              {(() => {
                const reel = section.reels[activeIndex];
                const isFile = Boolean(reel.file);
                if (isFile) {
                  return (
                    <video
                      controls
                      autoPlay
                      className="h-full w-full object-contain bg-black"
                    >
                      <source src={reel.file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  );
                }
                return (
                  <iframe
                    title={reel.title ?? `Reel ${activeIndex + 1}`}
                    src={reel.embedUrl}
                    className="h-[80svh] w-[56.25svh] max-w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                );
              })()}
            </motion.div>
    </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

