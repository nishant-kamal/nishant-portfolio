"use client";

import { useEffect, useState, useRef } from "react";

const statsData = [
  { value: 6,      suffix: "+",  label: "Years Experience",    color: "#38bdf8", glow: "rgba(56,189,248,.15)",   icon: "◈" },
  { value: 35,     suffix: "%",  label: "Cloud Cost Saved",   color: "#34d399", glow: "rgba(52,211,153,.15)",   icon: "↓" },
  { value: 99.9,   suffix: "%",  label: "Platform Uptime",     color: "#a78bfa", glow: "rgba(167,139,250,.15)",  icon: "⬡" },
  { value: 50,     suffix: "+",  label: "Global Deployments",  color: "#fb923c", glow: "rgba(251,146,60,.15)",   icon: "△" },
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
    <section className="bg-slate-900/40 py-16 text-white border-y border-white/5">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {statsData.map((s) => (
            <div key={s.label} className="group relative rounded-2xl border border-white/5 bg-slate-950/50 p-8 backdrop-blur-xl transition hover:border-[#a78bfa]/30">
              <div className="mb-6 flex justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lg" style={{ color: s.color }}>{s.icon}</div>
                <div className="font-mono text-[9px] text-slate-600">SYNCING...</div>
              </div>
              <div className="mb-2 text-4xl font-extrabold tracking-tighter">
                <Counter target={s.value} suffix={s.suffix} color={s.color} />
              </div>
              <div className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
