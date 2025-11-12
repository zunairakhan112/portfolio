"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

import type { PortfolioContent } from "@/lib/content-schema";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CinematicHeroProps {
  hero: PortfolioContent["hero"];
  tagline: string;
  signature: string;
}

const stripeConfigs = [
  {
    rotation: 18,
    left: -42,
    top: -18,
    width: 55,
    gradient: "from-[#ff8c42]/70 via-[#facc15]/15 to-transparent"
  },
  {
    rotation: -8,
    left: 30,
    top: -12,
    width: 45,
    gradient: "from-[#8bc34a]/45 via-transparent to-[#ff8c42]/20"
  },
  {
    rotation: 10,
    left: -18,
    top: 42,
    width: 50,
    gradient: "from-[#facc15]/50 via-[#ff8c42]/20 to-transparent"
  },
  {
    rotation: -14,
    left: 45,
    top: 55,
    width: 42,
    gradient: "from-[#8bc34a]/45 via-transparent to-transparent"
  }
];

export function CinematicHero({ hero, tagline, signature }: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const stripes = gsap.utils.toArray<HTMLElement>("[data-stripe]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
      const pulses = gsap.utils.toArray<HTMLElement>("[data-pulse]");
      const tracks = gsap.utils.toArray<HTMLElement>("[data-timeline-track]");
      const playhead = container.querySelector<HTMLElement>("[data-timeline-head]");

      if (!stripes.length) return;

      gsap.set(stripes, { xPercent: -130, opacity: 0, skewX: -12 });
      gsap.set(nodes, { y: 36, opacity: 0, scale: 0.9 });
      gsap.set(pulses, { scaleY: 0, opacity: 0, transformOrigin: "center bottom" });
      gsap.set(tracks, { scaleX: 0, transformOrigin: "left center" });

      if (playhead) {
        gsap.set(playhead, { xPercent: -20, opacity: 0 });
      }

      const master = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.2,
        defaults: { ease: "power2.inOut" }
      });

      master
        .to(stripes, {
          xPercent: 0,
          opacity: 0.9,
          skewX: 0,
          duration: 1.8,
          stagger: 0.22
        })
        .to(
          nodes,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: { each: 0.11, from: "edges" }
          },
          "-=1.2"
        )
        .to(
          pulses,
          {
            opacity: 0.95,
            scaleY: 1,
            duration: 1.05,
            ease: "power3.out",
            stagger: 0.08
          },
          "<"
        )
        .to(
          tracks,
          {
            scaleX: 1,
            duration: 3.4,
            ease: "power3.inOut",
            stagger: 0.12
          },
          "-=0.9"
        );

      if (playhead) {
        master.to(
          playhead,
          {
            opacity: 1,
            xPercent: 110,
            duration: 3.4,
            ease: "power3.inOut"
          },
          "<"
        );
      }

      master
        .to(
          stripes,
          {
            xPercent: 130,
            opacity: 0,
            duration: 2.2,
            ease: "power2.in",
            stagger: 0.18
          },
          "+=1.4"
        )
        .to(
          nodes,
          {
            y: -32,
            opacity: 0,
            duration: 1.2,
            ease: "power1.in",
            stagger: 0.09
          },
          "<"
        )
        .to(
          pulses,
          {
            scaleY: 0,
            opacity: 0,
            duration: 1,
            ease: "power1.in",
            stagger: 0.07
          },
          "<"
        );

      if (playhead) {
        master.to(
          playhead,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power1.in"
          },
          "<"
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const pulses = useMemo(() => {
    const count = Math.max(hero.floatingWords.length * 2, 6);
    return Array.from({ length: count }, (_, index) => ((index + 1) / (count + 1)) * 100);
  }, [hero.floatingWords.length]);

  return (
    <section
      ref={containerRef}
      className="relative mx-auto mt-12 flex w-full max-w-[1200px] flex-col gap-16 overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/[0.07] px-6 py-16 shadow-[0_60px_180px_rgba(8,8,8,0.5)] backdrop-blur-[42px] md:mt-20 md:rounded-[3.5rem] md:px-14 md:py-24 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,140,66,0.2),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(139,195,74,0.18),_transparent_60%)] opacity-90" />
        {stripeConfigs.map((stripe, index) => (
          <div
            key={`hero-stripe-${index}`}
            data-stripe
            className={`absolute h-[140%] bg-gradient-to-br blur-[140px]`}
            style={{
              left: `${stripe.left}%`,
              top: `${stripe.top}%`,
              width: `${stripe.width}%`,
              transform: `rotate(${stripe.rotation}deg)`
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stripe.gradient}`} />
          </div>
        ))}
      </div>

      <div className="relative flex flex-col gap-12">
        <div className="flex flex-wrap items-center gap-4">
          <Badge className="w-fit bg-gradient-to-r from-[#ff8c42] via-[#facc15] to-[#8bc34a] px-6 py-2 font-creative text-[0.65rem] uppercase tracking-[0.5em] text-[#1b0e05] shadow-[0_0_45px_rgba(255,140,66,0.5)]">
            {hero.badge ?? "Immersive launchpads on loop"}
          </Badge>
          <span className="font-creative text-[0.7rem] uppercase tracking-[0.4em] text-white/70">
            {tagline}
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="max-w-3xl font-display text-[clamp(3.6rem,6vw,6.2rem)] leading-[0.9] text-white drop-shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            {hero.headline}
          </h1>
          <p className="max-w-2xl font-creative text-lg leading-relaxed text-white/80 md:text-xl">
            {hero.subheading}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            asChild
            size="lg"
            className="font-creative text-base uppercase tracking-[0.3em] shadow-[0_20px_60px_rgba(255,140,66,0.55)]"
          >
            <Link href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="font-creative text-base uppercase tracking-[0.3em] text-white/70 hover:text-white"
          >
            <Link href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Link>
          </Button>
          <span className="font-creative text-[0.68rem] uppercase tracking-[0.35em] text-white/55">
            {signature}
          </span>
        </div>
      </div>

      <div className="relative rounded-[2.8rem] border border-white/12 bg-white/[0.08] px-8 py-10 shadow-[0_38px_120px_rgba(5,5,5,0.55)] backdrop-blur-3xl md:px-12">
        <div className="absolute inset-0 overflow-hidden rounded-[2.8rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,242,200,0.25),_transparent_65%)]" />
        </div>

        <div className="relative flex flex-col gap-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="font-creative text-[0.7rem] uppercase tracking-[0.45em] text-white/70">
              Immersive timeline
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/45">
              Looping narrative systems
            </span>
          </div>

          <div className="relative mt-4">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
            <div
              data-timeline-track
              className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#ff8c42] via-[#facc15] to-[#8bc34a]"
            />
            <div
              data-timeline-head
              className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/30 shadow-[0_0_40px_rgba(255,200,150,0.55)] backdrop-blur"
            >
              <span className="h-3 w-3 rounded-full bg-[#1b0e05]" />
            </div>

            {pulses.map((position, index) => (
              <div
                key={`pulse-${position}-${index}`}
                data-pulse
                className="absolute bottom-[-28px] h-20 w-[3px] origin-bottom rounded-full bg-gradient-to-t from-white/70 via-white/10 to-transparent opacity-0"
                style={{ left: `${position}%` }}
              />
            ))}

            <div className="relative flex flex-wrap items-center justify-between gap-4 pt-16">
              {hero.floatingWords.map((word) => (
                <span
                  key={word}
                  data-node
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-creative text-[0.68rem] uppercase tracking-[0.35em] text-white/80 shadow-[0_0_28px_rgba(255,255,255,0.3)] backdrop-blur"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


