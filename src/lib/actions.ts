"use server";

import { cookies } from "next/headers";
import { COOKIE, SECURE_COOKIE_ATTRIBUTES } from "./constants";
import {
  addCartLines,
  createCart,
  removeCartLines,
  updateCartLines,
} from "./shopify";
import { revalidatePath } from "next/cache";

export async function addItemToCart(merchandiseId: string) {
  const { get, set } = await cookies();
  let cartId = get(COOKIE.CART_ID)?.value;

  if (!cartId) {
    cartId = await createCart({ lines: [{ merchandiseId, quantity: 1 }] });
  } else {
    cartId = await addCartLines(cartId, [{ merchandiseId, quantity: 1 }]);
  }

  if (cartId) set(COOKIE.CART_ID, cartId, SECURE_COOKIE_ATTRIBUTES);
  revalidatePath("/", "layout");
}

export async function updateCartLine(lineId: string, quantity: number) {
  const { get, set } = await cookies();
  let cartId = get(COOKIE.CART_ID)?.value;

  if (cartId) {
    cartId = await updateCartLines(cartId, [{ id: lineId, quantity }]);
  }

  if (cartId) set(COOKIE.CART_ID, cartId, SECURE_COOKIE_ATTRIBUTES);
  revalidatePath("/", "layout");
}

export async function removeCartLine(lineId: string) {
  const { get, set } = await cookies();
  let cartId = get(COOKIE.CART_ID)?.value;

  if (cartId) {
    cartId = await removeCartLines(cartId, [lineId]);
  }

  if (cartId) set(COOKIE.CART_ID, cartId, SECURE_COOKIE_ATTRIBUTES);
  revalidatePath("/", "layout");
}
