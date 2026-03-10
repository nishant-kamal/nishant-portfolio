"use client";

import { useState } from "react";

const projects = [
  {
    id: 1,
    index: "01",
    title: "Kubernetes GitOps Deployment",
    subtitle: "EKS · FluxCD · GitHub Actions · Helm · Prometheus · New Relic · Grafana",
    description:
      "Deployed scalable, highly available infrastructure on AWS EKS with integrated monitoring via Prometheus, New Relic, and Grafana for proactive issue resolution. Streamlined CI/CD pipelines by integrating FluxCD and GitHub Actions, enhancing automation and improving deployment cycles across teams. Leveraged Helm Charts to automate application deployments, manage Kubernetes resources, and simplify infrastructure-as-code processes.",
    highlights: [
      "Integrated Prometheus, New Relic & Grafana — proactive alerting and observability across all services",
      "FluxCD + GitHub Actions CI/CD pipeline — eliminated manual deploy steps across all teams",
      "Helm Charts as IaC — versioned, repeatable deployments with zero configuration drift",
    ],
    tags: ["Kubernetes", "AWS EKS", "FluxCD", "GitHub Actions", "Helm", "Prometheus", "New Relic", "Grafana", "GitOps"],
    color: "#38bdf8",
    glow: "rgba(56,189,248,.12)",
    icon: "☸",
    metrics: [
      { label: "Deployment Time", val: "-70%" },
      { label: "Drift Incidents", val: "0" },
    ],
  },
  {
    id: 2,
    index: "02",
    title: "AWS Cost Optimization & Karpenter Migration",
    subtitle: "Karpenter · EC2 · ASG · Spot Instances · Resource Right-Sizing",
    description:
      "Implemented Karpenter for dynamic scaling, effectively replacing the Auto Scaling Group (ASG), optimizing resource utilization, and improving cost efficiency across the Kubernetes environment. Deployed multiple microservices using Karpenter for autoscaling while ensuring seamless traffic management. Implemented cost-saving measures by optimizing resource utilization across all cloud-based infrastructure environments.",
    highlights: [
      "Replaced ASG with Karpenter — intelligent bin-packing & Spot Instance utilization at scale",
      "Right-sized all node groups — eliminated chronic over-provisioning across clusters",
      "Cost-saving framework applied org-wide across all cloud workloads",
    ],
    tags: ["Karpenter", "AWS", "EC2", "ASG", "Cost Optimization", "Spot Instances", "Autoscaling"],
    color: "#34d399",
    glow: "rgba(52,211,153,.12)",
    icon: "↓",
    metrics: [
      { label: "Cost Reduction", val: "35%" },
      { label: "Provisioning Speed", val: "3×" },
    ],
  },
  {
    id: 3,
    index: "03",
    title: "Oracle Cloud Infrastructure POC",
    subtitle: "OCI · Karpenter · Istio · Virtual Services · Gateway · Service Mesh · QA",
    description:
      "Designed and executed a proof-of-concept for Oracle Cloud Infrastructure (OCI) and successfully deployed the first production environment. Deployed Karpenter on OCI to automate node provisioning and manage compute costs efficiently through intelligent bin-packing. Deployed Istio, Virtual Services, and Gateways to manage traffic routing and enhance microservices communication within Kubernetes clusters, streamlining service mesh configurations. Resolved all QA-reported issues to achieve a stable, live deployment.",
    highlights: [
      "Istio + Virtual Services + Gateways — full service mesh traffic control on OCI",
      "Karpenter on OCI — automated node provisioning with intelligent cost management",
      "End-to-end QA ownership: resolved every issue from staging to stable live production",
    ],
    tags: ["OCI", "Oracle Cloud", "Karpenter", "Istio", "Virtual Services", "Gateway", "Service Mesh", "POC", "Production Deployment", "QA"],
    color: "#f97316",
    glow: "rgba(249,115,22,.12)",
    icon: "◈",
    metrics: [
      { label: "Environments Deployed", val: "1st" },
      { label: "QA Issues Resolved", val: "100%" },
    ],
  },
  {
    id: 4,
    index: "04",
    title: "ACR Migration & Decommission",
    subtitle: "Azure Container Registry · Image Cleanup · CI/CD Pipeline Cutover",
    description:
      "Led decommissioning of the old Azure Container Registry and migrated all assets to a new ACR instance. Executed a full audit and cleanup of stale and unused images, reducing storage bloat and eliminating legacy registry dependencies across all pipelines. Troubleshot production issues effectively, working closely with development teams to implement solutions that improved system uptime and minimized downtime throughout the migration.",
    highlights: [
      "Full image audit — all stale & orphaned layers identified and purged from registry",
      "Zero-downtime pipeline cutover coordinated across all development teams",
      "Cross-functional collaboration with dev teams ensured no regressions post-migration",
    ],
    tags: ["Azure", "ACR", "Container Registry", "Migration", "Image Cleanup", "CI/CD", "DevOps"],
    color: "#fb7185",
    glow: "rgba(251,113,133,.12)",
    icon: "⬡",
    metrics: [
      { label: "Registry Migrated", val: "100%" },
      { label: "Stale Images Removed", val: "↓ GB" },
    ],
  },
  {
    id: 5,
    index: "05",
    title: "Alerting Standardization & Observability",
    subtitle: "Prometheus · AlertManager · Helm · Grafana · RCA · Automation",
    description:
      "Built a Helm-based centralized alerting system improving monitoring consistency across 50+ services. Reduced MTTR by establishing unified runbooks, alert routing rules, and escalation policies. Conducted root-cause analyses after major incidents to identify areas for process improvement or technical enhancement. Enhanced system reliability by implementing monitoring tools and automation techniques. Proactively identified performance bottlenecks, working on continuous improvements to system resilience and reliability.",
    highlights: [
      "Post-incident RCA framework standardized — consistent learnings captured across all teams",
      "Unified runbooks + routing rules + escalation policies covering 50+ services",
      "Proactive bottleneck detection via automation reduced reactive firefighting significantly",
    ],
    tags: ["Prometheus", "AlertManager", "Helm", "Grafana", "MTTR", "RCA", "Observability", "Automation", "SRE"],
    color: "#a78bfa",
    glow: "rgba(167,139,250,.12)",
    icon: "△",
    metrics: [
      { label: "Alerts Standardized", val: "50+" },
      { label: "MTTR", val: "-40%" },
    ],
  },
  {
    id: 6,
    index: "06",
    title: "Crossplane Infrastructure Automation",
    subtitle: "Crossplane · Compositions · XRDs · Azure · OCI · Developer Self-Service",
    description:
      "Implemented Crossplane across Oracle Cloud (OCI) and Azure to standardise infrastructure definitions and eliminate manual provisioning. Created reusable Compositions and XRDs enabling developer self-service for on-demand cloud environments. Reduced provisioning time by 40–60% and improved reproducibility across both cloud providers.",
    highlights: [
      "Crossplane on OCI & Azure — unified control-plane IaC across two cloud providers",
      "Reusable Compositions & XRDs — developers provision environments without ops involvement",
      "40–60% cut in manual provisioning time with full environment reproducibility",
    ],
    tags: ["Crossplane", "OCI", "Azure", "Compositions", "XRDs", "IaC", "GitOps", "Platform Engineering", "Self-Service"],
    color: "#38bdf8",
    glow: "rgba(56,189,248,.12)",
    icon: "⊕",
    metrics: [
      { label: "Provisioning Time", val: "-50%" },
      { label: "Cloud Providers", val: "2" },
    ],
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
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
          cursor: pointer;
        }
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
          font-size: 0.62rem;
          color: #475569;
          letter-spacing: 0.04em;
        }
        .proj-chevron {
          font-size: 0.6rem; color: #334155;
          transition: transform 0.3s, color 0.3s;
          flex-shrink: 0;
          user-select: none;
        }
        .proj-card.open .proj-chevron {
          transform: rotate(180deg);
          color: #94a3b8;
        }

        /* Expandable body */
        .proj-body {
          max-height: 0; overflow: hidden;
          transition: max-height 0.48s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .proj-card.open .proj-body { max-height: 900px; }

        .proj-body-inner {
          padding: 20px 24px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .proj-desc {
          font-size: 0.93rem; color: #94a3b8;
          line-height: 1.78; margin-bottom: 18px;
          overflow-wrap: break-word;
        }

        /* ── Key Highlights ── */
        .proj-highlights {
          margin-bottom: 20px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .proj-highlights-label {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 8px 14px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .proj-highlights-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .proj-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 9px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          font-size: 0.84rem;
          color: #94a3b8;
          line-height: 1.55;
          transition: background 0.2s;
        }
        .proj-highlight-item:last-child { border-bottom: none; }
        .proj-highlight-item:hover { background: rgba(255,255,255,0.02); }
        .proj-highlight-arrow {
          font-size: 0.65rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* Metrics */
        .proj-metrics {
          display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap;
        }
        .proj-metric {
          padding: 10px 16px; border-radius: 10px; border: 1px solid; min-width: 110px;
        }
        .metric-val {
          font-size: 1.2rem; font-weight: 800;
          line-height: 1; margin-bottom: 4px;
        }
        .metric-lbl {
          font-family: var(--font-mono);
          font-size: 0.56rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
        }

        /* Tags */
        .proj-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .proj-tag {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.05em;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.07);
        }


        @media (prefers-reduced-motion: reduce) {
          .proj-body { transition: none; }
          .proj-chevron { transition: none; }
          .proj-card { transition: none; }
          .proj-highlight-item { transition: none; }
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

                  {/* Key Highlights */}
                  {p.highlights?.length > 0 && (
                    <div className="proj-highlights">
                      <div
                        className="proj-highlights-label"
                        style={{ color: p.color + "bb" }}
                      >
                        <span
                          className="proj-highlights-dot"
                          style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
                          aria-hidden="true"
                        />
                        Key Highlights
                      </div>
                      {p.highlights.map((h, i) => (
                        <div key={i} className="proj-highlight-item">
                          <span
                            className="proj-highlight-arrow"
                            style={{ color: p.color }}
                            aria-hidden="true"
                          >→</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Metrics */}
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

                  {/* Tags */}
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
