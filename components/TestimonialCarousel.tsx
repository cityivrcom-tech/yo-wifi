import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle2, TrendingUp, Building2, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar Verma",
    role: "Managing Director",
    company: "Southern Fiber & Cable Networks",
    location: "Chennai, Tamil Nadu",
    growth: "+48% Subscriber Lift",
    subscribers: "8,500 Active Users",
    quote: "Running an LCO used to mean fighting customer churn every single month. Since partnering with YO WiFi, their targeted digital ad campaigns on social media brought us 2,800 new fiber subscribers in just 6 months. We finally have time to upgrade our physical optic lines while they handle 100% of our sales.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 2,
    name: "Sandeep Menon",
    role: "Founder & Chief Engineer",
    company: "Malabar Grid Cable Systems",
    location: "Kochi, Kerala",
    growth: "+62% Net Revenue",
    subscribers: "12,200 Active Users",
    quote: "The dual-band hardware support is a game changer. Our subscribers were complaining about Wi-Fi range with older single-band routers. YO WiFi equipped our network with 1200Mbps dual-band vessels and 24/7 remote diagnostics. Customer complaints dropped by 80% and our ARPU jumped by ₹90 per user!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 3,
    name: "Anandita Reddy",
    role: "Operations Head",
    company: "Deccan Digital Connect",
    location: "Hyderabad, Telangana",
    growth: "+35% Growth in 90 Days",
    subscribers: "6,400 Active Users",
    quote: "What impressed me most is the respect for our local brand. They didn't erase our identity; instead, they provided 'Powered by YO WiFi' certification and high-end marketing banners that made us look like a national telecom giant. We crushed our local competitors this quarter.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 4,
    name: "Vikram Raju",
    role: "Proprietor",
    company: "Andhra Fast-Net Cable LCO",
    location: "Visakhapatnam, Andhra Pradesh",
    growth: "+55% Premium Tier Upsell",
    subscribers: "4,900 Active Users",
    quote: "Their automated lead generation funnel feeds residents looking for high-speed Wi-Fi straight into our WhatsApp and desk CRM. We don't spend a single rupee on wasted flyers anymore. Every lead is geo-fenced to our exact 3km cabling radius.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 5,
    name: "Amitabh Pillai",
    role: "Network Director",
    company: "Karnataka Broadlink Cable",
    location: "Bangalore, Karnataka",
    growth: "+140% Annual Profit Lift",
    subscribers: "15,000 Active Users",
    quote: "YO WiFi is true to their word: an ecosystem builder. Their 24/7 technical command center handles router reboots and firmware updates automatically without bothering our field technicians. Best business decision we made in 15 years of cable operations.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    rating: 5
  }
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeIn" }
    })
  };

  return (
    <section 
      className="py-32 bg-slate-950 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="mb-6 bg-green-500/10 text-green-400 border-green-500/20 py-1 px-4 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 inline" /> Verified LCO Success Stories
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Voices of <span className="text-sky-500 italic">Elite Partners</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            Discover how local cable operators across India transformed their subscriber acquisition and network reliability with the YO WiFi ecosystem.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass bg-slate-900/70 border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-[0_0_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-green-400" />
              
              <Quote className="w-16 h-16 text-white/5 absolute top-8 right-8 pointer-events-none" />

              <div className="grid md:grid-cols-12 gap-8 items-center">
                {/* Partner Info Column */}
                <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
                  <div className="relative">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-sky-500/40 shadow-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                      <CheckCircle2 className="w-3 h-3" /> Partner
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">{current.name}</h3>
                    <p className="text-xs text-sky-400 font-semibold">{current.role}</p>
                    <p className="text-sm text-slate-300 font-medium mt-1 flex items-center justify-center md:justify-start gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" /> {current.company}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center justify-center md:justify-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {current.location}
                    </p>
                  </div>

                  {/* Growth stats badge */}
                  <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 space-y-1 mt-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">Growth Lift:</span>
                      <span className="text-green-400 font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 inline" /> {current.growth}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">Network Scale:</span>
                      <span className="text-sky-300 font-bold">{current.subscribers}</span>
                    </div>
                  </div>
                </div>

                {/* Quote Column */}
                <div className="md:col-span-7 space-y-6">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-slate-400 font-mono ml-2">5.0 / 5.0 LCO Satisfaction</span>
                  </div>

                  <p className="text-lg md:text-2xl text-slate-200 font-light leading-relaxed italic">
                    "{current.quote}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-slate-500 font-mono">
                    <span>Partner Since 2024</span>
                    <span className="text-sky-400">Powered by YO WiFi Ecosystem</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Nav Controls */}
          <div className="flex items-center justify-between mt-10 px-4">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx 
                      ? "w-10 bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]" 
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              <span className="text-xs text-slate-500 font-mono ml-3">
                0{currentIndex + 1} of 0{TESTIMONIALS.length} Partners
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500 hover:bg-sky-500/10 transition-all shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500 hover:bg-sky-500/10 transition-all shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
