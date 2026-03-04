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
    },
    {
      title: "OCI Infrastructure with Crossplane",
      description:
        "Provisioned Oracle Cloud infrastructure using Crossplane and Kubernetes CRDs, deployed microservices, and collaborated with QA teams for sanity testing and issue resolution."
    }
  ]

  return (
    <section id="projects" className="mt-24">

      <h2 className="text-3xl font-bold mb-10">Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {projects.map((project) => (
          <div
            key={project.title}
            className="group bg-slate-900 border border-slate-800 p-6 rounded-xl transition transform hover:-translate-y-1 hover:border-indigo-500"
          >

            <h3 className="text-xl font-semibold">
              {project.title}
            </h3>

            <p className="text-gray-400 mt-3 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500">
              {project.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}
