import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Award, Sparkles, CheckCircle2, Star, Clock, MapPin, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VideoTestimonial {
  id: string;
  title: string;
  partnerName: string;
  lcoCompany: string;
  city: string;
  duration: string;
  thumbnail: string;
  subscribers: string;
  growthRate: string;
  quote: string;
  keyTakeaway: string;
}

const PARTNER_VIDEOS: VideoTestimonial[] = [
  {
    id: "rajesh-hyderabad",
    title: "From 800 to 3,500 Subscribers in 6 Months",
    partnerName: "Rajesh Sharma",
    lcoCompany: "Sri Sai Cable & Datacom",
    city: "Hyderabad",
    duration: "03:42",
    thumbnail: "/images/video_thumb.jpg",
    subscribers: "3,500+ Active Subs",
    growthRate: "+337% YoY Growth",
    quote: "When we deployed the YO WiFi 1200Mbps vessels and activated the automated Google ad campaigns, our local booking desk literally ran out of installation slots. It transformed us from a struggling neighborhood cable operator into the undisputed broadband leader in West Hyderabad.",
    keyTakeaway: "Zero ad spend risk with 100% company-funded local ad campaigns."
  },
  {
    id: "vikram-bangalore",
    title: "Eliminating Router Churn with Dual-Band Wi-Fi 6",
    partnerName: "Vikram Rao",
    lcoCompany: "Deccan High-Speed Grid",
    city: "Bangalore",
    duration: "02:15",
    thumbnail: "/images/modern_router.jpg",
    subscribers: "8,200+ Active Subs",
    growthRate: "+165% YoY Growth",
    quote: "Previously, 80% of our customer complaints were due to cheap 2.4GHz single-band routers dropping connections during peak gaming and Zoom hours. Since migrating to YO WiFi's dual-band vessels with 24/7 Remote SOC monitoring, our churn dropped from 22% to under 1.5%.",
    keyTakeaway: "Proactive 24/7 SOC diagnostics resolves interference before customers complain."
  },
  {
    id: "amit-kochi",
    title: "How Auto-Pilot Google Ads Flooded Our Desk",
    partnerName: "Amit Verma",
    lcoCompany: "Malabar Optical Networks",
    city: "Kochi",
    duration: "04:10",
    thumbnail: "/images/hyperlocal_ads.jpg",
    subscribers: "9,500+ Active Subs",
    growthRate: "+188% YoY Growth",
    quote: "In our 15 years as an LCO, we never imagined getting 25 to 30 verified residential connection inquiries daily via WhatsApp. YO WiFi geo-fenced our exact 2km node radius and ran ads that made our brand look like a national telecom giant.",
    keyTakeaway: "Real-time WhatsApp & SMS lead notification routing straight to your desk."
  },
  {
    id: "suresh-chennai",
    title: "Why We Chose YO WiFi Over Standard Franchises",
    partnerName: "Suresh Nair",
    lcoCompany: "Kaveri Digital Cable",
    city: "Chennai",
    duration: "03:28",
    thumbnail: "/images/hero_banner.jpg",
    subscribers: "11,400+ Active Subs",
    growthRate: "+142% YoY Growth",
    quote: "Other ISP franchise models take away your brand identity and squeeze your margins. YO WiFi gave us exclusive territory rights, let us keep our local customer relationships, and supercharged our ARPU by ₹450 per household.",
    keyTakeaway: "Territory exclusivity agreement guarantees zero internal competition."
  }
];

