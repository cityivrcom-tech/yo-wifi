import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface ScrollDownArrowProps {
  target: string;
  label?: string;
  className?: string;
}

export function ScrollDownArrow({ target, label = "Explore Next", className = "" }: ScrollDownArrowProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.querySelector(target);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full flex justify-center py-6 relative z-20 pointer-events-auto ${className}`}>
      <a
        href={target}
        onClick={handleClick}
        className="group flex flex-col items-center gap-1.5 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
        aria-label={label}
      >
        {label && (
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
            {label}
          </span>
        )}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-sky-500/10 border border-white/10 group-hover:border-sky-500/30 flex items-center justify-center shadow-lg transition-all"
        >
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
        </motion.div>
      </a>
    </div>
  );
}
