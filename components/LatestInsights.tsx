import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, Calendar, ArrowRight, Search, Tag, Sparkles, User, X, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LatestInsightsProps {
  onOpenConsultation: () => void;
}

interface BlogPost {
  id: number;
  title: string;
  category: 'Hardware' | 'Marketing' | 'Growth Strategy' | 'Automation';
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  excerpt: string;
  content: string[];
  image: string;
  featured?: boolean;
}

const INSIGHTS_DATA: BlogPost[] = [
  {
    id: 1,
    title: "Why 5GHz Dual-Band Wi-Fi 6 is the #1 Weapon Against National ISP Churn in 2026",
    category: "Hardware",
    readTime: "5 min read",
    date: "July 2, 2026",
    author: "Vikramaditya Rao",
    authorRole: "VP of Network Engineering",
    excerpt: "Over 68% of LCO subscriber churn stems from poor in-home Wi-Fi coverage on legacy 2.4GHz routers—not fiber backhaul latency. Here is how dual-band Wi-Fi 6 vessels reverse churn overnight.",
    content: [
      "For years, Local Cable Operators (LCOs) have competed with national telco giants purely on bandwidth pricing and fiber deployment speed. However, recent telemetry from over 1.2 million households reveals that subscriber dissatisfaction rarely originates from the optical node or distribution drop.",
      "Instead, 68% of subscriber support calls and subsequent churn are caused by RF congestion on legacy 2.4GHz single-band routers inside dense residential apartment complexes.",
      "By upgrading households to YO WiFi's 1200Mbps Dual-Band Wi-Fi 6 vessels, LCOs offload high-bandwidth streaming devices to clean 5GHz channels while utilizing beamforming for penetrating concrete walls. Our partner LCOs report a 42% reduction in truck rolls within 30 days of hardware migration."
    ],
    image: "/images/modern_router.jpg",
    featured: true
  },
  {
    id: 2,
    title: "The Geo-Fencing Playbook: How Independent Operators Double ARPU in Gated Societies",
    category: "Marketing",
    readTime: "4 min read",
    date: "June 28, 2026",
    author: "Ananya Mukherjee",
    authorRole: "Head of Growth & Ads",
    excerpt: "Traditional door-to-door pamphlet distribution yields less than 0.4% conversion today. Discover how automated 2.0km geo-fenced Instagram and Google campaigns generate qualified resident leads.",
    content: [
      "In modern multi-dwelling units (MDUs) and gated societies, security restrictions have made traditional pamphlet distribution and canopy stalls obsolete. To capture new residents, high-performing LCOs have shifted to hyper-local digital advertising.",
      "YO WiFi's automated ad engine draws a precise 2.0km digital perimeter around your serviced optical nodes. When residents search for 'high speed wifi near me' or scroll through Instagram reels in the evening, they see targeted YO WiFi partner ads offering instant 2-hour installation.",
      "This strategy reduces customer acquisition cost (CAC) by 60% while positioning your local brand with enterprise-level credibility."
    ],
    image: "/images/hyperlocal_ads.jpg"
  },
  {
    id: 3,
    title: "From Cable TV to Pure Fiber: Transforming Your Local Depot into a Digital Command Center",
    category: "Growth Strategy",
    readTime: "6 min read",
    date: "June 19, 2026",
    author: "Siddharth Mehta",
    authorRole: "Chief Ecosystem Architect",
    excerpt: "The transition from analog/digital CATV to high-speed broadband requires a cultural and operational shift. Learn how our SOC portal automates billing and remote network diagnostics.",
    content: [
      "The legacy cable television model is undergoing its greatest transformation since digitization. As subscriber consumption shifts heavily toward OTT streaming platforms and cloud gaming, LCOs must transition from passive signal distributors to proactive network managers.",
      "With YO WiFi's integrated SOC (Security & Operations Center) portal, LCOs gain real-time visibility into subscriber router health, bandwidth consumption spikes, and firmware status without leaving their local office.",
      "Automating these operational workflows allows operators to manage up to 3x more subscribers with their existing field technician teams."
    ],
    image: "/images/hero_banner.jpg"
  },
  {
    id: 4,
    title: "Automating Installation Bookings: Why WhatsApp Chatbots Outperform Traditional Phone Calling",
    category: "Automation",
    readTime: "3 min read",
    date: "June 10, 2026",
    author: "Neelam Verma",
    authorRole: "Lead Product Manager",
    excerpt: "Missed calls during peak hours cost LCOs thousands in lost subscriber activations. See how our AI conversational chatbot on WhatsApp closes leads 24/7 autonomously.",
    content: [
      "When a prospective subscriber experiences an outage with their current provider, they decide on a replacement within hours. If your office phone is busy or unanswered after 8:00 PM, that lead is lost to a national ISP.",
      "YO WiFi provides partner operators with an automated WhatsApp conversational assistant that verifies service coverage, recommends speed tiers, and books installation slots directly into your field technicians' calendars 24 hours a day, 7 days a week.",
      "Partners utilizing automated chat booking report an immediate 28% increase in weekend subscriber activations."
    ],
    image: "/images/modern_router.jpg"
  }
];

