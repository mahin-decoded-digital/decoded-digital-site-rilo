import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UIState {
  isMobileMenuOpen: boolean;
  contactSuccess: boolean;
  theme: 'light' | 'dark';
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setContactSuccess: (status: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      contactSuccess: false,
      theme: 'light',
      toggleMobileMenu: () => 
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setMobileMenuOpen: (isOpen: boolean) => 
        set(() => ({ isMobileMenuOpen: isOpen })),
      setContactSuccess: (status: boolean) => 
        set(() => ({ contactSuccess: status })),
      toggleTheme: () => 
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          if (typeof document !== 'undefined') {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(newTheme);
          }
          return { theme: newTheme };
        }),
      setTheme: (theme: 'light' | 'dark') => 
        set(() => {
          if (typeof document !== 'undefined') {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
          }
          return { theme };
        }),
    }),
    {
      name: 'decoded-digital-ui-store',
      // Only persist the theme preference, transient UI states like menu and success message shouldn't persist across reloads
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        // Apply theme to DOM immediately on rehydration
        if (state && typeof document !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(state.theme);
        }
      },
    }
  )
);