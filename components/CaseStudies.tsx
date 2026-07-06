import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Users, Zap, ShieldCheck, ArrowRight, Award, CheckCircle2, Building2, MapPin, BarChart3, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CaseStudiesProps {
  onOpenConsultation: () => void;
}

const CASE_STUDIES = [
  {
    id: "deccan",
    partnerName: "Deccan Cable Networks",
    location: "Hyderabad, Telangana",
    regionType: "Metro Tier-1",
    growthMetric: "+150% Growth",
    subscribersMetric: "850+ New Subscribers",
    arpuLift: "₹180 ➔ ₹450 /mo",
    churnReduction: "82% Churn Reduction",
    timeframe: "In just 90 days",
    image: "https://picsum.photos/seed/lco-case-hyderabad/800/500?grayscale",
    headline: "Reclaiming the Metro Market from National ISP Giants",
    challenge: "Losing 40+ subscribers every month to national fiber brands due to outdated single-band Wi-Fi routers and zero digital marketing presence.",
    solution: "Deployed 500+ YO WiFi 1200Mbps Dual-Band Wi-Fi 6 routers and activated 2.0km geo-fenced Instagram and Google search campaigns.",
    results: [
      "Captured 850+ high-paying residential fiber leads within 3 months",
      "Average ARPU more than doubled by offering 150Mbps & 300Mbps tiers",
      "Remote SOC diagnostics reduced field technician visits by 75%"
    ],
    quote: "YO WiFi didn't just give us routers; they gave us a corporate identity and an automated sales funnel that beat the telecom giants in our neighborhood.",
    author: "Suresh Rao, Managing Director"
  },
  {
    id: "metro-chennai",
    partnerName: "Metro Fiber Grid",
    location: "Chennai, Tamil Nadu",
    regionType: "High-Density Societies",
    growthMetric: "+210% Revenue",
    subscribersMetric: "1,200+ Active Users",
    arpuLift: "₹220 ➔ ₹520 /mo",
    churnReduction: "90% Retention Rate",
    timeframe: "Over 6 months",
    image: "https://picsum.photos/seed/lco-case-chennai/800/500?grayscale",
    headline: "Monopolizing 14 Gated High-Rise Towers with Dual-Band Wi-Fi 6",
    challenge: "Gated society RWA committees rejected legacy LCO proposals due to perceived lack of customer support and amateur branding.",
    solution: "Leveraged YO WiFi's enterprise brand authority, custom packaging, and 24/7 dedicated customer care helpline to present a turnkey society solution.",
    results: [
      "Signed exclusive broadband agreements with 14 residential societies",
      "Achieved 1,200+ active connections with zero initial marketing capital",
      "Zero Wi-Fi dead-zone complaints thanks to high-gain dual-band vessels"
    ],
    quote: "When society secretaries saw the YO WiFi app and our enterprise hardware, the conversation changed instantly. We look bigger than a national corporate now.",
    author: "Rajesh Kulkarni, Founder & CEO"
  },
  {
    id: "rapidnet",
    partnerName: "RapidNet Broadband",
    location: "Bengaluru, Karnataka",
    regionType: "Tech Corridor",
    growthMetric: "+340% Ad ROI",
    subscribersMetric: "500+ New Subscribers",
    arpuLift: "₹3.2L/mo Profit Lift",
    churnReduction: "88% Less Dropouts",
    timeframe: "First 60 days",
    image: "https://picsum.photos/seed/lco-case-blr/800/500?grayscale",
    headline: "Automating Installation Bookings via Hyper-Local WhatsApp Funnels",
    challenge: "Stagnant subscriber base reliant entirely on legacy cable TV customers who were fast migrating to OTT streaming platforms.",
    solution: "Integrated YO WiFi hyper-local ads with an automated WhatsApp lead-to-booking chatbot directly synced with field technicians.",
    results: [
      "500+ brand new pure-fiber broadband installations in 60 days",
      "340% return on digital advertising spend across local tech parks",
      "Zero manual phone calls needed to schedule installation surveys"
    ],
    quote: "Our technicians now start their day with 8 to 10 confirmed installation appointments already mapped out on their phones. It feels like magic.",
    author: "Ananya Sharma, Operations Head"
  }
];

