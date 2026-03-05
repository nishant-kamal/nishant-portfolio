/** @type {import('next').NextConfig} */

const nextConfig = {
  // Required for GitHub Pages — generates ./out static folder
  output: "export",

  // Required when using next/image in static export mode
  images: {
    unoptimized: true,
  },

  // Uncomment these two lines ONLY if your site is served from a subpath
  // e.g. https://nishant-kamal.github.io/nishant-portfolio/
  // If you have nishantkamal.com as a custom domain on Pages, leave commented.
  // basePath: "/nishant-portfolio",
  // assetPrefix: "/nishant-portfolio/",
};

module.exports = nextConfig;
