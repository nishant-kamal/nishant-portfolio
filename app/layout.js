import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#020617" />
        <meta name="color-scheme" content="dark" />
        <meta name="author" content="Nishant Kamal" />

        {/*
          DNS prefetch + preconnect for Google Fonts.
          preconnect opens the TCP+TLS connection early.
          dns-prefetch is a lighter fallback for browsers that don't support preconnect.
        */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/*
          Non-blocking font load: media="print" trick loads the stylesheet
          asynchronously — browser fetches it at low priority without blocking render.
          onload switches media to "all" so fonts apply once downloaded.
          The <noscript> fallback covers JS-disabled environments.
          This eliminates the ~1,920ms render-blocking penalty on mobile.
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
        </noscript>

        {/* Preload hero profile WebP — LCP element on most viewports */}
        <link
          rel="preload"
          href="/profile.webp"
          as="image"
          type="image/webp"
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
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> — Engineering Reliability
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
