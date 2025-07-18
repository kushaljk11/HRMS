import Attendance from "../models/attendance.js";

export const createAttendance = async (req, res) => {
  try{
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newAttendance = new Attendance({
      employeeId,
      date,
      status
    });

    await newAttendance.save();
    return res.status(201).json({ message: "Attendance created successfully!", attendance: newAttendance });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('employeeId', 'firstName lastName');
    return res.status(200).json({ message: "Attendance records done successfully!", attendanceRecords });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const getAttendanceById = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const attendance = await Attendance.findById(attendanceId).populate('employeeId', 'firstName lastName');
    
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record is not found!" });
    }
    
    return res.status(200).json({ message: "Attendance record done successfully!", attendance });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const checkInAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const attendance = await Attendance.findOne({ employeeId, date: new Date().toISOString().split('T')[0] });

    if (attendance) {
      return res.status(400).json({ message: "Attendance already checked in for today!" });
    }

    const newAttendance = new Attendance({
      employeeId,
      date: new Date().toISOString().split('T')[0],
      status: 'Present'
    });

    await newAttendance.save();
    return res.status(201).json({ message: "Checked-in successful!", attendance: newAttendance });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const checkOutAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const attendance = await Attendance.findOne({ employeeId, date: new Date().toISOString().split('T')[0] });

    if (!attendance) {
      return res.status(404).json({ message: "No checked-in record found for today!" });
    }

    attendance.status = 'Absent';
    await attendance.save();
    return res.status(200).json({ message: "Checked-out successful!", attendance });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
