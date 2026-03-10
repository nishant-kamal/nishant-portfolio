import dynamic from "next/dynamic"
import Hero from "../components/Hero"

// ─── Lazy-load all below-fold sections ───────────────────────────────────────
// This splits each component into its own JS chunk, loaded only when needed.
// Hero is kept eager (above-fold, critical for LCP).
const Stats     = dynamic(() => import("../components/Stats"))
const About     = dynamic(() => import("../components/About"))
const Skills    = dynamic(() => import("../components/Skills"))
const Projects  = dynamic(() => import("../components/Projects"))
const Education = dynamic(() => import("../components/Education"))
const Awards    = dynamic(() => import("../components/Awards"))
const Contact   = dynamic(() => import("../components/Contact"))

// ─── SEO Metadata — single canonical source of truth for the entire site ──────
export const metadata = {
  metadataBase: new URL("https://nishantkamal.com"),

  title: "Nishant Kamal: SRE",
  description:
    "Nishant Kamal — Site Reliability Engineer from Delhi, India, with 5+ years specialising in Control Plane architecture, Kubernetes, AWS, Crossplane, GitOps, and high-availability cloud ecosystems. M.Tech Cloud Computing at BITS Pilani.",
  keywords: [
    "Nishant Kamal",
    "nishant kamal",
    "imnishant19",
    "Site Reliability Engineer",
    "Platform Engineer",
    "Kubernetes Expert",
    "AWS Architect",
    "DevOps",
    "FinOps",
    "Crossplane",
    "GitOps",
    "Karpenter",
    "Terraform",
    "FluxCD",
    "Prometheus",
    "Grafana",
    "Kafka",
    "Istio",
    "Observability",
    "BITS Pilani Cloud M.Tech",
    "VIT University",
    "Delhi India",
    "nishantkamal.com",
  ],
  authors: [{ name: "Nishant Kamal", url: "https://nishantkamal.com" }],

  alternates: {
    canonical: "https://nishantkamal.com",
  },

  openGraph: {
    title: "Nishant Kamal: SRE",
    description:
      "Portfolio of Nishant Kamal — SRE specialising in Control Plane architecture, Kubernetes, AWS, Crossplane & GitOps. M.Tech Cloud at BITS Pilani.",
    url: "https://nishantkamal.com",
    siteName: "Nishant Kamal",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://nishantkamal.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nishant Kamal — Site Reliability Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nishant Kamal: SRE",
    description:
      "SRE specialising in Control Plane architecture, Kubernetes, AWS, Crossplane & GitOps. M.Tech Cloud @ BITS Pilani.",
    creator: "@imnishant19",
    images: ["https://nishantkamal.com/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nishant Kamal",
    url: "https://nishantkamal.com",
    image: "https://nishantkamal.com/profile.png",
    jobTitle: "Site Reliability Engineer",
    description:
      "Site Reliability Engineer specialising in Control Plane architecture and high-availability cloud ecosystems. M.Tech Cloud Computing at BITS Pilani.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "BITS Pilani",
        description: "M.Tech Cloud Computing — In Progress",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "VIT University, Vellore",
        description: "B.Tech Electrical & Electronics Engineering, 2015–2019",
      },
    ],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "CKA — Certified Kubernetes Administrator" },
      { "@type": "EducationalOccupationalCredential", name: "AWS Solutions Architect Professional" },
      { "@type": "EducationalOccupationalCredential", name: "Terraform Associate" },
    ],
    knowsAbout: [
      "Kubernetes", "AWS", "Crossplane", "GitOps",
      "Prometheus", "Grafana", "Kafka", "Istio",
      "Terraform", "ArgoCD", "FluxCD", "Helm",
      "Docker", "Karpenter", "OpenTelemetry",
      "Platform Engineering", "Site Reliability Engineering",
      "Cloud Computing", "Control Plane Architecture",
    ],
    sameAs: [
      "https://github.com/nishant-kamal",
      "https://www.linkedin.com/in/imnishant19",
      "https://x.com/imnishant19",
    ],
  }

  return (
    <div className="min-h-screen text-white relative">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO — eager, above fold */}
      <section id="home" aria-label="Introduction" className="border-b border-white/5 relative z-10">
        <Hero />
      </section>

      {/* 2–8: lazy loaded below-fold sections */}
      <section id="stats" aria-labelledby="stats-title" className="border-b border-white/5 relative z-10">
        <Stats />
      </section>

      <section id="about" aria-labelledby="about-title" className="border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <About />
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-title" className="border-b border-white/5 bg-slate-900/20">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Skills />
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-title" className="border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Projects />
        </div>
      </section>

      <section id="education" aria-labelledby="education-title" className="border-b border-white/5 bg-slate-900/30">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Education />
        </div>
      </section>

      <section id="awards" aria-labelledby="awards-title" className="border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Awards />
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <Contact />
        </div>
      </section>

      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.05)_0%,transparent_50%)]" />
      </div>

    </div>
  )
}
