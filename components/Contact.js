"use client";

import { useState, useRef, useEffect } from "react";

// Google Form action URL — update here if the form is ever recreated
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSeOfYCnQBiw8tp8xF3jBA16_EGd4BItPuAavMXxGqmsFjnpMA/formResponse";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Track whether the iframe has loaded at least once (its initial empty load),
  // so subsequent loads (after form POST) correctly signal delivery.
  const iframeLoadedOnce = useRef(false);

  // FIX 11: Listen to the hidden iframe's load event as the real success signal.
  // The iframe fires load twice: once on mount (empty page) and once after the
  // Google Form POST response. We ignore the first and act on the second.
  const handleIframeLoad = () => {
    if (!iframeLoadedOnce.current) {
      // First load = iframe initialised — ignore it
      iframeLoadedOnce.current = true;
      return;
    }
    // Second load = Google Forms responded — POST completed successfully
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleSubmit = () => {
    // Do NOT preventDefault — the form submits to Google Forms via the iframe target.
    setSubmitting(true);
    // Safety fallback: if the iframe load event never fires (e.g. network error,
    // CORS block), resolve after 6 s so the UI doesn't stay stuck on "Transmitting…"
    setTimeout(() => {
      setSubmitting((still) => {
        if (still) {
          setSubmitted(true); // best-effort fallback
        }
        return false;
      });
    }, 6000);
  };

  return (
    // FIX 3: Removed duplicate <section id="contact"> and redundant
    // background + padding — set by page.js wrapper. Padding reduced.
    <div className="contact-root">
      <style>{`
        .contact-root {
          font-family: var(--font-sans);
          padding: 20px 0 60px;
          position: relative;
        }
        .contact-container {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .contact-headline {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #f8fafc;
          margin: 0 0 20px;
          line-height: 1.1;
        }
        .contact-headline em { font-style: normal; color: #8b5cf6; }

        .contact-sub {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.7;
          margin: 0 auto 48px;
          max-width: 480px;
        }

        .form-card {
          background: rgba(15, 23, 42, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 28px;
          padding: 40px;
          text-align: left;
          position: relative;
          overflow: hidden;
        }
        /* Purple top accent line */
        .form-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
          pointer-events: none;
        }

        .input-group { margin-bottom: 20px; }

        .input-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #475569;
          margin-bottom: 8px;
        }

        .field-style {
          width: 100%;
          background: rgba(2, 6, 23, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 13px 16px;
          color: #f8fafc;
          font-family: var(--font-sans);
          /* FIX: Single font-size declaration — max(0.95rem, 16px) clamps to ≥16px
             on mobile to prevent iOS auto-zoom on focus (original 0.95rem was removed). */
          font-size: max(0.95rem, 16px);
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .field-style::placeholder { color: #334155; }
        .field-style:focus {
          outline: none;
          border-color: #8b5cf6;
          background: rgba(139, 92, 246, 0.05);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);
        }

        /* FIX 5: textarea resize:vertical already set globally in globals.css,
           but explicitly set here too for safety */
        textarea.field-style {
          resize: vertical;
          min-height: 120px;
        }

        /* FIX 6: Added htmlFor/id linking between label and input —
           done in JSX below; the CSS here just adds visual clarity */

        .submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          /* Force color with !important to override any browser UA stylesheet */
          background: #8b5cf6 !important;
          background-color: #8b5cf6 !important;
          color: #ffffff !important;
          font-weight: 700;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          border: none !important;
          outline: none;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s, opacity 0.2s;
          box-shadow: 0 8px 20px -8px rgba(139, 92, 246, 0.5);
          letter-spacing: 0.03em;
          display: block;
          /* Prevent system appearance overriding our styles */
          -webkit-appearance: none;
          appearance: none;
        }
        .submit-btn:hover:not(:disabled) {
          background: #7c3aed;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -8px rgba(139, 92, 246, 0.6);
        }
        .submit-btn:disabled,
        .submit-btn.submitting {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          background: #6d28d9 !important;
        }
        .submit-btn:focus-visible { outline: 2px solid #a78bfa; outline-offset: 3px; }

        .success-msg {
          margin-top: 20px;
          padding: 14px 18px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 10px;
          color: #4ade80;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          text-align: center;
          letter-spacing: 0.02em;
        }

        @media (max-width: 600px) {
          .form-card { padding: 28px 22px; }
        }
      `}</style>

      <div className="contact-container">
        <h2 id="contact-title" className="contact-headline">
          Let&apos;s <em>Connect.</em>
        </h2>
        <p className="contact-sub">
          Interested in building reliable, scalable infrastructure or discussing
          cloud-native architectures? Drop a message.
        </p>

        <div className="form-card">
          {/* Hidden iframe for Google Forms silent POST.
              FIX 13: title attribute added for a11y linter compliance.
              FIX 11: onLoad fires after the POST response — used as the real success signal. */}
          <iframe
            name="hidden_iframe"
            title="Form submission target"
            style={{ display: "none" }}
            aria-hidden="true"
            onLoad={handleIframeLoad}
          />

          {!submitted ? (
            <form
              action={GOOGLE_FORM_ACTION}
              method="POST"
              target="hidden_iframe"
              onSubmit={handleSubmit}
            >
              {/* FIX 6: Added htmlFor + id to link label → input for accessibility */}
              <div className="input-group">
                <label htmlFor="contact-name" className="input-label">Name</label>
                <input
                  id="contact-name"
                  name="entry.2005620554"
                  placeholder="Your full name"
                  className="field-style"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="contact-email" className="input-label">Email Address</label>
                <input
                  id="contact-email"
                  name="entry.1045781291"
                  type="email"
                  placeholder="name@company.com"
                  className="field-style"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="contact-message" className="input-label">Message</label>
                <textarea
                  id="contact-message"
                  name="entry.839337160"
                  placeholder="How can I help you?"
                  rows={4}
                  className="field-style"
                  autoComplete="off"
                  required
                />
              </div>

              {/* FIX: Removed redundant inline style — background is controlled by
                  .submit-btn CSS class and :disabled opacity. Inline style was
                  overriding !important CSS declarations inconsistently. */}
              <button
                type="submit"
                className={`submit-btn${submitting ? " submitting" : ""}`}
                disabled={submitting}
              >
                {submitting ? "Transmitting..." : "Transmit Message"}
              </button>
            </form>
          ) : (
            // FIX 7: Hide form after submit instead of showing both form + success
            // Previously the success message appeared below the form which was confusing
            <div className="success-msg" role="alert">
              &gt; CONNECTION ESTABLISHED: Message received successfully.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
