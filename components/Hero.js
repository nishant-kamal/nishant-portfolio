"use client";

import { useEffect, useState } from "react";

const roles = [
  "Site Reliability Engineer",
  "Platform Engineer",
  "Cloud Architect",
  "DevOps Engineer",
];

const socials = [
  { name: "GitHub", url: "https://github.com/nishant-kamal", icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/imnishant19", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
  { name: "Twitter", url: "https://x.com/imnishant19", icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.599 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
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
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, mounted]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap');

        .hero-section {
          font-family: 'Syne', sans-serif;
          position: relative;
          min-height: 100vh; /* Changed for better mobile filling */
          display: flex;
          align-items: center;
          background: #020617;
          overflow-x: hidden;
          padding: 100px 0 60px;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 1fr; /* Default 2 cols */
          gap: 40px;
          align-items: center;
        }

        /* Tablet & Mobile Fix */
        @media (max-width: 1024px) {
          .hero-section { padding-top: 120px; }
          .hero-inner { 
            grid-template-columns: 1fr; /* Stack columns */
            text-align: center;
            gap: 60px;
          }
          .hero-left { order: 2; display: flex; flex-direction: column; align-items: center; }
          .hero-image-col { order: 1; display: flex; justify-content: center; }
          .hero-h1 { margin-inline: auto; }
          .hero-desc { margin-inline: auto; }
        }

        .hero-badge {
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.65rem, 2vw, 0.78rem);
          color: #38bdf8;
          background: rgba(56,189,248,.08);
          border: 1px solid rgba(56,189,248,.2);
          padding: 6px 16px;
          border-radius: 99px;
          margin-bottom: 24px;
          white-space: nowrap; /* Prevent badge text wrap */
        }

        .hero-h1 {
          font-size: clamp(2.2rem, 8vw, 4.5rem); /* Dynamic font size */
          font-weight: 800;
          line-height: 1.1;
          color: #f8fafc;
          margin-bottom: 20px;
        }

        .hero-typewriter {
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.9rem, 3vw, 1.2rem);
          color: #94a3b8;
          min-height: 1.5em;
          margin-bottom: 24px;
        }

        .hero-desc {
          font-size: clamp(0.95rem, 2.5vw, 1.05rem);
          color: #64748b;
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 32px;
        }

        .hero-img-wrap {
          position: relative;
          width: clamp(260px, 40vw, 380px); /* Responsive image size */
          aspect-ratio: 1/1;
        }

        .hero-img {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          overflow: hidden;
          z-index: 2;
          border: 2px solid rgba(56,189,248, 0.2);
        }

        .hero-img img { width: 100%; height: 100%; object-fit: cover; }

        .social-dock { display: flex; gap: 12px; margin-top: 30px; }
        .social-link {
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: 0.3s;
        }
        .social-link:hover { border-color: #38bdf8; transform: translateY(-3px); }
        .social-link svg { width: 18px; fill: #64748b; }
        .social-link:hover svg { fill: #38bdf8; }

        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; justify-content: inherit; }
        .btn-primary { background: #38bdf8; color: #020617; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.9rem; }
      `}</style>

      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">
              UPTIME: 99.9% // SLO: COMPLIANT
            </div>

            <h1 className="hero-h1">
              Engineering <br />
              systems that <br />
              <span style={{ color: '#38bdf8' }}>never sleep.</span>
            </h1>

            <div className="hero-typewriter">
              &gt; {displayed}<span className="cursor">|</span>
            </div>

            <p className="hero-desc">
              I'm <strong>Nishant Kamal</strong>. I build resilient, automated cloud 
              platforms that scale without breaking.
            </p>

            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">View Projects</a>
              <div className="social-dock">
                {socials.map((s) => (
                  <a key={s.name} href={s.url} className="social-link">
                    <svg viewBox="0 0 24 24"><path d={s.icon} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-image-col">
            <div className="hero-img-wrap">
              <div className="hero-img">
                <img src="/profile.png" alt="Nishant Kamal" />
              </div>
              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-sky-500/30 animate-[spin_20s_linear_infinite]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
