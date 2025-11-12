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
    ]
  }
};

export default nextConfig;
