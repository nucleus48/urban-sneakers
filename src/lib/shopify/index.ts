import {
  createStorefrontApiClient,
  StorefrontOperations,
} from "@shopify/storefront-api-client";
import { ApiClientRequestParams, ReturnData } from "@shopify/graphql-client";

const client = createStorefrontApiClient({
  apiVersion: process.env.SHOPIFY_API_VERSION!,
  privateAccessToken: process.env.SHOPIFY_PRIVATE_ACCESS_TOKEN!,
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
});

const storefrontFetch = async <
  TData,
  Operation extends keyof StorefrontOperations = string,
>(
  ...params: ApiClientRequestParams<Operation, StorefrontOperations>
): Promise<
  TData extends undefined ? ReturnData<Operation, StorefrontOperations> : TData
> => {
  try {
    const response = await client.request(...params);
    if (response.data) return response.data;
    throw response;
  } catch (error) {
    throw { error, ...params };
  }
};
