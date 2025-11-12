"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/content-schema";

import { Badge } from "@/components/ui/badge";

interface ProjectGridProps {
  projects: Project[];
}

const gradientPalette = [
  "from-[#ff8c42]/45 via-[#facc15]/20 to-transparent",
  "from-[#34d399]/40 via-[#60a5fa]/20 to-transparent",
  "from-[#a855f7]/40 via-[#6366f1]/20 to-transparent",
  "from-[#f43f5e]/40 via-[#fb7185]/20 to-transparent"
];

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects?.length) {
    return null;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {projects.map((project, index) => {
        const gradient = gradientPalette[index % gradientPalette.length];
        return (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.25, 0.8, 0.25, 1] }}
            className="group relative overflow-hidden rounded-[2.6rem] border border-white/12 bg-white/[0.04] p-8 shadow-[0_32px_90px_rgba(12,18,32,0.22)] backdrop-blur-[26px]"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-500 group-hover:opacity-80`} />
            <div className="relative z-10 flex h-full flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="font-creative text-xs uppercase tracking-[0.55em] text-foreground/55">
                  {project.category}
                </span>
                <span className="font-creative text-[0.55rem] uppercase tracking-[0.4em] text-foreground/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-[2rem] leading-tight text-foreground">
                  {project.title}
                </h3>
                <p className="font-creative text-sm leading-relaxed text-foreground/75">
                  {project.description}
                </p>
              </div>
              {project.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="subtle"
                      className="rounded-full border-white/25 bg-white/10 px-3 py-1 font-creative text-[0.6rem] uppercase tracking-[0.35em] text-white/85"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
              {project.link ? (
                <div className="mt-auto">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-creative text-xs uppercase tracking-[0.4em] text-white transition hover:-translate-y-1 hover:bg-white/20"
                  >
                    Open project
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}


