import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Users, ArrowRight, Sparkles, CheckCircle2, Calculator, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RoiCalculatorProps {
  onOpenConsultation: (subscribers: number) => void;
}

export function RoiCalculator({ onOpenConsultation }: RoiCalculatorProps) {
  const [subscribers, setSubscribers] = useState(1200);
  const [arpu, setArpu] = useState(450); // Average Revenue Per User in ₹
  const [tier, setTier] = useState<'core' | 'domination' | 'elite'>('domination');

  const tierMultipliers = {
    core: { subGrowth: 0.35, arpuBoost: 50, name: "Core Ecosystem (+35% Scale)" },
    domination: { subGrowth: 0.50, arpuBoost: 85, name: "Domination Engine (+50% Scale)" },
    elite: { subGrowth: 0.65, arpuBoost: 130, name: "Elite Partnership (+65% Scale)" },
  };

  const calculations = useMemo(() => {
    const currentMonthlyRevenue = subscribers * arpu;
    const currentAnnualRevenue = currentMonthlyRevenue * 12;

    const addedSubscribers = Math.round(subscribers * tierMultipliers[tier].subGrowth);
    const projectedSubscribers = subscribers + addedSubscribers;
    
    const projectedArpu = arpu + tierMultipliers[tier].arpuBoost;
    const projectedMonthlyRevenue = projectedSubscribers * projectedArpu;
    const projectedAnnualRevenue = projectedMonthlyRevenue * 12;

    const monthlyGain = projectedMonthlyRevenue - currentMonthlyRevenue;
    const annualGain = projectedAnnualRevenue - currentAnnualRevenue;

    const revenueGrowthPercentage = Math.round(((projectedMonthlyRevenue - currentMonthlyRevenue) / currentMonthlyRevenue) * 100);

    return {
      currentMonthlyRevenue,
      currentAnnualRevenue,
      addedSubscribers,
      projectedSubscribers,
      projectedArpu,
      projectedMonthlyRevenue,
      projectedAnnualRevenue,
      monthlyGain,
      annualGain,
      revenueGrowthPercentage,
    };
  }, [subscribers, arpu, tier]);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="roi-calculator" className="py-32 bg-slate-900/60 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="mb-6 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1.5 px-5 text-xs">
            <Calculator className="w-3.5 h-3.5 mr-2 inline" /> Interactive Growth Engine
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Project Your LCO <span className="text-sky-500 italic">Revenue Scale</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            Input your current subscriber base and monthly revenue per user. See the exact financial lift when YO WiFi takes over your sales, ads, and hardware infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 glass bg-slate-900/80 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8">
            <h3 className="text-2xl font-bold font-display text-white border-b border-white/10 pb-4 flex items-center justify-between">
              <span>1. Current Network Parameters</span>
              <span className="text-xs font-mono text-sky-400 font-normal">Live Telemetry</span>
            </h3>

            {/* Subscriber Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-400" /> Current Active Subscribers
                </label>
                <div className="flex items-center gap-2 bg-slate-950 border border-white/15 rounded-xl px-4 py-2">
                  <input
                    type="number"
                    min="100"
                    max="20000"
                    step="50"
                    value={subscribers}
                    onChange={(e) => setSubscribers(Math.max(100, Math.min(20000, Number(e.target.value) || 0)))}
                    className="w-20 bg-transparent text-right font-mono font-bold text-white text-base focus:outline-none"
                  />
                  <span className="text-xs text-slate-500">users</span>
                </div>
              </div>
              <input
                type="range"
                min="200"
                max="15000"
                step="100"
                value={subscribers}
                onChange={(e) => setSubscribers(Number(e.target.value))}
                className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>200 Users</span>
                <span>5,000 Users</span>
                <span>15,000+ Users</span>
              </div>
            </div>

            {/* ARPU Input */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" /> Avg Monthly Revenue / User (ARPU)
                </label>
                <div className="flex items-center gap-2 bg-slate-950 border border-white/15 rounded-xl px-4 py-2">
                  <span className="text-slate-500 font-mono">₹</span>
                  <input
                    type="number"
                    min="150"
                    max="2000"
                    step="25"
                    value={arpu}
                    onChange={(e) => setArpu(Math.max(150, Math.min(2000, Number(e.target.value) || 0)))}
                    className="w-16 bg-transparent text-right font-mono font-bold text-white text-base focus:outline-none"
                  />
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="25"
                value={arpu}
                onChange={(e) => setArpu(Number(e.target.value))}
                className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>₹200 / mo</span>
                <span>₹600 / mo</span>
                <span>₹1,200 / mo</span>
              </div>
            </div>

            {/* Partnership Tier Selector */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-300 block">
                2. Select YO WiFi Growth Strategy
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'core', label: 'Core Tier', desc: '+35% Growth' },
                  { id: 'domination', label: 'Domination', desc: '+50% Growth', popular: true },
                  { id: 'elite', label: 'Elite Fiber', desc: '+65% Growth' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id as any)}
                    className={`relative p-4 rounded-2xl border text-left transition-all ${
                      tier === t.id
                        ? 'bg-sky-500/20 border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)]'
                        : 'bg-slate-950/50 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {t.popular && (
                      <span className="absolute -top-2 right-3 bg-sky-500 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    <p className="font-bold text-sm text-white">{t.label}</p>
                    <p className="text-xs text-sky-400 font-mono mt-1">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Projected Growth Display */}
          <div className="lg:col-span-5 bg-gradient-to-br from-sky-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-8">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20" />
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest">
                <TrendingUp className="w-4 h-4" /> Projected LCO Evolution
              </div>

              <div>
                <p className="text-sky-200 text-xs font-bold uppercase tracking-widest mb-1">Estimated Annual Profit Lift</p>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tighter text-white">
                  +{formatINR(calculations.annualGain)}
                </h3>
                <p className="text-xs text-sky-100 mt-2 font-light">
                  *Based on {calculations.addedSubscribers.toLocaleString()} new subscribers & ₹{tierMultipliers[tier].arpuBoost} ARPU lift from dual-band hardware upsells.
                </p>
              </div>

              {/* Visual Breakdown Cards */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <p className="text-[10px] uppercase font-bold text-sky-200">New Total Subscribers</p>
                  <p className="text-2xl font-bold font-mono text-white mt-1">
                    {calculations.projectedSubscribers.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-green-300 mt-0.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 inline" /> +{calculations.addedSubscribers.toLocaleString()} via ads
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <p className="text-[10px] uppercase font-bold text-sky-200">New Monthly Revenue</p>
                  <p className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
                    {formatINR(calculations.projectedMonthlyRevenue)}
                  </p>
                  <p className="text-[11px] text-green-300 mt-0.5 flex items-center gap-1">
                    <Zap className="w-3 h-3 inline" /> +{calculations.revenueGrowthPercentage}% jump
                  </p>
                </div>
              </div>

              {/* Bar Comparison */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase text-sky-200">Revenue Velocity Comparison</p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] text-sky-100 mb-1">
                      <span>Current Monthly</span>
                      <span className="font-mono">{formatINR(calculations.currentMonthlyRevenue)}</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-300 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.round((calculations.currentMonthlyRevenue / calculations.projectedMonthlyRevenue) * 100)}%` }} 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-white font-bold mb-1">
                      <span>With YO WiFi Ecosystem</span>
                      <span className="font-mono text-green-300">{formatINR(calculations.projectedMonthlyRevenue)}</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full w-full transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Button
                onClick={() => onOpenConsultation(subscribers)}
                className="w-full bg-white hover:bg-sky-50 text-slate-950 rounded-full py-7 text-base font-bold shadow-2xl transition-all hover:scale-105 group"
              >
                <span>Lock in Your Growth Projection</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-[10px] text-sky-200 text-center mt-3 font-medium">
                ⚡ Includes Custom Marketing & Dual-Band Router Roadmap
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
