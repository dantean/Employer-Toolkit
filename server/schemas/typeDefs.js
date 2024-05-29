const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    department: [Department]!
  }

  type Employee {
    _id: ID
    name: String
    email: String
    department: Department
  }

  type Department {
    _id: ID
    name: String
    employees: [Employee]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser: User
    getAllDepartments: [Department]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEmployee(name: String!, email: String!, departmentId: ID!): Employee
    reassignEmployee(employeeId: ID!, newDepartmentId: ID!): Employee
  }
`;

module.exports = typeDefs;