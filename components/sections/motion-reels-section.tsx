"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

import { Card, CardContent } from "@/components/ui/card";

type MotionReelsSection = Extract<PortfolioSection, { type: "motion-reels" }>;

interface MotionReelsSectionProps {
  section: MotionReelsSection;
}

export function MotionReelsSection({ section }: MotionReelsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (activeIndex !== null) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [activeIndex]);

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
                <CardContent className="relative flex aspect-[9/16] items-center justify-center overflow-hidden rounded-[2rem] border border-white/15 bg-black p-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/20" />
                  {isFile ? (
                    <video
                      playsInline
                      muted
                      loop
                      controls={false}
                      autoPlay
                      className="relative z-10 h-full w-full object-contain"
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center justify-center gap-4 text-center"
              onClick={(event) => event.stopPropagation()}
            >
              {(() => {
                const reel = section.reels[activeIndex];
                const isFile = Boolean(reel.file);
                if (isFile) {
                  return (
                    <video
                      key={reel.file}
                      controls
                      autoPlay
                      playsInline
                      className="max-h-[90vh] max-w-[90vw] rounded-[2rem] border border-white/15 object-contain shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
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
                    className="max-h-[90vh] max-w-[90vw] rounded-[2rem] border border-white/15"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                );
              })()}

              {(() => {
                const reel = section.reels[activeIndex];
                return (
                  <div className="space-y-2 text-white">
                    {reel.title ? <p className="font-display text-2xl">{reel.title}</p> : null}
                    {reel.description ? (
                      <p className="max-w-2xl text-sm text-white/70">{reel.description}</p>
                    ) : null}
                    {reel.platform ? (
                      <span className="inline-flex rounded-full border border-white/30 px-3 py-1 font-creative text-xs uppercase tracking-[0.35em] text-white/80">
                        {reel.platform}
                      </span>
                    ) : null}
                  </div>
                );
              })()}

              <button
                type="button"
                onClick={handleClose}
                className="absolute -top-10 right-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur transition hover:bg-white/20"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

