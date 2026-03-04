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

  return <span ref={ref}>{isNum ? `${val}${suffix}` : target}</span>;
}

export default function About() {
  const [sectionRef, sectionInView] = useInView(0.05);
  const [hoveredTag, setHoveredTag] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .about-section {
          font-family: 'Inter', sans-serif;
          background: #020617; /* Deeper midnight blue */
          color: #f1f5f9;
          position: relative;
          overflow: hidden;
          padding: 100px 0;
        }

        /* Ambient Background */
        .grid-bg {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(rgba(56, 189, 248, 0.03) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1.5px, transparent 1.5px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
        }

        .blob {
          position: absolute; border-radius: 50%; filter: blur(120px); z-index: 0; opacity: 0.4;
        }
        .blob-1 { width: 600px; height: 600px; top: -10%; left: -10%; background: #0ea5e922; }
        .blob-2 { width: 500px; height: 500px; bottom: -5%; right: -5%; background: #8b5cf622; }

        .inner { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; padding: 0 32px; }

        /* Typography Refinement */
        .eyebrow {
          font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
          color: #38bdf8; letter-spacing: 0.2em; text-transform: uppercase;
          background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.2);
          padding: 6px 14px; border-radius: 6px;
        }

        .heading {
          font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; line-height: 1.1;
          letter-spacing: -0.03em; margin: 40px 0 60px;
        }
        .heading em { font-style: normal; background: linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        /* Grid & Cards */
        .main-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; }
        @media (max-width: 960px) { .main-grid { grid-template-columns: 1fr; } }

        .card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          border-radius: 24px; padding: 40px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0; transform: translateY(30px);
        }
        .card.visible { opacity: 1; transform: translateY(0); }
        .card:hover { border-color: rgba(56, 189, 248, 0.2); transform: translateY(-5px); box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5); }

        /* Identity */
        .avatar {
          width: 80px; height: 80px; border-radius: 24px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; font-weight: 800; color: white;
          box-shadow: 0 10px 20px rgba(14, 165, 233, 0.3);
        }
        .name { font-size: 1.5rem; font-weight: 700; color: #f8fafc; }
        .role-pill {
          font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
          color: #38bdf8; margin-top: 8px; display: inline-block;
        }

        .bio { font-size: 1.05rem; line-height: 1.8; color: #94a3b8; margin: 30px 0; }
        .bio strong { color: #f1f5f9; font-weight: 600; }

        /* Stats */
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .stat-box {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          padding: 24px; border-radius: 16px; text-align: center;
        }
        .stat-num {
          font-size: 2.25rem; font-weight: 800; color: #f8fafc; margin-bottom: 4px;
          background: linear-gradient(180deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .stat-lbl { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; }

        /* Tags */
        .tags-wrap { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
        .tag {
          font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
          padding: 8px 16px; border-radius: 99px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8; transition: all 0.3s;
        }
        .tag.active, .tag:hover {
          background: rgba(56, 189, 248, 0.1); border-color: #38bdf8; color: #38bdf8;
        }

        .highlight { color: #38bdf8; font-weight: 500; border-bottom: 1px solid rgba(56, 189, 248, 0.2); }
      `}</style>

      <section className="about-section" ref={sectionRef}>
        <div className="grid-bg" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />

        <div className="inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <span className="eyebrow">01 — Profile</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(56,189,248,0.3), transparent)' }} />
          </div>

          <h2 className={`heading ${sectionInView ? "visible" : ""}`}>
            Architecting systems<br />
            that <em>scale flawlessly.</em>
          </h2>

          <div className="main-grid">
            {/* Identity Card */}
            <div className={`card ${sectionInView ? "visible" : ""}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div className="avatar">NK</div>
                <div>
                  <div className="name">Nishant Kamal</div>
                  <span className="role-pill">Site Reliability Engineer</span>
                </div>
              </div>

              <p className="bio">
                I specialize in building <strong>high-availability platforms</strong> and 
                distributed systems. My mission is to bridge the gap between development 
                and operations using <strong>cloud-native technologies</strong> and 
                automation-first principles.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  ["Experience", "6+ Years"],
                  ["Focus", "Infrastructure"],
                  ["Location", "India"],
                  ["Current", "M.Tech @ BITS"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#cbd5e1' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className={`card ${sectionInView ? "visible" : ""}`} style={{ transitionDelay: '0.1s' }}>
              <div className="stats-grid">
                {stats.map(({ value, label }) => {
                  const num = parseFloat(value);
                  const suffix = isNaN(num) ? "" : value.replace(String(num), "");
                  return (
                    <div key={label} className="stat-box">
                      <div className="stat-num">
                        {isNaN(num) ? value : <AnimatedCounter target={num} suffix={suffix} />}
                      </div>
                      <div className="stat-lbl">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content & Tags */}
            <div className={`card ${sectionInView ? "visible" : ""}`} style={{ gridColumn: 'span 2', transitionDelay: '0.2s' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#38bdf8', marginBottom: '16px', textTransform: 'uppercase' }}>Expertise //</div>
                  <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                    Currently operating at the intersection of <span className="highlight">Infrastructure as Code</span> and <span className="highlight">Cloud Native Observability</span>. 
                    I focus on creating GitOps-driven environments that allow engineering teams to deploy with confidence and speed.
                  </p>
                </div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#64748b', marginBottom: '16px', textTransform: 'uppercase' }}>Tech Stack</div>
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
          </div>
        </div>
      </section>
    </>
  );
}
