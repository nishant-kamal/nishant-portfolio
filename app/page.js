import Hero from "../components/Hero"
import About from "../components/About"
import Stats from "../components/Stats"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Education from "../components/Education"
import Contact from "../components/Contact"

export default function Home() {
  return (
    <main className="bg-[#020617] min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* SECTION 0: HERO (The Hook) */}
      <section id="home" className="min-h-[90vh] flex items-center justify-center border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <Hero />
        </div>
      </section>

      {/* SECTION 1: ABOUT (The Story) */}
      <section id="about" className="py-24 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <About />
        </div>
      </section>

      {/* SECTION 2: STATS (The Proof) */}
      <section id="stats" className="py-20 bg-slate-950/30">
        <div className="max-w-6xl mx-auto px-6">
          <Stats />
        </div>
      </section>

      {/* SECTION 3: SKILLS (The Toolkit) */}
      <section id="skills" className="py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Skills />
        </div>
      </section>

      {/* SECTION 4: PROJECTS (The Evidence) */}
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Projects />
        </div>
      </section>

      {/* SECTION 5: EDUCATION */}
      <section id="education" className="py-24 bg-slate-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <Education />
        </div>
      </section>

      {/* SECTION 6: CONTACT (The CTA) */}
      <section id="contact" className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <Contact />
        </div>
      </section>

    </main>
  )
}
