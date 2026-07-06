import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Sparkles, ShieldCheck, Zap, TrendingUp, Layers, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComparisonRow {
  category: string;
  feature: string;
  standard: {
    text: string;
    status: 'bad' | 'neutral' | 'good';
  };
  yowifi: {
    text: string;
    status: 'good' | 'elite';
    highlight?: string;
  };
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    category: "Lead Generation",
    feature: "Resident Acquisition Engine",
    standard: { text: "Manual word-of-mouth & paper flyers distributed locally", status: 'bad' },
    yowifi: { text: "100% Fully funded geo-fenced Google & Meta automated ads", status: 'elite', highlight: "Auto-Pilot Ads" }
  },
  {
    category: "Hardware & Speeds",
    feature: "Customer Premise Equipment (CPE)",
    standard: { text: "Legacy single-band 2.4GHz routers (High interference)", status: 'bad' },
    yowifi: { text: "1200Mbps Dual-Band Wi-Fi 6 vessels with smart channel switching", status: 'elite', highlight: "Wi-Fi 6 Dual-Band" }
  },
  {
    category: "Network Diagnostics",
    feature: "Outage & Interference Handling",
    standard: { text: "Reactive customer calls after service disruption occurs", status: 'bad' },
    yowifi: { text: "24/7 Remote SOC auto-healing & proactive diagnostic alerts", status: 'elite', highlight: "Zero-Downtime SOC" }
  },
  {
    category: "Brand Authority",
    feature: "Market Positioning",
    standard: { text: "Standalone local operator competing against national ISP giants", status: 'neutral' },
    yowifi: { text: "National brand authority ('Powered by YO WiFi') with local trust", status: 'good', highlight: "Enterprise Trust" }
  },
  {
    category: "Subscriber Retention",
    feature: "Average Annual Churn Rate",
    standard: { text: "18% to 25% annual subscriber churn due to router dropouts", status: 'bad' },
    yowifi: { text: "Under 1.8% annual churn via automated renewal reminders & stable Wi-Fi", status: 'elite', highlight: "98.2% Retention" }
  },
  {
    category: "Financial Growth",
    feature: "Average Revenue Per User (ARPU)",
    standard: { text: "Stagnant pricing due to heavy local price discounting", status: 'bad' },
    yowifi: { text: "+142% average LCO revenue growth via premium tier upsells", status: 'elite', highlight: "+142% ARPU Velocity" }
  }
];

export function ServicesComparisonTable({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const [activeTab, setActiveTab] = useState<'matrix' | 'yowifi_only' | 'standard_only'>('matrix');

  return (
    <div className="mt-20 max-w-6xl mx-auto bg-slate-900/80 border border-white/10 rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10 relative z-10">
        <div>
          <Badge className="mb-4 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1 px-4 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 mr-1.5 inline" /> Interactive Value Matrix
          </Badge>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Standard LCO vs. <span className="text-sky-500 italic">YO WiFi Powered</span>
          </h3>
          <p className="text-slate-400 text-sm sm:text-base font-light mt-2 max-w-2xl">
            See why over 500 regional cable operators are migrating from legacy manual workflows to our automated full-stack broadband ecosystem.
          </p>
        </div>

        {/* View toggles */}
        <div className="inline-flex p-1 bg-slate-950 rounded-2xl border border-white/10 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'matrix'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Side-by-Side Matrix
          </button>
          <button
            onClick={() => setActiveTab('yowifi_only')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'yowifi_only'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> YO WiFi Advantage
          </button>
          <button
            onClick={() => setActiveTab('standard_only')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'standard_only'
                ? 'bg-slate-800 text-slate-300'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Standard LCO
          </button>
        </div>
      </div>

      {/* Comparison Table / Cards */}
      <div className="relative z-10 space-y-4">
        {COMPARISON_DATA.map((row, idx) => {
          const showStandard = activeTab === 'matrix' || activeTab === 'standard_only';
          const showYoWifi = activeTab === 'matrix' || activeTab === 'yowifi_only';

          return (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-white/15 transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              {/* Feature Title & Category */}
              <div className={`${activeTab === 'matrix' ? 'md:col-span-4' : 'md:col-span-5'}`}>
                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1">
                  {row.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {row.feature}
                </h4>
              </div>

              {/* Standard LCO Column */}
              {showStandard && (
                <div className={`${activeTab === 'matrix' ? 'md:col-span-4' : 'md:col-span-7'} p-3.5 rounded-xl bg-slate-900/40 border border-red-500/10 flex items-start gap-3`}>
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono font-bold text-red-400/80 uppercase tracking-wider block mb-0.5">
                      Standard Legacy LCO
                    </span>
                    <p className="text-xs sm:text-sm text-slate-400 leading-snug">
                      {row.standard.text}
                    </p>
                  </div>
                </div>
              )}

              {/* YO WiFi Powered Column */}
              {showYoWifi && (
                <div className={`${activeTab === 'matrix' ? 'md:col-span-4' : 'md:col-span-7'} p-3.5 rounded-xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/30 flex items-start gap-3 relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:bg-sky-500/20 transition-colors" />
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div className="relative z-10 w-full">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                        YO WiFi Powered
                      </span>
                      {row.yowifi.highlight && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest bg-sky-500 text-slate-950">
                          {row.yowifi.highlight}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-snug">
                      {row.yowifi.text}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Call to Action inside table */}
      <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">Ready to upgrade from Standard to Powered?</h5>
            <p className="text-xs text-slate-400 font-light">Zero upfront franchise fee. Exclusive 2km territory protection.</p>
          </div>
        </div>
        <Button
          onClick={onOpenConsultation}
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-full px-8 py-6 text-xs font-bold uppercase tracking-widest shadow-xl shadow-sky-500/20 transition-transform hover:scale-105 shrink-0"
        >
          Upgrade Your LCO Node Now
        </Button>
      </div>
    </div>
  );
}
