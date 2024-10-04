"use client";

import { CartQuery } from "@/types/storefront.generated";
import { createContext, use, useOptimistic, useState } from "react";

export type CartContextValue = {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  optimisticCart: CartQuery["cart"];
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  cartPromise,
}: React.PropsWithChildren<{ cartPromise: Promise<CartQuery["cart"]> }>) {
  const cart = use(cartPromise);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [optimisticCart, dispatchOptimisticCart] = useOptimistic(cart);

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen, optimisticCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return use(CartContext)!;
}
