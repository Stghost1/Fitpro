/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow builds even with ESLint warnings
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Allow builds even with TypeScript errors (we use plain JS)
  typescript: {
    ignoreBuildErrors: false,
  },

  // Performance: compress responses
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
