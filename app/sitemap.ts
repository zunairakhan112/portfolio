import type { MetadataRoute } from "next";

import { getAllPageContent } from "@/lib/site-content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    }
  ];

  const pageEntries: MetadataRoute.Sitemap = getAllPageContent().map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...staticEntries, ...pageEntries];
}


