import Employee from '../models/employee.js';

export const createEmployee = async (req,res)=>{
  try{
    if(firstName == "" || lastName == "" || email == "" || phone == ""){
      return res.status(400).json({ message: "All fields are required!" });
    }
    const { firstName, lastName, email, phone, department } = req.body;
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      phone,
      department
    });
    await newEmployee.save();
    return res.status(201).json({ message: "Employee created successfully!", employee: newEmployee });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json({ message: "Employees fetched successfully!", employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }
    return res.status(200).json({ message: "Employee fetched successfully!", employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { firstName, lastName, email, phone, department } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, {
      firstName,
      lastName,
      email,
      phone,
      department
    }, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    return res.status(200).json({ message: "Employee updated successfully!", employee: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found!" });
    }
    return res.status(200).json({ message: "Employee deleted successfully!" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}