"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";

interface SiteHeaderProps {
  signature: string;
}

// Using Bebas Neue for a more modern, artistic look
const brandTypeface = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true
});

const overlayId = "grande-navigation-overlay";

export function SiteHeader({ signature }: SiteHeaderProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navSections = useMemo(() => [
    { id: "projects", title: "Projects", href: "/projects" },
    { id: "web", title: "Web & Conversion", href: "/web" },
    { id: "design", title: "Design Systems", href: "/design" },
    { id: "ecosystem", title: "Ecosystem", href: "/ecosystem" },
    { id: "resume", title: "Resume", href: "/resume" },
    { id: "resources", title: "Resources", href: "/resources" },
    { id: "story", title: "Story", href: "/story" }
  ], []);

  const brandLetters = useMemo(() => Array.from("Zunaira Khan"), []);
  const brandInitials = useMemo(() => ["Z", "K"], []);

  const handleMenuToggle = useCallback(() => setMenuOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setMenuOpen(false), []);

  return (
    <>
    <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="fixed inset-x-0 top-0 z-50 px-6 pt-6 md:px-10 md:pt-8"
      >
        <nav className="relative flex items-center justify-between">
          <Link href="/" className="group relative">
            <AnimatePresence mode="wait">
              {!isScrolled ? (
                <motion.div
                  key="full-name"
                  className={clsx(
                    "relative flex items-baseline",
                    brandTypeface.className,
                    "text-4xl md:text-5xl lg:text-6xl tracking-tight"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {brandLetters.map((letter, index) => (
                    <motion.span
                      key={`full-${letter}-${index}`}
                      className={clsx(
                        "relative inline-block",
                        letter === " " ? "w-[0.2em]" : "",
                        "text-black dark:text-white"
                      )}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + index * 0.03,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    >
                      {letter === " " ? "" : letter}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="initials"
                  className={clsx(
                    "relative flex items-baseline gap-1",
                    brandTypeface.className,
                    "text-3xl md:text-4xl tracking-tight"
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {brandInitials.map((letter, index) => (
                    <motion.span
                      key={`initial-${letter}`}
                      className="relative inline-block text-black dark:text-white"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          <div className="flex items-center">
            <motion.button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls={overlayId}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              onClick={handleMenuToggle}
              className="group relative rounded-full border border-black/5 bg-white/70 p-2 shadow-[0_6px_20px_rgba(12,12,12,0.12)] backdrop-blur transition hover:border-black/15 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:hover:border-white/20 dark:hover:bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-6 w-6">
                <motion.span
                  className="absolute left-0 top-[5px] h-[2px] w-6 origin-center bg-black dark:bg-white"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-0 top-[11px] h-[2px] w-6 bg-black dark:bg-white"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    scaleX: isMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-0 top-[17px] h-[2px] w-6 origin-center bg-black dark:bg-white"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
      </div>
        </nav>
      </motion.header>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="menu-overlay"
            id={overlayId}
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-white/95 backdrop-blur-3xl dark:bg-black/95"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute left-1/2 top-1/2 h-[30vh] w-[30vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-400/10 to-cyan-400/10 blur-[100px]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>

            <div className="relative z-10 flex h-full flex-col px-6 py-12 md:px-10 md:py-16">
              <motion.nav
                className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-8 overflow-y-auto py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {navSections.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="group relative inline-block"
                    >
                      <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={clsx(
                        brandTypeface.className,
                        "text-3xl md:text-4xl uppercase text-black dark:text-white",
                        "transition-colors duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-400"
                      )}>
                        {item.title}
                      </span>
          </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + navSections.length * 0.1 }}
                  className="mt-8 w-full text-center"
                >
                  <Link
                    href="/contact"
                    onClick={handleClose}
                    className="group relative inline-block"
                  >
                    <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                      {String(navSections.length + 1).padStart(2, '0')}
                    </span>
                    <span className={clsx(
                      brandTypeface.className,
                      "text-3xl md:text-4xl uppercase text-black dark:text-white",
                      "transition-colors duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-400"
                    )}>
                      Let&apos;s collaborate
                    </span>
                  </Link>
                </motion.div>
              </motion.nav>

              <motion.p
                className="mt-12 text-center font-creative text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 md:mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {signature}
              </motion.p>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
