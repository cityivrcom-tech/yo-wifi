import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, User, Key, ShieldCheck, Activity, TrendingUp, Cpu, Megaphone, CheckCircle2, ArrowRight, Sparkles, LogOut, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PartnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEMO_PARTNERS = [
  {
    id: "YW-7782",
    name: "Metro Fiber Chennai",
    owner: "Rajesh Kulkarni",
    city: "Chennai, TN",
    subscribers: 4820,
    monthlyGrowth: "+320",
    arpuLift: "₹1.45L",
    activeAd: "Monsoon 150Mbps Upgrade",
    leadsThisWeek: 88,
    routersInStock: 45,
    status: "Active - Tier 1 Gold Partner"
  },
  {
    id: "YW-4019",
    name: "Deccan Connect",
    owner: "Suresh Rao",
    city: "Hyderabad, TS",
    subscribers: 8450,
    monthlyGrowth: "+610",
    arpuLift: "₹2.80L",
    activeAd: "Hyper-Local Gaming Fiber Ad",
    leadsThisWeek: 142,
    routersInStock: 110,
    status: "Active - Diamond Partner"
  },
  {
    id: "YW-9901",
    name: "RapidNet Bengaluru",
    owner: "Ananya Sharma",
    city: "Bengaluru, KA",
    subscribers: 3100,
    monthlyGrowth: "+240",
    arpuLift: "₹95,000",
    activeAd: "Tech Park Residential Target",
    leadsThisWeek: 64,
    routersInStock: 28,
    status: "Active - Certified LCO Partner"
  }
];

