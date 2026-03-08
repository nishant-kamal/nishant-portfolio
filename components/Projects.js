"use client";

import { useState } from "react";

// FIX 1: Removed @import Google Fonts — loaded via next/font in layout.js

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
    // FIX: Added links for project CTAs
    githubUrl: "https://github.com/nishant-kamal",
    demoUrl: null,
    metrics: [
      { label: "Deployment Time", val: "-70%" },
      { label: "Drift Incidents", val: "0" },
    ],
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
    githubUrl: "https://github.com/nishant-kamal",
    demoUrl: null,
    metrics: [
      { label: "Cost Reduction", val: "35%" },
      { label: "Provisioning Speed", val: "3×" },
    ],
  },
  {
    id: 3,
    index: "03",
    title: "Oracle Cloud Infrastructure POC",
    subtitle: "OCI · Cloud Migration · QA · Production Deployment",
    description:
      "Designed and executed a proof-of-concept for Oracle Cloud Infrastructure (OCI) and successfully deployed the first production environment. Owned the full lifecycle from architecture design through QA — resolving all reported issues to achieve a stable, live deployment.",
    tags: ["OCI", "Oracle Cloud", "POC", "Cloud Infrastructure", "Production Deployment", "QA"],
    color: "#f97316",
    glow: "rgba(249,115,22,.12)",
    icon: "◈",
    githubUrl: "https://github.com/nishant-kamal",
    demoUrl: null,
    metrics: [
      { label: "Environments Deployed", val: "1st" },
      { label: "QA Issues Resolved", val: "100%" },
    ],
  },
  {
    id: 4,
    index: "04",
    title: "Alerting Standardization",
    subtitle: "Helm · Prometheus · AlertManager",
    description:
      "Built a Helm-based centralized alerting system improving monitoring consistency across 50+ services. Reduced MTTR by establishing unified runbooks, alert routing rules, and escalation policies.",
    tags: ["Prometheus", "AlertManager", "Helm", "Grafana", "MTTR"],
    color: "#a78bfa",
    glow: "rgba(167,139,250,.12)",
    icon: "△",
    githubUrl: "https://github.com/nishant-kamal",
    demoUrl: null,
    metrics: [
      { label: "Alerts Standardized", val: "50+" },
      { label: "MTTR", val: "-40%" },
    ],
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    // FIX 2: Removed duplicate <section id="projects"> — already in page.js
    <div className="projects-wrap">
      <style>{`
        .projects-wrap { padding: 20px 0 60px; }

        .proj-heading {
          font-size: clamp(2.5rem, 6vw, 3.75rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f8fafc;
          margin: 0 0 48px;
          line-height: 1.1;
        }
        .proj-heading em { font-style: normal; color: #38bdf8; }

        .proj-list { display: flex; flex-direction: column; gap: 14px; }

        .proj-card {
          position: relative;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(15, 20, 35, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
          /* FIX 3: Added cursor:pointer so the entire card signals clickability */
          cursor: pointer;
        }

        /* FIX 4: Added :focus-visible for keyboard accessibility on the card */
        .proj-card:focus-visible {
          outline: 2px solid #38bdf8;
          outline-offset: 2px;
        }

        .proj-top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          border-radius: 16px 16px 0 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }

        .proj-header {
          display: grid;
          grid-template-columns: 52px 1fr auto;
          align-items: center;
          gap: 18px;
          padding: 24px 24px;
        }
        @media (max-width: 600px) {
          .proj-header { grid-template-columns: 40px 1fr auto; gap: 12px; padding: 18px; }
        }

        .proj-num-box {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          border: 1px solid;
          flex-shrink: 0;
          transition: box-shadow 0.3s;
        }
        .proj-index {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          color: #334155;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .proj-title {
          font-size: 1.1rem; font-weight: 700; color: #f1f5f9;
          line-height: 1.3; margin-bottom: 3px;
        }
        .proj-subtitle {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: #475569;
          letter-spacing: 0.05em;
        }
        .proj-chevron {
          font-size: 0.6rem; color: #334155;
          transition: transform 0.3s, color 0.3s;
          flex-shrink: 0;
          user-select: none;
        }
        .proj-card.open .proj-chevron {
          transform: rotate(180deg);
          color: #64748b;
        }

        /* Expandable body */
        .proj-body {
          max-height: 0; overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* FIX 5: Increased max-height from 400px to 600px to prevent
           long descriptions from being cut off */
        .proj-card.open .proj-body { max-height: 600px; }

        .proj-body-inner {
          padding: 0 24px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
        }
        .proj-desc {
          font-size: 0.95rem; color: #94a3b8;
          line-height: 1.78; margin-bottom: 20px;
          /* FIX 6: Allow text to wrap properly — was sometimes overflowing on mobile */
          overflow-wrap: break-word;
        }
        .proj-metrics {
          display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;
        }
        .proj-metric { padding: 10px 16px; border-radius: 10px; border: 1px solid; }
        .metric-val {
          font-size: 1.2rem; font-weight: 800;
          line-height: 1; margin-bottom: 4px;
        }
        .metric-lbl {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
        }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .proj-tag {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.05em;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.07);
        }

        /* FIX: Project action links */
        .proj-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        .proj-action-link {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          padding: 7px 16px;
          border-radius: 8px;
          border: 1px solid;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s, color 0.2s;
        }
        .proj-action-link:hover { opacity: 0.85; }
        .proj-action-link:focus-visible { outline: 2px solid #38bdf8; outline-offset: 2px; }

        /* FIX: min-width on metrics so they don't collapse awkwardly on narrow screens */
        .proj-metric { padding: 10px 16px; border-radius: 10px; border: 1px solid; min-width: 100px; }

        /* FIX: Respect reduced motion on accordion */
        @media (prefers-reduced-motion: reduce) {
          .proj-body { transition: none; }
          .proj-chevron { transition: none; }
          .proj-card { transition: none; }
        }
      `}</style>

      <h2 id="projects-title" className="proj-heading">
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
              // FIX 7: Keyboard accessibility — allow Enter/Space to toggle
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(isOpen ? null : p.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-label={`${p.title} — ${isOpen ? "collapse" : "expand"} details`}
            >
              {/* Top color bar */}
              <div
                className="proj-top-bar"
                style={{
                  background: `linear-gradient(90deg, ${p.color}, transparent)`,
                  opacity: isOpen ? 1 : 0,
                }}
                aria-hidden="true"
              />

              <div className="proj-header">
                <div
                  className="proj-num-box"
                  aria-hidden="true"
                  style={{
                    color: p.color,
                    borderColor: p.color + "40",
                    background: p.color + "12",
                    boxShadow: isOpen ? `0 0 16px ${p.glow}` : "none",
                  }}
                >
                  {p.icon}
                </div>

                <div>
                  <div className="proj-index">{p.index}</div>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-subtitle">{p.subtitle}</div>
                </div>

                <span className="proj-chevron" aria-hidden="true">▼</span>
              </div>

              <div className="proj-body">
                <div className="proj-body-inner">
                  <p className="proj-desc">{p.description}</p>

                  <div className="proj-metrics">
                    {p.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="proj-metric"
                        style={{
                          borderColor: p.color + "30",
                          background: p.color + "0a",
                        }}
                      >
                        <div className="metric-val" style={{ color: p.color }}>{m.val}</div>
                        <div className="metric-lbl">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="proj-tags">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="proj-tag"
                        style={{
                          borderColor: p.color + "25",
                          color: p.color + "cc",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* FIX: Action links — give users somewhere to go after reading */}
                  <div className="proj-actions">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-action-link"
                        style={{ color: p.color, borderColor: p.color + "40", background: p.color + "0d" }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${p.title} on GitHub (opens in new tab)`}
                      >
                        ↗ GitHub
                      </a>
                    )}
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-action-link"
                        style={{ color: p.color, borderColor: p.color + "40", background: p.color + "0d" }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View live demo of ${p.title} (opens in new tab)`}
                      >
                        ↗ Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
