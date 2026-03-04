"use client";

import { useState } from "react";

const projects = [
  {
    id: 1,
    index: "01",
    title: "Kubernetes GitOps Deployment",
    subtitle: "EKS · FluxCD · Helm · Prometheus",
    description:
      "Weather application deployed on AWS EKS using Helm and FluxCD with full Prometheus monitoring stack. Implemented GitOps workflow enabling zero-touch continuous delivery with automatic drift detection and reconciliation.",
    tags: ["Kubernetes", "AWS EKS", "FluxCD", "Helm", "Prometheus", "GitOps"],
    color: "#38bdf8",
    glow: "rgba(56,189,248,.12)",
    icon: "☸",
    metrics: [{ label: "Deployment Time", val: "-70%" }, { label: "Drift Incidents", val: "0" }],
  },
  {
    id: 2,
    index: "02",
    title: "AWS Cost Optimization",
    subtitle: "Karpenter · EC2 · ASG Migration",
    description:
      "Migrated cluster node scaling from ASG to Karpenter, achieving 35% EC2 cost reduction through intelligent bin-packing and spot instance utilization. Reduced over-provisioning by implementing right-sizing recommendations.",
    tags: ["Karpenter", "AWS", "EC2", "Cost Optimization", "Spot Instances"],
    color: "#34d399",
    glow: "rgba(52,211,153,.12)",
    icon: "↓",
    metrics: [{ label: "Cost Reduction", val: "35%" }, { label: "Provisioning Speed", val: "3×" }],
  },
  {
    id: 3,
    index: "03",
    title: "Alerting Standardization",
    subtitle: "Helm · Prometheus · AlertManager",
    description:
      "Built a Helm-based centralized alerting system improving monitoring consistency across 50+ services. Reduced MTTR by establishing unified runbooks, alert routing rules, and escalation policies.",
    tags: ["Prometheus", "AlertManager", "Helm", "Grafana", "MTTR"],
    color: "#a78bfa",
    glow: "rgba(167,139,250,.12)",
    icon: "△",
    metrics: [{ label: "Alerts Standardized", val: "50+" }, { label: "MTTR", val: "-40%" }],
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .projects-section { font-family: 'Syne', sans-serif; }

        .proj-eyebrow {
          font-family: 'DM Mono', monospace; font-size: .7rem;
          letter-spacing: .2em; text-transform: uppercase;
          color: #38bdf8; background: rgba(56,189,248,.08);
          border: 1px solid rgba(56,189,248,.2);
          padding: 4px 12px; border-radius: 4px;
          display: inline-block; margin-bottom: 20px;
        }
        .proj-heading {
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 800;
          letter-spacing: -.02em; color: #f8fafc;
          margin-bottom: 48px; line-height: 1.1;
        }
        .proj-heading em { font-style: normal; color: #38bdf8; }

        .proj-list { display: flex; flex-direction: column; gap: 16px; }

        .proj-card {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(15,20,35,.7);
          backdrop-filter: blur(12px);
          overflow: hidden;
          transition: border-color .3s, box-shadow .3s;
          cursor: pointer;
        }

        .proj-header {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          align-items: center; gap: 20px;
          padding: 28px 28px;
        }
        @media (max-width: 600px) {
          .proj-header { grid-template-columns: 44px 1fr auto; gap: 14px; padding: 20px; }
        }

        .proj-num-box {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          border: 1px solid;
          flex-shrink: 0;
          transition: box-shadow .3s;
        }

        .proj-title-col { }
        .proj-index {
          font-family: 'DM Mono', monospace; font-size: .6rem;
          letter-spacing: .14em; color: #334155;
          text-transform: uppercase; margin-bottom: 4px;
        }
        .proj-title {
          font-size: 1.05rem; font-weight: 700; color: #f1f5f9;
          line-height: 1.3; margin-bottom: 4px;
        }
        .proj-subtitle {
          font-family: 'DM Mono', monospace; font-size: .68rem;
          color: #475569; letter-spacing: .05em;
        }

        .proj-chevron {
          font-size: .65rem; color: #334155;
          transition: transform .3s, color .3s;
          flex-shrink: 0;
        }
        .proj-card.open .proj-chevron { transform: rotate(180deg); }

        /* expandable body */
        .proj-body {
          max-height: 0; overflow: hidden;
          transition: max-height .45s cubic-bezier(.4,0,.2,1);
        }
        .proj-card.open .proj-body { max-height: 320px; }

        .proj-body-inner {
          padding: 0 28px 28px; padding-top: 0;
          border-top: 1px solid rgba(255,255,255,.05);
          padding-top: 24px;
        }

        .proj-desc {
          font-size: .88rem; color: #94a3b8;
          line-height: 1.78; margin-bottom: 20px;
        }

        .proj-metrics {
          display: flex; gap: 20px; margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .proj-metric {
          padding: 10px 16px; border-radius: 10px;
          border: 1px solid;
        }
        .metric-val {
          font-size: 1.1rem; font-weight: 800;
          line-height: 1; margin-bottom: 4px;
        }
        .metric-lbl {
          font-family: 'DM Mono', monospace; font-size: .6rem;
          letter-spacing: .1em; text-transform: uppercase; color: #475569;
        }

        .proj-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .proj-tag {
          font-family: 'DM Mono', monospace; font-size: .62rem;
          letter-spacing: .06em;
          padding: 4px 10px; border-radius: 6px;
          border: 1px solid rgba(255,255,255,.07);
          color: #475569;
        }
      `}</style>

      <section id="projects" className="projects-section">
        <span className="proj-eyebrow">04 — Projects</span>
        <h2 className="proj-heading">
          Work that<br />
          <em>moves the needle.</em>
        </h2>

        <div className="proj-list">
          {projects.map((p) => {
            const isOpen = active === p.id;
            return (
              <div
                key={p.id}
                className={`proj-card ${isOpen ? "open" : ""}`}
                style={{
                  borderColor: isOpen ? p.color + "35" : "rgba(255,255,255,.06)",
                  boxShadow: isOpen ? `0 8px 40px ${p.glow}` : "none",
                }}
                onClick={() => setActive(isOpen ? null : p.id)}
              >
                {/* top accent */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, ${p.color}, transparent)`,
                  opacity: isOpen ? 1 : 0, transition: "opacity .3s",
                  borderRadius: "16px 16px 0 0",
                  pointerEvents: "none",
                }} />

                <div className="proj-header">
                  <div
                    className="proj-num-box"
                    style={{
                      color: p.color,
                      borderColor: p.color + "40",
                      background: p.color + "12",
                      boxShadow: isOpen ? `0 0 16px ${p.glow}` : "none",
                    }}
                  >
                    {p.icon}
                  </div>

                  <div className="proj-title-col">
                    <div className="proj-index">{p.index}</div>
                    <div className="proj-title">{p.title}</div>
                    <div className="proj-subtitle">{p.subtitle}</div>
                  </div>

                  <span className="proj-chevron">▼</span>
                </div>

                <div className="proj-body">
                  <div className="proj-body-inner">
                    <p className="proj-desc">{p.description}</p>

                    <div className="proj-metrics">
                      {p.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="proj-metric"
                          style={{ borderColor: p.color + "30", background: p.color + "0a" }}
                        >
                          <div className="metric-val" style={{ color: p.color }}>{m.val}</div>
                          <div className="metric-lbl">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="proj-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="proj-tag"
                          style={{ borderColor: p.color + "25", color: p.color + "bb" }}
                        >{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
