import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/layout/page-hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { ProjectGrid } from "@/components/sections/project-grid";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { portfolioContent } from "@/lib/content";
import { getAllPageSlugs, getPageContentBySlug } from "@/lib/site-content";

type HeroBackground = "aurora" | "midnight" | "sunrise" | "glacier";
const supportedHeroBackgrounds = new Set<HeroBackground>(["aurora", "midnight", "sunrise", "glacier"]);

function resolveHeroBackground(value: string | undefined): HeroBackground | undefined {
  return value && supportedHeroBackgrounds.has(value as HeroBackground) ? (value as HeroBackground) : undefined;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageContentBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description
    },
    twitter: {
      title: page.title,
      description: page.description
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageContentBySlug(slug);

  if (!page) {
    notFound();
  }

  const heroTitle = page.hero?.title ?? page.title;
  const heroSubtitle = page.hero?.subtitle ?? page.description;
  const heroBackground = page.hero?.background;

  return (
    <>
      <SiteHeader signature={portfolioContent.signature} />
      <main className="relative space-y-24">
        <PageHero
          title={heroTitle}
          subtitle={heroSubtitle}
          description={page.description}
          background={resolveHeroBackground(heroBackground)}
        />

        <section className="relative px-6 md:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-24">
            {page.projects?.length ? (
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="font-creative text-xs uppercase tracking-[0.45em] text-muted-foreground/70">
                    Project index
                  </span>
                  <h2 className="font-display text-3xl text-foreground md:text-4xl">
                    Signature Builds & Launches
                  </h2>
                </div>
                <ProjectGrid projects={page.projects} />
              </div>
            ) : null}

            {page.experiences?.length ? (
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="font-creative text-xs uppercase tracking-[0.45em] text-muted-foreground/70">
                    Experience timeline
                  </span>
                  <h2 className="font-display text-3xl text-foreground md:text-4xl">
                    Roles that shaped the craft
                  </h2>
                </div>
                <ExperienceTimeline experiences={page.experiences} />
              </div>
            ) : null}

            {page.sections?.length ? (
              <div className="flex flex-col gap-20">
                <SectionRenderer sections={page.sections} variant="panel" />
              </div>
            ) : null}
          </div>
        </section>

        <section id="footer" className="relative px-6 md:px-10">
          <div className="mx-auto max-w-6xl">
            <SiteFooter socials={portfolioContent.socials} signature={portfolioContent.signature} />
          </div>
        </section>
      </main>
    </>
  );
}


