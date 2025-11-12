"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface ScrollDotsNavProps {
  sections: Array<{ id: string; title: string }>;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function ScrollDotsNav({ sections, activeSection, onNavigate }: ScrollDotsNavProps) {
  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 md:flex"
    >
      {sections.map((section) => {
        const isActive = section.id === activeSection;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onNavigate(section.id)}
            aria-label={`Scroll to ${section.title}`}
            className={clsx(
              "relative flex h-10 w-10 items-center justify-center rounded-full",
              "border border-white/10 bg-white/5 text-xs text-white/70 backdrop-blur transition",
              "hover:border-white/30 hover:bg-white/15",
              isActive && "border-white/50 bg-white/30 text-white"
            )}
          >
            <span className="sr-only">{section.title}</span>
            <motion.span
              layoutId="scroll-dot-highlight"
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent"
              style={{ opacity: isActive ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <span
              className={clsx(
                "relative block h-2 w-2 rounded-full transition",
                isActive ? "bg-white" : "bg-white/60"
              )}
            />
            <AnimatePresence>
              {isActive ? (
                <motion.span
                  key="tooltip"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="pointer-events-none absolute right-full mr-3 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-creative text-[0.6rem] uppercase tracking-[0.35em] text-white/80 shadow-lg"
                >
                  {section.title}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>
        );
      })}
    </nav>
  );
}

