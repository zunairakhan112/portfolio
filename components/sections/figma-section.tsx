"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FigmaSection = Extract<PortfolioSection, { type: "figma" }>;

interface FigmaSectionProps {
  section: FigmaSection;
}

export function FigmaSection({ section }: FigmaSectionProps) {
  return (
    <div className="flex flex-col gap-12">
      {section.items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 50, rotateX: -6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: index * 0.12, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="group"
          data-animate
        >
          <Card className="glimmer-outline overflow-hidden rounded-[2.8rem] border-white/12 bg-gradient-to-br from-white/10 via-white/6 to-white/12 transition-transform duration-300">
            <CardHeader className="space-y-5 pb-0">
              {item.logos?.length ? (() => {
                const figmaLogos = item.logos.filter(
                  (logo) => logo.alt?.toLowerCase().includes("figma") || logo.src.toLowerCase().includes("figma")
                );
                const primaryLogos = item.logos.filter((logo) => !figmaLogos.includes(logo));

                return (
                  <div className="flex items-start justify-between gap-4">
                    {primaryLogos.length ? (
                      <div className="flex flex-wrap items-center gap-4 md:gap-6">
                        {primaryLogos.map((logo) => (
                          <div key={logo.src} className="relative h-10 w-24 sm:h-12 sm:w-28">
                            <Image
                              src={logo.src}
                              alt={logo.alt ?? `${item.title} logo`}
                              fill
                              sizes="112px"
                              className="object-contain"
                              priority={index === 0}
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {figmaLogos.length ? (
                      <div className={primaryLogos.length ? "ml-auto flex items-start gap-3" : "ml-auto flex items-start gap-3"}>
                        {figmaLogos.map((logo) => (
                          <div key={logo.src} className="relative h-8 w-8 sm:h-9 sm:w-9">
                            <Image
                              src={logo.src}
                              alt={logo.alt ?? `${item.title} logo`}
                              fill
                              sizes="72px"
                              className="object-contain"
                              priority={index === 0}
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })() : null}
              <CardTitle className="font-display text-3xl text-foreground md:text-4xl">
                {item.title}
              </CardTitle>
              {item.description ? (
                <CardDescription className="font-creative text-base leading-relaxed text-muted-foreground/80 md:text-lg">
                  {item.description}
                </CardDescription>
              ) : null}
              <div className="flex flex-wrap gap-2 pt-1">
                {item.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="subtle"
                    className="rounded-full border-white/20 bg-white/10 px-3 py-1 font-creative text-[0.62rem] uppercase tracking-[0.3em] text-white/80"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="relative mt-8 overflow-hidden rounded-[2.4rem] border border-white/12 bg-neutral-950 p-0 shadow-[0_38px_120px_rgba(10,12,24,0.45)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,140,66,0.22),_transparent_65%)] opacity-70" />
              <iframe
                title={item.title}
                src={item.embedUrl}
                className="relative z-10 h-[360px] w-full rounded-[2.4rem] md:h-[520px] lg:h-[640px]"
                allowFullScreen
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

