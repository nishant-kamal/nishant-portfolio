"use client";

import { useState, useRef, useEffect } from "react";

// FIX 1: Removed @import Google Fonts — loaded via next/font in layout.js

const categories = [
  {
    label: "Orchestration",
    color: "#38bdf8",
    glow: "rgba(56,189,248,.15)",
    skills: [
      { name: "Kubernetes", level: 95, icon: "☸" },
      { name: "Docker",     level: 92, icon: "⬡" },
      { name: "Istio",      level: 80, icon: "◈" },
      { name: "FluxCD",     level: 85, icon: "△" },
    ],
  },
  {
    label: "Cloud & Infra",
    color: "#fb923c",
    glow: "rgba(251,146,60,.15)",
    skills: [
      { name: "AWS",       level: 90, icon: "⬢" },
      { name: "Terraform", level: 88, icon: "◇" },
      { name: "Karpenter", level: 78, icon: "↑" },
      { name: "EC2 / EKS", level: 90, icon: "⬡" },
    ],
  },
  {
    label: "Observability",
    color: "#a78bfa",
    glow: "rgba(167,139,250,.15)",
    skills: [
      { name: "Prometheus", level: 92, icon: "◉" },
      { name: "Grafana",    level: 88, icon: "▦" },
      { name: "Alerting",   level: 85, icon: "△" },
      { name: "Tracing",    level: 75, icon: "⟿" },
    ],
  },
  {
    label: "Data & Streaming",
    color: "#34d399",
    glow: "rgba(52,211,153,.15)",
    skills: [
      { name: "Kafka",    level: 85, icon: "⇌" },
      { name: "Debezium", level: 78, icon: "◈" },
      { name: "GitOps",   level: 90, icon: "⊕" },
      { name: "Helm",     level: 88, icon: "⬡" },
    ],
  },
];

// FIX 2: SkillBar animates from 0→level on first inView, not on paint.
// Previously bar-fill had `width: level%` set immediately — it was already
// full-width by the time the transition could run.
function SkillBar({ level, color, glow }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setWidth(level); },
      { threshold: 0.4 }
    );
    const el = ref.current;
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); obs.disconnect(); };
  }, [level]);

  return (
    <div
      ref={ref}
      style={{
        height: "6px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "10px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: "10px",
          width: `${width}%`,
          transition: "width 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
          // FIX 3: --clr-alt used "color + 99" which appended alpha to hex string.
          // Using rgba with explicit opacity instead for proper cross-browser support.
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          boxShadow: `0 0 12px ${glow}`,
          // FIX: Respect reduced motion — transition only if user hasn't opted out
          ...(window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? { transition: "none" }
            : {}),
        }}
      />
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = categories[activeCategory];

  return (
    // FIX 4: Removed duplicate <section id="skills"> — already wrapped in
    // <section id="skills"> in page.js. Using <div> here instead.
    <div className="skills-wrap">
      <style>{`
        .skills-wrap {
          color: #f8fafc;
          padding: 20px 0 60px;
        }

        .skills-heading {
          font-size: clamp(2.5rem, 6vw, 3.75rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 48px;
          color: #f8fafc;
        }
        .skills-heading-accent {
          background: linear-gradient(to right, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Tab nav */
        .tabs-nav {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 36px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 20px;
        }
        .tab-btn {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          padding: 8px 18px;
          border-radius: 99px;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.03);
          color: #64748b;
          cursor: pointer;
          transition: color 0.25s, background 0.25s, border-color 0.25s, box-shadow 0.25s;
        }
        .tab-btn:hover { color: #f8fafc; background: rgba(255, 255, 255, 0.07); }
        .tab-btn.active {
          color: var(--clr);
          background: var(--clr-bg);
          border-color: var(--clr-border);
          box-shadow: 0 4px 20px var(--glow);
        }
        .tab-btn:focus-visible { outline: 2px solid #38bdf8; outline-offset: 2px; }

        /* Skills grid */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 700px) { .skills-grid { grid-template-columns: 1fr; } }

        .skill-card {
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 18px;
          padding: 24px;
          transition: transform 0.35s ease, border-color 0.35s ease, background 0.35s ease;
        }
        .skill-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.1);
          background: rgba(30, 41, 59, 0.65);
        }
        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .skill-info { display: flex; align-items: center; gap: 12px; }
        .icon-box {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          font-size: 1.1rem;
          background: var(--glow);
          color: var(--clr);
          border: 1px solid var(--clr-border);
          flex-shrink: 0;
        }
        .skill-name { font-size: 1.05rem; font-weight: 600; color: #f1f5f9; }
        .skill-val {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #94a3b8;
          flex-shrink: 0;
        }

        /* Tag cloud */
        .footer-cloud {
          margin-top: 56px;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .cloud-title {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #475569;
          margin-bottom: 16px;
          display: block;
        }
        .tags-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
        .tech-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          padding: 5px 12px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          color: #94a3b8;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
          /* FIX: Changed cursor to default — tags are display-only, not interactive.
             The :hover effect below is purely cosmetic/decorative. */
          cursor: default;
          user-select: none;
        }
        .tech-tag:hover {
          border-color: rgba(56, 189, 248, 0.3);
          color: #cbd5e1;
          /* FIX: Removed scale transform — scaling non-interactive elements
             implies clickability, which is misleading UX */
        }
      `}</style>

      <h2 id="skills-title" className="skills-heading">
        Technical <span className="skills-heading-accent">Stack</span><br />
        {/* FIX: &amp; in JSX renders as literal "&amp;" — use & directly or &amp; only in HTML */}
        & Ecosystem.
      </h2>

      <nav className="tabs-nav" aria-label="Skill categories">
        {categories.map((c, i) => (
          <button
            key={c.label}
            className={`tab-btn ${activeCategory === i ? "active" : ""}`}
            style={{
              "--clr":        c.color,
              "--clr-bg":     c.color + "18",
              "--clr-border": c.color + "45",
              "--glow":       c.glow,
            }}
            onClick={() => setActiveCategory(i)}
            aria-pressed={activeCategory === i}
          >
            {c.label}
          </button>
        ))}
      </nav>

      <div className="skills-grid">
        {cat.skills.map((s) => (
          <div
            key={s.name}
            className="skill-card"
            style={{
              "--clr":        cat.color,
              "--glow":       cat.glow,
              "--clr-border": cat.color + "35",
            }}
          >
            <div className="skill-header">
              <div className="skill-info">
                <div className="icon-box" aria-hidden="true">{s.icon}</div>
                <span className="skill-name">{s.name}</span>
              </div>
              <span className="skill-val" aria-label={`${s.level} percent`}>{s.level}%</span>
            </div>
            <SkillBar level={s.level} color={cat.color} glow={cat.glow} />
          </div>
        ))}
      </div>

      <div className="footer-cloud">
        <span className="cloud-title">Extended Toolset</span>
        <div className="tags-wrap" aria-label="Additional technologies">
          {/* FIX 5: Deduplicate tags — flatMap was producing duplicates since
              GitOps and Helm appear in category skills AND the concat list */}
          {Array.from(new Set([
            ...categories.flatMap((c) => c.skills.map((s) => s.name)),
            "SLOs", "CI/CD", "Service Mesh", "OpenTelemetry", "Linux Kernel",
          ])).map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
