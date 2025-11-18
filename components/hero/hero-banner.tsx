"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import type { PortfolioContent } from "@/lib/content-schema";
import type { GlobeConfig } from "@/types/globe";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface HeroBannerProps {
  hero: PortfolioContent["hero"];
  tagline: string;
  signature: string;
}

const World = dynamic(
  () => import("../ui/globe").then((module) => module.World),
  { ssr: false },
);

type HeroArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
};

const HERO_GLOBE_ARC_BLUEPRINTS: HeroArc[] = [
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1 },
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2 },
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5 },
  { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2 },
  { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3 },
  { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3 },
  { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3 },
  { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3 },
  { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3 },
  { order: 4, startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.5 },
  { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7 },
  { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.1 },
  { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3 },
  { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2 },
  { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.2 },
  { order: 6, startLat: -15.432563, startLng: 28.315853, endLat: 1.094136, endLng: -63.34546, arcAlt: 0.7 },
  { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1 },
  { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3 },
  { order: 7, startLat: -19.885592, startLng: -43.951191, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.1 },
  { order: 7, startLat: 48.8566, startLng: -2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1 },
  { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2 },
  { order: 8, startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529, arcAlt: 0.2 },
  { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2 },
  { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5 },
  { order: 9, startLat: 51.5072, startLng: -0.1276, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2 },
  { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7 },
  { order: 9, startLat: 1.3521, startLng: 103.8198, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5 },
  { order: 10, startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209, arcAlt: 0.7 },
  { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3 },
  { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.3 },
  { order: 11, startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2 },
  { order: 11, startLat: -6.2088, startLng: 106.8456, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.2 },
  { order: 11, startLat: 22.3193, startLng: 114.1694, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2 },
  { order: 12, startLat: 34.0522, startLng: -118.2437, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.1 },
  { order: 12, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2 },
  { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.3 },
  { order: 13, startLat: 52.52, startLng: 13.405, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3 },
  { order: 13, startLat: 11.986597, startLng: 8.571831, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3 },
  { order: 13, startLat: -22.9068, startLng: -43.1729, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.1 },
  { order: 14, startLat: -33.936138, startLng: 18.436529, endLat: 21.395643, endLng: 39.883798, arcAlt: 0.3 },
];

