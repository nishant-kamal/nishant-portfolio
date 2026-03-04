import Hero from "../components/Hero"
import Stats from "../components/Stats"
import About from "../components/About"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Education from "../components/Education"
import Contact from "../components/Contact"

export default function Home() {
  return (
    <main className="bg-[#020617] min-h-screen text-white relative">
      
      {/* 1. THE HOOK: Hero Section (Bold Authority) */}
      <section id="home" className="pt-32 pb-16 border-b border-white/5 relative z-10">
        <div className="max-w-[1300px] mx-auto px-6">
          <Hero />
        </div>
      </section>

      {/* 2. THE PROOF: Stats Section (Immediate Validation)
          Gaps khatam karne ke liye Hero ke turant baad stats ko merge kiya gaya hai */}
      <section id="stats" className="py-12 bg-slate-900/40 relative z-10 border-b border-white/5">
        <div className="max-w-[1300px] mx-auto px-6">
          <Stats />
        </div>
      </section>

      {/* 3. THE IDENTITY: About Section (Bento Philosophy) */}
      <section id="about" className="py-24 border-b border-white/5 bg-[#020617]">
        <div className="max-w-[1300px] mx-auto px-6">
          <About />
        </div>
      </section>

      {/* 4. THE TOOLKIT: Technical Stack (Bento Grid) */}
      <section id="skills" className="py-24 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-[1300px] mx-auto px-6">
          <Skills />
        </div>
      </section>

      {/* 5. THE EVIDENCE: Featured Projects (Impact Focused) */}
      <section id="projects" className="py-24 border-b border-white/5 bg-[#020617]">
        <div className="max-w-[1300px] mx-auto px-6">
          <Projects />
        </div>
      </section>

      {/* 6. THE FOUNDATION: Education (JSON/Bento Style) */}
      <section id="education" className="py-24 bg-slate-900/30">
        <div className="max-w-[1300px] mx-auto px-6">
          <Education />
        </div>
      </section>

      {/* 7. THE ACTION: Contact (Direct CTA) */}
      <section id="contact" className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <Contact />
        </div>
      </section>

      {/* GLOBAL PERSISTENT BACKGROUND (Mesh & Noise)
          Pure portfolio ko ek sath tie karne ke liye ye effects zaroori hain */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.05)_0%,transparent_50%)]"></div>
      </div>
    </main>
  )
}
