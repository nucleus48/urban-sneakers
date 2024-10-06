export const BRAND_NAME = "Urban Sneakers";

export enum ROUTE {
  HOME = "/",
  ACCOUNT = "/accounts",
  PRODUCTS = "/products",
  ORDERS = "/orders",
}

export enum COOKIE {
  CART_ID = "cart_id",
}

export const SECURE_COOKIE_ATTRIBUTES = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
} as const;

export const PRODUCTS_PAGE_LENGTH = 10;
export const STORE_PASSWORD = "1"
