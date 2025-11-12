"use client";

import { motion } from "framer-motion";

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
  const containerClass =
    variant === "panel"
      ? "mx-auto flex h-full w-full max-w-5xl flex-col gap-12 rounded-[3rem] border border-white/10 bg-background/70 px-10 py-14 shadow-[0_30px_120px_rgba(8,8,8,0.25)] backdrop-blur-2xl"
      : "mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-4xl border border-foreground/5 bg-background/60 px-8 py-14 shadow-[0_24px_80px_rgba(8,8,8,0.12)] backdrop-blur-xl md:px-14";

  return (
    <section id={id} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
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

