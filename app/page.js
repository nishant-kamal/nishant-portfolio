import Hero from "../components/Hero"
import Stats from "../components/Stats"
import About from "../components/About"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Education from "../components/Education"
import Awards from "../components/Awards"
import Contact from "../components/Contact"

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata = {
  title: "Nishant Kamal: SRE DevOps & Platform",
  description:
    "Nishant Kamal is a Site Reliability Engineer from Delhi, India, specialising in Control Plane architecture, Kubernetes, AWS, Crossplane, GitOps, and high-availability cloud ecosystems. M.Tech Cloud Computing at BITS Pilani.",
  keywords: [
    "Nishant Kamal",
    "nishant kamal",
    "imnishant19",
    "Site Reliability Engineer",
    "Platform Engineering",
    "Kubernetes",
    "AWS",
    "Crossplane",
    "GitOps",
    "Terraform",
    "ArgoCD",
    "Prometheus",
    "Grafana",
    "Kafka",
    "Istio",
    "BITS Pilani",
    "Cloud Computing",
    "VIT University",
    "Delhi India",
    "nishantkamal.com",
  ],
  authors: [{ name: "Nishant Kamal", url: "https://nishantkamal.com" }],

  alternates: {
    canonical: "https://nishantkamal.com",
  },

  openGraph: {
    title: "Nishant Kamal: SRE DevOps & Platform",
    description:
      "Portfolio of Nishant Kamal — SRE specialising in Control Plane architecture, Kubernetes, AWS, and cloud-native infrastructure. M.Tech Cloud at BITS Pilani.",
    url: "https://nishantkamal.com",
    siteName: "Nishant Kamal",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nishant Kamal: SRE DevOps & Platform",
    description:
      "SRE specialising in Control Plane architecture, Kubernetes, AWS, Crossplane & GitOps. M.Tech Cloud @ BITS Pilani.",
    creator: "@imnishant19",
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
  // JSON-LD: Person schema — tells Google exactly who Nishant Kamal is
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

      {/* 1. HERO */}
      <section id="home" aria-label="Introduction" className="border-b border-white/5 relative z-10">
        <Hero />
      </section>

      {/* 2. STATS */}
      <section id="stats" aria-labelledby="stats-title" className="border-b border-white/5 relative z-10">
        <Stats />
      </section>

      {/* 3. ABOUT */}
      <section id="about" aria-labelledby="about-title" className="border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <About />
        </div>
      </section>

      {/* 4. SKILLS */}
      <section id="skills" aria-labelledby="skills-title" className="border-b border-white/5 bg-slate-900/20">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Skills />
        </div>
      </section>

      {/* 5. PROJECTS */}
      <section id="projects" aria-labelledby="projects-title" className="border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Projects />
        </div>
      </section>

      {/* 6. EDUCATION */}
      <section id="education" aria-labelledby="education-title" className="border-b border-white/5 bg-slate-900/30">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Education />
        </div>
      </section>

      {/* 7. AWARDS */}
      <section id="awards" aria-labelledby="awards-title" className="border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Awards />
        </div>
      </section>

      {/* 8. CONTACT */}
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
