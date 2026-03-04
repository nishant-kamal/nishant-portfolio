"use client"

import { useEffect, useRef, useState } from "react"
import Hero from "../components/Hero"
import Stats from "../components/Stats"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Education from "../components/Education"
import Contact from "../components/Contact"
import About from "../components/About"

export const metadata = {
  title: "Nishant | Site Reliability Engineer",
  description:
    "Portfolio of Nishant, a Site Reliability Engineer specializing in Kubernetes, Kafka, AWS, Terraform, and DevOps automation.",
}

const sections = [
  { id: "home",      label: "HOME",      symbol: "01" },
  { id: "stats",     label: "STATS",     symbol: "02" },
  { id: "skills",    label: "SKILLS",    symbol: "03" },
  { id: "about",     label: "ABOUT",     symbol: "04" },
  { id: "projects",  label: "PROJECTS",  symbol: "05" },
  { id: "education", label: "EDUCATION", symbol: "06" },
  { id: "contact",   label: "CONTACT",   symbol: "07" },
]

function SectionDivider({ index }) {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="divider-index">/{String(index).padStart(2, "0")}</span>
      <div className="divider-line" />
      <span className="divider-dot" />
    </div>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)

      // Determine active section
      for (const { id } of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top progress bar */}
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Side nav dots */}
      <nav className="side-nav" aria-label="Section navigation">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`side-nav-item ${activeSection === id ? "active" : ""}`}
            aria-label={label}
          >
            <span className="side-nav-dot" />
            <span className="side-nav-label">{label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}

function AnimatedSection({ id, children, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`animated-section ${visible ? "in-view" : ""}`}
      style={{ "--section-index": index }}
    >
      {children}
    </section>
  )
}

function GridBackground() {
  return (
    <div className="grid-bg" aria-hidden="true">
      <div className="grid-lines" />
      <div className="grid-glow-1" />
      <div className="grid-glow-2" />
      <div className="scanline" />
    </div>
  )
}

function TerminalCursor() {
  return <span className="terminal-cursor" aria-hidden="true">▋</span>
}

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {/* Global styles injected */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --bg:         #080b0f;
          --bg-surface: #0d1117;
          --bg-card:    #111820;
          --border:     #1e2d3d;
          --border-lit: #2a4060;
          --text:       #c9d8e8;
          --text-muted: #4a6580;
          --text-dim:   #2a3d52;
          --accent:     #00e5ff;
          --accent-2:   #ff6b35;
          --accent-3:   #7fff6b;
          --font-mono:  'Space Mono', monospace;
          --font-sans:  'Syne', sans-serif;
          --transition: cubic-bezier(0.16, 1, 0.3, 1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-sans);
          overflow-x: hidden;
          cursor: none;
        }

        /* ── Custom cursor ── */
        body::after {
          content: '';
          position: fixed;
          width: 8px; height: 8px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.2s;
          mix-blend-mode: screen;
        }

        /* ── Grid background ── */
        .grid-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.35;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }
        .grid-glow-1 {
          position: absolute;
          top: -20%; left: -10%;
          width: 60%; height: 60%;
          background: radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%);
          animation: drift 18s ease-in-out infinite alternate;
        }
        .grid-glow-2 {
          position: absolute;
          bottom: -20%; right: -10%;
          width: 50%; height: 50%;
          background: radial-gradient(ellipse, rgba(255,107,53,0.05) 0%, transparent 70%);
          animation: drift 24s ease-in-out infinite alternate-reverse;
        }
        .scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 4px
          );
          pointer-events: none;
        }
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(5%, 8%) scale(1.1); }
        }

        /* ── Progress bar ── */
        .progress-bar-track {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--border);
          z-index: 1000;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          transition: width 0.1s linear;
          box-shadow: 0 0 10px var(--accent);
        }

        /* ── Side nav ── */
        .side-nav {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .side-nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          cursor: none;
          flex-direction: row-reverse;
        }
        .side-nav-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--border-lit);
          transition: all 0.3s var(--transition);
          flex-shrink: 0;
        }
        .side-nav-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          opacity: 0;
          transform: translateX(8px);
          transition: all 0.3s var(--transition);
        }
        .side-nav-item:hover .side-nav-label,
        .side-nav-item.active .side-nav-label {
          opacity: 1;
          transform: translateX(0);
        }
        .side-nav-item.active .side-nav-dot {
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
          transform: scale(1.4);
        }
        .side-nav-item:hover .side-nav-dot {
          background: var(--text-muted);
        }

        /* ── Main layout ── */
        .page-root {
          position: relative;
          z-index: 1;
        }
        .page-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ── Animated sections ── */
        .animated-section {
          padding: 7rem 0;
          opacity: 0;
          transform: translateY(40px);
          transition:
            opacity 0.8s var(--transition),
            transform 0.8s var(--transition);
          transition-delay: calc(var(--section-index, 0) * 0.05s);
        }
        .animated-section.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .animated-section#home {
          padding-top: 10rem;
          padding-bottom: 6rem;
        }

        /* ── Section divider ── */
        .section-divider {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 0 0 0 0;
          opacity: 0.5;
          margin: 0 0 3.5rem 0;
        }
        .divider-index {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent);
          letter-spacing: 0.1em;
          white-space: nowrap;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--border-lit), transparent);
        }
        .divider-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--border-lit);
        }

        /* ── Terminal cursor ── */
        .terminal-cursor {
          display: inline-block;
          color: var(--accent);
          animation: blink 1.1s step-end infinite;
          margin-left: 2px;
          font-family: var(--font-mono);
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        /* ── Page mount animation ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-root {
          animation: fadeUp 0.6s var(--transition) both;
        }

        /* ── Corner decoration ── */
        .corner-tag {
          position: fixed;
          bottom: 1.8rem;
          left: 2rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          z-index: 100;
          line-height: 1.8;
        }
        .corner-tag span {
          display: block;
        }
        .corner-tag .status-dot {
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--accent-3);
          margin-right: 6px;
          vertical-align: middle;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(127,255,107,0.4); }
          50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(127,255,107,0); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .side-nav { display: none; }
          .corner-tag { display: none; }
          .page-inner { padding: 0 1.25rem; }
          .animated-section { padding: 5rem 0; }
          .animated-section#home { padding-top: 7rem; }
        }
      `}</style>

      {/* Ambient grid background */}
      <GridBackground />

      {/* Scroll progress + side navigation */}
      {mounted && <ScrollProgress />}

      {/* Bottom-left status tag */}
      <div className="corner-tag">
        <span><span className="status-dot" />AVAILABLE FOR OPPORTUNITIES</span>
        <span>SRE / DEVOPS / PLATFORM ENG</span>
      </div>

      {/* Main page */}
      <div className="page-root">
        <div className="page-inner">

          <AnimatedSection id="home" index={0}>
            <Hero />
          </AnimatedSection>

          <SectionDivider index={1} />
          <AnimatedSection id="stats" index={1}>
            <Stats />
          </AnimatedSection>

          <SectionDivider index={2} />
          <AnimatedSection id="skills" index={2}>
            <Skills />
          </AnimatedSection>

          <SectionDivider index={3} />
          <AnimatedSection id="about" index={3}>
            <About />
          </AnimatedSection>

          <SectionDivider index={4} />
          <AnimatedSection id="projects" index={4}>
            <Projects />
          </AnimatedSection>

          <SectionDivider index={5} />
          <AnimatedSection id="education" index={5}>
            <Education />
          </AnimatedSection>

          <SectionDivider index={6} />
          <AnimatedSection id="contact" index={6}>
            <Contact />
          </AnimatedSection>

        </div>
      </div>
    </>
  )
}
