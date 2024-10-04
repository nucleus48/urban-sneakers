/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontTypes from './storefront.types';

export type CartQueryVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type CartQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl'>
    & { lines: { edges: Array<{ node: (
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>> }
          ) }
        ) }> }, cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> } }
  )> };

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
  "#graphql\nquery Cart($cartId: ID!) {\n  cart(id: $cartId) {\n    id\n    checkoutUrl\n    lines(first: 10) {\n      edges {\n        node {\n          id\n          quantity\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              price {\n                amount\n                currencyCode\n              }\n              image {\n                url\n              }\n            }\n          }\n        }\n      }\n    }\n    cost {\n      totalAmount {\n        amount\n        currencyCode\n      }\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n  }\n}": {return: CartQuery, variables: CartQueryVariables},
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
