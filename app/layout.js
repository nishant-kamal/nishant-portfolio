import "./globals.css"
import Navbar from "../components/Navbar"
import { Syne, Space_Mono } from "next/font/google"

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://nishantkamal.com"),
  title: {
    default: "Nishant Kamal | Site Reliability Engineer",
    template: "%s | Nishant Kamal",
  },
  description:
    "Portfolio of Nishant Kamal, Site Reliability Engineer with 6+ years of experience in Kubernetes, AWS, distributed systems, DevOps automation, and platform engineering.",
  keywords: [
    "Nishant Kamal",
    "Site Reliability Engineer",
    "DevOps Engineer",
    "Kubernetes",
    "AWS",
    "Terraform",
    "Kafka",
    "Platform Engineering",
  ],
  authors: [{ name: "Nishant Kamal" }],
  openGraph: {
    title: "Nishant Kamal | Site Reliability Engineer",
    description:
      "Portfolio of Nishant Kamal - Site Reliability Engineer specializing in Kubernetes, AWS, DevOps and platform engineering.",
    url: "https://nishantkamal.com",
    siteName: "Nishant Kamal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishant Kamal | Site Reliability Engineer",
    description:
      "Portfolio of Nishant Kamal - Site Reliability Engineer specializing in Kubernetes, AWS, DevOps and platform engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable}`}>
      <head>
        {/* Preconnect for font performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon / theme color */}
        <meta name="theme-color" content="#021712" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={syne.className}>

        {/* ── Ambient noise texture overlay ── */}
        <div className="layout-noise" aria-hidden="true" />

        {/* ── Corner grid accent (top-left) ── */}
        <div className="layout-corner-tl" aria-hidden="true" />

        {/* ── Navbar ── */}
        <Navbar />

        {/* ── Page content ── */}
        <main className="layout-main">
          {children}
        </main>

        {/* ── Footer line ── */}
        <footer className="layout-footer" role="contentinfo">
          <div className="layout-footer-inner">
            <span className="footer-mono">
              <span className="footer-dot" />
              nishantkamal.com
            </span>
            <span className="footer-copy">
              © {new Date().getFullYear()} — built with obsession
            </span>
            <span className="footer-mono footer-stack">
              Next.js · Tailwind · Vercel
            </span>
          </div>
        </footer>

        {/* Inline critical layout styles */}
        <style>{`
          /* ── Layout shell ── */
          .layout-main {
            min-height: 100svh;
            position: relative;
            z-index: 1;
          }

          /* ── Noise texture ── */
          .layout-noise {
            position: fixed;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            opacity: 0.032;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            background-size: 200px 200px;
            mix-blend-mode: overlay;
          }

          /* ── Top-left corner accent ── */
          .layout-corner-tl {
            position: fixed;
            top: 0; left: 0;
            width: 320px; height: 320px;
            background: radial-gradient(ellipse at top left, rgba(0,200,150,0.07) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
          }

          /* ── Footer ── */
          .layout-footer {
            position: relative;
            z-index: 10;
            border-top: 1px solid var(--border);
            background: var(--bg-surface);
            padding: 1.4rem 2rem;
          }
          .layout-footer-inner {
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 0.6rem;
          }
          .footer-mono {
            font-family: var(--font-mono);
            font-size: 0.65rem;
            letter-spacing: 0.12em;
            color: var(--text-dim);
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .footer-dot {
            display: inline-block;
            width: 5px; height: 5px;
            border-radius: 50%;
            background: var(--teal);
            opacity: 0.7;
            animation: pulse-ring 2.5s ease-in-out infinite;
          }
          .footer-copy {
            font-family: var(--font-mono);
            font-size: 0.65rem;
            letter-spacing: 0.08em;
            color: var(--text-dim);
          }
          @media (max-width: 640px) {
            .layout-footer-inner { justify-content: center; text-align: center; }
            .footer-stack { display: none; }
          }
        `}</style>
      </body>
    </html>
  )
}
