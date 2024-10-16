import { create } from "zustand";

const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

export const useThemeStore = create((set) => ({
  isDarkTheme: false,
  setTheme: () => {
    set((state) => ({
      isDarkTheme: !state.isDarkTheme,
    }));
  },
}));
