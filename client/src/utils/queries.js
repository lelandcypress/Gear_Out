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
    query featuredItem {
        featuredItem {
            _id
            name
            category
            price
            image
            rating
        }
    }
`;

export const QUERY_CATEGORY_SEARCH = gql`
    query categorySearch {
        categorySearch {
            _id
            name
            shortDescription
            category
            available
            price
            image
            rating
        }
    }
`;