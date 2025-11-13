"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { HeroBanner } from "@/components/hero/hero-banner";
import { ScrollDotsNav } from "@/components/layout/scroll-dots-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { TechStackGrid } from "@/components/sections/tech-stack-grid";
import { WelcomeOverlay } from "@/components/ui/welcome-overlay";
import { portfolioContent } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Home() {
  const content = portfolioContent;
  const sections = useMemo(
    () => {
      const renamedSections = content.sections.map((section) => {
        if (section.id === "spotlight-highlights") {
          return { id: section.id, title: "Growth Snapshots" };
        }
        if (section.id === "growth-lab") {
          return { id: section.id, title: "Growth Lab Blueprints" };
        }
        if (section.id === "motion-reels") {
          return { id: section.id, title: "Reels & Video Storytelling" };
        }
        return { id: section.id, title: section.title };
      });

      return [
        { id: "hero", title: "Experiences & Growth" },
      { id: "tech-stack", title: content.techStack.title },
        ...renamedSections,
      { id: "footer", title: "Connect" }
      ];
    },
    [content]
  );
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "hero");

  useEffect(() => {
    const triggers = sections.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id)
      })
    );

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [sections]);

  const handleNavigate = useCallback((id: string) => {
    gsap.to(window, {
      duration: 1,
      ease: "power2.out",
      scrollTo: { y: `#${id}`, offsetY: 96 }
    });
  }, []);

  return (
    <>
      <WelcomeOverlay />
      <SiteHeader signature={content.signature} />
      <ScrollDotsNav sections={sections} activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="relative space-y-24">
        <section
          id="hero"
          className="relative min-h-[100svh] px-6 pt-[140px] md:px-10 lg:pt-[160px]"
        >
          <div className="mx-auto max-w-6xl">
            <HeroBanner
              hero={content.hero}
              tagline={content.tagline}
              signature={content.signature}
            />
          </div>
        </section>

        <section id="tech-stack" className="relative px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <TechStackGrid techStack={content.techStack} />
          </div>
        </section>

        <section id="portfolio" className="relative px-6 md:px-10">
          <SectionRenderer sections={content.sections} />
        </section>

        <section id="footer" className="relative px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <SiteFooter socials={content.socials} signature={content.signature} />
          </div>
        </section>
      </main>
    </>
  );
}