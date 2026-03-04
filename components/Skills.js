"use client";

import { useState } from "react";

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
      { name: "AWS",        level: 90, icon: "⬢" },
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

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = categories[activeCategory];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .skills-container {
          font-family: 'Inter', -apple-system, sans-serif;
          color: #f8fafc;
          max-width: 1100px;
          margin: 60px auto;
          padding: 0 24px;
        }

        .skills-heading {
          font-size: clamp(2.5rem, 6vw, 3.75rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 48px;
        }

        .skills-heading span {
          background: linear-gradient(to right, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Nav Tabs */
        .tabs-nav {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 20px;
        }

        .tab-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          padding: 10px 20px;
          border-radius: 99px;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.03);
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab-btn:hover {
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.08);
        }

        .tab-btn.active {
          background: var(--bg);
          color: var(--clr);
          border-color: var(--border);
          box-shadow: 0 4px 20px var(--glow);
        }

        /* Skills Grid */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr; }
        }

        .skill-card {
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 28px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.1);
          background: rgba(30, 41, 59, 0.6);
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .skill-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .icon-box {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 1.2rem;
          background: var(--glow);
          color: var(--clr);
          border: 1px solid var(--border);
        }

        .skill-name {
          font-size: 1.15rem;
          font-weight: 600;
          color: #f1f5f9;
        }

        .skill-val {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #94a3b8;
        }

        /* Progress Bar */
        .bar-container {
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          width: 100%;
        }

        .bar-fill {
          height: 100%;
          border-radius: 10px;
          position: relative;
          transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
          background: linear-gradient(90deg, var(--clr), var(--clr-alt));
          box-shadow: 0 0 15px var(--glow);
        }

        /* Footer Tag Cloud */
        .footer-cloud {
          margin-top: 64px;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cloud-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #475569;
          margin-bottom: 20px;
          display: block;
        }

        .tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tech-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          padding: 6px 14px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          color: #94a3b8;
          transition: all 0.2s ease;
        }

        .tech-tag:hover {
          border-color: #38bdf8;
          color: #38bdf8;
          transform: scale(1.05);
        }
      `}</style>

      <section className="skills-container" id="skills">
        <h2 className="skills-heading">
          Technical <span>Stack</span><br />
          & Ecosystem.
        </h2>

        <nav className="tabs-nav">
          {categories.map((c, i) => (
            <button
              key={c.label}
              className={`tab-btn ${activeCategory === i ? "active" : ""}`}
              style={{
                "--clr": c.color,
                "--bg": c.color + "15",
                "--border": c.color + "40",
                "--glow": c.glow,
              }}
              onClick={() => setActiveCategory(i)}
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
                "--clr": cat.color, 
                "--clr-alt": cat.color + "99",
                "--glow": cat.glow,
                "--border": cat.color + "30" 
              }}
            >
              <div className="skill-header">
                <div className="skill-info">
                  <div className="icon-box">{s.icon}</div>
                  <span className="skill-name">{s.name}</span>
                </div>
                <span className="skill-val">{s.level}%</span>
              </div>
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="footer-cloud">
          <span className="cloud-title">Extended Toolset</span>
          <div className="tags-wrap">
            {categories.flatMap((c) => c.skills.map((s) => s.name))
              .concat(["SLOs", "CI/CD", "Service Mesh", "GitOps", "OpenTelemetry", "Linux Kernel"])
              .map((tag) => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
