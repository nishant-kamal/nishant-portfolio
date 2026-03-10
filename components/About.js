"use client";

import { useState, useEffect, useRef } from "react";

const tags = [
  { label: "Kubernetes",    color: "#326ce5" },
  { label: "AWS",           color: "#ff9900" },
  { label: "OCI",           color: "#f80000" },
  { label: "Crossplane",    color: "#ef4444" },
  { label: "FluxCD",        color: "#5468ff" },
  { label: "Helm",          color: "#0f1689" },
  { label: "GitOps",        color: "#a78bfa" },
  { label: "Prometheus",    color: "#e6522c" },
  { label: "Grafana",       color: "#f46800" },
  { label: "Istio",         color: "#466bb0" },
  { label: "Terraform",     color: "#7b42bc" },
  { label: "Observability", color: "#34d399" },
];

// Skill bars removed — Skills.js already covers expertise with tabs + animated bars.
// This section now shows unique career highlight stats not shown elsewhere.
const highlights = [
  { icon: "◈", value: "99.9%",  label: "Platform Uptime",       sub: "SLO-compliant delivery"       },
  { icon: "↓", value: "35%",    label: "Cloud Cost Reduction",   sub: "via Karpenter + Spot"         },
  { icon: "☸", value: "50+",    label: "Services Monitored",     sub: "Prometheus + AlertManager"    },
  { icon: "⚡", value: "-40%",   label: "MTTR Improvement",       sub: "standardised runbooks"        },
  { icon: "△", value: "7",      label: "Awards",                  sub: "over 5+ years"                },
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

function UptimeCounter() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    // FarEye join: June 2021
    const start = new Date(2021, 5, 1).getTime();
    const update = () => setSeconds(Math.floor((Date.now() - start) / 1000));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span className="uptime-ticker" aria-live="off" aria-label="Uptime counter">
      {d}<span className="uptime-unit">d</span>{" "}
      {pad(h)}<span className="uptime-unit">h</span>{" "}
      {pad(m)}<span className="uptime-unit">m</span>{" "}
      {pad(s)}<span className="uptime-unit">s</span>
    </span>
  );
}

