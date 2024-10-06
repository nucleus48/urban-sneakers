export const ProductFragment = `#graphql
  fragment ProductFragment on Product {
    id
    title
    handle
    featuredImage {
      url
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }`;

export const ProductVariantFragment = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    title
    availableForSale
    quantityAvailable
    image {
      url
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
    }
    selectedOptions {
      name
      value
    }
  }`;

export const ProductsQuery = `#graphql
  query Products($first: Int) {
    products(first: $first) {
      nodes {
        ...ProductFragment
      }
    }
  }
  ${ProductFragment}`;

export const ProductQuery = `#graphql
  query Product($handle: String) {
    product(handle: $handle) {
      ...ProductFragment
      description
      options {
        name
        values
      }
      images(first: 20) {
        nodes {
          id
          url
          width
          height
        }
      }
      variants(first: 250) {
        nodes {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${ProductVariantFragment}
  ${ProductFragment}`;

export const ProductRecommendationsQuery = `#graphql
  query ProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductFragment
    }
  }
  ${ProductFragment}`;
