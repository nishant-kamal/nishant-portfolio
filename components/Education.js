export default function Education() {
  return (
    <section id="education" className="mt-24">
      <h2 className="text-3xl font-bold mb-10">Education</h2>

      <div className="grid md:grid-cols-3 gap-8">

        {/* M.Tech */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-lg">
            M.Tech – Cloud Computing
          </h3>

          <p className="text-gray-400 mt-2">
            Bits pilani
          </p>
          <p className="text-gray-400 mt-2">
            Focus on distributed systems, cloud infrastructure,
            and scalable platform architectures.
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Postgraduate Specialization
          </p>
        </div>

        {/* B.Tech */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-lg">
            B.Tech – Electrical & Electronics Engineering
          </h3>

          <p className="text-gray-400 mt-2">
            VIT University, Vellore
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Strong foundation in systems engineering and computing fundamentals.
          </p>
        </div>

        {/* Certifications */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-lg">
            Certifications & Learning
          </h3>

          <p className="text-gray-400 mt-2">
            Kubernetes • AWS • DevOps • Cloud Architecture • Distributed Systems
          </p>
        </div>

      </div>
    </section>
  )
}