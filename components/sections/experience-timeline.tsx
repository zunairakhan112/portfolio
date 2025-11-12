"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { Experience } from "@/lib/content-schema";

import { Badge } from "@/components/ui/badge";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (!experiences?.length) {
    return null;
  }

  const resolveLogo = (logo?: string) => {
    if (!logo) return undefined;
    const normalized = logo.startsWith("/") ? logo : `/logos/${logo}`;
    return encodeURI(normalized);
  };

  return (
    <div className="relative pl-6">
      <div className="absolute left-3 top-1 bottom-1 w-[2px] bg-gradient-to-b from-white/40 via-white/15 to-transparent" />
      <div className="flex flex-col gap-10">
        {experiences.map((experience, index) => (
          <motion.article
            key={experience.id}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.25, 0.8, 0.25, 1] }}
            className="relative ml-3 rounded-[2.4rem] border border-white/12 bg-white/[0.04] p-6 shadow-[0_28px_70px_rgba(10,13,18,0.22)] backdrop-blur-[22px]"
          >
            <div className="absolute -left-[25px] top-7 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-white/20 via-transparent to-white/5 text-xs font-creative uppercase tracking-[0.4em] text-white/70">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {experience.logo ? (
                    <span className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                      <Image
                        src={resolveLogo(experience.logo) ?? ""}
                        alt={experience.logoAlt ?? experience.company}
                        width={96}
                        height={96}
                        className="h-full w-full object-contain"
                        sizes="80px"
                      />
                    </span>
                  ) : null}
                  <div className="space-y-1">
                    <h3 className="font-display text-[1.75rem] leading-tight text-foreground">
                      {experience.role}
                    </h3>
                    <p className="font-creative text-sm uppercase tracking-[0.35em] text-foreground/60">
                      {experience.company}
                    </p>
                  </div>
                </div>
                <span className="font-creative text-xs uppercase tracking-[0.4em] text-foreground/55">
                  {experience.duration}
                </span>
              </div>
              <p className="font-creative text-sm leading-relaxed text-foreground/75">
                {experience.description}
              </p>
              {experience.highlights?.length ? (
                <ul className="space-y-2 text-sm text-foreground/70">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 font-creative leading-relaxed">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {experience.technologies?.length ? (
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="subtle"
                      className="rounded-full border-white/20 bg-white/10 px-3 py-1 font-creative text-[0.6rem] uppercase tracking-[0.35em] text-white/85"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}


