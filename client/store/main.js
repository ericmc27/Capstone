import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMainStore = create(
  persist(
    (set) => ({
      currentProducts: undefined,
      setCurrentProducts: (products) => set({ currentProducts: products }),
      cartItems: [],
      updateCartItems: (newItem) =>
        set((state) => {
          const itemExists = state.cartItems.some(
            (item) => item["_id"] === newItem["_id"],
          );

          if (itemExists) {
            return {};
          } else {
            const total = Math.round(state.totalCartItems * 100) + Math.round((Number(newItem['selling_price']) * 100))
            return {
              cartItems: [...state.cartItems, newItem],
              totalCartItems: total / 100
            };
          }
        }),
      removeCartItem: (itemToRemove) =>
        set((state) => {
          const cartItems = state.cartItems;
          const index = cartItems.indexOf(itemToRemove);
          const [removedItem] = cartItems.splice(index, 1);
          const total =  Math.round(state.totalCartItems * 100) - Math.round((Number(removedItem['selling_price']) * 100))
          return {
            cartItems,
            totalCartItems: total / 100,
          };
        }),
      clearCartItems: () => set({totalCartItems: 0, cartItems: []}),
      totalCartItems: 0,
    }),
    { name: "main-store" },
  ),
);
