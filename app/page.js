import Hero from "../components/Hero"
import About from "../components/About"
import Stats from "../components/Stats"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Education from "../components/Education"
import Contact from "../components/Contact"


export const metadata = {
  title: "Nishant Kamal | Site Reliability Engineer",
  description:
    "Portfolio of Nishant Kamal, a Site Reliability Engineer specializing in Kubernetes, Kafka, AWS, Terraform, and DevOps automation.",
}

export default function Home() {
  return (
    <>
      <main
        style={{
          background: "#050810",
          minHeight: "100vh",
        }}
      >
        {/* Hero — full width, no container */}
        <div className="max-w-6xl mx-auto px-6">
          <section id="home">
            <Hero />
          </section>
        </div>
        {/* About */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <section id="about">
            <About />
          </section>
        </div>
        {/* Stats — contained */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <section id="stats">
            <Stats />
          </section>
        </div>

        {/* Skills */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <section id="skills">
            <Skills />
          </section>
        </div>

        {/* Projects */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <section id="projects">
            <Projects />
          </section>
        </div>

        {/* Education */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <section id="education">
            <Education />
          </section>
        </div>

        {/* Contact */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <section id="contact">
            <Contact />
          </section>
        </div>
      </main>
    </>
  )
}
