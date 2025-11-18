   "use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { PortfolioSection } from "@/lib/content-schema";
import { cn } from "@/lib/utils";

type StoryScrollSectionType = Extract<PortfolioSection, { type: "story-scroll" }>;

interface StoryScrollSectionProps {
  section: StoryScrollSectionType;
}

const scrollEase = "cubic-bezier(0.22, 1, 0.36, 1)" as const;

export function StoryScrollSection({ section }: StoryScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const container = containerRef.current;
      const track = trackRef.current;

      if (!container || !track) {
        return () => {};
      }

      const ctx = gsap.context(() => {
        const getScrollDistance = () => Math.max(track.scrollWidth - container.clientWidth, 0);

        const horizontalTween = gsap.to(track, {
          x: () => {
            const distance = getScrollDistance();
            return distance ? -distance : 0;
          },
          ease: "none",
          scrollTrigger: {
            id: "story-horizontal",
            trigger: container,
            start: "top top",
            end: () => `+=${getScrollDistance() || 1}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        const desktopCracks = gsap.utils.toArray<SVGPathElement>("[data-kintsugi-path='desktop']");
        if (desktopCracks.length) {
          desktopCracks.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, { 
              strokeDasharray: length,
              strokeDashoffset: length
            });
          });

          const cracksTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${getScrollDistance() || 1}`,
              scrub: 1.2
            }
          });

          desktopCracks.forEach((path, index) => {
            cracksTimeline.to(
              path,
              {
                strokeDashoffset: 0,
                duration: 1,
                ease: "none"
              },
              index * 0.4
            );
          });
        }

        const slides = gsap.utils.toArray<HTMLElement>("[data-story-slide]");

        slides.forEach((slide) => {
          const content = slide.querySelector<HTMLElement>("[data-story-content]");
          const media = slide.querySelector<HTMLElement>("[data-story-media]");

          if (content) {
            gsap.fromTo(
              content,
              { x: 120, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                ease: scrollEase,
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: horizontalTween,
                  start: "left center",
                  end: "center center",
                  scrub: true
                }
              }
            );
          }

          if (media) {
            gsap.fromTo(
              media,
              { x: 160, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                ease: scrollEase,
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: horizontalTween,
                  start: "left center",
                  end: "center center",
                  scrub: true
                }
              }
            );
          }
        });
      }, container);

      return () => ctx.revert();
    });

    mm.add("(max-width: 767px)", () => {
      const mobileContainer = mobileRef.current;

      if (!mobileContainer) {
        return () => {};
      }

      const ctx = gsap.context(() => {
        const slides = gsap.utils.toArray<HTMLElement>("[data-story-slide-mobile]");

        slides.forEach((slide) => {
          const body = slide.querySelector<HTMLElement>("[data-story-content]");

          if (body) {
            gsap.fromTo(
              body,
              { y: 48, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: scrollEase,
                scrollTrigger: {
                  trigger: slide,
                  start: "top 85%"
                }
              }
            );
          }

          const cracks = Array.from(
            slide.querySelectorAll<SVGPathElement>("[data-kintsugi-path='mobile']")
          );

          if (cracks.length) {
            cracks.forEach((path) => {
              const length = path.getTotalLength();
              gsap.set(path, { 
                strokeDasharray: length,
                strokeDashoffset: length
              });

              gsap.fromTo(
                path,
                { strokeDashoffset: length },
                {
                  strokeDashoffset: 0,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: slide,
                    start: "top 80%",
                    end: "center 40%",
                    scrub: 1
                  }
                }
              );
            });
          }
        });
      }, mobileContainer);

      return () => ctx.revert();
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="relative w-full">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center md:mb-16">
        <h2 className="font-display text-3xl text-foreground md:text-4xl">
          {section.title}
        </h2>
        {section.description ? (
          <p className="text-balance font-creative text-base leading-relaxed text-foreground/70">
            {section.description}
          </p>
        ) : null}
      </div>
      <div
        ref={containerRef}
        className="relative hidden min-h-screen w-full md:block"
      >
        <div className="relative sticky top-[5.5rem] z-10 h-[calc(100vh-7rem)] overflow-hidden rounded-[3rem] border border-white/12 bg-transparent shadow-[0_40px_120px_rgba(6,8,10,0.4)] backdrop-blur-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-90"
          >
            <svg
              className="absolute -left-[12%] -top-[18%] h-[150%] w-[150%]"
              viewBox="0 0 1200 900"
              fill="none"
            >
              <defs>
                <linearGradient id="kintsugi-stroke-primary" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fce7b2" />
                  <stop offset="55%" stopColor="#f5c76f" />
                  <stop offset="100%" stopColor="#f6b76d" />
                </linearGradient>
                <filter id="kintsugi-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="soft" />
                  <feMerge>
                    <feMergeNode in="soft" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                data-kintsugi-path="desktop"
                d="M92 150C228 244 260 328 326 410C406 510 510 524 648 550C786 576 910 654 1056 780"
                stroke="url(#kintsugi-stroke-primary)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#kintsugi-glow)"
                opacity="0.95"
              />
              <path
                data-kintsugi-path="desktop"
                d="M180 -40C284 36 298 160 360 240C422 320 514 326 584 368C654 410 746 470 842 472C938 474 1038 430 1124 356"
                stroke="url(#kintsugi-stroke-primary)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
              <path
                data-kintsugi-path="desktop"
                d="M-40 662C90 634 160 592 238 520C316 448 410 430 492 458C574 486 620 552 682 600C744 648 838 700 942 712C1046 724 1170 700 1250 650"
                stroke="url(#kintsugi-stroke-primary)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
                filter="url(#kintsugi-glow)"
              />
            </svg>
            <svg
              className="absolute bottom-[-10%] right-[-15%] h-[80%] w-[60%] rotate-6"
              viewBox="0 0 600 800"
              fill="none"
            >
              <defs>
                <linearGradient id="kintsugi-stroke-secondary" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fce7b2" />
                  <stop offset="55%" stopColor="#f5c76f" />
                  <stop offset="100%" stopColor="#f2a65a" />
                </linearGradient>
              </defs>
              <path
                data-kintsugi-path="desktop"
                d="M-40 90C120 124 204 180 282 300C360 420 448 450 520 520C592 590 640 694 704 768"
                stroke="url(#kintsugi-stroke-secondary)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />
              <path
                data-kintsugi-path="desktop"
                d="M-60 350C40 330 116 312 180 360C244 408 264 492 324 552C384 612 464 636 536 666"
                stroke="url(#kintsugi-stroke-secondary)"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
            </svg>
          </div>
          <div
            ref={trackRef}
            className="flex h-full touch-pan-y"
          >
            {section.slides.map((slide, index) => (
              <div
                key={slide.id}
                data-story-slide
                className={cn(
                  "relative flex h-full w-screen flex-shrink-0 items-center justify-center px-8 py-16 lg:px-16 xl:px-24",
                  slide.background ?? "bg-gradient-to-br from-[#171923] via-[#0f1015] to-[#090b11]"
                )}
                style={
                  slide.backgroundImage
                    ? {
                        backgroundImage: `linear-gradient(135deg, rgba(11,12,18,0.85), rgba(6,7,12,0.78)), url(${slide.backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }
                    : undefined
                }
              >
                <div className="absolute inset-0 opacity-[0.28]" style={{ mixBlendMode: "screen" }}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(255,200,89,0.08),_transparent_70%)]" />
                </div>

                <div className="relative z-20 grid h-full w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.85fr)]">
                  <div data-story-content className="flex flex-col gap-6 text-left text-white">
                    <div className="flex flex-col gap-3">
                      {slide.eyebrow ? (
                        <span
                          className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/85 backdrop-blur-xl"
                          style={{
                            backgroundColor: slide.accent ?? "rgba(255,215,151,0.18)"
                          }}
                        >
                          {slide.eyebrow}
                        </span>
                      ) : null}

                      <h3 className="font-display text-3xl tracking-tight text-white drop-shadow-[0_22px_60px_rgba(7,4,18,0.35)] sm:text-4xl lg:text-[2.9rem]">
                        {slide.title}
                      </h3>
                    </div>

                    <p className="max-w-xl font-creative text-sm leading-relaxed text-white/75 sm:text-base">
                      {slide.body}
                    </p>

                    {slide.quote ? (
                      <blockquote className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-6 text-xs leading-relaxed text-white/80 backdrop-blur-3xl sm:text-sm">
                        <p className="text-sm italic text-white/90 sm:text-base">“{slide.quote.text}”</p>
                        <footer className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60">
                          {slide.quote.author}
                          {slide.quote.role ? ` · ${slide.quote.role}` : ""}
                        </footer>
                      </blockquote>
                    ) : null}

                    {slide.resource ? (
                      <div className="flex flex-col gap-2">
                        <Link
                          href={slide.resource.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 py-2 text-xs uppercase tracking-[0.4em] text-white/80 transition hover:border-white/30 hover:bg-white/15"
                        >
                          <span>{slide.resource.label}</span>
                          <span
                            aria-hidden
                            className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                          >
                            ↗
                          </span>
                        </Link>
                        {slide.resource.description ? (
                          <p className="max-w-sm text-xs leading-relaxed text-white/60">
                            {slide.resource.description}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  {slide.image ? (
                    <div
                      data-story-media
                      className="relative h-[min(60vh,520px)] w-full overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(8,9,12,0.45)] backdrop-blur-2xl"
                    >
                      <Image
                        src={slide.image.src}
                        alt={slide.image.alt}
                        fill
                        sizes="(min-width: 1280px) 640px, (min-width: 1024px) 540px, 420px"
                        priority={index === 0}
                        className="object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5" />
                      {slide.image.credit ? (
                        <span className="absolute bottom-4 right-5 rounded-full bg-black/60 px-4 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-white/70 backdrop-blur-xl">
                          {slide.image.credit.url ? (
                            <Link href={slide.image.credit.url} target="_blank" rel="noreferrer" className="hover:underline">
                              {slide.image.credit.name}
                            </Link>
                          ) : (
                            slide.image.credit.name
                          )}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={mobileRef} className="relative space-y-12 md:hidden">
        {section.slides.map((slide, index) => (
          <div
            key={`mobile-${slide.id}`}
            data-story-slide-mobile
            className="relative flex flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#171923] via-[#101118] to-[#090b11] p-8 shadow-[0_26px_80px_rgba(6,7,11,0.32)] backdrop-blur-2xl"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-90"
            >
              <svg
                className="absolute -left-[20%] top-[-30%] h-[160%] w-[160%]"
                viewBox="0 0 800 800"
                fill="none"
              >
                <defs>
                  <linearGradient id="kintsugi-mobile-stroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fce9bd" />
                    <stop offset="55%" stopColor="#f6c87a" />
                    <stop offset="100%" stopColor="#f4b97b" />
                  </linearGradient>
                  <filter id="kintsugi-mobile-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="soft" />
                    <feMerge>
                      <feMergeNode in="soft" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  data-kintsugi-path="mobile"
                  d="M20 120C160 200 240 300 320 360C400 420 480 440 560 520C640 600 720 720 780 820"
                  stroke="url(#kintsugi-mobile-stroke)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#kintsugi-mobile-glow)"
                />
                <path
                  data-kintsugi-path="mobile"
                  d="M-60 420C60 400 140 380 220 420C300 460 320 520 380 580C440 640 520 640 600 672"
                  stroke="url(#kintsugi-mobile-stroke)"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
              </svg>
            </div>
            <div data-story-content className="relative z-10 flex flex-col gap-4 text-white">
              {slide.eyebrow ? (
                <span
                  className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/85 backdrop-blur-xl"
                  style={{
                    backgroundColor: slide.accent ?? "rgba(255,215,151,0.2)"
                  }}
                >
                  {slide.eyebrow}
                </span>
              ) : null}
              <h3 className="font-display text-3xl text-white">{slide.title}</h3>
              <p className="font-creative text-base leading-relaxed text-white/70">{slide.body}</p>

              {slide.quote ? (
                <blockquote className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 backdrop-blur-3xl">
                  <p className="italic text-white/85">“{slide.quote.text}”</p>
                  <footer className="text-[0.65rem] uppercase tracking-[0.4em] text-white/60">
                    {slide.quote.author}
                    {slide.quote.role ? ` · ${slide.quote.role}` : ""}
                  </footer>
                </blockquote>
              ) : null}

              {slide.resource ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href={slide.resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-white/80"
                  >
                    <span>{slide.resource.label}</span>
                    <span aria-hidden>↗</span>
                  </Link>
                  {slide.resource.description ? (
                    <p className="text-xs leading-relaxed text-white/60">
                      {slide.resource.description}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>

            {slide.image ? (
              <div className="relative z-10 h-[320px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}


