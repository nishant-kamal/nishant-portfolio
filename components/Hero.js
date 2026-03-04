"use client";

import { useEffect, useState } from "react";
// If you use Lucide icons, you can import them, 
// otherwise I'll use SVGs for maximum compatibility.

const roles = [
  "Site Reliability Engineer",
  "Platform Engineer",
  "Cloud Architect",
  "DevOps Engineer",
];

const socials = [
  { name: "GitHub", url: "https://github.com/nishant-kamal", icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/imnishant19", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
  { name: "Twitter", url: "https://twitter.com/imnishant19", icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.599 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
  { name: "Instagram", url: "https://instagram.com/imnishant19", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
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
          min-height: 95vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 80px 0 100px;
          background: #020617;
        }

        /* [Existing Grid and Blob CSS...] */
        .hero-grid-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(rgba(56,189,248,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.035) 1px, transparent 1px); background-size: 52px 52px; }
        .hero-blob { position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none; z-index: 0; }
        .hero-blob-1 { width: 600px; height: 600px; top: -200px; left: -150px; background: radial-gradient(circle, rgba(14,165,233,.12) 0%, transparent 70%); animation: heroFloat 14s ease-in-out infinite alternate; }
        .hero-blob-2 { width: 400px; height: 400px; bottom: -100px; right: -80px; background: radial-gradient(circle, rgba(139,92,246,.1) 0%, transparent 70%); animation: heroFloat 10s ease-in-out infinite alternate-reverse; }
        @keyframes heroFloat { from { transform: translate(0,0); } to { transform: translate(24px, 16px); } }

        .hero-inner { position: relative; z-index: 1; width: 100%; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        .hero-badge { font-family: 'DM Mono', monospace; font-size: .78rem; letter-spacing: .15em; color: #38bdf8; background: rgba(56,189,248,.08); border: 1px solid rgba(56,189,248,.2); padding: 6px 16px; border-radius: 99px; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 28px; }
        .hero-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 10px #38bdf8; animation: blink 1.8s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

        .hero-h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.05; letter-spacing: -.03em; color: #f8fafc; margin-bottom: 24px; }
        .hero-h1 em { font-style: normal; color: #38bdf8; }

        .hero-typewriter { font-family: 'DM Mono', monospace; font-size: clamp(1rem, 2vw, 1.35rem); color: #94a3b8; margin-bottom: 32px; min-height: 2em; display: flex; align-items: center; }
        .cursor { display: inline-block; width: 2px; height: 1.2em; background: #38bdf8; margin-left: 4px; animation: blink 0.8s step-end infinite; }

        .hero-desc { font-size: 1.05rem; color: #64748b; line-height: 1.8; max-width: 560px; margin-bottom: 44px; }
        .hero-desc strong { color: #cbd5e1; font-weight: 600; }

        .hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; margin-bottom: 40px; }
        
        /* Social Dock Styles */
        .social-dock {
          display: flex;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .social-link {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #64748b;
          position: relative;
        }

        .social-link:hover {
          background: rgba(56,189,248,0.1);
          border-color: rgba(56,189,248,0.4);
          color: #38bdf8;
          transform: translateY(-4px);
          box-shadow: 0 10px 20px -10px rgba(56,189,248,0.3);
        }

        .social-link svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        .social-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-10px);
          background: #38bdf8;
          color: #020617;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-weight: 700;
        }

        .social-link:hover .social-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-15px);
        }

        /* [Existing Image and Scroll Hint CSS...] */
        .btn-primary { font-family: 'DM Mono', monospace; font-size: .85rem; color: #020617; background: #38bdf8; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; transition: 0.3s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -6px rgba(56,189,248,0.5); }
        .btn-secondary { font-family: 'DM Mono', monospace; font-size: .85rem; color: #94a3b8; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03); padding: 14px 32px; border-radius: 12px; text-decoration: none; transition: 0.3s; }
        .btn-secondary:hover { background: rgba(255,255,255,.08); color: #f8fafc; }
        
        .hero-img-wrap { position: relative; width: 320px; height: 320px; }
        .hero-img-ring { position: absolute; inset: -12px; border-radius: 50%; background: conic-gradient(from 0deg, #38bdf8, #8b5cf6, #38bdf8); animation: spin 10s linear infinite; opacity: 0.6; }
        .hero-img-ring-mask { position: absolute; inset: -8px; border-radius: 50%; box-shadow: inset 0 0 0 16px #020617; z-index: 1; }
        .hero-img { position: absolute; inset: 6px; border-radius: 50%; overflow: hidden; z-index: 2; border: 4px solid #020617; }
        .hero-img img { width: 100%; height: 100%; object-fit: cover; }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        @media (max-width: 1024px) { 
           .hero-inner { grid-template-columns: 1fr; text-align: center; } 
           .hero-typewriter { justify-content: center; } 
           .hero-ctas, .social-dock { justify-content: center; }
           .hero-image-col { order: -1; }
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
              I’m <strong>Nishant Kamal</strong>, a Site Reliability Engineer with 
              <strong> 6+ years</strong> of experience designing resilient cloud platforms.
              Specializing in <strong>Kubernetes & AWS</strong>, transforming manual legacy 
              into automated self-healing systems.
            </p>

            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="/resume.pdf" download className="btn-secondary">Resume ↗</a>
            </div>

            {/* Social Links Dock */}
            <div className="social-dock">
              {socials.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  <span className="social-tooltip">TCP_CONNECT::{social.name.toUpperCase()}</span>
                  <svg viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="hero-image-col">
            <div className="hero-img-wrap">
              <div className="hero-img-ring" />
              <div className="hero-img-ring-mask" />
              <div className="hero-img">
                <img src="/profile.png" alt="Nishant Kamal" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
