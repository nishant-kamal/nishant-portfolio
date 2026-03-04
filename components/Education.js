"use client";

import { useState } from "react";

const education = [
  {
    id: 1,
    degree: "M.Tech",
    field: "Cloud Computing",
    institution: "BITS Pilani",
    type: "Postgraduate · In Progress",
    year: "2024 – Present",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.15)",
    icon: "◈",
    description:
      "Focus on distributed systems, cloud infrastructure, and scalable platform architectures. Deep dive into large-scale systems engineering and advanced cloud-native design patterns.",
    tags: ["Distributed Systems", "Cloud Native", "Platform Arch"],
  },
  {
    id: 2,
    degree: "B.Tech",
    field: "Electrical & Electronics Engineering",
    institution: "VIT University, Vellore",
    type: "Undergraduate",
    year: "2015 – 2019",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    icon: "⬡",
    description:
      "Strong foundation in systems engineering, distributed computing fundamentals, and structured problem-solving that underpins modern infrastructure thinking.",
    tags: ["Systems Engineering", "Computing Fundamentals", "Problem Solving"],
  },
  {
    id: 3,
    degree: "Certifications",
    field: "Continuous Learning",
    institution: "AWS · CNCF · HashiCorp",
    type: "Professional Development",
    year: "Ongoing",
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    icon: "△",
    description:
      "Active pursuit of industry certifications across cloud, infrastructure, and DevOps domains to stay at the forefront of platform engineering practices.",
    tags: ["Kubernetes", "AWS", "Terraform", "Cloud Architecture"],
  },
];

