"use client";

import { useState, useEffect, useRef } from "react";

// --- Data ---
const tags = [
  "Kubernetes", "AWS", "Crossplane", "GitOps",
  "Prometheus", "Grafana", "Kafka", "Istio",
  "Terraform", "ArgoCD", "Observability"
];

// --- Hook for Animations ---
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function About() {
  const [sectionRef, inView] = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

        .about-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #020617;
          color: #f8fafc;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .about-root::after {
          content: ''; position: absolute; inset: 0; opacity: 0.02; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .container { max-width: 1300px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 10; }

        .section-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #a78bfa;
          background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2);
          padding: 6px 14px; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.1em;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
          margin-top: 60px;
        }

        .bento-card {
          background: rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border-radius: 32px;
          padding: 40px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0; transform: translateY(30px);
        }
        .bento-card.visible { opacity: 1; transform: translateY(0); }
        .bento-card:hover { border-color: rgba(167, 139, 250, 0.3); background: rgba(30, 41, 59, 0.5); }

        /* Adjusted Grid Layout */
        .card-identity { grid-column: span 8; }
        .card-terminal { grid-column: span 4; }
        .card-story { grid-column: span 12; }

        @media (max-width: 1024px) {
          .bento-grid > div { grid-column: span 12 !important; }
        }

        .status-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
          color: #22c55e; background: rgba(34, 197, 94, 0.1);
          padding: 4px 12px; border-radius: 8px; margin-bottom: 24px;
        }
        .pulse { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; animation: p 2s infinite; }
        @keyframes p { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

        .tag-pill {
          font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
          padding: 8px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02); transition: 0.3s;
        }
        .tag-pill:hover { border-color: #a78bfa; color: #a78bfa; background: rgba(167, 139, 250, 0.1); }

        .terminal-header { background: #111820; padding: 12px; border-bottom: 1px solid #1e2d3d; display: flex; gap: 6px; }
        .t-dot { width: 10px; height: 10px; border-radius: 50%; }
      `}</style>

      <section className="about-root" ref={sectionRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="section-tag">01 — Identity Analysis</span>
            <h2 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', marginTop: '24px' }}>
              Building <span style={{ color: '#a78bfa' }}>Robust</span> Systems.
            </h2>
          </div>

          <div className="bento-grid">
            {/* Card 1: Main Identity */}
            <div className={`bento-card card-identity ${inView ? "visible" : ""}`} style={{ transitionDelay: '0.1s' }}>
              <div className="status-badge"><div className="pulse" /> System Operational</div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Nishant Kamal</h3>
              <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '32px' }}>
                Site Reliability Engineer specializing in <strong>Control Plane architecture</strong> and high-availability cloud ecosystems. 
                Focusing on the intersection of scalability and resilience.
              </p>
              <div style={{ display: 'flex', gap: '32px' }}>
                <div>
                  <div style={{ color: '#475569', fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>Location</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Delhi, India</div>
                </div>
                <div>
                  <div style={{ color: '#475569', fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>Current Focus</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Platform Engineering</div>
                </div>
              </div>
            </div>

            {/* Card 2: Terminal JSON (Education) */}
            <div className={`bento-card card-terminal ${inView ? "visible" : ""}`} style={{ transitionDelay: '0.2s', padding: 0 }}>
              <div className="terminal-header">
                <div className="t-dot" style={{ background: '#ff5f56' }} />
                <div className="t-dot" style={{ background: '#ffbd2e' }} />
                <div className="t-dot" style={{ background: '#27c93f' }} />
                <span style={{ fontSize: '0.65rem', color: '#475569', fontFamily: 'JetBrains Mono', marginLeft: '8px' }}>credentials.json</span>
              </div>
              <div style={{ padding: '30px', fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: '#a78bfa', lineHeight: 1.5 }}>
                <div>{`{`}</div>
                <div style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#f8fafc' }}>"degree":</span> "M.Tech Cloud",<br />
                  <span style={{ color: '#f8fafc' }}>"institution":</span> "BITS Pilani",<br />
                  <span style={{ color: '#f8fafc' }}>"status":</span> "In_Progress",<br />
                  <span style={{ color: '#f8fafc' }}>"GPA":</span> "A+"
                </div>
                <div>{`}`}</div>
              </div>
            </div>

            {/* Card 3: Narrative & Stack (Expanded) */}
            <div className={`bento-card card-story ${inView ? "visible" : ""}`} style={{ transitionDelay: '0.3s' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px' }}>
                <div>
                  <div style={{ color: '#a78bfa', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', marginBottom: '16px' }}>&gt; CORE_PHILOSOPHY</div>
                  <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.1rem' }}>
                    I model systems before I build them. My work focuses on <span style={{ color: '#fff', fontWeight: 600 }}>resiliency-first architecture</span>. 
                    From orchestrating multi-region cloud clusters to hardening infrastructure security with zero-trust principles and K8s-native management.
                  </p>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', marginBottom: '16px' }}>&gt; CORE_TOOLBOX</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
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
