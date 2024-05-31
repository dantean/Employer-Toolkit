const db = require('../config/connection');
const { Employee, Department, User } = require('../models');
const departmentSeeds = require('./departmentSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Employee', 'employees');
    
    await cleanDB('Department', 'departments');

    await cleanDB('User', 'users');

    const departments = await Department.create(departmentSeeds);
    const employees = await Employee.create(
        [
            {
                "name": "Raf",
                "email": "Raf@test.com",
                department: departments[Math.floor(Math.random() * departments.length)]._id
            },
            {
                "name": "RJ",
                "email": "RJ@test.com",
                department: departments[Math.floor(Math.random() * departments.length)]._id
            },
            {
                "name": "Ross",
                "email": "Ross@test.com",
                department: departments[Math.floor(Math.random() * departments.length)]._id
            },
            {
                "name": "Tom",
                "email": "Tom@test.com",
                department: departments[Math.floor(Math.random() * departments.length)]._id
            },
            {
                "name": "Joe",
                "email": "Joe@test.com",
                department: departments[Math.floor(Math.random() * departments.length)]._id
            }
        ]
    );

    console.log(departments);
    console.log(employees);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});