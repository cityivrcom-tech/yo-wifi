import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, CheckCircle2, Sparkles, Globe, Wifi, Cpu, Layers } from 'lucide-react';

const LCO_PARTNERS = [
  { name: "South FiberNet India", city: "Coimbatore", subscribers: "14,500+ Subs", verifiedYear: "Since 2023" },
  { name: "Sri Sai Cable & Datacom", city: "Hyderabad", subscribers: "8,200+ Subs", verifiedYear: "Since 2024" },
  { name: "Malabar Optical Networks", city: "Kochi", subscribers: "6,800+ Subs", verifiedYear: "Since 2023" },
  { name: "Deccan High-Speed Grid", city: "Bangalore", subscribers: "21,000+ Subs", verifiedYear: "Since 2022" },
  { name: "Kaveri Digital Cable", city: "Chennai", subscribers: "11,400+ Subs", verifiedYear: "Since 2023" },
  { name: "Travancore Fiber", city: "Trivandrum", subscribers: "9,500+ Subs", verifiedYear: "Since 2024" },
  { name: "Surya Broadband Alliance", city: "Visakhapatnam", subscribers: "16,200+ Subs", verifiedYear: "Since 2023" },
  { name: "Royal Connect LCO Hub", city: "Vijayawada", subscribers: "7,100+ Subs", verifiedYear: "Since 2024" },
  { name: "Coastal Optical Link", city: "Mangalore", subscribers: "5,300+ Subs", verifiedYear: "Since 2023" },
  { name: "Pandian Cable Grid", city: "Madurai", subscribers: "8,900+ Subs", verifiedYear: "Since 2024" }
];

export function TrustedLcoMarquee() {
  return (
    <section className="py-16 bg-slate-950 border-y border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-32 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-32 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">Verified Social Proof</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" /> Live Network
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Trusted by <span className="text-sky-400 font-mono">100+</span> Regional Cable Operators & Fiber Consortia
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-light max-w-md">
            Empowering local cable desks across 20+ cities with dual-band hardware and automated Google ad engines.
          </p>
        </div>
      </div>

      {/* Marquee Track 1 (Left Scrolling) */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...LCO_PARTNERS, ...LCO_PARTNERS].map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-sky-500/40 hover:bg-slate-900/90 transition-all duration-300 backdrop-blur-md group cursor-default shrink-0 shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-xs font-mono group-hover:scale-110 transition-transform">
                {partner.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
                    {partner.name}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-0.5">
                  <span className="text-slate-300 font-semibold">{partner.city}</span>
                  <span>•</span>
                  <span className="text-green-400 font-semibold">{partner.subscribers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 38s linear infinite;
        }
      `}</style>
    </section>
  );
}
