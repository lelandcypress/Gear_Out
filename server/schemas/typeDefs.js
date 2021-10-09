const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Order {
    _id: ID!
    startDate: String
    endDate: String
    items: [Items]
  }

  type Items {
    _id: ID!
    name: String
    shortDescription: String
    longDescription: String
    category: String
    location: String
    available: Boolean
    vendor: String
    price: Int
    image: String
    ##rating: [Rating]
  }
  input itemToOrder {
    _id: ID!
    name: String
    image: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    orders: [Order]
    ## userRating: Rating SPRINT 2
  }
  type Checkout {
    session: ID
  }
  type Auth {
    token: ID!
    user: User
  }
  ##type Image## SPRINT 2
  type Rating {
    rating: Int
    comment: String
  }
  input reviewInput {
    rating: Int
    comment: String
  }

  type Query {
    me: User
    getOneItem: Items
    featuredItems: Items
    categorySearch: Items
    checkout(items: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    addItemToOrder(orders: itemToOrder): User

    returnItem(itemId: ID!): User

    toggleAvailability(itemId: ID!): Items ## TODO
    createItemRating(itemId: ID!, itemReview: reviewInput!): Items
  }
`;
module.exports = typeDefs;
