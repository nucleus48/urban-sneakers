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
