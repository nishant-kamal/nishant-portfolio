"use client";

import { useState, useEffect } from "react";

const navItems = [
  { name: "About",      link: "#about" },
  { name: "Tech Stack", link: "#skills" },
  { name: "Projects",   link: "#projects" },
  { name: "Education",  link: "#education" },
  { name: "Contact",    link: "#contact" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section based on scroll
  useEffect(() => {
    const ids = navItems.map((n) => n.link.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          font-family: 'Inter', sans-serif;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid transparent;
        }
        
        .nav-root.scrolled {
          background: rgba(2, 6, 23, 0.8);
          backdrop-filter: blur(12px);
          border-color: rgba(255, 255, 255, 0.05);
          padding: 4px 0;
        }

        .nav-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 24px; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* Logo Area */
        .nav-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; group;
        }
        .logo-mark {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 800; color: #fff;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
        }
        .logo-text-wrap { display: flex; flex-direction: column; }
        .logo-name {
          font-size: 1rem; font-weight: 700; color: #f8fafc;
          letter-spacing: -0.02em; line-height: 1.2;
        }
        .logo-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; color: #64748b;
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* Desktop Nav */
        .nav-links { display: flex; align-items: center; gap: 8px; }
        @media (max-width: 850px) { .nav-links { display: none; } }

        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.05em;
          text-transform: uppercase; color: #94a3b8;
          text-decoration: none; padding: 8px 16px;
          border-radius: 8px; transition: all 0.2s;
          position: relative;
        }
        .nav-link:hover { color: #f8fafc; background: rgba(255, 255, 255, 0.04); }
        .nav-link.active { color: #38bdf8; background: rgba(56, 189, 248, 0.05); }

        .nav-resume {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem; font-weight: 600;
          color: #38bdf8; text-decoration: none;
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 8px 20px; border-radius: 8px;
          margin-left: 12px; transition: all 0.3s;
        }
        .nav-resume:hover {
          background: #38bdf8; color: #020617;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
        }

        /* Mobile Controls */
        .nav-burger {
          display: none; background: none; border: none;
          color: #94a3b8; padding: 8px; cursor: pointer;
        }
        @media (max-width: 850px) { .nav-burger { display: block; } }

        .burger-line {
          display: block; width: 22px; height: 2px;
          background: currentColor; margin: 4px 0;
          transition: 0.3s; border-radius: 2px;
        }
        .open .l1 { transform: translateY(6px) rotate(45deg); }
        .open .l2 { opacity: 0; }
        .open .l3 { transform: translateY(-6px) rotate(-45deg); }

        /* Mobile Drawer */
        .mobile-drawer {
          position: absolute; top: 100%; left: 0; right: 0;
          background: #020617; border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden; transition: all 0.4s ease;
          max-height: 0; opacity: 0;
        }
        .mobile-drawer.open { max-height: 400px; opacity: 1; padding: 20px 0; }

        .drawer-inner { display: flex; flex-direction: column; padding: 0 24px; gap: 8px; }
        .mobile-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem; color: #94a3b8;
          text-decoration: none; padding: 12px;
          border-radius: 8px; border: 1px solid transparent;
        }
        .mobile-link.active { background: rgba(56, 189, 248, 0.1); color: #38bdf8; border-color: rgba(56, 189, 248, 0.2); }

        /* Progress Bar */
        .scroll-progress {
          position: absolute; bottom: 0; left: 0;
          height: 2px; background: linear-gradient(90deg, #38bdf8, #818cf8);
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
          transition: width 0.1s linear;
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <a href="#home" className="nav-logo">
            <div className="logo-mark">NK</div>
            <div className="logo-text-wrap">
              <span className="logo-name">Nishant Kamal</span>
              <span className="logo-sub">Site Reliability Engineer</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className={`nav-link ${active === item.link.slice(1) ? "active" : ""}`}
              >
                {item.name}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" className="nav-resume">
              Resume ↗
            </a>
          </div>

          {/* Mobile Burger */}
          <button className={`nav-burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
            <span className="burger-line l1"></span>
            <span className="burger-line l2"></span>
            <span className="burger-line l3"></span>
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${open ? "open" : ""}`}>
          <div className="drawer-inner">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className={`mobile-link ${active === item.link.slice(1) ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" className="nav-resume" style={{ textAlign: 'center', marginLeft: 0, marginTop: '10px' }}>
              Resume ↗
            </a>
          </div>
        </div>

        <ScrollIndicator />
      </nav>
    </>
  );
}

function ScrollIndicator() {
  const [prg, setPrg] = useState(0);
  useEffect(() => {
    const handle = () => {
      const win = window.scrollY;
      const doc = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setPrg((win / doc) * 100);
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return <div className="scroll-progress" style={{ width: `${prg}%` }} />;
}
