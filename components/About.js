"use client";

import { useState, useEffect, useRef } from "react";

// FIX 1: Removed @import Google Fonts — loaded via next/font in layout.js

const tags = [
  "Kubernetes", "AWS", "Crossplane", "GitOps",
  "Prometheus", "Grafana", "Kafka", "Istio",
  "Terraform", "ArgoCD", "Observability",
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    const el = ref.current;
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); obs.disconnect(); };
  }, [threshold]);
  return [ref, inView];
}

export default function About() {
  const [sectionRef, inView] = useInView(0.05);

  return (
    // FIX 2: Removed duplicate <section id="about"> and duplicate
    // background + padding — these are set by page.js wrapper section.
    <div className="about-root" ref={sectionRef}>
      <style>{`
        .about-root {
          font-family: var(--font-sans);
          color: #f8fafc;
          padding: 20px 0 60px;
          position: relative;
          overflow: hidden;
        }

        /* Subtle noise texture */
        .about-root::after {
          content: ''; position: absolute; inset: 0;
          opacity: 0.015; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .about-inner { position: relative; z-index: 1; }

        .about-header { margin-bottom: 56px; }
        .about-title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          margin: 0 0 14px;
          color: #f8fafc;
          line-height: 1.05;
        }
        .about-title-accent { color: #a78bfa; }
        .about-subtitle-row {
          display: flex; align-items: center; gap: 12px;
        }
        .about-subtitle-line {
          width: 36px; height: 1px; background: #334155; flex-shrink: 0;
        }
        .about-subtitle-text {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }

        /* Bento grid */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
        }
        .card-identity { grid-column: span 8; }
        .card-terminal { grid-column: span 4; }
        .card-story    { grid-column: span 12; }

        @media (max-width: 1024px) {
          .card-identity,
          .card-terminal,
          .card-story { grid-column: span 12 !important; }
        }

        .bento-card {
          background: rgba(15, 23, 42, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 28px;
          padding: 36px;
          transition: border-color 0.4s, background 0.4s, opacity 0.5s, transform 0.5s;
          opacity: 0;
          transform: translateY(28px);
        }
        .bento-card.visible { opacity: 1; transform: translateY(0); }
        .bento-card:hover {
          border-color: rgba(167, 139, 250, 0.25);
          background: rgba(30, 41, 59, 0.5);
        }

        /* Identity card */
        .status-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 0.65rem;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.08);
          padding: 4px 12px; border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid rgba(34,197,94,0.15);
        }
        .pulse {
          width: 6px; height: 6px;
          background: #22c55e; border-radius: 50%;
          box-shadow: 0 0 8px #22c55e;
          animation: pulse-dot 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        /* Uses global @keyframes pulse-dot from globals.css */

        .identity-name {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800; margin: 0 0 16px; color: #fff;
          letter-spacing: -0.03em;
        }
        .identity-desc {
          font-size: 1.1rem; color: #94a3b8;
          line-height: 1.65; margin: 0 0 28px;
          max-width: 600px;
        }
        .identity-desc strong { color: #e2e8f0; font-weight: 600; }
        .identity-meta { display: flex; gap: 28px; flex-wrap: wrap; }
        .meta-item-label {
          font-family: var(--font-mono);
          font-size: 0.65rem; text-transform: uppercase;
          color: #475569; margin-bottom: 4px; letter-spacing: 0.1em;
        }
        .meta-item-value { font-size: 1rem; font-weight: 600; color: #f1f5f9; }

        /* Terminal card — no extra padding, handled by card-terminal style */
        .terminal-card-inner { padding: 0; overflow: hidden; border-radius: 28px; }
        .terminal-header {
          background: #0d1520;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; gap: 6px;
        }
        .t-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .terminal-filename {
          font-family: var(--font-mono);
          font-size: 0.62rem; color: #475569;
          margin-left: 8px; letter-spacing: 0.05em;
        }
        .terminal-body {
          padding: 24px 28px;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #a78bfa;
          line-height: 1.65;
        }
        .t-key { color: #f8fafc; }
        .t-str { color: #34d399; }
        .t-num { color: #fb923c; }

        /* Story card — FIX 3: Added responsive grid for tablet */
        .story-inner {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 44px;
        }
        @media (max-width: 768px) {
          .story-inner { grid-template-columns: 1fr; gap: 32px; }
        }

        .story-label {
          font-family: var(--font-mono);
          font-size: 0.7rem; color: #a78bfa;
          margin-bottom: 14px; letter-spacing: 0.08em;
        }
        .story-text {
          font-size: 1rem; color: #94a3b8;
          line-height: 1.8; margin: 0;
        }
        .story-text strong { color: #e2e8f0; font-weight: 600; }

        .toolbox-label {
          font-family: var(--font-mono);
          font-size: 0.7rem; color: #64748b;
          margin-bottom: 14px; letter-spacing: 0.08em;
        }
        .tag-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag-pill {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          padding: 7px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          color: #94a3b8;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
          cursor: default; user-select: none;
        }
        .tag-pill:hover {
          border-color: #a78bfa;
          color: #a78bfa;
          background: rgba(167,139,250,0.08);
        }

        /* Quote card */
        .card-quote { grid-column: span 12; }
        .quote-blockquote {
          margin: 0;
          padding: 0 0 0 24px;
          border-left: 3px solid #a78bfa;
          position: relative;
        }
        .quote-mark {
          font-size: 4rem; line-height: 1;
          color: #a78bfa; opacity: 0.2;
          font-family: Georgia, serif;
          position: absolute; top: -10px; left: -6px;
          pointer-events: none; user-select: none;
        }
        .quote-text {
          font-size: clamp(1.05rem, 2vw, 1.3rem);
          font-weight: 600; font-style: italic;
          color: #e2e8f0; line-height: 1.65;
          letter-spacing: -0.01em;
          margin: 0 0 14px;
        }
        .quote-attr {
          font-family: var(--font-mono);
          font-size: 0.68rem; color: #475569;
          letter-spacing: 0.12em; text-transform: uppercase;
        }
        .quote-attr span { color: #a78bfa; }
      `}</style>

      <div className="about-inner">
        {/* Header */}
        <div className="about-header">
          <h2 id="about-title" className="about-title">
            About <span className="about-title-accent">Me.</span>
          </h2>
          <div className="about-subtitle-row">
            <div className="about-subtitle-line" aria-hidden="true" />
            <p className="about-subtitle-text">
              Building Robust Systems &amp; Scalable Infrastructure
            </p>
          </div>
        </div>

        <div className="bento-grid">

          {/* Card 1: Identity */}
          <div
            className={`bento-card card-identity ${inView ? "visible" : ""}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="status-badge" aria-label="System status: operational">
              <div className="pulse" aria-hidden="true" />
              System Operational
            </div>
            <h3 className="identity-name">Nishant Kamal</h3>
            <p className="identity-desc">
              Site Reliability Engineer specializing in{" "}
              <strong>Control Plane architecture</strong> and high-availability
              cloud ecosystems. Focusing on the intersection of scalability and
              resilience.
            </p>
            <div className="identity-meta">
              <div>
                <div className="meta-item-label">Location</div>
                <div className="meta-item-value">Delhi, India</div>
              </div>
              <div>
                <div className="meta-item-label">Current Focus</div>
                <div className="meta-item-value">Platform Engineering</div>
              </div>
            </div>
          </div>

          {/* Card 2: Terminal */}
          <div
            className={`bento-card card-terminal ${inView ? "visible" : ""}`}
            style={{ transitionDelay: "0.2s", padding: 0 }}
          >
            <div className="terminal-card-inner">
              <div className="terminal-header" aria-hidden="true">
                <div className="t-dot" style={{ background: "#ff5f56" }} />
                <div className="t-dot" style={{ background: "#ffbd2e" }} />
                <div className="t-dot" style={{ background: "#27c93f" }} />
                <span className="terminal-filename">credentials.json</span>
              </div>
              {/* FIX 4: aria-label on terminal block so screen readers get
                  the meaningful content without reading raw JSON syntax */}
              <div
                className="terminal-body"
                aria-label="M.Tech in Cloud Computing at BITS Pilani, currently in progress, GPA A+"
              >
                <span aria-hidden="true">
                  {"{"}<br />
                  &nbsp;&nbsp;<span className="t-key">&quot;degree&quot;</span>:{" "}
                  <span className="t-str">&quot;M.Tech Cloud&quot;</span>,<br />
                  &nbsp;&nbsp;<span className="t-key">&quot;institution&quot;</span>:{" "}
                  <span className="t-str">&quot;BITS Pilani&quot;</span>,<br />
                  &nbsp;&nbsp;<span className="t-key">&quot;status&quot;</span>:{" "}
                  <span className="t-str">&quot;In_Progress&quot;</span>,<br />
                  &nbsp;&nbsp;<span className="t-key">&quot;GPA&quot;</span>:{" "}
                  <span className="t-str">&quot;A+&quot;</span><br />
                  {"}"}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Story */}
          <div
            className={`bento-card card-story ${inView ? "visible" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="story-inner">
              <div>
                <div className="story-label">&gt; CORE_PHILOSOPHY</div>
                <p className="story-text">
                  I model systems before I build them. My work focuses on{" "}
                  <strong>resiliency-first architecture</strong>. From orchestrating
                  multi-region cloud clusters to hardening infrastructure security
                  with zero-trust principles and K8s-native management.
                </p>
              </div>
              <div>
                <div className="toolbox-label">&gt; CORE_TOOLBOX</div>
                <div className="tag-pills">
                  {tags.map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Quote */}
          <div
            className={`bento-card card-quote ${inView ? "visible" : ""}`}
            style={{ transitionDelay: "0.4s" }}
          >
            <blockquote className="quote-blockquote">
              <span className="quote-mark" aria-hidden="true">&ldquo;</span>
              <p className="quote-text">
                I was never the smartest in the room — I just never left until I was.
              </p>
              <footer className="quote-attr">
                — <span>Nishant Kamal</span>
              </footer>
            </blockquote>
          </div>

        </div>
      </div>
    </div>
  );
}
