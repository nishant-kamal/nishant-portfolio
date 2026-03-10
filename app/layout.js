import "./globals.css";
import Navbar from "../components/Navbar";

/*
  NOTE: All SEO metadata (title, description, openGraph, twitter, robots, keywords)
  is defined in app/page.js — the single canonical source of truth for this SPA.

  next/font is NOT used because output: "export" (GitHub Pages static export)
  is incompatible with next/font. Fonts are loaded via <link> preconnect below.
  CSS variables --font-sans / --font-mono are defined in globals.css :root.
*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#020617" />
        <meta name="color-scheme" content="dark" />

        {/* SEO FIX: author meta tag */}
        <meta name="author" content="Nishant Kamal" />

        {/*
          NOTE: JSON-LD Person schema is rendered in page.js (more complete version
          includes hasCredential, address, and full alumniOf). Removed from here
          to avoid duplicate schema blocks which can trigger Search Console warnings.
        */}

        {/*
          Font loading via Google Fonts CDN.
          Two preconnect hints tell the browser to open the connection
          early — this recovers most of the performance difference vs next/font.
          The stylesheet then loads Inter + JetBrains Mono with display=swap.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="antialiased">

        <div className="layout-noise" aria-hidden="true" />
        <div className="layout-glow-tl" aria-hidden="true" />

        <Navbar />

        <main id="top" className="layout-main">
          {children}
        </main>

        <footer className="layout-footer" role="contentinfo">
          <div className="layout-footer-inner">
            <span className="footer-mono">
              <span className="footer-dot" aria-hidden="true" />
              nishantkamal.com
            </span>
            <span className="footer-copy">
              © {new Date().getFullYear()} — Engineering Reliability
            </span>
            <span className="footer-mono footer-stack">
              Next.js · Tailwind · JetBrains Mono
            </span>
          </div>
        </footer>

      </body>
    </html>
  );
}
