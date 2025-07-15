import Department  from "../models/department.js";

export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    
    // const existingDepartment = await Department.findOne({ name });
    // if (existingDepartment) {
    //   return res.status(400).json({ message: "Department already exists!" });
    // }

    const newDepartment = new Department({ name, description });
    await newDepartment.save();
    
    return res.status(201).json({ message: "Department created successfully!", department: newDepartment });
  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ message: "Departments fetched successfully!", departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getDepartmentById = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found!" });
    }
    return res.status(200).json({ message: "Department fetched successfully!", department });
  } catch (error) {
    console.error("Error fetching department:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export const updateDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const { name, description } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(departmentId, {
      name,
      description,
      updatedAt: Date.now()
    }, { new: true });

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found!" });
    }

    return res.status(200).json({ message: "Department updated successfully!", department: updatedDepartment });
  } catch (error) {
    console.error("Error updating department:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const deletedDepartment = await Department.findByIdAndDelete(departmentId);
    
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found!" });
    }
    
    return res.status(200).json({ message: "Department deleted successfully!" });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}