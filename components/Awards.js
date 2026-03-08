"use client";

import { useRef } from "react";

// Awards data — ordered chronologically descending
const awards = [
  {
    id: 1,
    title: "Customer Happiness Champion",
    period: "Jun 2025",
    quarter: "OND 2024",
    description:
      "Recognised as the Customer Happiness Champion for the OND 2024 quarter, reflecting outstanding dedication to client success and service quality.",
    color: "#38bdf8",
    glow: "rgba(56,189,248,.15)",
    icon: "★",
    tag: "Customer Excellence",
  },
  {
    id: 2,
    title: "Acers — Rising Star",
    period: "May 2024",
    quarter: "FarEye",
    description:
      "Recognised for emerging leadership and innovation in SRE practices, demonstrating exceptional growth and technical initiative at FarEye.",
    color: "#34d399",
    glow: "rgba(52,211,153,.15)",
    icon: "◈",
    tag: "Leadership & Innovation",
  },
  {
    id: 3,
    title: "Captain Marvel",
    period: "Mar 2023",
    quarter: "OND 2022",
    description:
      "Demonstrated the superpower of passion for customers during the OND 2022 quarter through exceptional client-facing impact.",
    color: "#a78bfa",
    glow: "rgba(167,139,250,.15)",
    icon: "⬡",
    tag: "Customer Passion",
  },
  {
    id: 4,
    title: "Dark Knight",
    period: "Oct 2022",
    quarter: "JAS 2022",
    description:
      "Awarded for complex problem-solving and technical resilience during the JAS 2022 quarter, tackling high-stakes infrastructure challenges.",
    color: "#fb923c",
    glow: "rgba(251,146,60,.15)",
    icon: "△",
    tag: "Problem Solving",
  },
  {
    id: 5,
    title: "Dark Knight",
    period: "Jun 2022",
    quarter: "Q1 2022",
    description:
      "Recognised for technical excellence and root-cause analysis (RCA) skills, resolving critical incidents and elevating platform stability.",
    color: "#f472b6",
    glow: "rgba(244,114,182,.15)",
    icon: "◉",
    tag: "Technical Excellence",
  },
  {
    id: 6,
    title: "Captain Marvel",
    period: "Oct 2020",
    quarter: "Q3 2020",
    description:
      "Acknowledged for delivering customer-centric solutions and going above and beyond to ensure platform reliability and client satisfaction.",
    color: "#fbbf24",
    glow: "rgba(251,191,36,.15)",
    icon: "☸",
    tag: "Customer-Centric",
  },
];

export default function Awards() {
  return (
    <div className="awards-wrap">
      <style>{`
        .awards-wrap {
          padding: 20px 0 60px;
          color: #f8fafc;
        }

        /* ── Heading ── */
        .awards-heading {
          font-size: clamp(2.5rem, 6vw, 3.75rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f8fafc;
          margin: 0 0 12px;
          line-height: 1.1;
        }
        .awards-heading em { font-style: normal; color: #fbbf24; }

        .awards-subhead {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #475569;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 52px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .awards-subhead::before {
          content: '';
          display: block;
          width: 36px;
          height: 1px;
          background: #334155;
          flex-shrink: 0;
        }

        /* ── Timeline spine ── */
        .awards-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .awards-timeline::before {
          content: '';
          position: absolute;
          left: 31px;
          top: 20px;
          bottom: 20px;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255,255,255,0.07) 10%,
            rgba(255,255,255,0.07) 90%,
            transparent
          );
          pointer-events: none;
        }

        /* ── Award row ── */
        .award-row {
          position: relative;
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 0 20px;
          padding: 0 0 20px;
        }

        /* Timeline node */
        .award-node-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          padding-top: 22px;
        }
        .award-node {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.1);
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
          z-index: 2;
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
        }
        .award-row:hover .award-node {
          border-color: var(--clr);
          box-shadow: 0 0 16px var(--glow);
          transform: scale(1.25);
        }

        /* Card */
        .award-card {
          position: relative;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(15, 20, 35, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s, background 0.35s;
          padding: 22px 26px;
        }
        .award-row:hover .award-card {
          border-color: var(--clr-fade);
          box-shadow: 0 8px 32px var(--glow);
          background: rgba(20, 28, 50, 0.75);
        }

        /* Top accent bar */
        .award-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--clr), transparent);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          border-radius: 18px 18px 0 0;
        }
        .award-row:hover .award-top-bar { opacity: 1; }

        /* Card layout */
        .award-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .award-title-block { flex: 1; min-width: 0; }

        .award-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.3;
          margin-bottom: 4px;
        }
        .award-meta {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: #475569;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .award-meta span {
          color: var(--clr);
          opacity: 0.75;
        }

        /* Right side — period pill */
        .award-period {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          padding: 4px 12px;
          border-radius: 99px;
          border: 1px solid var(--clr-fade);
          color: var(--clr);
          background: var(--clr-bg);
          white-space: nowrap;
          flex-shrink: 0;
          align-self: flex-start;
        }

        .award-desc {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.7;
          margin: 0 0 14px;
          overflow-wrap: break-word;
        }

        /* Tag chip */
        .award-tag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 6px;
          border: 1px solid var(--clr-fade);
          color: var(--clr);
          background: var(--clr-bg);
        }

        /* Responsive */
        @media (max-width: 600px) {
          .awards-timeline::before { left: 22px; }
          .award-row { grid-template-columns: 46px 1fr; gap: 0 14px; }
          .award-node { width: 22px; height: 22px; font-size: 0.65rem; }
          .award-card { padding: 18px 18px; }
          .award-card-header { flex-direction: column; gap: 8px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .award-card,
          .award-node,
          .award-top-bar { transition: none; }
        }
      `}</style>

      {/* Heading */}
      <h2 id="awards-title" className="awards-heading">
        Recognition &<br />
        <em>Awards.</em>
      </h2>
      <p className="awards-subhead">6 awards across 5 years</p>

      {/* Timeline */}
      <div
        className="awards-timeline"
        role="list"
        aria-label="Awards timeline"
      >
        {awards.map((a) => (
          <div
            key={a.id}
            className="award-row"
            role="listitem"
            style={{
              "--clr":      a.color,
              "--clr-fade": a.color + "35",
              "--clr-bg":   a.color + "12",
              "--glow":     a.glow,
            }}
          >
            {/* Node column */}
            <div className="award-node-col" aria-hidden="true">
              <div
                className="award-node"
                style={{ color: a.color }}
              >
                {a.icon}
              </div>
            </div>

            {/* Card */}
            <div className="award-card">
              <div className="award-top-bar" aria-hidden="true" />

              <div className="award-card-header">
                <div className="award-title-block">
                  <div className="award-title">{a.title}</div>
                  <div className="award-meta">
                    Quarter: <span>{a.quarter}</span>
                  </div>
                </div>
                <div className="award-period">{a.period}</div>
              </div>

              <p className="award-desc">{a.description}</p>
              <span className="award-tag">{a.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
