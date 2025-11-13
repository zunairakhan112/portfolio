"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Separator } from "@/components/ui/separator";

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
  const animateState = { opacity: 1, y: 0 };
  const initialState = reduceMotion ? animateState : { opacity: 0, y: 24 };
  const transition = reduceMotion
    ? { duration: 0.25, ease: "linear" as const }
    : { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] as const };

  const containerClass =
    variant === "panel"
      ? "mx-auto flex h-full w-full max-w-5xl flex-col gap-12 rounded-[3rem] border border-white/10 bg-background/70 px-10 py-14 shadow-[0_30px_120px_rgba(8,8,8,0.25)] backdrop-blur-2xl"
      : "mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-4xl border border-foreground/5 bg-background/60 px-8 py-14 shadow-[0_24px_80px_rgba(8,8,8,0.12)] backdrop-blur-xl md:px-14";

  return (
    <section id={id} className="relative">
      <motion.div
        initial={initialState}
        animate={animateState}
        transition={transition}
        className={containerClass}
        data-animate
      >
        <div className="max-w-3xl space-y-4" data-animate>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="text-base leading-relaxed text-muted-foreground">
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

