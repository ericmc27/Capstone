import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMainStore = create(
  persist(
    (set) => ({
      currentProducts: undefined,
      setCurrentProducts: (products) => set({ currentProducts: products }),
    }),
    { name: "main-store" },
  ),
);
