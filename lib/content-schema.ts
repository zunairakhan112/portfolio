import { z } from "zod";

const linkHrefSchema = z
  .string()
  .refine((value) => {
    if (value === "#") return true;
    if (value.startsWith("#")) return value.length > 1;
    if (value.startsWith("mailto:")) return value.length > "mailto:".length;
    if (value.startsWith("tel:")) return value.length > "tel:".length;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, "Invalid link href");

const baseLinkSchema = z.object({
  label: z.string(),
  href: linkHrefSchema,
  external: z.boolean().optional()
});

const mediaTagsSchema = z.array(z.string()).default([]);

const figmaSectionSchema = z.object({
  id: z.string(),
  type: z.literal("figma"),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      tags: mediaTagsSchema,
      embedUrl: z.string().url(),
      logos: z
        .array(
          z.object({
            src: z.string(),
            alt: z.string().optional()
          })
        )
        .optional()
    })
  )
});

const miroSectionSchema = z.object({
  id: z.string(),
  type: z.literal("miro"),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      tags: mediaTagsSchema,
      embedUrl: z.string(),
      logos: z
        .array(
          z.object({
            src: z.string(),
            alt: z.string().optional()
          })
        )
        .optional()
    })
  )
});

const videoSectionSchema = z.object({
  id: z.string(),
  type: z.literal("video"),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(
    z
      .object({
      title: z.string(),
      description: z.string().optional(),
      platform: z.string().optional(),
        embedUrl: z.string().optional(),
        file: z.string().optional()
      })
      .refine((item) => Boolean(item.embedUrl || item.file), {
        message: "Each video item requires either an embedUrl or file path."
    })
  )
});

const gallerySectionSchema = z.object({
  id: z.string(),
  type: z.literal("gallery"),
  title: z.string(),
  description: z.string().optional(),
  images: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional()
    })
  )
});

const caseStudySectionSchema = z.object({
  id: z.string(),
  type: z.literal("case-study"),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(
    z.object({
      title: z.string(),
      summary: z.string().optional(),
      outcomes: z.array(z.string()).default([]),
      links: z.array(baseLinkSchema).default([]),
      logo: z.string().optional(),
      logoAlt: z.string().optional()
    })
  )
});

const pdfSectionSchema = z.object({
  id: z.string(),
  type: z.literal("pdf"),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      file: z.string().optional()
    })
  )
});

const heroNarrativeSectionSchema = z.object({
  id: z.string(),
  type: z.literal("hero-narrative"),
  title: z.string(),
  description: z.string().optional(),
  narrative: z.array(
    z.object({
      heading: z.string(),
      body: z.string()
    })
  ),
  stats: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        annotation: z.string().optional(),
        progress: z.number().min(0).max(100).optional()
      })
    )
    .default([]),
  quote: z
    .object({
      text: z.string(),
      author: z.string(),
      role: z.string().optional()
    })
    .optional()
});

const storyScrollSectionSchema = z.object({
  id: z.string(),
  type: z.literal("story-scroll"),
  title: z.string(),
  description: z.string().optional(),
  slides: z.array(
    z.object({
      id: z.string(),
      eyebrow: z.string().optional(),
      title: z.string(),
      body: z.string(),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
          credit: z
            .object({
              name: z.string(),
              url: linkHrefSchema.optional()
            })
            .optional()
        })
        .optional(),
      background: z.string().optional(),
      backgroundImage: z.string().optional(),
      accent: z.string().optional(),
      overlay: z.string().optional(),
      resource: z
        .object({
          label: z.string(),
          href: linkHrefSchema,
          description: z.string().optional()
        })
        .optional(),
      quote: z
        .object({
          text: z.string(),
          author: z.string().optional(),
          role: z.string().optional()
        })
        .optional()
    })
  )
});

const manifestoSectionSchema = z.object({
  id: z.string(),
  type: z.literal("manifesto"),
  title: z.string(),
  description: z.string().optional(),
  tenets: z.array(
    z.object({
      title: z.string(),
      detail: z.string()
    })
  )
});

const highlightsSectionSchema = z.object({
  id: z.string(),
  type: z.literal("highlights"),
  title: z.string(),
  description: z.string().optional(),
  highlights: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      metric: z.string().optional(),
      accent: z.string().optional(),
      logo: z.string().optional(),
      logoAlt: z.string().optional()
    })
  )
});

const growthLabSectionSchema = z.object({
  id: z.string(),
  type: z.literal("growth-lab"),
  title: z.string(),
  description: z.string().optional(),
  experiments: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      embedUrl: z.string().optional(),
      tags: z.array(z.string()).default([])
    })
  )
});

