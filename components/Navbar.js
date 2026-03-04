"use client"

import { useState } from "react"

export default function Navbar() {

  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#020617] border-b border-slate-800">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-lg font-semibold">
          Nishant Kamal
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm text-gray-300 items-center">

          <a href="#about" className="hover:text-white transition">
            About
          </a>

          <a href="#skills" className="hover:text-white transition">
            Tech Stack
          </a>

          <a href="#projects" className="hover:text-white transition">
            Projects
          </a>

          <a href="#education" className="hover:text-white transition">
            Education
          </a>

          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            className="border border-slate-600 px-3 py-1 rounded-lg hover:border-white transition"
          >
            Resume
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-gray-300">

          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>

          <a href="#skills" onClick={() => setOpen(false)}>
            Tech Stack
          </a>

          <a href="#projects" onClick={() => setOpen(false)}>
            Projects
          </a>

          <a href="#education" onClick={() => setOpen(false)}>
            Education
          </a>

          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            className="border border-slate-600 px-3 py-1 rounded-lg w-fit"
          >
            Resume
          </a>

        </div>
      )}

    </nav>
  )
}
