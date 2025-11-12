"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

import type { PortfolioSection } from "@/lib/content-schema";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

type PdfSection = Extract<PortfolioSection, { type: "pdf" }>;

interface PdfSectionProps {
  section: PdfSection;
}

export function PdfSection({ section }: PdfSectionProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {section.items.map((item, index) => {
        const hasFile = Boolean(item.file);
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 60, rotateX: -6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.12, ease: "easeOut" }}
            data-animate
          >
            <Card className="h-full overflow-hidden rounded-[3rem] border-white/15 bg-gradient-to-br from-white/12 via-white/5 to-white/9 p-1">
              <div className="flex h-full flex-col justify-between gap-8 rounded-[2.8rem] border border-white/12 bg-black/35 p-8">
                <div className="space-y-4">
                  <CardTitle className="font-display text-[2rem] text-white">
                    {item.title}
                  </CardTitle>
                  {item.description ? (
                    <CardDescription className="font-creative text-base text-white/70">
                      {item.description}
                    </CardDescription>
                  ) : null}
                </div>
                <CardContent className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-dashed border-white/25 bg-white/5 p-6 text-sm font-creative text-white/70">
                  {hasFile ? (
                    <div className="space-y-3">
                      <p>PDF ready to preview or download.</p>
                      <Link
                        href={item.file!}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/90 transition hover:bg-white/20"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FileDown className="h-4 w-4" />
                        Open document
                      </Link>
                    </div>
                  ) : (
                    <p>
                      Drop your PDF into <code>public/assets</code> and update the <code>file</code> path in <code>data/content.json</code>. Swap this placeholder with an embedded viewer or Notion link whenever you&apos;re ready.
                    </p>
                  )}
                  <span className="text-xs uppercase tracking-[0.35em] text-white/50">
                    Future integration: analytics hooks, gated downloads, CRM automations
                  </span>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

