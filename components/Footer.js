// NOTE: This component is NOT used — the footer is rendered directly
// in layout.js. You can safely DELETE this file.
//
// If you ever want to extract the footer into its own component,
// import this in layout.js and replace the inline <footer> block there.

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        background: "#020617",
        padding: "3rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left: site name with pulse dot */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            color: "#94a3b8",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#8b5cf6",
              boxShadow: "0 0 10px #8b5cf6",
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          nishantkamal.com
        </span>

        {/* Center: copyright with dynamic year */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "#94a3b8",
          }}
        >
          © {new Date().getFullYear()} — Engineering Reliability
        </span>

        {/* Right: stack label — hidden on mobile via inline media query workaround */}
        <span
          className="footer-stack-label"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            color: "#94a3b8",
            textTransform: "uppercase",
          }}
        >
          Next.js · Tailwind · JetBrains Mono
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-stack-label { display: none; }
        }
      `}</style>
    </footer>
  );
}
