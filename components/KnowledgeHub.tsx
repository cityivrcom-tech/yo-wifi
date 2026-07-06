import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Cpu, 
  Megaphone, 
  ShieldCheck, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  FileText, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Wifi, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Lock,
  Terminal,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface KnowledgeItem {
  id: string;
  title: string;
  category: 'hardware' | 'marketing' | 'soc' | 'business';
  summary: string;
  details: {
    specs?: string[];
    architectureStep?: string;
    keyBenefit: string;
    codeSnippet?: string;
  };
  readTime: string;
}

const KNOWLEDGE_ARTICLES: KnowledgeItem[] = [
  {
    id: "wifi6-architecture",
    title: "1200Mbps Dual-Band Wi-Fi 6 Vessel Architecture & RF Beamforming",
    category: "hardware",
    summary: "Deep dive into our customized Customer Premise Equipment (CPE). Learn how OFDMA and MU-MIMO eliminate packet loss in dense residential multi-dwelling units (MDUs).",
    details: {
      specs: [
        "Dual-band 2.4GHz (300Mbps) + 5GHz (867Mbps) simultaneous wireless throughput",
        "1024-QAM high data rate modulation for ultra-low latency 4K streaming & gaming",
        "4x4 High-gain external omnidirectional antennas with intelligent RF beamforming",
        "WPA3-Personal Enterprise-grade encryption standard with automated DFS channel selection"
      ],
      keyBenefit: "Eliminates 84%+ of router-related support tickets and Wi-Fi dead zones in concrete residential buildings.",
      codeSnippet: "IF [5GHz_Signal_Strength > -65dBm] THEN [Route_Client_To_5GHz_Band] ELSE [Maintain_2.4GHz_Legacy]"
    },
    readTime: "5 min read"
  },
  {
    id: "geofenced-ad-engine",
    title: "Hyper-Local Geo-Fenced Google & Meta Lead Generation Protocol",
    category: "marketing",
    summary: "How our automated digital marketing engine maps your exact LCO fiber node boundary and deploys 100% company-funded ad campaigns to local residents.",
    details: {
      specs: [
        "Precision 2km radial polygon mapping aligned with your physical optical fiber drop points",
        "Automated search intent bidding on keywords: 'Best high speed broadband near me' & 'Reliable WiFi'",
        "Real-time webhook routing sending instant WhatsApp & SMS notifications to your installation desk",
        "AI-driven ad creative dynamic localization featuring your neighborhood name and LCO node badge"
      ],
      keyBenefit: "Generates an average of 15 to 30 verified high-intent residential inquiries per day without you spending a single rupee on ad budgets.",
    },
    readTime: "4 min read"
  },
  {
    id: "remote-soc-diagnostics",
    title: "24/7 Remote SOC Telemetry & Proactive Auto-Healing Loop",
    category: "soc",
    summary: "Understand the backend cloud telemetry that monitors every connected router vessel every 60 seconds to detect and resolve optical or RF interference before subscribers notice.",
    details: {
      specs: [
        "Real-time SNMP & TR-069 auto-configuration server (ACS) cloud handshake every 60 seconds",
        "Automated background channel hopping when neighbor router interference exceeds threshold",
        "Optical Line Terminal (OLT) Rx/Tx optical power level alerting & fiber attenuation tracking",
        "One-click remote firmware over-the-air (OTA) security updates during off-peak night hours"
      ],
      keyBenefit: "Reduces annual subscriber churn from an industry average of 22% down to under 1.8%.",
      codeSnippet: "SELECT node_id, rx_power FROM olt_telemetry WHERE rx_power < -27.0 dBm => TRIGGER_ALERT('OPTICAL_DEGRADATION')"
    },
    readTime: "6 min read"
  },
  {
    id: "exclusivity-territory",
    title: "Territory Exclusivity Agreements & Revenue Protection Escrow",
    category: "business",
    summary: "Legal and structural explanation of our 2km Exclusive Territory Protection model and how we guarantee zero internal LCO competition or cannibalization.",
    details: {
      specs: [
        "Strict legal covenant guaranteeing only ONE partner LCO is onboarded per designated 2km zone",
        "All digital leads generated within polygon coordinates are locked exclusively to your partner portal",
        "Transparent monthly recurring revenue (MRR) profit-sharing settlement via automated banking rails",
        "Zero franchise fees or hidden licensing costs—our revenue scales only when your subscriber count grows"
      ],
      keyBenefit: "Transforms your local cable desk into an enterprise-valued broadband monopoly in your neighborhood.",
    },
    readTime: "3 min read"
  },
  {
    id: "fiber-backhaul-optimization",
    title: "GPON / EPON Optical Splitter Optimization & Latency Minimization",
    category: "hardware",
    summary: "Technical guidelines for optimizing your optical distribution network (ODN), managing 1:32 and 1:64 split ratios, and maintaining pristine optical link budgets.",
    details: {
      specs: [
        "Recommended optical link loss budgets: maximum -25dBm at subscriber ONU terminal",
        "Best practices for fusion splicing vs mechanical connectors in tropical and monsoon weather",
        "VLAN tagging hierarchy for isolating IPTV video multicast from high-speed internet data payloads",
        "Surge protection and UPS battery backup specifications for field distribution poles"
      ],
      keyBenefit: "Ensures symmetrical multi-gigabit readiness and zero packet drops during evening peak usage spikes.",
    },
    readTime: "7 min read"
  },
  {
    id: "automated-retention",
    title: "Automated Subscriber Retention & Smart Renewal Reminders",
    category: "marketing",
    summary: "How our automated CRM workflows eliminate late payments and involuntary churn using multi-channel AI payment reminders and instant UPI billing links.",
    details: {
      specs: [
        "Automated WhatsApp message sequence triggered 5 days, 3 days, and 24 hours before plan expiry",
        "One-click zero-friction UPI renewal links embedded directly inside reminder notifications",
        "Smart bandwidth throttling grace period protocol avoiding abrupt disconnection anger",
        "Automated Google Review requests sent immediately after successful high-speed speed test results"
      ],
      keyBenefit: "Increases on-time monthly subscription renewals by 42% and dramatically boosts your local Google review ratings.",
    },
    readTime: "4 min read"
  }
];

