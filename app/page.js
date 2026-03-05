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
          Hero owns its own max-width (1200px) + padding (100px 0 40px).
          No extra wrapper needed — section just provides the id anchor
          and bottom border separator.
      */}
      <section id="home" aria-label="Introduction" className="border-b border-white/5 relative z-10">
        <Hero />
      </section>

      {/* 2. STATS
          Stats.js renders its own .stats-wrap with internal padding and
          max-width: 1200px via .stats-inner. No wrapper div needed here.
          Keeping max-width consistent with Navbar (both 1200px).
      */}
      <section id="stats" aria-labelledby="stats-title" className="border-b border-white/5 relative z-10">
        <Stats />
      </section>

      {/* 3. ABOUT
          About.js owns padding: 20px 0 60px internally.
          max-width aligned to 1200px to match Hero/Stats/Navbar.
      */}
      <section id="about" aria-labelledby="about-title" className="border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <About />
        </div>
      </section>

      {/* 4. SKILLS
          max-width aligned to 1200px. bg-slate-900/20 kept for
          visual section separation.
      */}
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
      <section id="education" aria-labelledby="education-title" className="bg-slate-900/30">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <Education />
        </div>
      </section>

      {/* 7. CONTACT
          Narrower max-width intentional for contact form readability.
      */}
      <section id="contact" aria-labelledby="contact-title" className="py-24 relative z-10">
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
