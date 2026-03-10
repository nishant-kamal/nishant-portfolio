"use client";

import { useEffect, useState, useRef } from "react";

// FIX: Moved out of module scope — calling new Date() at parse time causes
// SSR/client mismatch (server date ≠ client date → React hydration warning).
// Now called only on the client inside a useState initializer guard.
function getYearsExperience() {
  const joinDate = new Date("2020-06-01");
  const now = new Date();
  const diffMs = now - joinDate;
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years);
}

// FIX: statsData is now a function so the dynamic value is computed client-side
function buildStatsData(yearsExp) {
  return [
    { value: yearsExp, suffix: "+", label: "Years Experience",         color: "#38bdf8", icon: "◈" },
    { value: null, range: "30–40%",             label: "Compute & Storage Cost ↓", color: "#34d399", icon: "↓" },
    { value: 10,   suffix: "+",                 label: "Projects Delivered",       color: "#a78bfa", icon: "△" },
    { value: 3,    suffix: "+",                 label: "Cloud Platforms",          color: "#fb923c", icon: "◉" },
  ];
}

function Counter({ target, suffix, color, cardRef }) {
  const [val, setVal] = useState(target % 1 !== 0 ? "0.0" : "0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    const el = cardRef?.current;
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); obs.disconnect(); };
  }, [cardRef]);

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
      setVal(target % 1 !== 0 ? current.toFixed(1) : String(Math.floor(current)));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, target]);

  return (
    <span style={{ color, fontVariantNumeric: "tabular-nums" }}>
      {val}{suffix}
    </span>
  );
}

function StatCard({ s }) {
  const cardRef = useRef(null);
  return (
    <div ref={cardRef} className="stat-card">
      <div className="stat-card-glow" aria-hidden="true" />
      <div className="stat-card-top">
        <div className="stat-icon-box" style={{ color: s.color }} aria-hidden="true">
          {s.icon}
        </div>
        <span className="stat-status" aria-hidden="true">DATA_PULL::OK</span>
      </div>
      <div className="stat-value">
        {s.range ? (
          <span style={{ color: s.color, fontVariantNumeric: "tabular-nums" }}>
            {s.range}
          </span>
        ) : (
          <Counter target={s.value} suffix={s.suffix} color={s.color} cardRef={cardRef} />
        )}
      </div>
      <div className="stat-label" aria-label={s.range ? `${s.label}: ${s.range}` : `${s.label}: ${s.value}${s.suffix}`}>
        {s.label}
      </div>
    </div>
  );
}

export default function Stats() {
  // FIX: Compute years on the client only to avoid SSR hydration mismatch.
  // Start with null; populate after mount so server HTML matches initial client render.
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    setStatsData(buildStatsData(getYearsExperience()));
  }, []);

  return (
    <div className="stats-wrap">
      <style>{`
        .stats-wrap {
          background: #020617;
          padding: 32px 24px 80px;
          position: relative;
          overflow: hidden;
        }
        .stats-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 100%; height: 1px;
          background: linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent);
          pointer-events: none;
        }
        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
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
        @media (prefers-reduced-motion: reduce) {
          .stats-badge-dot-ping { animation: none; opacity: 0; }
        }
        .stats-badge-text {
          font-family: var(--font-mono, 'Courier New', monospace);
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
          color: #94a3b8;
          font-size: 0.95rem;
          max-width: 440px;
          line-height: 1.6;
          margin: 0;
        }
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
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.6rem;
          color: #94a3b8;
          letter-spacing: 0.05em;
          transition: color 0.3s;
        }
        .stat-card:hover .stat-status { color: #94a3b8; }
        .stat-value {
          font-size: clamp(2.4rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 10px;
        }
        .stat-label {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #475569;
          font-weight: 500;
        }
        /* Skeleton shimmer while stats load */
        .stat-skeleton {
          height: 3rem;
          border-radius: 8px;
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          margin-bottom: 10px;
        }
        @keyframes shimmer { to { background-position: -200% 0; } }
        @media (prefers-reduced-motion: reduce) {
          .stat-skeleton { animation: none; background: rgba(255,255,255,0.05); }
        }
      `}</style>

      <div className="stats-inner">
        <div className="stats-header">
          <div className="stats-badge" role="img" aria-label="Live metrics indicator">
            <span className="stats-badge-dot" aria-hidden="true">
              <span className="stats-badge-dot-ping" />
              <span className="stats-badge-dot-solid" />
            </span>
            <span className="stats-badge-text">Live Metrics</span>
          </div>
          <h2 id="stats-title" className="stats-title">
            Reliability by the{" "}
            <span className="stats-title-accent">Numbers</span>
          </h2>
          <p className="stats-subtitle">
            Years of hands-on experience across cloud infrastructure,
            platform engineering, and site reliability.
          </p>
        </div>

        <div className="stats-grid">
          {/* FIX: Render skeleton cards until client-side data is ready,
              preventing a blank grid flash and avoiding hydration mismatch */}
          {statsData
            ? statsData.map((s) => <StatCard key={s.label} s={s} />)
            : [0, 1, 2, 3].map((i) => (
                <div key={i} className="stat-card" aria-hidden="true">
                  <div className="stat-card-top">
                    <div className="stat-icon-box" style={{ background: "rgba(255,255,255,0.03)" }} />
                  </div>
                  <div className="stat-skeleton" />
                  <div style={{ height: "0.65rem", width: "60%", borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}
