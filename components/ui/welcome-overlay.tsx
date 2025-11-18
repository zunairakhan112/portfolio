"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Shorter duration on mobile for better UX
const OVERLAY_DURATION_DESKTOP = 3000;
const OVERLAY_DURATION_MOBILE = 1500;

export function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if mobile
    const isMobileDevice = window.innerWidth <= 768;
    setIsMobile(isMobileDevice);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || isMobileDevice) {
      // Skip or speed up on mobile/reduced motion
      setProgress(100);
      setTimeout(() => setIsVisible(false), isMobileDevice ? 800 : 100);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state - everything hidden
      gsap.set([titleRef.current, nameRef.current, loaderRef.current], { 
        opacity: 0 
      });
      gsap.set(barsRef.current?.children || [], { scaleX: 0 });

      // Animate geometric bars
      tl.to(barsRef.current?.children || [], {
        scaleX: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power4.out"
      })
      // Title entrance
      .to(titleRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
      // Split and animate title characters
      .fromTo(titleRef.current?.children || [], 
        { 
          opacity: 0,
          y: 30,
          rotateX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "back.out(1.7)"
        }, "-=0.2")
      // Name entrance
      .to(nameRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")
      .fromTo(nameRef.current?.children || [],
        {
          opacity: 0,
          x: -20
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: "power3.out"
        }, "-=0.3")
      // Loader entrance
      .to(loaderRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.1");

    }, containerRef);

    // Progress animation with dynamic duration
    const DURATION = isMobileDevice ? OVERLAY_DURATION_MOBILE : OVERLAY_DURATION_DESKTOP;
    const start = performance.now();
    let rafId = 0;

    const update = () => {
      const elapsed = performance.now() - start;
      const computed = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress((prev) => (computed > prev ? computed : prev));

      if (elapsed < DURATION) {
        rafId = window.requestAnimationFrame(update);
      } else {
        setProgress(100);
      }
    };

    rafId = window.requestAnimationFrame(update);

    return () => {
      ctx.revert();
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsVisible(false)
      });

      // Exit animation
      tl.to(loaderRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in"
      })
      .to(nameRef.current?.children || [], {
        opacity: 0,
        x: 20,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.in"
      }, "-=0.2")
      .to(titleRef.current?.children || [], {
        opacity: 0,
        y: -30,
        rotateX: 90,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.in"
      }, "-=0.2")
      .to(barsRef.current?.children || [], {
        scaleX: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.in"
      }, "-=0.3")
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, "-=0.1");

    }, containerRef);

    return () => ctx.revert();
  }, [progress]);

  useEffect(() => {
    // Split text into characters
    if (!titleRef.current || !nameRef.current) return;

    const splitText = (element: HTMLElement, text: string) => {
      element.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "inline-block";
        element.appendChild(span);
      });
    };

    splitText(titleRef.current, "WELCOME");
    splitText(nameRef.current, "ZUNAIRA KHAN");
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Geometric bars background */}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Title */}
        <div
          ref={titleRef}
          className="font-display text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tighter text-white"
        />

        {/* Divider */}
        <div className="h-[2px] w-16 bg-white" />

        {/* Name */}
        <div
          ref={nameRef}
          className="font-display text-[clamp(1.2rem,4vw,2rem)] font-semibold tracking-tight text-white/80"
        />

        {/* Loader */}
        <div
          ref={loaderRef}
          className="mt-8 flex flex-col items-center gap-3"
        >
          {/* Progress bar */}
          <div className="relative h-1 w-64 max-w-[80vw] overflow-hidden bg-white/20">
            <div
              className="absolute left-0 top-0 h-full bg-white transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <div
            ref={percentRef}
            className="font-mono text-sm font-medium tracking-wider text-white/70"
          >
            {progress.toString().padStart(2, "0")}%
          </div>
        </div>
      </div>
    </div>
  );
}

