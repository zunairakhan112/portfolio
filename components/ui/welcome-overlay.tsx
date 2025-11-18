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
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      const rafId = window.requestAnimationFrame(() => setProgress(100));
      const instantHide = window.setTimeout(() => setIsVisible(false), 100);
      return () => {
        window.cancelAnimationFrame(rafId);
        window.clearTimeout(instantHide);
      };
    }

    const start = performance.now();
    let rafId = 0;

    const update = () => {
      const elapsed = performance.now() - start;
      const computed = Math.min(100, Math.round((elapsed / OVERLAY_DURATION) * 100));

      setProgress((prev) => (computed > prev ? computed : prev));

      if (elapsed < OVERLAY_DURATION) {
        rafId = window.requestAnimationFrame(update);
      } else {
        window.requestAnimationFrame(() => setProgress(100));
      }
    };

    rafId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) {
      return;
    }

    const completionFrame = window.requestAnimationFrame(() => setHasCompleted(true));

    const hideTimeout = window.setTimeout(() => {
      setIsVisible(false);
    }, 720);

    return () => {
      window.cancelAnimationFrame(completionFrame);
      window.clearTimeout(hideTimeout);
    };
  }, [progress]);

  const statusMessage = useMemo(() => {
    let current: (typeof STATUS_SEQUENCE)[number]["message"] = STATUS_SEQUENCE[0].message;
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
    <div
      className="welcome-overlay fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden"
      data-complete={hasCompleted ? "true" : undefined}
    >
      <div className="welcome-overlay__veil" aria-hidden="true" />
      <div className="welcome-overlay__halo" aria-hidden="true" />

      <div className="welcome-overlay__content text-center">
        <span
          className={cn(
            "welcome-overlay__title text-[clamp(2.6rem,6vw,6.8rem)] uppercase text-white",
            logoTypeface.className
          )}
        >
          Welcome
        </span>
        <span
          className={cn(
            "welcome-overlay__name mt-9 block text-[clamp(1.8rem,3.6vw,3.1rem)] text-white",
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

