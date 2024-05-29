const mongoose = require('mongoose');

const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;