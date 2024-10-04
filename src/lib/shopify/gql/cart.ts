export const CartQuery = `#graphql
query Cart($cartId: ID!) {
  cart(id: $cartId) {
    id
    checkoutUrl
    lines(first: 10) {
      nodes {
          id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            image {
              url
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
  }
}`;

export const CartCreateMutation = `#graphql
mutation CartCreate($cartInput: CartInput) {
  cartCreate(input: $cartInput) {
    cart {
      id
    }
  }
}`;

export const CartLinesAddMutation = `#graphql
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
    }
  }
}`;
