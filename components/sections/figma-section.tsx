"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import type { PortfolioSection } from "@/lib/content-schema";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsTouchDevice } from "@/hooks/use-touch-device";

type FigmaSection = Extract<PortfolioSection, { type: "figma" }>;

interface FigmaSectionProps {
  section: FigmaSection;
}

export function FigmaSection({ section }: FigmaSectionProps) {
  const isTouchDevice = useIsTouchDevice();

  return (
    <div className="flex flex-col gap-12">
      {section.items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
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
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,140,66,0.28),_transparent_68%)] opacity-80" />
              {isTouchDevice ? (
                <Link
                  href={item.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${item.title} in Figma`}
                  className="group/link relative z-10 block h-[360px] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                >
                  <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-neutral-950 via-black to-neutral-950 p-8 transition-all duration-300 hover:bg-neutral-900/60 active:scale-[0.995]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_72%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 blur-3xl [background:radial-gradient(circle,_rgba(255,115,80,0.18)_0%,_transparent_70%)]" />
                    <div className="relative h-20 w-20 opacity-40 transition-all duration-300 group-hover/link:scale-110 group-hover/link:opacity-70 group-active/link:scale-110">
                      <Image
                        src="/logos/Logo-Figma.svg"
                        alt="Figma"
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center text-white">
                      <p className="font-creative text-xs uppercase tracking-[0.35em] text-white/60">
                        View in Figma
                      </p>
                      <div className="flex items-center gap-2 font-display text-lg text-white/85 transition-colors group-hover/link:text-white">
                        <span>Open Design Board</span>
                        <ExternalLink className="h-5 w-5" />
                      </div>
                      <p className="max-w-xs font-creative text-xs text-white/45">
                        Tap to explore the interactive prototype on Figma
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <iframe
                  title={item.title}
                  src={item.embedUrl}
                  loading="lazy"
                  className="relative z-10 block h-[480px] w-full rounded-[2.4rem] md:h-[520px] lg:h-[640px]"
                  allow="fullscreen"
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

