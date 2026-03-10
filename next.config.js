/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for GitHub Pages — generates ./out static folder
  output: "export",

  // Required when using next/image in static export mode
  images: {
    unoptimized: true,
  },

  // Disable Next.js telemetry instrumentation hook — prevents
  // @opentelemetry/api and picocolors from leaking into client bundle
  experimental: {
    instrumentationHook: false,
  },

  // Uncomment these two lines ONLY if your site is served from a subpath
  // e.g. https://nishant-kamal.github.io/nishant-portfolio/
  // basePath: "/nishant-portfolio",
  // assetPrefix: "/nishant-portfolio/",
};

module.exports = nextConfig;
