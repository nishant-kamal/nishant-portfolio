/** @type {import('next').NextConfig} */

const nextConfig = {
  /*
    FIX 1: CRITICAL — output: "export" is REMOVED.
    
    Static export breaks multiple things in this project:
    
    a) next/font (Inter, JetBrains_Mono in layout.js) does NOT work with
       output: "export". It requires a Next.js server to serve font CSS.
       This is why fonts may not be loading correctly in production.
    
    b) next/image default loader does NOT work with static export —
       it requires either a server or a custom loader config.
       Since we switched Hero.js to plain <img> this is less critical,
       but if you ever switch back to <Image> it will break silently.
    
    c) API routes (if ever added) won't work with static export.
    
    If you are deploying to Vercel (which this project is set up for),
    you do NOT need output: "export". Vercel handles Next.js natively
    with full server support. Remove this and redeploy.
    
    Only add output: "export" back if you are deploying to a plain
    static host (GitHub Pages, S3, Netlify without SSR), and even then
    you must remove next/font and replace with @import in globals.css.
  */

  /*
    FIX 2: Added image domains config.
    Even though Hero.js currently uses plain <img>, this is good practice
    and required if you ever use next/image with external sources.
  */
  images: {
    // No external domains needed — profile.png is a local /public file.
    // Add domains here if you ever load images from a CDN or external URL:
    // domains: ["cdn.example.com"],
    
    // Allow SVGs if needed for icons (disabled by default for security)
    // dangerouslyAllowSVG: true,
  },

  /*
    FIX 3: Silence the 'framer-motion' ESM warning.
    framer-motion v12 ships as ESM-only. Next.js 14 needs this to
    transpile it correctly, otherwise you may see:
    "SyntaxError: Cannot use import statement in a module"
  */
  transpilePackages: ["framer-motion"],
};

module.exports = nextConfig;
