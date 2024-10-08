import { create } from "zustand";

const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

export const useCounterStore = create((set) => ({
  count: 0,
  devices: [],
  increment: () => {
    set((state) => ({
      count: state.count + 1,
    }));
  },
  decrement: () => {
    set((state) => ({
      count: state.count - 1,
    }));
  },
}));
