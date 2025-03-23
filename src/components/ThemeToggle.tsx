'use client';

import React from 'react';
import { useTheme } from '@/once-ui/hooks/useTheme';
import { ToggleButton, Line } from '@/once-ui/components';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <>
      <Line vert maxHeight="24" />
      <ToggleButton
        prefixIcon={theme === 'light' ? 'sun' : 'moon'}
        onClick={toggleTheme}
        selected={false}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      />
    </>
  );
};
