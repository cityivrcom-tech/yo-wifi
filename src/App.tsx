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
  Zap
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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-sky-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight font-display">
              YO <span className="text-sky-600">WiFi</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-sky-600 transition-colors">Services</a>
            <a href="#growth" className="text-sm font-medium hover:text-sky-600 transition-colors">Growth</a>
            <a href="#hardware" className="text-sm font-medium hover:text-sky-600 transition-colors">Hardware</a>
            <a href="#faq" className="text-sm font-medium hover:text-sky-600 transition-colors">FAQ</a>
            <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-6">
              Partner with Us
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold">Services</a>
              <a href="#growth" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold">Growth</a>
              <a href="#hardware" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold">Hardware</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold">FAQ</a>
              <Button className="bg-sky-600 text-white rounded-full py-6 text-lg">
                Partner with Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-sky-400 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6 py-1 px-4 border-sky-200 bg-sky-50 text-sky-700 rounded-full">
                Empowering Local Cable Operators
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              You Focus on <span className="text-sky-600">Business</span>,<br />
              We Focus on <span className="text-indigo-600">Growth</span>.
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              YO WiFi provides end-to-end advertisement, marketing, and premium dual-band hardware support to help LCOs scale their subscriber base effortlessly.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-8 py-7 text-lg group">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div 
              className="mt-20 relative max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="glass rounded-3xl p-4 shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/wifi-network/1200/600" 
                  alt="Network Dashboard" 
                  className="rounded-2xl w-full object-cover shadow-inner"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 hidden lg:block glass p-6 rounded-2xl shadow-xl border-sky-100"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Growth Rate</p>
                    <p className="text-xl font-bold text-slate-900">+142%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              {[
                { label: "Partner LCOs", value: "500+" },
                { label: "Active Users", value: "1.2M" },
                { label: "Cities Covered", value: "45+" }
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-4xl md:text-5xl font-bold text-sky-400 mb-2">{stat.value}</p>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Comprehensive Support Suite</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                We don't just provide WiFi; we provide a growth engine for your local cable business.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Megaphone className="w-8 h-8 text-sky-600" />,
                  title: "Hyper-Local Ads",
                  desc: "Targeted advertisement campaigns in your specific area to attract new subscribers and retain existing ones.",
                  features: ["Geo-fencing", "Social Media Ads", "Local SEO"],
                  color: "bg-sky-50",
                  borderColor: "group-hover:border-sky-400"
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
                  title: "Marketing Strategy",
                  desc: "Professional branding, social media management, and offline marketing materials designed to make your LCO stand out.",
                  features: ["Brand Identity", "Campaign Planning", "Lead Funnels"],
                  color: "bg-indigo-50",
                  borderColor: "group-hover:border-indigo-400"
                },
                {
                  icon: <Cpu className="w-8 h-8 text-purple-600" />,
                  title: "Dual-Band Hardware",
                  desc: "Next-gen dual-band routers with superior range and speed, fully supported by our technical team 24/7.",
                  features: ["Remote Config", "Auto-Updates", "24/7 Support"],
                  color: "bg-purple-50",
                  borderColor: "group-hover:border-purple-400"
                }
              ].map((service, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="h-full"
                >
                  <Card className={`h-full border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group border-2 ${service.borderColor}`}>
                    <div className={`h-1.5 w-full ${idx === 0 ? 'bg-sky-500' : idx === 1 ? 'bg-indigo-500' : 'bg-purple-500'}`} />
                    <CardHeader className="pt-8 px-8">
                      <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                        {service.icon}
                      </div>
                      <CardTitle className="text-2xl mb-4 font-display font-bold">{service.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed text-slate-600">
                        {service.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.features.map((feature, fIdx) => (
                          <Badge key={fIdx} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none px-3 py-1 text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" className="p-0 text-sky-600 hover:text-sky-700 hover:bg-transparent group font-bold">
                        Explore Service <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Focus Split Section */}
        <section id="growth" className="py-24 bg-slate-50 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  The Perfect <span className="text-sky-600">Partnership</span> for Scale
                </h2>
                <p className="text-lg text-slate-600 mb-10">
                  Running an LCO is demanding. We take the weight of sales and marketing off your shoulders so you can focus on what you do best.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100">
                      <Users className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Your Focus: Operations</h4>
                      <p className="text-slate-500">Infrastructure maintenance, local networking, and on-ground customer support.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-sky-600 rounded-xl shadow-sm flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-sky-600">Our Focus: Sales & Marketing</h4>
                      <p className="text-slate-500">Lead generation, brand awareness, and providing premium hardware support.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/business-growth/800/800" 
                    alt="LCO Growth" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="glass p-6 rounded-2xl">
                      <p className="text-white font-medium italic mb-4">
                        "Since partnering with YO WiFi, our subscriber base grew by 40% in just 6 months. We finally have time to improve our fiber network."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-500" />
                        <div>
                          <p className="text-white font-bold text-sm">Rajesh Kumar</p>
                          <p className="text-sky-200 text-xs">LCO Owner, Metro Networks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-200 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-50 -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hardware Section */}
        <section id="hardware" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-sky-500/10 rounded-full blur-[100px]" />
                  <img 
                    src="https://picsum.photos/seed/router/600/600" 
                    alt="Dual Band Router" 
                    className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
              
              <div className="md:w-1/2 order-1 md:order-2">
                <Badge className="mb-4 bg-sky-100 text-sky-700 border-none">Premium Hardware</Badge>
                <h2 className="text-4xl font-bold mb-6">Next-Gen Dual-Band Technology</h2>
                <p className="text-lg text-slate-600 mb-8">
                  We provide your subscribers with the best hardware in the market. Our routers are optimized for high-speed fiber connectivity and seamless streaming.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    "Dual-Band (2.4GHz & 5GHz) Support",
                    "Up to 1200Mbps Wireless Speed",
                    "High-Gain Antennas for Superior Range",
                    "Remote Technical Support & Diagnostics",
                    "Custom Branding for your LCO"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button className="bg-slate-900 text-white rounded-full px-8 py-6">
                  Hardware Specifications
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Everything you need to know about partnering with YO WiFi.</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="bg-white px-6 rounded-2xl mb-4 border-none shadow-sm">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline">How does the partnership work?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  We sign a service agreement where YO WiFi handles all marketing, lead generation, and provides premium routers. You continue to manage the physical infrastructure and local operations. We share the growth benefits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-white px-6 rounded-2xl mb-4 border-none shadow-sm">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline">Do I need to change my brand name?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  No, you keep your identity. We act as your "Growth Partner." We can provide "Powered by YO WiFi" branding to add credibility, but your local brand remains the hero.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-white px-6 rounded-2xl mb-4 border-none shadow-sm">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline">What kind of marketing support do you provide?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  We provide digital ads (Facebook, Google, Instagram), local SEO, physical banners, flyers, and even branded merchandise to help you dominate your local area.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="bg-white px-6 rounded-2xl mb-4 border-none shadow-sm">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline">Is there a setup fee?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  We have flexible partnership models. Some involve a small onboarding fee, while others are purely performance-based. Contact our sales team for a custom quote.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="bg-sky-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Transform Your LCO Business?</h2>
                <p className="text-xl text-sky-100 mb-12">
                  Join 500+ successful LCOs who have scaled their business with YO WiFi. Let's build the future of connectivity together.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button size="lg" className="bg-white text-sky-600 hover:bg-sky-50 rounded-full px-10 py-8 text-xl font-bold">
                    Become a Partner
                  </Button>
                  <div className="flex items-center gap-2 text-sky-100">
                    <ShieldCheck className="w-6 h-6" />
                    <span className="font-medium">Verified Partnership Program</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Wifi className="w-6 h-6 text-sky-500" />
                <span className="text-2xl font-bold text-white tracking-tight">YO WiFi</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                The ultimate growth partner for Local Cable Operators. We provide the tools, you provide the connection.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Services</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-sky-500 transition-colors">Advertisement</a></li>
                <li><a href="#" className="hover:text-sky-500 transition-colors">Marketing</a></li>
                <li><a href="#" className="hover:text-sky-500 transition-colors">Hardware Support</a></li>
                <li><a href="#" className="hover:text-sky-500 transition-colors">Lead Generation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-sky-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-sky-500 transition-colors">Partner Program</a></li>
                <li><a href="#" className="hover:text-sky-500 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-sky-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
              <p className="text-xs mb-4">Get the latest insights on LCO growth.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-sky-500 outline-none"
                />
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white">Join</Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2026 YO WiFi Technologies. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