export default function About() {
  const [sectionRef, inView] = useInView(0.05);

  return (
    <div className="ab-root" ref={sectionRef}>
      <style>{`
        /* ── Root ─────────────────────────────────────────────────────── */
        .ab-root {
          font-family: var(--font-sans);
          color: #f8fafc;
          padding: 20px 0 40px;
          position: relative;
          overflow: hidden;
        }

        /* Animated radial background glow */
        .ab-root::before {
          content: '';
          position: absolute;
          top: -200px; left: 50%;
          transform: translateX(-50%);
          width: 900px; height: 600px;
          background: radial-gradient(ellipse at center,
            rgba(167,139,250,0.07) 0%,
            rgba(99,102,241,0.04) 40%,
            transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .ab-inner { position: relative; z-index: 1; }

        /* ── Header ───────────────────────────────────────────────────── */
        .ab-header { margin-bottom: 36px; }
        .ab-title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          margin: 0 0 14px;
          color: #f8fafc;
          line-height: 1.05;
        }
        .ab-title-accent { color: #a78bfa; }
        .ab-subtitle-row { display: flex; align-items: center; gap: 12px; }
        .ab-subtitle-line { width: 36px; height: 1px; background: #334155; flex-shrink: 0; }
        .ab-subtitle-text {
          font-family: var(--font-mono);
          font-size: 0.8rem; color: #64748b;
          text-transform: uppercase; letter-spacing: 0.1em; margin: 0;
        }

        /* ── Grid ─────────────────────────────────────────────────────── */
        .ab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: auto auto auto;
          gap: 18px;
        }

        /* card placement */
        .ab-card-hero     { grid-column: 1 / 3; grid-row: 1; }
        .ab-card-creds    { grid-column: 3 / 4; grid-row: 1; }
        .ab-card-skills   { grid-column: 1 / 2; grid-row: 2; }
        .ab-card-build    { grid-column: 2 / 4; grid-row: 2; }
        .ab-card-quote    { grid-column: 1 / 4; grid-row: 3; }

        @media (max-width: 1024px) {
          .ab-grid { grid-template-columns: 1fr 1fr; }
          .ab-card-hero   { grid-column: 1 / 3; grid-row: 1; }
          .ab-card-creds  { grid-column: 1 / 3; grid-row: 2; }
          .ab-card-skills { grid-column: 1 / 2; grid-row: 3; }
          .ab-card-build  { grid-column: 2 / 3; grid-row: 3; }
          .ab-card-quote  { grid-column: 1 / 3; grid-row: 4; }
        }
        @media (max-width: 640px) {
          .ab-grid { grid-template-columns: 1fr; }
          .ab-card-hero, .ab-card-creds, .ab-card-skills,
          .ab-card-build, .ab-card-quote { grid-column: 1; grid-row: auto; }
        }

        /* ── Base card ────────────────────────────────────────────────── */
        .ab-card {
          background: rgba(10, 18, 36, 0.5);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 24px;
          padding: 24px;
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.55s ease,
            transform 0.55s ease,
            border-color 0.3s,
            background 0.3s,
            box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        .ab-card.visible { opacity: 1; transform: translateY(0); }
        .ab-card:hover {
          border-color: rgba(167,139,250,0.2);
          background: rgba(20, 30, 56, 0.6);
          box-shadow: 0 0 0 1px rgba(167,139,250,0.08),
                      0 24px 64px rgba(0,0,0,0.35);
        }

        /* card inner glow on hover */
        .ab-card::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%),
            rgba(167,139,250,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .ab-card:hover::after { opacity: 1; }

        /* ── Hero card ────────────────────────────────────────────────── */
        .status-row {
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 8px;
          margin-bottom: 14px;
        }
        .status-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 0.65rem;
          color: #22c55e;
          background: rgba(34,197,94,0.08);
          padding: 5px 14px; border-radius: 999px;
          border: 1px solid rgba(34,197,94,0.2);
          letter-spacing: 0.05em;
        }
        .pulse {
          width: 6px; height: 6px;
          background: #22c55e; border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.5);
          animation: pulse-ring 2s ease-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70%  { box-shadow: 0 0 0 7px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }

        .uptime-badge {
          font-family: var(--font-mono); font-size: 0.65rem;
          color: #475569; letter-spacing: 0.04em;
        }
        .uptime-label { color: #334155; margin-right: 6px; text-transform: uppercase; letter-spacing: 0.1em; }
        .uptime-ticker { color: #a78bfa; font-variant-numeric: tabular-nums; }
        .uptime-unit { color: #475569; font-size: 0.6rem; margin-left: 1px; }

        .hero-name {
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 800; margin: 0 0 8px; color: #fff;
          letter-spacing: -0.035em; line-height: 1.1;
        }
        .hero-role {
          font-family: var(--font-mono);
          font-size: 0.8rem; color: #a78bfa;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin: 0 0 10px;
        }
        .hero-desc {
          font-size: 1.05rem; color: #94a3b8;
          line-height: 1.7; margin: 0 0 20px;
        }
        .hero-desc strong { color: #e2e8f0; font-weight: 600; }

        .meta-row { display: flex; gap: 20px; flex-wrap: wrap; }
        .meta-chip {
          display: flex; flex-direction: column; gap: 4px;
        }
        .meta-chip-label {
          font-family: var(--font-mono);
          font-size: 0.6rem; text-transform: uppercase;
          letter-spacing: 0.12em; color: #334155;
        }
        .meta-chip-value {
          font-size: 0.95rem; font-weight: 700;
          color: #f1f5f9;
        }
        .meta-chip-value.accent { color: #a78bfa; }

        /* tag pills */
        .tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .tag-pill {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          padding: 5px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          color: #64748b;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          cursor: default; user-select: none;
          position: relative;
        }
        .tag-pill:hover {
          border-color: var(--tag-color, #a78bfa);
          color: var(--tag-color, #a78bfa);
          background: rgba(167,139,250,0.06);
        }

        /* ── Credentials card ─────────────────────────────────────────── */
        .creds-card { padding: 0; }
        .creds-header {
          background: rgba(5,10,20,0.8);
          padding: 12px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; gap: 7px;
          border-radius: 24px 24px 0 0;
        }
        .creds-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .creds-filename {
          font-family: var(--font-mono);
          font-size: 0.6rem; color: #334155;
          margin-left: 6px; letter-spacing: 0.06em;
        }
        .creds-body {
          padding: 16px 20px;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          line-height: 1.7;
        }
        .ck  { color: #f8fafc; }
        .cs  { color: #34d399; }
        .cn  { color: #fb923c; }
        .cc  { color: #475569; }

        /* ── Skills card ──────────────────────────────────────────────── */
        /* FIX: Renamed from .section-label to avoid collision with globals.css .section-label */
        .ab-section-label {
          font-family: var(--font-mono);
          font-size: 0.68rem; color: #a78bfa;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 24px;
          display: flex; align-items: center; gap: 10px;
        }
        .ab-section-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(to right, rgba(167,139,250,0.2), transparent);
        }

        /* ── Highlights card ──────────────────────────────────────────── */
        .hl-list { display: flex; flex-direction: column; gap: 14px; margin-top: 4px; }
        .hl-item {
          display: flex; align-items: center; gap: 14px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px;
          transition: border-color 0.25s, background 0.25s;
        }
        .hl-item:hover {
          border-color: rgba(167,139,250,0.15);
          background: rgba(167,139,250,0.04);
        }
        .hl-icon {
          font-size: 1rem; color: #a78bfa;
          width: 28px; text-align: center; flex-shrink: 0;
        }
        .hl-body { flex: 1; min-width: 0; }
        .hl-value {
          font-family: var(--font-mono);
          font-size: 1rem; font-weight: 700;
          color: #a78bfa; line-height: 1.1;
        }
        .hl-label { font-size: 0.78rem; color: #e2e8f0; font-weight: 600; margin-top: 1px; }
        .hl-sub {
          font-family: var(--font-mono);
          font-size: 0.62rem; color: #334155;
          letter-spacing: 0.06em; margin-top: 1px;
        }

        /* ── Build card ───────────────────────────────────────────────── */
        .build-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        @media (max-width: 768px) { .build-grid { grid-template-columns: 1fr; } }

        .build-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px;
          padding: 18px 20px;
          transition: border-color 0.2s, background 0.2s;
        }
        .build-item:hover {
          border-color: rgba(167,139,250,0.15);
          background: rgba(167,139,250,0.04);
        }
        .build-icon {
          font-size: 1.4rem; margin-bottom: 10px;
          display: block;
        }
        .build-item-title {
          font-size: 0.85rem; font-weight: 700;
          color: #e2e8f0; margin-bottom: 6px;
        }
        .build-item-desc {
          font-size: 0.8rem; color: #64748b; line-height: 1.6;
        }

        /* ── Quote card ───────────────────────────────────────────────── */
        .quote-card-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 768px) { .quote-card-inner { grid-template-columns: 1fr; } }

        .quote-left { border-left: 2px solid rgba(167,139,250,0.4); padding-left: 28px; }
        .quote-text {
          font-size: clamp(1.1rem, 2.2vw, 1.45rem);
          font-weight: 600; font-style: italic;
          color: #e2e8f0; line-height: 1.6;
          letter-spacing: -0.01em;
          margin: 0 0 16px;
        }
        .quote-attr {
          font-family: var(--font-mono);
          font-size: 0.66rem; color: #475569;
          letter-spacing: 0.12em; text-transform: uppercase;
        }
        .quote-attr em { color: #a78bfa; font-style: normal; }

        .quote-right {}
        .cta-text {
          font-size: 0.98rem; color: #64748b; line-height: 1.8; margin: 0 0 20px;
        }
        .cta-text strong { color: #cbd5e1; font-weight: 600; }
        .open-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 0.68rem;
          color: #a78bfa;
          background: rgba(167,139,250,0.08);
          padding: 8px 18px; border-radius: 10px;
          border: 1px solid rgba(167,139,250,0.2);
          letter-spacing: 0.06em;
        }
        /* FIX: Removed duplicate pulse-ring2 keyframe — now reuses pulse-ring animation */
        .open-dot {
          width: 6px; height: 6px; background: #a78bfa;
          border-radius: 50%; animation: pulse-ring 2.5s ease-out infinite;
        }
      `}</style>

      <div className="ab-inner">

        {/* ── Header ── */}
        <div className="ab-header">
          <h2 id="about-title" className="ab-title">
            About <span className="ab-title-accent">Me.</span>
          </h2>
          <div className="ab-subtitle-row">
            <div className="ab-subtitle-line" aria-hidden="true" />
            <p className="ab-subtitle-text">
              Building Robust Systems &amp; Scalable Infrastructure
            </p>
          </div>
        </div>

        <div className="ab-grid">

          {/* ── Card 1: Hero Identity ── */}
          <div className={`ab-card ab-card-hero ${inView ? "visible" : ""}`}
            style={{ transitionDelay: "0.05s" }}>

            <div className="status-row">
              <div className="status-badge" aria-label="System status: operational">
                <div className="pulse" aria-hidden="true" />
                System Operational
              </div>
              <div className="uptime-badge" aria-label="Time as SRE (since Jun 2021)">
                <span className="uptime-label">SRE Uptime</span>
                <UptimeCounter />
              </div>
            </div>

            <p className="hero-role">Site Reliability Engineer</p>
            <h3 className="hero-name">Nishant Kamal</h3>

            <p className="hero-desc">
              Site Reliability Engineer working extensively with cloud-native and
              Kubernetes-based distributed systems at scale — handling production
              reliability, mitigating outages during high-traffic events, and
              building resilient platform infrastructure.
            </p>

            <div className="meta-row">
              <div className="meta-chip">
                <span className="meta-chip-label">Location</span>
                <span className="meta-chip-value">Delhi, India</span>
              </div>
              <div className="meta-chip">
                <span className="meta-chip-label">Focus</span>
                <span className="meta-chip-value">Platform Engineering</span>
              </div>
              <div className="meta-chip">
                <span className="meta-chip-label">Education</span>
                <span className="meta-chip-value">M.Tech · BITS Pilani</span>
              </div>
            </div>

            <div className="tag-row" aria-label="Core technologies">
              {tags.map((t) => (
                <span
                  key={t.label}
                  className="tag-pill"
                  style={{ "--tag-color": t.color }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Card 2: Credentials Terminal ── */}
          <div className={`ab-card ab-card-creds creds-card ${inView ? "visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}>
            <div className="creds-header" aria-hidden="true">
              <div className="creds-dot" style={{ background: "#ff5f56" }} />
              <div className="creds-dot" style={{ background: "#ffbd2e" }} />
              <div className="creds-dot" style={{ background: "#27c93f" }} />
              <span className="creds-filename">nishant.config.json</span>
            </div>
            <div className="creds-body"
              aria-label="SRE with 5+ years experience, M.Tech Cloud Computing at BITS Pilani in progress, GPA A+">
              <span aria-hidden="true">
                <span className="cc">{"// professional profile"}</span><br />
                {"{"}<br />
                &nbsp;&nbsp;<span className="ck">"role"</span>:{" "}
                <span className="cs">"Site Reliability Engineer"</span>,<br />
                &nbsp;&nbsp;<span className="ck">"exp_years"</span>:{" "}
                <span className="cs">"5+"</span>,<br />
                &nbsp;&nbsp;<span className="ck">"location"</span>:{" "}
                <span className="cs">"Delhi, India"</span>,<br />
                <br />
                &nbsp;&nbsp;<span className="cc">{"// education"}</span><br />
                &nbsp;&nbsp;<span className="ck">"degree"</span>:{" "}
                <span className="cs">"M.Tech Cloud Computing"</span>,<br />
                &nbsp;&nbsp;<span className="ck">"institute"</span>:{" "}
                <span className="cs">"BITS Pilani"</span>,<br />
                &nbsp;&nbsp;<span className="ck">"status"</span>:{" "}
                <span className="cs">"In_Progress"</span>,<br />
                &nbsp;&nbsp;<span className="ck">"GPA"</span>:{" "}
                <span className="cn">"A+"</span><br />
                {"}"}
              </span>
            </div>
          </div>

          {/* ── Card 3: Career Highlights ── */}
          <div className={`ab-card ab-card-skills ${inView ? "visible" : ""}`}
            style={{ transitionDelay: "0.25s" }}>
            <div className="ab-section-label">Highlights</div>
            <div className="hl-list" aria-label="Career highlights">
              {highlights.map((h) => (
                <div key={h.label} className="hl-item">
                  <span className="hl-icon" aria-hidden="true">{h.icon}</span>
                  <div className="hl-body">
                    <div className="hl-value">{h.value}</div>
                    <div className="hl-label">{h.label}</div>
                    <div className="hl-sub">{h.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 4: What I Build ── */}
          <div className={`ab-card ab-card-build ${inView ? "visible" : ""}`}
            style={{ transitionDelay: "0.35s" }}>
            <div className="ab-section-label">What I Build</div>
            <div className="build-grid">
              <div className="build-item">
                <span className="build-icon" aria-hidden="true">⎈</span>
                <div className="build-item-title">GitOps Workflows</div>
                <div className="build-item-desc">
                  Automated, auditable Kubernetes deployments with FluxCD and Helm
                  across multi-environment CI/CD pipelines.
                </div>
              </div>
              <div className="build-item">
                <span className="build-icon" aria-hidden="true">☁</span>
                <div className="build-item-title">Cloud Infrastructure</div>
                <div className="build-item-desc">
                  Declarative cloud provisioning on AWS and OCI using Crossplane
                  and Kubernetes CRDs for developer self-service.
                </div>
              </div>
              <div className="build-item">
                <span className="build-icon" aria-hidden="true">◎</span>
                <div className="build-item-title">Observability Stacks</div>
                <div className="build-item-desc">
                  Unified monitoring across 50+ services with Prometheus, Grafana,
                  and Istio service mesh for end-to-end visibility.
                </div>
              </div>
              <div className="build-item">
                <span className="build-icon" aria-hidden="true">⚡</span>
                <div className="build-item-title">Reliability Engineering</div>
                <div className="build-item-desc">
                  99.9% uptime delivery, 35% cost reduction via Karpenter,
                  and MTTR reduction through automated runbooks.
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 5: Quote + CTA ── */}
          <div className={`ab-card ab-card-quote ${inView ? "visible" : ""}`}
            style={{ transitionDelay: "0.45s" }}>
            <div className="quote-card-inner">
              <div className="quote-left">
                <blockquote>
                  <p className="quote-text">
                    I was never the smartest in the room — I just never left until I was.
                  </p>
                  <footer className="quote-attr">
                    — <em>Nishant Kamal</em>
                  </footer>
                </blockquote>
              </div>
              <div className="quote-right">
                <p className="cta-text">
                  Always eager to collaborate on <strong>DevOps, SRE, and platform
                  engineering</strong> initiatives — whether it&apos;s infrastructure
                  design, automation strategies, or building resilient, scalable
                  systems.
                </p>
                <div className="open-badge">
                  <div className="open-dot" aria-hidden="true" />
                  Open to Collaborate
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