export function PartnerLoginModal({ isOpen, onClose }: PartnerLoginModalProps) {
  const [partnerId, setPartnerId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInPartner, setLoggedInPartner] = useState<typeof DEMO_PARTNERS[0] | null>(null);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Check if matches demo or allow custom login
      const found = DEMO_PARTNERS.find(p => 
        p.id.toLowerCase() === partnerId.trim().toLowerCase() ||
        p.name.toLowerCase().includes(partnerId.trim().toLowerCase())
      );

      if (found) {
        setLoggedInPartner(found);
      } else if (partnerId.trim().length >= 3) {
        // Custom simulated login
        setLoggedInPartner({
          id: partnerId.toUpperCase().startsWith("YW-") ? partnerId.toUpperCase() : `YW-${Math.floor(1000 + Math.random() * 9000)}`,
          name: `${partnerId} Cable Network`,
          owner: "Authorized Partner",
          city: "Pan India Network",
          subscribers: 1850,
          monthlyGrowth: "+145",
          arpuLift: "₹65,000",
          activeAd: "YO WiFi Standard Neighborhood Ad",
          leadsThisWeek: 34,
          routersInStock: 15,
          status: "Active Partner Portal Access"
        });
      } else {
        setLoginError('Please enter a valid Partner ID (e.g., YW-7782) or pick a demo account.');
      }
    }, 800);
  };

  const handleSelectDemo = (demo: typeof DEMO_PARTNERS[0]) => {
    setPartnerId(demo.id);
    setPassword('••••••••••••');
    setLoginError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoggedInPartner(demo);
    }, 600);
  };

  const handleSignOut = () => {
    setLoggedInPartner(null);
    setPartnerId('');
    setPassword('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden my-8 max-h-[90vh] flex flex-col justify-between"
        >
          {/* Ambient light glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  YO WiFi Partner Portal
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    Secure LCO Gateway
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Manage subscribers, hardware telemetry & ad campaigns</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto pr-1">
            {loggedInPartner ? (
              /* LOGGED IN DASHBOARD SNAPSHOT */
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Welcome Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-900/40 via-indigo-900/30 to-slate-900/80 border border-sky-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                      <span className="text-xs font-mono text-green-400 font-bold uppercase tracking-wider">{loggedInPartner.status}</span>
                    </div>
                    <h4 className="text-2xl font-bold text-white">{loggedInPartner.name}</h4>
                    <p className="text-xs text-slate-300">Partner ID: <span className="font-mono text-sky-400 font-bold">{loggedInPartner.id}</span> • Location: {loggedInPartner.city} • Owner: {loggedInPartner.owner}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1.5" />
                    Switch Account
                  </Button>
                </div>

                {/* Live Telemetry KPIs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider">Subscribers</span>
                      <Activity className="w-4 h-4 text-sky-400" />
                    </div>
                    <p className="text-xl font-bold text-white font-mono">{loggedInPartner.subscribers.toLocaleString()}</p>
                    <p className="text-xs text-green-400 font-medium flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" /> {loggedInPartner.monthlyGrowth} this month
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider">ARPU Lift</span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-xl font-bold text-white font-mono">{loggedInPartner.arpuLift}</p>
                    <p className="text-xs text-slate-400 mt-1">Monthly Revenue Lift</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider">Ad Leads</span>
                      <Megaphone className="w-4 h-4 text-indigo-400" />
                    </div>
                    <p className="text-xl font-bold text-white font-mono">{loggedInPartner.leadsThisWeek}</p>
                    <p className="text-xs text-sky-400 mt-1">Ready for installation</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider">Wi-Fi 6 Routers</span>
                      <Cpu className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-xl font-bold text-white font-mono">{loggedInPartner.routersInStock}</p>
                    <p className="text-xs text-purple-300 mt-1">In local depot</p>
                  </div>
                </div>

                {/* Active Ad Funnel Notice */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Live Campaign: {loggedInPartner.activeAd}</h5>
                      <p className="text-xs text-slate-400">Geo-fenced ad actively broadcasting within 2.0km of your hub.</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    Active Broadcast
                  </span>
                </div>

                {/* Simulated Portal actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Button 
                    onClick={onClose}
                    className="w-full sm:flex-1 bg-sky-600 hover:bg-sky-500 text-white rounded-xl py-6 font-bold shadow-lg shadow-sky-600/20"
                  >
                    Continue to Full Command Center
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      alert(`Simulated SMS diagnostic sent to ${loggedInPartner.name} NOC technicians.`);
                    }}
                    className="w-full sm:w-auto border-white/10 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl py-6"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Run Line Diagnostics
                  </Button>
                </div>
              </motion.div>
            ) : (
              /* LOGIN FORM & DEMO PICKER */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* 1-Click Demo Accounts */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Instant Demo Login (Click to Test Partner Portal)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {DEMO_PARTNERS.map((demo) => (
                      <button
                        key={demo.id}
                        type="button"
                        onClick={() => handleSelectDemo(demo)}
                        className="p-3 rounded-xl bg-slate-900/80 border border-white/5 hover:border-sky-500/50 hover:bg-sky-500/10 text-left transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors truncate">{demo.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{demo.id} • {demo.city}</p>
                        </div>
                        <div className="mt-2 text-[10px] font-semibold text-green-400 flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {demo.subscribers} Subs
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-white/10 w-full" />
                  <span className="bg-slate-900 px-3 text-[11px] text-slate-400 uppercase font-mono tracking-widest absolute">Or Manual Credential Access</span>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Partner ID / LCO Code / Registered Phone
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={partnerId}
                        onChange={(e) => setPartnerId(e.target.value)}
                        placeholder="e.g. YW-7782 or 9876543210"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Secure Password / OTP
                      </label>
                      <button type="button" className="text-xs text-sky-400 hover:underline">Forgot OTP?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors font-mono"
                        required
                      />
                    </div>
                  </div>

                  {loginError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                      {loginError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl py-6 text-base font-bold shadow-lg shadow-sky-600/30 transition-all mt-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying Partner Credentials...
                      </div>
                    ) : (
                      <>
                        Authenticate LCO Access
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="flex items-center justify-center gap-6 pt-3 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1 text-green-400" /> 256-Bit SSL Encrypted</span>
                  <span className="flex items-center"><Key className="w-3.5 h-3.5 mr-1 text-sky-400" /> 2-Factor Auth Ready</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
            <span>YO WiFi Ecosystem • Partner SOC Helpline: 1800-YO-WIFI</span>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
