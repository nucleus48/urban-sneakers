/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontTypes from './storefront.types';

export type ProductsQueryVariables = StorefrontTypes.Exact<{
  first?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Int']['input']>;
}>;


export type ProductsQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle'>
        & { featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>>, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'currencyCode' | 'amount'> } }
      ) }> } };

interface GeneratedQueryTypes {
  "#graphql\n  query Products($first: Int) {\n    products(first: $first) {\n      edges {\n        node {\n          id\n          title\n          handle\n          featuredImage {\n            url\n          }\n          priceRange {\n            minVariantPrice {\n              currencyCode\n              amount\n            }\n          }\n        }\n      }\n    }\n  }": {return: ProductsQuery, variables: ProductsQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
