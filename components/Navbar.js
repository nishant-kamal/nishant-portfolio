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
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight active section
  useEffect(() => {
    const ids = navItems.map((n) => n.link.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .nav-root {
          position: sticky; top: 0; z-index: 50;
          font-family: 'Syne', sans-serif;
          transition: background .35s, box-shadow .35s, border-color .35s;
        }
        .nav-root.scrolled {
          background: rgba(5,8,16,.88);
          backdrop-filter: blur(18px) saturate(160%);
          box-shadow: 0 1px 0 rgba(255,255,255,.05), 0 8px 32px rgba(0,0,0,.4);
        }
        .nav-root.top {
          background: rgba(5,8,16,.0);
          backdrop-filter: blur(0px);
        }

        .nav-inner {
          max-width: 1180px; margin: 0 auto;
          padding: 0 32px;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* logo */
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .logo-mark {
          width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: .75rem; font-weight: 800; color: #fff;
          letter-spacing: -.02em;
          box-shadow: 0 0 14px rgba(56,189,248,.3);
          flex-shrink: 0;
        }
        .logo-name {
          font-size: .95rem; font-weight: 700;
          color: #f1f5f9; letter-spacing: -.01em;
          line-height: 1;
        }
        .logo-sub {
          font-family: 'DM Mono', monospace;
          font-size: .6rem; color: #475569;
          letter-spacing: .1em; text-transform: uppercase;
          margin-top: 3px;
        }

        /* desktop links */
        .nav-links {
          display: flex; align-items: center; gap: 2px;
        }
        @media (max-width: 767px) { .nav-links { display: none; } }

        .nav-link {
          position: relative;
          font-family: 'DM Mono', monospace;
          font-size: .72rem; letter-spacing: .08em;
          text-transform: uppercase;
          color: #64748b; text-decoration: none;
          padding: 6px 14px; border-radius: 8px;
          transition: color .2s, background .2s;
        }
        .nav-link:hover { color: #e2e8f0; background: rgba(255,255,255,.04); }
        .nav-link.active { color: #38bdf8; }
        .nav-link.active::after {
          content: '';
          position: absolute; bottom: -1px; left: 14px; right: 14px; height: 1px;
          background: #38bdf8;
          border-radius: 2px;
        }

        /* resume btn */
        .nav-resume {
          font-family: 'DM Mono', monospace;
          font-size: .7rem; letter-spacing: .1em; text-transform: uppercase;
          color: #38bdf8; text-decoration: none;
          border: 1px solid rgba(56,189,248,.3);
          padding: 7px 18px; border-radius: 8px;
          margin-left: 12px;
          background: rgba(56,189,248,.06);
          transition: background .2s, border-color .2s, color .2s, box-shadow .2s;
          white-space: nowrap;
        }
        .nav-resume:hover {
          background: rgba(56,189,248,.14);
          border-color: rgba(56,189,248,.6);
          box-shadow: 0 0 16px rgba(56,189,248,.15);
          color: #7dd3fc;
        }

        /* mobile burger */
        .nav-burger {
          display: none;
          background: none; border: none; cursor: pointer;
          padding: 8px; border-radius: 8px;
          color: #94a3b8;
          transition: background .2s, color .2s;
        }
        .nav-burger:hover { background: rgba(255,255,255,.05); color: #e2e8f0; }
        @media (max-width: 767px) { .nav-burger { display: flex; align-items: center; } }

        /* burger icon lines */
        .burger-box { width: 20px; height: 14px; position: relative; display: flex; flex-direction: column; justify-content: space-between; }
        .burger-line {
          display: block; height: 1.5px; border-radius: 2px;
          background: currentColor;
          transition: transform .3s ease, opacity .3s ease, width .3s ease;
          transform-origin: center;
        }
        .burger-line.l1 { width: 20px; }
        .burger-line.l2 { width: 14px; margin-left: auto; }
        .burger-line.l3 { width: 20px; }
        .open .l1 { transform: translateY(6px) rotate(45deg); width: 20px; }
        .open .l2 { opacity: 0; transform: scaleX(0); }
        .open .l3 { transform: translateY(-6px) rotate(-45deg); width: 20px; }

        /* mobile drawer */
        .mobile-drawer {
          overflow: hidden;
          transition: max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s ease;
          border-top: 1px solid transparent;
        }
        .mobile-drawer.open {
          max-height: 360px; opacity: 1;
          border-color: rgba(255,255,255,.05);
        }
        .mobile-drawer.closed { max-height: 0; opacity: 0; }

        .drawer-inner {
          padding: 20px 32px 28px;
          display: flex; flex-direction: column; gap: 4px;
        }

        .mobile-link {
          font-family: 'DM Mono', monospace;
          font-size: .75rem; letter-spacing: .1em; text-transform: uppercase;
          color: #64748b; text-decoration: none;
          padding: 10px 14px; border-radius: 8px;
          transition: background .2s, color .2s;
          border: 1px solid transparent;
        }
        .mobile-link:hover { background: rgba(255,255,255,.04); color: #e2e8f0; }
        .mobile-link.active {
          color: #38bdf8;
          background: rgba(56,189,248,.06);
          border-color: rgba(56,189,248,.15);
        }

        .mobile-resume {
          font-family: 'DM Mono', monospace;
          font-size: .72rem; letter-spacing: .1em; text-transform: uppercase;
          color: #38bdf8; text-decoration: none;
          border: 1px solid rgba(56,189,248,.3);
          padding: 10px 18px; border-radius: 8px;
          margin-top: 12px; text-align: center;
          background: rgba(56,189,248,.06);
          transition: background .2s, border-color .2s;
        }
        .mobile-resume:hover {
          background: rgba(56,189,248,.14);
          border-color: rgba(56,189,248,.5);
        }

        /* progress bar */
        .scroll-bar {
          position: absolute; bottom: 0; left: 0;
          height: 1px; background: linear-gradient(90deg, #38bdf8, #8b5cf6);
          transition: width .1s linear;
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : "top"}`}>
        <ScrollBar />
        <div className="nav-inner">
          {/* Logo */}
          <a href="#" className="nav-logo">
            <div className="logo-mark">NK</div>
            <div>
              <div className="logo-name">Nishant Kamal</div>
              <div className="logo-sub">SRE · Platform Eng</div>
            </div>
          </a>

          {/* Desktop */}
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

          {/* Mobile burger */}
          <button
            className="nav-burger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className={`burger-box ${open ? "open" : ""}`}>
              <span className="burger-line l1" />
              <span className="burger-line l2" />
              <span className="burger-line l3" />
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-drawer ${open ? "open" : "closed"}`}>
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
            <a href="/resume.pdf" target="_blank" className="mobile-resume">
              Resume ↗
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

function ScrollBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(isNaN(pct) ? 0 : pct);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="scroll-bar" style={{ width: `${width}%` }} />;
}
