export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">

      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        About Me
      </h2>

      <div className="group max-w-4xl bg-slate-900 border border-slate-800 rounded-xl p-8 transition-all duration-300 hover:shadow-xl">

        <p className="text-gray-300 leading-relaxed">
          I’m <span className="text-white font-semibold">Nishant Kamal</span>, a
          Site Reliability Engineer focused on building reliable and scalable
          cloud infrastructure.
        </p>

        {/* hidden content */}
        <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500 mt-5 space-y-4 text-gray-400 leading-relaxed">

          <p>
            I work extensively with Kubernetes, AWS, and distributed systems,
            ensuring production reliability during high-traffic events.
          </p>

          <p>
            My work includes GitOps with FluxCD, Helm-based deployments,
            observability with Prometheus and Grafana, and platform automation.
          </p>

          <p>
            Currently pursuing M.Tech in Cloud Computing from BITS Pilani.
          </p>

        </div>

      </div>

    </section>
  )
}
