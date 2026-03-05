import Hero from "../components/Hero"
import Stats from "../components/Stats"
import About from "../components/About"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Education from "../components/Education"
import Contact from "../components/Contact"

export default function Home() {
  return (
    /*
      FIX 1: Changed <main> to <div>.
      layout.js already wraps children in <main id="top" className="layout-main">.
      Having a second <main> here is invalid HTML — only one <main> is allowed per page.

      FIX 2: Removed bg-[#020617] — body background is already set globally in globals.css.
      Duplicating it here with a Tailwind arbitrary value creates two competing sources of truth.

      FIX 3: Removed all Hindi/Hinglish comments — cleaned up for production readability.
    */
    <div className="min-h-screen text-white relative">

      {/* 1. HERO — the hook */}
      {/* No wrapper div — Hero owns its own max-width, padding, and navbar offset internally */}
      <section id="home" className="border-b border-white/5 relative z-10">
        <Hero />
      </section>

      {/* 2. STATS — immediate proof */}
      <section id="stats" className="py-12 bg-slate-900/40 relative z-10 border-b border-white/5">
        <div className="max-w-[1300px] mx-auto px-6">
          <Stats />
        </div>
      </section>

      {/* 3. ABOUT — identity */}
      <section id="about" className="py-24 border-b border-white/5">
        <div className="max-w-[1300px] mx-auto px-6">
          <About />
        </div>
      </section>

      {/* 4. SKILLS — technical stack */}
      <section id="skills" className="py-24 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-[1300px] mx-auto px-6">
          <Skills />
        </div>
      </section>

      {/* 5. PROJECTS — evidence */}
      <section id="projects" className="py-24 border-b border-white/5">
        <div className="max-w-[1300px] mx-auto px-6">
          <Projects />
        </div>
      </section>

      {/* 6. EDUCATION — foundation */}
      <section id="education" className="py-24 bg-slate-900/30">
        <div className="max-w-[1300px] mx-auto px-6">
          <Education />
        </div>
      </section>

      {/* 7. CONTACT — CTA */}
      <section id="contact" className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <Contact />
        </div>
      </section>

      {/*
        FIX 4: Background grid moved to aria-hidden and z-index lowered to -1.
        Previously z-0 was allowing it to sit above some content layers during
        scroll, causing subtle click-blocking on low z-index elements.
        opacity-20 kept — subtle enough to not compete with content.
      */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.05)_0%,transparent_50%)]" />
      </div>

    </div>
  )
}
