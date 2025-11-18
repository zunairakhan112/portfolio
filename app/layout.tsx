import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Cinzel_Decorative,
  Geist,
  Geist_Mono,
  Great_Vibes,
  Playfair_Display,
  Space_Grotesk
} from "next/font/google";
import Script from "next/script";

import "@/app/globals.css";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import {
  absoluteUrl,
  defaultKeywords,
  defaultOgImage,
  defaultSeoDescription,
  defaultSeoTitle,
  getPersonJsonLd,
  getWebsiteJsonLd,
  siteUrl
} from "@/lib/seo";

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

const websiteJsonLd = getWebsiteJsonLd();
const personJsonLd = getPersonJsonLd();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F172A" },
    { media: "(prefers-color-scheme: dark)", color: "#050B12" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: defaultSeoTitle,
    template: "%s · Zunaira Khan"
  },
  description: defaultSeoDescription,
  applicationName: "Zunaira Khan Portfolio",
  generator: "Next.js 16",
  referrer: "origin-when-cross-origin",
  creator: "Zunaira Khan",
  publisher: "Zunaira Khan",
  formatDetection: {
    email: true,
    address: false,
    telephone: false
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Zunaira Khan"
  },
  manifest: "/site.webmanifest",
  category: "portfolio",
  authors: [
    {
      name: "Zunaira Khan",
      url: "https://www.linkedin.com/in/zunaira-khan-24451b2b6/"
    }
  ],
  keywords: defaultKeywords,
  openGraph: {
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    url: siteUrl,
    siteName: "Zunaira Khan Portfolio",
    locale: "en_US",
    type: "website",
    images: [defaultOgImage]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeoTitle,
    description:
      "Explore Figma labs, Miro blueprints, motion reels, and immersive case studies crafted by Zunaira Khan.",
    images: [defaultOgImage.url]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/ZK Site Logo.png", type: "image/png", sizes: "86x80" }
    ],
    shortcut: ["/favicon.ico", "/ZK Site Logo.png"],
    apple: [{ url: "/ZK Site Logo.png", sizes: "86x80" }]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "en-US": absoluteUrl("/"),
      en: absoluteUrl("/")
    }
  },
  other: {
    "msapplication-TileColor": "#0F172A"
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
        <Script id="structured-data-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteJsonLd)}
        </Script>
        <Script id="structured-data-person" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(personJsonLd)}
        </Script>
        {/* Future integration: analytics providers or global modals can mount here */}
        <PageTransitionProvider>
          <AuroraBackground>
            {children}
            <Analytics />
            <SpeedInsights />
          </AuroraBackground>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
