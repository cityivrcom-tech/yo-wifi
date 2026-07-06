import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Cpu, 
  Megaphone, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  Zap, 
  Compass,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PartnerRoadmapProps {
  onOpenConsultation: () => void;
}

interface RoadmapPhase {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  timeline: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
  description: string;
  keyMilestones: string[];
  deliverables: {
    title: string;
    desc: string;
  }[];
  expectedOutcome: string;
}

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 0,
    number: "01",
    title: "Strategic Alliance & Territory Setup",
    subtitle: "Locking in your exclusive local coverage area",
    timeline: "Weeks 1 – 2",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "from-sky-500 to-blue-600",
    badge: "Onboarding & Alignment",
    description: "We initiate the partnership with a comprehensive audit of your local cable and fiber network. You secure exclusive territory rights while our engineering team aligns our systems with your physical infrastructure.",
    keyMilestones: [
      "Dedicated Partner Account Manager assigned",
      "Exclusive 2km targeting radius locked & geo-mapped",
      "Existing fiber OLT & network health diagnostic"
    ],
    deliverables: [
      { title: "Territory Exclusivity Agreement", desc: "Legal guarantee that YO WiFi markets exclusively for your LCO node in this zone." },
      { title: "Custom LCO Profile Portal", desc: "Access to the live lead-tracking dashboard and subscriber management tools." }
    ],
    expectedOutcome: "Full alignment of network boundaries and ready-to-launch operational framework."
  },
  {
    id: 1,
    number: "02",
    title: "Hardware Pilot & SOC Setup",
    subtitle: "Deploying next-gen Wi-Fi 6 vessels",
    timeline: "Weeks 3 – 4",
    icon: <Cpu className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-600",
    badge: "Hardware & Diagnostics",
    description: "We dispatch your initial pilot batch of ultra-modern 1200Mbps dual-band Wi-Fi 6 vessels. Our team sets up custom network routing and connects every device to our 24/7 Remote Diagnostic SOC.",
    keyMilestones: [
      "Delivery of 1200Mbps Dual-Band Wi-Fi 6 hardware sample kit",
      "Custom 'Powered by YO WiFi' network portal asset creation",
      "Integration with 24/7 Remote Network Monitoring SOC"
    ],
    deliverables: [
      { title: "Pre-Configured Router Vessels", desc: "Plug-and-play dual-band hardware ready for immediate subscriber deployment." },
      { title: "Partner Marketing Collateral", desc: "Digital and physical flyers, technician uniforms badges, and door-hangers." }
    ],
    expectedOutcome: "Zero-churn hardware infrastructure tested and ready for mass residential rollout."
  },
  {
    id: 2,
    number: "03",
    title: "Hyper-Local Ad Engine Activation",
    subtitle: "Automating resident lead generation",
    timeline: "Month 2",
    icon: <Megaphone className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600",
    badge: "Lead Gen Auto-Pilot",
    description: "Our digital marketing engines go live. We launch geo-fenced ad campaigns across Google, Instagram, Facebook, and local search, routing high-intent residential inquiries directly to your booking desk.",
    keyMilestones: [
      "Geo-fenced Google & Meta ad campaigns go live",
      "Automated WhatsApp & SMS lead notification routing",
      "Local SEO dominance for 'Best High Speed WiFi near me'"
    ],
    deliverables: [
      { title: "100% Fully Funded Ad Spend", desc: "We deploy our brand capital into targeted digital ads within your exact footprint." },
      { title: "Real-Time Lead CRM", desc: "Instant notifications when residents request new fiber connections or upgrades." }
    ],
    expectedOutcome: "Steady daily stream of ready-to-convert resident leads flowing directly to your LCO desk."
  },
  {
    id: 3,
    number: "04",
    title: "Subscriber Scaling & Churn Elimination",
    subtitle: "Upgrading legacy connections at rapid speed",
    timeline: "Months 3 – 5",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-sky-500 to-teal-500",
    badge: "Rapid Scale",
    description: "With leads pouring in and dual-band vessels in stock, we systematically replace legacy single-band routers across your existing customer base while capturing competitor market share.",
    keyMilestones: [
      "Systematic upgrade of legacy 2.4GHz single-band subscribers",
      "40% average reduction in customer support call volume",
      "Achievement of +40% subscriber acquisition velocity"
    ],
    deliverables: [
      { title: "Automated Renewal Reminders", desc: "Smart SMS and WhatsApp workflows keeping subscriber retention above 98%." },
      { title: "Proactive Outage Alerting", desc: "24/7 SOC detects and resolves wireless channel interference before users complain." }
    ],
    expectedOutcome: "Dramatically higher average revenue per user (ARPU) and elimination of router-caused churn."
  },
  {
    id: 4,
    number: "05",
    title: "Total Network Domination",
    subtitle: "Undisputed #1 broadband authority in your locality",
    timeline: "Month 6+",
    icon: <Award className="w-6 h-6" />,
    color: "from-amber-500 to-orange-600",
    badge: "Market Leadership",
    description: "You reach regional broadband supremacy. By combining your flawless physical fiber network with our automated engines, your LCO achieves long-term enterprise valuation and sustained +142% growth.",
    keyMilestones: [
      "Undisputed #1 market share within exclusive territory",
      "Multi-gigabit infrastructure readiness & expansion planning",
      "Annual partner profit-share and growth bonuses unlocked"
    ],
    deliverables: [
      { title: "Quarterly Executive Business Reviews", desc: "Data-driven insights to expand into neighboring unserved fiber territories." },
      { title: "VIP Hardware Priority Allocation", desc: "First access to next-generation Wi-Fi 7 and smart home gateway vessels." }
    ],
    expectedOutcome: "Sustained +142% average LCO revenue growth and unshakeable local brand authority."
  }
];

