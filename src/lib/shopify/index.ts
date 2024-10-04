import "server-only";
import {
  createStorefrontApiClient,
  StorefrontOperations,
} from "@shopify/storefront-api-client";
import { ApiClientRequestParams, ReturnData } from "@shopify/graphql-client";
import { cache } from "react";
import {
  ProductQuery,
  ProductRecommendationsQuery,
  ProductsQuery,
} from "./gql/product";
import {
  CartCreateMutation,
  CartLinesAddMutation,
  CartQuery,
} from "./gql/cart";
import { CartInput, CartLineInput } from "@/types/storefront.types";

const client = createStorefrontApiClient({
  apiVersion: process.env.SHOPIFY_API_VERSION!,
  privateAccessToken: process.env.SHOPIFY_PRIVATE_ACCESS_TOKEN!,
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
});

const storefrontFetch = async <
  Operation extends keyof StorefrontOperations = string,
>(
  ...params: ApiClientRequestParams<Operation, StorefrontOperations>
): Promise<ReturnData<Operation, StorefrontOperations>> => {
  const response = await client.request(...params);
  if (response.data) return response.data;
  throw response;
};

export const getProducts = cache(async (first: number) => {
  const { products } = await storefrontFetch(ProductsQuery, {
    variables: { first },
  });
  return products;
});

export const getProduct = cache(async (handle: string) => {
  const { product } = await storefrontFetch(ProductQuery, {
    variables: { handle },
  });
  return product;
});

export const getProductRecommendations = cache(async (id: string) => {
  const { productRecommendations } = await storefrontFetch(
    ProductRecommendationsQuery,
    { variables: { productId: id } },
  );
  return productRecommendations;
});

export const getCart = cache(async (cartId: string) => {
  const { cart } = await storefrontFetch(CartQuery, { variables: { cartId } });
  return cart;
});

export const createCart = async (cartInput: CartInput) => {
  const { cartCreate } = await storefrontFetch(CartCreateMutation, {
    variables: { cartInput },
  });
  return cartCreate?.cart?.id;
};

export const addCartLines = async (cartId: string, lines: CartLineInput[]) => {
  const { cartLinesAdd } = await storefrontFetch(CartLinesAddMutation, {
    variables: { cartId, lines },
  });
  return cartLinesAdd?.cart?.id;
};
