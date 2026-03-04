"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 6,     suffix: "+",  label: "Years Experience",    color: "#38bdf8", glow: "rgba(56,189,248,.15)",   icon: "◈" },
  { value: 35,    suffix: "%",  label: "Cloud Cost Reduced",  color: "#34d399", glow: "rgba(52,211,153,.15)",   icon: "↓" },
  { value: 99.9,  suffix: "%",  label: "Platform Reliability",color: "#a78bfa", glow: "rgba(167,139,250,.15)",  icon: "⬡" },
  { value: 50,    suffix: "+",  label: "Alerts Standardized", color: "#fb923c", glow: "rgba(251,146,60,.15)",   icon: "△" },
];

function Counter({ target, suffix, color, duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((ease * target).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <span ref={ref} style={{ color }}>
      {val}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap');

        .stats-section {
          font-family: 'Syne', sans-serif;
          position: relative;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 860px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr 1fr; gap: 12px; } }

        .stat-card {
          position: relative; overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(15,20,35,.7);
          backdrop-filter: blur(12px);
          padding: 28px 24px 24px;
          transition: border-color .3s, transform .3s, box-shadow .3s;
          cursor: default;
        }
        .stat-card:hover { transform: translateY(-4px); }

        .stat-icon {
          font-size: .9rem; margin-bottom: 16px;
          display: block; opacity: .5;
        }

        .stat-num {
          font-size: clamp(2rem, 3.5vw, 2.6rem);
          font-weight: 800; line-height: 1;
          display: block; margin-bottom: 10px;
          font-variant-numeric: tabular-nums;
          letter-spacing: -.02em;
        }

        .stat-bar-track {
          height: 2px; background: rgba(255,255,255,.05);
          border-radius: 2px; margin-bottom: 12px; overflow: hidden;
        }
        .stat-bar-fill {
          height: 100%; border-radius: 2px;
          transition: width 1.6s cubic-bezier(.4,0,.2,1);
        }

        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: .65rem; letter-spacing: .12em;
          text-transform: uppercase; color: #475569;
        }

        /* top accent line */
        .stat-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          border-radius: 16px 16px 0 0;
          opacity: 0; transition: opacity .3s;
        }
        .stat-card:hover .stat-accent { opacity: 1; }
      `}</style>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>
    </>
  );
}

function StatCard({ value, suffix, label, color, glow, icon }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const barPct = suffix === "%" ? Math.min(value, 100) : Math.min((value / 10) * 100, 100);

  return (
    <div
      ref={ref}
      className="stat-card"
      style={{
        boxShadow: inView ? `0 8px 32px ${glow}` : "none",
        borderColor: inView ? color + "30" : "rgba(255,255,255,.06)",
      }}
    >
      <div className="stat-accent" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <span className="stat-icon" style={{ color }}>{icon}</span>
      <span className="stat-num">
        <Counter target={value} suffix={suffix} color={color} />
      </span>
      <div className="stat-bar-track">
        <div
          className="stat-bar-fill"
          style={{
            width: inView ? `${barPct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
          }}
        />
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
