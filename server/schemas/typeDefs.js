const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    departments: [Department]!
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
    getAllUsers: [User]
    getAllDepartments: [Department]
    getAllEmployees: [Employee]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEmployee(name: String!, email: String!, departmentId: ID!): Employee
    reassignEmployee(employeeId: ID!, newDepartmentId: ID!): Employee
    addDepartment(name: String!): Department
    deleteEmployee(employeeId: ID!): Employee
   
  }
`;

module.exports = typeDefs;

 // deleteEmplotyee(employeeId: ID!): Employee