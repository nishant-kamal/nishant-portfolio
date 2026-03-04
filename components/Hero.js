"use client";

import { useEffect, useState } from "react";

const roles = [
  "Site Reliability Engineer",
  "Cloud Platform Architect",
  "Control Plane Engineer",
];

const bentoHighlights = [
  { 
    icon: "☸️", 
    title: "K8S ECOSYSTEM", 
    desc: "Scaling production-grade clusters with zero-downtime and high availability." 
  },
  { 
    icon: "☁️", 
    title: "AWS ARCHITECTURE", 
    desc: "Designing secure, multi-region cloud infrastructure optimized for cost." 
  },
  { 
    icon: "✈️", 
    title: "CROSSPLANE & GITOPS", 
    desc: "Building K8s-native control planes to manage cloud resources." 
  }
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
    <section className="relative text-white">
      <style>{`
        .hero-headline { 
          font-size: clamp(3rem, 7.5vw, 5.5rem); 
          font-weight: 800; 
          line-height: 0.95; 
          letter-spacing: -0.05em; 
        }
        .text-purple { color: #a78bfa; }
        .profile-frame { 
          width: 350px; 
          height: 350px; 
          border-radius: 50%; 
          padding: 8px; 
          background: linear-gradient(135deg, rgba(167, 139, 250, 0.4), transparent); 
          box-shadow: 0 0 60px rgba(167, 139, 250, 0.1); 
        }
        .bento-card { 
          background: #0f172a; 
          border: 1px solid rgba(255, 255, 255, 0.05); 
          padding: 32px; 
          border-radius: 24px; 
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); 
        }
        .bento-card:hover {
          transform: translateY(-8px);
          border-color: #a78bfa;
          background: #141d33;
        }
      `}</style>
      
      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] mb-20">
        <div>
          {/* Status Badge with Live Pulse */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
            <span className="font-mono text-[10px] tracking-widest text-green-400 uppercase">System Status: Ready for Production</span>
          </div>

          <h1 className="hero-headline mb-8">
            Engineering <span className="text-purple">resilient systems</span> that scale for the next billion.
          </h1>
          
          <div className="mb-8 font-mono text-xl text-[#a78bfa]">
            &gt; {displayed}<span className="animate-pulse">_</span>
          </div>

          {/* Corrected Text: No visible citation markers */}
          <p className="mb-12 max-w-2xl text-xl leading-relaxed text-slate-400 font-medium">
            I’m <strong>Nishant Kamal</strong>, an SRE with <strong>6+ years</strong> of experience [cite: 56] building reliable platforms on Kubernetes and AWS[cite: 52, 53].
          </p>

          <div className="flex flex-wrap gap-5">
            <a href="#projects" className="rounded-full bg-[#8b5cf6] px-10 py-4 font-bold shadow-lg shadow-purple-500/20 transition hover:scale-105">View Stack Analysis</a>
            <a href="/resume.pdf" className="rounded-full border border-white/10 px-10 py-4 font-semibold transition hover:bg-white/5">Download Resume</a>
          </div>
        </div>

        <div className="flex justify-end pr-4">
          <div className="profile-frame">
            <img 
              src="/profile.png" 
              alt="Nishant Kamal" 
              className="h-full w-full rounded-full object-cover bg-[#0f172a] border-4 border-[#020617]" 
            />
          </div>
        </div>
      </div>

      {/* Bento Grid Highlights filling the visual gap */}
      <div className="grid gap-6 md:grid-cols-3">
        {bentoHighlights.map((item, idx) => (
          <div key={idx} className="bento-card">
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              <span className="text-lg">{item.icon}</span> {item.title}
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
