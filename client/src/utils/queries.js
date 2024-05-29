import { gql } from '@apollo/client';

export const GET_ALL_DEPARTMENTS = gql`
query GetAllDepartments {
  getAllDepartments {
    _id
    employees {
      _id
      email
      name
      department {
        _id
        name
      }
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
