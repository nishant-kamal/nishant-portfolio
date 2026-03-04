"use client";

import { useState } from "react";

const contacts = [
  {
    label: "Email",
    value: "nishant.kamal2015@gmail.com",
    href: "mailto:nishant.kamal2015@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: "#38bdf8",
    glow: "rgba(56,189,248,.15)",
  },
  {
    label: "GitHub",
    value: "github.com/nishant-kamal",
    href: "https://github.com/nishant-kamal",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    color: "#a78bfa",
    glow: "rgba(167,139,250,.15)",
  },
  {
    label: "Location",
    value: "New Delhi, India",
    href: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    color: "#34d399",
    glow: "rgba(52,211,153,.15)",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("nishant.kamal2015@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .contact-section {
          font-family: 'Syne', sans-serif;
          position: relative;
        }

        .contact-eyebrow {
          font-family: 'DM Mono', monospace; font-size: .7rem;
          letter-spacing: .2em; text-transform: uppercase;
          color: #38bdf8; background: rgba(56,189,248,.08);
          border: 1px solid rgba(56,189,248,.2);
          padding: 4px 12px; border-radius: 4px;
          display: inline-block; margin-bottom: 20px;
        }
        .contact-heading {
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 800;
          letter-spacing: -.02em; color: #f8fafc;
          margin-bottom: 16px; line-height: 1.1;
        }
        .contact-heading em { font-style: normal; color: #38bdf8; }
        .contact-sub {
          font-size: .92rem; color: #64748b; line-height: 1.7;
          max-width: 480px; margin-bottom: 48px;
        }

        .contact-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
          margin-bottom: 40px;
        }
        @media (max-width: 700px) { .contact-grid { grid-template-columns: 1fr; } }

        .contact-card {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(15,20,35,.7);
          backdrop-filter: blur(12px);
          padding: 28px 24px;
          text-decoration: none;
          transition: border-color .25s, box-shadow .25s, transform .2s;
          display: block; position: relative; overflow: hidden;
        }
        .contact-card:hover { transform: translateY(-4px); }
        .contact-card-static { cursor: default; }
        .contact-card-static:hover { transform: none; }

        .contact-card-top-line {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          border-radius: 16px 16px 0 0;
          opacity: 0; transition: opacity .3s;
        }
        .contact-card:hover .contact-card-top-line { opacity: 1; }

        .contact-icon-wrap {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid; margin-bottom: 18px;
          transition: box-shadow .25s;
        }
        .contact-card:hover .contact-icon-wrap {
          box-shadow: 0 0 16px var(--card-glow);
        }

        .contact-card-label {
          font-family: 'DM Mono', monospace; font-size: .65rem;
          letter-spacing: .14em; text-transform: uppercase;
          color: #334155; margin-bottom: 8px;
        }
        .contact-card-value {
          font-size: .85rem; font-weight: 600; color: #94a3b8;
          word-break: break-all; line-height: 1.4;
          transition: color .2s;
        }
        .contact-card:hover .contact-card-value { color: #e2e8f0; }

        .contact-card-arrow {
          position: absolute; bottom: 20px; right: 20px;
          font-size: .7rem; color: #1e293b;
          transition: color .2s, transform .2s;
        }
        .contact-card:hover .contact-card-arrow {
          color: var(--card-color); transform: translate(2px, -2px);
        }

        /* CTA row */
        .contact-cta-row {
          display: flex; gap: 14px; flex-wrap: wrap; align-items: center;
        }
        .contact-btn-primary {
          font-family: 'DM Mono', monospace; font-size: .72rem;
          letter-spacing: .1em; text-transform: uppercase;
          color: #050810; background: #38bdf8;
          padding: 12px 28px; border-radius: 10px;
          text-decoration: none; border: none; cursor: pointer;
          transition: background .2s, box-shadow .2s, transform .15s;
          font-weight: 500;
        }
        .contact-btn-primary:hover {
          background: #7dd3fc;
          box-shadow: 0 0 24px rgba(56,189,248,.3);
          transform: translateY(-1px);
        }
        .contact-btn-copy {
          font-family: 'DM Mono', monospace; font-size: .72rem;
          letter-spacing: .1em; text-transform: uppercase;
          color: #64748b;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          padding: 12px 28px; border-radius: 10px;
          cursor: pointer; transition: all .2s;
        }
        .contact-btn-copy:hover { color: #e2e8f0; border-color: rgba(255,255,255,.2); }
        .contact-btn-copy.copied { color: #34d399; border-color: rgba(52,211,153,.3); }

        /* footer strip */
        .contact-footer {
          margin-top: 64px; padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,.05);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px;
        }
        .contact-footer-name {
          font-family: 'DM Mono', monospace; font-size: .68rem;
          letter-spacing: .1em; text-transform: uppercase; color: #1e293b;
        }
        .contact-footer-copy {
          font-family: 'DM Mono', monospace; font-size: .62rem;
          color: #1e293b; letter-spacing: .06em;
        }
      `}</style>

      <section id="contact" className="contact-section">
        <span className="contact-eyebrow">06 — Contact</span>
        <h2 className="contact-heading">
          Let's build something<br />
          <em>resilient.</em>
        </h2>
        <p className="contact-sub">
          Open to SRE, Platform Engineering, and DevOps opportunities. Reach out — I respond within 24 hours.
        </p>

        <div className="contact-grid">
          {contacts.map((c) => {
            const Tag = c.href ? "a" : "div";
            return (
              <Tag
                key={c.label}
                href={c.href || undefined}
                target={c.href && !c.href.startsWith("mailto") ? "_blank" : undefined}
                className={`contact-card ${!c.href ? "contact-card-static" : ""}`}
                style={{ "--card-color": c.color, "--card-glow": c.glow }}
              >
                <div
                  className="contact-card-top-line"
                  style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }}
                />
                <div
                  className="contact-icon-wrap"
                  style={{ color: c.color, borderColor: c.color + "40", background: c.color + "12" }}
                >
                  {c.icon}
                </div>
                <div className="contact-card-label">{c.label}</div>
                <div className="contact-card-value">{c.value}</div>
                {c.href && <span className="contact-card-arrow">↗</span>}
              </Tag>
            );
          })}
        </div>

        <div className="contact-cta-row">
          <a href="mailto:nishant.kamal2015@gmail.com" className="contact-btn-primary">
            Send Email
          </a>
          <button
            className={`contact-btn-copy ${copied ? "copied" : ""}`}
            onClick={copyEmail}
          >
            {copied ? "✓ Copied!" : "Copy Email"}
          </button>
        </div>

        <div className="contact-footer">
          <span className="contact-footer-name">Nishant Kamal · SRE</span>
          <span className="contact-footer-copy">© {new Date().getFullYear()} · Built with Next.js</span>
        </div>
      </section>
    </>
  );
}
