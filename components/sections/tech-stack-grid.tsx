"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { PortfolioContent } from "@/lib/content-schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TechStackGridProps {
  techStack: PortfolioContent["techStack"];
}

const columnVariants = {
  hidden: { y: 60, opacity: 0, rotateX: -8 },
  visible: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 1, ease: "easeOut" } }
};

const FLOAT_KEYFRAMES = [
  { y: [0, -6, 4, -8, 0], rotate: [0, 2, -1, 2, 0], scale: [1, 1.02, 1, 1.03, 1] },
  { y: [0, -4, 3, -5, 0], rotate: [0, -1.5, 1, -1.5, 0], scale: [1, 1.01, 1, 1.02, 1] },
  { y: [0, -5, 2, -6, 0], rotate: [0, 1.2, -1.2, 1.2, 0], scale: [1, 1.015, 1, 1.02, 1] },
  { y: [0, -7, 3, -4, 0], rotate: [0, -2, 1, -2, 0], scale: [1, 1.025, 1, 1.03, 1] }
];

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

const getFloatKeyframes = (index: number) => FLOAT_KEYFRAMES[index % FLOAT_KEYFRAMES.length];

const getFloatTransition = (index: number) => ({
  duration: 7 + (index % 3) * 1.2,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut"
});

export function TechStackGrid({ techStack }: TechStackGridProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.05] p-10 shadow-[0_40px_140px_rgba(8,8,8,0.35)] backdrop-blur-2xl sm:p-12 md:p-16"
      data-animate
    >
      <div className="absolute inset-0 blur-[120px]">
        <div className="absolute -left-20 top-24 h-44 w-44 rounded-full bg-[#ff8c42]/40" />
        <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-[#8bc34a]/25" />
      </div>
      <div className="relative z-10 flex flex-col gap-7 pb-10 sm:gap-8 sm:pb-12 md:px-0">
        <h2 className="font-display text-[clamp(1.8rem,3.2vw,3.4rem)] leading-tight text-foreground drop-shadow-[0_14px_40px_rgba(0,0,0,0.45)]">
          {techStack.title}
        </h2>
        {techStack.description ? (
          <p className="max-w-2xl font-creative text-sm leading-relaxed text-muted-foreground/85 sm:text-base lg:text-lg">
            {techStack.description}
          </p>
        ) : null}
      </div>
      <div className="relative z-10 grid gap-6 px-3 md:grid-cols-3 md:px-0">
        {techStack.columns.map((column, columnIndex) => (
          <motion.div
            key={column.heading}
            variants={columnVariants}
            transition={{ delay: columnIndex * 0.12 }}
          >
            <Card className="glimmer-outline h-full border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/10">
              <CardHeader>
                <CardTitle className="font-display text-xl text-foreground sm:text-2xl">
                  {column.heading}
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <div
                  className="relative grid grid-cols-3 gap-3 sm:gap-4"
                  style={{ gridAutoRows: "minmax(4.75rem, 1fr)", padding: "0.75rem" }}
                >
                  {column.items.map((item, itemIndex) => {
                    const meta = TOOL_META[item] ?? {};
                    const logo = meta.logo;
                    const alt = meta.alt ?? item;
                    const animationSeed = columnIndex * column.items.length + itemIndex;
                    const floatKeyframes = getFloatKeyframes(animationSeed);
                    const floatTransition = getFloatTransition(animationSeed);

                    return (
                      <motion.div
                        key={item}
                        aria-label={item}
                        className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-white/18 bg-white/15 shadow-[0_18px_45px_rgba(10,10,10,0.25)] backdrop-blur-xl transition-transform"
                        animate={floatKeyframes}
                        transition={floatTransition}
                        whileHover={{ scale: 1.06 }}
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/22 via-transparent to-white/12" />
                        {logo ? (
                          <Image
                            src={logo}
                            alt={alt}
                            width={56}
                            height={56}
                            className="relative z-10 h-12 w-12 object-contain sm:h-14 sm:w-14"
                          />
                        ) : (
                          <span className="relative z-10 px-2 text-center font-display text-xs uppercase tracking-[0.22em] text-white/80 sm:text-sm">
                            {item}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

