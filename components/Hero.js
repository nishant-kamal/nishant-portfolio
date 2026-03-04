"use client";

import { useEffect, useState, useRef } from "react";

const roles = ["Site Reliability Engineer", "Platform Architect", "Infrastructure Lead"];

const highlights = [
  { icon: "⚡", title: "PLATFORM", desc: "K8s orchestration & self-healing infra.", metric: "99.9% Uptime" },
  { icon: "📈", title: "STRATEGY", desc: "Data-driven reliability at scale.", metric: "6+ Years" },
  { icon: "🛡️", title: "SECURITY", desc: "Zero-trust & automated compliance.", metric: "35% Cost Cut" }
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handle = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((clientX - left) / width - 0.5) * 20,
        y: ((clientY - top) / height - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Typewriter
  useEffect(() => {
    if (!mounted) return;
    const current = roles[roleIndex];
    let speed = deleting ? 30 : 60;
    
    const timeout = setTimeout(() => {
      if (!deleting && displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1));
      } else if (!deleting && displayed.length === current.length) {
        setTimeout(() => setDeleting(true), 2000);
      } else if (deleting && displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1));
      } else {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);
    
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, mounted]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --accent: #8b5cf6;
          --accent-bright: #c4b5fd;
          --bg: #030712;
          --card-bg: rgba(15, 23, 42, 0.6);
          --border: rgba(255, 255, 255, 0.08);
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --font-sans: 'Inter', -apple-system, sans-serif;
        }

        .hero-section {
          position: relative;
          background: var(--bg);
          font-family: var(--font-sans);
          color: var(--text-main);
          overflow: hidden;
          padding: 100px 24px 60px;
          min-height: 90vh;
          display: flex;
          align-items: center;
        }

        /* Abstract Background */
        .bg-glow {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: 
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15), transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1), transparent 40%);
          z-index: 0;
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at 50% 50%, white, transparent 85%);
          opacity: 0.4;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #34d399;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 24px;
        }

        .title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin-bottom: 20px;
        }

        .gradient-text {
          background: linear-gradient(to right, var(--accent-bright), #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .typewriter {
          font-family: 'JetBrains Mono', monospace;
          color: var(--accent-bright);
          font-size: 1.1rem;
          margin-bottom: 24px;
          height: 1.5em;
        }

        .description {
          font-size: 1.15rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 540px;
          margin-bottom: 32px;
        }

        .actions { display: flex; gap: 16px; }

        .btn {
          padding: 12px 28px;
          border-radius: 8px;
          font-weight: 500;
          transition: 0.2s;
          cursor: pointer;
          text-decoration: none;
          font-size: 0.95rem;
        }

        .btn-primary {
          background: var(--text-main);
          color: var(--bg);
        }

        .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

        .btn-secondary {
          background: rgba(255,255,255,0.03);
          color: var(--text-main);
          border: 1px solid var(--border);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover { background: rgba(255,255,255,0.08); }

        /* Profile Visual */
        .visual-container {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .image-hex {
          width: 300px;
          height: 300px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 24% 76% 70% 30% / 30% 30% 70% 70%;
          overflow: hidden;
          position: relative;
          transition: 0.5s ease;
        }
        
        .image-hex img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%); }

        /* Compact Bento */
        .bento-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 60px;
        }

        .bento-item {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(12px);
          transition: 0.3s;
        }

        .bento-item:hover { border-color: var(--accent); transform: translateY(-4px); }

        .bento-icon { font-size: 1.5rem; margin-bottom: 12px; display: block; }
        .bento-title { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 8px; }
        .bento-desc { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.4; }
        .bento-metric { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--accent-bright); font-weight: 500; }

        @media (max-width: 968px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; }
          .visual-container { order: -1; }
          .description { margin: 0 auto 32px; }
          .actions { justify-content: center; }
          .bento-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="hero-section" ref={heroRef}>
        <div className="bg-glow" />
        <div className="grid-pattern" />

        <div className="container">
          <div className="hero-grid">
            <div className="content-side">
              <div className="status-pill">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                Available for New Initiatives
              </div>
              
              <h1 className="title">
                Scaling <span className="gradient-text">Reliability</span> <br />
                Across the Stack.
              </h1>

              <div className="typewriter">
                &gt; {displayed}<span className="cursor">|</span>
              </div>

              <p className="description">
                Bridging the gap between complex infrastructure and seamless user experiences. 
                I build self-healing systems that empower teams to ship faster.
              </p>

              <div className="actions">
                <a href="#work" className="btn btn-primary">View Systems</a>
                <a href="/cv.pdf" className="btn btn-secondary">Get Resume</a>
              </div>
            </div>

            <div className="visual-container">
              <div 
                className="image-hex"
                style={{
                  transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                }}
              >
                <img src="/profile.png" alt="Profile" />
              </div>
            </div>
          </div>

          <div className="bento-row">
            {highlights.map((h, i) => (
              <div key={i} className="bento-item">
                <span className="bento-icon">{h.icon}</span>
                <div className="bento-title">{h.title}</div>
                <div className="bento-desc">{h.desc}</div>
                <div className="bento-metric">{h.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
