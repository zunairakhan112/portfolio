import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import Link from "next/link";

import type { PortfolioContent } from "@/lib/content-schema";

interface SiteFooterProps {
  socials: PortfolioContent["socials"];
  signature: string;
}

const iconByLabel: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  Email: Mail,
  GitHub: Github,
  Telegram: Send
};

const accentByLabel: Record<string, string> = {
  LinkedIn: "hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/10",
  Email: "hover:border-[#f97316]/40 hover:bg-[#f97316]/10",
  GitHub: "hover:border-[#34d399]/40 hover:bg-[#34d399]/10",
  Telegram: "hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10"
};

const collaborationNotes = [
  "Go-to-market roadmaps that align positioning, content, and channel ops",
  "Lifecycle experiments that turn first-touch users into advocates",
  "Design systems and motion assets engineered to move metrics"
];

function formatHref(href: string) {
  if (href.startsWith("mailto:")) {
    const email = href.replace("mailto:", "");
    const domain = email.split("@")[1] ?? email;
    return domain.toUpperCase();
  }

  try {
    const url = new URL(href);
    return url.hostname.replace("www.", "");
  } catch {
    return href;
  }
}

export function SiteFooter({ socials, signature }: SiteFooterProps) {
  const primarySocial =
    socials.find((social) => social.label === "LinkedIn") ?? socials[0] ?? null;

  return (
    <footer className="mt-20 w-full bg-transparent text-white sm:mt-24 lg:mt-32">
      <div className="w-full border-t border-white/10">
        <div className="w-full px-5 py-16 sm:px-6 sm:py-20 lg:px-14 xl:px-20">
          <div className="flex w-full flex-col gap-16 sm:gap-20 lg:gap-24">
            <section className="w-full">
              <div className="flex w-full flex-col gap-6 text-center md:text-left">
                <span className="font-creative text-xs uppercase tracking-[0.45em] text-white/55">
                  Marketing • Growth • Design systems
                </span>
                <h2 className="font-display text-[clamp(1.8rem,4.8vw,3.9rem)] leading-tight text-white drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                  Let&apos;s engineer the next results generating story together.
                </h2>
                <p className="max-w-3xl font-creative text-sm leading-relaxed text-white/70 sm:text-base">
                  I build growth machines that marry market insight, creative storytelling, and disciplined experimentation.
                  Bring your GTM, lifecycle, or brand challenge\u2014I&apos;ll help you ship a system that compounds.
                </p>
                {primarySocial ? (
                  <a
                    href={primarySocial.href}
                    target={primarySocial.href.startsWith("http") ? "_blank" : undefined}
                    rel={primarySocial.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex w-full flex-col items-center justify-between gap-1.5 rounded-[2rem] border border-white/15 bg-white/[0.05] px-4 py-3.5 text-center font-creative text-[0.58rem] uppercase tracking-[0.26em] text-white/80 transition duration-300 hover:border-white/30 hover:bg-white/[0.08] sm:flex-row sm:gap-2 sm:rounded-3xl sm:px-6 sm:py-5 sm:text-left sm:text-[0.65rem] sm:tracking-[0.32em]"
                  >
                    <span className="flex items-center gap-3 text-white/90">
                      Start a conversation on {primarySocial.label}
                    </span>
                    <span className="flex items-center gap-2 text-white/60">
                      <ArrowUpRight className="h-4 w-4" />
                      {formatHref(primarySocial.href)}
                    </span>
                  </a>
                ) : null}
              </div>
            </section>

            <section className="grid w-full gap-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
              <div className="flex flex-col gap-8 rounded-[2.2rem] border border-white/12 bg-white/[0.06] p-7 shadow-[0_32px_100px_rgba(7,7,7,0.45)] backdrop-blur-xl sm:rounded-[2.6rem] sm:p-8 md:rounded-[2.8rem] md:p-10 md:backdrop-blur-2xl">
                <div className="flex flex-col gap-2.5">
                  <span className="font-creative text-[0.62rem] uppercase tracking-[0.42em] text-white/60">
                    Signature
                  </span>
                  <p className="font-display text-[clamp(1.6rem,3.2vw,2.8rem)] leading-tight text-white">
                    {signature}
                  </p>
                </div>
                <p className="max-w-xl font-creative text-sm leading-relaxed text-white/70 sm:text-base">
                  Each engagement blends strategic positioning, channel execution, and creative craft.
                  We set the metrics, design the runway, and build loops that keep customers orbiting.
                </p>
                <ul className="space-y-4">
                  {collaborationNotes.map((note, index) => (
                    <li key={note} className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 font-mono text-xs text-white/75">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-creative text-sm leading-relaxed text-white/80">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6">
                <span className="font-creative text-[0.58rem] uppercase tracking-[0.3em] text-white/50 sm:text-[0.65rem] sm:tracking-[0.38em]">
                  Signals & channels
                </span>
                <div className="grid gap-4 sm:grid-cols-2">
                  {socials.map((social) => {
                    const Icon = iconByLabel[social.label] ?? Send;
                    const accentClass = accentByLabel[social.label] ?? "hover:border-white/25 hover:bg-white/10";
                    const isExternal = social.href.startsWith("http");
                    const isEmail = social.href.startsWith("mailto:");
                    const detailClass = isEmail
                  ? "font-mono text-xs uppercase tracking-[0.3em] text-white/55"
                      : "font-mono text-xs uppercase tracking-[0.3em] text-white/55";

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className={`group flex h-full flex-col justify-between gap-4 rounded-[1.6rem] border border-white/12 bg-white/[0.03] p-3.5 transition duration-300 sm:gap-5 sm:rounded-2xl sm:p-5 ${accentClass}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-creative text-[0.55rem] uppercase tracking-[0.28em] text-white/70 sm:text-[0.65rem] sm:tracking-[0.34em]">
                            {social.label}
                          </span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85 sm:h-10 sm:w-10">
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </span>
                        </div>
                        <span className={detailClass}>
                          {formatHref(social.href)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-creative text-[0.55rem] uppercase tracking-[0.3em] text-white/45 transition duration-300 group-hover:text-white/80 sm:text-[0.6rem] sm:tracking-[0.34em]">
                          Open channel
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          <div className="mt-16 flex w-full flex-col items-center gap-3 border-t border-white/10 pt-6 text-center font-creative text-[0.6rem] uppercase tracking-[0.36em] text-white/50 sm:mt-20 sm:gap-4 sm:pt-8 sm:text-[0.65rem] sm:tracking-[0.4em] md:mt-24 md:flex-row md:justify-between md:text-left">
            <span>© {new Date().getFullYear()} Zunaira Khan — All Rights Reserved</span>
            <Link
              href="#hero"
              className="inline-flex items-center gap-2 text-white/60 transition hover:text-white/85"
            >
              Back to top
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
