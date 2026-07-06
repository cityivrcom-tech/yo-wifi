import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Globe, Users, TrendingUp, ShieldCheck, Cpu, Zap, Activity, Award } from 'lucide-react';

interface MetricItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  description: string;
  badge: string;
  icon: React.ReactNode;
  gradient: string;
}

const ECOSYSTEM_METRICS: MetricItem[] = [
  {
    id: "fiber-km",
    label: "Total Fiber Kilometers Optimized",
    value: 32500,
    suffix: "+ km",
    description: "High-speed optical fiber backhaul mapped and actively enhanced across India",
    badge: "Infrastructure Scale",
    icon: <Globe className="w-6 h-6 text-sky-400" />,
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent border-sky-500/30 text-sky-400"
  },
  {
    id: "sub-growth",
    label: "Active Subscriber Growth Velocity",
    value: 142,
    prefix: "+",
    suffix: "% YoY",
    description: "Average annual residential subscriber expansion achieved by partner operators",
    badge: "Partner Velocity",
    icon: <TrendingUp className="w-6 h-6 text-indigo-400" />,
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent border-indigo-500/30 text-indigo-400"
  },
  {
    id: "churn-reduction",
    label: "Churn Reduction Percentage",
    value: 84.6,
    decimals: 1,
    suffix: "%",
    description: "Drastic drop in customer cancellations after deploying Wi-Fi 6 dual-band vessels",
    badge: "Retention Mastery",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30 text-emerald-400"
  },
  {
    id: "ad-impressions",
    label: "Automated Ad Impressions Delivered",
    value: 2.5,
    decimals: 1,
    suffix: "M+",
    description: "Geo-fenced Google & Meta ad views targeting residents inside exclusive LCO zones",
    badge: "Lead Gen Engine",
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/30 text-amber-400"
  }
];

function AnimatedNumber({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2200; // 2.2s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo for dramatic satisfying deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * value;
      
      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  const formattedNumber = decimals > 0 
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className="font-display font-black tracking-tighter">
      {prefix}{formattedNumber}{suffix}
    </span>
  );
}

export function EcosystemStatsCounter() {
  return (
    <section className="py-24 bg-slate-950 border-t border-white/10 relative overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Aggregated Ecosystem Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            The Scale of <span className="text-sky-400 italic">National Dominance</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Real-time telemetry aggregated across our national network of 100+ Local Cable Operators. When you partner with YO WiFi, your node is backed by nationwide optical momentum.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`p-6 sm:p-8 rounded-[2rem] bg-slate-900/60 border backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] shadow-xl ${metric.gradient}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    {metric.icon}
                  </div>
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-slate-200">
                    {metric.badge}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
                  <AnimatedNumber 
                    value={metric.value} 
                    decimals={metric.decimals} 
                    prefix={metric.prefix} 
                    suffix={metric.suffix} 
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-200 mb-1.5 leading-snug">
                  {metric.label}
                </h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Sync Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span>Data synchronized from 24/7 Remote SOC Telemetry • Updated every 60 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}
