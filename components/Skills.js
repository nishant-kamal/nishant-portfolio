import {
  SiKubernetes,
  SiAmazon,
  SiApachekafka,
  SiTerraform,
  SiDocker,
  SiPrometheus,
  SiGrafana,
  SiIstio
} from "react-icons/si"

import { FaServer } from "react-icons/fa"

export default function Skills() {

  const skills = [
    { name: "Kubernetes", icon: <SiKubernetes /> },
    { name: "AWS", icon: <SiAmazon /> },
    { name: "Kafka", icon: <SiApachekafka /> },
    { name: "Debezium", icon: <FaServer /> },
    { name: "Terraform", icon: <SiTerraform /> },
    { name: "Docker", icon: <SiDocker /> },
    { name: "FluxCD", icon: <FaServer /> },
    { name: "Prometheus", icon: <SiPrometheus /> },
    { name: "Grafana", icon: <SiGrafana /> },
    { name: "Istio", icon: <SiIstio /> }
  ]

  return (
    <section id="skills" className="mt-24">

      <h2 className="text-3xl font-bold mb-12">
        Tech Stack
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        {skills.map((tech) => (
          <div
            key={tech.name}
            className="group relative bg-slate-900 border border-slate-800 rounded-xl p-6 text-center transition hover:border-indigo-500 hover:-translate-y-1"
          >

            {/* subtle glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-indigo-500/10 rounded-xl"></div>

            <div className="relative flex flex-col items-center">

              <div className="text-3xl text-indigo-400 mb-3">
                {tech.icon}
              </div>

              <p className="text-gray-300 text-sm">
                {tech.name}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}
