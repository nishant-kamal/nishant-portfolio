export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        About Me
      </h2>

      <div className="group max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-8 transition-all duration-300 hover:shadow-xl">

        <p className="text-gray-300">
          I’m <span className="text-white font-semibold">Nishant Kamal</span>, a Site Reliability Engineer focused on building reliable and scalable cloud infrastructure.
        </p>

        {/* hidden content */}
        <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500 mt-4 space-y-4 text-gray-400">
          
          <p>
            I work extensively with Kubernetes, AWS, and distributed systems,
            ensuring production reliability during high-traffic events.
          </p>

          <p>
            My work includes GitOps with FluxCD, Helm-based deployments,
            observability with Prometheus & Grafana, and platform automation.
          </p>

          <p>
            Currently pursuing M.Tech in Cloud Computing from BITS Pilani.
          </p>

        </div>

      </div>
    </section>
  )
}
