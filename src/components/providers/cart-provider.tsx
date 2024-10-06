"use client";

import { CartQuery } from "@/types/storefront.generated";
import { CurrencyCode } from "@/types/storefront.types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  use,
  useOptimistic,
  useState,
} from "react";

export type Cart = CartQuery["cart"];

export type CartLine = NonNullable<CartQuery["cart"]>["lines"]["nodes"][number];

export type CartContextValue = {
  optimisticCart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
  addOptimisticCartLine: (cartLine: CartLine) => void;
  removeOptimisticCartLine: (id: string) => void;
  incrementOptimisticCartLine: (id: string) => void;
  decrementOptimisticCartLine: (id: string) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export enum CART_ACTION_TYPE {
  ADD_LINE,
  INCREMENT_LINE,
  DECREMENT_LINE,
  REMOVE_LINE,
}

export type CartActionAddLine = {
  type: CART_ACTION_TYPE.ADD_LINE;
  payload: CartLine;
};

export type CartAction =
  | {
      type: Exclude<CART_ACTION_TYPE, CART_ACTION_TYPE.ADD_LINE>;
      payload: { id: string };
    }
  | CartActionAddLine;

export function CartProvider({ children }: React.PropsWithChildren) {
  const [cart, setCart] = useState<Cart>();
  const [optimisticCart, dispatchOptimisticCart] = useOptimistic(
    cart,
    optimisticCartReducer,
  );

  const addOptimisticCartLine = (cartLine: CartLine) =>
    dispatchOptimisticCart({
      type: CART_ACTION_TYPE.ADD_LINE,
      payload: cartLine,
    });

  const incrementOptimisticCartLine = (id: string) =>
    dispatchOptimisticCart({
      type: CART_ACTION_TYPE.INCREMENT_LINE,
      payload: { id },
    });

  const decrementOptimisticCartLine = (id: string) =>
    dispatchOptimisticCart({
      type: CART_ACTION_TYPE.DECREMENT_LINE,
      payload: { id },
    });

  const removeOptimisticCartLine = (id: string) =>
    dispatchOptimisticCart({
      type: CART_ACTION_TYPE.REMOVE_LINE,
      payload: { id },
    });

  return (
    <CartContext.Provider
      value={{
        setCart,
        optimisticCart,
        addOptimisticCartLine,
        removeOptimisticCartLine,
        incrementOptimisticCartLine,
        decrementOptimisticCartLine,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return use(CartContext)!;
}

function optimisticCartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case CART_ACTION_TYPE.ADD_LINE:
      const cart =
        state ?? emptyCart(action.payload.merchandise.price.currencyCode);
      const lines = addOrUpdateCartLine(cart.lines.nodes, action.payload);
      return updateCartCost({
        ...cart,
        lines: { nodes: lines },
        attributes: [{ key: "isCartOpen", value: "true" }, ...cart.attributes],
      });

    case CART_ACTION_TYPE.INCREMENT_LINE:
      if (state) {
        const lines = state.lines.nodes.map((line) =>
          line.merchandise.id == action.payload.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );

        return updateCartCost({ ...state, lines: { nodes: lines } });
      }

    case CART_ACTION_TYPE.DECREMENT_LINE:
      if (state) {
        const lines = state.lines.nodes
          .map((line) =>
            line.merchandise.id == action.payload.id
              ? { ...line, quantity: line.quantity - 1 }
              : line,
          )
          .filter((line) => line.quantity > 0);

        return updateCartCost({ ...state, lines: { nodes: lines } });
      }

    case CART_ACTION_TYPE.REMOVE_LINE:
      if (state) {
        const lines = state.lines.nodes.filter(
          (line) => line.merchandise.id != action.payload.id,
        );

        return updateCartCost({ ...state, lines: { nodes: lines } });
      }

    default:
      return state;
  }
}

function emptyCart(currencyCode: CurrencyCode): NonNullable<Cart> {
  return {
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
    attributes: [],
  };
}

function updateCartCost<TCart extends NonNullable<CartQuery["cart"]>>(
  cart: TCart,
): TCart {
  const lines = cart.lines.nodes.map((line) => ({
    ...line,
    cost: {
      totalAmount: {
        amount: line.quantity * parseInt(line.merchandise.price.amount),
        currencyCode: line.merchandise.price.currencyCode,
      },
    },
  }));

  const subtotal = lines.reduce(
    (amount, curr) => amount + curr.cost.totalAmount.amount,
    0,
  );

  const total = subtotal + (parseFloat(cart.cost.totalTaxAmount?.amount) || 0);
  const currencyCode = cart.cost.subtotalAmount.currencyCode;

  const cartCost = {
    subtotalAmount: { amount: subtotal, currencyCode },
    totalAmount: { amount: total, currencyCode },
  };

  return { ...cart, cost: cartCost, lines: { nodes: lines } };
}

function addOrUpdateCartLine(lines: CartLine[], line: CartLine): CartLine[] {
  const lineExist = lines.some(
    (line) => line.merchandise.id == line.merchandise.id,
  );

  if (!lineExist) return [...lines, line];

  return lines.map((value) =>
    value.merchandise.id == line.merchandise.id
      ? { ...value, quantity: value.quantity + line.quantity }
      : value,
  );
}
