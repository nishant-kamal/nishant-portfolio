"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Smooth transition to success state
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .contact-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 120px 24px;
          background: #020617;
          position: relative;
        }

        .contact-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .contact-headline {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #f8fafc;
          margin-bottom: 24px;
        }

        .contact-headline em {
          font-style: normal;
          color: #8b5cf6;
        }

        .contact-sub {
          color: #94a3b8;
          font-size: 1.1rem;
          margin-bottom: 60px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .form-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border-radius: 32px;
          padding: 48px;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .form-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 8px;
          letter-spacing: 0.1em;
        }

        .field-style {
          width: 100%;
          background: rgba(2, 6, 23, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px 18px;
          color: #f8fafc;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .field-style:focus {
          outline: none;
          border-color: #8b5cf6;
          background: rgba(139, 92, 246, 0.05);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: #8b5cf6;
          color: white;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px -10px rgba(139, 92, 246, 0.5);
        }

        .submit-btn:hover {
          background: #7c3aed;
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -10px rgba(139, 92, 246, 0.6);
        }

        .success-msg {
          margin-top: 24px;
          padding: 16px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 12px;
          color: #4ade80;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          text-align: center;
        }
      `}</style>

      <section id="contact" className="contact-root">
        <div className="contact-container">
          <h2 className="contact-headline">
            Let’s <em>Connect.</em>
          </h2>
          <p className="contact-sub">
            Interested in building reliable, scalable infrastructure or discussing 
            cloud-native architectures? Drop a message.
          </p>

          <div className="form-card">
            <iframe name="hidden_iframe" style={{ display: "none" }} />

            <form
              action="https://docs.google.com/forms/d/e/1FAIpQLSeOfYCnQBiw8tp8xF3jBA16_EGd4BItPuAavMXxGqmsFjnpMA/formResponse"
              method="POST"
              target="hidden_iframe"
              onSubmit={handleSubmit}
            >
              <div className="input-group">
                <label className="input-label">01 // Name</label>
                <input
                  name="entry.2005620554"
                  placeholder="Your full name"
                  className="field-style"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">02 // Email Address</label>
                <input
                  name="entry.1045781291"
                  type="email"
                  placeholder="name@company.com"
                  className="field-style"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">03 // Message</label>
                <textarea
                  name="entry.839337160"
                  placeholder="How can I help you?"
                  rows="4"
                  className="field-style"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Transmit Message
              </button>
            </form>

            {submitted && (
              <div className="success-msg">
                &gt; CONNECTION ESTABLISHED: Message received successfully.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
