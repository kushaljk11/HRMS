import express from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controller/employeecontroller.js';
import { authorizationRoles, verifyToken } from '../middleware/verify.token.js';

const router = express.Router();


router.post('/employee',verifyToken, authorizationRoles('Admin'), createEmployee);
router.get('/employees',verifyToken,authorizationRoles('Admin','Manager'), getAllEmployees);
router.get('/employee/:id', verifyToken,authorizationRoles('Admin','Manager','Employee'), getEmployeeById);
router.put('/employee/:id', verifyToken,authorizationRoles('Admin','Manager','Employee'), updateEmployee);
router.delete('/employee/:id', verifyToken,authorizationRoles('Admin'), deleteEmployee);



export default router;
