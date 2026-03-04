"use client";

import { useEffect, useState, useRef } from "react";

const roles = ["Site Reliability Engineer", "Platform Engineer", "Infrastructure Engineer", "DevOps Engineer"];

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
    // Mouse Parallax Logic
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((clientX - left) / width - 0.5) * 25,
        y: ((clientY - top) / height - 0.5) * 25,
      });
    };

    // Particle Canvas Logic
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 80 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Typewriter
  useEffect(() => {
    if (!mounted) return;
    const current = roles[roleIndex];
    let speed = deleting ? 40 : 80;
    
    const timeout = setTimeout(() => {
      if (!deleting && displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1));
      } else if (!deleting && displayed.length === current.length) {
        setTimeout(() => setDeleting(true), 2500);
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');

        :root {
          --accent: #8b5cf6;
          --accent-glow: rgba(139, 92, 246, 0.4);
          --bg: #020617;
          --card-bg: rgba(15, 23, 42, 0.4);
          --border: rgba(255, 255, 255, 0.05);
          --text-main: #f8fafc;
          --text-muted: #64748b;
        }

        .hero-section {
          position: relative;
          background: var(--bg);
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: var(--text-main);
          overflow: hidden;
          padding: 80px 24px;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hero-mesh {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05), transparent 70%);
          z-index: 1;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--accent);
          backdrop-filter: blur(10px);
          margin-bottom: 30px;
        }

        .title {
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.05em;
          margin-bottom: 25px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fff 30%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .typewriter {
          font-family: 'JetBrains Mono', monospace;
          background: rgba(139, 92, 246, 0.1);
          color: var(--accent);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 1.1rem;
          display: inline-block;
          margin-bottom: 30px;
          border-left: 3px solid var(--accent);
        }

        .description {
          font-size: 1.2rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 500px;
          margin-bottom: 40px;
          font-weight: 300;
        }

        .btn-group { display: flex; gap: 15px; }

        .btn {
          padding: 16px 32px;
          border-radius: 14px;
          font-weight: 600;
          transition: 0.4s cubic-bezier(0.2, 1, 0.3, 1);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary {
          background: var(--accent);
          color: white;
          box-shadow: 0 15px 30px -10px var(--accent-glow);
        }

        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 40px -10px var(--accent-glow); }

        .btn-ghost {
          background: transparent;
          color: var(--text-main);
          border: 1px solid var(--border);
        }

        .btn-ghost:hover { background: rgba(255, 255, 255, 0.05); }

        /* Advanced Profile Morph */
        .visual-box {
          position: relative;
          z-index: 5;
        }

        .morph-container {
          width: 380px;
          height: 380px;
          position: relative;
          background: linear-gradient(45deg, var(--accent), #6366f1);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: morphing 10s infinite alternate;
          padding: 5px;
        }

        @keyframes morphing {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          100% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
        }

        .inner-img {
          width: 100%;
          height: 100%;
          background: var(--bg);
          border-radius: inherit;
          overflow: hidden;
        }

        .inner-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.1);
        }

        /* Bento Grid V2 */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 80px;
        }

        .bento-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          padding: 30px;
          border-radius: 24px;
          backdrop-filter: blur(20px);
          transition: 0.5s;
        }

        .bento-card:hover {
          border-color: var(--accent);
          background: rgba(139, 92, 246, 0.05);
          transform: translateY(-10px);
        }

        .metric {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
          display: block;
        }

        .label {
          font-size: 0.8rem;
          color: var(--accent);
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; }
          .morph-container { width: 280px; height: 280px; margin: 0 auto; }
          .description { margin: 0 auto 40px; }
          .btn-group { justify-content: center; }
          .bento-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="hero-section" ref={heroRef}>
        <canvas ref={canvasRef} />
        <div className="hero-mesh" />

        <div className="container">
          <div className="hero-grid">
            <div className="text-content">
              <div className="status-badge">
                <span className="pulse" style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%' }} />
                SYSTEMS ONLINE // NEW DELHI
              </div>

              <h1 className="title">
                Engineering <br />
                <span className="gradient-text">Resilient</span> Platforms.
              </h1>

              <div className="typewriter">
                {displayed}<span className="blink">_</span>
              </div>

              <p className="description">
                Lead DevOps Engineer specializing in Kubernetes, AWS, and Cloud Native Architectures. 
                I turn manual workflows into automated, self-healing pipelines.
              </p>

              <div className="btn-group">
                <a href="#work" className="btn btn-primary">Project</a>
                <a href="/cv.pdf" className="btn btn-ghost">Download Resume</a>
              </div>
            </div>

            <div className="visual-box">
              <div 
                className="morph-container"
                style={{
                  transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <div className="inner-img">
                  <img src="/profile.png" alt="Nishant Kamal" />
                </div>
              </div>
            </div>
          </div>

          <div className="bento-grid">
            {highlights.map((h, i) => (
              <div key={i} className="bento-card">
                <span className="label">{h.title}</span>
                <span className="metric">{h.metric}</span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
