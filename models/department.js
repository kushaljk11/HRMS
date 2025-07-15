import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  id:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name:{
    type: String,
    required: [true, "Department name is required!"],
    trim: true,
  },
  description:{
    type: String,
    required: [true, "Department description is required!"],
    trim: true,
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
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

const Department = mongoose.model('Department', departmentSchema);
export default Department;

