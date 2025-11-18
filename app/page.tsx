"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";

import { HeroBanner } from "@/components/hero/hero-banner";
import { ScrollDotsNav } from "@/components/layout/scroll-dots-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { TechStackGrid } from "@/components/sections/tech-stack-grid";
import { WelcomeOverlay } from "@/components/ui/welcome-overlay";
import { portfolioContent } from "@/lib/content";
import { getBreadcrumbListJsonLd, getHomePageJsonLd } from "@/lib/seo";

type GsapInstance = (typeof import("gsap"))["gsap"];
type ScrollTriggerInstance = (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];

const homePageJsonLd = getHomePageJsonLd();
const homeBreadcrumbJsonLd = getBreadcrumbListJsonLd([
  { name: "Home", url: "/" }
]);

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
  const gsapRef = useRef<GsapInstance | null>(null);
  const scrollTriggerRef = useRef<ScrollTriggerInstance | null>(null);
  const [gsapReady, setGsapReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (typeof window === "undefined") {
      return;
    }

    const loadGsap = async () => {
      const [{ gsap }, { ScrollTrigger }, { ScrollToPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/ScrollToPlugin")
      ]);

      if (!mounted) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
      gsapRef.current = gsap;
      scrollTriggerRef.current = ScrollTrigger;
      setGsapReady(true);
    };

    // Defer GSAP loading to the next animation frame to avoid blocking hydration
    const frame = requestAnimationFrame(loadGsap);

    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!gsapReady || !scrollTriggerRef.current) {
      return;
    }

    const triggers = sections.map(({ id }) =>
      scrollTriggerRef.current!.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id)
      })
    );

    scrollTriggerRef.current.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [gsapReady, sections]);

  const handleNavigate = useCallback((id: string) => {
    if (gsapRef.current) {
      gsapRef.current.to(window, {
        duration: 1,
        ease: "power2.out",
        scrollTo: { y: `#${id}`, offsetY: 96 }
      });
      return;
    }

    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <Script id="structured-data-homepage" type="application/ld+json">
        {JSON.stringify(homePageJsonLd)}
      </Script>
      <Script id="structured-data-home-breadcrumb" type="application/ld+json">
        {JSON.stringify(homeBreadcrumbJsonLd)}
      </Script>
      <WelcomeOverlay />
      <SiteHeader signature={content.signature} />
      <ScrollDotsNav sections={sections} activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="relative space-y-16 md:space-y-24">
        <section
          id="hero"
          className="relative min-h-[100svh] px-5 pt-[120px] sm:px-6 md:px-10 md:pt-[140px] lg:pt-[160px]"
        >
          <div className="mx-auto max-w-6xl">
            <HeroBanner
              hero={content.hero}
              tagline={content.tagline}
              signature={content.signature}
            />
          </div>
        </section>

        <section id="tech-stack" className="relative px-5 sm:px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <TechStackGrid techStack={content.techStack} />
          </div>
        </section>

        <section id="portfolio" className="relative px-5 sm:px-6 md:px-10">
          <SectionRenderer sections={content.sections} />
        </section>

        <section id="footer" className="relative px-5 sm:px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <SiteFooter socials={content.socials} signature={content.signature} />
          </div>
        </section>
      </main>
    </>
  );
}