import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, User, Bot, HelpCircle, ArrowRight, CheckCircle2, Wifi, PhoneCall, ShieldCheck, Phone, BadgeCheck, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface LiveSupportWidgetProps {
  onOpenConsultation: () => void;
}

const QUICK_QUESTIONS = [
  {
    question: "What is the hardware subsidy?",
    answer: "In our Gold Growth and Enterprise tiers, YO WiFi provides up to 15% to 25% direct subsidy on Carrier-grade Dual-Band Wi-Fi 6 routers, reducing your upfront capital expenditure significantly while allowing you to offer zero-cost upgrade promos to subscribers."
  },
  {
    question: "How do I start a 100% Risk-Free Pilot?",
    answer: "Our 30-Day Pilot Program lets you deploy 20 to 50 Wi-Fi 6 routers in a specific residential society or depot with zero long-term commitments. If you don't see an immediate drop in customer complaints and a boost in ARPU, we take the hardware back no questions asked!"
  },
  {
    question: "How does the hyper-local ad engine work?",
    answer: "Our SOC portal draws an automated 2.0km to 5.0km digital perimeter around your optical nodes. When residents scroll Instagram or search Google for Wi-Fi, they see your partner ads offering 2-hour rapid installation."
  },
  {
    question: "Can I speak to a Regional Engineer?",
    answer: "Absolutely! Our network engineers are available 24/7. Click the 'Book Consultation' button below or leave your mobile number in the consultation form to schedule a direct callback within 15 minutes."
  }
];

export function LiveSupportWidget({ onOpenConsultation }: LiveSupportWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello Partner! 👋 I'm the YO WiFi Ecosystem Assistant. How can I help you scale your local cable network today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [partnerId, setPartnerId] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim() || !partnerId.trim()) {
      setVerifyError('Please enter both your Mobile Number and Partner ID.');
      return;
    }
    if (mobileNumber.replace(/\D/g, '').length < 8) {
      setVerifyError('Please enter a valid mobile number (min 8 digits).');
      return;
    }
    setVerifyError('');
    setIsVerified(true);
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Hello Partner ${partnerId.toUpperCase()}! 👋 We've verified your registered mobile (${mobileNumber}). I'm your YO WiFi Ecosystem Assistant. How can I help you scale your local cable network today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Check if it matches quick question
    const matchedQuick = QUICK_QUESTIONS.find(q => q.question.toLowerCase() === text.toLowerCase());

    setTimeout(() => {
      let replyText = "Thank you for your inquiry! Our LCO partnership team specializes in custom fiber & router deployments. For custom commercial terms, please schedule a 15-min consultation with our Regional Executive.";
      if (matchedQuick) {
        replyText = matchedQuick.answer;
      } else if (text.toLowerCase().includes('price') || text.toLowerCase().includes('cost') || text.toLowerCase().includes('tier')) {
        replyText = "We offer three flexible tiers: Silver Starter (₹0 franchise fee), Gold Growth (most popular, ₹4,999/mo annual with 15% hardware subsidy), and Custom Diamond Enterprise. You can check our Pricing Comparison section above!";
      } else if (text.toLowerCase().includes('router') || text.toLowerCase().includes('hardware') || text.toLowerCase().includes('wifi 6')) {
        replyText = "Our hardware lineup features 1200Mbps Dual-Band Wi-Fi 6 routers (2.4GHz + 5GHz) with beamforming and WPA3 encryption, specifically engineered to eliminate MDU concrete wall interference.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[90vw] sm:w-[380px] h-[520px] bg-slate-900 border border-sky-500/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden mb-4 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-sky-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/30">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                    YO WiFi Live Support
                  </h4>
                  <p className="text-[10px] text-sky-300 font-mono">
                    {isVerified ? `ID: ${partnerId.toUpperCase()} • Online` : '24/7 LCO Partner Desk • Verification'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {isVerified && (
                  <button
                    onClick={() => setIsVerified(false)}
                    title="Switch Partner ID / Reset"
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-[10px] flex items-center gap-1 font-mono px-2.5 border border-white/5"
                  >
                    <LogOut className="w-3 h-3 text-sky-400" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isVerified ? (
              <div className="flex-grow p-6 flex flex-col justify-between bg-slate-950/90 overflow-y-auto">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4 mx-auto shadow-inner">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white text-center font-display mb-1">
                    Partner Verification
                  </h3>
                  <p className="text-xs text-slate-400 text-center leading-relaxed mb-6">
                    Please enter your registered LCO details to access dedicated 24/7 engineering support.
                  </p>

                  <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-sky-400" />
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={mobileNumber}
                        onChange={(e) => { setMobileNumber(e.target.value); setVerifyError(''); }}
                        className="w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none font-mono transition-colors shadow-inner"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <BadgeCheck className="w-3.5 h-3.5 text-indigo-400" />
                        Partner ID / MSO Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LCO-8492 or MSO-DEL"
                        value={partnerId}
                        onChange={(e) => { setPartnerId(e.target.value); setVerifyError(''); }}
                        className="w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-xl px-4 py-2.5 text-xs text-white uppercase placeholder:text-slate-600 placeholder:normal-case focus:outline-none font-mono transition-colors shadow-inner"
                        required
                      />
                    </div>

                    {verifyError && (
                      <p className="text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg font-mono text-center">
                        {verifyError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full py-5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 mt-3 transition-all hover:scale-[1.02]"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Verify & Access Support</span>
                    </Button>
                  </form>
                </div>

                <div className="pt-5 mt-4 border-t border-white/10 text-center">
                  <p className="text-[11px] text-slate-500">
                    Not a registered partner yet?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsOpen(false); onOpenConsultation(); }}
                      className="text-sky-400 hover:underline font-bold inline-flex items-center gap-0.5"
                    >
                      Apply for Pilot <ArrowRight className="w-3 h-3 inline" />
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Messages Area */}
                <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-950/50">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-end gap-2 max-w-[85%]">
                        {msg.sender === 'bot' && (
                          <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mb-1 border border-sky-500/30">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-sky-600 text-white rounded-br-xs shadow-md'
                              : 'bg-slate-800/90 text-slate-200 rounded-bl-xs border border-white/5'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1 px-8 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs pl-8">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Assistant is typing...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions Pills */}
                <div className="p-2 bg-slate-900/90 border-t border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar">
                  {QUICK_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q.question)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-[10px] text-sky-300 hover:text-white font-medium transition-all shrink-0"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>

                {/* Input & Book CTA */}
                <div className="p-3 bg-slate-900 border-t border-white/10 space-y-2">
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Ask about subsidies, hardware, ads..."
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      className="flex-grow bg-slate-950 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    <Button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="w-8 h-8 rounded-full bg-sky-600 hover:bg-sky-500 text-white p-0 flex items-center justify-center shrink-0 disabled:opacity-40"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </form>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenConsultation();
                    }}
                    className="w-full py-2 bg-gradient-to-r from-sky-600/20 to-indigo-600/20 hover:from-sky-600/30 hover:to-indigo-600/30 border border-sky-500/30 rounded-xl text-sky-300 hover:text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-inner"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                    <span>Schedule Call with Regional Engineer</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-slate-800 text-slate-300 border border-white/20'
            : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sky-600/40 border border-sky-400/30 hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]'
        }`}
        aria-label="Toggle Live Support"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-sky-600 animate-ping" />
          )}
        </div>
        <span className="text-xs font-bold uppercase tracking-wider font-display">
          {isOpen ? 'Close Support' : 'Live Partner Support'}
        </span>
      </motion.button>
    </div>
  );
}