export function HeroBanner({ hero, tagline, signature }: HeroBannerProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const highlightWords = useMemo(
    () => ["Growth Architect", "Lifecycle Strategist", "Conversion Designer", "Founder Storyteller"],
    []
  );
  const longestHighlight = useMemo(
    () =>
      highlightWords.reduce(
        (longest, word) => (word.length > longest.length ? word : longest),
        highlightWords[0] ?? "",
      ),
    [highlightWords],
  );
  const highlightMinWidth = useMemo(
    () =>
      longestHighlight
        ? `${Math.ceil(longestHighlight.length + 2)}ch`
        : undefined,
    [longestHighlight],
  );
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = highlightWords[wordIndex] ?? highlightWords[0];
    let timeoutId: number;

    if (!isDeleting && displayText.length < currentWord.length) {
      timeoutId = window.setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      }, 110);
    } else if (!isDeleting && displayText.length === currentWord.length) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText.length > 0) {
      timeoutId = window.setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
      }, 65);
    } else if (isDeleting && displayText.length === 0) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((previous) => (previous + 1) % highlightWords.length);
      }, 320);
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayText, highlightWords, isDeleting, wordIndex]);

  const headlineIntro = "Experiences & growth engineered by a";
  const headlineOutro = "who fuses marketing, design, and entrepreneurship.";
  const dynamicHighlight = displayText || "\u00A0";

  const globeConfig = useMemo<GlobeConfig>(
    () => ({
      pointSize: 4,
      globeColor: "#0e0e0e",
      showAtmosphere: true,
      atmosphereColor: "#FFFFFF",
      atmosphereAltitude: 0.1,
      emissive: "#0e0e0e",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      polygonColor: "rgba(255,255,255,0.7)",
      ambientLight: "#808000",
      directionalLeftLight: "#ffffff",
      directionalTopLight: "#ffffff",
      pointLight: "#ffffff",
      arcTime: 1000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      initialPosition: {
        lat: 22.3193,
        lng: 114.1694,
      },
      autoRotate: true,
      autoRotateSpeed: 0.5,
    }),
    [],
  );

  const globeArcs = useMemo(
    () => {
      const colors = ["#C0C0C0", "#D3D3D3", "#E5E4E2"];
      return HERO_GLOBE_ARC_BLUEPRINTS.map((arc, index) => ({
        ...arc,
        color: colors[index % colors.length],
      }));
    },
    [],
  );

  const buttonSize = isMobile ? "default" : "lg";

  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/10 px-5 py-10 text-left shadow-[0_36px_140px_rgba(6,6,6,0.45)] backdrop-blur-[24px] sm:rounded-[3rem] sm:px-7 sm:py-14 md:rounded-[3.4rem] md:px-12 md:py-16 lg:rounded-[3.8rem] lg:px-16">
        <div className="relative z-10 flex flex-col gap-7 sm:gap-9">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            <span className="hidden font-creative text-[0.6rem] uppercase tracking-[0.32em] text-white/60 md:inline">
              {tagline}
            </span>
          </div>

          <div className="flex flex-col gap-[1.15rem] sm:gap-6">
            <h1 className="font-display text-[clamp(1.6rem,5.5vw,4.6rem)] leading-[0.95] text-white drop-shadow-[0_16px_48px_rgba(0,0,0,0.55)] sm:text-[clamp(2.6rem,5.4vw,5.2rem)]">
              <span className="text-white/25">{headlineIntro}</span>{" "}
              <span
                className="relative mx-1 inline-flex flex-wrap items-center gap-1 sm:mx-2 sm:inline-flex sm:flex-nowrap sm:gap-0"
                style={{
                  minWidth: isMobile ? undefined : highlightMinWidth,
                  maxWidth: "100%"
                }}
              >
                <span className="relative bg-gradient-to-r from-[#ff8c42] via-[#facc15] to-[#8bc34a] bg-clip-text text-transparent">
                  {dynamicHighlight}
                </span>
                <span className="hidden h-7 w-[2px] animate-pulse rounded-full bg-white/85 sm:inline-block sm:h-8" />
              </span>
              <span> {headlineOutro}</span>
            </h1>
            <p className="max-w-2xl font-creative text-[0.85rem] leading-relaxed text-white/75 sm:text-lg md:text-xl">
              {hero.subheading}
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-2.5 sm:gap-4">
            <Button
              type="button"
              size={buttonSize}
              className="font-creative text-xs uppercase tracking-[0.22em] shadow-[0_14px_48px_rgba(255,140,66,0.45)] sm:text-sm sm:tracking-[0.26em] md:text-base md:tracking-[0.3em]"
              onClick={(event) => {
                event.preventDefault();
                const href = hero.ctaPrimary.href;

                if (typeof window === "undefined") {
                  return;
                }

                if (href.startsWith("#")) {
                  const id = href.slice(1);
                  const target = document.getElementById(id);
                  if (target) {
                    const top =
                      target.getBoundingClientRect().top + window.scrollY - 96;
                    window.scrollTo({ top, behavior: "smooth" });
                    return;
                  }
                }

                window.location.href = href;
              }}
            >
              {hero.ctaPrimary.label}
            </Button>
            <Button
              asChild
              variant="ghost"
              size={buttonSize}
              className="font-creative text-xs uppercase tracking-[0.22em] text-white/70 hover:text-white sm:text-sm sm:tracking-[0.26em] md:text-base md:tracking-[0.3em]"
            >
              <Link href={hero.ctaSecondary.href}>
                {hero.ctaSecondary.label}
              </Link>
            </Button>
            <span className="font-creative text-[0.55rem] uppercase tracking-[0.28em] text-white/55 sm:text-[0.65rem] sm:tracking-[0.34em]">
              {tagline} — {signature}
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[-10%] right-[-32%] h-[16rem] w-[16rem] opacity-75 sm:bottom-[-24%] sm:right-[-18%] sm:h-[26rem] sm:w-[26rem] md:bottom-[-32%] md:right-[-12%] md:h-[36rem] md:w-[36rem] lg:bottom-[-36%] lg:right-[-8%] lg:h-[44rem] lg:w-[44rem] xl:right-[-6%] xl:h-[50rem] xl:w-[50rem]">
          <div className="relative h-full w-full">
            <World data={globeArcs} globeConfig={globeConfig} />
          </div>
        </div>
      </div>
    </section>
  );
}