"use client";

import { useEffect, useState } from "react";

const roles = [
  "Site Reliability Engineer",
  "Platform Engineer",
  "Cloud Architect",
  "DevOps Engineer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, mounted]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .hero-section {
          font-family: 'Syne', sans-serif;
          position: relative;
          min-height: 92vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 80px 0 100px; /* extra bottom padding for scroll hint */
          background: #020617;
        }

        .hero-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(56,189,248,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,.035) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        .hero-blob {
          position: absolute; border-radius: 50%;
          filter: blur(110px); pointer-events: none; z-index: 0;
        }
        .hero-blob-1 {
          width: 600px; height: 600px; top: -200px; left: -150px;
          background: radial-gradient(circle, rgba(14,165,233,.12) 0%, transparent 70%);
          animation: heroFloat 14s ease-in-out infinite alternate;
        }
        .hero-blob-2 {
          width: 400px; height: 400px; bottom: -100px; right: -80px;
          background: radial-gradient(circle, rgba(139,92,246,.1) 0%, transparent 70%);
          animation: heroFloat 10s ease-in-out infinite alternate-reverse;
        }

        @keyframes heroFloat {
          from { transform: translate(0,0); }
          to   { transform: translate(24px, 16px); }
        }

        /* FIX 1: hero-inner is a sibling to scroll-hint, not a container for it */
        .hero-inner {
          position: relative; z-index: 1;
          width: 100%;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 64px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr; gap: 48px; text-align: center; }
          .hero-left { display: flex; flex-direction: column; align-items: center; }
          .hero-image-col { order: -1; display: flex; justify-content: center; }
          /* FIX 2: typewriter centered on mobile explicitly */
          .hero-typewriter { justify-content: center; }
          /* FIX 3: CTA buttons centered on mobile */
          .hero-ctas { justify-content: center; }
        }

        .hero-badge {
          font-family: 'DM Mono', monospace;
          font-size: .78rem; letter-spacing: .15em; text-transform: uppercase;
          color: #38bdf8;
          background: rgba(56,189,248,.08);
          border: 1px solid rgba(56,189,248,.2);
          padding: 6px 16px; border-radius: 99px;
          display: inline-flex; align-items: center; gap: 8px;
          margin-bottom: 28px;
        }

        .hero-badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
          animation: blink 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

        .hero-h1 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800; line-height: 1.05;
          letter-spacing: -.03em; color: #f8fafc;
          margin-bottom: 24px;
        }
        .hero-h1 em { font-style: normal; color: #38bdf8; }

        /* FIX 4: explicit justify-content: flex-start (overridden to center on mobile via media query) */
        .hero-typewriter {
          font-family: 'DM Mono', monospace;
          font-size: clamp(1rem, 2vw, 1.35rem);
          color: #94a3b8;
          margin-bottom: 32px;
          min-height: 2em;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .cursor {
          display: inline-block; width: 2px; height: 1.2em;
          background: #38bdf8; margin-left: 4px;
          flex-shrink: 0;
          animation: blink 0.8s step-end infinite;
        }

        .hero-desc {
          font-size: 1.05rem; color: #64748b; line-height: 1.8;
          max-width: 560px; margin-bottom: 44px;
        }
        .hero-desc strong { color: #cbd5e1; font-weight: 600; }

        /* FIX 5: hero-ctas was missing display:flex, gap, and flex-wrap */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }

        .btn-primary {
          font-family: 'DM Mono', monospace;
          font-size: .85rem; letter-spacing: .1em; text-transform: uppercase;
          color: #020617; background: #38bdf8;
          padding: 14px 32px; border-radius: 12px;
          text-decoration: none; font-weight: 700;
          transition: background 0.3s, box-shadow 0.3s, transform 0.3s;
          white-space: nowrap;
        }
        .btn-primary:hover {
          background: #7dd3fc;
          box-shadow: 0 0 30px rgba(56,189,248,.4);
          transform: translateY(-2px);
        }

        .btn-secondary {
          font-family: 'DM Mono', monospace;
          font-size: .85rem; letter-spacing: .1em; text-transform: uppercase;
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.03);
          padding: 14px 32px; border-radius: 12px;
          text-decoration: none;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
          white-space: nowrap;
        }
        .btn-secondary:hover {
          border-color: #38bdf8; color: #38bdf8;
          background: rgba(56,189,248,.05);
        }

        /* FIX 6: image ring structure — ring, mask, and img are all siblings inside hero-img-wrap */
        .hero-img-wrap {
          position: relative; width: 320px; height: 320px;
        }
        @media (max-width: 768px) { .hero-img-wrap { width: 260px; height: 260px; } }

        .hero-img-ring {
          position: absolute; inset: -12px; border-radius: 50%;
          background: conic-gradient(from 0deg, #38bdf8, #8b5cf6, #38bdf8);
          animation: spin 10s linear infinite;
          opacity: 0.6;
        }

        /* FIX 7: mask is now a sibling, not inside the rotating ring */
        .hero-img-ring-mask {
          position: absolute; inset: -8px; border-radius: 50%;
          background: transparent;
          box-shadow: inset 0 0 0 16px #020617;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .hero-img {
          position: absolute; inset: 6px; border-radius: 50%;
          overflow: hidden; z-index: 2;
        }
        .hero-img img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        .float-tag {
          position: absolute; z-index: 5;
          font-family: 'DM Mono', monospace; font-size: .7rem;
          color: #38bdf8;
          background: rgba(2, 6, 23, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(56,189,248,.3);
          padding: 6px 12px; border-radius: 10px;
          white-space: nowrap;
          animation: tagFloat 4s ease-in-out infinite alternate;
        }
        .ft-1 { top: 8%; right: -24px; animation-delay: 0s; }
        .ft-2 { bottom: 25%; right: -40px; animation-delay: -1.5s; color: #a78bfa; border-color: rgba(167,139,250,.3); }
        .ft-3 { bottom: 8%; left: -16px; animation-delay: -3s; color: #34d399; border-color: rgba(52,211,153,.3); }

        @keyframes tagFloat {
          from { transform: translateY(0) rotate(-1.5deg); }
          to   { transform: translateY(-10px) rotate(1.5deg); }
        }

        /* FIX 8: scroll-hint is now a sibling of hero-inner, positioned relative to hero-section */
        .scroll-hint {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .scroll-hint-label {
          font-family: 'DM Mono', monospace;
          font-size: .65rem; letter-spacing: .15em; text-transform: uppercase;
          color: #334155;
        }
        .scroll-line {
          width: 1px; height: 52px;
          background: linear-gradient(to bottom, #38bdf8, transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 1; }
          49%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-grid-bg" />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />

        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              SLO_STATUS: COMPLIANT // UPTIME: 99.9%
            </div>

            <h1 className="hero-h1">
              Engineering systems <br />
              that <em>never sleep.</em>
            </h1>

            <div className="hero-typewriter">
              <span>{displayed}</span>
              <span className="cursor" />
            </div>

            <p className="hero-desc">
              I'm <strong>Nishant Kamal</strong>, a <strong>DevOps Engineer</strong> with{" "}
              <strong>6+ years</strong> of experience designing resilient cloud platforms.
              I specialize in <strong>Kubernetes, AWS infrastructure, and Cloud Native architectures</strong>,
              transforming manual workflows into automated, self-healing systems.
            </p>

            {/* FIX 5: hero-ctas now has proper flex layout */}
            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="/resume.pdf" download className="btn-secondary">Download Resume ↗</a>
            </div>
          </div>

          <div className="hero-image-col" style={{ display: "flex", justifyContent: "center" }}>
            <div className="hero-img-wrap">
              {/* FIX 6 & 7: ring, mask, and img are proper siblings */}
              <div className="hero-img-ring" />
              <div className="hero-img-ring-mask" />
              <div className="hero-img">
                <img
                  src="/profile.png"
                  alt="Nishant Kamal"
                />
              </div>
              <span className="float-tag ft-1">Kubernetes ☸</span>
              <span className="float-tag ft-2">AWS ⬡</span>
              <span className="float-tag ft-3">Terraform △</span>
            </div>
          </div>
        </div>

        {/* FIX 8: scroll-hint is a sibling of hero-inner, sits at bottom of section */}
        <div className="scroll-hint">
          <span className="scroll-hint-label">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
}
