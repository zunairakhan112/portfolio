"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { PortfolioSection } from "@/lib/content-schema";
import { cn } from "@/lib/utils";

type CountriesSlideshowSection = Extract<PortfolioSection, { type: "countries-slideshow" }>;

interface CountriesSlideshowProps {
  section: CountriesSlideshowSection;
}

export function CountriesSlideshowSection({ section }: CountriesSlideshowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-country-card]");
      
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { 
            y: 60, 
            opacity: 0,
            scale: 0.92
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true
            }
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % section.countries.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [section.countries.length]);

  return (
    <div ref={containerRef} className="space-y-12">
      <div className="relative mx-auto h-[420px] max-w-5xl overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#0d1117] via-[#0a0c13] to-[#060709] shadow-[0_30px_90px_rgba(5,7,12,0.4)] backdrop-blur-3xl md:h-[520px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(135,206,235,0.08),_transparent_60%)]" />
        
        <div className="absolute inset-0">
          {section.countries.map((country, index) => (
            <div
              key={country.name}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
                index === activeIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="flex flex-col items-center gap-8 px-8 text-center">
                <div className="text-[clamp(6rem,12vw,10rem)] leading-none drop-shadow-[0_20px_60px_rgba(255,255,255,0.15)]">
                  {country.flag}
                </div>
                <div className="space-y-3">
                  <h3 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white drop-shadow-[0_16px_50px_rgba(0,0,0,0.4)]">
                    {country.name}
                  </h3>
                  {country.description ? (
                    <p className="mx-auto max-w-2xl font-creative text-lg leading-relaxed text-white/70">
                      {country.description}
                    </p>
                  ) : null}
                  {country.yearVisited ? (
                    <span className="inline-block rounded-full border border-white/15 bg-white/[0.08] px-5 py-2 text-sm uppercase tracking-[0.3em] text-white/75 backdrop-blur-xl">
                      {country.yearVisited}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {section.countries.map((country, index) => (
            <button
              key={country.name}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`View ${country.name}`}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {section.countries.map((country, index) => (
          <button
            key={country.name}
            data-country-card
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 text-center shadow-[0_20px_60px_rgba(5,8,12,0.2)] backdrop-blur-2xl transition-all duration-500 hover:scale-105 hover:border-white/20 hover:bg-white/[0.08]",
              index === activeIndex && "border-white/25 bg-white/[0.1] shadow-[0_26px_80px_rgba(135,206,235,0.25)]"
            )}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative z-10 space-y-3">
              <div className="text-5xl">{country.flag}</div>
              <div className="font-display text-xl text-white/90">{country.name}</div>
              {country.yearVisited ? (
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {country.yearVisited}
                </div>
              ) : null}
            </div>

            <div 
              className={cn(
                "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500",
                index === activeIndex ? "w-full" : "w-0 group-hover:w-full"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

