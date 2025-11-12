import rawSiteContent from "@/data/site-content.json";
import type { PageContent, SiteContent } from "@/lib/content-schema";
import { siteContentSchema } from "@/lib/content-schema";

const parsed: SiteContent = siteContentSchema.parse(rawSiteContent);

const normalizedPages = Object.entries(parsed.pages).reduce<Record<string, PageContent>>(
  (acc, [key, page]) => {
    const normalizedPage: PageContent = {
      ...page,
      slug: page.slug || key
    };

    acc[key] = normalizedPage.slug === key ? normalizedPage : { ...normalizedPage, slug: key };
    return acc;
  },
  {}
);

export const siteContent = normalizedPages;

export function getPageContentBySlug(slug: string): PageContent | undefined {
  return siteContent[slug];
}

export function getAllPageContent(): PageContent[] {
  return Object.values(siteContent);
}

export function getAllPageSlugs(): string[] {
  return Object.keys(siteContent);
}


