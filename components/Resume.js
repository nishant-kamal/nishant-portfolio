"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA — pulled from / mirroring the same sources as the rest of the site.
// When you update Projects.js / Awards.js / Education.js, update here too.
// Hardcoded: personal contact details (not stored elsewhere on the site).
// ─────────────────────────────────────────────────────────────────────────────

const PERSONAL = {
  name:     "Nishant Kamal",
  email:    "nishant.kamal2015@gmail.com",
  location: "New Delhi, Delhi 110030",
  github:   "https://github.com/nishant-kamal",
  linkedin: "https://www.linkedin.com/in/imnishant19",
  title:    "Site Reliability Engineer",
};

const SUMMARY =
  "Results-oriented Site Reliability Engineer with 5+ years of experience managing large-scale production environments across AWS and Oracle Cloud. Proven track record delivering 99.9% platform uptime, 35% cloud cost reduction via Karpenter, and standardised observability across 50+ services. Expert in Kubernetes, GitOps, Istio service mesh, and cross-functional incident response.";

// Mirror of Skills.js categories
const SKILLS = [
  { category: "Cloud Platforms",          items: "AWS (EC2, S3, RDS, IAM, EKS, CloudWatch), Oracle Cloud (OCI)" },
  { category: "Containerisation & Orch.", items: "Docker, Kubernetes, Helm, Karpenter, Istio Service Mesh" },
  { category: "CI/CD & GitOps",           items: "FluxCD, GitHub Actions, ArgoCD, Crossplane" },
  { category: "Monitoring & Logging",     items: "Prometheus, Grafana, New Relic, Loki, AlertManager" },
  { category: "Messaging & Streaming",    items: "Kafka, Debezium" },
  { category: "IaC & Scripting",          items: "Terraform, Shell, Python, YAML, Git" },
  { category: "Other Tools",              items: "Jira, Confluence, Istio, Virtual Services, Gateways" },
];

// FIX: Updated to match LinkedIn profile — 3 distinct roles at FarEye
const EXPERIENCE = [
  {
    company:  "FarEye",
    location: "Noida, India",
    role:     "Site Reliability Engineer",
    period:   "05/2023 – Present",
    bullets: [
      "Architected and created cloud infrastructure on AWS EKS, ensuring high availability and scalability, with integrated observability using Prometheus, Grafana, and New Relic.",
      "Implemented Karpenter for dynamic scaling, replacing ASG and improving cost efficiency in the Kubernetes environment.",
      "Deployed Istio, Virtual Services, and Gateways to manage traffic routing and enhance microservices communication within clusters.",
      "Leveraged Helm Charts extensively for automating application deployments and simplifying IaC processes.",
      "Streamlined CI/CD pipelines by integrating FluxCD and GitHub Actions, improving deployment cycles across teams.",
      "Conducted root-cause analyses after major incidents to identify process improvement and technical enhancement opportunities.",
      "Implemented cost-saving measures by optimising resource utilisation across cloud-based infrastructure environments.",
    ],
  },
  {
    company:  "FarEye",
    location: "Noida, India",
    role:     "Senior Tech Engineer",
    period:   "06/2022 – 04/2023",
    bullets: [
      "Visited Landmark Group in Dubai to collaborate with cross-functional teams, addressing infrastructure challenges and optimising system performance.",
      "Proactively identified performance bottlenecks; implemented monitoring and automation techniques to enhance reliability.",
      "Troubleshot production issues, working closely with dev teams to improve system uptime and minimise downtime.",
      "Collaborated on migration initiatives, improving deployment consistency and platform stability across environments.",
    ],
  },
  {
    company:  "FarEye",
    location: "Remote",
    role:     "Tech Engineer",
    period:   "06/2020 – 05/2022",
    bullets: [
      "Enhanced infrastructure performance through proactive system monitoring and troubleshooting, ensuring minimal downtime.",
      "Provided infrastructure support for production environments, ensuring high availability and rapid incident response.",
      "Collaborated with SRE and development teams to resolve operational issues and maintain SLA compliance.",
    ],
  },
];

