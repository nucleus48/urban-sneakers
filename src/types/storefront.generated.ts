/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontTypes from './storefront.types';

export type CartQueryVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type CartQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl'>
    & { lines: { nodes: Array<(
        Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
        & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale' | 'quantityAvailable'>
          & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>> }
        ) }
      ) | (
        Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
        & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale' | 'quantityAvailable'>
          & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>> }
        ) }
      )> }, cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }, attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>> }
  )> };

export type CartCreateMutationVariables = StorefrontTypes.Exact<{
  cartInput?: StorefrontTypes.InputMaybe<StorefrontTypes.CartInput>;
}>;


export type CartCreateMutation = { cartCreate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id'>> }> };

export type CartLinesAddMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput;
}>;


export type CartLinesAddMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id'>> }> };

export type CartLinesUpdateMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineUpdateInput> | StorefrontTypes.CartLineUpdateInput;
}>;


export type CartLinesUpdateMutation = { cartLinesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id'>> }> };

export type CartLinesRemoveMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lineIds: Array<StorefrontTypes.Scalars['ID']['input']> | StorefrontTypes.Scalars['ID']['input'];
}>;


export type CartLinesRemoveMutation = { cartLinesRemove?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id'>> }> };

export type ProductFragmentFragment = (
  Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle'>
  & { featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>>, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
);

export type ProductVariantFragmentFragment = (
  Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale' | 'quantityAvailable'>
  & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>> }
);

export type ProductsQueryVariables = StorefrontTypes.Exact<{
  first?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Int']['input']>;
}>;


export type ProductsQuery = { products: { nodes: Array<(
      Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle'>
      & { featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>>, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )> } };

export type ProductQueryVariables = StorefrontTypes.Exact<{
  handle?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
}>;


export type ProductQuery = { product?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Product, 'description' | 'id' | 'title' | 'handle'>
    & { options: Array<Pick<StorefrontTypes.ProductOption, 'name' | 'values'>>, images: { nodes: Array<Pick<StorefrontTypes.Image, 'id' | 'url' | 'width' | 'height'>> }, variants: { nodes: Array<(
        Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale' | 'quantityAvailable'>
        & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'width' | 'height'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>> }
      )> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>>, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
  )> };

export type ProductRecommendationsQueryVariables = StorefrontTypes.Exact<{
  productId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type ProductRecommendationsQuery = { productRecommendations?: StorefrontTypes.Maybe<Array<(
    Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle'>
    & { featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>>, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
  )>> };

export type CollectionsQueryVariables = StorefrontTypes.Exact<{
  first?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Int']['input']>;
}>;


export type CollectionsQuery = { collections: { nodes: Array<(
      Pick<StorefrontTypes.Collection, 'id' | 'title' | 'handle'>
      & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>> }
    )> } };

interface GeneratedQueryTypes {
  "#graphql\nquery Cart($cartId: ID!) {\n  cart(id: $cartId) {\n    id\n    checkoutUrl\n    lines(first: 10) {\n      nodes {\n        id\n        quantity\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n        }\n        merchandise {\n          ... on ProductVariant {\n            ...ProductVariantFragment\n          }\n        }\n      }\n    }\n    cost {\n      totalAmount {\n        amount\n        currencyCode\n      }\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    attributes {\n      key\n      value\n    }\n  }\n}\n#graphql\n  fragment ProductVariantFragment on ProductVariant {\n    id\n    title\n    availableForSale\n    quantityAvailable\n    image {\n      url\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n    }\n    selectedOptions {\n      name\n      value\n    }\n  }": {return: CartQuery, variables: CartQueryVariables},
  "#graphql\n  query Products($first: Int) {\n    products(first: $first) {\n      nodes {\n        ...ProductFragment\n      }\n    }\n  }\n  #graphql\n  fragment ProductFragment on Product {\n    id\n    title\n    handle\n    featuredImage {\n      url\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }": {return: ProductsQuery, variables: ProductsQueryVariables},
  "#graphql\n  query Product($handle: String) {\n    product(handle: $handle) {\n      ...ProductFragment\n      description\n      options {\n        name\n        values\n      }\n      images(first: 20) {\n        nodes {\n          id\n          url\n          width\n          height\n        }\n      }\n      variants(first: 250) {\n        nodes {\n          ...ProductVariantFragment\n        }\n      }\n    }\n  }\n  #graphql\n  fragment ProductVariantFragment on ProductVariant {\n    id\n    title\n    availableForSale\n    quantityAvailable\n    image {\n      url\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n    }\n    selectedOptions {\n      name\n      value\n    }\n  }\n  #graphql\n  fragment ProductFragment on Product {\n    id\n    title\n    handle\n    featuredImage {\n      url\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }": {return: ProductQuery, variables: ProductQueryVariables},
  "#graphql\n  query ProductRecommendations($productId: ID!) {\n    productRecommendations(productId: $productId) {\n      ...ProductFragment\n    }\n  }\n  #graphql\n  fragment ProductFragment on Product {\n    id\n    title\n    handle\n    featuredImage {\n      url\n    }\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n  }": {return: ProductRecommendationsQuery, variables: ProductRecommendationsQueryVariables},
  "#graphql\nquery Collections($first: Int) {\n  collections(first: $first) {\n    nodes {\n      id\n      title\n      handle\n      image {\n        url\n      }\n    }\n  }\n}": {return: CollectionsQuery, variables: CollectionsQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\nmutation CartCreate($cartInput: CartInput) {\n  cartCreate(input: $cartInput) {\n    cart {\n      id\n    }\n  }\n}": {return: CartCreateMutation, variables: CartCreateMutationVariables},
  "#graphql\nmutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n  cartLinesAdd(cartId: $cartId, lines: $lines) {\n    cart {\n      id\n    }\n  }\n}": {return: CartLinesAddMutation, variables: CartLinesAddMutationVariables},
  "#graphql\nmutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n  cartLinesUpdate(cartId: $cartId, lines: $lines) {\n    cart {\n      id\n    }\n  }\n}": {return: CartLinesUpdateMutation, variables: CartLinesUpdateMutationVariables},
  "#graphql\nmutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n    cart {\n      id\n    }\n  }\n}": {return: CartLinesRemoveMutation, variables: CartLinesRemoveMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
