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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .edu-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #020617;
          color: #f8fafc;
          padding: 120px 0;
          position: relative;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }

        .edu-headline {
          font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; line-height: 1.1;
          letter-spacing: -0.04em; margin-bottom: 80px;
        }

        .edu-headline em { font-style: normal; color: #a78bfa; }

        /* The Power Grid Timeline */
        .timeline-grid {
          position: relative; display: flex; flex-direction: column; gap: 20px;
        }

        .timeline-spine {
          position: absolute; left: 32px; top: 0; bottom: 0; width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 15%, rgba(255,255,255,0.1) 85%, transparent);
        }

        .edu-entry {
          position: relative; padding-left: 80px; transition: 0.4s ease;
        }

        /* Interactive Dot */
        .edu-node {
          position: absolute; left: 22px; top: 35px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #020617; border: 2px solid rgba(255,255,255,0.2);
          z-index: 10; transition: 0.4s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .edu-entry.active .edu-node {
          border-color: var(--clr); transform: scale(1.4);
          box-shadow: 0 0 20px var(--glow);
        }
        .edu-node::after {
          content: ""; width: 6px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 50%; transition: 0.4s;
        }
        .edu-entry.active .edu-node::after { background: var(--clr); }

        /* Bento Card Style */
        .edu-bento {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px; padding: 32px 40px;
          cursor: pointer; backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .edu-bento:hover { border-color: rgba(255,255,255,0.15); transform: translateX(10px); }
        .edu-entry.active .edu-bento {
          background: rgba(30, 41, 59, 0.6);
          border-color: var(--clr-fade);
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.5);
        }

        .card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
        .degree-title { font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 4px; }
        .inst-title { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #94a3b8; }
        .year-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #475569; margin-top: 8px; }

        .expandable-content {
          max-height: 0; opacity: 0; overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .edu-entry.active .expandable-content { max-height: 200px; opacity: 1; margin-top: 24px; }

        .edu-desc { font-size: 1rem; line-height: 1.7; color: #94a3b8; margin-bottom: 24px; max-width: 800px; }

        .tag-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
        .edu-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
          padding: 6px 14px; border-radius: 8px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          color: #64748b; transition: 0.3s;
        }
        .edu-entry.active .edu-tag { color: var(--clr); border-color: var(--clr-fade); background: var(--bg-accent); }

        @media (max-width: 768px) {
          .edu-node { left: 12px; }
          .timeline-spine { left: 22px; }
          .edu-entry { padding-left: 50px; }
          .card-header { flex-direction: column; gap: 10px; }
          .year-label { margin-top: 0; }
        }
      `}</style>

      <section className="edu-root" id="education">
        <div className="container">
          <h2 className="edu-headline">Building on <em>Engineering</em> Excellence.</h2>

          <div className="timeline-grid">
            <div className="timeline-spine" />

            {education.map((item) => (
              <div
                key={item.id}
                className={`edu-entry ${active === item.id ? "active" : ""}`}
                style={{
                  "--clr": item.color,
                  "--clr-fade": item.color + "33",
                  "--glow": item.color + "44",
                  "--bg-accent": item.color + "10",
                }}
                onClick={() => setActive(item.id)}
              >
                <div className="edu-node" />
                
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
      </section>
    </>
  );
}
