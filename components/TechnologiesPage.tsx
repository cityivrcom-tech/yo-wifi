import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Cpu, 
  Layers, 
  Compass, 
  Globe, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoiCalculator } from '@/components/RoiCalculator';
import { ServicesComparisonTable } from '@/components/ServicesComparisonTable';
import { PartnerRoadmap } from '@/components/PartnerRoadmap';
import { EcosystemStatsCounter } from '@/components/EcosystemStatsCounter';
import { CoverageMap } from '@/components/CoverageMap';
import { KnowledgeHub } from '@/components/KnowledgeHub';
import { LatestInsights } from '@/components/LatestInsights';

interface TechnologiesPageProps {
  onBackToHome: () => void;
  onOpenConsultation: (subscribers?: number) => void;
}

export function TechnologiesPage({ onBackToHome, onOpenConsultation }: TechnologiesPageProps) {
  const [activeSection, setActiveSection] = useState<string>('all');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-sky-500 selection:text-white pb-32">
      {/* Top Navigation Back Bar */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="container mx-auto max-w-7xl flex items-center justify-between gap-4">
          <Button 
            onClick={onBackToHome}
            variant="ghost" 
            className="text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 font-bold text-xs sm:text-sm rounded-full px-4"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Back to Main Overview</span>
          </Button>

          <div className="flex items-center gap-2">
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/40 text-[10px] font-mono hidden sm:inline-flex">
              YO WIFI TECHNOLOGIES
            </Badge>
            <Button
              onClick={() => onOpenConsultation(1200)}
              size="sm"
              className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs rounded-full px-5 shadow-lg shadow-sky-500/20"
            >
              Schedule Tech Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative pt-20 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <Badge className="mb-6 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-300 border-sky-500/30 py-1.5 px-5 text-xs font-mono uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 mr-1.5 inline animate-pulse text-sky-400" /> Dedicated Technology Architecture & Ecosystem Portal
          </Badge>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            YO WiFi <span className="text-sky-400 italic glow-text">Technologies</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            The full-stack technical framework engineered for regional Local Cable Operators. Dive into our interactive simulators, structural matrices, deployment roadmaps, network telemetry, and technical knowledge base.
          </p>

          {/* Quick Jump Navigation Bar for the 5 requested sections */}
          <div className="mt-12 p-2 bg-slate-900/80 border border-white/10 rounded-3xl max-w-5xl mx-auto shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "tech-growth-engine", label: "1. Interactive Growth Engine", icon: <TrendingUp className="w-3.5 h-3.5 text-sky-400" /> },
              { id: "tech-value-matrix", label: "2. Interactive Value Matrix", icon: <Layers className="w-3.5 h-3.5 text-indigo-400" /> },
              { id: "tech-onboarding", label: "3. Onboarding & Expansion", icon: <Compass className="w-3.5 h-3.5 text-emerald-400" /> },
              { id: "tech-network-scale", label: "4. National Network Scale", icon: <Globe className="w-3.5 h-3.5 text-amber-400" /> },
              { id: "tech-knowledge-hub", label: "5. Knowledge Hub", icon: <BookOpen className="w-3.5 h-3.5 text-purple-400" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className="px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 bg-white/5 hover:bg-sky-500 hover:text-white text-slate-300 border border-white/5 hover:border-sky-400 shadow-sm"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 1. INTERACTIVE GROWTH ENGINE SECTION */}
      <section id="tech-growth-engine" className="py-20 border-b border-white/5 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge className="mb-3 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1 px-4 text-xs font-mono uppercase tracking-widest">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5 inline" /> Core Technology Module 01
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Interactive <span className="text-sky-400 italic">Growth Engine</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light">
              Simulate your LCO node's revenue trajectory. See how our Wi-Fi 6 hardware upgrades and geo-fenced Google ads compound subscriber velocity and boost ARPU.
            </p>
          </div>

          <RoiCalculator onOpenConsultation={(subs) => onOpenConsultation(subs)} />
        </div>
      </section>

      {/* 2. INTERACTIVE VALUE MATRIX SECTION */}
      <section id="tech-value-matrix" className="py-20 border-b border-white/5 relative bg-slate-900/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <Badge className="mb-3 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 py-1 px-4 text-xs font-mono uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5 mr-1.5 inline" /> Core Technology Module 02
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Interactive <span className="text-indigo-400 italic">Value Matrix</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light">
              Compare the technological architecture of legacy standalone cable operations against our full-stack YO WiFi powered broadband infrastructure.
            </p>
          </div>

          <ServicesComparisonTable onOpenConsultation={() => onOpenConsultation(1200)} />
        </div>
      </section>

      {/* 3. ONBOARDING & EXPANSION SECTION */}
      <section id="tech-onboarding" className="py-20 border-b border-white/5 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <Badge className="mb-3 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 py-1 px-4 text-xs font-mono uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 mr-1.5 inline" /> Core Technology Module 03
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Onboarding & <span className="text-emerald-400 italic">Expansion</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light">
              Track the exact 5-phase engineering evolution from initial territory audit and hardware pilot dispatch to regional market leadership.
            </p>
          </div>

          <PartnerRoadmap onOpenConsultation={() => onOpenConsultation(1200)} />
        </div>
      </section>

      {/* 4. NATIONAL NETWORK SCALE SECTION */}
      <section id="tech-network-scale" className="py-20 border-b border-white/5 relative bg-slate-900/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <Badge className="mb-3 bg-amber-500/10 text-amber-400 border-amber-500/20 py-1 px-4 text-xs font-mono uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5 mr-1.5 inline" /> Core Technology Module 04
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              National Network <span className="text-amber-400 italic">Scale</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light">
              Explore live aggregated telemetry from our 24/7 Remote SOC and inspect our optical fiber grid coverage across over 40 Indian metropolitan regions.
            </p>
          </div>

          {/* Render both Ecosystem stats and interactive coverage map */}
          <div className="space-y-12">
            <EcosystemStatsCounter />
            <CoverageMap onOpenConsultation={() => onOpenConsultation(1200)} />
          </div>
        </div>
      </section>

      {/* 5. KNOWLEDGE HUB SECTION */}
      <section id="tech-knowledge-hub" className="py-12 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <Badge className="mb-3 bg-purple-500/10 text-purple-400 border-purple-500/20 py-1 px-4 text-xs font-mono uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5 mr-1.5 inline" /> Core Technology Module 05
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              Knowledge <span className="text-purple-400 italic">Hub & Insights</span>
            </h2>
          </div>

          <div className="space-y-16">
            <KnowledgeHub onOpenConsultation={() => onOpenConsultation(1200)} />
            <div className="border-t border-white/10 pt-16">
              <LatestInsights onOpenConsultation={() => onOpenConsultation(1200)} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Sticky Tech Consult Call to Action */}
      <div className="mt-20 container mx-auto px-6 max-w-5xl">
        <div className="p-8 sm:p-12 rounded-[3rem] bg-gradient-to-r from-sky-600/30 via-indigo-600/30 to-purple-600/30 border border-sky-500/40 shadow-2xl text-center relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/20 rounded-full blur-[100px] pointer-events-none" />
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to Deploy YO WiFi Technologies on Your Node?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            Connect with our network engineering team. We will analyze your current fiber OLT architecture, verify your 2km exclusivity radius, and build a custom hardware deployment plan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => onOpenConsultation(1200)}
              size="lg"
              className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-200 font-extrabold rounded-full px-10 py-7 text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
            >
              Start Technology Consultation
            </Button>
            <Button
              onClick={onBackToHome}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-bold rounded-full px-8 py-7 text-sm uppercase tracking-wider"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
