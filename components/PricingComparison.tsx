import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, Shield, Zap, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PricingComparisonProps {
  onOpenConsultation: () => void;
}

export function PricingComparison({ onOpenConsultation }: PricingComparisonProps) {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const tiers = [
    {
      name: "Silver Starter",
      subtitle: "For emerging LCOs (< 500 Subscribers)",
      badge: "Entry Level",
      badgeColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
      priceMonthly: "₹0",
      priceAnnual: "₹0",
      franchiseFee: "Zero Franchise Fee • Standard Wholesale Router Rates",
      popular: false,
      features: [
        { name: "Wholesale Wi-Fi 6 Routers", included: true, text: "Standard LCO Tier" },
        { name: "Basic LCO Portal Access", included: true, text: "Standard Portal" },
        { name: "Local Flyer Templates", included: true, text: "Digital & Print" },
        { name: "24/7 Ticketing Support", included: true, text: "Standard Response" },
        { name: "Hyper-Local Geo-Fenced Ads", included: false, text: "Not Included" },
        { name: "Automated WhatsApp Bot", included: false, text: "Not Included" },
        { name: "Exclusive Territory Rights", included: false, text: "Not Included" },
      ],
      ctaText: "Start Silver Partnership",
      ctaVariant: "outline" as const
    },
    {
      name: "Gold Growth",
      subtitle: "For scaling operators (500 – 2,500 Subscribers)",
      badge: "Most Popular",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      priceMonthly: "₹4,999",
      priceAnnual: "₹4,999",
      franchiseFee: "Per month / Billed annually + 15% Subsidized Hardware",
      popular: true,
      features: [
        { name: "Wholesale Wi-Fi 6 Routers", included: true, text: "15% Subsidized Tier" },
        { name: "Basic LCO Portal Access", included: true, text: "Advanced SOC Portal" },
        { name: "Local Flyer Templates", included: true, text: "Custom Branded Kit" },
        { name: "24/7 Ticketing Support", included: true, text: "Priority Hotline + Chat" },
        { name: "Hyper-Local Geo-Fenced Ads", included: true, text: "2.0km Automated Radius" },
        { name: "Automated WhatsApp Bot", included: true, text: "Auto-Installation Booking" },
        { name: "Exclusive Territory Rights", included: false, text: "Subject to Density" },
      ],
      ctaText: "Claim Gold Tier",
      ctaVariant: "default" as const
    },
    {
      name: "Diamond Enterprise",
      subtitle: "For metro grids & MSOs (2,500+ Subscribers)",
      badge: "Exclusive",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      franchiseFee: "Tailored revenue share & turnkey infrastructure financing",
      popular: false,
      features: [
        { name: "Wholesale Wi-Fi 6 Routers", included: true, text: "Maximum Wholesale Discount" },
        { name: "Basic LCO Portal Access", included: true, text: "Custom API & CRM Integration" },
        { name: "Local Flyer Templates", included: true, text: "Turnkey Society Sales Kit" },
        { name: "24/7 Ticketing Support", included: true, text: "Dedicated Field Engineer" },
        { name: "Hyper-Local Geo-Fenced Ads", included: true, text: "5.0km Metro Campaign Grid" },
        { name: "Automated WhatsApp Bot", included: true, text: "Custom AI Billing Chatbot" },
        { name: "Exclusive Territory Rights", included: true, text: "Guaranteed Regional Lock" },
      ],
      ctaText: "Contact Enterprise Desk",
      ctaVariant: "outline" as const
    }
  ];

  return (
    <section id="pricing" className="py-32 md:py-48 relative overflow-hidden bg-slate-900/40">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1.5 px-4">
            <Award className="w-3.5 h-3.5 mr-1.5 inline text-sky-400" /> Partnership Tiers
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display tracking-tight">
            Transparent LCO <span className="text-sky-500">Growth Tiers</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed font-light">
            Whether you operate 200 or 20,000 active cable connections, our partnership models scale to protect your margins while driving exponential subscriber growth.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-10 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-white/10 shadow-xl">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                billingCycle === 'annual'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual Billing <span className="text-[10px] text-yellow-300 ml-1.5 bg-yellow-500/20 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col h-full"
            >
              <div
                className={`relative flex flex-col h-full rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 ${
                  tier.popular
                    ? 'glass bg-gradient-to-b from-sky-950/60 via-slate-900/90 to-slate-900 border-2 border-sky-500/50 shadow-[0_0_50px_rgba(14,165,233,0.2)] lg:-translate-y-4'
                    : 'bg-slate-900/60 border border-white/10 hover:border-white/20'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-6 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Most Recommended
                  </div>
                )}

                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold font-display text-white">{tier.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{tier.subtitle}</p>
                    </div>
                    <Badge className={`text-[10px] font-bold uppercase px-3 py-1 ${tier.badgeColor}`}>
                      {tier.badge}
                    </Badge>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold font-display text-white">
                      {billingCycle === 'annual' ? tier.priceAnnual : tier.priceMonthly}
                    </span>
                    <span className="text-xs font-mono text-slate-400 uppercase">
                      {tier.priceAnnual === "Custom" || tier.priceMonthly === "₹0" ? "" : "/ month"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 min-h-[2rem] font-medium leading-relaxed">
                    {tier.franchiseFee}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 my-8 flex-grow border-t border-white/10 pt-8">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                    What's Included:
                  </p>
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-full p-1 shrink-0 ${
                        feature.included ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-600'
                      }`}>
                        {feature.included ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </div>
                      <div className="text-xs">
                        <span className={feature.included ? 'text-slate-200 font-medium' : 'text-slate-500 line-through'}>
                          {feature.name}
                        </span>
                        {feature.included && (
                          <p className="text-[10px] text-sky-400/80 font-mono mt-0.5">{feature.text}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-auto">
                  <Button
                    onClick={onOpenConsultation}
                    className={`w-full rounded-full py-7 font-bold text-sm shadow-xl transition-all ${
                      tier.popular
                        ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-[1.02]'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Guarantee */}
        <div className="mt-16 text-center bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">100% Risk-Free LCO Pilot Program</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Test our Wi-Fi 6 routers and hyper-local ad engine in your locality with zero long-term commitments.
              </p>
            </div>
          </div>
          <Button
            onClick={onOpenConsultation}
            variant="outline"
            className="rounded-full px-6 py-5 text-xs font-bold border-sky-500/30 text-sky-300 hover:bg-sky-500/10 shrink-0"
          >
            Request Pilot Access
          </Button>
        </div>
      </div>
    </section>
  );
}
