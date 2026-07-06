import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Wifi, ShieldCheck, TrendingUp, Award, Sparkles } from 'lucide-react';

interface MilestoneItem {
  icon: ReactNode;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  color: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    icon: <Users className="w-6 h-6 text-sky-400" />,
    value: 100,
    suffix: "+",
    label: "LCOs Joined",
    description: "Active regional cable operators empowered across India",
    color: "from-sky-500/20 to-sky-500/5 border-sky-500/30"
  },
  {
    icon: <Wifi className="w-6 h-6 text-indigo-400" />,
    value: 450,
    suffix: "K+",
    label: "Connected Households",
    description: "High-speed dual-band Wi-Fi 6 vessels active in residential grids",
    color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30"
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    value: 99,
    suffix: ".98%",
    label: "Core Network Uptime",
    description: "Carrier-grade SLA guaranteed across all optical SOC depots",
    color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-yellow-400" />,
    prefix: "₹",
    value: 42000,
    suffix: "+",
    label: "Avg Monthly ARPU Boost",
    description: "Incremental revenue per partner via Wi-Fi 6 & hyper-local ads",
    color: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30"
  }
];

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo function for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * value);
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-extrabold tracking-tighter">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function PartnerMilestones() {
  return (
    <section id="milestones" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 border-y border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>REAL-TIME ECOSYSTEM METRICS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-display tracking-tight">
            Proven Scale Across <span className="text-sky-500">Regional Grids</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 font-light">
            Our numbers reflect the relentless growth of independent cable operators who have upgraded their infrastructure to YO WiFi's turnkey ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className={`p-8 rounded-3xl bg-gradient-to-br ${item.color} border backdrop-blur-md flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 shadow-inner">
                  {item.icon}
                </div>
                <Sparkles className="w-4 h-4 text-slate-500 opacity-50" />
              </div>

              <div className="my-2">
                <div className="text-4xl lg:text-5xl text-white mb-2">
                  <AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} />
                </div>
                <h3 className="text-base font-bold text-slate-200 font-display">{item.label}</h3>
              </div>

              <p className="text-xs text-slate-400 mt-3 font-light leading-relaxed border-t border-white/10 pt-3">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
