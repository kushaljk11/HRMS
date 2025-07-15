import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: [true, "First name is required!"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required!"]
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required!"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit contact number!"]
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
    trim: true
  },
  hireDate: {
    type: Date,
    required: [true, "Hire date is required!"],
    default: Date.now
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, "Department ID is required!"]
  },
  postion: {
    type: String,
    required: [true, "Position is required!"],
    trim: true
  },
  salary: {
    type: Number,
    required: [true, "Salary is required!"],
    min: [0, "Salary must be a positive number!"]
  },
  employmentType:{
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract'],
    default: 'Full-time',
    required: [true, "Employment type is required!"]
  },
  leaveBalance: {
    type: {
      annual: Number,
      sick: Number
    },
    default: {
      annual: 0,
      sick: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

})

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
