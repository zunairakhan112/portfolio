"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.5]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const floatingPositions = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        left: `${(((index * 19) % 90) + 5).toFixed(2)}%`,
        top: `${(((index * 37) % 88) + 6).toFixed(2)}%`
      })),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation
      const title = titleRef.current;
      if (!title) return;
      
      const chars = title.textContent?.split("") || [];
      title.innerHTML = "";
      
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "inline-block";
        title.appendChild(span);
      });
      
      // Timeline animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });
      
      tl.from(title.children, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "power3.out"
      });
      
      // Floating elements animation
      gsap.to(".float-element", {
        y: "random(-50, 50)",
        x: "random(-30, 30)",
        rotation: "random(-15, 15)",
        duration: "random(3, 5)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-cyan-900/20"
          style={{ y: y1 }}
        />
        
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0"
          style={{ scale }}
        >
          <div className="h-full w-full bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(120,80,255,0.15),transparent),radial-gradient(circle_600px_at_80%_50%,rgba(80,200,255,0.1),transparent),radial-gradient(circle_800px_at_20%_100%,rgba(255,80,180,0.1),transparent)]" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center"
        style={{ opacity }}
      >
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-gray-400">
              Welcome to the Creative Universe of
            </span>
          </motion.div>
          
          <h1 
            ref={titleRef}
            className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] text-white"
          >
            ZUNAIRA KHAN.
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8"
          >
            <p className="text-xl text-gray-300 md:text-2xl">
              Where Design Meets Growth • Where Ideas Take Flight
            </p>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingPositions.map((position, i) => (
            <motion.div
              key={i}
              className="float-element absolute"
              style={position}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: i * 0.1 + 2, duration: 0.5 }}
            >
              <div 
                className={`
                  ${i % 3 === 0 ? "h-2 w-2 rounded-full bg-violet-400" : ""}
                  ${i % 3 === 1 ? "h-3 w-3 rounded-full bg-cyan-400" : ""}
                  ${i % 3 === 2 ? "h-1 w-1 rounded-full bg-pink-400" : ""}
                  blur-[0.5px]
                `}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-gray-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
