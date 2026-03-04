"use client";

import Image from "next/image";
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .hero-section {
          font-family: 'Syne', sans-serif;
          position: relative;
          min-height: 92vh;
          display: flex; align-items: center;
          overflow: hidden;
          padding: 80px 0 60px;
        }

        /* background grid */
        .hero-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(56,189,248,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,.035) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        /* blobs */
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

        .hero-inner {
          position: relative; z-index: 1;
          width: 100%;
          display: grid; grid-template-columns: 1fr auto;
          gap: 64px; align-items: center;
        }
        @media (max-width: 768px) {
          .hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .hero-image-col { display: flex; justify-content: center; order: -1; }
        }

        /* left col */
        .hero-left { }

        .hero-badge {
          font-family: 'DM Mono', monospace;
          font-size: .68rem; letter-spacing: .18em; text-transform: uppercase;
          color: #38bdf8;
          background: rgba(56,189,248,.08);
          border: 1px solid rgba(56,189,248,.2);
          padding: 5px 14px; border-radius: 99px;
          display: inline-flex; align-items: center; gap: 8px;
          margin-bottom: 28px;
          animation: fadeUp .6s ease both;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #38bdf8;
          animation: blink 1.8s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }

        .hero-h1 {
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          font-weight: 800; line-height: 1.06;
          letter-spacing: -.025em; color: #f8fafc;
          margin-bottom: 20px;
          animation: fadeUp .7s ease .1s both;
        }
        .hero-h1 em { font-style: normal; color: #38bdf8; }

        .hero-typewriter {
          font-family: 'DM Mono', monospace;
          font-size: clamp(.9rem, 2vw, 1.1rem);
          color: #64748b; letter-spacing: .04em;
          margin-bottom: 28px; height: 28px;
          display: flex; align-items: center; gap: 2px;
          animation: fadeUp .7s ease .2s both;
        }
        .cursor {
          display: inline-block; width: 2px; height: 1.1em;
          background: #38bdf8; border-radius: 1px;
          animation: blink 1s step-end infinite;
          margin-left: 2px;
        }

        .hero-desc {
          font-size: .95rem; color: #64748b; line-height: 1.8;
          max-width: 560px; margin-bottom: 40px;
          animation: fadeUp .7s ease .3s both;
        }
        .hero-desc strong { color: #94a3b8; font-weight: 500; }

        .hero-ctas {
          display: flex; gap: 14px; flex-wrap: wrap;
          animation: fadeUp .7s ease .4s both;
        }
        .btn-primary {
          font-family: 'DM Mono', monospace;
          font-size: .75rem; letter-spacing: .1em; text-transform: uppercase;
          color: #050810; background: #38bdf8;
          padding: 12px 28px; border-radius: 10px;
          text-decoration: none;
          transition: background .2s, box-shadow .2s, transform .15s;
          font-weight: 500;
        }
        .btn-primary:hover {
          background: #7dd3fc;
          box-shadow: 0 0 24px rgba(56,189,248,.35);
          transform: translateY(-1px);
        }
        .btn-secondary {
          font-family: 'DM Mono', monospace;
          font-size: .75rem; letter-spacing: .1em; text-transform: uppercase;
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.03);
          padding: 12px 28px; border-radius: 10px;
          text-decoration: none;
          transition: border-color .2s, color .2s, transform .15s;
        }
        .btn-secondary:hover {
          border-color: rgba(255,255,255,.25); color: #e2e8f0;
          transform: translateY(-1px);
        }

        /* social links */
        .hero-socials {
          display: flex; gap: 16px; margin-top: 36px;
          animation: fadeUp .7s ease .5s both;
        }
        .social-link {
          font-family: 'DM Mono', monospace; font-size: .65rem;
          letter-spacing: .1em; text-transform: uppercase;
          color: #334155; text-decoration: none;
          display: flex; align-items: center; gap: 6px;
          transition: color .2s;
        }
        .social-link:hover { color: #38bdf8; }
        .social-link svg { width: 14px; height: 14px; }

        /* image col */
        .hero-image-col { position: relative; }

        .hero-img-wrap {
          position: relative; width: 280px; height: 280px;
          animation: fadeUp .8s ease .2s both;
        }
        @media (max-width: 768px) { .hero-img-wrap { width: 220px; height: 220px; } }

        .hero-img-ring {
          position: absolute; inset: -8px; border-radius: 50%;
          background: conic-gradient(from 0deg, #38bdf8, #8b5cf6, #38bdf8);
          animation: spin 8s linear infinite;
          opacity: .5;
        }
        .hero-img-ring-mask {
          position: absolute; inset: 3px; border-radius: 50%;
          background: #050810;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .hero-img {
          position: absolute; inset: 6px; border-radius: 50%;
          overflow: hidden; z-index: 1;
          /* required for Next.js Image fill prop */
        }
        .hero-img span,
        .hero-img img {
          border-radius: 50% !important;
        }

        /* floating tags around image */
        .float-tag {
          position: absolute; z-index: 2;
          font-family: 'DM Mono', monospace; font-size: .6rem;
          letter-spacing: .08em; color: #38bdf8;
          background: rgba(5,8,16,.9);
          border: 1px solid rgba(56,189,248,.25);
          padding: 5px 10px; border-radius: 8px;
          white-space: nowrap;
          animation: tagFloat 4s ease-in-out infinite alternate;
        }
        .ft-1 { top: 8%; right: -40px; animation-delay: 0s; }
        .ft-2 { bottom: 20%; right: -50px; animation-delay: -1.5s; color: #a78bfa; border-color: rgba(167,139,250,.25); }
        .ft-3 { bottom: 5%; left: -20px; animation-delay: -3s; color: #34d399; border-color: rgba(52,211,153,.25); }
        @keyframes tagFloat {
          from { transform: translateY(0); }
          to   { transform: translateY(-8px); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* scroll hint */
        .scroll-hint {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          animation: fadeUp 1s ease 1s both;
        }
        .scroll-line {
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, rgba(56,189,248,.4), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        .scroll-label {
          font-family: 'DM Mono', monospace; font-size: .58rem;
          color: #1e293b; letter-spacing: .15em; text-transform: uppercase;
        }
        @keyframes scrollPulse {
          0%,100% { opacity: .4; transform: scaleY(1); }
          50%      { opacity: 1;  transform: scaleY(1.1); }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-grid-bg" />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />

        <div className="hero-inner" style={{ width: "100%" }}>
          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for opportunities
            </div>

            <h1 className="hero-h1">
              Building platforms<br />
              that <em>never fail.</em>
            </h1>

            <div className="hero-typewriter">
              <span>{displayed}</span>
              <span className="cursor" />
            </div>

            <p className="hero-desc">
              I'm <strong>Nishant Kamal</strong>, a Site Reliability Engineer with{" "}
              <strong>6+ years</strong> designing resilient cloud infrastructure and
              operating large-scale <strong>Kubernetes environments</strong> on AWS.
            </p>

            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="/resume.pdf" target="_blank" className="btn-secondary">Download Resume ↗</a>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/imnishantdevops" target="_blank" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
              <a href="mailto:nishant.kamal2015@gmail.com" className="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email
              </a>
              <a href="https://linkedin.com" target="_blank" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* RIGHT — image */}
          <div className="hero-image-col">
            <div className="hero-img-wrap">
              <div className="hero-img-ring">
                <div className="hero-img-ring-mask" />
              </div>
              <div className="hero-img">
                <Image
                  src="/profile.png"
                  alt="Nishant Kamal"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <span className="float-tag ft-1">Kubernetes ☸</span>
              <span className="float-tag ft-2">AWS ⬡</span>
              <span className="float-tag ft-3">Terraform △</span>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
}
