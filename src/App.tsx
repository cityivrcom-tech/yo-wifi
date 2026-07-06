import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  TrendingUp, 
  Megaphone, 
  ShieldCheck, 
  Cpu, 
  Users, 
  ChevronRight, 
  Menu, 
  X,
  CheckCircle2,
  ArrowRight,
  Globe,
  Zap,
  Layers,
  Activity,
  Server,
  Smartphone,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ConsultationModal } from '@/components/ConsultationModal';
import { HeroCarousel } from '@/components/HeroCarousel';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { PartnerLoginModal } from '@/components/PartnerLoginModal';
import { CaseStudies } from '@/components/CaseStudies';
import { PricingComparison } from '@/components/PricingComparison';
import { PartnerMilestones } from '@/components/PartnerMilestones';
import { LiveSupportWidget } from '@/components/LiveSupportWidget';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ScrollDownArrow } from '@/components/ScrollDownArrow';
import { TrustedLcoMarquee } from '@/components/TrustedLcoMarquee';
import { VideoTestimonialShowcase } from '@/components/VideoTestimonialShowcase';
import { LanguageSwitcher, SUPPORTED_LANGUAGES, type RegionalLanguage } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TechnologiesPage } from '@/components/TechnologiesPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'technologies'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [defaultSubscribers, setDefaultSubscribers] = useState(1200);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<RegionalLanguage>(SUPPORTED_LANGUAGES[0]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleOpenConsultation = (subCount = 1200) => {
    setDefaultSubscribers(subCount);
    setIsConsultationOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'light-theme bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-50'} selection:bg-sky-500/30 tech-grid transition-colors duration-500`}>
      {/* Animated Scroll Depth Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(14,165,233,0.9)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      {currentPage !== 'technologies' && (
        <>
          <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between gap-4">
              <div 
                className="flex items-center gap-3 group cursor-pointer shrink-0"
                onClick={() => {
                  if (window.location.hash) {
                    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
                  }
                  window.location.reload();
                }}
              >
                <div className="bg-sky-600 p-2.5 rounded-xl group-hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all duration-300">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tighter font-display">
                  YO <span className="text-sky-500">WiFi</span>
                </span>
              </div>

              {/* Right Controls: Partner with Us and 3-line menu button */}
              <div className="flex items-center gap-3 shrink-0">
                <Button onClick={() => handleOpenConsultation(1200)} className="bg-sky-600 hover:bg-sky-500 text-white rounded-full px-5 md:px-6 py-5 font-bold shadow-lg shadow-sky-600/20 transition-all hover:scale-105 text-xs">
                  Partner with Us
                </Button>

                {/* 3-line Menu Button */}
                <button 
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all flex items-center justify-center shadow-md"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle navigation menu"
                >
                  {isMenuOpen ? <X className="w-6 h-6 text-sky-400" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </nav>

          {/* Regional Announcement Banner */}
          {currentLang.code !== 'en' && (
            <div className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-sky-950/90 via-indigo-950/90 to-sky-950/90 backdrop-blur-md border-b border-sky-500/30 py-2 px-4 text-center text-xs font-medium text-sky-200 flex items-center justify-center gap-2 shadow-lg">
              <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>
                <strong className="text-white">{currentLang.nativeName} ({currentLang.region}) Active:</strong> {currentLang.greeting} — <span className="text-white font-semibold">{currentLang.tagline}</span>
              </span>
            </div>
          )}

          {/* Universal Navigation Menu Dropdown / Slide-Over */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl pt-28 px-6 overflow-y-auto"
              >
                <div className="max-w-2xl mx-auto flex flex-col gap-5 text-center pb-12">
                  {/* Shifted Menu Controls: Language, Theme, and Partner Login */}
                  <div className="p-4 rounded-3xl bg-slate-900/90 border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                      <LanguageSwitcher 
                        currentLang={currentLang} 
                        onLanguageChange={setCurrentLang} 
                      />
                      <ThemeToggle theme={theme} onToggleTheme={setTheme} />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => { setIsMenuOpen(false); setIsLoginOpen(true); }} 
                      className="w-full sm:w-auto border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 hover:text-white rounded-full py-5 px-6 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <Lock className="w-3.5 h-3.5 text-sky-400" />
                      Partner Login
                    </Button>
                  </div>

                  <a href="#ecosystem" onClick={() => setIsMenuOpen(false)} className="text-xl md:text-2xl font-bold text-slate-200 hover:text-sky-400 transition-colors">Ecosystem</a>
                  <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-xl md:text-2xl font-bold text-slate-200 hover:text-sky-400 transition-colors">Services</a>
                  <a href="#hardware" onClick={() => setIsMenuOpen(false)} className="text-xl md:text-2xl font-bold text-slate-200 hover:text-sky-400 transition-colors">Hardware</a>
                  <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-xl md:text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors">Pricing Comparison</a>
                  <a href="#case-studies" onClick={() => setIsMenuOpen(false)} className="text-xl md:text-2xl font-bold text-sky-400 hover:text-sky-300 transition-colors">Case Studies</a>
                  <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-xl md:text-2xl font-bold text-slate-200 hover:text-sky-400 transition-colors">FAQ</a>
                  
                  <div className="pt-6 border-t border-white/10 flex justify-center mt-2">
                    <Button onClick={() => { setIsMenuOpen(false); handleOpenConsultation(1200); }} className="w-full max-w-sm bg-sky-600 text-white rounded-full py-6 px-8 text-lg font-bold shadow-lg shadow-sky-600/30">
                      Partner with Us
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {currentPage === 'technologies' ? (
        <main>
          <TechnologiesPage
            onBackToHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenConsultation={(subs) => handleOpenConsultation(subs || 1200)}
          />
        </main>
      ) : (
        <main>
          {/* Full Page 3 Section Hero Carousel */}
          <HeroCarousel onOpenConsultation={() => handleOpenConsultation(1200)} />

        {/* Trusted by LCOs Logos Marquee */}
        <TrustedLcoMarquee />

        {/* Dynamic Partner Milestones Counter Section */}
        <PartnerMilestones />

        <ScrollDownArrow target="#ecosystem" label="Explore The Ecosystem" />

        {/* Ecosystem Section */}
        <section id="ecosystem" className="py-32 bg-slate-900/50 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Badge className="mb-6 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1 px-4">The YO WiFi Ecosystem</Badge>
                <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  Building the <br />
                  <span className="text-sky-500 italic">Foundation</span> of Scale.
                </h2>
                <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light">
                  We don't just provide tools; we provide a complete ecosystem. From the hardware in the home to the ads on their phones, we bridge the gap between connectivity and commerce.
                </p>

                <div className="grid gap-8">
                  {[
                    { icon: <Layers className="w-6 h-6" />, title: "Integrated Marketing", desc: "Automated lead generation that feeds directly into your sales pipeline." },
                    { icon: <Server className="w-6 h-6" />, title: "Infrastructure Support", desc: "Expert guidance on fiber architecture and network optimization." },
                    { icon: <Smartphone className="w-6 h-6" />, title: "Subscriber App", desc: "A premium white-labeled experience for your end-users." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -30, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                      className="flex gap-6 group"
                    >
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-sky-500/50 transition-colors">
                        <div className="text-sky-500">{item.icon}</div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                        <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-sky-500/20 blur-[100px] rounded-full" />
                <div className="relative glass p-8 rounded-[3rem] border-white/5">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5">
                        <Users className="w-8 h-8 text-sky-400 mb-4" />
                        <h5 className="font-bold text-lg mb-2">LCO Network</h5>
                        <p className="text-xs text-slate-500">Physical infrastructure & local presence.</p>
                      </div>
                      <div className="bg-sky-600 p-8 rounded-3xl shadow-2xl shadow-sky-600/20">
                        <TrendingUp className="w-8 h-8 text-white mb-4" />
                        <h5 className="font-bold text-lg mb-2">Growth Engine</h5>
                        <p className="text-xs text-sky-100">Marketing, ads & lead generation.</p>
                      </div>
                    </div>
                    <div className="space-y-6 pt-12">
                      <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5">
                        <Cpu className="w-8 h-8 text-indigo-400 mb-4" />
                        <h5 className="font-bold text-lg mb-2">Elite Hardware</h5>
                        <p className="text-xs text-slate-500">Dual-band tech & remote support.</p>
                      </div>
                      <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5">
                        <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
                        <h5 className="font-bold text-lg mb-2">Ecosystem Trust</h5>
                        <p className="text-xs text-slate-500">Verified partnership & scale.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <ScrollDownArrow target="#services" label="Explore Services" className="mt-12" />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 md:py-48">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-24"
            >
              <Badge className="mb-6 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 py-1 px-4">Core Capabilities</Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">The Pillars of Mastery</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light">
                Our services are engineered to remove every friction point in your growth journey.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Megaphone className="w-8 h-8" />,
                  title: "Strategic Presence",
                  desc: "Hyper-targeted digital campaigns that turn local residents into loyal subscribers.",
                  features: ["Geo-fencing", "Social Media Mastery", "Local SEO"],
                  color: "from-sky-500 to-sky-600"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Market Domination",
                  desc: "Professional branding and lead generation strategies that position you as the #1 choice.",
                  features: ["Identity Design", "Lead Funnels", "Campaign Strategy"],
                  color: "from-indigo-500 to-indigo-600"
                },
                {
                  icon: <Cpu className="w-8 h-8" />,
                  title: "Technical Edge",
                  desc: "Elite dual-band hardware supported by a 24/7 technical command center.",
                  features: ["Remote Diagnostics", "Auto-Updates", "24/7 Support"],
                  color: "from-slate-700 to-slate-800"
                }
              ].map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: idx * 0.2, ease: "easeOut" }}
                  whileHover={{ y: -15 }}
                  className="h-full"
                >
                  <Card className="h-full bg-slate-900/50 border-white/5 hover:border-sky-500/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden group">
                    <CardHeader className="p-10">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                        <div className="text-white">{service.icon}</div>
                      </div>
                      <CardTitle className="text-3xl font-bold mb-6">{service.title}</CardTitle>
                      <CardDescription className="text-slate-400 text-lg leading-relaxed mb-8">
                        {service.desc}
                      </CardDescription>
                      <div className="flex flex-wrap gap-3">
                        {service.features.map((feature, fIdx) => (
                          <span key={fIdx} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-white/10 px-4 py-1.5 rounded-full group-hover:border-sky-500/30 transition-colors">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="px-10 pb-10">
                      <Button onClick={() => handleOpenConsultation(1200)} variant="link" className="p-0 text-sky-400 font-bold uppercase tracking-widest text-xs group-hover:text-sky-300 transition-colors">
                        Explore Pillar <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <ScrollDownArrow target="#hardware" label="View Elite Hardware" className="mt-16" />
          </div>
        </section>

        {/* Hardware Section */}
        <section id="hardware" className="py-32 md:py-48 bg-slate-900/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-24">
              <div className="md:w-1/2 order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-sky-500/10 rounded-full blur-[120px]" />
                  <div className="relative glass p-12 rounded-[4rem] border-white/5">
                    <img 
                      src="/images/modern_router.jpg" 
                      alt="Elite Router" 
                      className="w-full max-w-md mx-auto drop-shadow-[0_0_50px_rgba(14,165,233,0.3)] rounded-3xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="md:w-1/2 order-1 md:order-2"
              >
                <Badge className="mb-6 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1 px-4">The Hardware Layer</Badge>
                <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-tight">Elite Connectivity <br /><span className="text-sky-500 italic">Vessels</span></h2>
                <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light">
                  Our dual-band hardware is the physical manifestation of our ecosystem. Engineered for the most demanding fiber environments, it delivers consistent, high-fidelity connectivity.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  {[
                    "Dual-Band Fidelity",
                    "1200Mbps Throughput",
                    "High-Gain Precision",
                    "Remote Diagnostics",
                    "Bespoke Branding"
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
                      <span className="text-sm font-bold uppercase tracking-widest text-slate-300">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <Button onClick={() => handleOpenConsultation(1200)} className="bg-white text-slate-950 hover:bg-sky-500 hover:text-white rounded-full px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all duration-500">
                  Request Hardware Consultation
                </Button>
              </motion.div>
            </div>
            <ScrollDownArrow target="#case-studies" label="Explore Case Studies" className="mt-16" />
          </div>
        </section>

        {/* Testimonials Carousel Section */}
        <TestimonialCarousel />

        {/* Short Video Testimonial Showcase Section */}
        <VideoTestimonialShowcase onOpenConsultation={() => handleOpenConsultation(1200)} />

        {/* Case Studies Section */}
        <CaseStudies onOpenConsultation={() => handleOpenConsultation(1200)} />

        {/* Pricing Comparison Section */}
        <PricingComparison onOpenConsultation={() => handleOpenConsultation(1200)} />

        {/* FAQ Section */}
        <section id="faq" className="py-32 md:py-48">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-24">
              <Badge className="mb-6 bg-slate-500/10 text-slate-400 border-slate-500/20 py-1 px-4">Insights</Badge>
              <h2 className="text-5xl font-bold mb-8">Common Inquiries</h2>
              <p className="text-slate-400 text-xl font-light">Understanding the YO WiFi partnership model.</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-6">
              {[
                {
                  q: "How is the ecosystem structured?",
                  a: "We establish a strategic alliance where YO WiFi assumes responsibility for all marketing and hardware deployment. You maintain full control over your local infrastructure while benefiting from our growth engine."
                },
                {
                  q: "Will I retain my local brand identity?",
                  a: "Absolutely. Your brand is the hero. We act as the silent force that elevates it, providing 'Powered by YO WiFi' certification to signal premium quality to your subscribers."
                },
                {
                  q: "What defines your marketing support?",
                  a: "Our support is multi-faceted: from hyper-local digital targeting and SEO to high-end physical branding and executive-level campaign planning."
                },
                {
                  q: "What are the requirements for entry?",
                  a: "We look for LCOs committed to operational excellence. Our partnership models are tailored to your current scale and future aspirations. Contact us for a private consultation."
                }
              ].map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="bg-slate-900/50 border-white/5 rounded-[2rem] px-8 overflow-hidden">
                  <AccordionTrigger className="text-left font-bold text-xl py-10 hover:no-underline hover:text-sky-400 transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 text-lg leading-relaxed pb-10">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 md:py-48">
          <div className="container mx-auto px-6">
            <div className="bg-sky-600 rounded-[4rem] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-[0_0_100px_rgba(14,165,233,0.3)]">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full -mr-300 -mt-300 blur-[150px]" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-400/20 rounded-full -ml-300 -mb-300 blur-[150px]" />
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <Badge className="mb-10 bg-white/20 text-white border-white/30 py-1 px-6 backdrop-blur-md">Limited Partnerships Available</Badge>
                <h2 className="text-5xl md:text-8xl font-black mb-12 leading-tight tracking-tighter">Elevate Your <br /><span className="italic text-sky-200">Legacy</span></h2>
                <p className="text-xl md:text-3xl font-light text-sky-100 mb-16 leading-relaxed">
                  Join an exclusive network of Local Cable Operators who have transcended the ordinary. Your evolution begins with a single conversation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                  <Button onClick={() => handleOpenConsultation(1200)} size="lg" className="bg-white text-sky-600 hover:bg-sky-50 rounded-full px-16 py-10 text-xl font-bold shadow-2xl transition-all hover:scale-105">
                    Request Consultation
                  </Button>
                  <div className="flex items-center gap-4 text-sky-100">
                    <ShieldCheck className="w-8 h-8" />
                    <span className="text-xs font-bold uppercase tracking-widest">Elite Partnership Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      )}

      {/* Shared Modals */}
      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
        defaultSubscribers={defaultSubscribers} 
      />

      <PartnerLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Floating Live Support Widget & Scroll To Top */}
      <LiveSupportWidget onOpenConsultation={() => handleOpenConsultation(1200)} />
      <ScrollToTop />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-1">
              <div 
                onClick={() => {
                  if (window.location.hash) {
                    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
                  }
                  window.location.reload();
                }}
                className="flex items-center gap-3 mb-10 cursor-pointer group"
              >
                <Wifi className="w-6 h-6 text-sky-500 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-bold text-white tracking-tighter">YO <span className="text-sky-500">WiFi</span></span>
              </div>
              <p className="text-sm font-light leading-relaxed mb-10 max-w-xs">
                The premier ecosystem builder for Local Cable Operators. We define the future of local connectivity through strategic mastery.
              </p>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-sky-600 transition-all cursor-pointer group">
                  <Globe className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-sky-600 transition-all cursor-pointer group">
                  <Zap className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-10 uppercase tracking-widest text-xs">Ecosystem</h4>
              <ul className="space-y-6 text-sm">
                <li><a href="#" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-sky-400 transition-colors">Strategic Presence</a></li>
                <li><a href="#" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-sky-400 transition-colors">Market Mastery</a></li>
                <li><a href="#" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-sky-400 transition-colors">Elite Hardware</a></li>
                <li><a href="#pricing" onClick={() => setCurrentPage('home')} className="hover:text-sky-400 transition-colors">Pricing Comparison</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-10 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-6 text-sm">
                <li><a href="#" onClick={() => setCurrentPage('home')} className="hover:text-sky-400 transition-colors">The Vision</a></li>
                <li><a href="#" onClick={() => setCurrentPage('home')} className="hover:text-sky-400 transition-colors">Partner Program</a></li>
                <li><a href="#" onClick={() => setCurrentPage('home')} className="hover:text-sky-400 transition-colors">Success Stories</a></li>
                <li><a href="#" onClick={() => setCurrentPage('home')} className="hover:text-sky-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-10 uppercase tracking-widest text-xs">Newsletter</h4>
              <p className="text-xs mb-6 opacity-50">Insights for the elite LCO.</p>
              <div className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 border-b border-white/10 py-4 text-xs focus:border-sky-500 outline-none transition-colors"
                />
                <Button size="sm" className="bg-sky-600 text-white hover:bg-sky-500 rounded-full py-6 font-bold">Subscribe</Button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-widest font-bold">
            <p>
              © 2026 YO WiFi{' '}
              <span
                onClick={() => {
                  setCurrentPage('technologies');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-default select-none inline"
              >
                Technologies
              </span>
              . All rights reserved.
            </p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-sky-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

