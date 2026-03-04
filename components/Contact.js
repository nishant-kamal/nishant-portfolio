"use client"
import { useState } from "react"

export default function Contact() {

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true)
    }, 500)
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24 text-center">

      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Let’s Connect
      </h2>

      <p className="text-gray-400 mb-12 max-w-xl mx-auto">
        Interested in building reliable and scalable infrastructure.
      </p>

      <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-8">

        <iframe name="hidden_iframe" style={{ display: "none" }} />

        <form
          action="https://docs.google.com/forms/d/e/1FAIpQLSdFDvV17pSY1mYeHVLXUdo6su3l2jEhJTwNr4mtI-VBqMudhA/formResponse?usp=pp_url"
          method="POST"
          target="hidden_iframe"
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="entry.2005620554"
            placeholder="Name"
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
            required
          />

          <input
            name="entry.1045781291"
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
            required
          />

          <textarea
            name="entry.1065046570"
            placeholder="Message"
            rows="4"
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg w-full"
          >
            Send Message
          </button>

        </form>

        {submitted && (
          <p className="text-green-400 mt-6">
            ✅ Message sent successfully
          </p>
        )}

      </div>

    </section>
  )
}
