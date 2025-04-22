'use client';

import React from 'react';
import { ToggleButton, useTheme } from '@/once-ui/components';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <>
      <ToggleButton
        prefixIcon={theme === 'dark' ? 'sun' : 'moon'}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        selected={false}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      />
    </>
  );
};
