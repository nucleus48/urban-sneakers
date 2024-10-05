"use client";

import { CartQuery } from "@/types/storefront.generated";
import { CurrencyCode } from "@/types/storefront.types";
import {
  createContext,
  use,
  useCallback,
  useOptimistic,
} from "react";

export type CartContextValue = {
  optimisticCart: CartQuery["cart"];
  addOptimisticCartLine: (cartLine: CartLine) => void;
};

export type CartLine = NonNullable<CartQuery["cart"]>["lines"]["nodes"][number];

export const CartContext = createContext<CartContextValue | null>(null);

export enum CART_ACTION_TYPE {
  ADD_LINE,
}

export type CartActionAddLine = {
  type: CART_ACTION_TYPE.ADD_LINE;
  payload: CartLine;
};

export type CartAction = CartActionAddLine;

const emptyCart = (
  currencyCode: CurrencyCode,
): NonNullable<CartQuery["cart"]> => ({
  id: "",
  checkoutUrl: "",
  lines: { nodes: [] },
  cost: {
    totalAmount: {
      amount: 0,
      currencyCode,
    },
    subtotalAmount: {
      amount: 0,
      currencyCode,
    },
  },
});

export function CartProvider({
  children,
  cartPromise,
}: React.PropsWithChildren<{ cartPromise: Promise<CartQuery["cart"]> }>) {
  const initialCart = use(cartPromise);
  const [optimisticCart, dispatchOptimisticCart] = useOptimistic(
    initialCart,
    optimisticCartReducer,
  );

  const addOptimisticCartLine = useCallback(
    (cartLine: CartLine) =>
      dispatchOptimisticCart({
        type: CART_ACTION_TYPE.ADD_LINE,
        payload: cartLine,
      }),
    [dispatchOptimisticCart],
  );

  return (
    <CartContext.Provider value={{ optimisticCart, addOptimisticCartLine }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return use(CartContext)!;
}

function optimisticCartReducer(state: CartQuery["cart"], action: CartAction) {
  switch (action.type) {
    case CART_ACTION_TYPE.ADD_LINE:
      const newState =
        state ?? emptyCart(action.payload.merchandise.price.currencyCode);
      const lineExist = newState.lines.nodes.find(
        (line) => line.merchandise.id == action.payload.merchandise.id,
      );

      if (!lineExist)
        return updateCartCost({
          ...newState,
          lines: { nodes: [...newState.lines.nodes, action.payload] },
        });

      const newLines = newState.lines.nodes.map((line) =>
        line.merchandise.id == action.payload.id
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      );
      return updateCartCost({
        ...newState,
        lines: { nodes: newLines },
      });

    default:
      return state;
  }
}

function updateCartCost(cart: NonNullable<CartQuery["cart"]>) {
  const subTotalAmount = cart.lines.nodes.reduce(
    (amount, curr) => parseFloat(curr.merchandise.price.amount) + amount,
    0,
  );
  const totalAmount: number =
    subTotalAmount + (parseFloat(cart.cost.totalTaxAmount?.amount) || 0);
  const subTotal = { ...cart.cost.subtotalAmount, amount: subTotalAmount };
  const total = { ...cart.cost.totalAmount, amount: totalAmount };

  return {
    ...cart,
    cost: { ...cart.cost, subtotalAmount: subTotal, totalAmount: total },
  };
}
