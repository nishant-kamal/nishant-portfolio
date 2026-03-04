"use client";

import { useEffect, useState } from "react";

const roles = [
  "Site Reliability Engineer",
  "Platform Engineer",
  "Cloud Architect",
  "DevOps Practitioner",
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
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, mounted]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .hero-section {
          font-family: 'Inter', sans-serif;
          position: relative;
          min-height: 90vh;
          display: flex; 
          align-items: center;
          background: #020617;
          overflow: hidden;
          padding: 100px 0;
        }

        .hero-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(56,189,248,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,.04) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
        }

        .hero-blob {
          position: absolute; border-radius: 50%;
          filter: blur(120px); pointer-events: none; z-index: 0; opacity: 0.5;
        }
        .hero-blob-1 {
          width: 500px; height: 500px; top: -10%; left: -5%;
          background: radial-gradient(circle, rgba(14,165,233,.15) 0%, transparent 70%);
          animation: heroFloat 12s ease-in-out infinite alternate;
        }

        @keyframes heroFloat {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.05); }
        }

        .hero-inner {
          position: relative; z-index: 10;
          width: 100%;
          display: grid; grid-template-columns: 1.2fr 0.8fr;
          gap: 60px; align-items: center;
        }

        @media (max-width: 960px) {
          .hero-inner { grid-template-columns: 1fr; gap: 60px; text-align: center; }
          .hero-image-col { order: -1; display: flex; justify-content: center; }
          .hero-ctas, .hero-socials { justify-content: center; }
          .hero-desc { margin-left: auto; margin-right: auto; }
        }

        .hero-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: #38bdf8;
          background: rgba(56,189,248,.1);
          border: 1px solid rgba(56,189,248,.2);
          padding: 8px 16px; border-radius: 99px;
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 32px;
        }

        .hero-badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }

        .hero-h1 {
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 800; line-height: 1.1;
          letter-spacing: -0.04em; color: #f8fafc;
          margin-bottom: 24px;
        }
        .hero-h1 span {
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-typewriter {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          color: #94a3b8; font-weight: 500;
          margin-bottom: 32px; height: 1.5em;
          display: flex; align-items: center; gap: 4px;
        }
        .cursor {
          display: inline-block; width: 3px; height: 1.2em;
          background: #38bdf8; box-shadow: 0 0 10px #38bdf8;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .hero-desc {
          font-size: 1.1rem; color: #64748b; line-height: 1.8;
          max-width: 600px; margin-bottom: 48px;
        }
        .hero-desc strong { color: #f1f5f9; font-weight: 600; }

        .btn-primary {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem; font-weight: 600; letter-spacing: 0.05em;
          color: #020617; background: #f8fafc;
          padding: 16px 32px; border-radius: 12px;
          text-decoration: none; transition: all 0.3s;
        }
        .btn-primary:hover {
          background: #38bdf8; transform: translateY(-3px);
          box-shadow: 0 10px 25px -5px rgba(56,189,248,0.4);
        }

        .btn-secondary {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem; color: #94a3b8;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.03);
          padding: 16px 32px; border-radius: 12px;
          text-decoration: none; transition: all 0.3s;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,.08); color: #fff;
          border-color: rgba(255,255,255,.2); transform: translateY(-3px);
        }

        .hero-socials { display: flex; gap: 24px; margin-top: 48px; }
        .social-link {
          font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
          color: #475569; text-decoration: none; transition: all 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .social-link:hover { color: #38bdf8; transform: translateY(-2px); }

        /* Image Column Styling */
        .hero-img-wrap {
          position: relative; width: 320px; height: 320px;
        }
        .hero-img-ring {
          position: absolute; inset: -12px; border-radius: 35% 65% 70% 30% / 30% 30% 70% 70%;
          background: linear-gradient(45deg, #38bdf8, #818cf8);
          animation: morph 8s ease-in-out infinite; opacity: 0.3;
        }
        @keyframes morph {
          0%, 100% { border-radius: 35% 65% 70% 30% / 30% 30% 70% 70%; }
          50% { border-radius: 50% 50% 20% 80% / 25% 80% 20% 75%; }
        }

        .hero-img {
          position: absolute; inset: 0; border-radius: 24px;
          overflow: hidden; z-index: 1; border: 1px solid rgba(255,255,255,0.1);
          background: #0f172a;
        }

        .float-tag {
          position: absolute; z-index: 10;
          font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
          color: #fff; background: rgba(15, 23, 42, 0.8);
          border: 1px solid var(--b-clr);
          padding: 8px 16px; border-radius: 12px;
          backdrop-filter: blur(8px);
          animation: float 4s ease-in-out infinite alternate;
        }
        @keyframes float { from { transform: translateY(0); } to { transform: translateY(-10px); } }
      `}</style>

      <section className="hero-section">
        <div className="hero-grid-bg" />
        <div className="hero-blob hero-blob-1" />

        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                System Status: Ready for Production
              </div>

              <h1 className="hero-h1">
                Engineering <span>Reliability</span><br />
                at Cloud Scale.
              </h1>

              <div className="hero-typewriter">
                <span style={{ color: '#38bdf8' }}>//</span>
                <span className="ml-3">{displayed}</span>
                <span className="cursor" />
              </div>

              <p className="hero-desc">
                I'm <strong>Nishant Kamal</strong>, an SRE with <strong>6+ years</strong> 
                of experience building resilient platforms. I specialize in automating 
                the lifecycle of <strong>Kubernetes</strong> clusters and high-traffic distributed systems.
              </p>

              <div className="hero-ctas">
                <a href="#projects" className="btn-primary">Explore Work</a>
                <a href="/resume.pdf" target="_blank" className="btn-secondary">Technical Resume ↗</a>
              </div>

              <div className="hero-socials">
                <a href="https://github.com/imnishantdevops" className="social-link">GitHub</a>
                <a href="https://linkedin.com" className="social-link">LinkedIn</a>
                <a href="mailto:nishant.kamal2015@gmail.com" className="social-link">Email</a>
              </div>
            </div>

            <div className="hero-image-col">
              <div className="hero-img-wrap">
                <div className="hero-img-ring" />
                <div className="hero-img">
                  <img
                    src="/profile.png"
                    alt="Nishant Kamal"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <span className="float-tag" style={{ top: '10%', right: '-20px', '--b-clr': '#38bdf8' }}>☸ K8s</span>
                <span className="float-tag" style={{ bottom: '20%', left: '-30px', '--b-clr': '#a78bfa' }}>☁ AWS</span>
                <span className="float-tag" style={{ bottom: '5%', right: '0px', '--b-clr': '#34d399' }}>⚙ GitOps</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
