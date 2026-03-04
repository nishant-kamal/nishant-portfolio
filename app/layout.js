import "./globals.css"
import Navbar from "../components/Navbar"
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

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
    description: "Engineering resilient cloud infrastructure and scalable platforms. Explore my technical stack and projects.",
    url: "https://nishantkamal.com",
    siteName: "Nishant Kamal Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Ensure you create a 1200x630px preview image
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
    creator: "@imnishant19", // Updated with your likely handle
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <meta name="theme-color" content="#020617" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={inter.className} style={{ background: '#020617', margin: 0 }}>

        {/* ── Background Noise Texture ── */}
        <div className="layout-noise" aria-hidden="true" />

        {/* ── Top-left Cyan/Purple Glow ── */}
        <div className="layout-glow-tl" aria-hidden="true" />

        {/* ── Navbar ── */}
        <Navbar />

        {/* ── Main Content ── */}
        <main className="layout-main">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer className="layout-footer" role="contentinfo">
          <div className="layout-footer-inner">
            <span className="footer-mono">
              <span className="footer-dot" />
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

        {/* ── Critical Layout Styles ── */}
        <style>{`
          .layout-main {
            min-height: 100vh;
            position: relative;
            z-index: 1;
          }

          /* Subtle digital noise to add "DevOps" texture */
          .layout-noise {
            position: fixed;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            opacity: 0.015;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            mix-blend-mode: overlay;
          }

          .layout-glow-tl {
            position: fixed;
            top: 0; left: 0;
            width: 50vw; height: 50vh;
            background: radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
          }

          .layout-footer {
            position: relative;
            z-index: 10;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            background: #020617;
            padding: 3rem 2rem;
          }

          .layout-footer-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
          }

          .footer-mono {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            letter-spacing: 0.1em;
            color: #475569;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .footer-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #8b5cf6;
            box-shadow: 0 0 10px #8b5cf6;
          }

          .footer-copy {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: #64748b;
          }

          @media (max-width: 768px) {
            .layout-footer-inner { flex-direction: column; text-align: center; gap: 1.5rem; }
            .footer-stack { display: none; }
          }
        `}</style>
      </body>
    </html>
  )
}
