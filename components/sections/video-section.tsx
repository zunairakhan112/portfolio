"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import type { PortfolioSection } from "@/lib/content-schema";

import { Card, CardContent } from "@/components/ui/card";

type VideoSection = Extract<PortfolioSection, { type: "video" }>;

interface VideoSectionProps {
  section: VideoSection;
}

export function VideoSection({ section }: VideoSectionProps) {
  const isCanvaSection = section.id === "design-canva";
  const scrollerRef = useRef<HTMLDivElement>(null);

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

  return (
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
                  className={`relative overflow-hidden p-0 ${
                    isCanvaSection
                      ? "aspect-square rounded-[1.75rem] bg-black/85"
                      : "aspect-[9/16] rounded-[2rem] border border-white/15"
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
                      className="relative z-10 h-full w-full object-cover"
                    >
                      <source src={item.file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
              <iframe
                      title={item.title ?? `Video ${index + 1}`}
                src={item.embedUrl}
                      className={`relative z-10 h-full w-full ${isCanvaSection ? "rounded-[1.75rem]" : ""}`}
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
  );
}

