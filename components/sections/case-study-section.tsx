"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import type { PortfolioSection } from "@/lib/content-schema";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type CaseStudySection = Extract<PortfolioSection, { type: "case-study" }>;

interface CaseStudySectionProps {
  section: CaseStudySection;
}

export function CaseStudySection({ section }: CaseStudySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const resolveLogo = (logo?: string) => {
    if (!logo) return undefined;
    const normalized = logo.startsWith("/") ? logo : `/logos/${logo}`;
    return encodeURI(normalized);
  };

  return (
    <div className="space-y-6">
      {section.items.map((item, index) => {
        const isOpen = activeIndex === index;
        const contentId = `case-study-${index}`;

        return (
        <motion.div
          key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }}
          className="group"
          data-animate
        >
            <Card className="overflow-hidden rounded-[2.6rem] border-white/15 bg-gradient-to-br from-white/12 via-white/6 to-white/10 p-0 shadow-[0_28px_96px_rgba(7,7,7,0.45)]">
              <div className="relative rounded-[2.4rem] border border-white/10 bg-black/45">
                <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] border border-white/5" />
                <button
                  type="button"
                  className="relative flex w-full items-start gap-5 px-8 pb-6 pt-8 text-left transition-colors duration-300 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`${contentId}-content`}
                  id={`${contentId}-trigger`}
                >
                  {item.logo ? (
                    <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-black/60">
                      <Image
                        src={resolveLogo(item.logo) ?? ""}
                        alt={item.logoAlt ?? item.title}
                        width={72}
                        height={72}
                        className="h-full w-full object-contain"
                        sizes="64px"
                      />
                    </span>
                  ) : null}
                  <div className="flex-1 space-y-3 pr-12">
                    <CardTitle className="font-display text-[2rem] text-white">
                      {item.title}
                    </CardTitle>
                    {item.summary ? (
                      <CardDescription className="font-creative text-base text-white/70">
                        {item.summary}
                      </CardDescription>
                    ) : null}
                  </div>
                  <motion.span
                    className="absolute right-8 top-8 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition-colors duration-300 group-hover:border-white/40 group-hover:bg-white/15"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`${contentId}-content`}
                      role="region"
                      aria-labelledby={`${contentId}-trigger`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-8 pb-8 pt-6">
              {item.outcomes?.length ? (
                          <div className="space-y-3">
                  {item.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="flex items-start gap-3 font-creative text-sm text-white/75"
                    >
                      <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-[#ff8c42] to-[#facc15] shadow-[0_0_14px_rgba(255,140,66,0.65)]" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                          </div>
              ) : null}
              {item.links?.length ? (
                          <div className="mt-6 flex flex-wrap gap-3">
                    {item.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-creative text-xs uppercase tracking-[0.35em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ))}
                  </div>
              ) : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
            </div>
          </Card>
        </motion.div>
        );
      })}
    </div>
  );
}

