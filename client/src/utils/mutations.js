import { gql } from '@apollo/client';

export const MUTATION_ADD_USER = gql`
    mutation addUser(
        $username: String!
        $email: String!
        $password: String!
    ) {
        addUser(
            username: $username
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;

export const MUTATION_LOGIN = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;

export const MUTATION_ADD_ITEM_TO_ORDER = gql`
    mutation addItemToOrder(
        $orderData: itemToOrder!
    ) {
        addItemToOrder(
            orderData: $orderData
        ) {
            user {
                _id
            }
        }
    }
`;

export const MUTATION_RETURN_ITEM = gql`
    mutation returnItem(
        $itemId: ID!
    ) {
        returnItem(
            itemId: $itemId
        ) {
            user {
                _id
            }
        }
    }
`;

export const MUTATION_TOGGLE_AVAILABILITY = gql`
    mutation toggleAvailability(
        $itemId: ID!
    ) {
        toggleAvailability(
            itemId: $itemId
        ) {
            _id
        }
    }
`;

export const MUTATION_CREATE_ITEM_RATING = gql`
    mutation createItemRating(
        $itemId: ID!
        $itemReview: reviewInput!
    ) {
        createItemRating(
            itemId: $itemId
            itemReview: $itemReview
        ) {
            _id
            rating
        }
    }
`;