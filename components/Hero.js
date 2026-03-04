"use client";

import { useEffect, useState } from "react";

const roles = [
  "Site Reliability Engineer",
  "DevOps Engineer",
  "Infrastructure Automator",
];

const bentoHighlights = [
  { 
    icon: "☸️", 
    title: "K8S ECOSYSTEM", 
    desc: "Scaling production-grade clusters with zero-downtime deployments and high availability." [cite: 34, 35]
  },
  { 
    icon: "☁️", 
    title: "AWS ARCHITECTURE", 
    desc: "Designing secure, multi-region cloud infrastructure optimized for performance and cost." [cite: 111, 112]
  },
  { 
    icon: "✈️", 
    title: "CROSSPLANE & GITOPS", 
    desc: "Building K8s-native control planes to manage cloud resources as custom resources." [cite: 96, 108]
  }
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 50);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, mounted]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .hero-section {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #020617;
          color: #fff;
          padding: 100px 0 60px;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* High-Authority Headline */
        .hero-headline {
          font-size: clamp(3.2rem, 7.5vw, 5.5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.05em;
          margin-bottom: 28px;
          max-width: 1100px;
        }

        .text-purple {
          background: linear-gradient(135deg, #a78bfa 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-sub-desc {
          font-size: 1.2rem;
          color: #94a3b8;
          line-height: 1.6;
          max-width: 700px;
          margin-bottom: 48px;
          font-weight: 400;
        }

        .hero-main-row {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          align-items: center;
          gap: 60px;
          margin-bottom: 70px;
        }

        /* Executive Profile Frame */
        .profile-signature-wrap {
          display: flex;
          justify-content: flex-end;
        }

        .profile-signature-frame {
          width: 360px;
          height: 360px;
          border-radius: 50%;
          position: relative;
          background: radial-gradient(circle at center, rgba(167, 139, 250, 0.25), transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(167, 139, 250, 0.15);
          box-shadow: 0 0 60px rgba(139, 92, 246, 0.1);
        }

        .profile-img-inner {
          width: 92%;
          height: 92%;
          border-radius: 50%;
          object-fit: cover;
          background: #0f172a;
          border: 4px solid #020617;
        }

        /* System Status Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 99px;
          margin-bottom: 32px;
        }
        .status-dot {
          width: 7px; height: 7px; background: #22c55e; border-radius: 50%;
          box-shadow: 0 0 10px #22c55e; animation: pulse 2s infinite;
        }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

        /* Bento Grid Architecture */
        .bento-highlights-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .bento-card-glass {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 36px;
          border-radius: 28px;
          backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .bento-card-glass:hover {
          border-color: rgba(167, 139, 250, 0.4);
          background: rgba(30, 41, 59, 0.6);
          transform: translateY(-8px);
        }

        .card-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #a78bfa;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-body {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.6;
          font-weight: 500;
        }

        /* Executive Buttons */
        .btn-wrapper {
          display: flex;
          gap: 18px;
          margin-bottom: 80px;
        }

        .btn-main {
          background: #f8fafc;
          color: #020617;
          padding: 18px 44px;
          border-radius: 99px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-main:hover { background: #a78bfa; color: #fff; transform: scale(1.03); }

        .btn-ghost {
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 18px 44px;
          border-radius: 99px;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }

        .btn-ghost:hover { background: rgba(255, 255, 255, 0.05); border-color: #fff; }

        @media (max-width: 1024px) {
          .hero-main-row { grid-template-columns: 1fr; text-align: center; }
          .profile-signature-wrap { justify-content: center; order: -1; margin-bottom: 40px; }
          .bento-highlights-row { grid-template-columns: 1fr; }
          .hero-headline, .hero-sub-desc { margin-left: auto; margin-right: auto; }
          .btn-wrapper { justify-content: center; }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-main-row">
            <div className="hero-info">
              <div className="status-badge">
                <div className="status-dot"></div>
                <span style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono', color: '#22c55e', letterSpacing: '0.1em' }}>
                  SYSTEM ONLINE: READY FOR PRODUCTION [cite: 168]
                </span>
              </div>

              <h1 className="hero-headline">
                Engineering <span className="text-purple">resilient systems</span> that scale for the next billion. [cite: 151, 131]
              </h1>
              
              <div style={{ fontFamily: 'JetBrains Mono', color: '#a78bfa', marginBottom: '32px', fontSize: '1.25rem', fontWeight: 500 }}>
                &gt; {displayed}<span className="animate-pulse">_</span>
              </div>

              <p className="hero-sub-desc">
                I’m <strong>Nishant Kamal</strong>, an SRE with <strong>6+ years</strong> of experience building 
                reliable platforms[cite: 56, 168]. I specialize in <strong>Kubernetes hardening</strong>, 
                distributed observability, and cloud automation via <strong>Crossplane</strong>[cite: 34, 35, 96].
              </p>

              <div className="btn-wrapper">
                <a href="#projects" className="btn-main">Analyze Projects</a>
                <a href="/resume.pdf" className="btn-ghost">Technical Resume</a>
              </div>
            </div>

            <div className="profile-signature-wrap">
              <div className="profile-signature-frame">
                <img src="/profile.png" alt="Nishant Kamal" className="profile-img-inner" />
              </div>
            </div>
          </div>

          <div className="bento-highlights-row">
            {bentoHighlights.map((item, idx) => (
              <div key={idx} className="bento-card-glass">
                <div className="card-eyebrow">
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span> {item.title}
                </div>
                <div className="card-body">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
