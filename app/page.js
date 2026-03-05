import Hero from "../components/Hero"
import Stats from "../components/Stats"
import About from "../components/About"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Education from "../components/Education"
import Contact from "../components/Contact"

export default function Home() {
  return (
    <div className="min-h-screen text-white relative">

      {/* 1. HERO
          No wrapper div — Hero owns its own max-width + padding.
          Hero uses min-height:100vh + padding:72px 0 60px internally,
          so the section itself needs no extra padding.
      */}
      <section id="home" className="border-b border-white/5 relative z-10">
        <Hero />
      </section>

      {/* 2. STATS
          VISUAL FIX: Removed bg-slate-900/40 background from section AND
          removed the max-width wrapper div. Stats.js renders its own
          .stats-wrap with internal padding. The section wrapper was creating
          a visible "card within a card" double-border effect.
          py-0 because Stats.js owns its own padding (80px top/bottom).
      */}
      <section id="stats" className="border-b border-white/5 relative z-10">
        <Stats />
      </section>

      {/* 3. ABOUT
          py-0 — About.js owns padding: 20px 0 60px internally.
          The max-width and px-6 are handled inside About.js's .about-inner.
      */}
      <section id="about" className="border-b border-white/5">
        <div className="max-w-[1300px] mx-auto px-6">
          <About />
        </div>
      </section>

      {/* 4. SKILLS */}
      <section id="skills" className="border-b border-white/5 bg-slate-900/20">
        <div className="max-w-[1300px] mx-auto px-6 py-16">
          <Skills />
        </div>
      </section>

      {/* 5. PROJECTS
          VISUAL FIX: Reduced py-24 (96px) → py-16 (64px).
          py-24 was causing a large visible gap above the heading.
      */}
      <section id="projects" className="border-b border-white/5">
        <div className="max-w-[1300px] mx-auto px-6 py-16">
          <Projects />
        </div>
      </section>

      {/* 6. EDUCATION */}
      <section id="education" className="bg-slate-900/30">
        <div className="max-w-[1300px] mx-auto px-6 py-16">
          <Education />
        </div>
      </section>

      {/* 7. CONTACT
          py-24 reduced from py-32 — no need for 128px of padding.
      */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <Contact />
        </div>
      </section>

      {/* Background grid — fixed, behind all content */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.05)_0%,transparent_50%)]" />
      </div>

    </div>
  )
}
