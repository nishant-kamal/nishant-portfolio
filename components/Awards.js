"use client";

// Awards data — ordered chronologically descending (source: LinkedIn)
const awards = [
  {
    id: 1,
    title: "Customer Happiness Champion",
    period: "Jun 2025",
    quarter: "OND 2024",
    description:
      "For being the Customer Happiness Champion for OND 2024 Quarter, reflecting outstanding dedication to client success and service quality.",
    color: "#38bdf8",
    glow: "rgba(56,189,248,.2)",
    icon: "★",
    tag: "Customer Excellence",
    rank: "01",
  },
  {
    id: 2,
    title: "FarEye Acers : Rising Star",
    period: "May 2024",
    quarter: "Company Wide",
    description:
      "Recognised for emerging leadership and innovation in SRE practices, demonstrating exceptional growth and technical initiative.",
    color: "#34d399",
    glow: "rgba(52,211,153,.2)",
    icon: "◈",
    tag: "Leadership & Innovation",
    rank: "02",
  },
  {
    id: 3,
    title: "Spotted Award",
    period: "Apr 2023",
    quarter: "JFM 2023",
    description:
      "Recognised for consistently going above and beyond designated responsibilities to support customers, often extending beyond regular shift hours, reflecting strong ownership, team-first mindset, and a customer-centric approach in high-pressure situations.",
    color: "#f472b6",
    glow: "rgba(244,114,182,.2)",
    icon: "◉",
    tag: "Above & Beyond",
    rank: "03",
  },
  {
    id: 4,
    title: "Captain Marvel",
    period: "Mar 2023",
    quarter: "OND 2022",
    description:
      "For demonstrating the superpower of passion for customers for OND 2022.",
    color: "#a78bfa",
    glow: "rgba(167,139,250,.2)",
    icon: "⬡",
    tag: "Customer Passion",
    rank: "04",
  },
  {
    id: 5,
    title: "Dark Knight",
    period: "Oct 2022",
    quarter: "JAS 2022",
    description:
      "For demonstrating the superpower of complex problem solving for JAS 2022.",
    color: "#fb923c",
    glow: "rgba(251,146,60,.2)",
    icon: "△",
    tag: "Problem Solving",
    rank: "05",
  },
  {
    id: 6,
    title: "Dark Knight",
    period: "Jun 2022",
    quarter: "JFM 2022",
    description:
      "For demonstrating the superpower of complex problem-solving for JFM 2022.",
    color: "#fb923c",
    glow: "rgba(251,146,60,.2)",
    icon: "△",
    tag: "Technical Excellence",
    rank: "06",
  },
  {
    id: 7,
    title: "Captain Marvel",
    period: "Oct 2020",
    quarter: "JAS 2020",
    description:
      "For demonstrating the superpower of passion for customers for JAS 2020.",
    color: "#fbbf24",
    glow: "rgba(251,191,36,.2)",
    icon: "☸",
    tag: "Customer-Centric",
    rank: "07",
  },
];



