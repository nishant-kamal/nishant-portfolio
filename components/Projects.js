export default function Projects() {

  const projects = [
    {
      title: "Kubernetes GitOps Deployment",
      description:
        "Weather application deployed on AWS EKS using Helm and FluxCD with Prometheus monitoring."
    },
    {
      title: "AWS Cost Optimization",
      description:
        "Migrated cluster scaling from ASG to Karpenter achieving 35% EC2 cost reduction."
    },
    {
      title: "Alerting Standardization",
      description:
        "Built Helm based centralized alerting system improving monitoring consistency and MTTR."
    }
  ]

  return (
    <section id="projects" className="mt-24">

      <h2 className="text-3xl font-bold mb-10">Projects</h2>

      <div className="grid md:grid-cols-3 gap-8">

        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500 transition"
          >
            <h3 className="text-xl font-semibold">
              {project.title}
            </h3>

            <p className="text-gray-400 mt-3">
              {project.description}
            </p>
          </div>
        ))}

      </div>

    </section>
  )
}