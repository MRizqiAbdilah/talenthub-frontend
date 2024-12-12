import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IFood } from "../types/food.type";

interface State {
  cart: (IFood & { quantity: number })[]; // Tambahkan quantity di setiap item
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (item: IFood) => void;
  removeFromCart: (item: IFood) => void;
  clearCart: () => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...INITIAL_STATE,
      addToCart: (item: IFood) => {
        const existingCart = get().cart;
        const existingItem = existingCart.find(
          (food) => food.name === item.name
        );

        let updatedCart;
        if (existingItem) {
          // Jika item sudah ada, tambahkan quantity
          updatedCart = existingCart.map((food) =>
            food.name === item.name
              ? { ...food, quantity: food.quantity + 1 }
              : food
          );
        } else {
          // Jika item baru, tambahkan dengan quantity 1
          updatedCart = [...existingCart, { ...item, quantity: 1 }];
        }

        // Hitung ulang total
        const totalItems = updatedCart.reduce(
          (sum, food) => sum + food.quantity,
          0
        );
        const totalPrice = updatedCart.reduce(
          (sum, food) => sum + food.price * food.quantity,
          0
        );

        set({ cart: updatedCart, totalItems, totalPrice });
      },
      removeFromCart: (item: IFood) => {
        const existingCart = get().cart;
        const existingItem = existingCart.find(
          (food) => food.name === item.name
        );

        let updatedCart;
        if (existingItem && existingItem.quantity > 1) {
          // Kurangi quantity jika masih lebih dari 1
          updatedCart = existingCart.map((food) =>
            food.name === item.name
              ? { ...food, quantity: food.quantity - 1 }
              : food
          );
        } else {
          // Hapus item sepenuhnya jika quantity == 1
          updatedCart = existingCart.filter((food) => food.name !== item.name);
        }

        // Hitung ulang total
        const totalItems = updatedCart.reduce(
          (sum, food) => sum + food.quantity,
          0
        );
        const totalPrice = updatedCart.reduce(
          (sum, food) => sum + food.price * food.quantity,
          0
        );

        set({ cart: updatedCart, totalItems, totalPrice });
      },
      clearCart: () => set({ cart: [] }), // Fungsi untuk mengosongkan cart
    }),
    {
      name: "cart-storage",
    }
  )
);
