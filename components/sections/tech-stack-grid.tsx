"use client";

import Image from "next/image";
import { createRef, useEffect, useMemo, useState, type RefObject } from "react";
import { motion, Reorder } from "framer-motion";

import type { PortfolioContent } from "@/lib/content-schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TechStackGridProps {
  techStack: PortfolioContent["techStack"];
}

type StackColumn = {
  heading: string;
  items: string[];
};

const columnVariants = {
  hidden: { y: 60, opacity: 0, rotateX: -8 },
  visible: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 1, ease: "easeOut" } }
};

const TOOL_META: Record<string, { logo?: string; alt?: string }> = {
  Figma: { logo: "/logos/Logo-Figma.svg", alt: "Figma" },
  "Adobe CC": { logo: "/logos/Logo-Adobe%20CC.png", alt: "Adobe Creative Cloud" },
  Canva: { logo: "/logos/Logo-Canva.png", alt: "Canva" },
  Capcut: { logo: "/logos/Logo-Capcut.webp", alt: "CapCut" },
  Miro: { logo: "/logos/Logo-Miro.png", alt: "Miro" },

  Notion: { logo: "/logos/Logo-Notion.png", alt: "Notion" },
  "G Suite": { logo: "/logos/Logo-G%20Suite.png", alt: "Google Workspace" },
  "MS Office": { logo: "/logos/Logo-MS%20Office.webp", alt: "Microsoft Office" },
  Wordpress: { logo: "/logos/Logo-Wordpress.png", alt: "WordPress" },

  Facebook: { logo: "/logos/Logo-Facebook.png", alt: "Facebook" },
  Instagram: { logo: "/logos/Logo-Instagram.webp", alt: "Instagram" },
  Snapchat: { logo: "/logos/Logo-Snapchat.png", alt: "Snapchat" },
  Tiktok: { logo: "/logos/Logo-Tiktok.png", alt: "TikTok" },
  YouTube: { logo: "/logos/Logo-Youtube.png", alt: "YouTube" },
  "YT Shorts": { logo: "/logos/Logo-YT%20Shorts.png", alt: "YouTube Shorts" },
  WhatsApp: { logo: "/logos/Logo-WhatsApp.webp", alt: "WhatsApp" },
  Telegram: { logo: "/logos/Logo-Telegram.png", alt: "Telegram" }
};

export function TechStackGrid({ techStack }: TechStackGridProps) {
  const columnRefs = useMemo(() => techStack.columns.map(() => createRef<HTMLDivElement>()), [techStack.columns.length]);

  const [columnsState, setColumnsState] = useState<StackColumn[]>(() =>
    techStack.columns.map((column) => ({
      heading: column.heading,
      items: [...column.items]
    }))
  );

  useEffect(() => {
    setColumnsState(
      techStack.columns.map((column) => ({
        heading: column.heading,
        items: [...column.items]
      }))
    );
  }, [techStack]);

  const updateColumnItems = (columnIndex: number, newItems: string[]) => {
    setColumnsState((prev) =>
      prev.map((column, index) =>
        index === columnIndex ? { ...column, items: newItems } : column
      )
    );
  };

  const getColumnRef = (index: number) => columnRefs[index]!;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.05] p-12 shadow-[0_40px_140px_rgba(8,8,8,0.35)] backdrop-blur-2xl md:p-16"
      data-animate
    >
      <div className="absolute inset-0 blur-[120px]">
        <div className="absolute -left-20 top-24 h-44 w-44 rounded-full bg-[#ff8c42]/40" />
        <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-[#8bc34a]/25" />
      </div>
      <div className="relative z-10 flex flex-col gap-8 pb-12">
        <h2 className="font-display text-[clamp(2.5rem,4vw,3.8rem)] leading-tight text-foreground drop-shadow-[0_14px_40px_rgba(0,0,0,0.45)]">
          {techStack.title}
        </h2>
        {techStack.description ? (
          <p className="max-w-2xl font-creative text-lg leading-relaxed text-muted-foreground/85">
            {techStack.description}
          </p>
        ) : null}
      </div>
      <div className="relative z-10 grid gap-6 md:grid-cols-3">
        {columnsState.map((column, columnIndex) => (
          <motion.div
            key={column.heading}
            variants={columnVariants}
            transition={{ delay: columnIndex * 0.1 }}
          >
            <Card className="glimmer-outline h-full border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/10">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-foreground">
                  {column.heading}
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <Reorder.Group
                  as="div"
                  ref={getColumnRef(columnIndex)}
                  axis="y"
                  values={column.items}
                  onReorder={(newOrder) => updateColumnItems(columnIndex, newOrder)}
                  className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  style={{ gridAutoRows: "minmax(5.5rem, 1fr)" }}
                  layout
                >
                  {column.items.map((item) => {
                    const meta = TOOL_META[item] ?? {};
                    const logo = meta.logo;
                    const alt = meta.alt ?? item;
                    const containerRef = getColumnRef(columnIndex);

                    return (
                      <Reorder.Item
                        key={item}
                        value={item}
                        dragConstraints={containerRef}
                        dragElastic={0.12}
                        dragMomentum={false}
                        dragTransition={{ bounceStiffness: 420, bounceDamping: 32 }}
                        whileDrag={{ scale: 0.96 }}
                        whileTap={{ scale: 0.92 }}
                        whileHover={{ scale: 1.06 }}
                        className="relative flex h-20 w-20 cursor-grab items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/15 shadow-[0_18px_45px_rgba(10,10,10,0.25)] backdrop-blur-xl active:cursor-grabbing"
                        aria-label={item}
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-white/10" />
                        {logo ? (
                          <Image src={logo} alt={alt} width={56} height={56} className="relative z-10 h-12 w-12 object-contain" />
                        ) : (
                          <span className="relative z-10 font-display text-sm uppercase tracking-[0.25em] text-white/80">
                            {item}
                          </span>
                        )}
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

