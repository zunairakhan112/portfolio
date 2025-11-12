import type { Metadata } from "next";
import {
  Cinzel_Decorative,
  Geist,
  Geist_Mono,
  Great_Vibes,
  Playfair_Display,
  Space_Grotesk
} from "next/font/google";

import "@/app/globals.css";
import { AuroraBackground } from "@/components/visuals/aurora-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

const displaySerif = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

const creativeGrotesk = Space_Grotesk({
  variable: "--font-creative",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const cinematicTitle = Cinzel_Decorative({
  variable: "--font-cinematic",
  subsets: ["latin"],
  weight: ["400", "700", "900"]
});

const signatureScript = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zunaira-portfolio-demo.vercel.app"),
  title: {
    default: "Zunaira Khan — Immersive Designer & Growth Storyteller",
    template: "%s · Zunaira Khan"
  },
  description:
    "Next-gen portfolio for Zunaira Khan, an immersive designer and growth marketer blending design, storytelling, and emerging tech.",
  openGraph: {
    title: "Zunaira Khan — Immersive Designer & Growth Storyteller",
    description:
      "A cinematic, modular playground for showcasing experiments across Figma, Miro, motion, and 3D storytelling.",
    url: "https://zunaira-portfolio-demo.vercel.app",
    siteName: "Zunaira Khan Portfolio",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Zunaira Khan — Immersive Designer & Growth Storyteller",
    description:
      "Explore Figma labs, Miro blueprints, motion reels, and immersive case studies crafted by Zunaira Khan."
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${displaySerif.variable} ${creativeGrotesk.variable} ${cinematicTitle.variable} ${signatureScript.variable} bg-muted antialiased`}
      >
        {/* Future integration: analytics providers or global modals can mount here */}
        <AuroraBackground>
          {children}
        </AuroraBackground>
      </body>
    </html>
  );
}
