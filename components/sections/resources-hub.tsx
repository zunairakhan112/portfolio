"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { PortfolioSection } from "@/lib/content-schema";

type ResourcesSection = Extract<PortfolioSection, { type: "resources" }>;

interface ResourcesHubSectionProps {
  section: ResourcesSection;
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.8, 0.25, 1]
    }
  }
};

export function ResourcesHubSection({ section }: ResourcesHubSectionProps) {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.12 }}
    >
      {section.resources.map((resource) => (
        <motion.div key={resource.title} variants={cardVariants}>
          <Link
            href={resource.link}
            target={resource.link.startsWith("http") ? "_blank" : undefined}
            rel={resource.link.startsWith("http") ? "noreferrer" : undefined}
            className="group flex h-full flex-col gap-4 overflow-hidden rounded-[2.3rem] border border-white/12 bg-white/[0.045] p-7 shadow-[0_28px_70px_rgba(10,13,18,0.22)] backdrop-blur-[26px] transition hover:border-white/20 hover:bg-white/[0.07]"
          >
            <div className="flex items-center justify-between">
              <span className="font-creative text-[0.65rem] uppercase tracking-[0.4em] text-foreground/45">
                {resource.type}
              </span>
              {resource.icon ? (
                <span className="text-2xl">{resource.icon}</span>
              ) : (
                <span className="text-foreground/30">↗</span>
              )}
            </div>
            <h3 className="font-display text-2xl text-foreground">
              {resource.title}
            </h3>
            <p className="font-creative text-sm leading-relaxed text-foreground/70">
              {resource.description}
            </p>
            <span className="mt-auto font-creative text-[0.6rem] uppercase tracking-[0.45em] text-foreground/40 transition group-hover:text-foreground/70">
              Open
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

