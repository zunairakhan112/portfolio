"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroKineticShapesProps {
  words?: string[];
}

export function HeroKineticShapes({ words = [] }: HeroKineticShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const globe = globeRef.current;
    const orbit = orbitRef.current;
    if (!stage || !globe) return;

    const ctx = gsap.context(() => {
      gsap.set(stage, { transformStyle: "preserve-3d", transformPerspective: 1600 });
      gsap.set(globe, { transformStyle: "preserve-3d" });

      gsap.to(globe, {
        rotationY: "+=360",
        duration: 22,
        ease: "linear",
        repeat: -1
      });

      gsap.to(globe, {
        y: "-8%",
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      if (orbit) {
        gsap.to(orbit, {
          rotationZ: 360,
          duration: 10,
          repeat: -1,
          ease: "linear"
        });
      }
    }, stage);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const relY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

      gsap.to(stage, {
        rotationY: relX * -18,
        rotationX: relY * 12,
        duration: 1.2,
        ease: "expo.out"
      });
    };

    container.addEventListener("pointermove", handlePointerMove);

    return () => container.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full flex-col justify-between gap-8 overflow-hidden rounded-[3rem] border border-white/12 bg-black/35 p-6 shadow-[0_42px_130px_rgba(6,6,6,0.5)] backdrop-blur-[40px]"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,140,66,0.2),transparent_65%),radial-gradient(circle_at_bottom,_rgba(34,211,238,0.22),transparent_60%)] opacity-65" />
      <div
        ref={stageRef}
        className="relative flex aspect-[4/3] w-full items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={globeRef}
          className="relative h-52 w-52"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative h-full w-full">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-[#fff3d6] to-[#ffd296] shadow-[0_0_60px_rgba(255,240,200,0.55)]" />
            <span className="absolute inset-[-12%] rounded-full bg-gradient-to-br from-[#ff8c42]/25 via-transparent to-[#22d3ee]/25 blur-[60px]" />

            {[...Array(7)].map((_, index) => (
              <span
                key={`latitude-${index}`}
                className="absolute inset-0 rounded-full border border-white/25"
                style={{
                  transform: `rotateX(${index * 14 - 42}deg)`,
                  opacity: 0.28 + index * 0.04
                }}
              />
            ))}

            {[...Array(6)].map((_, index) => (
              <span
                key={`longitude-${index}`}
                className="absolute inset-0 rounded-full border border-white/20"
                style={{
                  transform: `rotateY(${index * 18}deg)`,
                  opacity: 0.18 + index * 0.05
                }}
              />
            ))}

            <span
              className="absolute inset-0 rounded-full border border-[#facc15]/35"
              style={{ transform: "rotateZ(35deg)", opacity: 0.45 }}
            />

            <span
              ref={orbitRef}
              className="absolute inset-[-10%] flex items-center justify-end rounded-full border border-white/20"
              style={{ transform: "rotateX(65deg)" }}
            >
              <span className="mr-6 h-5 w-5 rounded-full bg-gradient-to-br from-[#ff8c42] to-[#facc15] shadow-[0_0_20px_rgba(255,140,66,0.6)]" />
            </span>
          </div>
        </div>
      </div>

      {words.length ? (
        <div className="relative z-10 flex flex-col gap-4 rounded-[2.4rem] border border-white/12 bg-black/45 p-6">
          <span className="font-creative text-[0.6rem] uppercase tracking-[0.35em] text-white/55">
            Narrative signals
          </span>
          <div className="flex flex-wrap gap-3">
            {words.map((word) => (
              <span
                key={word}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-creative text-[0.62rem] uppercase tracking-[0.32em] text-white/75 shadow-[0_0_22px_rgba(255,255,255,0.25)]"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

