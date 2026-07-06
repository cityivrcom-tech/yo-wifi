import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Activity, Zap, ShieldCheck, Users, Radio, Globe, ArrowRight, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CoverageMapProps {
  onOpenConsultation: () => void;
}

const CITY_HUBS = [
  { id: 'bengaluru', name: 'Bengaluru Hub', state: 'Karnataka', x: 36, y: 65, lcos: 12, vessels: '48,100+', latency: '12ms', status: 'Optimal' },
  { id: 'chennai', name: 'Chennai Hub', state: 'Tamil Nadu', x: 58, y: 72, lcos: 10, vessels: '39,200+', latency: '13ms', status: 'Optimal' },
  { id: 'hyderabad', name: 'Hyderabad Hub', state: 'Telangana', x: 44, y: 40, lcos: 9, vessels: '34,800+', latency: '13ms', status: 'Optimal' },
  { id: 'kochi', name: 'Kochi Hub', state: 'Kerala', x: 28, y: 82, lcos: 11, vessels: '42,500+', latency: '11ms', status: 'Optimal' },
  { id: 'coimbatore', name: 'Coimbatore Hub', state: 'Tamil Nadu', x: 40, y: 78, lcos: 14, vessels: '56,200+', latency: '14ms', status: 'High Growth' },
  { id: 'thiruvananthapuram', name: 'Trivandrum Hub', state: 'Kerala', x: 34, y: 88, lcos: 8, vessels: '28,400+', latency: '12ms', status: 'High Growth' },
  { id: 'visakhapatnam', name: 'Visakhapatnam Hub', state: 'Andhra Pradesh', x: 74, y: 38, lcos: 8, vessels: '31,000+', latency: '15ms', status: 'Optimal' },
  { id: 'vijayawada', name: 'Vijayawada Hub', state: 'Andhra Pradesh', x: 62, y: 48, lcos: 10, vessels: '41,000+', latency: '16ms', status: 'Expanding' },
  { id: 'madurai', name: 'Madurai Hub', state: 'Tamil Nadu', x: 48, y: 84, lcos: 5, vessels: '16,500+', latency: '17ms', status: 'Expanding' },
  { id: 'mangaluru', name: 'Mangaluru Hub', state: 'Karnataka', x: 24, y: 70, lcos: 6, vessels: '22,400+', latency: '18ms', status: 'High Growth' },
  { id: 'mysuru', name: 'Mysuru Hub', state: 'Karnataka', x: 32, y: 72, lcos: 5, vessels: '19,800+', latency: '14ms', status: 'Optimal' },
  { id: 'hubli', name: 'Hubli Hub', state: 'Karnataka', x: 26, y: 55, lcos: 4, vessels: '14,200+', latency: '16ms', status: 'Expanding' },
  { id: 'kozhikode', name: 'Kozhikode Hub', state: 'Kerala', x: 26, y: 76, lcos: 7, vessels: '18,500+', latency: '14ms', status: 'Expanding' },
  { id: 'warangal', name: 'Warangal Hub', state: 'Telangana', x: 50, y: 34, lcos: 5, vessels: '12,100+', latency: '15ms', status: 'High Growth' },
  { id: 'tirupati', name: 'Tirupati Hub', state: 'Andhra Pradesh', x: 54, y: 64, lcos: 9, vessels: '32,000+', latency: '13ms', status: 'Optimal' },
  { id: 'guntur', name: 'Guntur Hub', state: 'Andhra Pradesh', x: 58, y: 52, lcos: 6, vessels: '21,400+', latency: '15ms', status: 'Optimal' },
  { id: 'salem', name: 'Salem Hub', state: 'Tamil Nadu', x: 46, y: 76, lcos: 8, vessels: '29,000+', latency: '14ms', status: 'Expanding' },
  { id: 'tiruchirappalli', name: 'Trichy Hub', state: 'Tamil Nadu', x: 52, y: 78, lcos: 6, vessels: '19,000+', latency: '13ms', status: 'Optimal' },
];

const LIVE_LOGS = [
  "04:08:22 UTC - Chennai Hub: 140 dual-band vessels auto-updated to FW v4.2",
  "04:07:50 UTC - Kochi Hub: +12 new LCO partner nodes onboarded today",
  "04:07:15 UTC - Visakhapatnam Hub: Network load balanced • 0% packet loss",
  "04:06:40 UTC - Bengaluru Hub: 3,400 resident ad leads delivered to local LCOs",
  "04:05:55 UTC - Hyderabad Hub: Fiber ring latency verified at 13ms avg",
];

