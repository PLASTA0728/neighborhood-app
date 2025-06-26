'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load saved theme from localStorage or default to system
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initTheme = saved || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initTheme);
    document.documentElement.setAttribute('data-theme', initTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  return (
    <div>
      <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300 ease-in-out" >
        {theme === 'light' ? (
          <Sun size={20} className="text-black dark:text-white transition-colors duration-300 ease-in-out" />
        ) : (
          <Moon size={20} className="text-black dark:text-white transition-colors duration-300 ease-in-out" />
        )}
      </button>
    </div>
  );
}
