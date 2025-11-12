"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import type { PortfolioContent } from "@/lib/content-schema";
import type { GlobeConfig } from "@/components/ui/globe";

import { Button } from "@/components/ui/button";

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
      return HERO_GLOBE_ARC_BLUEPRINTS.map((arc) => ({
        ...arc,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    },
    [],
  );

  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center overflow-hidden rounded-[3.8rem] border border-white/12 bg-white/10 px-8 py-16 text-left shadow-[0_60px_190px_rgba(6,6,6,0.55)] backdrop-blur-[32px] md:px-14 lg:px-20">
        <div className="relative z-10 flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-4">
            <span className="hidden font-creative text-[0.7rem] uppercase tracking-[0.4em] text-white/60 md:inline">
              {tagline}
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="font-display text-[clamp(3.5rem,6.2vw,6rem)] leading-[0.9] text-white drop-shadow-[0_24px_65px_rgba(0,0,0,0.55)]">
              <span className="text-white/25">{headlineIntro}</span>{" "}
                  <span
                    className="relative mx-2 inline-flex items-center whitespace-nowrap"
                    style={{ minWidth: highlightMinWidth }}
                  >
                    <span className="relative bg-gradient-to-r from-[#ff8c42] via-[#facc15] to-[#8bc34a] bg-clip-text text-transparent">
                      {dynamicHighlight}
                    </span>
                    <span className="ml-2 h-8 w-[2px] animate-pulse rounded-full bg-white/85" />
                  </span>
              <span> {headlineOutro}</span>
            </h1>
            <p className="max-w-2xl font-creative text-lg leading-relaxed text-white/75 md:text-xl">
              {hero.subheading}
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-4">
            <Button
              type="button"
              size="lg"
              className="font-creative text-base uppercase tracking-[0.3em] shadow-[0_18px_65px_rgba(255,140,66,0.55)]"
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
              size="lg"
              className="font-creative text-base uppercase tracking-[0.3em] text-white/70 hover:text-white"
            >
              <Link href={hero.ctaSecondary.href}>
                {hero.ctaSecondary.label}
              </Link>
            </Button>
            <span className="font-creative text-[0.7rem] uppercase tracking-[0.4em] text-white/55">
              {tagline} — {signature}
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[-40%] right-[-25%] h-[28rem] w-[28rem] sm:h-[34rem] sm:w-[34rem] md:bottom-[-50%] md:right-[-20%] md:h-[40rem] md:w-[40rem] lg:bottom-[-55%] lg:right-[-18%] lg:h-[46rem] lg:w-[46rem] xl:right-[-12%] xl:h-[52rem] xl:w-[52rem]">
          <div className="relative h-full w-full">
            <World data={globeArcs} globeConfig={globeConfig} />
          </div>
        </div>
      </div>
    </section>
  );
}