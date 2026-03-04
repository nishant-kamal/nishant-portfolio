export default function Skills() {

  const skills = [
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
  ]

  return (
    <section id="skills" className="mt-24">

      <h2 className="text-3xl font-bold mb-10">Tech Stack</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        {skills.map((tech) => (
          <div
            key={tech}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-indigo-500 transition"
          >
            {tech}
          </div>
        ))}

      </div>

    </section>
  )
}
