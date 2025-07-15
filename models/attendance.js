import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: [true, "Date is required!"],
    default: Date.now
  },
  checkIn: {
    type: Date,
    required: [true, "Check-in time is required!"],
    default: Date.now
  },
  checkOut: {
    type: Date,
    required: [true, "Check-out time is required!"],
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave'],
    default: 'Present'
  },
  notes: {
    type: String,
    default: ''
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

const Attendance = mongoose.model('Attendance', attendanceSchema)
export default Attendance