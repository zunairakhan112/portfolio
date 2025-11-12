"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const gardenElements = [
  { type: "star", count: 15, color: "text-yellow-400" },
  { type: "leaf", count: 10, color: "text-green-400" },
  { type: "petal", count: 12, color: "text-pink-400" },
  { type: "ribbon", count: 8, color: "text-purple-400" }
];

export function CreativeGarden() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for garden elements
      gsap.to(".garden-element", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-30, 30)",
        duration: "random(4, 6)",
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });

      // Parallax layers
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(".layer-1", { y: progress * 100 });
          gsap.to(".layer-2", { y: progress * 200 });
          gsap.to(".layer-3", { y: progress * 300 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderShape = (type: string) => {
    switch (type) {
      case "star":
        return (
          <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "leaf":
        return (
          <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        );
      case "petal":
        return (
          <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
            <circle cx="12" cy="8" r="6" />
            <circle cx="8" cy="14" r="6" />
            <circle cx="16" cy="14" r="6" />
          </svg>
        );
      case "ribbon":
        return (
          <svg viewBox="0 0 24 24" className="h-full w-full stroke-current fill-none">
            <path d="M4 12C4 12 8 4 12 4C16 4 20 12 20 12C20 12 16 20 12 20C8 20 4 12 4 12Z" strokeWidth="2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section ref={containerRef} className="relative h-[150vh] overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <motion.div 
        className="sticky top-0 h-screen"
        style={{ scale, opacity }}
      >
        {/* Background layers with mouse parallax */}
        <div className="absolute inset-0">
          <motion.div 
            className="layer-1 absolute inset-0"
            animate={{
              x: mousePosition.x * 20,
              y: mousePosition.y * 20
            }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <div className="h-full w-full bg-gradient-to-br from-violet-900/20 via-transparent to-cyan-900/20" />
          </motion.div>

          <motion.div 
            className="layer-2 absolute inset-0"
            animate={{
              x: mousePosition.x * 40,
              y: mousePosition.y * 40
            }}
            transition={{ type: "spring", stiffness: 30 }}
          >
            <div className="h-full w-full bg-gradient-to-tl from-pink-900/10 via-transparent to-amber-900/10" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <motion.h2 
              className="mb-8 text-6xl font-bold text-white md:text-8xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Creative Garden
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 md:text-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Where ideas bloom and imagination grows
            </motion.p>
          </div>
        </div>

        {/* Floating garden elements */}
        <div className="absolute inset-0 pointer-events-none">
          {gardenElements.map((element, elementIndex) => (
            [...Array(element.count)].map((_, i) => (
              <motion.div
                key={`${element.type}-${i}`}
                className={`garden-element absolute ${element.color}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 40 + 20}px`,
                  height: `${Math.random() * 40 + 20}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: Math.random() * 0.5 + 0.3, 
                  scale: 1,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  delay: elementIndex * 0.1 + i * 0.05,
                  duration: 0.8
                }}
              >
                <motion.div
                  className="layer-3 h-full w-full"
                  animate={{
                    x: mousePosition.x * (60 + i * 5),
                    y: mousePosition.y * (60 + i * 5)
                  }}
                  transition={{ type: "spring", stiffness: 20 }}
                >
                  {renderShape(element.type)}
                </motion.div>
              </motion.div>
            ))
          ))}
        </div>

        {/* Interactive orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className={`h-32 w-32 rounded-full bg-gradient-to-br ${
                i % 3 === 0 ? "from-violet-500/20 to-purple-500/20" :
                i % 3 === 1 ? "from-cyan-500/20 to-blue-500/20" :
                "from-pink-500/20 to-rose-500/20"
              } blur-2xl`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