const DOWNLOADABLE_RESOURCES = [
  {
    title: "YO WiFi 1200Mbps Vessel Technical Datasheet",
    desc: "Complete hardware specifications, RF antenna radiation patterns, and TR-069 ACS compatibility guide.",
    type: "PDF Manual",
    size: "4.2 MB",
    icon: <Cpu className="w-5 h-5 text-sky-400" />
  },
  {
    title: "LCO Node Onboarding & Territory Audit Checklist",
    desc: "Step-by-step engineering verification sheet for preparing your OLT and distribution grid for onboarding.",
    type: "Engineering Guide",
    size: "2.8 MB",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
  },
  {
    title: "Hyper-Local Digital Ad Engine Conversion Playbook",
    desc: "How our geo-fenced campaigns target high-intent residents and how your desk should close WhatsApp leads.",
    type: "Sales Playbook",
    size: "3.5 MB",
    icon: <Megaphone className="w-5 h-5 text-amber-400" />
  },
  {
    title: "24/7 SOC Telemetry & Troubleshooting Protocol",
    desc: "Reference manual for interpreting optical attenuation alarms and automated channel hopping logs.",
    type: "SOC Whitepaper",
    size: "5.1 MB",
    icon: <Activity className="w-5 h-5 text-purple-400" />
  }
];

