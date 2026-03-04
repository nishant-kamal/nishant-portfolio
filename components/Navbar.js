"use client"

import { useState } from "react"

export default function Navbar() {

  const [open, setOpen] = useState(false)

  const navItems = [
    { name: "About", link: "#about" },
    { name: "Tech Stack", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Education", link: "#education" },
    { name: "Contact", link: "#contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-[#020617]/80 border-b border-slate-800">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wide">
          Nishant Kamal
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm text-gray-300 items-center">

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="hover:text-white transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}

          {/* Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            className="border border-slate-600 px-4 py-1.5 rounded-lg hover:border-indigo-500 hover:text-white transition"
          >
            Resume
          </a>

        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-300 text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >

        <div className="px-6 pb-6 flex flex-col gap-5 text-gray-300">

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setOpen(false)}
              className="hover:text-white transition"
            >
              {item.name}
            </a>
          ))}

          <a
            href="/resume.pdf"
            target="_blank"
            className="border border-slate-600 px-4 py-2 rounded-lg w-fit hover:border-indigo-500 transition"
          >
            Resume
          </a>

        </div>

      </div>

    </nav>
  )
}
