"use client";

import { useState } from "react";

const categories = [
  {
    label: "Orchestration",
    color: "#38bdf8",
    glow: "rgba(56,189,248,.12)",
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
    glow: "rgba(251,146,60,.12)",
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
    glow: "rgba(167,139,250,.12)",
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
    glow: "rgba(52,211,153,.12)",
    skills: [
      { name: "Kafka",    level: 85, icon: "⇌" },
      { name: "Debezium", level: 78, icon: "◈" },
      { name: "GitOps",   level: 90, icon: "⊕" },
      { name: "Helm",     level: 88, icon: "⬡" },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  const cat = categories[activeCategory];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .skills-section { font-family: 'Syne', sans-serif; }

        .skills-eyebrow {
          font-family: 'DM Mono', monospace; font-size: .7rem;
          letter-spacing: .2em; text-transform: uppercase;
          color: #38bdf8; background: rgba(56,189,248,.08);
          border: 1px solid rgba(56,189,248,.2);
          padding: 4px 12px; border-radius: 4px;
          display: inline-block; margin-bottom: 20px;
        }
        .skills-heading {
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 800;
          letter-spacing: -.02em; color: #f8fafc;
          margin-bottom: 48px; line-height: 1.1;
        }
        .skills-heading em { font-style: normal; color: #38bdf8; }

        /* tab row */
        .skills-tabs {
          display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px;
        }
        .skills-tab {
          font-family: 'DM Mono', monospace; font-size: .68rem;
          letter-spacing: .1em; text-transform: uppercase;
          padding: 8px 18px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.03);
          color: #475569; cursor: pointer;
          transition: all .2s;
        }
        .skills-tab:hover { color: #94a3b8; border-color: rgba(255,255,255,.12); }
        .skills-tab.active { color: var(--tab-color); border-color: var(--tab-color-30); background: var(--tab-color-10); }

        /* skill grid */
        .skills-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
        }
        @media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr; } }

        .skill-row {
          background: rgba(15,20,35,.7);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 14px; padding: 20px 22px;
          backdrop-filter: blur(10px);
          transition: border-color .25s, box-shadow .25s, transform .2s;
        }
        .skill-row:hover { transform: translateX(4px); }

        .skill-top {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 12px;
        }
        .skill-name {
          display: flex; align-items: center; gap: 10px;
          font-size: .88rem; font-weight: 600; color: #e2e8f0;
        }
        .skill-icon {
          font-size: .75rem; width: 26px; height: 26px;
          border-radius: 7px; display: flex; align-items: center; justify-content: center;
          border: 1px solid; font-family: monospace;
        }
        .skill-pct {
          font-family: 'DM Mono', monospace; font-size: .65rem;
          letter-spacing: .06em; color: #475569;
        }

        .skill-track {
          height: 3px; background: rgba(255,255,255,.05);
          border-radius: 3px; overflow: hidden;
        }
        .skill-fill {
          height: 100%; border-radius: 3px;
          transition: width 1s cubic-bezier(.4,0,.2,1);
        }

        /* all-skills tag cloud at bottom */
        .all-skills-label {
          font-family: 'DM Mono', monospace; font-size: .65rem;
          letter-spacing: .14em; text-transform: uppercase;
          color: #1e293b; margin-top: 40px; margin-bottom: 16px;
        }
        .all-skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
        .all-tag {
          font-family: 'DM Mono', monospace; font-size: .65rem;
          letter-spacing: .06em;
          padding: 5px 12px; border-radius: 6px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.02);
          color: #334155;
          transition: color .2s, border-color .2s;
        }
        .all-tag:hover { color: #64748b; border-color: rgba(255,255,255,.1); }
      `}</style>

      <section id="skills" className="skills-section">
        <span className="skills-eyebrow">03 — Tech Stack</span>
        <h2 className="skills-heading">
          Tools I trust<br />
          <em>in production.</em>
        </h2>

        {/* category tabs */}
        <div className="skills-tabs">
          {categories.map((c, i) => (
            <button
              key={c.label}
              className={`skills-tab ${activeCategory === i ? "active" : ""}`}
              style={{
                "--tab-color": c.color,
                "--tab-color-30": c.color + "40",
                "--tab-color-10": c.color + "14",
              }}
              onClick={() => setActiveCategory(i)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* skill rows */}
        <div className="skills-grid">
          {cat.skills.map((s) => (
            <div
              key={s.name}
              className="skill-row"
              style={{ borderColor: cat.color + "25", boxShadow: `0 4px 24px ${cat.glow}` }}
            >
              <div className="skill-top">
                <div className="skill-name">
                  <span
                    className="skill-icon"
                    style={{ color: cat.color, borderColor: cat.color + "40", background: cat.color + "12" }}
                  >
                    {s.icon}
                  </span>
                  {s.name}
                </div>
                <span className="skill-pct">{s.level}%</span>
              </div>
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{
                    width: `${s.level}%`,
                    background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* tag cloud */}
        <div className="all-skills-label">All technologies</div>
        <div className="all-skills-wrap">
          {categories.flatMap((c) => c.skills.map((s) => s.name))
            .concat(["SLOs/SLIs", "CI/CD", "Observability", "Service Mesh", "GitOps", "M.Tech Cloud"])
            .map((t) => <span key={t} className="all-tag">{t}</span>)}
        </div>
      </section>
    </>
  );
}
