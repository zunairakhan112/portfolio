"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { PortfolioSection } from "@/lib/content-schema";

import { Card, CardContent } from "@/components/ui/card";

type VideoSection = Extract<PortfolioSection, { type: "video" }>;

interface VideoSectionProps {
  section: VideoSection;
}

export function VideoSection({ section }: VideoSectionProps) {
  const isCanvaSection = section.id === "design-canva";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const activeItem = activeVideoIndex !== null ? section.items[activeVideoIndex] : null;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const container = scrollerRef.current;
    if (!container) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile || section.items.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!container) {
        return;
      }
      const maxScroll = container.scrollWidth - container.clientWidth;
      const nextScroll = container.scrollLeft + container.clientWidth;
      container.scrollTo({
        left: nextScroll >= maxScroll ? 0 : nextScroll,
        behavior: "smooth"
      });
    }, 5500);

    return () => {
      window.clearInterval(interval);
    };
  }, [section.items.length]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (activeVideoIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeVideoIndex]);

  return (
    <>
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pl-1 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-animate
        >
          {section.items.map((item, index) => {
            const isFile = Boolean(item.file);
            const cardKey = `${section.id}-video-${index}`;

            return (
              <motion.div
                key={cardKey}
                initial={{ opacity: 0, y: 60, rotateX: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className="snap-start"
              >
                <Card
                  className={`overflow-hidden rounded-[2.5rem] border-white/12 bg-white/5 shadow-[0_30px_90px_rgba(8,10,18,0.35)] backdrop-blur-xl ${
                    isCanvaSection
                      ? "min-w-[260px] max-w-[320px] sm:min-w-[280px]"
                      : "min-w-[220px] max-w-[260px] sm:min-w-[240px] md:min-w-[260px]"
                  }`}
                >
                  <CardContent
                    className={`relative flex items-center justify-center overflow-hidden p-0 ${
                      isCanvaSection
                        ? "aspect-square rounded-[1.75rem] bg-black/85"
                        : "aspect-[9/16] rounded-[2rem] border border-white/15 bg-black"
                    }`}
                  >
                    {isCanvaSection ? (
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.18),_transparent_65%)]" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/20" />
                    )}
                    {isFile ? (
                      <video
                        playsInline
                        muted
                        loop
                        controls={false}
                        autoPlay
                        className="relative z-10 h-full w-full object-contain pointer-events-none select-none"
                      >
                        <source src={item.file} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe
                        title={item.title ?? `Video ${index + 1}`}
                        src={item.embedUrl}
                        className={`relative z-10 h-full w-full ${
                          isCanvaSection ? "rounded-[1.75rem]" : ""
                        } pointer-events-none`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    {isCanvaSection ? (
                      <div className="pointer-events-none absolute top-4 right-4 z-20">
                        <Image src="/logos/Logo-Canva.png" alt="Canva" width={36} height={36} />
                      </div>
                    ) : null}
                    {item.platform ? (
                      <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 font-creative text-[0.55rem] uppercase tracking-[0.35em] text-white/85 backdrop-blur">
                        {item.platform}
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setActiveVideoIndex(index)}
                      className="absolute inset-0 z-30 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      aria-label={`Expand ${item.title ?? "video"}`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        {section.items.length > 1 ? (
          <div className="pointer-events-none absolute inset-y-4 left-0 right-0 flex items-end justify-center bg-gradient-to-b from-transparent via-transparent to-background/40 pb-2 md:hidden">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 font-creative text-[0.6rem] uppercase tracking-[0.35em] text-white/80">
              Swipe to explore
            </span>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setActiveVideoIndex(null)}
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
              {activeItem.file ? (
                <video
                  key={activeItem.file}
                  src={activeItem.file}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[90vh] max-w-[90vw] rounded-[2rem] border border-white/15 object-contain shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
                >
                  <track kind="captions" />
                </video>
              ) : activeItem.embedUrl ? (
                <div className="max-h-[90vh] max-w-[90vw]">
                  <iframe
                    title={activeItem.title ?? "Expanded video"}
                    src={activeItem.embedUrl}
                    className="aspect-video h-full w-full rounded-[2rem] border border-white/15"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : null}

              <div className="space-y-2 text-white">
                {activeItem.title ? (
                  <p className="font-display text-2xl">{activeItem.title}</p>
                ) : null}
                {activeItem.description ? (
                  <p className="max-w-2xl text-sm text-white/70">{activeItem.description}</p>
                ) : null}
                {activeItem.platform ? (
                  <span className="inline-flex rounded-full border border-white/30 px-3 py-1 font-creative text-xs uppercase tracking-[0.35em] text-white/80">
                    {activeItem.platform}
                  </span>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => setActiveVideoIndex(null)}
                className="absolute -top-10 right-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur transition hover:bg-white/20"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

