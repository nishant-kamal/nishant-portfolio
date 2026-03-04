"use client";

import { useEffect, useState } from "react";

const roles = [
  "Site Reliability Engineer",
  "Platform Architect",
  "Cloud Infrastructure Specialist",
  "DevOps Automation Lead",
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .hero-section {
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          min-height: 100vh;
          display: flex; 
          align-items: center;
          background: #020617;
          overflow: hidden;
          padding: 80px 0;
        }

        /* Advanced Background Layering */
        .hero-bg-layers {
          position: absolute; inset: 0; pointer-events: none;
        }
        
        .grid-overlay {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
          background-size: 4rem 4rem;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%);
        }

        .mesh-glow {
          position: absolute;
          top: -10%; left: 50%;
          transform: translateX(-50%);
          width: 80vw; height: 60vh;
          background: radial-gradient(circle at center, rgba(56, 189, 248, 0.15), transparent 70%);
          filter: blur(80px);
          z-index: 0;
        }

        .hero-inner {
          position: relative; z-index: 10;
          display: grid; grid-template-columns: 1.3fr 0.7fr;
          gap: 40px; align-items: center;
        }

        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; gap: 60px; }
          .hero-image-col { order: -1; display: flex; justify-content: center; }
          .hero-desc { margin: 0 auto 40px; }
          .hero-ctas { justify-content: center; }
        }

        /* SRE Status Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          margin-bottom: 32px;
          animation: slideInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .status-dot {
          width: 8px; height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 12px #22c55e;
          position: relative;
        }
        .status-dot::after {
          content: ""; position: absolute; inset: -4px;
          border: 1px solid #22c55e; border-radius: 50%;
          animation: ripple 2s linear infinite;
        }

        @keyframes ripple {
          to { transform: scale(3); opacity: 0; }
        }

        .status-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem; color: #94a3b8;
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* Typography */
        .hero-title {
          font-size: clamp(3rem, 7vw, 5rem);
          font-weight: 800; line-height: 0.95;
          letter-spacing: -0.05em; color: #fff;
          margin-bottom: 24px;
        }
        .hero-title span {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .typewriter-box {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: #38bdf8;
          margin-bottom: 32px;
          height: 1.6em;
          display: flex; align-items: center;
        }

        .hero-desc {
          font-size: 1.15rem; color: #94a3b8;
          line-height: 1.7; max-width: 600px;
          margin-bottom: 48px;
        }

        /* Premium Buttons */
        .btn-glow {
          position: relative;
          padding: 16px 36px;
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
          background: #0f172a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          overflow: hidden;
          transition: 0.3s;
          text-decoration: none;
          display: inline-flex; align-items: center;
        }
        .btn-glow:hover {
          border-color: #38bdf8;
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.2);
          transform: translateY(-2px);
        }
        .btn-glow::before {
          content: ""; position: absolute; top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(56,189,248,0.1), transparent 70%);
          transition: 0.5s;
        }

        /* Profile Image Container */
        .image-radar-wrap {
          position: relative;
          width: 380px; height: 380px;
          display: flex; align-items: center; justify-content: center;
        }

        .radar-circle {
          position: absolute; inset: 0;
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 50%;
        }
        .radar-circle:nth-child(2) { inset: 40px; opacity: 0.6; }
        .radar-circle:nth-child(3) { inset: 80px; opacity: 0.3; }

        .image-container {
          position: relative;
          width: 260px; height: 260px;
          border-radius: 30px;
          z-index: 5;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #0f172a;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .floating-tag {
          position: absolute;
          padding: 10px 18px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem; color: #fff;
          z-index: 10;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-bg-layers">
          <div className="grid-overlay" />
          <div className="mesh-glow" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="status-badge">
                <div className="status-dot" />
                <span className="status-text">Production Systems: Operational</span>
              </div>

              <h1 className="hero-title">
                Architecting <span>Reliability</span><br />
                at Global Scale.
              </h1>

              <div className="typewriter-box">
                <span style={{ color: '#64748b', marginRight: '12px' }}>&gt;_</span>
                <span>{displayed}</span>
                <span style={{ 
                  display: 'inline-block', width: '3px', height: '1.2em', 
                  background: '#38bdf8', marginLeft: '4px',
                  animation: 'blink 1s step-end infinite'
                }} />
              </div>

              <p className="hero-desc">
                I’m <strong>Nishant Kamal</strong>. I build and scale the invisible 
                infrastructure that powers modern enterprises. Specializing in 
                <strong> Kubernetes hardening</strong> and cloud-native resilience.
              </p>

              <div className="hero-ctas flex gap-4">
                <a href="#projects" className="btn-glow" style={{ background: '#fff', color: '#020617' }}>
                  Analyze Projects
                </a>
                <a href="/resume.pdf" className="btn-glow">
                  <span style={{ marginRight: '8px' }}>[</span> View Specs <span style={{ marginLeft: '8px' }}>]</span>
                </a>
              </div>
            </div>

            <div className="hero-image-col">
              <div className="image-radar-wrap">
                <div className="radar-circle" />
                <div className="radar-circle" />
                <div className="radar-circle" />
                
                <div className="image-container">
                  <img
                    src="/profile.png"
                    alt="Nishant Kamal"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: 'contrast(1.1)' }}
                  />
                </div>

                <div className="floating-tag" style={{ top: '20%', left: '-20px', animationDelay: '0s' }}>
                  <span style={{ color: '#38bdf8' }}>☸</span> k8s.cluster
                </div>
                <div className="floating-tag" style={{ bottom: '25%', right: '-30px', animationDelay: '1s' }}>
                  <span style={{ color: '#a78bfa' }}>☁</span> aws.infra
                </div>
                <div className="floating-tag" style={{ top: '60%', left: '-40px', animationDelay: '2s' }}>
                  <span style={{ color: '#34d399' }}>⚙</span> gitops.cd
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
