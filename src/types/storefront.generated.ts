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

export type ProductQueryVariables = StorefrontTypes.Exact<{
  handle?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
}>;


export type ProductQuery = { product?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Product, 'id' | 'title' | 'description'>
    & { options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'currencyCode' | 'amount'> }, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url'> }> }, variants: { edges: Array<{ node: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'availableForSale'>
          & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>> }
        ) }> } }
  )> };

export type ProductRecommendationsQueryVariables = StorefrontTypes.Exact<{
  productId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type ProductRecommendationsQuery = { productRecommendations?: StorefrontTypes.Maybe<Array<(
    Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle'>
    & { featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>>, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'currencyCode' | 'amount'> } }
  )>> };

interface GeneratedQueryTypes {
  "#graphql\n  query Products($first: Int) {\n    products(first: $first) {\n      edges {\n        node {\n          id\n          title\n          handle\n          featuredImage {\n            url\n          }\n          priceRange {\n            minVariantPrice {\n              currencyCode\n              amount\n            }\n          }\n        }\n      }\n    }\n  }": {return: ProductsQuery, variables: ProductsQueryVariables},
  "#graphql\n  query Product($handle: String) {\n    product(handle: $handle) {\n      id\n      title\n      description\n      options {\n        name\n        values\n      }\n      priceRange {\n        minVariantPrice {\n          currencyCode\n          amount\n        }\n      }\n      images(first: 20) {\n        edges {\n          node {\n            url\n          }\n        }\n      }\n      variants(first: 250) {\n        edges {\n          node {\n            id\n            availableForSale\n            selectedOptions {\n              name\n              value\n            }\n          }\n        }\n      }\n    }\n  }": {return: ProductQuery, variables: ProductQueryVariables},
  "#graphql\n  query ProductRecommendations($productId: ID!) {\n    productRecommendations(productId: $productId) {\n      id\n      title\n      handle\n      featuredImage {\n        url\n      }\n      priceRange {\n        minVariantPrice {\n          currencyCode\n          amount\n        }\n      }\n    }\n  }": {return: ProductRecommendationsQuery, variables: ProductRecommendationsQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