export default function Education() {
  const [active, setActive] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .edu-section {
          font-family: 'Syne', sans-serif;
          position: relative;
          padding: 96px 0;
          overflow: hidden;
        }

        .edu-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: .7rem; letter-spacing: .2em;
          text-transform: uppercase; color: #38bdf8;
          background: rgba(56,189,248,.08);
          border: 1px solid rgba(56,189,248,.2);
          padding: 4px 12px; border-radius: 4px;
          display: inline-block; margin-bottom: 20px;
        }

        .edu-heading {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800; line-height: 1.05;
          letter-spacing: -.02em; color: #f8fafc;
          margin-bottom: 64px;
        }
        .edu-heading em { font-style: normal; color: #38bdf8; }

        /* timeline spine */
        .timeline {
          position: relative;
          display: flex; flex-direction: column; gap: 0;
        }
        .timeline::before {
          content: '';
          position: absolute; left: 23px; top: 0; bottom: 0; width: 1px;
          background: linear-gradient(to bottom,
            transparent 0%, rgba(255,255,255,.08) 10%,
            rgba(255,255,255,.08) 90%, transparent 100%);
        }

        /* entry */
        .edu-entry {
          position: relative;
          padding-left: 68px;
          padding-bottom: 48px;
          cursor: pointer;
        }
        .edu-entry:last-child { padding-bottom: 0; }

        /* dot */
        .edu-dot {
          position: absolute; left: 12px; top: 22px;
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: .65rem; font-weight: 700;
          border: 1px solid rgba(255,255,255,.12);
          background: #0b1120;
          transition: transform .3s ease, box-shadow .3s ease;
          z-index: 1;
        }
        .edu-entry:hover .edu-dot,
        .edu-entry.active .edu-dot {
          transform: scale(1.2);
        }

        /* connector tick */
        .edu-tick {
          position: absolute; left: 23px; top: 34px;
          width: 44px; height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,.08), transparent);
        }

        /* card */
        .edu-card {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(15,20,35,.75);
          backdrop-filter: blur(12px);
          padding: 28px 28px 24px;
          transition: border-color .3s, box-shadow .3s, transform .3s;
          position: relative; overflow: hidden;
        }
        .edu-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          opacity: 0; transition: opacity .3s;
          border-radius: 16px 16px 0 0;
        }
        .edu-entry:hover .edu-card,
        .edu-entry.active .edu-card {
          transform: translateX(4px);
        }

        /* card header */
        .card-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
          margin-bottom: 8px;
        }
        .card-degree {
          font-size: .72rem; font-weight: 700;
          font-family: 'DM Mono', monospace;
          letter-spacing: .1em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 6px;
          border: 1px solid; display: inline-block;
        }
        .card-year {
          font-family: 'DM Mono', monospace;
          font-size: .68rem; color: #475569;
          letter-spacing: .06em; white-space: nowrap;
          margin-top: 4px;
        }

        .card-field {
          font-size: 1.1rem; font-weight: 700;
          color: #f1f5f9; margin: 10px 0 4px;
          line-height: 1.3;
        }
        .card-institution {
          font-family: 'DM Mono', monospace;
          font-size: .75rem; color: #64748b;
          letter-spacing: .06em;
        }
        .card-type {
          font-size: .75rem; color: #475569;
          margin-top: 2px;
        }

        /* expandable description */
        .card-desc {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height .4s ease, opacity .3s ease, margin .3s ease;
          margin-top: 0;
        }
        .edu-entry.active .card-desc {
          max-height: 120px; opacity: 1; margin-top: 16px;
        }
        .card-desc p {
          font-size: .87rem; color: #94a3b8;
          line-height: 1.75;
        }

        /* tags */
        .card-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
          overflow: hidden; max-height: 0; opacity: 0;
          transition: max-height .4s ease .05s, opacity .3s ease .05s, margin .3s ease;
          margin-top: 0;
        }
        .edu-entry.active .card-tags {
          max-height: 60px; opacity: 1; margin-top: 14px;
        }
        .card-tag {
          font-family: 'DM Mono', monospace; font-size: .65rem;
          padding: 4px 12px; border-radius: 6px;
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.03);
          color: #64748b; letter-spacing: .06em;
        }

        /* chevron */
        .card-chevron {
          font-size: .7rem; color: #334155;
          transition: transform .3s, color .3s;
          margin-top: 6px; flex-shrink: 0;
        }
        .edu-entry.active .card-chevron { transform: rotate(180deg); }

        /* number index */
        .entry-index {
          font-family: 'DM Mono', monospace;
          font-size: .6rem; color: #1e293b;
          position: absolute; left: 4px; top: -8px;
          letter-spacing: .04em;
        }
      `}</style>

      <section id="education" className="edu-section">
        <span className="edu-eyebrow">02 — Education</span>
        <h2 className="edu-heading">
          Built on <em>strong</em><br />foundations.
        </h2>

        <div className="timeline">
          {education.map((item, i) => (
            <div
              key={item.id}
              className={`edu-entry ${active === item.id ? "active" : ""}`}
              onClick={() => setActive(active === item.id ? null : item.id)}
            >
              {/* dot */}
              <div
                className="edu-dot"
                style={{
                  color: item.color,
                  boxShadow: active === item.id ? `0 0 12px ${item.glow}` : "none",
                  borderColor: active === item.id ? item.color + "55" : "rgba(255,255,255,.1)",
                }}
              >
                {item.icon}
              </div>

              <div className="edu-tick" />

              {/* card */}
              <div
                className="edu-card"
                style={{
                  borderColor: active === item.id
                    ? item.color + "40"
                    : "rgba(255,255,255,.06)",
                  boxShadow: active === item.id
                    ? `0 8px 40px ${item.glow}, inset 0 0 0 1px ${item.color}22`
                    : "none",
                }}
              >
                <div
                  className="card-card-before"
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, ${item.color}, transparent)`,
                    opacity: active === item.id ? 1 : 0,
                    transition: "opacity .3s",
                    borderRadius: "16px 16px 0 0",
                  }}
                />

                <div className="card-top">
                  <div>
                    <span
                      className="card-degree"
                      style={{ color: item.color, borderColor: item.color + "40", background: item.glow }}
                    >
                      {item.degree}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="card-year">{item.year}</span>
                    <span className="card-chevron">▼</span>
                  </div>
                </div>

                <div className="card-field">{item.field}</div>
                <div className="card-institution">{item.institution}</div>
                <div className="card-type">{item.type}</div>

                <div className="card-desc">
                  <p>{item.description}</p>
                </div>

                <div className="card-tags">
                  {item.tags.map((t) => (
                    <span key={t} className="card-tag"
                      style={{ borderColor: item.color + "30", color: item.color + "cc" }}
                    >{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
