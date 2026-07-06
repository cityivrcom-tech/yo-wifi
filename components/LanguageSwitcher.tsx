import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, ChevronDown, Sparkles } from 'lucide-react';

export interface RegionalLanguage {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  greeting: string;
  tagline: string;
}

export const SUPPORTED_LANGUAGES: RegionalLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English (India)', region: 'Pan-India & Global Hubs', greeting: 'Welcome to YO WiFi', tagline: 'The Future of LCO Growth is Here.' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'Pan-India & North Grid', greeting: 'YO WiFi में आपका स्वागत है', tagline: 'LCO विकास का भविष्य यहाँ है।' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'West Bengal & East India', greeting: 'YO WiFi তে আপনাকে স্বাগতম', tagline: 'LCO বৃদ্ধির ভবিষ্যৎ এখানেই।' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Telangana & Andhra Pradesh', greeting: 'YO WiFi కి స్వాగతం', tagline: 'LCO వృద్ధి యొక్క భవిష్యత్తు ఇక్కడే ఉంది.' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra (Mumbai/Pune)', greeting: 'YO WiFi मध्ये आपले स्वागत आहे', tagline: 'LCO वाढीचे भविष्य येथे आहे.' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu (Chennai/Coimbatore)', greeting: 'YO WiFi-க்கு வரவேற்கிறோம்', tagline: 'LCO வளர்ச்சியின் எதிர்காலம் இங்கே.' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', region: 'Pan-India & North Grid', greeting: 'YO WiFi میں خوش آمدید', tagline: 'LCO کی ترقی کا مستقبل یہاں ہے۔' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat (Ahmedabad/Surat)', greeting: 'YO WiFi માં તમારું સ્વાગત છે', tagline: 'LCO વિકાસનું ભવિષ્ય અહીં છે.' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Karnataka (Bengaluru/Mysuru)', greeting: 'YO WiFi ಗೆ ಸ್ವಾಗತ', tagline: 'LCO ಬೆಳವಣಿಗೆಯ ಭವಿಷ್ಯ ಇಲ್ಲಿದೆ.' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Odisha (Bhubaneswar/Cuttack)', greeting: 'YO WiFi କୁ ସ୍ୱାଗତ', tagline: 'LCO ବିକାଶର ଭବିଷ୍ୟତ ଏଠାରେ ଅଛି।' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'Kerala (Kochi/Thiruvananthapuram)', greeting: 'YO WiFi-ലേക്ക് സ്വാഗതം', tagline: 'LCO വളർച്ചയുടെ ഭാവി ഇവിടെയുണ്ട്.' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Punjab (Amritsar/Ludhiana)', greeting: 'YO WiFi ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ', tagline: 'LCO ਵਿਕਾਸ ਦਾ ਭਵਿੱਖ ਇੱਥੇ ਹੈ।' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', region: 'Assam & North-East Hubs', greeting: 'YO WiFi লৈ স্বাগতম', tagline: 'LCO বিকাশৰ ভৱিষ্যত ইয়াতেই।' },
  { code: 'mai', name: 'Maithili', nativeName: 'মৈথিলী', region: 'Bihar & Jharkhand Grids', greeting: 'YO WiFi মে অहाँक স্বাগত অছি', tagline: 'LCO বিকাশক ভবিষ্যৎ এহিঠাম অছি।' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', region: 'Pan-India Classical Network', greeting: 'YO WiFi जालपुटे भवतां स्वागतम्', tagline: 'LCO विकासस्य भविष्यम् अत्र अस्ति।' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کأشُر', region: 'Jammu & Kashmir Grids', greeting: 'YO WiFi منز پریتھ خیر مقدم', tagline: 'LCO ترقی ہند مستقبل چھُ یتیس منز।' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', region: 'Pan-India Sindhi Communities', greeting: 'YO WiFi ۾ اوهان جو آجيان آهي', tagline: 'LCO ترقي جو مستقبل هتي آهي.' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', region: 'Goa & Coastal Karnataka', greeting: 'YO WiFi-ंत तुमचें स्वागत आसा', tagline: 'LCO वाड गतीचें फुडार हांगां आसा.' },
  { code: 'mni', name: 'Manipuri (Meitei)', nativeName: 'মৈতৈলোন', region: 'Manipur & North-East Grid', greeting: 'YO WiFi দা তরাম্না ওকচরি', tagline: 'LCO চাওখৎপগী তুংগী ফিভম মফম অসিদা লৈ।' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', region: 'Sikkim & North-East Hubs', greeting: 'YO WiFi मा स्वागत छ', tagline: 'LCO विकासको भविष्य यहाँ छ।' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', region: 'Assam & Bodoland Grid', greeting: 'YO WiFi आव खुलुमबाय', tagline: 'LCO जौगानायनि इयुना बेयावनो दं।' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', region: 'Jammu & Himachal Grids', greeting: 'YO WiFi च तुंदा स्वागत ऐ', tagline: 'LCO विकास दा भविष्य इथे ऐ।' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', region: 'Jharkhand, Bengal & Odisha', greeting: 'YO WiFi ᱨᱮ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ', tagline: 'LCO ᱞᱟᱦᱟᱱᱛᱤ ᱨᱮᱭᱟᱜ ᱟᱜᱟᱢ ᱫᱚ ᱱᱚᱸᱰᱮ ᱢᱮᱱᱟᱜᱼᱟ᱾' }
];

interface LanguageSwitcherProps {
  currentLang: RegionalLanguage;
  onLanguageChange: (lang: RegionalLanguage) => void;
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full glass border border-white/10 hover:border-sky-500/50 text-slate-300 hover:text-white transition-all text-xs font-medium shadow-sm"
        title="Change Regional Language"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-sky-400" />
        <span className="font-semibold">{currentLang.nativeName.split(' ')[0]}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isLangOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden max-h-[26rem] overflow-y-auto"
          >
            <div className="px-3 py-2 border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center justify-between">
              <span>Select LCO Language</span>
              <Sparkles className="w-3 h-3 text-sky-400" />
            </div>

            <div className="p-1 space-y-0.5">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = currentLang.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-sans">{lang.nativeName}</span>
                        <span className="text-[11px] text-slate-400">({lang.name})</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{lang.region}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

