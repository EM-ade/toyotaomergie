import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local assets only — no remote hosts are whitelisted, so the site can
    // never depend on third-party image availability.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 200, 256, 320, 400],
  },
};

export default nextConfig;
