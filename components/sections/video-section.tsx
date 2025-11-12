"use client";

import { motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

import { Card, CardContent } from "@/components/ui/card";

type VideoSection = Extract<PortfolioSection, { type: "video" }>;

interface VideoSectionProps {
  section: VideoSection;
}

export function VideoSection({ section }: VideoSectionProps) {
  return (
    <div className="relative">
      <div
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
                      <source src={item.file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
              <iframe
                      title={item.title ?? `Video ${index + 1}`}
                src={item.embedUrl}
                      className="relative z-10 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
                  )}
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
    </div>
  );
}