// Mirror of Projects.js (top 6 shown on site)
const PROJECTS = [
  {
    title:  "Kubernetes GitOps Deployment",
    points: [
      "Deployed on AWS EKS using Helm and FluxCD for GitOps-based CD with HPA, Liveness/Readiness Probes, and ingress controllers.",
      "Integrated Prometheus and Grafana for metrics; achieved -70% deployment time and 0 drift incidents.",
    ],
  },
  {
    title:  "AWS Cost Optimisation via Karpenter Migration",
    points: [
      "Replaced inefficient AWS ASGs with Karpenter; designed provisioning strategies and custom disruption budgets for graceful termination.",
      "Achieved 35% reduction in EC2 costs via Spot Instances and efficient instance type selection.",
    ],
  },
  {
    title:  "Oracle Cloud Infrastructure (OCI) POC & Production Launch",
    points: [
      "Designed and executed OCI proof-of-concept; deployed the organisation's first production OCI environment.",
      "Deployed Karpenter on OCI for node autoscaling; implemented Istio + Virtual Services for service mesh traffic control.",
      "Resolved 100% of QA-reported issues, driving environment from staging to stable live production.",
    ],
  },
  {
    title:  "ACR Migration & Registry Decommission",
    points: [
      "Led decommissioning of legacy Azure Container Registry; migrated all assets with zero-downtime pipeline cutover.",
      "Full image audit — purged all stale/orphaned layers; eliminated legacy dependencies across all CI/CD pipelines.",
    ],
  },
  {
    title:  "Alerting Standardisation via Helm Chart",
    points: [
      "Designed a company-wide Helm chart for alerts, eliminating 50+ disparate custom alert files.",
      "Established unified runbooks, routing rules, and escalation policies — reduced MTTR by 40%.",
    ],
  },
  {
    title:  "Crossplane-Based Automated Infrastructure Deployment (Azure | OCI)",
    points: [
      "Implemented Crossplane across OCI and Azure, standardising infra definitions and cutting manual provisioning by 40–60%.",
      "Created reusable Compositions & XRDs for on-demand cloud environments, improving reproducibility and developer self-service.",
    ],
  },
];

// Mirror of Education.js
const EDUCATION = [
  {
    degree:      "M.Tech — Cloud Computing",
    institution: "Birla Institute of Technology and Science (BITS Pilani)",
    year:        "05/2026",
  },
  {
    degree:      "B.Tech — Electrical and Electronics Engineering",
    institution: "Vellore Institute of Technology (VIT), Vellore",
    year:        "04/2019",
  },
];

