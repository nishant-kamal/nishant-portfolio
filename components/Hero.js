import Image from "next/image"

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-center">

      <div>
        <h1 className="text-5xl font-bold leading-tight">
          Building scalable platforms and reliable cloud infrastructure
        </h1>

        <p className="mt-6 text-gray-400 text-lg">
          I’m Nishant Kamal, a Site Reliability Engineer with 6+ years of experience designing reliable cloud infrastructure and operating large scale Kubernetes environments.
        </p>

        <div className="mt-6 flex gap-4">
          <a
            href="#projects"
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl"
          >
            View Projects
          </a>

          <a
            href="/resume.pdf"
            className="border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-xl"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="flex justify-center">
        <Image
          src="/profile.png"
          alt="Nishant Kamal"
          width={400}
          height={400}
          className="w-80 h-80 rounded-full object-cover border border-gray-700"
        />
      </div>

    </section>
  )
}