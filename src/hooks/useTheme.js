import { useEffect } from 'react';
import { useUIStore } from '../store/uiStore';

export const useTheme = () => {
  const { theme, toggleTheme } = useUIStore();

  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar o quitar clase 'dark' del HTML
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return { theme, toggleTheme };
};
