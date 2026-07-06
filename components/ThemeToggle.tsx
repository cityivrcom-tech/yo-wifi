import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggleTheme: (theme: 'dark' | 'light') => void;
}

export function ThemeToggle({ theme, onToggleTheme }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => onToggleTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center justify-center w-10 h-10 rounded-full glass border border-white/10 hover:border-sky-500/50 text-slate-300 hover:text-white transition-all shadow-lg overflow-hidden group"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      <div className="relative z-10 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 rotate-0 scale-100 transition-transform duration-500 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 rotate-0 scale-100 transition-transform duration-500 group-hover:-rotate-12" />
        )}
      </div>
      <span className="sr-only">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
