"use client";

import { useState, useEffect, useRef } from "react";

const stats = [
  { value: "6+", label: "Years Experience" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50+", label: "Services Managed" },
  { value: "∞", label: "Coffee Cups" },
];

const tags = [
  "Kubernetes", "AWS", "Terraform", "GitOps",
  "Prometheus", "Grafana", "Kafka", "Service Mesh",
  "Distributed Systems", "SLOs / SLIs", "CI/CD", "Observability",
];

const glyphs = ["⬡", "△", "◈", "⬢", "◇", "⬟"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AnimatedCounter({ target, suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView();
  const num = parseFloat(target);
  const isNum = !isNaN(num);

  useEffect(() => {
    if (!inView || !isNum) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * num));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(num);
    };
    requestAnimationFrame(step);
  }, [inView, num, duration, isNum]);

  return (
    <span ref={ref}>
      {isNum ? `${val}${suffix}` : target}
    </span>
  );
}

export default function About() {
  const [sectionRef, sectionInView] = useInView(0.05);
  const [hoveredTag, setHoveredTag] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .about-section * { box-sizing: border-box; }

        .about-section {
          font-family: 'Syne', sans-serif;
          background: #050810;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          color: #e2e8f0;
        }

        /* ── grid overlay ── */
        .grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(99,179,237,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%);
        }

        /* ── ambient blobs ── */
        .blob {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none; z-index: 0;
          animation: drift 12s ease-in-out infinite alternate;
        }
        .blob-1 { width: 500px; height: 500px; top: -120px; left: -100px;
          background: radial-gradient(circle, rgba(56,189,248,.13) 0%, transparent 70%); }
        .blob-2 { width: 400px; height: 400px; bottom: 0; right: -80px;
          background: radial-gradient(circle, rgba(139,92,246,.12) 0%, transparent 70%);
          animation-delay: -6s; }

        @keyframes drift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.06); }
        }

        /* ── floating glyphs ── */
        .glyph {
          position: absolute; font-size: 1.1rem; pointer-events: none; z-index: 0;
          opacity: 0; color: rgba(99,179,237,.18);
          animation: floatGlyph 20s linear infinite;
        }
        @keyframes floatGlyph {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: .5; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }

        /* ── inner wrapper ── */
        .inner {
          position: relative; z-index: 1;
          max-width: 1180px; margin: 0 auto;
          padding: 96px 32px;
        }

        /* ── section header ── */
        .header-row {
          display: flex; align-items: center; gap: 20px; margin-bottom: 72px;
          opacity: 0; transform: translateY(28px);
          transition: opacity .7s ease, transform .7s ease;
        }
        .header-row.visible { opacity: 1; transform: translateY(0); }

        .eyebrow {
          font-family: 'DM Mono', monospace; font-size: .72rem;
          letter-spacing: .2em; color: #38bdf8; text-transform: uppercase;
          background: rgba(56,189,248,.08); border: 1px solid rgba(56,189,248,.2);
          padding: 4px 12px; border-radius: 4px;
        }
        .divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(56,189,248,.3), transparent);
        }

        .heading {
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800; line-height: 1.05;
          letter-spacing: -.02em; color: #f8fafc;
          opacity: 0; transform: translateY(32px);
          transition: opacity .7s ease .15s, transform .7s ease .15s;
          margin-bottom: 64px;
        }
        .heading.visible { opacity: 1; transform: translateY(0); }
        .heading em { font-style: normal; color: #38bdf8; }

        /* ── main grid ── */
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        @media (max-width: 860px) {
          .main-grid { grid-template-columns: 1fr; }
        }

        /* ── card base ── */
        .card {
          border-radius: 16px; padding: 32px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(15,20,35,.7);
          backdrop-filter: blur(12px);
          opacity: 0; transform: translateY(36px);
          transition: opacity .65s ease, transform .65s ease, border-color .3s;
        }
        .card.visible { opacity: 1; transform: translateY(0); }
        .card:hover { border-color: rgba(56,189,248,.25); }

        /* staggered delays */
        .card:nth-child(1) { transition-delay: .05s; }
        .card:nth-child(2) { transition-delay: .15s; }
        .card:nth-child(3) { transition-delay: .25s; }
        .card:nth-child(4) { transition-delay: .35s; }

        /* ── identity card ── */
        .identity-card { grid-column: span 1; }

        .avatar-row { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
        .avatar {
          width: 68px; height: 68px; border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem; font-weight: 800; color: #fff;
          flex-shrink: 0; position: relative;
        }
        .avatar::after {
          content: ''; position: absolute; inset: -3px; border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #a78bfa);
          z-index: -1; opacity: .4;
          animation: pulse-ring 2.5s ease-in-out infinite;
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: .4; }
          50%       { transform: scale(1.12); opacity: .1; }
        }
        .name { font-size: 1.3rem; font-weight: 700; color: #f8fafc; }
        .role-pill {
          font-family: 'DM Mono', monospace; font-size: .7rem;
          color: #38bdf8; background: rgba(56,189,248,.1);
          border: 1px solid rgba(56,189,248,.2);
          padding: 3px 10px; border-radius: 99px; margin-top: 5px;
          display: inline-block; letter-spacing: .08em;
        }

        .bio { color: #94a3b8; line-height: 1.75; font-size: .92rem; margin-bottom: 28px; }
        .bio strong { color: #e2e8f0; font-weight: 600; }

        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .meta-item { }
        .meta-label {
          font-family: 'DM Mono', monospace; font-size: .65rem;
          color: #475569; letter-spacing: .12em; text-transform: uppercase;
          margin-bottom: 4px;
        }
        .meta-value { color: #cbd5e1; font-size: .88rem; font-weight: 600; }

        /* ── stats card ── */
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 100%; }
        .stat-box {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 12px; padding: 22px 18px;
          transition: background .25s, border-color .25s;
        }
        .stat-box:hover {
          background: rgba(56,189,248,.06);
          border-color: rgba(56,189,248,.2);
        }
        .stat-num {
          font-size: 2rem; font-weight: 800;
          color: #38bdf8; line-height: 1;
          margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
        }
        .stat-lbl {
          font-family: 'DM Mono', monospace;
          font-size: .68rem; color: #64748b;
          letter-spacing: .1em; text-transform: uppercase;
        }

        /* ── narrative card ── */
        .narrative-card { grid-column: span 2; }
        @media (max-width: 860px) { .narrative-card { grid-column: span 1; } }

        .narrative-card p {
          color: #94a3b8; line-height: 1.8; font-size: .93rem;
          margin-bottom: 18px;
        }
        .narrative-card p:last-child { margin-bottom: 0; }

        .highlight {
          color: #e2e8f0; font-weight: 500;
          border-bottom: 1px solid rgba(56,189,248,.35);
          padding-bottom: 1px;
        }

        /* ── tags card ── */
        .tags-card { grid-column: span 2; }
        @media (max-width: 860px) { .tags-card { grid-column: span 1; } }

        .card-label {
          font-family: 'DM Mono', monospace; font-size: .68rem;
          color: #475569; letter-spacing: .14em; text-transform: uppercase;
          margin-bottom: 20px;
        }

        .tags-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
        .tag {
          font-family: 'DM Mono', monospace; font-size: .72rem;
          padding: 7px 16px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.03);
          color: #94a3b8; cursor: default;
          transition: all .2s ease;
          letter-spacing: .04em;
        }
        .tag:hover, .tag.active {
          background: rgba(56,189,248,.1);
          border-color: rgba(56,189,248,.35);
          color: #38bdf8;
          transform: translateY(-2px);
        }

        /* ── education badge (inside identity) ── */
        .edu-badge {
          margin-top: 24px; padding: 14px 18px;
          background: rgba(139,92,246,.08);
          border: 1px solid rgba(139,92,246,.2);
          border-radius: 12px;
          display: flex; align-items: flex-start; gap: 12px;
        }
        .edu-icon { font-size: 1.2rem; margin-top: 2px; }
        .edu-text { font-size: .82rem; color: #a78bfa; line-height: 1.55; }
        .edu-text strong { color: #c4b5fd; display: block; font-size: .85rem; }
      `}</style>

      {/* floating glyphs */}
      {glyphs.map((g, i) => (
        <span
          key={i}
          className="glyph"
          style={{
            left: `${10 + i * 16}%`,
            animationDuration: `${18 + i * 4}s`,
            animationDelay: `${i * 3}s`,
            fontSize: `${0.8 + (i % 3) * 0.4}rem`,
          }}
        >{g}</span>
      ))}

      <section className="about-section" ref={sectionRef}>
        <div className="grid-bg" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />

        <div className="inner">
          {/* header */}
          <div className={`header-row ${sectionInView ? "visible" : ""}`}>
            <span className="eyebrow">01 — About</span>
            <div className="divider-line" />
          </div>

          <h2 className={`heading ${sectionInView ? "visible" : ""}`}>
            Building systems that<br />
            <em>never sleep.</em>
          </h2>

          <div className="main-grid">
            {/* Identity */}
            <div className={`card identity-card ${sectionInView ? "visible" : ""}`}>
              <div className="avatar-row">
                <div className="avatar">NK</div>
                <div>
                  <div className="name">Nishant Kamal</div>
                  <span className="role-pill">Site Reliability Engineer</span>
                </div>
              </div>

              <p className="bio">
                I design <strong>resilient infrastructure</strong> and build
                scalable cloud platforms that keep production running smoothly —
                even when everything else is on fire.
              </p>

              <div className="meta-grid">
                {[
                  ["Experience", "6+ Years"],
                  ["Focus", "Platform Eng."],
                  ["Location", "India"],
                  ["Availability", "Open to Ops"],
                ].map(([k, v]) => (
                  <div key={k} className="meta-item">
                    <div className="meta-label">{k}</div>
                    <div className="meta-value">{v}</div>
                  </div>
                ))}
              </div>

              <div className="edu-badge">
                <span className="edu-icon">🎓</span>
                <div className="edu-text">
                  <strong>M.Tech — Cloud Computing</strong>
                  BITS Pilani · In Progress
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className={`card ${sectionInView ? "visible" : ""}`}>
              <div className="card-label">By the numbers</div>
              <div className="stats-grid">
                {stats.map(({ value, label }) => {
                  const num = parseFloat(value);
                  const suffix = isNaN(num) ? "" : value.replace(String(num), "");
                  return (
                    <div key={label} className="stat-box">
                      <div className="stat-num">
                        {isNaN(num)
                          ? value
                          : <AnimatedCounter target={num} suffix={suffix} />
                        }
                      </div>
                      <div className="stat-lbl">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Narrative */}
            <div className={`card narrative-card ${sectionInView ? "visible" : ""}`}>
              <div className="card-label">What I do</div>
              <p>
                My work revolves around operating{" "}
                <span className="highlight">reliable production platforms</span>{" "}
                built on Kubernetes and AWS. I focus on improving system stability,
                observability, and automation to ensure services remain resilient
                during high-traffic events and critical production workloads.
              </p>
              <p>
                I build and maintain cloud infrastructure using{" "}
                <span className="highlight">Terraform and GitOps workflows</span>,
                enabling reproducible deployments and improving operational
                efficiency across engineering teams.
              </p>
              <p>
                My experience includes working with distributed systems,
                observability stacks such as{" "}
                <span className="highlight">Prometheus and Grafana</span>,
                service mesh architectures, and event-driven platforms powered by Kafka.
              </p>
            </div>

            {/* Tags */}
            <div className={`card tags-card ${sectionInView ? "visible" : ""}`}>
              <div className="card-label">Tech & Tools</div>
              <div className="tags-wrap">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`tag ${hoveredTag === tag ? "active" : ""}`}
                    onMouseEnter={() => setHoveredTag(tag)}
                    onMouseLeave={() => setHoveredTag(null)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
