"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

type GallerySection = Extract<PortfolioSection, { type: "gallery" }>;

interface GallerySectionProps {
  section: GallerySection;
}

export function GallerySection({ section }: GallerySectionProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {section.images.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: index * 0.1, ease: "easeOut" }}
          whileHover={{ y: -12 }}
          className="h-full"
          data-animate
        >
          <Card className="flex h-full flex-col overflow-hidden rounded-[2.5rem] border-white/12 bg-gradient-to-br from-white/10 via-white/4 to-white/8 shadow-[0_30px_100px_rgba(10,10,10,0.4)]">
            <CardContent className="relative h-64 overflow-hidden rounded-[2rem] border border-white/20 bg-neutral-900">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_65%)]" />
            </CardContent>
            {(image.caption || image.alt) && (
              <CardHeader className="space-y-2">
                {image.caption ? (
                  <CardDescription className="font-creative text-sm text-muted-foreground/90">
                    {image.caption}
                  </CardDescription>
                ) : null}
                <span className="font-creative text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground/60">
                  {image.alt}
                </span>
              </CardHeader>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

