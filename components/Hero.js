"use client";

import { useEffect, useState } from "react";

const roles = [
  "Site Reliability Engineer",
  "Platform Engineer",
  "Cloud Architect",
  "DevOps Engineer",
];

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/nishant-kamal",
    icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/imnishant19",
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    name: "Twitter / X",
    url: "https://x.com/imnishant19",
    icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.599 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
  },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

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
        /* ── FIX 1: Removed min-height:100vh and align-items:flex-start.
           Section now sizes to content with symmetric padding,
           eliminating the large blank dead zone below the content. ── */
        .hero-section {
          position: relative;
          box-sizing: border-box;
          padding: 100px 0 40px;
          display: flex;
          align-items: center;
          overflow-x: hidden;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .hero-section {
            align-items: flex-start;
          }
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 48px;
            padding: 0 24px;
          }
          .hero-left       { order: 2; display: flex; flex-direction: column; align-items: center; }
          .hero-image-col  { order: 1; display: flex; justify-content: center; }
          .hero-desc       { margin-inline: auto; }
          .hero-ctas       { justify-content: center; }
          .social-dock     { justify-content: center; }
        }

        /* Badge */
        /* ── FIX 5: Added monospace font stack fallback on all var(--font-mono) usages ── */
        .hero-badge {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.7rem;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.07);
          border: 1px solid rgba(56, 189, 248, 0.2);
          padding: 5px 14px;
          border-radius: 99px;
          margin-bottom: 28px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          letter-spacing: 0.05em;
        }
        .badge-dot {
          width: 6px; height: 6px;
          background: #38bdf8;
          border-radius: 50%;
          box-shadow: 0 0 6px #38bdf8;
          flex-shrink: 0;
          animation: badge-pulse 2s ease-in-out infinite;
        }
        @keyframes badge-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }

        /* Heading */
        .hero-h1 {
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 800;
          line-height: 1.07;
          letter-spacing: -0.03em;
          color: #f8fafc;
          margin: 0 0 22px 0;
        }
        .hero-h1 .accent { color: #38bdf8; }

        /* Typewriter */
        .hero-typewriter {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 1rem;
          color: #64748b;
          /* FIX: Use min-height instead of fixed height to prevent clipping on long roles */
          min-height: 28px;
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 24px;
          overflow: hidden;
        }
        .tw-prompt { color: #334155; margin-right: 8px; user-select: none; }
        .tw-text   { color: #94a3b8; }
        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 0.9em;
          background: #38bdf8;
          margin-left: 2px;
          flex-shrink: 0;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* Description */
        .hero-desc {
          font-size: 1.05rem;
          color: #64748b;
          line-height: 1.75;
          max-width: 460px;
          margin: 0 0 36px 0;
        }
        .hero-desc strong { color: #cbd5e1; font-weight: 600; }

        /* CTAs */
        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #38bdf8;
          color: #020617;
          padding: 11px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.875rem;
          /* ── FIX 5: Font fallback added ── */
          font-family: var(--font-mono, 'Courier New', monospace);
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          background: #7dd3fc;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(56, 189, 248, 0.28);
        }
        /* FIX: Add active/pressed state for mobile tap feedback */
        .btn-primary:active {
          transform: translateY(0);
          box-shadow: none;
          background: #0ea5e9;
        }
        .btn-primary:focus-visible { outline: 2px solid #38bdf8; outline-offset: 3px; }

        /* Social */
        .social-dock { display: flex; gap: 10px; }
        .social-link {
          width: 40px; height: 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.25s, transform 0.25s, background 0.25s;
        }
        .social-link:hover {
          border-color: rgba(56, 189, 248, 0.4);
          background: rgba(56, 189, 248, 0.06);
          transform: translateY(-3px);
        }
        .social-link:focus-visible { outline: 2px solid #38bdf8; outline-offset: 3px; }
        .social-link svg { width: 16px; fill: #475569; transition: fill 0.25s; }
        .social-link:hover svg { fill: #38bdf8; }

        /* Image column */
        .hero-image-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-img-wrap {
          position: relative;
          width: clamp(260px, 34vw, 400px);
          aspect-ratio: 1 / 1;
        }
        /* ── FIX 3: Removed stale width:auto / height:auto — these were
           leftovers from a next/image fill attempt and conflicted with
           the inset-based sizing. The inset fully controls dimensions. ── */
        .hero-img-circle {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          overflow: hidden;
          z-index: 2;
          border: 2px solid rgba(56, 189, 248, 0.2);
          background: rgba(15, 23, 42, 0.9);
        }
        .hero-img-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }
        .hero-img-fallback {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(56,189,248,0.08), rgba(167,139,250,0.08));
          color: #38bdf8;
          font-size: 3.5rem;
          font-weight: 800;
          /* ── FIX 5: Font fallback added ── */
          font-family: var(--font-mono, 'Courier New', monospace);
          letter-spacing: -0.04em;
        }
        .hero-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px dashed rgba(56, 189, 248, 0.18);
          animation: spin-slow 25s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .hero-ring-outer {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          border: 1px solid rgba(167, 139, 250, 0.07);
          animation: spin-slow 45s linear infinite reverse;
          pointer-events: none;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        /* FIX: Respect reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .hero-ring,
          .hero-ring-outer { animation: none; }
          .badge-dot        { animation: none; }
          .hero-cursor      { animation: none; opacity: 1; }
          .btn-primary      { transition: none; }
        }
      `}</style>

      <section className="hero-section" aria-label="Introduction">
        <div className="hero-inner">

          {/* LEFT */}
          <div className="hero-left">
            {/* FIX: role="img" + aria-label for decorative badge; role="status" was
                announcing on every render which is disruptive for screen readers */}
            <div className="hero-badge" role="img" aria-label="System status: Uptime 99.9%, SLO compliant">
              <span className="badge-dot" aria-hidden="true" />
              UPTIME: 99.9% // SLO: COMPLIANT
            </div>

            <h1 className="hero-h1">
              Engineering<br />
              systems that<br />
              <span className="accent">never sleep.</span>
            </h1>

            {/* ── FIX 2: SSR fallback changed from roles[0] → "" to match
                client initial state, preventing the hydration mid-word flash.
                FIX 7: aria-label pre-mount fallback changed from "" to
                "Loading role" — an empty label is worse for screen readers. ── */}
            <div
              className="hero-typewriter"
              aria-live="polite"
              aria-label={mounted ? `Role: ${displayed}` : "Loading role"}
            >
              <span className="tw-prompt" aria-hidden="true">&gt;</span>
              <span className="tw-text">{mounted ? displayed : ""}</span>
              <span className="hero-cursor" aria-hidden="true" />
            </div>

            <p className="hero-desc">
              I&apos;m <strong>Nishant Kamal</strong>. I build resilient, automated cloud
              platforms that scale without breaking.
            </p>

            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">
                View Projects →
              </a>
              <div className="social-dock">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    className="social-link"
                    aria-label={`Visit ${s.name} profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={s.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-image-col">
            <div className="hero-img-wrap">
              <div className="hero-img-circle">
                {imgError ? (
                  <div className="hero-img-fallback" aria-hidden="true">NK</div>
                ) : (
                  <img
                    src="/profile.png"
                    alt="Nishant Kamal, Site Reliability Engineer"
                    width={360}
                    height={360}
                    /* ── FIX 8: Explicit loading="eager" for above-the-fold hero image ── */
                    loading="eager"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      /* ── FIX 4: "top center" keeps face visible without
                         over-cropping chin/chest on portrait photos ── */
                      objectPosition: "top center",
                      display: "block",
                    }}
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
              <div className="hero-ring" aria-hidden="true" />
              <div className="hero-ring-outer" aria-hidden="true" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