const FILTER_TABS = ["All Regions", "Metro Tier-1", "High-Density Societies", "Tech Corridor"];

export function CaseStudies({ onOpenConsultation }: CaseStudiesProps) {
  const [activeTab, setActiveTab] = useState("All Regions");
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const filteredStudies = activeTab === "All Regions" 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.regionType === activeTab);

  return (
    <section id="case-studies" className="py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <Award className="w-4 h-4" />
              Proven LCO Transformations
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white text-balance">
              Real Numbers. <span className="text-sky-400 glow-text">Real Dominance.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              Explore how independent Local Cable Operators used the YO WiFi ecosystem to defeat telecom giants, double their ARPU, and acquire thousands of new subscribers.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/30 scale-105"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, idx) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between glass rounded-3xl border border-white/10 hover:border-sky-500/40 transition-all duration-500 overflow-hidden shadow-2xl bg-slate-900/60"
              >
                {/* Top Banner Metric Highlight */}
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                    <img
                      src={study.image}
                      alt={study.partnerName}
                      className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    {/* Region Badge */}
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-bold text-slate-300 border border-white/10 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      {study.location}
                    </div>

                    {/* Big Growth Overlay Badge */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <div className="bg-gradient-to-r from-sky-600/90 to-indigo-600/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg">
                        <p className="text-[10px] uppercase font-bold text-sky-100 tracking-wider">Growth Lift</p>
                        <p className="text-2xl font-black text-white tracking-tight">{study.growthMetric}</p>
                      </div>
                      <div className="bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-green-500/30 text-right">
                        <p className="text-[10px] uppercase font-bold text-green-400 tracking-wider">Acquired</p>
                        <p className="text-base font-bold text-white font-mono">{study.subscribersMetric}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-sky-400" />
                        <span className="text-sm font-bold text-sky-400 uppercase tracking-wider">{study.partnerName}</span>
                        <span className="text-xs text-slate-500 font-mono">({study.timeframe})</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-sky-300 transition-colors">
                        {study.headline}
                      </h3>
                    </div>

                    {/* Mini KPI Grid */}
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Monthly ARPU</p>
                        <p className="text-base font-bold text-green-400 font-mono mt-0.5">{study.arpuLift}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Customer Loyalty</p>
                        <p className="text-base font-bold text-sky-400 font-mono mt-0.5">{study.churnReduction}</p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      <strong className="text-white font-medium">The Challenge: </strong>
                      {study.challenge}
                    </p>

                    {/* Expandable Results Toggle */}
                    <AnimatePresence>
                      {expandedCase === study.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-white/10 space-y-4 overflow-hidden"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" /> Core Solution & Impact
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed mb-3">{study.solution}</p>
                            <ul className="space-y-2">
                              {study.results.map((res, rIdx) => (
                                <li key={rIdx} className="text-xs text-slate-300 flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                                  <span>{res}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs italic text-slate-200">
                            "{study.quote}"
                            <p className="text-[10px] font-bold text-sky-400 not-italic mt-1.5 font-mono">— {study.author}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 flex items-center justify-between border-t border-white/5 pt-4">
                  <button
                    onClick={() => setExpandedCase(expandedCase === study.id ? null : study.id)}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 uppercase tracking-wider transition-colors"
                  >
                    {expandedCase === study.id ? "Hide Details" : "View Full Case Breakdown"}
                    <ChevronRight className={`w-4 h-4 transition-transform ${expandedCase === study.id ? "rotate-90" : ""}`} />
                  </button>
                  <button
                    onClick={onOpenConsultation}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-sky-500 hover:text-white text-slate-400 transition-all"
                    title="Request Consultation for this Region"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-2xl"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5" /> 45+ Cities Active
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to Write Your LCO Success Story?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-light">
              We analyze your current fiber footprint and provide a customized growth projection showing your expected subscriber and ARPU lift within 90 days.
            </p>
          </div>
          <Button
            size="lg"
            onClick={onOpenConsultation}
            className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-full px-10 py-7 text-base font-bold shadow-xl shadow-sky-500/20 shrink-0 transition-all hover:scale-105"
          >
            Get Your 90-Day Growth Plan
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
