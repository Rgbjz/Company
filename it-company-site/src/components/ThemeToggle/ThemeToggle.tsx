'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-11 h-11 flex items-center justify-center rounded-full transition-all active:scale-95 backdrop-blur-sm
        bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10
        light:bg-black/5 light:border-black/10 light:text-zinc-700 light:hover:bg-black/10"
    >
      {mounted && isLight ? (
        <Moon className="w-5 h-5" strokeWidth={1.75} />
      ) : (
        <Sun className="w-5 h-5" strokeWidth={1.75} />
      )}
    </button>
  );
}
