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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* next/font handles preconnect to fonts.googleapis.com automatically */}
        <meta name="theme-color" content="#020617" />
        <meta name="color-scheme" content="dark" />
      </head>

      <body className={`${inter.className} antialiased`}>

        {/* Background noise texture */}
        <div className="layout-noise" aria-hidden="true" />

        {/* Top-left purple ambient glow */}
        <div className="layout-glow-tl" aria-hidden="true" />

        {/* Navigation */}
        <Navbar />

        {/*
          FIX: This is the ONE <main> for the page. page.js previously also
          wrapped everything in <main>, which is invalid HTML — there must be
          only one <main> per document. page.js now renders a <div> instead.
        */}
        <main id="top" className="layout-main">
          {children}
        </main>

        {/*
          FIX: Footer.js was a dead file — it was never imported and layout.js
          already defined the footer inline. That dead file can be deleted.
          The year uses new Date().getFullYear() so it never needs manual updates.
        */}
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
  )
}
