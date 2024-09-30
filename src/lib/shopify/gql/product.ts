export const ProductQuery = `#graphql
  query Product($handle: String) {
    product(handle: $handle) {
      id
      title
    }
  }`
