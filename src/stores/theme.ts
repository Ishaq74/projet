// Theme Store - Manages theme state across the application
import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export type Theme = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'purple';

// Persistent theme store that saves to localStorage
export const $theme = persistentAtom<Theme>('theme', 'light', {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// Theme actions
export const themeActions = {
  setTheme: (theme: Theme) => {
    $theme.set(theme);
    
    // Apply theme to document
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  },
  
  toggleTheme: () => {
    const current = $theme.get();
    const nextTheme = current === 'light' ? 'dark' : 'light';
    themeActions.setTheme(nextTheme);
  },
  
  initTheme: () => {
    if (typeof document !== 'undefined') {
      const savedTheme = $theme.get();
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      // Listen for system theme changes if using system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if ($theme.get() === 'light' || $theme.get() === 'dark') {
          // Only auto-switch if user is using basic themes
          themeActions.setTheme(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }
};

// Initialize theme on import (client-side only)
if (typeof window !== 'undefined') {
  themeActions.initTheme();
}