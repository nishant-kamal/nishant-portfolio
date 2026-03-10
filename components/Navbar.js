"use client";

import { useState, useEffect, useRef } from "react";
import Resume from "./Resume";

const navItems = [
  { name: "About",      link: "#about" },
  { name: "Tech Stack", link: "#skills" },
  { name: "Projects",   link: "#projects" },
  { name: "Education",  link: "#education" },
  { name: "Awards",     link: "#awards" },
  { name: "Contact",    link: "#contact" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("");
  const [prg, setPrg]           = useState(0);

  // FIX: Ref for the mobile drawer so we can toggle the `inert` attribute.
  // aria-hidden hides content from the a11y tree but does NOT remove elements
  // from the tab order — keyboard users can still Tab into a visually-hidden
  // closed drawer. `inert` blocks both focus and pointer events entirely.
  const drawerRef = useRef(null);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    if (open) {
      el.removeAttribute("inert");
    } else {
      el.setAttribute("inert", "");
    }
  }, [open]);

  // Single rAF-throttled scroll handler
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy    = window.scrollY;
          const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          setScrolled(sy > 20);
          setPrg(total > 0 ? (sy / total) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    const ids = navItems.map((n) => n.link.slice(1)).concat(["home"]);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{`
        .skip-link {
          position: absolute;
          top: -100%;
          left: 16px;
          z-index: 200;
          background: #38bdf8;
          color: #020617;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 10px 18px;
          border-radius: 0 0 10px 10px;
          text-decoration: none;
          transition: top 0.2s;
        }
        .skip-link:focus { top: 0; }

        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          font-family: var(--font-sans, Inter, sans-serif);
          transition: background 0.4s ease, border-color 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .nav-root.scrolled {
          background: rgba(2, 6, 23, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-color: rgba(255, 255, 255, 0.05);
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 24px; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; flex-shrink: 0;
        }
        .logo-mark {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 800; color: #fff;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
          flex-shrink: 0;
        }
        .logo-text-wrap { display: flex; flex-direction: column; }
        .logo-name {
          font-size: 1rem; font-weight: 700; color: #f8fafc;
          letter-spacing: -0.02em; line-height: 1.2;
        }
        .logo-sub {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.6rem; color: #94a3b8;
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .nav-links { display: flex; align-items: center; gap: 4px; }
        @media (max-width: 850px) { .nav-links { display: none; } }

        .nav-link {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.72rem; letter-spacing: 0.06em;
          text-transform: uppercase; color: #94a3b8;
          text-decoration: none; padding: 8px 14px;
          border-radius: 8px; transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover { color: #f8fafc; background: rgba(255, 255, 255, 0.05); }
        .nav-link.active { color: #38bdf8; background: rgba(56, 189, 248, 0.06); }
        .nav-link:focus-visible { outline: 2px solid #38bdf8; outline-offset: 2px; }

        /* FIX: Removed dead .nav-resume CSS rule — class was never applied in JSX.
           Resume button is styled entirely by Resume.js .resume-btn. */

        /* Hamburger */
        .nav-burger {
          display: none; background: none; border: none;
          color: #94a3b8; padding: 8px; cursor: pointer;
          border-radius: 8px; transition: background 0.2s;
        }
        .nav-burger:hover { background: rgba(255,255,255,0.05); }
        .nav-burger:focus-visible { outline: 2px solid #38bdf8; outline-offset: 2px; }
        @media (max-width: 850px) { .nav-burger { display: block; } }

        .burger-line {
          display: block; width: 22px; height: 2px;
          background: currentColor; margin: 4px 0;
          transition: transform 0.3s, opacity 0.3s; border-radius: 2px;
        }
        .nav-burger.open .l1 { transform: translateY(6px) rotate(45deg); }
        .nav-burger.open .l2 { opacity: 0; }
        .nav-burger.open .l3 { transform: translateY(-6px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-drawer {
          position: absolute; top: 100%; left: 0; right: 0;
          background: rgba(2, 6, 23, 0.98);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          max-height: 0; opacity: 0;
          transition: max-height 0.4s ease, opacity 0.3s ease;
        }
        .mobile-drawer.open { max-height: 640px; opacity: 1; padding: 16px 0 24px; }

        /* FIX: [inert] drawer should not be interactive — pointer-events:none
           as a CSS-layer safety net (inert handles the real blocking) */
        .mobile-drawer[inert] { pointer-events: none; }

        .drawer-inner { display: flex; flex-direction: column; padding: 0 20px; gap: 4px; }
        .mobile-link {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.8rem; color: #94a3b8;
          text-decoration: none; padding: 12px 16px;
          border-radius: 10px; border: 1px solid transparent;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .mobile-link:hover { color: #f8fafc; background: rgba(255,255,255,0.04); }
        .mobile-link.active {
          background: rgba(56, 189, 248, 0.08);
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.2);
        }
        .mobile-link:focus-visible { outline: 2px solid #38bdf8; outline-offset: 2px; }

        .mobile-resume-wrap {
          margin: 12px 0 0;
        }
        .mobile-resume-wrap .resume-btn {
          margin-left: 0;
          width: 100%;
          justify-content: center;
          font-size: 0.8rem;
          padding: 12px;
          border-radius: 10px;
        }

        /* Scroll progress bar */
        .scroll-progress {
          position: absolute; bottom: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
          will-change: width;
          transition: width 0.08s linear;
        }
      `}</style>

      <a href="#top" className="skip-link">Skip to main content</a>

      <nav
        className={`nav-root ${scrolled ? "scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-inner">
          <a href="#home" className="nav-logo" aria-label="Nishant Kamal — go to top">
            <div className="logo-mark" aria-hidden="true">NK</div>
            <div className="logo-text-wrap">
              <span className="logo-name">Nishant Kamal</span>
              <span className="logo-sub">Site Reliability Engineer</span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="nav-links" role="list">
            {navItems.map((item) => (
              <li key={item.name} role="listitem" style={{ display: "contents" }}>
                <a
                  href={item.link}
                  className={`nav-link ${active === item.link.slice(1) ? "active" : ""}`}
                  aria-current={active === item.link.slice(1) ? "page" : undefined}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li style={{ display: "contents" }}><Resume /></li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`nav-burger ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="burger-line l1" aria-hidden="true" />
            <span className="burger-line l2" aria-hidden="true" />
            <span className="burger-line l3" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile drawer
            FIX: Uses ref so we can set/remove the `inert` attribute imperatively.
            `inert` prevents Tab focus from entering the drawer when closed,
            which aria-hidden alone does not do. The tabIndex={open ? 0 : -1}
            fallback on individual links is removed — inert handles everything. */}
        <div
          ref={drawerRef}
          id="mobile-drawer"
          className={`mobile-drawer ${open ? "open" : ""}`}
          aria-hidden={!open}
        >
          <div className="drawer-inner">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className={`mobile-link ${active === item.link.slice(1) ? "active" : ""}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.link.slice(1) ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
            <div className="mobile-resume-wrap">
              <Resume />
            </div>
          </div>
        </div>

        <ScrollIndicator prg={prg} />
      </nav>
    </>
  );
}

function ScrollIndicator({ prg }) {
  return <div className="scroll-progress" style={{ width: `${prg}%` }} aria-hidden="true" />;
}
