import type { PortfolioSection } from "@/lib/content-schema";
import type { ReactElement } from "react";

import { CaseStudySection } from "@/components/sections/case-study-section";
import { ContactCtaSection } from "@/components/sections/contact-cta";
import { CountriesSlideshowSection } from "@/components/sections/countries-slideshow";
import { FigmaSection } from "@/components/sections/figma-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { GrowthLabSection } from "@/components/sections/growth-lab-section";
import { HeroNarrativeSection } from "@/components/sections/hero-narrative";
import { HighlightsCarousel } from "@/components/sections/highlights-carousel";
import { MiroSection } from "@/components/sections/miro-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { MotionReelsSection } from "@/components/sections/motion-reels-section";
import { PdfSection } from "@/components/sections/pdf-section";
import { ResourcesHubSection } from "@/components/sections/resources-hub";
import { SectionShell } from "@/components/sections/section-shell";
import { StoryScrollSection } from "@/components/sections/story-scroll";
import { VideoSection } from "@/components/sections/video-section";
import { CapabilitiesGrid } from "@/components/sections/capabilities-grid";

const componentMap: Partial<
  Record<PortfolioSection["type"], (props: { section: PortfolioSection }) => ReactElement | null>
> = {
  figma: ({ section }) => (
    <FigmaSection section={section as Extract<PortfolioSection, { type: "figma" }>} />
  ),
  miro: ({ section }) => (
    <MiroSection section={section as Extract<PortfolioSection, { type: "miro" }>} />
  ),
  video: ({ section }) => (
    <VideoSection section={section as Extract<PortfolioSection, { type: "video" }>} />
  ),
  gallery: ({ section }) => (
    <GallerySection section={section as Extract<PortfolioSection, { type: "gallery" }>} />
  ),
  "case-study": ({ section }) => (
    <CaseStudySection section={section as Extract<PortfolioSection, { type: "case-study" }>} />
  ),
  pdf: ({ section }) => (
    <PdfSection section={section as Extract<PortfolioSection, { type: "pdf" }>} />
  ),
  "hero-narrative": ({ section }) => (
    <HeroNarrativeSection section={section as Extract<PortfolioSection, { type: "hero-narrative" }>} />
  ),
  manifesto: ({ section }) => (
    <ManifestoSection section={section as Extract<PortfolioSection, { type: "manifesto" }>} />
  ),
  highlights: ({ section }) => (
    <HighlightsCarousel section={section as Extract<PortfolioSection, { type: "highlights" }>} />
  ),
  "growth-lab": ({ section }) => (
    <GrowthLabSection section={section as Extract<PortfolioSection, { type: "growth-lab" }>} />
  ),
  "motion-reels": ({ section }) => (
    <MotionReelsSection section={section as Extract<PortfolioSection, { type: "motion-reels" }>} />
  ),
  capabilities: ({ section }) => (
    <CapabilitiesGrid section={section as Extract<PortfolioSection, { type: "capabilities" }>} />
  ),
  resources: ({ section }) => (
    <ResourcesHubSection section={section as Extract<PortfolioSection, { type: "resources" }>} />
  ),
  contact: ({ section }) => (
    <ContactCtaSection section={section as Extract<PortfolioSection, { type: "contact" }>} />
  ),
  "countries-slideshow": ({ section }) => (
    <CountriesSlideshowSection section={section as Extract<PortfolioSection, { type: "countries-slideshow" }>} />
  )
};

interface SectionRendererProps {
  sections: PortfolioSection[];
  variant?: "stack" | "panel";
}

export function SectionRenderer({ sections, variant = "stack" }: SectionRendererProps) {
  const content = sections.map((section) => {
    if (section.type === "story-scroll") {
      return (
        <StoryScrollSection
          key={section.id}
          section={section as Extract<PortfolioSection, { type: "story-scroll" }>}
        />
      );
    }

    const Component = componentMap[section.type];
    if (!Component) return null;

    if (section.type === "resources") {
      const resourcesSection = section as Extract<PortfolioSection, { type: "resources" }>;
      if (!resourcesSection.enableSearch) {
        return (
          <section key={section.id} id={section.id} className="relative">
            <Component section={section} />
          </section>
        );
      }
    }

    if (section.type === "contact") {
      return (
        <section key={section.id} id={section.id} className="relative">
          <Component section={section} />
        </section>
      );
    }

    if (variant === "panel" && section.type === "resources") {
      return (
        <section key={section.id} id={section.id} className="relative">
          <Component section={section} />
        </section>
      );
    }

    return (
      <SectionShell
        key={section.id}
        id={section.id}
        title={section.title}
        variant={variant}
        description={"description" in section ? section.description : undefined}
      >
        <Component section={section} />
      </SectionShell>
    );
  });

  if (variant === "panel") {
    return <>{content}</>;
  }

  return (
    <div className="mt-24 flex flex-col gap-24" id="portfolio" data-animate>
      {content}
    </div>
  );
}

