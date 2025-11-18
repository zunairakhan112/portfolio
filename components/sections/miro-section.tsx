"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import type { PortfolioSection } from "@/lib/content-schema";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MiroSection = Extract<PortfolioSection, { type: "miro" }>;

interface MiroSectionProps {
  section: MiroSection;
}

export function MiroSection({ section }: MiroSectionProps) {
  return (
    <div className="flex flex-col gap-10">
      {section.items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
          data-animate
        >
          <Card className="overflow-hidden rounded-[2.8rem] border-white/15 bg-gradient-to-br from-white/14 via-white/6 to-white/8 shadow-[0_30px_100px_rgba(7,7,7,0.4)]">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-4">
                  <CardTitle className="font-display text-2xl text-foreground">
                    {item.title}
                  </CardTitle>
                  {item.description ? (
                    <CardDescription className="font-creative text-base text-muted-foreground/85">
                      {item.description}
                    </CardDescription>
                  ) : null}
                </div>
                {item.logos?.length ? (
                  <div className="ml-auto flex items-start gap-3">
                    {item.logos.map((logo) => (
                      <div key={logo.src} className="relative h-9 w-9 sm:h-11 sm:w-11">
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

              <div className="flex flex-wrap gap-2">
                {item.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="subtle"
                    className="rounded-full border-white/20 bg-white/10 px-3 py-1 font-creative text-[0.65rem] uppercase tracking-[0.3em] text-white/80"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/15 bg-black/70">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.18),_transparent_65%)]" />
              
              {/* Mobile Placeholder - Shows on mobile only */}
              <Link
                href={item.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative z-10 flex h-full w-full items-center justify-center md:hidden"
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-to-br from-neutral-900 via-black to-neutral-950 p-8 transition-all duration-300 active:from-neutral-800 active:via-neutral-900">
                  <div className="relative h-20 w-20 opacity-40 transition-all duration-300 group-active/link:scale-110 group-active/link:opacity-60">
                    <Image
                      src="/logos/Logo-Miro.png"
                      alt="Miro"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <p className="font-creative text-sm uppercase tracking-[0.3em] text-white/60">
                      View in Miro
                    </p>
                    <div className="flex items-center gap-2 font-display text-lg text-white/80 transition-colors group-active/link:text-white">
                      <span>Open Blueprint Board</span>
                      <ExternalLink className="h-5 w-5" />
                    </div>
                    <p className="max-w-xs font-creative text-xs text-white/40">
                      Tap to view the interactive board in Miro
                    </p>
                  </div>
                </div>
              </Link>
              
              {/* Desktop Iframe - Shows on desktop only */}
              <iframe
                title={item.title}
                src={
                  item.embedUrl.includes("?")
                    ? `${item.embedUrl}&autoplay=yep&transparent=1`
                    : `${item.embedUrl}?autoplay=yep&transparent=1`
                }
                frameBorder="0"
                allow="fullscreen; clipboard-read; clipboard-write"
                className="relative z-10 hidden h-full w-full rounded-[2rem] md:block"
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

