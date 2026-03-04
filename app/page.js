export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Building reliable cloud infrastructure and scalable systems
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
            Site Reliability Engineer with 6+ years of experience operating
            Kubernetes platforms, building CI/CD pipelines and improving
            reliability of distributed systems.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-indigo-600 px-6 py-3 rounded-xl">
              View Projects
            </button>

            <button className="border border-gray-600 px-6 py-3 rounded-xl">
              Download Resume
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/profile.png"
            className="w-64 h-64 rounded-full object-cover"
          />
        </div>

      </section>


      {/* STATS */}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-3xl font-bold">6+</h2>
          <p className="text-gray-400">Years Experience</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-3xl font-bold">35%</h2>
          <p className="text-gray-400">Cloud Cost Reduced</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-3xl font-bold">99.9%</h2>
          <p className="text-gray-400">Platform Reliability</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-3xl font-bold">50+</h2>
          <p className="text-gray-400">Alerting Rules Standardized</p>
        </div>

      </section>


      {/* SKILLS */}

      <section className="mt-24">

        <h2 className="text-3xl font-bold mb-10">Tech Stack</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {[
            "Kubernetes",
            "AWS",
            "Kafka",
            "Debezium",
            "Terraform",
            "Docker",
            "FluxCD",
            "Prometheus",
            "Grafana",
            "Istio"
          ].map((tech) => (
            <div
              key={tech}
              className="bg-slate-900 rounded-xl p-6 text-center"
            >
              {tech}
            </div>
          ))}

        </div>

      </section>


      {/* PROJECTS */}

      <section className="mt-24">

        <h2 className="text-3xl font-bold mb-10">Projects</h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">
              Kubernetes GitOps Deployment
            </h3>
            <p className="text-gray-400 mt-3">
              Weather app deployed on AWS EKS using Helm and FluxCD with
              Prometheus monitoring.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">
              AWS Cost Optimization
            </h3>
            <p className="text-gray-400 mt-3">
              Migrated cluster scaling from ASG to Karpenter achieving
              35% EC2 cost reduction.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">
              Alerting Standardization
            </h3>
            <p className="text-gray-400 mt-3">
              Built Helm based centralized alerting system improving MTTR.
            </p>
          </div>

        </div>

      </section>


      {/* CONTACT */}

      <section className="mt-24 text-center">

        <h2 className="text-3xl font-bold">Contact</h2>

        <p className="mt-4 text-gray-400">
          nishant.kamal2015@gmail.com
        </p>

        <p className="mt-2 text-gray-400">
          github.com/imnishantdevops
        </p>

      </section>

    </main>
  )
}
