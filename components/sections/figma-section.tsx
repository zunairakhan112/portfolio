"use client";

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
    <div className="grid gap-10 lg:grid-cols-2">
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
          <Card className="glimmer-outline overflow-hidden rounded-[2.6rem] border-white/15 bg-gradient-to-br from-white/12 via-white/6 to-white/12 transition-transform duration-300">
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
            <CardContent className="relative aspect-video overflow-hidden rounded-[2rem] border border-white/15 bg-neutral-950">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,140,66,0.25),_transparent_55%)] opacity-60" />
              <iframe
                title={item.title}
                src={item.embedUrl}
                className="relative z-10 h-full w-full rounded-[2rem]"
                allowFullScreen
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