export function PartnerRoadmap({ onOpenConsultation }: PartnerRoadmapProps) {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const activePhase = ROADMAP_PHASES[activePhaseIdx];

  return (
    <section id="roadmap" className="py-32 md:py-48 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Badge className="mb-6 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1.5 px-5 text-xs uppercase tracking-widest font-mono">
            <Compass className="w-3.5 h-3.5 mr-1.5 inline" /> Onboarding & Expansion
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8">
            The Partner <span className="text-sky-500 italic">Roadmap</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto">
            From initial alignment to undisputed market leadership. Here is how we combine your physical fiber network with our automated engines to dominate local sales.
          </p>
        </div>

        {/* Visual Onboarding Progress Indicator */}
        <div className="max-w-5xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-sky-500/30 shadow-[0_0_40px_rgba(14,165,233,0.15)] backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-500/20 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-green-400">Step 1 Complete</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-300 border border-green-500/40">
                    20% Overall Progress
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                  Your Onboarding Momentum: Initial Sign-Up & Audit Verified
                </h3>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <Button 
                onClick={onOpenConsultation}
                size="sm"
                className="bg-sky-500 hover:bg-sky-400 text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest shadow-md"
              >
                Continue Stage 2
              </Button>
            </div>
          </div>

          {/* Progress Bar & Steps Grid */}
          <div className="pt-6 relative z-10">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-3">
              <span>Current Status: <strong className="text-white">Territory Exclusivity Under Review</strong></span>
              <span>Next Milestone: <strong className="text-sky-400">Hardware Pilot Dispatch</strong></span>
            </div>
            
            {/* Visual Bar */}
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/10 mb-6">
              <div className="h-full bg-gradient-to-r from-green-500 via-sky-500 to-indigo-500 rounded-full w-1/5 shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-pulse" />
            </div>

            {/* Step badges */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-left font-mono">
              {[
                { step: "01", label: "Initial Sign-Up", status: "COMPLETED", color: "bg-green-500/10 border-green-500/30 text-green-400", badgeColor: "bg-green-500 text-slate-950" },
                { step: "02", label: "Territory Setup", status: "IN PROGRESS", color: "bg-sky-500/10 border-sky-500/40 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.15)]", badgeColor: "bg-sky-500 text-white animate-pulse" },
                { step: "03", label: "Hardware Pilot", status: "UPCOMING", color: "bg-slate-950/60 border-white/5 text-slate-500", badgeColor: "bg-white/10 text-slate-400" },
                { step: "04", label: "Ad Engine Live", status: "UPCOMING", color: "bg-slate-950/60 border-white/5 text-slate-500", badgeColor: "bg-white/10 text-slate-400" },
                { step: "05", label: "Regional Scale", status: "UPCOMING", color: "bg-slate-950/60 border-white/5 text-slate-500", badgeColor: "bg-white/10 text-slate-400" },
              ].map((item, idx) => (
                <div key={idx} className={`p-3 rounded-2xl border flex flex-col justify-between transition-all ${item.color}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold tracking-wider">{item.step}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold tracking-tight ${item.badgeColor}`}>
                      {item.status}
                    </span>
                  </div>
                  <span className="text-xs font-sans font-bold text-slate-200 line-clamp-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Navigation Bar */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 md:gap-4 relative">
            {/* Connecting line for desktop */}
            <div className="hidden sm:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-amber-500/20 -translate-y-1/2 z-0" />

            {ROADMAP_PHASES.map((phase, idx) => {
              const isSelected = idx === activePhaseIdx;
              const isPassed = idx < activePhaseIdx;

              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIdx(idx)}
                  className={`group relative z-10 text-left p-4 sm:p-5 rounded-3xl transition-all duration-300 border flex flex-col justify-between min-h-[130px] sm:min-h-[150px] ${
                    isSelected
                      ? 'bg-slate-900/90 border-sky-500/60 shadow-[0_0_30px_rgba(14,165,233,0.2)] scale-[1.02]'
                      : isPassed
                      ? 'bg-slate-900/40 border-white/10 text-slate-300 hover:bg-slate-900/60'
                      : 'bg-slate-950/40 border-white/5 text-slate-500 hover:border-white/15 hover:bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      isSelected 
                        ? 'bg-sky-500/20 border-sky-500/40 text-sky-300' 
                        : isPassed
                        ? 'bg-white/10 border-white/10 text-slate-300'
                        : 'bg-white/5 border-white/5 text-slate-500'
                    }`}>
                      Phase {phase.number}
                    </span>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isSelected 
                        ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg' 
                        : isPassed
                        ? 'bg-white/10 text-sky-400'
                        : 'bg-white/5 text-slate-500'
                    }`}>
                      {phase.icon}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-sm sm:text-base font-bold tracking-tight leading-snug line-clamp-2 ${
                      isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {phase.title}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 mt-1.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {phase.timeline}
                    </p>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeRoadmapTab"
                      className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-t-full shadow-[0_0_10px_rgba(14,165,233,1)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Phase Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-slate-900/80 border border-white/10 rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            {/* Top Badge & Timeline */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${activePhase.color} flex items-center justify-center text-white shadow-lg`}>
                  {activePhase.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                      Phase {activePhase.number} • {activePhase.timeline}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/10 text-slate-300 border border-white/10">
                      {activePhase.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
                    {activePhase.title}
                  </h3>
                </div>
              </div>

              {/* Next/Prev quick step navigators */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePhaseIdx((prev) => Math.max(0, prev - 1))}
                  disabled={activePhaseIdx === 0}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActivePhaseIdx((prev) => Math.min(ROADMAP_PHASES.length - 1, prev + 1))}
                  disabled={activePhaseIdx === ROADMAP_PHASES.length - 1}
                  className="px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-500/40 text-xs font-bold text-sky-300 hover:bg-sky-500/30 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  Next Phase
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Description & Expected Outcome */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Phase Overview
                  </h4>
                  <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
                    {activePhase.description}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-transparent p-6 sm:p-8 rounded-3xl border border-sky-500/20 relative">
                  <div className="flex items-center gap-2.5 text-sky-400 font-bold text-sm uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" /> Expected Phase Outcome
                  </div>
                  <p className="text-base sm:text-lg text-white font-medium leading-snug">
                    "{activePhase.expectedOutcome}"
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={onOpenConsultation}
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-full px-10 py-7 text-sm font-bold uppercase tracking-widest shadow-xl shadow-sky-500/20 flex items-center justify-center gap-3 transition-all hover:scale-105"
                  >
                    <span>Start Your Onboarding Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Right Column: Key Milestones & Deliverables */}
              <div className="lg:col-span-6 space-y-8">
                {/* Milestones */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" /> Key Execution Milestones
                  </h4>
                  <div className="space-y-3">
                    {activePhase.keyMilestones.map((milestone, mIdx) => (
                      <div 
                        key={mIdx} 
                        className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        </div>
                        <span className="text-sm sm:text-base text-slate-200 font-medium">
                          {milestone}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" /> Tangible Ecosystem Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activePhase.deliverables.map((deliv, dIdx) => (
                      <div 
                        key={dIdx} 
                        className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col justify-between"
                      >
                        <h5 className="font-bold text-sm text-sky-400 mb-2 flex items-center gap-1.5">
                          <Users className="w-4 h-4 shrink-0 text-indigo-400" />
                          <span>{deliv.title}</span>
                        </h5>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">
                          {deliv.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/60 border border-white/10 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <span>Ready to accelerate your LCO network? All 5 phases are guided by our dedicated partner success team.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
