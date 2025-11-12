"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import type { PortfolioContent } from "@/lib/content-schema";

import { TechStackGrid } from "@/components/sections/tech-stack-grid";

interface TechStackShowcaseProps {
  techStack: PortfolioContent["techStack"];
}

export function TechStackShowcase({ techStack }: TechStackShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const sweeps = gsap.utils.toArray<HTMLElement>("[data-sweep]");
      if (!sweeps.length) return;

      gsap.set(sweeps, { scaleX: 0, opacity: 0.4, transformOrigin: "left center" });

      gsap
        .timeline({ repeat: -1, repeatDelay: 1.2 })
        .to(sweeps, {
          scaleX: 1,
          opacity: 0.75,
          duration: 2.4,
          ease: "power2.out",
          stagger: 0.22
        })
        .to(
          sweeps,
          {
            opacity: 0,
            duration: 1.4,
            ease: "power1.in",
            stagger: 0.18
          },
          "+=1"
        );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="capabilities" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`sweep-${index}`}
            data-sweep
            className="absolute top-[-10%] h-[140%] w-[65%] bg-gradient-to-r from-[#ff8c42]/25 via-transparent to-transparent blur-[160px]"
            style={{
              left: `${-30 + index * 35}%`,
              transform: `rotate(${index % 2 === 0 ? 9 : -7}deg)`
            }}
          />
        ))}
      </div>
      <TechStackGrid techStack={techStack} />
    </section>
  );
}


