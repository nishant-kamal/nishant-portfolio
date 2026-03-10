"use client";

import { useState } from "react";

// FIX 1: Removed @import Google Fonts — loaded via next/font in layout.js

const education = [
  {
    id: 1,
    degree: "M.Tech",
    field: "Cloud Computing",
    institution: "BITS Pilani",
    type: "Postgraduate · In Progress",
    year: "2024 – Present",
    color: "#a78bfa",
    icon: "◈",
    description:
      "Specializing in Cloud-Native architectures and Distributed Systems. Researching high-availability patterns and automated control-plane scaling for modern enterprise clusters.",
    tags: ["Dist. Systems", "K8s Logic", "Platform Eng"],
  },
  {
    id: 2,
    degree: "B.Tech",
    field: "Electrical & Electronics Engineering",
    institution: "VIT University, Vellore",
    type: "Undergraduate",
    year: "2015 – 2019",
    color: "#38bdf8",
    icon: "⬡",
    description:
      "Core foundation in engineering logic and systematic problem-solving. Specialized in low-latency communication and hardware-level performance optimization.",
    tags: ["Systems Logic", "Engineering Design", "Circuitry"],
  },
  {
    id: 3,
    degree: "Certifications",
    field: "Production Readiness",
    institution: "AWS · CNCF · HashiCorp",
    type: "Active Credentials",
    year: "Ongoing",
    color: "#34d399",
    icon: "△",
    description:
      "Deeply certified across the cloud ecosystem. Maintaining active status in Kubernetes administration, AWS architecture, and Terraform-based automation.",
    tags: ["CKA", "AWS SAP", "Terraform Associate"],
  },
];

export default function Education() {
  const [active, setActive] = useState(1);

  return (
    // FIX 2: Removed duplicate <section id="education"> and duplicate
    // background + padding — these are set by page.js wrapper section.
    // The .edu-root padding reduced to avoid double-spacing.
    <div className="edu-root">
      <style>{`
        .edu-root {
          font-family: var(--font-sans);
          color: #f8fafc;
          padding: 20px 0 60px;
          position: relative;
        }

        .edu-headline {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin: 0 0 64px;
          color: #f8fafc;
        }
        .edu-headline em { font-style: normal; color: #a78bfa; }

        .timeline-grid {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .timeline-spine {
          position: absolute;
          left: 32px; top: 0; bottom: 0; width: 1px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255,255,255,0.08) 15%,
            rgba(255,255,255,0.08) 85%,
            transparent
          );
          pointer-events: none;
        }

        .edu-entry {
          position: relative;
          padding-left: 80px;
          cursor: pointer;
        }
        .edu-node {
          position: absolute; left: 22px; top: 32px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #020617;
          border: 2px solid rgba(255,255,255,0.15);
          z-index: 10;
          transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .edu-node::after {
          content: "";
          width: 6px; height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
          transition: background 0.4s;
        }
        .edu-entry.active .edu-node {
          border-color: var(--clr);
          transform: scale(1.4);
          box-shadow: 0 0 20px var(--glow);
        }
        .edu-entry.active .edu-node::after { background: var(--clr); }

        .edu-bento {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 22px;
          padding: 28px 36px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.4s, transform 0.4s, background 0.4s, box-shadow 0.4s;
        }
        .edu-entry:hover .edu-bento {
          border-color: rgba(255,255,255,0.12);
          transform: translateX(8px);
        }
        .edu-entry.active .edu-bento {
          background: rgba(30, 41, 59, 0.6);
          border-color: var(--clr-fade);
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.5);
          transform: translateX(0); /* active state resets hover shift */
        }

        /* FIX 3: Added :focus-visible for keyboard navigation */
        .edu-entry:focus-visible .edu-bento {
          outline: 2px solid var(--clr);
          outline-offset: 2px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .degree-title {
          font-size: 1.6rem; font-weight: 800; color: #fff; margin-bottom: 4px;
          line-height: 1.2;
        }
        .inst-title {
          font-family: var(--font-mono);
          font-size: 0.8rem; color: #94a3b8;
        }
        .year-label {
          font-family: var(--font-mono);
          font-size: 0.72rem; color: #475569;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .expandable-content {
          max-height: 0; opacity: 0; overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease, margin-top 0.4s ease;
        }
        /* FIX 4: max-height increased from 200px → 400px to prevent
           long descriptions being clipped on smaller text sizes */
        .edu-entry.active .expandable-content {
          max-height: 400px;
          opacity: 1;
          margin-top: 20px;
        }

        .edu-desc {
          font-size: 0.95rem; line-height: 1.75;
          color: #94a3b8; margin-bottom: 20px;
          max-width: 760px;
          overflow-wrap: break-word;
        }
        .tag-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
        .edu-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          padding: 5px 12px; border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          color: #94a3b8;
          transition: color 0.3s, border-color 0.3s, background 0.3s;
        }
        .edu-entry.active .edu-tag {
          color: var(--clr);
          border-color: var(--clr-fade);
          background: var(--bg-accent);
        }

        @media (max-width: 768px) {
          .edu-node       { left: 12px; }
          .timeline-spine { left: 22px; }
          .edu-entry      { padding-left: 48px; }
          .card-header    { flex-direction: column; gap: 6px; }
          .edu-bento      { padding: 20px 22px; }
          .degree-title   { font-size: 1.3rem; }
        }
      `}</style>

      <h2 id="education-title" className="edu-headline">
        Building on <em>Engineering</em> Excellence.
      </h2>

      <div className="timeline-grid">
        <div className="timeline-spine" aria-hidden="true" />

        {education.map((item) => (
          <div
            key={item.id}
            className={`edu-entry ${active === item.id ? "active" : ""}`}
            style={{
              "--clr":      item.color,
              "--clr-fade": item.color + "33",
              "--glow":     item.color + "44",
              "--bg-accent":item.color + "10",
            }}
            onClick={() => setActive(item.id)}
            // FIX 5: Keyboard accessibility
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(item.id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={active === item.id}
            aria-label={`${item.degree} in ${item.field} at ${item.institution}`}
          >
            <div className="edu-node" aria-hidden="true" />

            <div className="edu-bento">
              <div className="card-header">
                <div>
                  <div className="degree-title">{item.degree} in {item.field}</div>
                  <div className="inst-title">{item.institution} // {item.type}</div>
                </div>
                <div className="year-label">{item.year}</div>
              </div>

              <div className="expandable-content">
                <p className="edu-desc">{item.description}</p>
                <div className="tag-wrap">
                  {item.tags.map((t) => (
                    <span key={t} className="edu-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
