export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">

      <h2 className="text-3xl md:text-4xl font-bold mb-16">
        About Me
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* LEFT INFO PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">

          <p className="text-gray-300 leading-relaxed">
            I’m <span className="text-white font-semibold">Nishant Kamal</span>,
            a Site Reliability Engineer focused on designing resilient
            infrastructure and building scalable cloud platforms.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">

            <div>
              <p className="text-gray-500">Role</p>
              <p className="text-white">Site Reliability Engineer</p>
            </div>

            <div>
              <p className="text-gray-500">Experience</p>
              <p className="text-white">6+ Years</p>
            </div>

            <div>
              <p className="text-gray-500">Focus</p>
              <p className="text-white">Platform Engineering</p>
            </div>

            <div>
              <p className="text-gray-500">Location</p>
              <p className="text-white">India</p>
            </div>

          </div>

        </div>

        {/* RIGHT DESCRIPTION */}
        <div className="space-y-6 text-gray-400 leading-relaxed">

          <p>
            My work revolves around operating reliable production platforms
            built on Kubernetes and AWS. I focus on improving system stability,
            observability, and automation to ensure services remain resilient
            during high-traffic events and critical production workloads.
          </p>

          <p>
            I build and maintain cloud infrastructure using Terraform and
            GitOps workflows, enabling reproducible deployments and improving
            operational efficiency across engineering teams.
          </p>

          <p>
            My experience includes working with distributed systems,
            observability stacks such as Prometheus and Grafana, service mesh
            architectures, and event-driven platforms powered by Kafka.
          </p>

          <p>
            I am currently pursuing an M.Tech in Cloud Computing from
            BITS Pilani, further strengthening my understanding of distributed
            architectures and large-scale systems engineering.
          </p>

        </div>

      </div>

    </section>
  )
}