export function KnowledgeHub({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>("wifi6-architecture");

  const filteredArticles = KNOWLEDGE_ARTICLES.filter(art => {
    const matchesCat = selectedCategory === "all" || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.details.keyBenefit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="knowledge-hub" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1.5 px-5 text-xs font-mono uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 mr-1.5 inline" /> Technical Knowledge Hub
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Ecosystem <span className="text-sky-400 italic">Intelligence</span> & Docs
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            The authoritative reference repository for regional cable operators. Discover the hardware architecture, telemetry protocols, and automated ad engines powering the YO WiFi network.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search specs, RF beamforming, OLT attenuation, ad campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-full py-4 pl-12 pr-6 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-xl backdrop-blur-md"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs font-mono text-slate-400 hover:text-white px-2 py-1 bg-white/10 rounded-full"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            {[
              { id: "all", label: "All Topics", icon: <Layers className="w-3.5 h-3.5" /> },
              { id: "hardware", label: "Wi-Fi 6 Hardware & RF", icon: <Cpu className="w-3.5 h-3.5 text-sky-400" /> },
              { id: "marketing", label: "Geo-Fenced Ad Engines", icon: <Megaphone className="w-3.5 h-3.5 text-amber-400" /> },
              { id: "soc", label: "24/7 SOC Telemetry", icon: <Activity className="w-3.5 h-3.5 text-purple-400" /> },
              { id: "business", label: "Exclusivity & ROI", icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20 scale-105'
                    : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2 mb-2">
              <span>Showing {filteredArticles.length} Technical Specifications</span>
              <span>Updated July 2026</span>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-white/10">
                <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">No documentation found matching "{searchQuery}"</h4>
                <p className="text-sm text-slate-400 mb-6">Try searching for terms like "Wi-Fi 6", "OLT", "Google Ads", or "Exclusivity".</p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} size="sm" variant="outline" className="border-white/20 text-white">
                  Reset Search Filters
                </Button>
              </div>
            ) : (
              filteredArticles.map((art) => {
                const isExpanded = expandedArticleId === art.id;

                return (
                  <motion.div
                    key={art.id}
                    layout
                    className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'bg-slate-900/90 border-sky-500/50 shadow-[0_0_30px_rgba(14,165,233,0.15)]'
                        : 'bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/60'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedArticleId(isExpanded ? null : art.id)}
                      className="w-full p-6 sm:p-8 text-left flex items-start justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-sky-400">
                            {art.category.toUpperCase()}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{art.readTime}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                          {art.summary}
                        </p>
                      </div>

                      <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform ${isExpanded ? 'bg-sky-500 text-white rotate-180' : 'text-slate-400'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-white/10 px-6 sm:px-8 pb-8 pt-6 space-y-6 bg-slate-950/40"
                        >
                          {/* Specs breakdown */}
                          {art.details.specs && (
                            <div>
                              <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Technical & Architecture Highlights
                              </h4>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {art.details.specs.map((spec, sIdx) => (
                                  <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                                    <span>{spec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Code or Protocol snippet if available */}
                          {art.details.codeSnippet && (
                            <div className="rounded-2xl bg-slate-950 border border-white/10 p-4 font-mono text-xs overflow-x-auto">
                              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 pb-2 border-b border-white/10">
                                <span className="flex items-center gap-1.5 text-sky-400"><Terminal className="w-3.5 h-3.5" /> SOC Telemetry Protocol / Logic Trigger</span>
                                <span>SYSTEM_AUTOMATION</span>
                              </div>
                              <code className="text-emerald-400 block leading-relaxed">{art.details.codeSnippet}</code>
                            </div>
                          )}

                          {/* Key Benefit banner */}
                          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/30 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />
                              <div>
                                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block">Core LCO Advantage</span>
                                <p className="text-xs sm:text-sm text-white font-medium">{art.details.keyBenefit}</p>
                              </div>
                            </div>
                            <Button 
                              onClick={onOpenConsultation}
                              size="sm"
                              className="bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shrink-0 hidden sm:flex items-center gap-1.5 rounded-xl"
                            >
                              <span>Apply Spec</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Right Column: Downloadable Engineering Manuals & Quick Support */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-6">
                <Download className="w-4 h-4" /> Downloadable Manuals & Specs
              </div>

              <div className="space-y-4">
                {DOWNLOADABLE_RESOURCES.map((res, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-sky-500/40 transition-all group flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        {res.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-slate-400 block">{res.type} • {res.size}</span>
                        <h5 className="text-xs font-bold text-slate-200 group-hover:text-sky-400 transition-colors truncate">{res.title}</h5>
                        <p className="text-[11px] text-slate-400 font-light line-clamp-2 mt-1">{res.desc}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        alert(`Downloading ${res.title} (${res.size})...`);
                      }}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-sky-500 hover:text-white flex items-center justify-center shrink-0 transition-colors text-slate-400 self-center"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-[11px] text-slate-400 font-light mb-3">
                  Need customized optical network CAD diagrams for your specific territory?
                </p>
                <Button
                  onClick={onOpenConsultation}
                  variant="outline"
                  className="w-full border-sky-500/30 text-sky-300 hover:bg-sky-500/10 text-xs font-bold rounded-xl"
                >
                  Request Engineering Consultation
                </Button>
              </div>
            </div>

            {/* Quick Live SOC Status Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-slate-900/90 to-slate-950 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live SOC Grid
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">100% ONLINE</span>
              </div>
              <h5 className="text-sm font-bold text-white mb-1">24/7 National Optical Telemetry</h5>
              <p className="text-xs text-slate-300 font-light mb-4">
                All 100+ regional LCO nodes are reporting optimal signal-to-noise ratios (-18dBm to -24dBm average).
              </p>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono bg-slate-950 p-3 rounded-2xl border border-white/5">
                <div>
                  <span className="text-[10px] text-slate-500 block">Avg Latency</span>
                  <strong className="text-emerald-400 font-bold">3.2 ms</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Active Vessels</span>
                  <strong className="text-sky-400 font-bold">482,190+</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
