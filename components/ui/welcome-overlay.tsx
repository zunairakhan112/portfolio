"use client";

import { Bebas_Neue } from "next/font/google";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const logoTypeface = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap"
});

const OVERLAY_DURATION = 5000;

const STATUS_SEQUENCE = [
  { threshold: 0, message: "Initializing stage systems" },
  { threshold: 20, message: "Synchronizing projection grid" },
  { threshold: 45, message: "Calibrating spotlight rig" },
  { threshold: 70, message: "Buffering creative assets" },
  { threshold: 90, message: "Finalizing reveal sequence" },
  { threshold: 100, message: "Presentation ready" }
] as const;

export function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setProgress(100);
      const instantHide = window.setTimeout(() => setIsVisible(false), 100);
      return () => {
        window.clearTimeout(instantHide);
      };
    }

    const start = performance.now();
    let rafId = 0;
    let completionTimeout: number | undefined;

    const update = () => {
      const elapsed = performance.now() - start;
      const computed = Math.min(100, Math.round((elapsed / OVERLAY_DURATION) * 100));

      setProgress((prev) => (computed > prev ? computed : prev));

      if (elapsed < OVERLAY_DURATION) {
        rafId = window.requestAnimationFrame(update);
      } else if (completionTimeout === undefined) {
        setProgress(100);
        completionTimeout = window.setTimeout(() => {
          setIsVisible(false);
        }, 420);
      }
    };

    rafId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (completionTimeout !== undefined) {
        window.clearTimeout(completionTimeout);
      }
    };
  }, []);

  const statusMessage = useMemo(() => {
    let current = STATUS_SEQUENCE[0].message;
    for (const step of STATUS_SEQUENCE) {
      if (progress >= step.threshold) {
        current = step.message;
      } else {
        break;
      }
    }
    return current;
  }, [progress]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="welcome-overlay fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden">
      <div className="welcome-overlay__veil" aria-hidden="true" />
      <div className="welcome-overlay__halo" aria-hidden="true" />

      <div className="welcome-overlay__content text-center">
        <span className="welcome-overlay__title font-cinematic text-[clamp(3.6rem,7.2vw,7.6rem)] uppercase tracking-[0.64em] text-white">
          Welcome
        </span>
        <span
          className={cn(
            "welcome-overlay__name mt-9 block text-[clamp(2.4rem,4.4vw,3.8rem)] text-white",
            logoTypeface.className
          )}
        >
          Zunaira Khan
        </span>

        <div className="welcome-overlay__system">
          <div className="welcome-overlay__progress">
            <div
              className="welcome-overlay__progress-bar"
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            />
          </div>
          <div className="welcome-overlay__status" aria-live="polite">
            {statusMessage}
          </div>
          <div className="welcome-overlay__percent" aria-hidden="true">
            {progress.toString().padStart(3, "0")}%
          </div>
        </div>
      </div>
    </div>
  );
}

