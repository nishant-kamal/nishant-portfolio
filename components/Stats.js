export default function Stats() {

  const stats = [
    { value: "6+", label: "Years Experience" },
    { value: "35%", label: "Cloud Cost Reduced" },
    { value: "99.9%", label: "Platform Reliability" },
    { value: "50+", label: "Alerts Standardized" }
  ]

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-slate-900 p-6 rounded-xl text-center border border-slate-800"
        >
          <h2 className="text-3xl font-bold">{stat.value}</h2>
          <p className="text-gray-400">{stat.label}</p>
        </div>
      ))}

    </section>
  )
}
