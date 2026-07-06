import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Activity, Zap, ShieldCheck, TrendingUp, Megaphone, Cpu, Users, Layers, Sparkles, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollDownArrow } from '@/components/ScrollDownArrow';

interface HeroCarouselProps {
  onOpenConsultation: () => void;
}

const SLIDES = [
  {
    id: 0,
    badge: "Powered by YO WiFi Ecosystem",
    badgeIcon: <Activity className="w-4 h-4 text-sky-400" />,
    titlePrimary: "The Future of",
    titleHighlight: "LCO Growth",
    titleSuffix: "is Here.",
    suffixColor: "text-slate-400",
    description: "We build the ecosystem that empowers Local Cable Operators. You master the physical fiber network, we master the local sales and marketing.",
    image: "/src/assets/images/lco_growth_hero_banner_1783164681558.jpg",
    ctaText: "Join YO WiFi Ecosystem",
    stats: [
      { label: "YO WiFi Monitoring", value: "Active 24/7", icon: <Activity className="w-5 h-5 text-sky-400" /> },
      { label: "Enterprise Trust", value: "Verified LCOs", icon: <ShieldCheck className="w-5 h-5 text-green-400" /> },
      { label: "Avg LCO Growth", value: "+142%", icon: <TrendingUp className="w-5 h-5 text-indigo-400" /> },
    ]
  },
  {
    id: 1,
    badge: "YO WiFi Hyper-Local Ad Engine",
    badgeIcon: <Megaphone className="w-4 h-4 text-indigo-400" />,
    titlePrimary: "",
    titleHighlight: "Hyper-Local Ads",
    titleSuffix: "Hyper-Local Growth.",
    suffixColor: "text-white",
    description: "Stop relying solely on word of mouth. Our geo-fenced YO WiFi digital ad campaigns on Google & social media deliver ready-to-convert resident leads straight to your local LCO desk.",
    image: "/src/assets/images/yo_wifi_hyperlocal_ads_1783164698206.jpg",
    ctaText: "Launch YO WiFi Ads",
    stats: [
      { label: "Acquisition Lift", value: "+40% Avg", icon: <TrendingUp className="w-5 h-5 text-indigo-400" /> },
      { label: "Ad Spend Efficiency", value: "100% ROI", icon: <Sparkles className="w-5 h-5 text-yellow-400" /> },
      { label: "YO WiFi Campaigns", value: "100+ Live", icon: <Users className="w-5 h-5 text-green-400" /> },
    ]
  },
  {
    id: 2,
    badge: "Next-Gen YO WiFi Hardware",
    badgeIcon: <Cpu className="w-4 h-4 text-purple-400" />,
    titlePrimary: "Advanced,",
    titleHighlight: "Dual Band",
    titleSuffix: "Wifi Router.",
    suffixColor: "text-slate-400",
    description: "Eliminate customer churn caused by old single-band routers. Deploy ultra-modern 1200Mbps dual-band vessels with 24/7 remote diagnostics.",
    image: "/src/assets/images/yo_wifi_modern_router_1783164711823.jpg",
    ctaText: "Explore Modern Routers",
    stats: [
      { label: "Wireless Speed", value: "1200 Mbps", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
      { label: "Dual Frequencies", value: "2.4 & 5 GHz", icon: <Activity className="w-5 h-5 text-sky-400" /> },
      { label: "Remote Support", value: "24/7 SOC", icon: <ShieldCheck className="w-5 h-5 text-green-400" /> },
    ]
  }
];

export function HeroCarousel({ onOpenConsultation }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[currentSlide];

  return (
    <section 
      className="relative min-h-[90vh] md:min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-600/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            {/* Left Column: Text & CTA */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-[0.2em]">
                {slide.badgeIcon}
                {slide.badge}
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] text-balance">
                {slide.titlePrimary ? <>{slide.titlePrimary}{" "}</> : null}
                <span className="text-sky-500 glow-text block sm:inline">{slide.titleHighlight}</span>{" "}
                <span className={slide.suffixColor || "text-slate-400"}>{slide.titleSuffix}</span>
              </h1>

              <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2">
                <Button 
                  size="lg" 
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white rounded-full px-10 py-7 text-base md:text-lg font-bold group shadow-2xl shadow-sky-600/40 transition-all hover:scale-105"
                >
                  {slide.ctaText}
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
                <div className="flex items-center gap-3 text-slate-400 font-mono text-xs md:text-sm bg-white/5 border border-white/10 px-5 py-3 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                  <span>Network Live: 45+ Cities</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase & Stats */}
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                {/* Glow border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000" />
                
                <div className="relative glass rounded-[2rem] p-3 md:p-4 overflow-hidden border border-white/10 shadow-2xl">
                  <div className="relative overflow-hidden rounded-[1.5rem] aspect-[16/10] bg-slate-900">
                    <img 
                      src={slide.image} 
                      alt={slide.badge} 
                      className="w-full h-full object-cover opacity-80 scale-105 group-hover:scale-100 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Header Logo overlay for 1st slide */}
                    {slide.id === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
                        <div className="glass px-8 py-6 rounded-3xl border border-sky-500/40 shadow-[0_0_50px_rgba(14,165,233,0.4)] backdrop-blur-md flex flex-col items-center gap-3 bg-slate-950/80 animate-pulse">
                          <div className="flex items-center gap-3">
                            <div className="bg-sky-600 p-3 rounded-2xl shadow-[0_0_25px_rgba(14,165,233,0.8)]">
                              <Wifi className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-3xl md:text-4xl font-bold tracking-tighter font-display text-white">
                              YO <span className="text-sky-500">WiFi</span>
                            </span>
                          </div>
                          <span className="text-xs uppercase tracking-[0.25em] font-mono text-sky-300 font-semibold border-t border-white/10 pt-2 w-full text-center">
                            LCO Ecosystem Command
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Live Slide Number badge */}
                    <div className="absolute top-4 right-4 glass px-4 py-1.5 rounded-full text-xs font-mono font-bold text-sky-400 border border-white/10">
                      0{slide.id + 1} / 0{SLIDES.length}
                    </div>
                  </div>
                </div>

                {/* 3 Tech Stats Grid overlaid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-4">
                  {slide.stats.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className="glass p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-sky-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-white/5 p-2 rounded-xl">{stat.icon}</div>
                      </div>
                      <div>
                        <p className="text-base md:text-lg font-bold text-white font-display">{stat.value}</p>
                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-slate-400 font-semibold truncate">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls & Dots */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 pt-8 border-t border-white/5">
          {/* Indicators */}
          <div className="flex items-center gap-3">
            {SLIDES.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className="group relative py-2 focus:outline-none"
              >
                <div className={`h-2 rounded-full transition-all duration-500 ${
                  currentSlide === idx 
                    ? "w-12 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-[0_0_15px_rgba(14,165,233,0.6)]" 
                    : "w-3 bg-white/20 group-hover:bg-white/40"
                }`} />
              </button>
            ))}
            <span className="text-xs text-slate-500 font-mono ml-2">
              {isPaused ? "⏸ PAUSED" : "▶ AUTO-SLIDING"}
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-sky-500/10 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-sky-500/10 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Down Arrow Animation */}
        <ScrollDownArrow target="#milestones" label="Explore Ecosystem Metrics" className="mt-8" />
      </div>
    </section>
  );
}
