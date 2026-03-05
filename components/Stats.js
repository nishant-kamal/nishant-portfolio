"use client";

import { useEffect, useState, useRef } from "react";

// FIX 1: Removed @import Google Fonts — loaded via next/font in layout.js

const statsData = [
  { value: 6,    suffix: "+", label: "Years Experience",   color: "#38bdf8", icon: "◈" },
  { value: 35,   suffix: "%", label: "Cloud Cost Saved",   color: "#34d399", icon: "↓" },
  { value: 99.9, suffix: "%", label: "Platform Uptime",    color: "#a78bfa", icon: "⬡" },
  { value: 50,   suffix: "+", label: "Global Deployments", color: "#fb923c", icon: "△" },
];

function Counter({ target, suffix, color }) {
  // FIX 2: Initial value set to "0.0" for decimal targets to prevent layout
  // shift — previously started at integer 0 then jumped to "0.0" mid-animation
  const [val, setVal] = useState(target % 1 !== 0 ? "0.0" : 0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // FIX 3: Observer threshold lowered to 0.3 — 0.5 meant the card had to be
    // 50% visible before counting started, which caused it to never fire on
    // shorter viewport heights (mobile)
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    const el = ref.current;
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); obs.disconnect(); };
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTs = null;
    const duration = 2000;
    let rafId;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = ease * target;
      setVal(target % 1 !== 0 ? current.toFixed(1) : Math.floor(current));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    // FIX 4: Cancel animation frame on unmount to prevent setState on
    // unmounted component (memory leak)
    return () => cancelAnimationFrame(rafId);
  }, [started, target]);

  return (
    <span ref={ref} style={{ color, fontVariantNumeric: "tabular-nums" }}>
      {val}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    // FIX 5: Removed duplicate <section> — this component is already
    // rendered inside a <section id="stats"> in page.js.
    // Changed to <div> to avoid nested sections.
    <div className="stats-wrap">
      <style>{`
        .stats-wrap {
          background: #020617;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        /* Top decorative line */
        .stats-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 100%; height: 1px;
          background: linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent);
          pointer-events: none;
        }

        .stats-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 56px;
        }

        .stats-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 14px;
          border-radius: 99px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          margin-bottom: 20px;
        }
        .stats-badge-dot {
          position: relative;
          width: 8px; height: 8px;
        }
        .stats-badge-dot-ping {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: rgba(167, 139, 250, 0.75);
          animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
        }
        .stats-badge-dot-solid {
          position: relative;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #a78bfa;
          display: block;
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .stats-badge-text {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #94a3b8;
        }

        .stats-title {
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #f8fafc;
          margin: 0 0 12px;
          line-height: 1.2;
        }
        .stats-title-accent {
          background: linear-gradient(to right, #a78bfa, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stats-subtitle {
          color: #64748b;
          font-size: 0.95rem;
          max-width: 440px;
          line-height: 1.6;
          margin: 0;
        }

        /* Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr; } }

        .stat-card {
          position: relative;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(15, 23, 42, 0.5);
          padding: 28px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.3s, background 0.3s;
          overflow: hidden;
        }
        .stat-card:hover {
          border-color: rgba(255, 255, 255, 0.12);
          background: rgba(30, 41, 59, 0.6);
        }
        /* Hover glow overlay */
        .stat-card-glow {
          position: absolute; inset: 0; border-radius: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.04), transparent);
          opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        .stat-card:hover .stat-card-glow { opacity: 1; }

        .stat-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .stat-icon-box {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          font-size: 1.1rem;
        }
        .stat-status {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: #334155;
          letter-spacing: 0.05em;
          transition: color 0.3s;
        }
        .stat-card:hover .stat-status { color: #475569; }

        .stat-value {
          font-size: clamp(2.4rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 10px;
        }
        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #475569;
          font-weight: 500;
        }
      `}</style>

      <div className="stats-header">
        <div className="stats-badge" aria-hidden="true">
          <span className="stats-badge-dot">
            <span className="stats-badge-dot-ping" />
            <span className="stats-badge-dot-solid" />
          </span>
          <span className="stats-badge-text">Live Metrics</span>
        </div>
        <h2 className="stats-title">
          Reliability by the{" "}
          <span className="stats-title-accent">Numbers</span>
        </h2>
        <p className="stats-subtitle">
          Quantifiable impact on infrastructure performance, security compliance,
          and operational efficiency.
        </p>
      </div>

      <div className="stats-grid">
        {statsData.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-glow" aria-hidden="true" />
            <div className="stat-card-top">
              <div className="stat-icon-box" style={{ color: s.color }} aria-hidden="true">
                {s.icon}
              </div>
              <span className="stat-status" aria-hidden="true">DATA_PULL::OK</span>
            </div>
            <div className="stat-value">
              <Counter target={s.value} suffix={s.suffix} color={s.color} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
