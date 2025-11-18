"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type InteractionMode = {
  id: string;
  title: string;
  blurb: string;
  narrative: string;
  metrics: string[];
  sparks: string[];
  action: string;
};

const experiments: InteractionMode[] = [
  {
    id: "signal-lab",
    title: "Signal Lab Control Room",
    blurb: "Tune sensory cues and watch the atmosphere respond in real time.",
    narrative:
      "We orchestrate the entry moment: biomorphic lighting, whispering audio beds, and shifting typography that follows cursor trails. The visitor becomes an active conductor.",
    metrics: ["Response latency — 36ms", "Ambient sync — 92%", "Engagement lift — 4.3x"],
    sparks: ["Drag the orbital nodes", "Tilt device to morph layout"],
    action: "Launch signal playground"
  },
  {
    id: "growth-spaces",
    title: "Growth Spaces Sandbox",
    blurb: "Blend marketing loops with motion design to craft kinetic funnels.",
    narrative:
      "A modular sandbox where each block is linked to a growth KPI. Pull a lever, the motion system adapts. Nudge a channel, narrative arcs reorganize themselves.",
    metrics: ["Conversion delta — +38%", "Channel elasticity — 2.1", "Creative reuse — 78%"],
    sparks: ["Switch persona track", "Amplify motion reactance"],
    action: "Open growth sandbox"
  },
  {
    id: "launch-theatre",
    title: "Launch Theatre Simulator",
    blurb: "Preview live launch choreography with timeline scrubbing and projection cues.",
    narrative:
      "Scrub through a cinematic launch. Each milestone reveals interactive overlays, real-time analytics, and motion-captured gestures mapped to audience reactions.",
    metrics: ["Projected retention — 86%", "Touchpoint depth — 5.6", "Share velocity — 3.4x"],
    sparks: ["Trigger hologram reveal", "Toggle investor POV"],
    action: "Enter launch theatre"
  }
];

export function InteractionLab() {
  const [activeId, setActiveId] = useState<string>(experiments[0]?.id ?? "");

  const activeExperiment = useMemo(
    () => experiments.find((experiment) => experiment.id === activeId) ?? experiments[0],
    [activeId]
  );

  return (
    <section
      id="interaction-lab"
      className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-14 overflow-hidden rounded-[3rem] border border-white/12 bg-white/[0.05] px-6 py-20 shadow-[0_50px_150px_rgba(10,10,10,0.4)] backdrop-blur-[38px] md:px-14 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute left-[-25%] top-[25%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(255,140,66,0.4),_transparent_65%)] blur-[150px]"
          animate={{
            opacity: [0.35, 0.55, 0.35],
            scale: [0.9, 1.1, 0.95]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[-20%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(139,195,74,0.38),_transparent_70%)] blur-[180px]"
          animate={{
            opacity: [0.25, 0.4, 0.25],
            scale: [1.05, 0.92, 1.08]
          }}
          transition={{ duration: 16, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-1 font-creative text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
              Interaction Playground
            </span>
            <h2 className="font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-tight text-white drop-shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              Scroll to choose a laboratory, then interact to set the story in motion.
            </h2>
          </div>
          <motion.div
            className="flex h-14 items-center rounded-full border border-white/15 bg-white/10 px-6 font-mono text-xs uppercase tracking-[0.35em] text-white/70"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {activeExperiment?.title}
          </motion.div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/15 bg-black/40 p-[3px] shadow-[0_45px_120px_rgba(8,8,8,0.55)]">
              <div className="absolute inset-0 rounded-[2.6rem] bg-[conic-gradient(from_180deg,_rgba(255,140,66,0.55),_transparent_35%)] opacity-40 blur-[80px]" />
              <div className="relative rounded-[2.4rem] border border-white/12 bg-gradient-to-br from-white/10 via-white/6 to-white/12 p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExperiment?.id}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col gap-12"
                  >
                    <div className="flex flex-col gap-4">
                      <span className="font-creative text-[0.65rem] uppercase tracking-[0.4em] text-white/65">
                        {activeExperiment?.blurb}
                      </span>
                      <h3 className="font-display text-[clamp(1.9rem,2.8vw,2.6rem)] leading-tight text-white">
                        {activeExperiment?.narrative}
                      </h3>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <span className="font-creative text-[0.6rem] uppercase tracking-[0.4em] text-white/50">
                          Ritual Metrics
                        </span>
                        <ul className="space-y-2 font-mono text-sm uppercase tracking-[0.2em] text-white/70">
                          {activeExperiment?.metrics.map((metric) => (
                            <motion.li
                              key={metric}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.45, delay: 0.08 }}
                            >
                              {metric}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <span className="font-creative text-[0.6rem] uppercase tracking-[0.4em] text-white/50">
                          Sparks to Trigger
                        </span>
                        <div className="flex flex-col gap-3">
                          {activeExperiment?.sparks.map((spark) => (
                            <motion.button
                              key={spark}
                              type="button"
                              className="group inline-flex items-center justify-between rounded-full border border-white/18 bg-white/10 px-4 py-2 text-left font-creative text-xs uppercase tracking-[0.35em] text-white/75 shadow-[0_0_22px_rgba(255,255,255,0.25)] transition-colors duration-300 hover:border-white/35 hover:bg-white/20"
                              whileHover={{ x: 6 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <span>{spark}</span>
                              <motion.span
                                className="ml-2 text-white/40"
                                animate={{ rotate: [0, 4, 0] }}
                                transition={{ duration: 2.4, repeat: Infinity }}
                              >
                                ↗
                              </motion.span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      className="self-start rounded-full border border-white/20 bg-gradient-to-r from-[#ff8c42] via-[#facc15] to-[#8bc34a] px-6 py-3 font-creative text-[0.7rem] uppercase tracking-[0.35em] text-[#1b0e05] shadow-[0_20px_60px_rgba(255,140,66,0.5)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(255,140,66,0.55)]"
                      whileTap={{ scale: 0.97 }}
                    >
                      {activeExperiment?.action}
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {experiments.map((experiment) => {
              const isActive = experiment.id === activeExperiment?.id;
              return (
                <motion.button
                  key={experiment.id}
                  type="button"
                  onMouseEnter={() => setActiveId(experiment.id)}
                  onFocus={() => setActiveId(experiment.id)}
                  onClick={() => setActiveId(experiment.id)}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] px-7 py-6 text-left shadow-[0_28px_90px_rgba(8,8,8,0.4)]"
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    layoutId="interaction-highlight"
                    className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#ff8c42]/12 via-[#facc15]/6 to-transparent opacity-0 transition-opacity duration-500"
                    animate={{ opacity: isActive ? 1 : 0 }}
                  />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-white/45">
                        {experiment.id.replace("-", " ")}
                      </span>
                      <motion.span
                        className="rounded-full border border-white/18 px-4 py-1 font-creative text-[0.6rem] uppercase tracking-[0.35em] text-white/65"
                        animate={{
                          backgroundColor: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"
                        }}
                      >
                        {experiment.sparks.length} interactions
                      </motion.span>
                    </div>
                    <h3 className="font-display text-2xl text-white">{experiment.title}</h3>
                    <p className="font-creative text-sm leading-relaxed text-white/70">
                      {experiment.blurb}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


