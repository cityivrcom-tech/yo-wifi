import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            title="Return to top of page"
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-sky-900/80 hover:from-sky-600 hover:to-indigo-600 text-slate-300 hover:text-white border border-white/20 hover:border-sky-400 shadow-2xl shadow-sky-900/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group"
            aria-label="Scroll smoothly to top"
          >
            <ArrowUp className="w-5 h-5 text-sky-400 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
