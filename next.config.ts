import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "assets.guesty.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  experimental: {
    // Inline page CSS into the HTML response instead of a separate
    // _next/static/css/*.css request, so the first paint never depends
    // on that request succeeding (avoids unstyled-then-reload-fixes-it).
    inlineCss: true,
  },
};

export default nextConfig;
