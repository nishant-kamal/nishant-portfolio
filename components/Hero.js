import Image from "next/image"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center py-20">

      {/* LEFT SIDE */}
      <div className="max-w-xl">

        <p className="text-indigo-400 text-sm tracking-widest uppercase mb-4">
          Site Reliability Engineer
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Building scalable{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            platforms
          </span>{" "}
          and reliable cloud infrastructure
        </h1>

        <p className="mt-6 text-gray-400 text-lg leading-relaxed">
          I’m <span className="text-white font-semibold">Nishant Kamal</span>, a
          Site Reliability Engineer with 6+ years of experience designing
          resilient cloud infrastructure and operating large scale Kubernetes
          platforms.
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-3 mt-6 text-sm text-gray-300">
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">Kubernetes</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">AWS</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">Kafka</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">Terraform</span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">Observability</span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">

          <a
            href="#projects"
            className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl shadow-lg"
          >
            View Projects
          </a>

          <a
            href="/resume.pdf"
            className="border border-slate-600 hover:border-indigo-500 transition px-6 py-3 rounded-xl"
          >
            Download Resume
          </a>

        </div>

        {/* Social icons */}
        <div className="flex gap-5 mt-8 text-gray-400 text-xl">

          <a
            href="https://github.com/nishant-kamal"
            target="_blank"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/imnishant19"
            target="_blank"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>

        </div>

      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="flex justify-center md:justify-end">

        <div className="relative">

          {/* glow background */}
          <div className="absolute inset-0 bg-indigo-500 blur-[120px] opacity-20 rounded-full"></div>

          <Image
            src="/profile.png"
            alt="Nishant Kamal"
            width={400}
            height={400}
            unoptimized
            className="relative w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border border-slate-700 shadow-xl"
          />

        </div>

      </div>

    </section>
  )
}
