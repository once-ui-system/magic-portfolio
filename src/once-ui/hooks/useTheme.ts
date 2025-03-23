'use client';

import { useCallback, useEffect, useState } from 'react';
import { style } from '@/app/resources';

export function useTheme() {
  const [theme, setTheme] = useState(style.theme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  return {
    theme,
    toggleTheme
  };
}
