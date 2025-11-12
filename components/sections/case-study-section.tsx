"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { PortfolioSection } from "@/lib/content-schema";

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

type CaseStudySection = Extract<PortfolioSection, { type: "case-study" }>;

interface CaseStudySectionProps {
  section: CaseStudySection;
}

export function CaseStudySection({ section }: CaseStudySectionProps) {
  const resolveLogo = (logo?: string) => {
    if (!logo) return undefined;
    const normalized = logo.startsWith("/") ? logo : `/logos/${logo}`;
    return encodeURI(normalized);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {section.items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 70, rotateY: -12 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: index * 0.12, ease: "easeOut" }}
          className="group"
          data-animate
        >
          <Card className="flex h-full flex-col overflow-hidden rounded-[3rem] border-white/15 bg-gradient-to-br from-white/12 via-white/6 to-white/10 p-1 shadow-[0_36px_120px_rgba(7,7,7,0.45)]">
            <div className="relative flex h-full flex-col gap-6 rounded-[2.8rem] border border-white/10 bg-black/40 p-8">
              <div className="absolute inset-0 rounded-[2.8rem] border border-white/5" />
              <div className="relative space-y-4">
                <div className="flex items-start gap-4">
                  {item.logo ? (
                    <span className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                      <Image
                        src={resolveLogo(item.logo) ?? ""}
                        alt={item.logoAlt ?? item.title}
                        width={96}
                        height={96}
                        className="h-full w-full object-contain"
                        sizes="80px"
                      />
                    </span>
                  ) : null}
                  <div className="space-y-3">
                    <CardTitle className="font-display text-[2.1rem] text-white">
                      {item.title}
                    </CardTitle>
                    {item.summary ? (
                      <CardDescription className="font-creative text-base text-white/70">
                        {item.summary}
                      </CardDescription>
                    ) : null}
                  </div>
                </div>
              </div>
              {item.outcomes?.length ? (
                <CardContent className="space-y-3">
                  {item.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="flex items-start gap-3 font-creative text-sm text-white/75"
                    >
                      <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-[#ff8c42] to-[#facc15] shadow-[0_0_14px_rgba(255,140,66,0.65)]" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </CardContent>
              ) : null}
              {item.links?.length ? (
                <CardFooter className="pt-6">
                  <div className="flex flex-wrap gap-3">
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
                </CardFooter>
              ) : null}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

