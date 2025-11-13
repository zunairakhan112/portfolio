import type { Metadata } from "next";

import { portfolioContent } from "@/lib/content";
import type { PageContent, PortfolioSection } from "@/lib/content-schema";

const FALLBACK_SITE_URL = "https://zunaira-portfolio-demo.vercel.app";

function normalizeUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

const resolvedSiteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL);

export const siteUrl = resolvedSiteUrl;

export function absoluteUrl(path: string = "/"): string {
  if (!path || path === "/") {
    return `${siteUrl}/`;
  }

  try {
    return new URL(path, `${siteUrl}/`).toString();
  } catch {
    return `${siteUrl}/${path.replace(/^\//, "")}`;
  }
}

export const defaultSeoTitle = "Zunaira Khan — Immersive Designer & Growth Storyteller";
export const defaultSeoDescription =
  "Next-gen portfolio for Zunaira Khan, an immersive designer and growth marketer blending design, storytelling, and emerging tech.";
export const defaultSeoTagline = portfolioContent.hero.subheading;

const baseKeywords = new Set<string>([
  "Zunaira Khan",
  "Immersive designer",
  "Growth marketer",
  "Storytelling",
  "Marketing strategy",
  "Growth marketing",
  "Product marketing",
  "Design systems",
  "Lifecycle marketing",
  "Customer experience",
  "Portfolio",
  "Entrepreneurial marketing",
  "Brand storytelling",
  "Creative strategy",
  "Experience design",
  "Launch strategy",
  "Funnel design",
  "Retention loops",
  "Motion design",
  "Figma systems",
  "Community growth"
]);

portfolioContent.sections.forEach((section: PortfolioSection) => {
  baseKeywords.add(section.title);
});

export const defaultKeywords = Array.from(baseKeywords);

export const defaultOgImage = {
  url: absoluteUrl("/media/Kintsugi%201.avif"),
  width: 1600,
  height: 900,
  alt: "Gold and aurora tones illustrating Zunaira Khan's immersive portfolio."
};

export function buildMetadataOverrides(overrides: Metadata = {}): Metadata {
  return {
    ...overrides,
    openGraph: {
      ...overrides.openGraph,
      images: overrides.openGraph?.images ?? [defaultOgImage]
    },
    twitter: {
      ...overrides.twitter,
      card: overrides.twitter?.card ?? "summary_large_image",
      images: overrides.twitter?.images ?? [defaultOgImage.url]
    }
  };
}

export function derivePageKeywords(page?: PageContent): string[] {
  const keywordSet = new Set<string>(defaultKeywords);

  if (!page) {
    return Array.from(keywordSet);
  }

  keywordSet.add(page.title);
  keywordSet.add(page.description);

  page.sections?.forEach((section) => {
    keywordSet.add(section.title);
  });

  page.projects?.forEach((project) => {
    keywordSet.add(project.title);
    keywordSet.add(project.category);
    project.tags?.forEach((tag) => keywordSet.add(tag));
  });

  page.experiences?.forEach((experience) => {
    keywordSet.add(experience.role);
    keywordSet.add(experience.company);
    experience.technologies?.forEach((tech) => keywordSet.add(tech));
  });

  page.resources?.forEach((resource) => {
    keywordSet.add(resource.title);
    keywordSet.add(resource.type);
  });

  return Array.from(keywordSet);
}

export function getWebsiteJsonLd() {
  const sameAs = portfolioContent.socials
    .map((social) => social.href)
    .filter((href) => href.startsWith("http"));

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/") }#website`,
    url: absoluteUrl("/"),
    name: defaultSeoTitle,
    description: defaultSeoDescription,
    inLanguage: "en-US",
    publisher: {
      "@id": `${absoluteUrl("/") }#person`
    },
    potentialAction: [
      {
        "@type": "ViewAction",
        target: absoluteUrl("/"),
        name: "Explore the portfolio"
      }
    ],
    sameAs
  };
}

export function getPersonJsonLd() {
  const sameAs = portfolioContent.socials
    .map((social) => social.href)
    .filter((href) => href.startsWith("http"));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl("/") }#person`,
    name: portfolioContent.name,
    description: portfolioContent.tagline,
    url: absoluteUrl("/"),
    jobTitle: "Immersive Designer & Growth Storyteller",
    image: defaultOgImage.url,
    sameAs
  };
}

export function getHomePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl("/") }#webpage`,
    url: absoluteUrl("/"),
    name: defaultSeoTitle,
    description: defaultSeoDescription,
    inLanguage: "en-US",
    isPartOf: {
      "@id": `${absoluteUrl("/") }#website`
    },
    about: {
      "@id": `${absoluteUrl("/") }#person`
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: defaultOgImage.url,
      width: defaultOgImage.width,
      height: defaultOgImage.height
    }
  };
}

export function getGenericPageJsonLd(page: PageContent) {
  const pageUrl = absoluteUrl(`/${page.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: "en-US",
    isPartOf: {
      "@id": `${absoluteUrl("/") }#website`
    },
    about: {
      "@id": `${absoluteUrl("/") }#person`
    }
  };
}

export function getBreadcrumbListJsonLd(crumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.url)
    }))
  };
}


