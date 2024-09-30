/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontTypes from './storefront.types';

export type ProductQueryVariables = StorefrontTypes.Exact<{
  handle?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
}>;


export type ProductQuery = { product?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Product, 'id' | 'title'>> };

interface GeneratedQueryTypes {
  "#graphql\n  query Product($handle: String) {\n    product(handle: $handle) {\n      id\n      title\n    }\n  }": {return: ProductQuery, variables: ProductQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