export function LatestInsights({ onOpenConsultation }: LatestInsightsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalPost, setActiveModalPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Hardware', 'Marketing', 'Growth Strategy', 'Automation'];

  const filteredPosts = useMemo(() => {
    return INSIGHTS_DATA.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="insights" className="py-32 md:py-48 relative overflow-hidden bg-slate-950">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <Badge className="mb-4 bg-sky-500/10 text-sky-400 border-sky-500/20 py-1.5 px-4">
              <BookOpen className="w-3.5 h-3.5 mr-1.5 inline text-sky-400" /> Knowledge Hub
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-white">
              Latest LCO <span className="text-sky-500">Industry Insights</span>
            </h2>
            <p className="text-lg text-slate-400 mt-4 max-w-2xl font-light">
              Expert research, technical whitepapers, and operational playbooks designed to help Local Cable Operators thrive in the fiber era.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search trends, hardware, playbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-full pl-11 pr-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-white/10">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mr-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" /> Filter By Topic:
          </span>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Insights Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col bg-slate-900/60 border border-white/10 hover:border-sky-500/40 rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                {/* Image Cover */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-800">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-slate-950/90 backdrop-blur-md text-sky-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-sky-500/30">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-950/80 px-3 py-1 rounded-full font-mono">
                    <Clock className="w-3 h-3 text-sky-400" /> {post.readTime}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {post.date}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold font-display text-white group-hover:text-sky-400 transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6 font-light">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                        {post.author[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200 leading-none">{post.author}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{post.authorRole}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveModalPost(post)}
                      className="text-sky-400 hover:text-white text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-all"
                    >
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/5">
            <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-4" />
            <p className="text-lg font-bold text-slate-400">No insights found matching your filters.</p>
            <Button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              variant="link" 
              className="text-sky-400 mt-2 font-bold text-xs uppercase"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900 border border-sky-500/30 rounded-3xl p-8 text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
          <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30">Executive Growth Briefing</Badge>
          <h4 className="text-2xl font-bold text-white font-display">Ready to Apply These Strategies in Your Locality?</h4>
          <p className="text-sm text-slate-300 max-w-lg font-light">
            Schedule a private technical consultation with our Regional Executive to discuss custom router deployment and geo-fenced ad strategies.
          </p>
          <Button onClick={onOpenConsultation} className="bg-sky-600 hover:bg-sky-500 text-white rounded-full px-8 py-6 text-xs font-bold uppercase tracking-widest shadow-lg shadow-sky-600/30 mt-2">
            Schedule Growth Call
          </Button>
        </div>
      </div>

      {/* Article Read Modal */}
      <AnimatePresence>
        {activeModalPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalPost(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-slate-900 border border-white/15 rounded-[2.5rem] p-6 md:p-12 shadow-2xl overflow-hidden my-8 text-slate-100 max-h-[85vh] overflow-y-auto"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

              <button
                onClick={() => setActiveModalPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30 font-bold">
                    {activeModalPost.category}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-400" /> {activeModalPost.readTime}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> {activeModalPost.date}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold font-display text-white leading-tight">
                  {activeModalPost.title}
                </h2>

                <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-base shadow-lg">
                    {activeModalPost.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{activeModalPost.author}</p>
                    <p className="text-xs text-slate-400">{activeModalPost.authorRole} • YO WiFi Ecosystem</p>
                  </div>
                </div>

                <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-slate-800">
                  <img
                    src={activeModalPost.image}
                    alt={activeModalPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Article Content Paragraphs */}
                <div className="space-y-4 text-sm md:text-base text-slate-300 leading-relaxed font-light pt-4">
                  {activeModalPost.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="first-letter:text-3xl first-letter:font-bold first-letter:text-sky-400 first-letter:mr-1">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    💡 Want custom implementation for your locality?
                  </div>
                  <Button
                    onClick={() => {
                      setActiveModalPost(null);
                      onOpenConsultation();
                    }}
                    className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white rounded-full px-8 py-6 text-xs font-bold uppercase tracking-widest shadow-lg shadow-sky-600/30"
                  >
                    Discuss With Our Team <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
