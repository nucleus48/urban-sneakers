"use client";

import { createContext, use, useState } from "react";

export type Cart = {
  id: string;
};

export type CartContextValue = {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  cart?: Cart;
};

const CartContext = createContext<CartContextValue | null>(null);

export default function CartProvider({ children }: React.PropsWithChildren) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return use(CartContext)!;
}
