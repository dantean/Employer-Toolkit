import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const ADD_EMPLOYEE = gql`
mutation addEmployee($name: String!, $email: String!, $departmentId: ID!) {
  addEmployee(name: $name, email: $email, departmentId: $departmentId) {
    _id
    name
    email
    department {
      _id
      name
    }
  }
}
`;

export const REASSIGN_EMPLOYEE = gql`
mutation reassignEmployee($employeeId: ID!, $newDepartmentId: ID!) {
  reassignEmployee(employeeId: $employeeId, newDepartmentId: $newDepartmentId) {
    _id
    name
    email
    department {
      _id
      name
    }
  }
}
`;

export const DELETE_EMPLOYEE = gql`
mutation DeleteEmployee($employeeId: ID!) {
  deleteEmployee(employeeId: $employeeId) {
    _id
    name
    email
    department {
      _id
      name
    }
  }
}
`;
