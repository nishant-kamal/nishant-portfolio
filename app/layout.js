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
    default: "Nishant Kamal | Site Reliability & Platform Engineer",
    template: "%s | Nishant Kamal",
  },
  description:
    "Expert Site Reliability Engineer with 6+ years experience and M.Tech in Cloud (BITS Pilani). Specializing in Kubernetes, AWS, and GitOps to build resilient, self-healing platforms.",
  keywords: [
    "Nishant Kamal",
    "Site Reliability Engineer",
    "Platform Engineer",
    "Kubernetes Expert",
    "AWS Architect",
    "FinOps",
    "GitOps",
    "BITS Pilani Cloud M.Tech",
  ],
  authors: [{ name: "Nishant Kamal" }],
  openGraph: {
    title: "Nishant Kamal | SRE & Platform Architect",
    description:
      "Engineering resilient cloud infrastructure and scalable platforms. Explore my technical stack and projects.",
    url: "https://nishantkamal.com",
    siteName: "Nishant Kamal Portfolio",
    locale: "en_US",
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
    title: "Nishant Kamal | Site Reliability Engineer",
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
