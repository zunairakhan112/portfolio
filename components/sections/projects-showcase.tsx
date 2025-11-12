"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Neural Network",
    category: "AI/ML",
    image: "/api/placeholder/800/600",
    color: "from-violet-600 to-purple-600"
  },
  {
    id: 2,
    title: "Design System",
    category: "UI/UX",
    image: "/api/placeholder/800/600",
    color: "from-cyan-600 to-blue-600"
  },
  {
    id: 3,
    title: "Growth Engine",
    category: "Marketing",
    image: "/api/placeholder/800/600",
    color: "from-pink-600 to-rose-600"
  },
  {
    id: 4,
    title: "Web3 Platform",
    category: "Blockchain",
    image: "/api/placeholder/800/600",
    color: "from-amber-600 to-orange-600"
  }
];

export function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for project cards
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card) => {
        gsap.to(card as Element, {
          y: -100,
          scrollTrigger: {
            trigger: card as Element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      });

      // Scale animation on scroll
      ScrollTrigger.batch(".project-card", {
        onEnter: (batch) => gsap.to(batch, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15 }),
        onLeave: (batch) => gsap.to(batch, { scale: 0.9, opacity: 0.5, duration: 0.8, stagger: 0.15 }),
        onEnterBack: (batch) => gsap.to(batch, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15 }),
        onLeaveBack: (batch) => gsap.to(batch, { scale: 0.9, opacity: 0.5, duration: 0.8, stagger: 0.15 }),
        start: "top bottom-=100",
        end: "bottom top+=100"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
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
            Featured Projects
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            A showcase of innovation and creativity
          </p>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative">
          <motion.div 
            className="flex gap-8 pb-8"
            style={{ x }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card relative flex-shrink-0 w-[80vw] max-w-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${project.color} p-1`}>
                  <div className="relative overflow-hidden rounded-3xl bg-black">
                    {/* Project Image */}
                    <div className="relative h-[60vh] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Floating number */}
                      <motion.div
                        className="absolute top-8 right-8 text-[8rem] font-bold leading-none text-white/10"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="relative z-10 p-8">
                      <motion.span 
                        className="text-sm uppercase tracking-widest text-gray-400"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {project.category}
                      </motion.span>
                      <motion.h3 
                        className="mt-2 text-4xl font-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {project.title}
                      </motion.h3>
                      
                      {/* Interactive elements */}
                      <motion.div 
                        className="mt-6 flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <button className="group/btn relative px-6 py-3 text-white">
                          <span className="relative z-10">View Project</span>
                          <motion.span
                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${project.color} opacity-0 group-hover/btn:opacity-100 transition-opacity`}
                            whileHover={{ scale: 1.05 }}
                          />
                        </button>
                        <button className="p-3 text-white/60 hover:text-white transition-colors">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </motion.div>
                    </div>

                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh]">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-cyan-900/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