// Mirror of Awards.js
const AWARDS = [
  { title: "Customer Happiness Champion", period: "Jun 2025", detail: "OND 2024 Quarter" },
  { title: "FarEye Acers: Rising Star",   period: "May 2024", detail: "Leadership & innovation in SRE at FarEye" },
  { title: "Spotted Award",               period: "Apr 2023", detail: "Above & beyond customer support JFM 2023" },
  { title: "Captain Marvel",              period: "Mar 2023", detail: "Passion for customers OND 2022" },
  { title: "Dark Knight",                 period: "Oct 2022", detail: "Complex problem-solving JAS 2022" },
  { title: "Dark Knight",                 period: "Jun 2022", detail: "Technical excellence & RCA skills JFM 2022" },
  { title: "Captain Marvel",              period: "Oct 2020", detail: "Customer-centric solutions JAS 2020" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PDF GENERATION  (uses jsPDF loaded from CDN via dynamic script injection)
// ─────────────────────────────────────────────────────────────────────────────

function loadJsPDF() {
  return new Promise((resolve, reject) => {
    if (window.jspdf) return resolve(window.jspdf.jsPDF);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => resolve(window.jspdf.jsPDF);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function generatePDF(setStatus) {
  setStatus("loading");
  const jsPDF = await loadJsPDF();
  setStatus("generating");

  const doc = new jsPDF({ unit: "pt", format: "letter" });

  // ── Design tokens ──
  const PW   = 612;   // page width pts
  const PH   = 792;   // page height pts
  const ML   = 42;    // margin left
  const MR   = 42;    // margin right
  const CW   = PW - ML - MR;  // content width
  const NAVY = [30, 58, 95];
  const BLUE = [37, 99, 235];
  const SLATE= [71, 85, 105];
  const LGRAY= [148, 163, 184];
  const BLACK= [15, 23, 42];
  const WHITE= [255, 255, 255];
  const LBUE = [239, 246, 255];

  let y = 0; // cursor

  // ── helpers ──
  const setColor = (rgb, type = "text") => {
    if (type === "fill") doc.setFillColor(...rgb);
    else doc.setTextColor(...rgb);
  };
  const font = (size, style = "normal", family = "helvetica") =>
    doc.setFont(family, style).setFontSize(size);

  const checkPage = (needed = 20) => {
    if (y + needed > PH - 48) {
      doc.addPage();
      y = 48;
    }
  };

  const sectionHeading = (text) => {
    checkPage(32);
    y += 10;
    setColor(NAVY, "fill");
    doc.rect(ML, y, CW, 18, "F");
    font(9, "bold");
    setColor(WHITE);
    doc.text(text.toUpperCase(), ML + 8, y + 12.5);
    y += 26;
  };

  const bullet = (text, x = ML + 14, maxW = CW - 14) => {
    checkPage(14);
    font(8.5, "normal");
    setColor(BLACK);
    setColor(BLUE, "fill");
    doc.circle(x - 6, y - 2.5, 1.5, "F");
    const lines = doc.splitTextToSize(text, maxW);
    doc.text(lines, x, y);
    y += lines.length * 11.5;
  };

  // ── HEADER ──────────────────────────────────────────────────────────────────
  setColor(NAVY, "fill");
  doc.rect(0, 0, PW, 90, "F");

  font(26, "bold");
  setColor(WHITE);
  doc.text(PERSONAL.name.toUpperCase(), PW / 2, 30, { align: "center" });

  font(10, "normal");
  setColor([147, 197, 253]);
  doc.text(PERSONAL.title, PW / 2, 45, { align: "center" });

  font(7.5, "normal");
  setColor([125, 211, 252]);
  const contactLine = `${PERSONAL.email}   |   ${PERSONAL.location}`;
  doc.text(contactLine, PW / 2, 58, { align: "center" });

  setColor([147, 197, 253]);
  const linksLine = `${PERSONAL.github}   |   ${PERSONAL.linkedin}`;
  doc.text(linksLine, PW / 2, 70, { align: "center" });

  y = 102;

  // ── SUMMARY ─────────────────────────────────────────────────────────────────
  sectionHeading("Professional Summary");
  font(9, "normal");
  setColor(BLACK);
  const sumLines = doc.splitTextToSize(SUMMARY, CW);
  doc.text(sumLines, ML, y);
  y += sumLines.length * 12 + 4;

  // ── SKILLS ──────────────────────────────────────────────────────────────────
  sectionHeading("Core Skills & Technologies");
  const colW = CW / 2 - 6;
  const LH_SKILL = 10;

  const skillRows = [];
  for (let i = 0; i < SKILLS.length; i += 2) {
    skillRows.push([SKILLS[i], SKILLS[i + 1] || null]);
  }

  skillRows.forEach(([left, right]) => {
    font(8, "normal");
    const leftLines  = doc.splitTextToSize(left.items, colW - 2);
    const rightLines = right ? doc.splitTextToSize(right.items, colW - 2) : [];
    const rowH = Math.max(leftLines.length, rightLines.length) * LH_SKILL + 16;
    checkPage(rowH);

    font(8, "bold");   setColor(NAVY);
    doc.text(left.category + ":", ML, y);
    font(8, "normal"); setColor(SLATE);
    doc.text(leftLines, ML, y + 10);

    if (right) {
      font(8, "bold");   setColor(NAVY);
      doc.text(right.category + ":", ML + colW + 12, y);
      font(8, "normal"); setColor(SLATE);
      doc.text(rightLines, ML + colW + 12, y + 10);
    }

    y += rowH;
  });

  // ── EXPERIENCE ──────────────────────────────────────────────────────────────
  sectionHeading("Professional Experience");

  EXPERIENCE.forEach((exp) => {
    checkPage(56);

    setColor(LBUE, "fill");
    doc.rect(ML, y, CW, 22, "F");

    font(10, "bold"); setColor(NAVY);
    doc.text(exp.role, ML + 6, y + 14);

    font(8, "bold"); setColor(BLUE);
    doc.text(exp.period, PW - MR - 6, y + 14, { align: "right" });

    y += 24;

    font(8, "normal"); setColor(SLATE);
    doc.text(`${exp.company}  ·  ${exp.location}`, ML + 6, y);
    y += 14;

    exp.bullets.forEach((b) => bullet(b));
    y += 8;
  });

  // ── PROJECTS ────────────────────────────────────────────────────────────────
  sectionHeading("Key Projects");

  PROJECTS.forEach((p, i) => {
    checkPage(36);

    font(9, "bold");
    setColor(NAVY);
    doc.text(`${i + 1}. ${p.title}`, ML, y);
    y += 13;

    p.points.forEach((pt) => bullet(pt, ML + 16, CW - 16));
    y += 4;
  });

  // ── EDUCATION ───────────────────────────────────────────────────────────────
  sectionHeading("Education");

  EDUCATION.forEach((e) => {
    checkPage(36);
    setColor(LBUE, "fill");
    doc.rect(ML, y, CW, 22, "F");

    font(9, "bold"); setColor(NAVY);
    doc.text(e.degree, ML + 6, y + 14);

    font(8, "bold"); setColor(BLUE);
    doc.text(e.year, PW - MR - 6, y + 14, { align: "right" });

    y += 24;

    font(8, "normal"); setColor(SLATE);
    doc.text(e.institution, ML + 6, y);

    y += 16;
  });

  // ── AWARDS ──────────────────────────────────────────────────────────────────
  sectionHeading("Awards & Recognition");

  AWARDS.forEach((a) => {
    checkPage(26);

    setColor([251, 146, 60], "fill");
    doc.circle(ML + 6, y - 2, 2, "F");

    font(9, "bold"); setColor(NAVY);
    doc.text(a.title, ML + 14, y);

    font(8, "bold"); setColor(BLUE);
    doc.text(a.period, PW - MR - 6, y, { align: "right" });

    y += 12;

    font(8, "normal"); setColor(SLATE);
    const detailLines = doc.splitTextToSize(a.detail, CW - 20);
    doc.text(detailLines, ML + 14, y);
    y += detailLines.length * 10 + 5;
  });

  // ── FOOTER on every page ────────────────────────────────────────────────────
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    font(7, "normal");
    setColor(LGRAY);
    doc.text(
      `Nishant Kamal — SRE Resume   |   Page ${i} of ${pageCount}`,
      PW / 2, PH - 18, { align: "center" }
    );
    setColor(NAVY, "fill");
    doc.rect(ML, PH - 28, CW, 1, "F");
  }

  doc.save("Nishant_Kamal_Resume.pdf");
  setStatus("done");
  setTimeout(() => setStatus("idle"), 3000);
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Resume() {
  const [status, setStatus] = useState("idle"); // idle | loading | generating | done | error

  const label = {
    idle:       "↓ Download Resume PDF",
    loading:    "Loading PDF engine...",
    generating: "Generating PDF...",
    done:       "✓ Downloaded!",
    error:      "✗ Failed — try again",
  }[status];

  const handleClick = () => {
    if (status !== "idle" && status !== "error") return;
    setStatus("idle");
    generatePDF(setStatus).catch((err) => {
      console.error("PDF generation failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    });
  };

  const busy = status === "loading" || status === "generating";

  return (
    <>
      <style>{`
        .resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #38bdf8;
          background: transparent;
          border: 1px solid rgba(56, 189, 248, 0.35);
          padding: 7px 18px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.25s, color 0.25s, box-shadow 0.25s, opacity 0.2s;
          white-space: nowrap;
          user-select: none;
          line-height: 1;
        }
        .resume-btn:hover:not(:disabled) {
          background: #38bdf8;
          color: #020617;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.35);
        }
        .resume-btn:disabled {
          opacity: 0.6;
          cursor: wait;
        }
        .resume-btn.done {
          color: #34d399;
          border-color: rgba(52, 211, 153, 0.4);
        }
        .resume-btn.done:hover {
          background: #34d399;
          color: #020617;
          box-shadow: 0 0 20px rgba(52, 211, 153, 0.35);
        }
        .resume-btn.error {
          color: #f87171;
          border-color: rgba(248, 113, 113, 0.4);
        }
        .resume-btn.error:hover {
          background: #f87171;
          color: #020617;
          box-shadow: 0 0 20px rgba(248, 113, 113, 0.35);
        }
        .resume-btn:focus-visible {
          outline: 2px solid #38bdf8;
          outline-offset: 2px;
        }
        .resume-spinner {
          width: 10px; height: 10px;
          border: 1.5px solid currentColor;
          border-top-color: transparent;
          border-radius: 50%;
          animation: resume-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes resume-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .resume-spinner { animation: none; }
          .resume-btn { transition: none; }
        }
      `}</style>

      <button
        className={`resume-btn ${status === "done" ? "done" : ""} ${status === "error" ? "error" : ""}`}
        onClick={handleClick}
        disabled={busy}
        aria-label="Download resume as PDF"
        aria-busy={busy}
      >
        {busy && <span className="resume-spinner" aria-hidden="true" />}
        {label}
      </button>
    </>
  );
}
