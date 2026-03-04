"use client"

import { useEffect, useState } from "react"
import { FaServer, FaCloud, FaCheckCircle, FaBell } from "react-icons/fa"

export default function Stats() {

  const stats = [
    { value: 6, suffix: "+", label: "Years Experience", icon: <FaServer /> },
    { value: 35, suffix: "%", label: "Cloud Cost Reduced", icon: <FaCloud /> },
    { value: 99.9, suffix: "%", label: "Platform Reliability", icon: <FaCheckCircle /> },
    { value: 50, suffix: "+", label: "Alerts Standardized", icon: <FaBell /> }
  ]

  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {

    const interval = setInterval(() => {

      setCounts((prev) =>
        prev.map((count, i) =>
          count < stats[i].value
            ? Number((count + stats[i].value / 40).toFixed(1))
            : stats[i].value
        )
      )

    }, 40)

    return () => clearInterval(interval)

  }, [])

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

      {stats.map((stat, i) => (

        <div
          key={stat.label}
          className="group relative bg-slate-900 border border-slate-800 rounded-xl p-7 text-center transition hover:border-indigo-500 hover:-translate-y-1 hover:shadow-xl"
        >

          {/* glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-indigo-500/10 rounded-xl"></div>

          <div className="relative">

            <div className="text-indigo-400 text-xl mb-3 flex justify-center">
              {stat.icon}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {counts[i]}{stat.suffix}
            </h2>

            <p className="text-gray-400 text-sm mt-2 tracking-wide">
              {stat.label}
            </p>

          </div>

        </div>

      ))}

    </section>
  )
}
