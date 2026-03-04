"use client";

import { useEffect, useState, useRef } from "react";

const roles = [
  "Site Reliability Engineer",
  "Platform Architect",
  "Cloud Infrastructure Lead",
];

const highlights = [
  { icon: "🛠️", title: "PLATFORM FOCUS", desc: "Building resilient K8s clusters and self-healing systems at scale.", metric: "99.9% uptime" },
  { icon: "📈", title: "SRE STRATEGY", desc: "Scaling products and people through data-driven reliability engineering.", metric: "6+ years" },
  { icon: "🛡️", title: "SECURITY FIRST", desc: "Zero-trust architecture and automated compliance pipelines.", metric: "35% cost cut" }
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Typewriter
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

  // Mouse parallax
  useEffect(() => {
    const handle = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Particle canvas
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --purple: #8b5cf6;
          --purple-light: #a78bfa;
          --bg: #020617;
          --surface: #070d1f;
          --border: rgba(255,255,255,0.055);
          --muted: #64748b;
        }

        .hero-wrap {
          position: relative;
          background: var(--bg);
          overflow: hidden;
          padding: 140px 0 100px;
        }

        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.8;
        }

        .hero-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 90% 70% at 75% -15%, rgba(139,92,246,0.13) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 5% 85%, rgba(99,102,241,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(139,92,246,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }

        .hero-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
          z-index: 2;
        }

        .hero-top {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 80px;
          align-items: center;
          margin-bottom: 72px;
        }

        /* Stagger reveal */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1);
        }
        .reveal.show { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.08s; }
        .d2 { transition-delay: 0.2s; }
        .d3 { transition-delay: 0.35s; }
        .d4 { transition-delay: 0.5s; }
        .d5 { transition-delay: 0.65s; }

        /* Status badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(74,222,128,0.07);
          border: 1px solid rgba(74,222,128,0.2);
          border-radius: 99px;
          padding: 5px 14px 5px 9px;
          margin-bottom: 32px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: #86efac;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 10px #4ade80;
          animation: blink-dot 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes blink-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* Hero title */
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 6vw, 5.4rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.035em;
          color: #f1f5f9;
          margin-bottom: 30px;
        }

        .accent-grad {
          background: linear-gradient(110deg, #c4b5fd 0%, #818cf8 50%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Typewriter */
        .typewriter-line {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 26px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.05rem;
        }

        .tw-prompt { color: var(--muted); user-select: none; }
        .tw-text { color: var(--purple-light); }
        .tw-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--purple-light);
          margin-left: 1px;
          vertical-align: middle;
          animation: cur-blink 1s step-end infinite;
        }
        @keyframes cur-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Description */
        .hero-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.1rem;
          color: #94a3b8;
          line-height: 1.8;
          max-width: 580px;
          margin-bottom: 44px;
          font-weight: 300;
        }

        /* Buttons */
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }

        .btn-primary {
          position: relative;
          background: linear-gradient(135deg, #7c3aed, #6366f1);
          color: #fff;
          padding: 15px 34px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          text-decoration: none;
          box-shadow: 0 0 0 1px rgba(139,92,246,0.4), 0 16px 32px -8px rgba(124,58,237,0.45);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .btn-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.5s ease;
        }

        .btn-primary:hover::after { left: 150%; }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 0 1px rgba(139,92,246,0.6), 0 24px 40px -8px rgba(124,58,237,0.55);
        }

        .btn-ghost {
          color: #94a3b8;
          padding: 15px 34px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.95rem;
          text-decoration: none;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.018);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .btn-ghost:hover {
          border-color: rgba(139,92,246,0.35);
          color: #e2e8f0;
          background: rgba(139,92,246,0.06);
          transform: translateY(-2px);
        }

        /* Profile */
        .profile-wrap {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .profile-outer {
          position: relative;
          width: 320px;
          height: 320px;
          will-change: transform;
        }

        .ring-spin {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 0%, transparent 40%, rgba(139,92,246,0.6) 50%, rgba(167,139,250,0.8) 55%, transparent 65%, transparent 100%);
          animation: spin 7s linear infinite;
        }

        .ring-spin-2 {
          inset: -20px;
          background: conic-gradient(from 180deg, transparent 0%, transparent 60%, rgba(99,102,241,0.35) 70%, transparent 80%);
          animation-duration: 12s;
          animation-direction: reverse;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .ring-bg {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: var(--bg);
        }

        .profile-img-circle {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          border: 1.5px solid rgba(139,92,246,0.25);
        }

        .profile-img-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Floating chips */
        .chip {
          position: absolute;
          background: rgba(7,13,31,0.92);
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 8px;
          padding: 8px 14px;
          backdrop-filter: blur(16px);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: #a78bfa;
          white-space: nowrap;
          animation: float-up 3s ease-in-out infinite;
        }

        .chip-tech {
          bottom: -10px;
          right: -30px;
        }

        .chip-status {
          top: 10px;
          right: -30px;
          color: #86efac;
          border-color: rgba(74,222,128,0.2);
          animation-delay: 1.5s;
        }

        @keyframes float-up {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        /* Divider */
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.18) 30%, rgba(139,92,246,0.18) 70%, transparent 100%);
          margin-bottom: 56px;
        }

        /* Bento */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .bento-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 30px 26px;
          overflow: hidden;
          transition: border-color 0.35s, transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s;
        }

        .bento-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.07) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.4s;
          border-radius: inherit;
        }

        .bento-card:hover { 
          border-color: rgba(139,92,246,0.28);
          transform: translateY(-5px);
          box-shadow: 0 20px 44px -12px rgba(0,0,0,0.5);
        }
        .bento-card:hover::before { opacity: 1; }

        .card-icon { font-size: 1.7rem; margin-bottom: 14px; display: block; }

        .card-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.65;
          font-weight: 300;
          margin-bottom: 20px;
        }

        .card-metric {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--purple-light);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-metric-bar {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(167,139,250,0.4), transparent);
        }

        @media (max-width: 1024px) {
          .hero-top { grid-template-columns: 1fr; gap: 48px; }
          .profile-wrap { justify-content: center; order: -1; }
          .bento-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .hero-wrap { padding: 100px 0 60px; }
          .hero-btns { flex-direction: column; }
          .profile-outer { width: 240px; height: 240px; }
          .chip { display: none; }
        }
      `}</style>

      <section className="hero-wrap" ref={heroRef}>
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-mesh" />
        <div className="hero-grid-lines" />

        <div className="hero-container">
          <div className="hero-top">
            {/* Content */}
            <div>
              <div className={`reveal d1 ${visible ? "show" : ""}`}>
                <div className="status-badge">
                  <span className="status-dot" />
                  Available · New Delhi, India
                </div>
              </div>

              <div className={`reveal d2 ${visible ? "show" : ""}`}>
                <h1 className="hero-title">
                  From systems to<br />
                  strategy—scaling{" "}
                  <span className="accent-grad">platforms</span>
                  <br />and possibility.
                </h1>
              </div>

              <div className={`reveal d3 ${visible ? "show" : ""}`}>
                <div className="typewriter-line">
                  <span className="tw-prompt">&gt;</span>
                  <span className="tw-text">{displayed}</span>
                  <span className="tw-cursor" />
                </div>
              </div>

              <div className={`reveal d3 ${visible ? "show" : ""}`}>
                <p className="hero-desc">
                  I help future-ready organizations ship resilient platforms, modernize Cloud/DevOps muscle, and turn ambitious roadmaps into measurable value.
                </p>
              </div>

              <div className={`reveal d4 ${visible ? "show" : ""}`}>
                <div className="hero-btns">
                  <a href="#projects" className="btn-primary">View Projects</a>
                  <a href="/resume.pdf" className="btn-ghost">Download Resume ↓</a>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className={`profile-wrap reveal d2 ${visible ? "show" : ""}`}>
              <div
                className="profile-outer"
                style={{
                  transform: `translate(${mousePos.x * 0.04}px, ${mousePos.y * 0.04}px)`,
                  transition: "transform 0.15s ease-out"
                }}
              >
                <div className="ring-spin ring-spin-2" />
                <div className="ring-spin" />
                <div className="ring-bg" />
                <div className="profile-img-circle">
                  <img src="/profile.png" alt="Nishant Kamal" />
                </div>
                <div className="chip chip-tech">⚡ K8s · AWS · Terraform</div>
                <div className="chip chip-status">● Online · Open to work</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={`section-divider reveal d4 ${visible ? "show" : ""}`} />

          {/* Bento Cards */}
          <div className={`bento-grid reveal d5 ${visible ? "show" : ""}`}>
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bento-card"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
                  e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
                }}
              >
                <span className="card-icon">{item.icon}</span>
                <div className="card-tag">{item.title}</div>
                <div className="card-desc">{item.desc}</div>
                <div className="card-metric">
                  <div className="card-metric-bar" />
                  {item.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
