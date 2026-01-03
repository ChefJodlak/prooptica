import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  // Enable compression
  compress: true,
  
  // Generate ETags for caching
  generateEtags: true,
  
  // Powered by header - hide for security
  poweredByHeader: false,
  
  // Strict mode for better development
  reactStrictMode: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          // Cache control for static assets
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Specific cache headers for static files
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff|woff2|ttf|otf)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Allow embedding for specific pages (like maps)
      {
        source: "/salony",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
  
  // Rewrites for special files
  async rewrites() {
    return [
      // AI-friendly files in .well-known
      {
        source: "/.well-known/:path*",
        destination: "/.well-known/:path*",
      },
    ];
  },
  
  // Redirects for SEO (common misspellings, old URLs)
  async redirects() {
    return [
      // Common Polish URL patterns
      {
        source: "/badanie-wzroku",
        destination: "/oferta/badanie-wzroku",
        permanent: true,
      },
      {
        source: "/lokalizacje",
        destination: "/salony",
        permanent: true,
      },
      {
        source: "/sklep",
        destination: "/marki",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/artykuly",
        permanent: true,
      },
      {
        source: "/rezerwacja",
        destination: "/umow-wizyte",
        permanent: true,
      },
      // Trailing slash normalization
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
  
  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-tabs",
    ],
  },
};

export default nextConfig;
