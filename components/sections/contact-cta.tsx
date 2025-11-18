"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import type { PortfolioSection } from "@/lib/content-schema";

type ContactSection = Extract<PortfolioSection, { type: "contact" }>;

interface ContactCtaSectionProps {
  section: ContactSection;
}

export function ContactCtaSection({ section }: ContactCtaSectionProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[3rem] border border-white/12 bg-gradient-to-br from-[#10161a] via-[#0a1114] to-[#15222a] p-12 text-white shadow-[0_48px_140px_rgba(4,10,15,0.65)]"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(143,183,195,0.38),_transparent_70%)]" />
      <div className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-[#86b1c4]/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-52 w-52 rounded-full bg-[#c5d5d3]/20 blur-[110px]" />
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-3">
            <span className="font-creative text-[0.68rem] uppercase tracking-[0.45em] text-white/60">
              {section.availability ?? "Currently welcoming new collaborations"}
            </span>
            <h3 className="font-display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.05]">
              Let’s co-create the next aurora of growth.
            </h3>
          </div>
          <p className="font-creative text-sm leading-relaxed text-white/75 sm:text-base">
            Looking for immersive storytelling, motion-led product reveals, or a growth lab partner?
            Drop me a line and let’s design the launch together.
          </p>
          <Button
            asChild
            size="lg"
            className="whitespace-pre-wrap px-6 py-3 text-center font-creative text-xs uppercase tracking-[0.3em] text-[#0b1014] sm:text-sm sm:tracking-[0.35em]"
          >
            <Link href={section.cta.href}>{section.cta.label}</Link>
          </Button>
        </div>
        {section.channels.length ? (
          <div className="grid gap-4 rounded-[2rem] border border-white/15 bg-white/5 p-6 backdrop-blur-[20px]">
            {section.channels.map((channel) => (
              <Link
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
              >
                <span className="font-creative text-[0.62rem] uppercase tracking-[0.42em] text-white/55 group-hover:text-white/80">
                  {channel.label}
                </span>
                {channel.description ? (
                  <span className="font-creative text-xs leading-relaxed text-white/70 sm:text-sm">
                    {channel.description}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

