"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CRACKS = [
  { top: "6%", left: "12%", width: 420, rotation: -18 },
  { top: "18%", left: "58%", width: 360, rotation: 16 },
  { top: "30%", left: "20%", width: 520, rotation: -6 },
  { top: "44%", left: "64%", width: 480, rotation: 22 },
  { top: "58%", left: "10%", width: 340, rotation: 14 },
  { top: "72%", left: "42%", width: 560, rotation: -12 },
  { top: "82%", left: "70%", width: 320, rotation: 8 },
  { top: "12%", left: "72%", width: 280, rotation: -28 },
  { top: "36%", left: "4%", width: 300, rotation: 24 },
  { top: "66%", left: "78%", width: 260, rotation: -18 }
];

export function GoldenCracksBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cracksRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cracksRef.current.forEach((el, index) => {
        if (!el) return;
        const delayOffset = index * 0.35;
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 + index * 0.2 });
        tl.set(el, { transformOrigin: "left center", scaleX: 0, opacity: 0 });
        tl.to(el, {
          scaleX: 1,
          opacity: 0.85,
          duration: 2.6,
          ease: "power2.out"
        }, delayOffset * 0.1);
        tl.to(el, {
          opacity: 0.35,
          duration: 1.4,
          ease: "sine.inOut"
        }, "-=1.2");
        tl.to(el, {
          scaleX: 0,
          opacity: 0,
          duration: 2.2,
          ease: "power1.in"
        }, "+=1.6");
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden mix-blend-screen"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,224,167,0.08),_transparent_65%)]" />
      {CRACKS.map((crack, index) => (
        <span
          key={`${crack.left}-${crack.top}`}
          ref={(el) => {
            cracksRef.current[index] = el;
          }}
          className="absolute h-px origin-left bg-gradient-to-r from-[#f9d78a] via-[#f7c066] to-transparent shadow-[0_0_12px_rgba(249,215,138,0.45)]"
          style={{
            top: crack.top,
            left: crack.left,
            width: crack.width,
            transform: `rotate(${crack.rotation}deg)`
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0" />
        </span>
      ))}
    </div>
  );
}
