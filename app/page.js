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

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-32">

      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Stats */}
      <section id="stats">
        <Stats />
      </section>

      {/* Skills */}
      <section id="skills">
        <Skills />
      </section>

      {/* About */}
      <section id="about">
        <About />
      </section>

      {/* Projects */}
      <section id="projects">
        <Projects />
      </section>

      {/* Education */}
      <section id="education">
        <Education />
      </section>

      {/* Contact */}
      <section id="contact">
        <Contact />
      </section>

    </main>
  )
}
