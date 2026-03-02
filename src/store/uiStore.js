import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  // persist: middleware que guarda automáticamente en localStorage
  persist(
    (set, get) => ({
      theme: 'light',
      sidebarOpen: true,

      // Alternar entre tema claro y oscuro
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        console.log('Toggle Theme - Current:', currentTheme, 'New:', newTheme);
        set({ theme: newTheme });
      },

      setTheme: (theme) => {
        console.log('Set Theme:', theme);
        set({ theme });
      },

      toggleSidebar: () => set((state) => ({
        sidebarOpen: !state.sidebarOpen
      })),

      setSidebarOpen: (open) => set({ sidebarOpen: open })
    }),
    {
      name: 'ui-preferences', // clave en localStorage
      // Solo persistir el tema, no el estado del sidebar
      partialize: (state) => ({
        theme: state.theme
      })
    }
  )
);
