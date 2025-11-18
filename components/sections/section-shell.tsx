"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SectionShellProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: "stack" | "panel";
}

export function SectionShell({
  id,
  title,
  description,
  children,
  variant = "stack"
}: SectionShellProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const animateState = { opacity: 1, y: 0 };
  const initialState = reduceMotion ? animateState : { opacity: 0, y: isMobile ? 12 : 24 };
  const transition = reduceMotion
    ? { duration: 0.25, ease: "linear" as const }
    : { duration: isMobile ? 0.4 : 0.7, ease: isMobile ? "easeOut" as const : [0.25, 0.8, 0.25, 1] as const };

  const containerClass =
    variant === "panel"
      ? `mx-auto flex h-full w-full max-w-5xl flex-col gap-12 rounded-2xl border border-white/10 bg-background/70 px-6 py-10 shadow-md md:rounded-[3rem] md:px-10 md:py-14 ${
          isMobile ? "" : "backdrop-blur-2xl shadow-[0_30px_120px_rgba(8,8,8,0.25)]"
        }`
      : `mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-2xl border border-foreground/5 bg-background/60 px-6 py-10 shadow-md md:rounded-4xl md:px-14 md:py-14 ${
          isMobile ? "" : "backdrop-blur-xl shadow-[0_24px_80px_rgba(8,8,8,0.12)]"
        }`;

  return (
    <section id={id} className="relative">
      <motion.div
        initial={initialState}
        animate={animateState}
        transition={transition}
        className={containerClass}
        data-animate
      >
        <div className="max-w-3xl space-y-3" data-animate>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        <Separator decorative className="opacity-70" />
        <div data-animate>{children}</div>
      </motion.div>
    </section>
  );
}