export function VideoTestimonialShowcase({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35); // Simulated playback progress percentage

  const activeVideo = PARTNER_VIDEOS[activeVideoIdx];

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectVideo = (index: number) => {
    setActiveVideoIdx(index);
    setIsPlaying(true);
    setProgress(10);
  };

  return (
    <section className="py-24 bg-slate-900/40 relative overflow-hidden border-t border-white/5">
      {/* Ambient glowing background */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-6 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1.5 px-5 text-xs uppercase tracking-widest font-mono">
            <Award className="w-3.5 h-3.5 mr-1.5 inline" /> Partner Success Stories
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Watch How Our Partners <span className="text-sky-400 italic">Scale</span>
          </h2>
          <p className="text-base sm:text-xl text-slate-400 font-light leading-relaxed">
            Real stories from local cable operators across India who transformed their physical fiber grids into high-margin, automated broadband powerhouses.
          </p>
        </div>

        {/* Video Player & Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Screen Showcase (8 Columns) */}
          <div className="lg:col-span-8 bg-slate-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
            {/* Aspect Ratio Container */}
            <div className="relative aspect-video w-full bg-slate-900 overflow-hidden flex items-center justify-center">
              {/* Background Thumbnail */}
              <img 
                src={activeVideo.thumbnail} 
                alt={activeVideo.partnerName} 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105 filter brightness-75' : 'scale-100 filter brightness-90 group-hover:scale-105'}`}
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = '/images/hero_banner.jpg';
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Playing state visual audio equalizer simulation */}
              {isPlaying && (
                <div className="absolute top-6 right-6 flex items-end gap-1 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-mono text-sky-400 z-20">
                  <span className="w-1.5 h-3 bg-sky-400 animate-pulse rounded-full" />
                  <span className="w-1.5 h-5 bg-sky-400 animate-pulse delay-75 rounded-full" />
                  <span className="w-1.5 h-2 bg-sky-400 animate-pulse delay-150 rounded-full" />
                  <span className="w-1.5 h-6 bg-sky-400 animate-pulse delay-300 rounded-full" />
                  <span className="ml-1 text-white font-bold">PLAYING INTERVIEW</span>
                </div>
              )}

              {/* Big Center Play / Pause Button */}
              <button
                onClick={handlePlayToggle}
                className="relative z-30 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-sky-500/90 hover:bg-sky-400 text-white flex items-center justify-center shadow-[0_0_50px_rgba(14,165,233,0.6)] transition-all transform hover:scale-110 active:scale-95 group/btn"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 sm:w-12 sm:h-12 fill-white text-white" />
                ) : (
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-white text-white ml-1" />
                )}
                
                {/* Ring pulse */}
                <span className="absolute -inset-2 rounded-full border-2 border-sky-400/50 animate-ping pointer-events-none" />
              </button>

              {/* Bottom Video Metadata & Transcript Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 space-y-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {activeVideo.city} Node
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3" /> {activeVideo.growthRate}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300 font-bold">
                    {activeVideo.subscribers}
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  "{activeVideo.title}"
                </h3>

                <p className="text-sm sm:text-base text-slate-300 font-light italic leading-relaxed line-clamp-2">
                  "{activeVideo.quote}"
                </p>

                {/* Simulated Player Controls Bar */}
                <div className="pt-2 space-y-2">
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer" onClick={() => setProgress((prev) => (prev > 80 ? 20 : prev + 25))}>
                    <div 
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-3">
                      <button onClick={handlePlayToggle} className="hover:text-white transition-colors">
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition-colors">
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <span>{isPlaying ? "01:14" : "00:00"} / {activeVideo.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sky-400 font-bold hidden sm:inline">1080p HD Fiber Stream</span>
                      <button className="hover:text-white transition-colors">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Bio Footer inside card */}
            <div className="p-6 sm:p-8 bg-slate-900/90 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
                  {activeVideo.partnerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-1.5">
                    <span>{activeVideo.partnerName}</span>
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Founder & Managing Director • <strong className="text-slate-200">{activeVideo.lcoCompany}</strong> ({activeVideo.city})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  onClick={onOpenConsultation}
                  className="bg-sky-500 hover:bg-sky-400 text-white rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest shadow-lg shadow-sky-500/20 shrink-0"
                >
                  Schedule LCO Consultation
                </Button>
              </div>
            </div>
          </div>

          {/* Playlist / Video Selection Library (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                Partner Playlist ({PARTNER_VIDEOS.length} Videos)
              </span>
              <span className="text-[11px] text-sky-400 font-mono font-bold">Autoplay Next</span>
            </div>

            <div className="space-y-3">
              {PARTNER_VIDEOS.map((video, idx) => {
                const isSelected = idx === activeVideoIdx;

                return (
                  <button
                    key={video.id}
                    onClick={() => handleSelectVideo(idx)}
                    className={`w-full text-left p-4 rounded-3xl border transition-all duration-300 flex items-start gap-4 group relative ${
                      isSelected
                        ? 'bg-slate-900/95 border-sky-500/60 shadow-[0_0_25px_rgba(14,165,233,0.15)]'
                        : 'bg-slate-950/60 border-white/5 hover:border-white/15 hover:bg-slate-900/50'
                    }`}
                  >
                    {/* Thumbnail Box */}
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                      <img 
                        src={video.thumbnail} 
                        alt={video.partnerName} 
                        className="w-full h-full object-cover filter brightness-90"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/hero_banner.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isSelected ? 'bg-sky-500 text-white' : 'bg-white/20 text-white group-hover:bg-sky-500 transition-colors'}`}>
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-950/90 text-white">
                        {video.duration}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-white/5 text-slate-400'
                        }`}>
                          {video.city}
                        </span>
                        <span className="text-[10px] font-mono text-green-400 font-bold">{video.growthRate}</span>
                      </div>
                      <h5 className={`text-xs sm:text-sm font-bold tracking-tight leading-snug line-clamp-2 ${
                        isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {video.title}
                      </h5>
                      <p className="text-[11px] font-mono text-slate-500 mt-1">
                        By {video.partnerName} ({video.lcoCompany})
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-sky-500 rounded-r-full shadow-[0_0_8px_rgba(14,165,233,1)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom help banner */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/20 text-center">
              <Sparkles className="w-5 h-5 text-sky-400 mx-auto mb-2" />
              <h5 className="text-xs font-bold text-white mb-1">Want your LCO featured here?</h5>
              <p className="text-[11px] text-slate-400 font-light mb-3">
                Join our regional ambassador program after reaching 2,000+ connected subscribers.
              </p>
              <Button 
                onClick={onOpenConsultation}
                size="sm" 
                variant="outline" 
                className="w-full border-sky-500/30 text-sky-300 hover:bg-sky-500/10 text-[11px] rounded-xl font-bold uppercase tracking-wider"
              >
                Apply for Exclusivity
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
