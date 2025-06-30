'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  mapStyle?: string;
  setMapStyle?: (val: string) => void;
}

export default function ThemeToggle({mapStyle, setMapStyle}: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

useEffect(() => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initTheme = saved || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initTheme);
  document.documentElement.setAttribute('data-theme', initTheme);

  // Optional: also sync map style on first load
  if (initTheme === 'dark' && mapStyle === 'default-light') {
    setMapStyle('dark');
  } else if (initTheme === 'light' && mapStyle === 'dark') {
    setMapStyle('default-light');
  }
}, []);

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  
  if (newTheme === 'dark' && mapStyle === 'default-light') {
    setMapStyle('dark');
  } else if (newTheme === 'light' && mapStyle === 'dark') {
    setMapStyle('default-light');
  }
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
