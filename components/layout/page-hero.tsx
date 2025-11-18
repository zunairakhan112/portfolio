"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  background?: "aurora" | "midnight" | "sunrise" | "glacier";
}

const gradientMap: Record<NonNullable<PageHeroProps["background"]>, string> = {
  aurora: "from-[#6d34ff]/25 via-[#1fb9ff]/20 to-transparent",
  midnight: "from-[#0f172a]/70 via-[#1e293b]/60 to-transparent",
  sunrise: "from-[#ff8c42]/30 via-[#facc15]/20 to-transparent",
  glacier: "from-[#60a5fa]/25 via-[#5eead4]/20 to-transparent"
};

export function PageHero({ title, subtitle, description, background = "aurora" }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden px-6 pt-[160px] pb-20 md:px-10 lg:pb-28">
      <div
        className={clsx(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-br blur-3xl",
          gradientMap[background]
        )}
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto flex max-w-4xl flex-col gap-6 text-neutral-50"
      >
        <div className="space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-creative text-xs uppercase tracking-[0.55em] text-neutral-200/70"
          >
            {subtitle}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-6xl"
          >
            {title}
          </motion.h1>
        </div>
        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: "easeOut" }}
            className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
      </motion.div>
    </section>
  );
}


