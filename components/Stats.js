"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 6,      suffix: "+",  label: "Years Experience",    color: "#38bdf8", glow: "rgba(56,189,248,.15)",   icon: "◈" },
  { value: 35,     suffix: "%",  label: "Cloud Cost Reduced",  color: "#34d399", glow: "rgba(52,211,153,.15)",   icon: "↓" },
  { value: 99.9,   suffix: "%",  label: "Platform Uptime",     color: "#a78bfa", glow: "rgba(167,139,250,.15)",  icon: "⬡" },
  { value: 50,     suffix: "+",  label: "Alerts Optimized",    color: "#fb923c", glow: "rgba(251,146,60,.15)",   icon: "△" },
];

function Counter({ target, suffix, color, duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); } 
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4); // Smoother quint ease-out
      const currentVal = (ease * target);
      setVal(target % 1 !== 0 ? currentVal.toFixed(1) : Math.floor(currentVal));
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .stats-section {
          padding: 40px 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .stats-grid { grid-template-columns: 1fr; } }

        .stat-card {
          position: relative;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 32px 28px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          border-color: var(--card-clr-30);
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
        }

        .stat-icon {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          margin-bottom: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--card-bg);
          border-radius: 10px;
          border: 1px solid var(--card-clr-20);
        }

        .stat-num {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.2rem, 3vw, 2.8rem);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 16px;
          display: block;
          letter-spacing: -0.04em;
        }

        .stat-bar-track {
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }

        .stat-bar-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 2s cubic-bezier(0.22, 1, 0.36, 1);
          background: linear-gradient(90deg, var(--card-clr), var(--card-clr-alt));
          box-shadow: 0 0 12px var(--card-glow);
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748b;
          line-height: 1.4;
        }

        /* Ambient top light */
        .stat-card::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--card-clr), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stat-card:hover::after { opacity: 1; }
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
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Calculate bar percentage
  // For uptime/cost, it's relative to 100. For experience, relative to 10.
  const barPct = suffix === "%" ? Math.min(value, 100) : Math.min((value / 10) * 100, 100);

  return (
    <div
      ref={ref}
      className="stat-card"
      style={{
        "--card-clr": color,
        "--card-clr-alt": color + "88",
        "--card-clr-20": color + "33",
        "--card-clr-30": color + "4d",
        "--card-bg": color + "15",
        "--card-glow": glow,
      }}
    >
      <span className="stat-icon" style={{ color }}>{icon}</span>
      <span className="stat-num">
        <Counter target={value} suffix={suffix} color={color} />
      </span>
      
      <div className="stat-bar-track">
        <div
          className="stat-bar-fill"
          style={{ width: inView ? `${barPct}%` : "0%" }}
        />
      </div>

      <div className="stat-label">{label}</div>
    </div>
  );
}