export function CoverageMap({ onOpenConsultation }: CoverageMapProps) {
  const [selectedHub, setSelectedHub] = useState(CITY_HUBS[0]);

  return (
    <section id="coverage-map" className="py-32 bg-slate-900/40 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="mb-6 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1 px-4 text-xs">
            <Globe className="w-3.5 h-3.5 mr-1.5 inline" /> National Network Scale
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Live Coverage & <span className="text-sky-500 italic">Network Reach</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            We are actively growing alongside 100+ LCOs in over 20 cities across India and global hubs. Explore our real-time telemetry and regional fiber nodes below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Left/Main Area: Interactive Stylized Grid Map */}
          <div className="lg:col-span-8 glass bg-slate-950/80 border border-white/10 rounded-[3rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                  Fiber Grid Telemetry • Active Nodes
                </span>
              </div>
              <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full">
                45+ Cities Online
              </span>
            </div>

            {/* Stylized SVG Map Box */}
            <div className="relative w-full aspect-[4/3] bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
              {/* Grid Lines Background */}
              <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />
              
              {/* Radar sweep effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)] pointer-events-none animate-pulse" />

              {/* Connecting Fiber Lines between major South Indian hubs */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 stroke-sky-400/50" strokeWidth="1.5" strokeDasharray="4 4">
                <line x1="36%" y1="65%" x2="58%" y2="72%" /> {/* Bengaluru to Chennai */}
                <line x1="36%" y1="65%" x2="44%" y2="40%" /> {/* Bengaluru to Hyderabad */}
                <line x1="44%" y1="40%" x2="74%" y2="38%" /> {/* Hyderabad to Visakhapatnam */}
                <line x1="36%" y1="65%" x2="28%" y2="82%" /> {/* Bengaluru to Kochi */}
                <line x1="58%" y1="72%" x2="48%" y2="84%" /> {/* Chennai to Madurai */}
                <line x1="28%" y1="82%" x2="34%" y2="88%" /> {/* Kochi to Trivandrum */}
                <line x1="44%" y1="40%" x2="62%" y2="48%" /> {/* Hyderabad to Vijayawada */}
              </svg>

              {/* Interactive City Hub Buttons */}
              {CITY_HUBS.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub)}
                    onMouseEnter={() => setSelectedHub(hub)}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none transition-all duration-300 ${
                      isSelected ? "scale-125 z-30" : "hover:scale-110"
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Ping ring */}
                      {isSelected && (
                        <span className="absolute -inset-2 rounded-full bg-sky-400/40 animate-ping" />
                      )}
                      <div className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected 
                          ? "bg-sky-400 border-white shadow-[0_0_15px_rgba(14,165,233,1)]" 
                          : "bg-slate-900 border-sky-400/80 group-hover:bg-sky-500"
                      }`} />
                    </div>

                    {/* Tooltip Name */}
                    <span className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] md:text-xs font-mono font-bold px-2 py-0.5 rounded shadow-lg transition-all ${
                      isSelected
                        ? "bg-sky-500 text-slate-950 scale-105 shadow-sky-500/50"
                        : "bg-slate-900/90 text-slate-300 border border-white/10 opacity-80 group-hover:opacity-100"
                    }`}>
                      {hub.name.replace(' Hub', '')}
                    </span>
                  </button>
                );
              })}

              {/* Watermark label */}
              <div className="absolute bottom-3 right-4 text-right pointer-events-none">
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">National Fiber Hub Grid</p>
                <p className="text-xs font-bold text-slate-500 font-display">REGIONAL COMMAND</p>
              </div>
            </div>

            {/* Live Telemetry Log Ticker */}
            <div className="mt-6 bg-black/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 overflow-hidden text-xs font-mono">
              <span className="text-green-400 font-bold whitespace-nowrap flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> LIVE FEED:
              </span>
              <div className="text-slate-400 truncate animate-fade">
                {LIVE_LOGS[0]}
              </div>
            </div>
          </div>

          {/* Right Column: Selected City Hub Card & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHub.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass bg-slate-900/90 border border-white/15 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white">{selectedHub.name}</h3>
                    <p className="text-xs text-sky-400 font-mono">{selectedHub.state} Region</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-none font-mono text-[10px]">
                    🟢 {selectedHub.status}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="bg-sky-500/10 p-2.5 rounded-xl text-sky-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">Active LCO Partners</p>
                        <p className="text-xl font-bold font-mono text-white">{selectedHub.lcos} LCOs</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-400 font-mono font-bold">+18% YoY</span>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-400">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">Deployed Dual-Band Vessels</p>
                        <p className="text-xl font-bold font-mono text-white">{selectedHub.vessels}</p>
                      </div>
                    </div>
                    <span className="text-xs text-sky-300 font-mono">Wi-Fi 6 Ready</span>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-500/10 p-2.5 rounded-xl text-yellow-400">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">Avg Fiber Latency</p>
                        <p className="text-xl font-bold font-mono text-white">{selectedHub.latency}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">SOC Monitored</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-xs text-slate-400 mb-4">
                    Operating in or near <span className="text-white font-semibold">{selectedHub.name}</span>? Join our regional fiber network alliance.
                  </p>
                  <Button
                    onClick={onOpenConsultation}
                    className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-full py-6 text-sm font-bold shadow-lg shadow-sky-600/30 group"
                  >
                    <span>Check Your Area Coverage</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="glass p-6 rounded-3xl border border-white/5 text-center">
              <p className="text-xs text-slate-400">
                ⚡ Not seeing your city? We deploy new regional LCO pods within <span className="text-sky-400 font-bold">14 business days</span>. Contact us for expansion priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
