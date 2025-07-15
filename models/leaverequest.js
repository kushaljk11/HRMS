import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
  id:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  leaveType: {
    type: String,
    required: [true, "Leave type is required!"],
    enum: ['Sick Leave', 'Vacation Leave', 'Personal Leave']
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required!"],
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, "End date is required!"],
    default: Date.now
  },
  reason:{
    type: String,
    required: [true, "Reason is required" ]
  },
  status:{
    type: String,
    enum: ["Pending","approved","rejected"]
  },
  approvedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
})

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);
export default LeaveRequest;