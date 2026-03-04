export default function Education() {
  return (
    <section id="education" className="mt-24">
      <h2 className="text-3xl font-bold mb-10">Education</h2>

      <div className="grid md:grid-cols-3 gap-8">

        {/* M.Tech */}
        <div className="group bg-slate-900 border border-slate-800 rounded-xl p-6 transition transform hover:-translate-y-1 hover:border-indigo-500">

          <h3 className="font-semibold text-lg">
            M.Tech – Cloud Computing
          </h3>

          <p className="text-gray-400 mt-2">
            BITS Pilani
          </p>

          {/* Hidden content */}
          <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500">

            <p className="text-gray-400 mt-3">
              Focus on distributed systems, cloud infrastructure,
              and scalable platform architectures.
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Postgraduate Specialization
            </p>

          </div>

        </div>

        {/* B.Tech */}
        <div className="group bg-slate-900 border border-slate-800 rounded-xl p-6 transition transform hover:-translate-y-1 hover:border-indigo-500">

          <h3 className="font-semibold text-lg">
            B.Tech – Electrical & Electronics Engineering
          </h3>

          <p className="text-gray-400 mt-2">
            VIT University, Vellore
          </p>

          {/* Hidden content */}
          <div className="max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-500">

            <p className="text-gray-500 text-sm mt-3">
              Strong foundation in systems engineering and computing fundamentals.
            </p>

          </div>

        </div>

        {/* Certifications */}
        <div className="group bg-slate-900 border border-slate-800 rounded-xl p-6 transition transform hover:-translate-y-1 hover:border-indigo-500">

          <h3 className="font-semibold text-lg">
            Certifications & Learning
          </h3>

          {/* Hidden content */}
          <div className="max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-500">

            <p className="text-gray-400 mt-3">
              Kubernetes • AWS • DevOps • Cloud Architecture • Distributed Systems
            </p>

          </div>

        </div>

      </div>
    </section>
  )
}
