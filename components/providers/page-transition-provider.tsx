"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Skip on initial mount
    if (prevPathname.current === pathname) {
      prevPathname.current = pathname;
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      prevPathname.current = pathname;
      return;
    }

    // Route has changed, show exit animation
    setIsTransitioning(true);

    const ctx = gsap.context(() => {
      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          // Small delay before hiding the overlay
          setTimeout(() => {
            setIsTransitioning(false);
          }, 100);
        }
      });

      timelineRef.current = tl;

      // Set initial state
      gsap.set(barsRef.current?.children || [], { scaleX: 0 });
      gsap.set(containerRef.current, { pointerEvents: "none" });

      // Animate bars entering (covering the screen)
      tl.to(barsRef.current?.children || [], {
        scaleX: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power4.out"
      })
      // Brief pause at full coverage
      .to({}, { duration: 0.15 })
      // Animate bars exiting (revealing new content)
      .to(barsRef.current?.children || [], {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.in"
      });

    }, containerRef);

    prevPathname.current = pathname;

    return () => {
      ctx.revert();
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [pathname]);

  return (
    <>
      {children}
      
      {/* Transition overlay */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9997] pointer-events-none overflow-hidden"
        style={{ 
          opacity: isTransitioning ? 1 : 0,
          visibility: isTransitioning ? 'visible' : 'hidden',
          transition: 'opacity 0.1s, visibility 0.1s'
        }}
      >
        {/* Geometric bars */}
        <div 
          ref={barsRef}
          className="absolute inset-0 flex flex-col gap-[2px]"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-full w-full origin-left relative overflow-hidden"
              style={{ 
                willChange: 'transform',
                background: 'linear-gradient(135deg, #0a0d0b, #131613, #0f120f, #0b0e0c)',
              }}
            >
              {/* Granite texture overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 0.15) 0%, transparent 50%)
                  `,
                  filter: 'contrast(1.2)',
                }}
              />
              {/* Fine grain texture */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
                  opacity: 0.15,
                  mixBlendMode: 'overlay',
                }}
              />
              {/* Golden diagonal criss-cross lines */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(212, 175, 55, 0.3) 100px, rgba(212, 175, 55, 0.3) 101px),
                    repeating-linear-gradient(-45deg, transparent, transparent 100px, rgba(212, 175, 55, 0.3) 100px, rgba(212, 175, 55, 0.3) 101px)
                  `,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

