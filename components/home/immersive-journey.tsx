"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type JourneyScene = {
  id: string;
  label: string;
  headline: string;
  description: string;
  ritual: string;
  highlight: string;
};

const scenes: JourneyScene[] = [
  {
    id: "signal",
    label: "01 — Signal Bloom",
    headline: "Architecting the first sensory spark",
    description:
      "We choreograph micro-moments that warm up the space: scent cues, rhythm loops, and light pulses that guide the audience to the narrative core.",
    ritual: "Hover to modulate the signal",
    highlight: "Signal tuned · 78% resonance"
  },
  {
    id: "sprint",
    label: "02 — Sprint Nebula",
    headline: "Rapid prototyping inside a cinematic tunnel",
    description:
      "Every iteration drops onto the track in view, letting stakeholders scrub the experience like a film reel while we test growth loops in real time.",
    ritual: "Scrub the timeline for variations",
    highlight: "5 loops locked · 3 experiments live"
  },
  {
    id: "reveal",
    label: "03 — Reveal Cascade",
    headline: "A crescendo of interactive launch rituals",
    description:
      "The journey culminates with cascading reveals, layered projections, and responsive touch nodes that sync with live data for launch night.",
    ritual: "Tap projection nodes to trigger layers",
    highlight: "Storyworld at 92% immersion"
  }
];

export function ImmersiveJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState<JourneyScene>(scenes[0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const easedProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.6 });
  const reelRotation = useTransform(easedProgress, [0, 1], [-12, 8]);
  const reelScale = useTransform(easedProgress, [0, 1], [0.92, 1.08]);
  const glowOpacity = useTransform(easedProgress, [0, 1], [0.3, 0.85]);
  const glowOffset = useTransform(easedProgress, [0, 1], ["-35%", "35%"]);

  const [progress, setProgress] = useState(0);

  useMotionValueEvent(easedProgress, "change", (value) => {
    setProgress(Math.min(100, Math.max(0, Math.round(value * 100))));
  });

  const sceneMap = useMemo(() => new Map(scenes.map((scene) => [scene.id, scene])), []);

  return (
    <section id="journey" ref={containerRef} className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,140,66,0.4),_transparent_65%)] blur-[160px]"
          style={{ left: glowOffset, opacity: glowOpacity }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[-10%] top-[15%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,_rgba(139,195,74,0.35),_transparent_70%)] blur-[180px]"
          style={{ opacity: glowOpacity }}
        />
      </div>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-24 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] md:gap-20 md:px-10">
        <div className="relative">
          <div className="sticky top-24 flex flex-col gap-10 rounded-[2.5rem] border border-white/12 bg-white/[0.06] px-8 py-10 shadow-[0_45px_120px_rgba(8,8,8,0.45)] backdrop-blur-[32px] md:px-10">
            <motion.div
              className="relative flex aspect-square items-center justify-center rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/8 via-white/4 to-white/12 shadow-[0_35px_110px_rgba(8,8,8,0.55)]"
              style={{ rotate: reelRotation, scale: reelScale }}
            >
              <div className="absolute inset-[14%] rounded-[1.5rem] border border-dashed border-white/18" />
              <motion.div
                style={{ scaleY: easedProgress }}
                className="absolute inset-y-[14%] left-[38%] w-[6px] rounded-full bg-gradient-to-b from-[#ff8c42] via-[#facc15] to-[#8bc34a]"
              />
              <motion.div
                style={{ scaleX: easedProgress }}
                className="absolute inset-x-[18%] bottom-[20%] h-[6px] rounded-full bg-gradient-to-r from-[#ff8c42] via-[#facc15] to-[#8bc34a]"
              />
              <motion.div
                className="absolute inset-0 rounded-[2rem] border border-white/10"
                animate={{
                  boxShadow: [
                    "0 0 120px rgba(255, 140, 66, 0.16)",
                    "0 0 160px rgba(250, 204, 21, 0.24)",
                    "0 0 120px rgba(139, 195, 74, 0.18)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <span className="font-creative text-[0.65rem] uppercase tracking-[0.4em] text-white/65">
                  Scroll the reel
                </span>
                <motion.span
                  className="text-sm font-mono uppercase tracking-[0.3em] text-white/80"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    y: [-4, 0, -4]
                  }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {activeScene.highlight}
                </motion.span>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 font-creative text-[0.6rem] uppercase tracking-[0.4em] text-white/70">
                  Guided immersion
                </span>
                  <motion.span
                    className="font-mono text-xs uppercase tracking-[0.35em] text-white/50"
                    style={{ opacity: glowOpacity }}
                  >
                    Live progress · {progress}%
                  </motion.span>
              </div>
              <p className="max-w-sm font-creative text-base leading-relaxed text-white/75">
                Each chapter blossoms as you scroll — hover or tap a panel to set off the ritual and
                tune the experience in real time.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {scenes.map((scene) => {
            const isActive = activeScene.id === scene.id;
            return (
              <motion.article
                key={scene.id}
                onMouseEnter={() => setActiveScene(sceneMap.get(scene.id) ?? scene)}
                onFocus={() => setActiveScene(sceneMap.get(scene.id) ?? scene)}
                onMouseLeave={() => setActiveScene(sceneMap.get(scene.id) ?? scene)}
                whileHover={{ y: -8, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/[0.05] px-8 py-8 shadow-[0_35px_110px_rgba(8,8,8,0.4)] backdrop-blur-[28px] transition-colors duration-300 focus-within:border-white/30 md:px-10 md:py-12"
              >
                <motion.div
                  layoutId="journey-highlight"
                  className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-gradient-to-br from-[#ff8c42]/12 via-[#facc15]/5 to-transparent opacity-0 transition-opacity duration-500"
                  animate={{ opacity: isActive ? 1 : 0 }}
                />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-creative text-[0.65rem] uppercase tracking-[0.45em] text-white/65">
                      {scene.label}
                    </span>
                    <motion.span
                      className="rounded-full border border-white/15 px-4 py-1 font-mono text-[0.6rem] uppercase tracking-[0.35em] text-white/60"
                      animate={{
                        backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)"
                      }}
                    >
                      {scene.ritual}
                    </motion.span>
                  </div>
                  <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-tight text-white">
                    {scene.headline}
                  </h3>
                  <p className="max-w-2xl font-creative text-[1.05rem] leading-relaxed text-white/75">
                    {scene.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


