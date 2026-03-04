import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24 text-center">

      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Let’s Connect
      </h2>

      <p className="text-gray-400 mb-12 max-w-xl mx-auto">
        Let’s connect to build reliable and scalable infrastructure.
      </p>

      <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-8">

        <div className="flex justify-center gap-8 text-3xl">

          {/* GitHub */}
          <a
            href="https://github.com/nishant-kamal"
            target="_blank"
            className="text-gray-300 hover:text-white transition"
          >
            <FaGithub />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/imnishant19"
            target="_blank"
            className="text-gray-300 hover:text-white transition"
          >
            <FaLinkedin />
          </a>

        </div>

        <p className="text-gray-400 mt-8">
          New Delhi, India
        </p>

      </div>

    </section>
  )
}
