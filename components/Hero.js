"use client";

import { useEffect, useState } from "react";

const roles = [
  "Site Reliability Engineer",
  "Platform Architect",
  "Cloud Infrastructure Lead",
];

const highlights = [
  { icon: "🛠️", title: "PLATFORM FOCUS", desc: "Building resilient K8s clusters and self-healing systems." },
  { icon: "📈", title: "SRE STRATEGY", desc: "Scaling products and people through data-driven reliability." },
  { icon: "🛡️", title: "SECURITY FIRST", desc: "Zero-trust architecture and automated compliance." }
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
          padding: 140px 0 100px;
          position: relative;
        }

        .hero-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Heading: Mimicking the Baldeep Reference */
        .hero-title {
          font-size: clamp(3rem, 7vw, 5.2rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          margin-bottom: 32px;
          max-width: 1000px;
        }

        .text-accent {
          color: #a78bfa; /* Soft Purple from reference */
        }

        .hero-desc {
          font-size: 1.3rem;
          color: #94a3b8;
          line-height: 1.6;
          max-width: 800px;
          margin-bottom: 48px;
        }

        .hero-layout-top {
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          align-items: center;
          gap: 60px;
          margin-bottom: 80px;
        }

        /* Profile Image with Signature Glow */
        .profile-wrap {
          display: flex;
          justify-content: flex-end;
          position: relative;
        }

        .profile-frame {
          width: 340px;
          height: 340px;
          border-radius: 50%;
          padding: 8px;
          background: linear-gradient(135deg, rgba(167, 139, 250, 0.5), transparent);
          box-shadow: 0 0 60px rgba(167, 139, 250, 0.15);
        }

        .profile-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          background: #0f172a;
        }

        /* Bento Highlight Cards */
        .bento-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .bento-card {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 32px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .bento-card:hover {
          border-color: #a78bfa;
          background: #141d33;
          transform: translateY(-5px);
        }

        .card-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .card-tag span { color: #a78bfa; font-size: 1.1rem; }

        .card-content {
          font-size: 0.95rem;
          color: #94a3b8;
          line-height: 1.5;
        }

        /* Action Buttons */
        .action-btns {
          display: flex;
          gap: 20px;
          margin-bottom: 80px;
        }

        .btn-filled {
          background: #8b5cf6;
          color: #fff;
          padding: 18px 40px;
          border-radius: 99px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          box-shadow: 0 15px 30px -10px rgba(139, 92, 246, 0.5);
          transition: 0.3s;
        }

        .btn-outline {
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 18px 40px;
          border-radius: 99px;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }

        .btn-outline:hover { background: rgba(255, 255, 255, 0.05); }

        @media (max-width: 1100px) {
          .hero-layout-top { grid-template-columns: 1fr; text-align: center; }
          .profile-wrap { justify-content: center; order: -1; }
          .bento-row { grid-template-columns: 1fr; }
          .hero-title, .hero-desc { margin-left: auto; margin-right: auto; }
          .action-btns { justify-content: center; }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-layout-top">
            <div className="hero-content">
              <h1 className="hero-title">
                From systems to strategy—scaling <span className="text-accent">platforms</span> and possibility.
              </h1>
              
              <div style={{ fontFamily: 'JetBrains Mono', color: '#a78bfa', marginBottom: '24px', fontSize: '1.2rem' }}>
                &gt; {displayed}<span className="animate-pulse">_</span>
              </div>

              <p className="hero-desc">
                I help future-ready organizations ship resilient platforms, modernize Cloud/DevOps muscle, and turn ambitious roadmaps into measurable value.
              </p>

              <div className="action-btns">
                <a href="#projects" className="btn-filled">Plan a build</a>
                <a href="/resume.pdf" className="btn-outline">Download resume</a>
              </div>
            </div>

            <div className="profile-wrap">
              <div className="profile-frame">
                <img src="/profile.png" alt="Nishant Kamal" className="profile-img" />
              </div>
            </div>
          </div>

          <div className="bento-row">
            {highlights.map((item, idx) => (
              <div key={idx} className="bento-card">
                <div className="card-tag">
                  <span>{item.icon}</span> {item.title}
                </div>
                <div className="card-content">
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
