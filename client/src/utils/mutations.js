import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          _id
          authors
          bookId
          image
          link
          title
          description
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          _id
          authors
          bookId
          image
          link
          title
          description
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;