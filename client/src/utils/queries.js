import { gql } from '@apollo/client';

export const GET_ALL_DEPARTMENTS = gql`
  query getAllDepartments {
    getAllDepartments {
      _id
      name
      employees {
        _id
        name
        email
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query getSingleUser {
    getSingleUser {
      _id
      username
      email
      departments {
        _id
        name
      }
    }
  }
`;
