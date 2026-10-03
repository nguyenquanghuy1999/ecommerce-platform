import { create } from "zustand";
import { Product } from "../types";
import { persist } from "zustand/middleware";

type CartItem = {
  item: Product;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Product, quantity: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity) =>
        set((state) => {
          const existing = state.items.find(
            (cartItem) => cartItem.item.id === item.id,
          );
          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.item.id === item.id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + quantity,
                    }
                  : cartItem,
              ),
            };
          }
          return {
            items: [{ item, quantity: quantity }, ...state.items],
          };
        }),

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter(({ item }) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map((cartItem) =>
            cartItem.item.id === itemId
              ? {
                  ...cartItem,
                  quantity,
                }
              : cartItem,
          ),
        }));
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
