import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "cdn.dribbble.com"
      },
      {
        protocol: "https",
        hostname: "miro.com"
      },
      {
        protocol: "https",
        hostname: "www.figma.com"
      }
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"]
    } : false,
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@vercel/analytics",
      "@vercel/speed-insights"
    ],
  },
};

export default nextConfig;
