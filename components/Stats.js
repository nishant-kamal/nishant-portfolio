"use client";

import { useEffect, useState, useRef } from "react";

const statsData = [
  { value: 6,      suffix: "+",  label: "Years Experience",    color: "#38bdf8", icon: "◈" },
  { value: 35,     suffix: "%",  label: "Cloud Cost Saved",    color: "#34d399", icon: "↓" },
  { value: 99.9,   suffix: "%",  label: "Platform Uptime",      color: "#a78bfa", icon: "⬡" },
  { value: 50,     suffix: "+",  label: "Global Deployments",  color: "#fb923c", icon: "△" },
];

function Counter({ target, suffix, color }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTs = null;
    const duration = 2000;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = ease * target;
      setVal(target % 1 !== 0 ? current.toFixed(1) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target]);

  return <span ref={ref} style={{ color, fontVariantNumeric: 'tabular-nums' }}>{val}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="bg-slate-950 py-24 text-white border-y border-white/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="mx-auto max-w-[1300px] px-6">
        
        {/* New Title Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Live Metrics</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Reliability by the <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Numbers</span>
          </h2>
          <p className="text-slate-500 max-w-lg text-sm md:text-base font-light">
            Quantifiable impact on infrastructure performance, security compliance, and operational efficiency.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {statsData.map((s) => (
            <div key={s.label} className="group relative rounded-2xl border border-white/5 bg-slate-900/40 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-slate-900/60">
              {/* Subtle Glow Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="mb-6 flex justify-between items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lg shadow-inner" style={{ color: s.color }}>
                    {s.icon}
                  </div>
                  <div className="font-mono text-[9px] text-slate-600 tracking-tighter group-hover:text-slate-400 transition-colors">
                    DATA_PULL::OK
                  </div>
                </div>
                
                <div className="mb-2 text-4xl font-extrabold tracking-tighter md:text-5xl">
                  <Counter target={s.value} suffix={s.suffix} color={s.color} />
                </div>
                
                <div className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase font-medium">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
