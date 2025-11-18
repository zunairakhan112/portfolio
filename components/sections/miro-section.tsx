"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import type { PortfolioSection } from "@/lib/content-schema";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsTouchDevice } from "@/hooks/use-touch-device";

type MiroSection = Extract<PortfolioSection, { type: "miro" }>;

interface MiroSectionProps {
  section: MiroSection;
}

export function MiroSection({ section }: MiroSectionProps) {
  const isTouchDevice = useIsTouchDevice();

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
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.22),_transparent_68%)]" />
              {isTouchDevice ? (
                <Link
                  href={item.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${item.title} in Miro`}
                  className="group/link relative z-10 flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                >
                  <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-neutral-950 via-black to-neutral-950 p-8 transition-all duration-300 hover:bg-neutral-900/60 active:scale-[0.995]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_72%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 blur-3xl [background:radial-gradient(circle,_rgba(250,204,21,0.26)_0%,_transparent_70%)]" />
                    <div className="relative h-20 w-20 opacity-40 transition-all duration-300 group-hover/link:scale-110 group-hover/link:opacity-70 group-active/link:scale-110">
                      <Image
                        src="/logos/Logo-Miro.png"
                        alt="Miro"
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center text-white">
                      <p className="font-creative text-xs uppercase tracking-[0.35em] text-white/60">
                        View in Miro
                      </p>
                      <div className="flex items-center gap-2 font-display text-lg text-white/85 transition-colors group-hover/link:text-white">
                        <span>Open Blueprint Board</span>
                        <ExternalLink className="h-5 w-5" />
                      </div>
                      <p className="max-w-xs font-creative text-xs text-white/45">
                        Tap to explore the interactive workspace on Miro
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <iframe
                  title={item.title}
                  src={
                    item.embedUrl.includes("?")
                      ? `${item.embedUrl}&autoplay=yep&transparent=1`
                      : `${item.embedUrl}?autoplay=yep&transparent=1`
                  }
                  loading="lazy"
                  allow="fullscreen; clipboard-read; clipboard-write"
                  className="relative z-10 block h-full w-full rounded-[2rem]"
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

