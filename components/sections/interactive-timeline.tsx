"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const timelineData = [
  {
    year: "2024",
    title: "Growth Marketing Revolution",
    description: "Pioneering AI-driven growth strategies",
    color: "from-violet-600 to-purple-600"
  },
  {
    year: "2023",
    title: "Design Systems Architect",
    description: "Building scalable design ecosystems",
    color: "from-cyan-600 to-blue-600"
  },
  {
    year: "2022",
    title: "Web3 Explorer",
    description: "Crafting decentralized experiences",
    color: "from-pink-600 to-rose-600"
  },
  {
    year: "2021",
    title: "Creative Technologist",
    description: "Merging art with technology",
    color: "from-amber-600 to-orange-600"
  }
];

export function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1
          }
        }
      );

      // Animate timeline items
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item, index) => {
        gsap.from(item as Element, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          scrollTrigger: {
            trigger: item as Element,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1
          }
        });
      });

      // Parallax effect on year numbers
      gsap.to(".year-number", {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div 
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-white md:text-8xl">
            Journey Through Time
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            A chronicle of creative evolution
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gray-800">
            <div 
              ref={lineRef}
              className="absolute inset-0 origin-top bg-gradient-to-b from-violet-500 via-cyan-500 to-pink-500"
            />
          </div>

          {/* Timeline items */}
          <div className="relative space-y-32">
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                className={`timeline-item relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {/* Year */}
                <div className={`absolute left-1/2 -translate-x-1/2 ${
                  index % 2 === 0 ? "-translate-y-full" : "translate-y-full"
                }`}>
                  <span className="year-number block text-[10rem] font-bold leading-none text-gray-800/50">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <motion.div
                  className={`relative w-full max-w-md ${
                    index % 2 === 0 ? "pr-24 text-right" : "pl-24"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.color} p-8 shadow-2xl`}>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-white/80">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 -z-10 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Connection dot */}
                  <div className={`absolute top-1/2 ${
                    index % 2 === 0 ? "right-0 translate-x-12" : "left-0 -translate-x-12"
                  } -translate-y-1/2`}>
                    <div className="h-6 w-6 rounded-full border-4 border-white bg-gradient-to-br from-violet-500 to-pink-500 shadow-lg" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
