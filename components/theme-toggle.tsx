"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const themeKey = (activeTheme ?? "light") === "dark" ? "sun" : "moon";
  const Icon = themeKey === "sun" ? Sun : Moon;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(themeKey === "sun" ? "light" : "dark")}
      className="relative overflow-hidden border border-foreground/10 bg-background/40 shadow-[0_0_20px_rgba(12,12,12,0.12)] backdrop-blur-sm hover:border-foreground/20"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={themeKey}
          initial={{ y: 10, opacity: 0, rotate: themeKey === "sun" ? -15 : 15 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -10, opacity: 0, rotate: themeKey === "sun" ? 15 : -15 }}
          transition={{ duration: 0.25 }}
          className="grid h-full w-full place-items-center"
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

