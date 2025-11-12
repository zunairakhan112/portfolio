"use client";

import { motion } from "framer-motion";

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
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, delay: index * 0.1, ease: "easeOut" }}
          data-animate
        >
          <Card className="overflow-hidden rounded-[2.8rem] border-white/15 bg-gradient-to-br from-white/14 via-white/6 to-white/8 shadow-[0_30px_100px_rgba(7,7,7,0.4)]">
            <CardHeader className="space-y-4">
              <CardTitle className="font-display text-2xl text-foreground">
                {item.title}
              </CardTitle>
              {item.description ? (
                <CardDescription className="font-creative text-base text-muted-foreground/85">
                  {item.description}
                </CardDescription>
              ) : null}
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
              <iframe
                title={item.title}
                src={`${item.embedUrl}?autoplay=yep&transparent=1`}
                frameBorder="0"
                allow="fullscreen; clipboard-read; clipboard-write"
                className="relative z-10 h-full w-full rounded-[2rem]"
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

