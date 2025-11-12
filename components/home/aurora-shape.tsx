"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AuroraShapeProps {
  words?: string[];
}

export function AuroraShape({ words = [] }: AuroraShapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const shape = shapeRef.current;
    if (!container || !shape) return;

    const ctx = gsap.context(() => {
      const morphValues = [
        "58% 42% 46% 54% / 48% 44% 56% 52%",
        "45% 55% 42% 58% / 60% 42% 58% 40%",
        "52% 48% 60% 40% / 42% 60% 40% 58%"
      ];

      const morphTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { duration: 6, ease: "sine.inOut" }
      });

      morphValues.forEach((value, index) => {
        morphTimeline.to(shape, { borderRadius: value }, index === 0 ? 0 : ">");
      });

      layersRef.current.forEach((layer, index) => {
        gsap.to(layer, {
          duration: 12 + index * 4,
          rotate: index % 2 === 0 ? 360 : -360,
          scale: index % 2 === 0 ? 1.08 : 0.94,
          repeat: -1,
          ease: "sine.inOut",
          yoyo: true
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const shape = shapeRef.current;
    if (!container || !shape) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const relY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

      gsap.to(shape, {
        x: relX * 40,
        y: relY * 40,
        rotation: relX * 8,
        duration: 1.2,
        ease: "expo.out"
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: relX * 60,
          y: relY * 60,
          duration: 1.4,
          ease: "expo.out"
        });
      }
    };

    container.addEventListener("pointermove", handlePointerMove);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full flex-col justify-between gap-8 overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_38px_120px_rgba(6,6,6,0.45)] backdrop-blur-[38px]"
    >
      <div className="relative flex aspect-[4/3] w-full items-center justify-center">
        <div
          ref={shapeRef}
          className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[58%_42%_46%_54%/48%_44%_56%_52%] bg-[radial-gradient(circle_at_30%_20%,rgba(255,140,66,0.55),transparent),radial-gradient(circle_at_70%_30%,rgba(139,195,74,0.45),transparent),radial-gradient(circle_at_50%_80%,rgba(34,211,238,0.35),transparent)]"
        >
          {[0, 1, 2].map((layer, index) => (
            <div
              key={layer}
              ref={(element) => {
                if (element) {
                  layersRef.current[index] = element;
                }
              }}
              className="pointer-events-none absolute inset-[-25%] rounded-full opacity-60"
              style={{
                background:
                  index === 0
                    ? "radial-gradient(circle at top, rgba(255,255,255,0.45), transparent 65%)"
                    : index === 1
                      ? "radial-gradient(circle at bottom, rgba(139,195,74,0.25), transparent 60%)"
                      : "radial-gradient(circle at center, rgba(34,211,238,0.3), transparent 70%)",
                filter: "blur(50px)"
              }}
            />
          ))}
          <div
            ref={glowRef}
            className="aurora-shape__glow pointer-events-none absolute h-36 w-36 rounded-full bg-white/80 blur-[90px]"
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-white via-[#fff1d6] to-[#ffd296] shadow-[0_0_45px_rgba(255,220,180,0.55)]" />
        </div>
      </div>

      {words.length ? (
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/35 p-5">
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

