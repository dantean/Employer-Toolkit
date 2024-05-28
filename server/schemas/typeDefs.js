const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    authors: [String]
    bookId: String
    image: String
    link: String
    title: String
    description: String
  }

  input BookInput {
    bookId: String!
    authors: [String]
    title: String!
    image: String!
    link: String!
    description: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
