export const ProductsQuery = `#graphql
  query Products($first: Int) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              currencyCode
              amount
            }
          }
        }
      }
    }
  }`;

export const ProductQuery = `#graphql
  query Product($handle: String) {
    product(handle: $handle) {
      id
      title
      description
      options {
        name
        values
      }
      priceRange {
        minVariantPrice {
          currencyCode
          amount
        }
      }
      images(first: 20) {
        edges {
          node {
            url
          }
        }
      }
      variants(first: 250) {
        edges {
          node {
            id
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }`;

export const ProductRecommendationsQuery = `#graphql
  query ProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      featuredImage {
        url
      }
      priceRange {
        minVariantPrice {
          currencyCode
          amount
        }
      }
    }
  }`
