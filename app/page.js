import Hero from "../components/Hero"
import Stats from "../components/Stats"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Education from "../components/Education"
import Contact from "../components/Contact"
import About from "../components/About"
export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <Hero />

      <Stats />

      <Skills />
      <About />
      <Projects />

      <Education />

      <Contact />

    </main>
  )
}
