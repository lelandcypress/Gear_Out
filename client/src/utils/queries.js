import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            password
            orders {
                _id
                startDate
                endDate
                items {
                    _id
                    name
                    shortDescription
                    category
                    vendor
                    image
                }
            }
            userRating {
                rating
                comment
            }
        }
    }
`;

export const QUERY_SINGLE_ITEM = gql`
    query getOneItem {
        getOneItem {
            _id
            name
            shortDescription
            longDescription
            category
            location
            available
            vendor
            price
            image
            rating
        }
    }
`;

export const QUERY_FEATURED_ITEMS = gql`
    query featuredItems {
        featuredItems {
            _id
            name
            category
            price
            image
            rating {
                rating
            }
        }
    }
`;

export const QUERY_CATEGORY_SEARCH = gql`
    query categorySearch($categoryQuery: String!) {
        categorySearch(categoryQuery: $categoryQuery) {
            _id
            name
            shortDescription
            category
            available
            price
            image
        }
    }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;