const { User, Department, Employee } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    getAllUsers: async (parent, args, context) => {
      if (context.user) {
        const foundUser = await User.find({
          
        }).populate("departments").populate({path:"departments", populate:"employees"});

        if (!foundUser) {
          throw new AuthenticationError('User not found');
        }

        return foundUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    getAllDepartments: async () => {
      return await Department.find({}).populate('employees').populate({path:"employees", populate:"department"});
    },
    getAllEmployees: async () => {
      return await Employee.find().populate('department');
    }
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      if (!user) {
        throw new AuthenticationError('Error creating user');
      }

      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },

    addEmployee: async (parent, { name, email, departmentId }) => {
      const department = await Department.findById(departmentId);
      if (!department) {
        throw new Error('Department not found');
      }

      const employee = await Employee.create({ name, email, department: departmentId });
      department.employees.push(employee);
      await department.save();

      return employee;
    },
    addDepartment: async (parent, { name },context) => {
      const department = await Department.create({ name });

      if (!department) {
        throw new AuthenticationError('Error creating department');
      }
      return department;
    },

    // deleteEmployee: async (parent, { employeeId }) => {
      //   const employee = await Employee.findOneAndDelete(employeeId);
      //   if (!employee) {
      //     throw new Error('Employee not found');
      //   },

    reassignEmployee: async (parent, { employeeId, newDepartmentId }) => {
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        throw new Error('Employee not found');
      }

      

      const oldDepartment = await Department.findById(employee.department);
      if (oldDepartment) {
        oldDepartment.employees.pull(employeeId);
        await oldDepartment.save();
      }

      const newDepartment = await Department.findById(newDepartmentId);
      if (!newDepartment) {
        throw new Error('New department not found');
      }

      employee.department = newDepartmentId;
      await employee.save();

      newDepartment.employees.push(employee);
      await newDepartment.save();

      return employee;
    },
  },
};

module.exports = resolvers;