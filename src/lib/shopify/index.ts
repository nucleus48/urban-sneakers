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
  const data = await storefrontFetch(ProductsQuery, { variables: { first } });

  return data.products.edges.map(({ node }) => ({
    id: node.id,
    name: node.title,
    handle: node.handle,
    imageUrl: node.featuredImage?.url as string,
    price: node.priceRange.minVariantPrice.amount as number,
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
  }));
});

export const getProduct = cache(async (handle: string) => {
  const { product } = await storefrontFetch(ProductQuery, {
    variables: { handle },
  });

  if (!product) return undefined;

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.priceRange.minVariantPrice.amount,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    images: product.images.edges.map(({ node }) => node.url as string),
    options: product.options,
    variants: product.variants.edges.map(({node}) => ({...node})),
  };
});

export const getProductRecommendations = cache(async (id: string) => {
  const { productRecommendations } = await storefrontFetch(
    ProductRecommendationsQuery,
    { variables: { productId: id } },
  );

  if (!productRecommendations) return undefined;

  return productRecommendations.map((product) => ({
    id: product.id,
    name: product.title,
    handle: product.handle,
    imageUrl: product.featuredImage?.url as string,
    price: product.priceRange.minVariantPrice.amount as number,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
  }));
});
