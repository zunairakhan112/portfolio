"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import type { PortfolioSection } from "@/lib/content-schema";

type ResourcesSection = Extract<PortfolioSection, { type: "resources" }>;
type SectionCategory = ResourcesSection["categories"][number];
type SectionResource = SectionCategory["resources"][number];
type SectionCta = NonNullable<ResourcesSection["cta"]>;

interface ResourcesHubSectionProps {
  section: ResourcesSection;
}

const cardVariants = {
  hidden: { opacity: 0, y: 38, rotate: -1 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.8, 0.25, 1]
    }
  }
};

const listVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }
  }
};

const defaultAccent: NonNullable<SectionCategory["accent"]> = {
  primary: "rgba(195,169,255,0.38)",
  secondary: "rgba(255,207,239,0.28)",
  tertiary: "rgba(146,221,255,0.24)"
};

const searchIcon =
  "M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.57-4.23 6.5 6.5 0 10-6.5 6.5 6.471 6.471 0 004.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 4 10.99 4 7.5S7.01 1 10.5 1 17 4.01 17 7.5 13.99 14 10.5 14z";

export function ResourcesHubSection({ section }: ResourcesHubSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion ?? false;
  const enableSearch = section.enableSearch ?? true;

  const sharedListAnimation = shouldReduceMotion
    ? {}
    : ({
        variants: listVariants,
        initial: "hidden",
        animate: "visible"
      } as const);

  const gridAnimation = shouldReduceMotion
    ? {}
    : ({
        variants: listVariants,
        initial: "hidden",
        animate: "visible",
        transition: { staggerChildren: 0.12 }
      } as const);

  const searchGridAnimation = shouldReduceMotion
    ? {}
    : ({
        variants: listVariants,
        initial: "hidden",
        animate: "visible"
      } as const);

  const categories = useMemo<SectionCategory[]>(() => {
    if (section.categories?.length) {
      return section.categories;
    }

    if (section.resources.length) {
      return [
        {
          id: `${section.id}-all`,
          title: section.title,
          description: section.description,
          icon: "✨",
          accent: defaultAccent,
          resources: section.resources
        } as SectionCategory
      ];
    }

    return [];
  }, [section.categories, section.description, section.id, section.resources, section.title]);

  const allCategoryIds = useMemo(() => categories.map((category) => category.id), [categories]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(allCategoryIds);

  const normalizedSelectedCategories = useMemo(() => {
    if (!allCategoryIds.length) {
      return [];
    }

    const allowedIds = new Set(allCategoryIds);
    const validSelections = selectedCategories.filter((id) => allowedIds.has(id));

    return validSelections.length ? validSelections : allCategoryIds;
  }, [allCategoryIds, selectedCategories]);

  const activeCategoryIds = normalizedSelectedCategories;
  const activeCategorySet = useMemo(() => new Set(activeCategoryIds), [activeCategoryIds]);

  const handleToggleCategory = useCallback(
    (categoryId: string) => {
      setSelectedCategories((current) => {
        const currentSet = new Set(current);
        if (currentSet.has(categoryId)) {
          currentSet.delete(categoryId);
          const next = allCategoryIds.filter((id) => currentSet.has(id));
          return next.length ? next : allCategoryIds;
        }

        currentSet.add(categoryId);
        return allCategoryIds.filter((id) => currentSet.has(id));
      });
    },
    [allCategoryIds]
  );

  const [search, setSearch] = useState("");
  const searchTerm = enableSearch ? search.trim().toLowerCase() : "";

  const normalizedResources = useMemo(
    () =>
      categories.flatMap((category) =>
        category.resources.map((resource, index) => ({
          id: `${category.id}-${resource.title}-${index}`,
          category,
          resource
        }))
      ),
    [categories]
  );

  const categoryFilteredResources = useMemo(
    () => normalizedResources.filter(({ category }) => activeCategorySet.has(category.id)),
    [normalizedResources, activeCategorySet]
  );

  const filteredResources = useMemo(() => {
    if (!searchTerm) {
      return categoryFilteredResources;
    }

    return categoryFilteredResources.filter(({ category, resource }) => {
      const haystack = [
        resource.title,
        resource.description,
        resource.type,
        ...(resource.tags ?? []),
        category.title
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm);
    });
  }, [categoryFilteredResources, searchTerm]);

  const visibleCategories = useMemo(
    () => categories.filter((category) => activeCategorySet.has(category.id)),
    [categories, activeCategorySet]
  );

  const searchPlaceholder =
    section.searchPlaceholder ?? "Search by vibe, tool, or keyword...";

  const showEmptyState = enableSearch && Boolean(searchTerm) && filteredResources.length === 0;

  if (!enableSearch && section.cta) {
    return (
      <div className="mx-auto max-w-6xl">
        <ResourceCtaBanner cta={section.cta} />
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="rounded-[2.5rem] border border-dashed border-white/20 bg-white/[0.03] p-10 text-center shadow-[0_24px_80px_rgba(8,10,20,0.22)]">
        <p className="font-display text-2xl text-white/80">Resources are loading.</p>
        <p className="mt-2 font-creative text-sm text-white/60">
          Check back in a bit for freshly brewed kits, directories, and tools.
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-20 isolate overflow-hidden rounded-[2.75rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent p-6 sm:p-8 lg:p-10 shadow-[0_32px_90px_rgba(10,12,22,0.35)]">
      <div className="pointer-events-none absolute -top-28 right-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(155,92,255,0.28),transparent_70%)] blur-lg" />
      <div className="pointer-events-none absolute -bottom-32 left-[-4rem] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(58,251,212,0.2),transparent_70%)] blur-xl" />
      <div className="pointer-events-none absolute inset-0 rotate-12 bg-[linear-gradient(120deg,rgba(255,255,255,0.045)_0%,transparent_55%,rgba(255,255,255,0.06)_100%)] opacity-70 mix-blend-screen" />

      <div className="relative z-10 flex flex-col gap-12">
        <motion.div className="space-y-6" {...sharedListAnimation}>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/70">
              🧰 Resource Radar
            </span>
            <p className="max-w-3xl font-creative text-base leading-relaxed text-foreground/75">
              {enableSearch
                ? "Browse curated drops from design wonderlands, modern web tooling, and graphic alchemy kits. Pop a query into the search to surface exactly what your next build craves."
                : "Browse curated drops from design wonderlands, modern web tooling, and graphic alchemy kits. Tap into the vault to remix the systems fueling my latest launch experiments."}
            </p>
          </div>

          {enableSearch ? (
            <div className="flex flex-col gap-3">
            <div className="relative w-full">
              <svg
                aria-hidden
                className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d={searchIcon} />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-14 w-full rounded-full border border-white/15 bg-white/[0.05] pl-12 pr-20 font-creative text-sm text-foreground/90 shadow-[0_16px_45px_rgba(10,10,20,0.28)] backdrop-blur-lg transition focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-white/40 hover:bg-white/[0.18]"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((category) => {
                const isActive = activeCategorySet.has(category.id);

                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleToggleCategory(category.id)}
                    className={clsx(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                      isActive
                        ? "border-white/35 bg-white/[0.14] text-white shadow-[0_10px_35px_rgba(20,22,34,0.35)]"
                        : "border-white/15 bg-white/[0.05] text-white/60 hover:border-white/25 hover:bg-white/[0.12] hover:text-white/80"
                    )}
                  >
                    <span className="text-base">{category.icon ?? "✶"}</span>
                    {category.title}
                    <span
                      className={clsx(
                        "rounded-full px-2 py-[2px] text-[0.65rem] font-semibold tracking-[0.2em]",
                        isActive ? "bg-white/20 text-white/90" : "bg-white/10 text-white/70"
                      )}
                    >
                      {category.resources.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          ) : null}

        </motion.div>

        {showEmptyState ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-white/20 bg-white/[0.04] p-12 text-center"
          >
            <span className="text-4xl">🪄</span>
            <div className="space-y-2">
              <p className="font-display text-2xl text-white/90">
                No matches yet
              </p>
              <p className="font-creative text-sm text-white/70">
                Try a different keyword - maybe swap &quot;dark&quot; for &quot;contrast&quot; or search by topic like &quot;automation&quot;.
              </p>
            </div>
          </motion.div>
        ) : searchTerm ? (
          <motion.div
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            {...searchGridAnimation}
          >
            {filteredResources.map(({ id, category, resource }) => (
              <ResourceCard
                key={id}
                resource={resource}
                categoryTitle={category.title}
                categoryIcon={category.icon}
                accent={category.accent}
                reduceMotion={shouldReduceMotion}
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col gap-14">
            {visibleCategories.map((category) => (
              <motion.div
                key={category.id}
                {...sharedListAnimation}
                className="space-y-7 rounded-[2.5rem] border border-white/12 bg-white/[0.03] p-6 sm:p-8 lg:p-10 shadow-[0_22px_65px_rgba(9,11,21,0.25)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl leading-none">{category.icon ?? "✺"}</span>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl text-white md:text-3xl">
                        {category.title}
                      </h3>
                      {category.description ? (
                        <p className="max-w-2xl font-creative text-sm text-white/75">
                          {category.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/65">
                    {category.resources.length} picks
                  </span>
                </div>

                <motion.div
                  className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  {...gridAnimation}
                >
                  {category.resources.map((resource, index) => (
                    <ResourceCard
                      key={`${category.id}-${resource.title}-${index}`}
                      resource={resource}
                      categoryTitle={category.title}
                      categoryIcon={category.icon}
                      accent={category.accent}
                      reduceMotion={shouldReduceMotion}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ResourceCardProps {
  resource: SectionResource;
  categoryTitle: string;
  categoryIcon?: string;
  accent?: SectionCategory["accent"];
  reduceMotion: boolean;
}

function ResourceCard({ resource, categoryTitle, categoryIcon, accent, reduceMotion }: ResourceCardProps) {
  const accentPrimary = accent?.primary ?? defaultAccent.primary;
  const accentSecondary = accent?.secondary ?? defaultAccent.secondary;
  const accentTertiary = accent?.tertiary ?? defaultAccent.tertiary;

  const target = resource.link.startsWith("http") ? "_blank" : undefined;
  const rel = target ? "noreferrer" : undefined;

  const cardAnimationProps = reduceMotion ? {} : ({ variants: cardVariants } as const);
  const hoverAnimation = reduceMotion ? undefined : { y: -6, rotate: -0.3 };

  return (
    <motion.div whileHover={hoverAnimation} {...cardAnimationProps}>
      <Link
        href={resource.link}
        target={target}
        rel={rel}
        className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[2.35rem] border border-white/12 bg-white/[0.045] p-7 shadow-[0_28px_70px_rgba(10,13,23,0.28)] backdrop-blur-[28px] transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
        aria-label={`${resource.title} - ${resource.description}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-80 transition duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(120% 120% at 100% 0%, ${accentPrimary} 0%, transparent 65%), radial-gradient(120% 120% at 0% 100%, ${accentSecondary} 0%, transparent 60%), radial-gradient(80% 80% at 50% 50%, ${accentTertiary} 0%, transparent 75%)`
          }}
        />
        <div className="pointer-events-none absolute -top-12 right-12 h-24 w-24 rotate-12 rounded-full border border-dashed border-white/25 opacity-40 transition duration-500 group-hover:opacity-70" />

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-center justify-between text-foreground/50">
            <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.4em]">
              <span className="text-base">{categoryIcon ?? "✶"}</span>
              {categoryTitle}
            </span>
            <span className="text-foreground/40 transition duration-500 group-hover:text-foreground/80">
              ↗
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl">{resource.icon ?? "🪐"}</span>
            <div>
              <h4 className="font-display text-2xl text-foreground">
                {resource.title}
              </h4>
              <p className="font-creative text-xs uppercase tracking-[0.35em] text-foreground/45">
                {resource.type}
              </p>
            </div>
          </div>

          <p className="font-creative text-sm leading-relaxed text-foreground/75">
            {resource.description}
          </p>

          {resource.tags && resource.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <span className="mt-auto inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.45em] text-foreground/50 transition duration-300 group-hover:text-foreground/80">
            {resource.badge ? (
              <span className="rounded-full bg-white/15 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.3em] text-white/80">
                {resource.badge}
              </span>
            ) : null}
            Open
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

interface ResourceCtaBannerProps {
  cta: SectionCta;
}

function ResourceCtaBanner({ cta }: ResourceCtaBannerProps) {
  const primaryTarget =
    cta.action.external || cta.action.href.startsWith("http") ? "_blank" : undefined;
  const primaryRel = primaryTarget ? "noreferrer" : undefined;

  return (
    <div className="relative overflow-hidden rounded-[2.75rem] border border-white/15 bg-[radial-gradient(110%_140%_at_0%_0%,rgba(124,58,237,0.32),transparent_65%),radial-gradient(150%_150%_at_100%_120%,rgba(20,184,166,0.32),transparent_60%)] p-6 sm:p-8 lg:p-10 shadow-[0_30px_90px_rgba(10,12,22,0.55)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_45%,rgba(255,255,255,0.08)_100%)] opacity-60 mix-blend-screen" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl space-y-4">
          {cta.eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.42em] text-white/70">
              {cta.eyebrow}
            </span>
          ) : null}
          {cta.badge ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/12 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/85">
              {cta.badge}
            </span>
          ) : null}
          <h3 className="font-display text-3xl text-white md:text-4xl">{cta.title}</h3>
          {cta.description ? (
            <p className="max-w-xl font-creative text-sm leading-relaxed text-white/80">
              {cta.description}
            </p>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
          <Link
            href={cta.action.href}
            target={primaryTarget}
            rel={primaryRel}
            className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#140b35] shadow-[0_16px_45px_rgba(15,12,40,0.45)] transition hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffffb3]"
          >
            {cta.action.label}
            <span>↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}