export default function Awards() {
  return (
    <div className="aw-root">
      <style>{`
        .aw-root {
          padding: 20px 0 60px;
          color: #f8fafc;
          position: relative;
        }

        /* ── Heading row ── */
        .aw-head-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin: 0 0 8px;
          flex-wrap: wrap;
        }
        .aw-heading {
          font-size: clamp(2.5rem, 6vw, 3.75rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f8fafc;
          margin: 0;
          line-height: 1.1;
        }
        .aw-heading em { font-style: normal; color: #fbbf24; }

        /* ── Count badge ── */
        .aw-org-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 14px;
          background: rgba(10, 15, 30, 0.85);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          flex-shrink: 0;
          margin-bottom: 8px;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .aw-org-badge:hover {
          border-color: rgba(59,130,246,0.4);
          background: rgba(20, 30, 55, 0.9);
          box-shadow: 0 0 20px rgba(59,130,246,0.12);
        }
        .aw-org-logo {
          width: 32px; height: 32px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .aw-org-text { display: flex; flex-direction: column; gap: 2px; }
        .aw-org-name {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.78rem;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .aw-org-sub {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.55rem;
          color: #475569;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 1;
        }
        .aw-org-divider {
          width: 1px; height: 28px;
          background: rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .aw-org-stats { display: flex; flex-direction: column; gap: 2px; }
        .aw-org-stat-val {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.78rem;
          font-weight: 700;
          color: #fbbf24;
          line-height: 1;
        }
        .aw-org-stat-label {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.52rem;
          color: #334155;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1;
        }

        .aw-subhead {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.7rem;
          color: #334155;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0 0 48px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .aw-subhead::before {
          content: '';
          display: block; width: 36px; height: 1px;
          background: #1e293b; flex-shrink: 0;
        }

        /* ── Card grid ── */
        .aw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 860px) { .aw-grid { grid-template-columns: 1fr; } }

        /* First card spans full width — hero award */
        .aw-card-wrap:first-child { grid-column: 1 / -1; }

        /* ── Card ── */
        .aw-card {
          position: relative;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(10, 14, 28, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          overflow: hidden;
          padding: 28px 30px 24px;
          transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s, background 0.4s;
          cursor: default;
          display: flex;
          flex-direction: column;
          gap: 14px;
          height: 100%;
        }
        .aw-card:hover {
          border-color: var(--clr-fade);
          background: rgba(14, 20, 40, 0.88);
          transform: translateY(-4px);
          box-shadow: 0 24px 56px -12px var(--glow), 0 0 0 1px var(--clr-fade);
        }

        /* Accent top bar */
        .aw-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--clr) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .aw-card:hover::before { opacity: 1; }

        /* Corner rank watermark */
        .aw-rank-wm {
          position: absolute;
          bottom: 16px; right: 22px;
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 4.5rem;
          font-weight: 800;
          color: rgba(255,255,255,0.022);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.06em;
          transition: color 0.4s;
        }
        .aw-card:hover .aw-rank-wm { color: rgba(255,255,255,0.05); }

        /* Hero card (first) — larger rank */
        .aw-card-wrap:first-child .aw-rank-wm { font-size: 7rem; }

        /* Card top row */
        .aw-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .aw-card-left { display: flex; align-items: flex-start; gap: 14px; flex: 1; min-width: 0; }

        /* Icon orb */
        .aw-icon-orb {
          width: 46px; height: 46px;
          border-radius: 14px;
          background: var(--clr-bg);
          border: 1px solid var(--clr-fade);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          color: var(--clr);
          flex-shrink: 0;
          transition: box-shadow 0.4s, transform 0.4s;
        }
        .aw-card:hover .aw-icon-orb {
          box-shadow: 0 0 24px var(--glow);
          transform: scale(1.08) rotate(-5deg);
        }

        .aw-title-group { flex: 1; min-width: 0; }
        .aw-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.3;
          margin: 0 0 6px;
        }
        /* Hero title larger */
        .aw-card-wrap:first-child .aw-title { font-size: 1.35rem; }

        /* Period pill */
        .aw-period {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          padding: 5px 13px;
          border-radius: 99px;
          border: 1px solid var(--clr-fade);
          color: var(--clr);
          background: var(--clr-bg);
          white-space: nowrap;
          flex-shrink: 0;
          align-self: flex-start;
        }

        /* Quarter row */
        .aw-quarter-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .aw-quarter-label {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.6rem;
          color: #334155;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .aw-quarter-sep { width: 1px; height: 10px; background: rgba(255,255,255,0.08); }
        .aw-quarter-val {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.6rem;
          color: var(--clr);
          opacity: 0.8;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Description */
        .aw-desc {
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.75;
          margin: 0;
          overflow-wrap: break-word;
          flex: 1;
        }

        /* Card footer */
        .aw-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.04);
          margin-top: auto;
        }

        /* Tag chip */
        .aw-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.58rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 7px;
          border: 1px solid var(--clr-fade);
          color: var(--clr);
          background: var(--clr-bg);
          transition: border-color 0.3s, background 0.3s;
        }
        .aw-tag::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--clr);
          flex-shrink: 0;
          opacity: 0.7;
        }
        .aw-card:hover .aw-tag {
          border-color: var(--clr);
          background: rgba(255,255,255,0.04);
        }

        /* Mobile */
        @media (max-width: 600px) {
          .aw-card { padding: 22px 20px 18px; }
          .aw-head-row { flex-direction: column; align-items: flex-start; }
          .aw-org-badge { align-self: flex-start; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .aw-card, .aw-icon-orb { transition: none; }
          .aw-card:hover { transform: none; }
        }
      `}</style>

      {/* Heading + count badge */}
      <div className="aw-head-row">
        <h2 id="awards-title" className="aw-heading">
          Recognition &<br />
          <em>Awards.</em>
        </h2>

        <div className="aw-org-badge" title="Awards & Recognition">
<div className="aw-org-stats">
            <span className="aw-org-stat-val">7 Awards</span>
            <span className="aw-org-stat-label">5 yr tenure</span>
          </div>
        </div>
      </div>

      <p className="aw-subhead">7 awards across 5 years</p>

      {/* Grid */}
      <div className="aw-grid" role="list" aria-label="Awards">
        {awards.map((a) => (
          <div key={a.id} className="aw-card-wrap" role="listitem">
            <div
              className="aw-card"
              style={{
                "--clr":      a.color,
                "--clr-fade": a.color + "40",
                "--clr-bg":   a.color + "10",
                "--glow":     a.glow,
              }}
            >
              {/* Watermark rank */}
              <span className="aw-rank-wm" aria-hidden="true">{a.rank}</span>

              {/* Top row: icon + title + period */}
              <div className="aw-card-top">
                <div className="aw-card-left">
                  <div className="aw-icon-orb" aria-hidden="true">{a.icon}</div>
                  <div className="aw-title-group">
                    <div className="aw-title">{a.title}</div>

                  </div>
                </div>
                <div className="aw-period">{a.period}</div>
              </div>

              {/* Quarter */}
              <div className="aw-quarter-row">
                <span className="aw-quarter-label">Quarter</span>
                <div className="aw-quarter-sep" aria-hidden="true" />
                <span className="aw-quarter-val">{a.quarter}</span>
              </div>

              {/* Description */}
              <p className="aw-desc">{a.description}</p>

              {/* Footer */}
              <div className="aw-card-footer">
                <span className="aw-tag">{a.tag}</span>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
