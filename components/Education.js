export default function Education() {
  return (
    <section id="education" className="mt-32">

      <h2 className="text-3xl md:text-4xl font-bold mb-16">
        Education
      </h2>

      <div className="relative border-l border-slate-800 pl-8 space-y-12">

        {/* M.Tech */}
        <div className="group relative">

          <span className="absolute -left-[38px] top-1 h-4 w-4 rounded-full bg-indigo-500"></span>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 transition hover:border-indigo-500 hover:shadow-lg">

            <h3 className="text-lg font-semibold">
              M.Tech – Cloud Computing
            </h3>

            <p className="text-gray-400 mt-1">
              BITS Pilani
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Postgraduate Specialization
            </p>

            <p className="text-gray-400 mt-4 opacity-0 group-hover:opacity-100 transition duration-300">
              Focus on distributed systems, cloud infrastructure,
              and scalable platform architectures.
            </p>

          </div>

        </div>

        {/* B.Tech */}
        <div className="group relative">

          <span className="absolute -left-[38px] top-1 h-4 w-4 rounded-full bg-indigo-500"></span>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 transition hover:border-indigo-500 hover:shadow-lg">

            <h3 className="text-lg font-semibold">
              B.Tech – Electrical & Electronics Engineering
            </h3>

            <p className="text-gray-400 mt-1">
              VIT University, Vellore
            </p>

            <p className="text-gray-400 mt-4 opacity-0 group-hover:opacity-100 transition duration-300">
              Strong foundation in systems engineering,
              distributed computing fundamentals and
              problem-solving.
            </p>

          </div>

        </div>

        {/* Certifications */}
        <div className="group relative">

          <span className="absolute -left-[38px] top-1 h-4 w-4 rounded-full bg-indigo-500"></span>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 transition hover:border-indigo-500 hover:shadow-lg">

            <h3 className="text-lg font-semibold">
              Certifications & Continuous Learning
            </h3>

            <p className="text-gray-400 mt-4 opacity-0 group-hover:opacity-100 transition duration-300">
              Kubernetes • AWS • DevOps • Terraform •
              Distributed Systems • Cloud Architecture
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}