const motionReelsSectionSchema = z.object({
  id: z.string(),
  type: z.literal("motion-reels"),
  title: z.string(),
  description: z.string().optional(),
  reels: z.array(
    z
      .object({
      title: z.string(),
      description: z.string().optional(),
      platform: z.string().optional(),
        embedUrl: z.string().optional(),
        file: z.string().optional()
      })
      .refine((item) => Boolean(item.embedUrl || item.file), {
        message: "Each reel requires either an embedUrl or file path."
    })
  )
});

const capabilitiesSectionSchema = z.object({
  id: z.string(),
  type: z.literal("capabilities"),
  title: z.string(),
  description: z.string().optional(),
  capabilities: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      skills: z.array(z.string()).default([]),
      tone: z.string().optional()
    })
  )
});

const resourcesSectionItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: linkHrefSchema,
  type: z.string(),
  icon: z.string().optional(),
  tags: z.array(z.string()).default([]),
  badge: z.string().optional()
});

const resourcesCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  accent: z
    .object({
      primary: z.string(),
      secondary: z.string().optional(),
      tertiary: z.string().optional()
    })
    .optional(),
  resources: z.array(resourcesSectionItemSchema)
});

const resourcesSectionSchema = z.object({
  id: z.string(),
  type: z.literal("resources"),
  title: z.string(),
  description: z.string().optional(),
  vibe: z.string().optional(),
  searchPlaceholder: z.string().optional(),
  resources: z.array(resourcesSectionItemSchema).default([]),
  categories: z.array(resourcesCategorySchema).default([])
});

const contactSectionSchema = z.object({
  id: z.string(),
  type: z.literal("contact"),
  title: z.string(),
  description: z.string().optional(),
  cta: baseLinkSchema,
  availability: z.string().optional(),
  channels: z
    .array(
      z.object({
        label: z.string(),
        description: z.string().optional(),
        href: linkHrefSchema
      })
    )
    .default([])
});

const countriesSlideshowSchema = z.object({
  id: z.string(),
  type: z.literal("countries-slideshow"),
  title: z.string(),
  description: z.string().optional(),
  countries: z.array(
    z.object({
      name: z.string(),
      flag: z.string(),
      description: z.string().optional(),
      yearVisited: z.string().optional()
    })
  )
});

const sectionSchema = z.discriminatedUnion("type", [
  figmaSectionSchema,
  miroSectionSchema,
  videoSectionSchema,
  gallerySectionSchema,
  caseStudySectionSchema,
  pdfSectionSchema,
  heroNarrativeSectionSchema,
  storyScrollSectionSchema,
  manifestoSectionSchema,
  highlightsSectionSchema,
  growthLabSectionSchema,
  motionReelsSectionSchema,
  capabilitiesSectionSchema,
  resourcesSectionSchema,
  contactSectionSchema,
  countriesSlideshowSchema
]);

// Page schemas for new navigation structure
export const pageMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  hero: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    background: z.string().optional()
  }).optional()
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  thumbnail: z.string().optional(),
  link: linkHrefSchema.optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false)
});

export const experienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  duration: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  technologies: z.array(z.string()).optional(),
  logo: z.string().optional(),
  logoAlt: z.string().optional()
});

export const resourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["tool", "article", "template", "course"]),
  description: z.string(),
  link: z.string(),
  icon: z.string().optional()
});

export const pageContentSchema = pageMetaSchema.extend({
  hero: pageMetaSchema.shape.hero.optional(),
  sections: z.array(sectionSchema).default([]),
  projects: z.array(projectSchema).default([]),
  experiences: z.array(experienceSchema).default([]),
  resources: z.array(resourceSchema).default([])
});

export const siteContentSchema = z.object({
  pages: z.record(pageContentSchema)
});

export const portfolioSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  signature: z.string(),
  hero: z.object({
    headline: z.string(),
    subheading: z.string(),
    ctaPrimary: baseLinkSchema,
    ctaSecondary: baseLinkSchema,
    floatingWords: z.array(z.string()).default([]),
    badge: z.string().optional()
  }),
  techStack: z.object({
    title: z.string(),
    description: z.string().optional(),
    columns: z.array(
      z.object({
        heading: z.string(),
        items: z.array(z.string())
      })
    )
  }),
  sections: z.array(sectionSchema),
  socials: z
    .array(
      z.object({
        label: z.string(),
        href: z.string()
      })
    )
    .default([])
});

export type PortfolioContent = z.infer<typeof portfolioSchema>;
export type PortfolioSection = z.infer<typeof sectionSchema>;
export type PageContent = z.infer<typeof pageContentSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Resource = z.infer<typeof resourceSchema>;

