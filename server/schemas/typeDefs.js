const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Order {
    _id: ID!
    startDate: Date
    endDate: Date
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
    price: Number
    image: String
    rating: Rating
  }
  input itemToOrder {
    name: String
    image: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    orders: [Order]
    userRating: Rating
  }
  type Auth {
    token: ID!
    user: User
  }
  ##type Image## Looking into this
  type Rating {
    rating: Number
    comment: String
  }
  input reviewInput {
    rating: Number
    comment: String
  }

  type Query {
    me: User
    getOneItem: Items
    featuredItem: Items
    categorySearch: Items
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    addItemToOrder(orderData: itemToOrder): User

    returnItem(itemId: ID!): User

    toggleAvailability(available: Boolean): Items

    createItemRating(itemReview: reviewInput): Items
  }
`;
module.exports = typeDefs;
