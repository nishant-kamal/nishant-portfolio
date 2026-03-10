import "./globals.css";
import Navbar from "../components/Navbar";

/*
  REMOVED: next/font/google (Inter, JetBrains_Mono)
  
  next/font does NOT work with output: "export" (static export mode).
  This project deploys to GitHub Pages which requires static export.
  
  Fonts are now loaded via <link> preconnect + stylesheet in <head>,
  and CSS variables --font-sans / --font-mono are set in globals.css.
  All components that use var(--font-sans) and var(--font-mono) continue
  to work exactly as before — only the loading mechanism changes.
*/

export const metadata = {
  metadataBase: new URL("https://nishantkamal.com"),
  title: {
    default: "Nishant Kamal: SRE DevOps & Platform",
    template: "%s | Nishant Kamal",
  },
  // SEO FIX: Corrected "6+ years" -> "5+ years" (join date Jun 2020),
  // front-loaded name for branded search, added Karpenter + Observability keywords.
  description:
    "Nishant Kamal — Site Reliability Engineer with 5+ years building resilient Kubernetes platforms on AWS. M.Tech Cloud Computing, BITS Pilani. Specializing in GitOps, Karpenter, and Observability.",
  keywords: [
    "Nishant Kamal",
    "Site Reliability Engineer",
    "Platform Engineer",
    "Kubernetes Expert",
    "AWS Architect",
    "FinOps",
    "GitOps",
    "Karpenter",
    "Observability",
    "BITS Pilani Cloud M.Tech",
  ],
  authors: [{ name: "Nishant Kamal" }],
  openGraph: {
    title: "Nishant Kamal: SRE DevOps & Platform",
    description:
      "Engineering resilient cloud infrastructure and scalable platforms. Explore my technical stack and projects.",
    url: "https://nishantkamal.com",
    siteName: "Nishant Kamal Portfolio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nishant Kamal Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishant Kamal: SRE DevOps & Platform",
    description: "Production-ready systems and cloud-native architecture expert.",
    creator: "@imnishant19",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
              © 2026 — Engineering Reliability
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
